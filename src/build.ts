import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { parseKunFile, type KunFile } from "./parser.js";
import { createProvider, type Provider } from "./providers/index.js";
import type { KunConfig } from "./config.js";
import { glob } from "./glob.js";

const exec = promisify(execFile);

export interface BuildOptions {
  dryRun?: boolean;
  files?: string[];
}

/**
 * Get the git diff of a file against its last committed state.
 * Returns empty string if the file is new / untracked.
 */
async function getGitDiff(filepath: string, cwd: string): Promise<string> {
  try {
    const { stdout } = await exec("git", ["diff", "HEAD", "--", filepath], {
      cwd,
    });
    return stdout;
  } catch {
    return "";
  }
}

/**
 * Try to read the existing generated source file, if any.
 */
async function readExistingSource(path: string): Promise<string | null> {
  try {
    return await readFile(path, "utf-8");
  } catch {
    return null;
  }
}

const SYSTEM_PROMPT = `You are a code generator. You receive a .kun requirements file and produce the corresponding source code.

Rules:
- Output ONLY the source code. No markdown fences, no explanations, no commentary.
- Follow the requirements exactly.
- Use the target language/framework specified in @target, or infer from the output filename.
- Write clean, idiomatic, production-quality code.
- If an existing source file is provided, apply only the changes described in the diff. Preserve all other code.`;

function buildPrompt(kun: KunFile, diff: string, existingSource: string | null): string {
  let prompt = `## Requirements file: ${kun.outputName}.kun\n\n${kun.raw}`;

  if (diff) {
    prompt += `\n\n## Changes since last build (git diff):\n\n${diff}`;
  }

  if (existingSource) {
    prompt += `\n\n## Current source file: ${kun.outputName}\n\n${existingSource}`;
    prompt += `\n\n## Task\nApply the requirement changes to the existing source file. Output the complete updated file.`;
  } else {
    prompt += `\n\n## Task\nGenerate the source file from these requirements. Output the complete file.`;
  }

  return prompt;
}

export async function build(
  config: KunConfig,
  cwd: string,
  options: BuildOptions = {},
): Promise<void> {
  // Find .kun files
  let kunFiles: string[];
  if (options.files?.length) {
    kunFiles = options.files.map((f) => resolve(cwd, f));
  } else {
    kunFiles = await glob("**/*.kun", cwd);
  }

  if (kunFiles.length === 0) {
    console.log("No .kun files found.");
    return;
  }

  const provider: Provider | null = options.dryRun
    ? null
    : createProvider(config);

  for (const filepath of kunFiles) {
    const kun = await parseKunFile(filepath);
    const outputPath = resolve(dirname(filepath), kun.outputName);
    const diff = await getGitDiff(filepath, cwd);
    const existingSource = await readExistingSource(outputPath);
    const prompt = buildPrompt(kun, diff, existingSource);

    console.log(`${existingSource ? "Updating" : "Generating"} ${kun.outputName}`);

    if (options.dryRun) {
      console.log("\n--- System prompt ---");
      console.log(SYSTEM_PROMPT);
      console.log("\n--- User prompt ---");
      console.log(prompt);
      console.log("---\n");
      continue;
    }

    const response = await provider!.complete({
      model: config.model,
      system: SYSTEM_PROMPT,
      prompt,
    });

    // Strip markdown fences if the LLM wraps the output anyway
    const code = stripFences(response.content);

    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, code, "utf-8");

    console.log(`  → ${outputPath}`);
    if (response.usage) {
      console.log(
        `  tokens: ${response.usage.inputTokens} in / ${response.usage.outputTokens} out`,
      );
    }
  }
}

function stripFences(text: string): string {
  const fenced = text.match(/^```[\w]*\n([\s\S]*?)\n```$/);
  return fenced ? fenced[1] : text;
}
