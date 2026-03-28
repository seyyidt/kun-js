import { readFile } from "node:fs/promises";
import { basename } from "node:path";

export interface KunFile {
  /** Full path to the .kun file */
  path: string;
  /** The output filename (e.g. "SearchBar.vue" from "SearchBar.vue.kun") */
  outputName: string;
  /** Raw file content */
  raw: string;
  /** Extracted @-directives (e.g. @target, @component) */
  directives: Record<string, string>;
  /** The body content after directives are stripped */
  body: string;
}

/**
 * Parse a .kun file into structured data.
 */
export async function parseKunFile(filepath: string): Promise<KunFile> {
  const raw = await readFile(filepath, "utf-8");
  const name = basename(filepath);

  // Output name: strip trailing .kun
  const outputName = name.replace(/\.kun$/, "");

  const directives: Record<string, string> = {};
  const bodyLines: string[] = [];

  for (const line of raw.split("\n")) {
    const match = line.match(/^@(\w+)\s+(.+)/);
    if (match) {
      directives[match[1]] = match[2].replace(/←.*$/, "").trim();
    } else {
      bodyLines.push(line);
    }
  }

  return {
    path: filepath,
    outputName,
    raw,
    directives,
    body: bodyLines.join("\n").trim(),
  };
}
