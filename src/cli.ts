import { Command } from "commander";
import { loadConfig, type KunConfig } from "./config.js";
import { build } from "./build.js";

const program = new Command();

program
  .name("kun")
  .description("Intent-driven code generator")
  .version("0.1.0");

program
  .command("build")
  .description("Generate code from .kun files")
  .argument("[files...]", "specific .kun files to build")
  .option("--dry-run", "preview the prompt without calling the LLM")
  .action(async (files: string[], opts: { dryRun?: boolean }) => {
    const cwd = process.cwd();

    let config: KunConfig;
    try {
      config = await loadConfig(cwd);
    } catch (err) {
      if (opts.dryRun) {
        config = { provider: "anthropic", model: "dry-run", apiKey: "dry-run" };
      } else {
        console.error(String(err));
        process.exit(1);
      }
    }

    try {
      await build(config!, cwd, { files, dryRun: opts.dryRun });
    } catch (err) {
      console.error(err instanceof Error ? err.message : String(err));
      process.exit(1);
    }
  });

program.parse();
