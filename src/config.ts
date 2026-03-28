import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { access } from "node:fs/promises";

export interface KunConfig {
  provider: "anthropic" | "openai" | "custom";
  model: string;
  apiKey?: string;
  baseUrl?: string;
}

const CONFIG_FILES = ["kun.config.ts", "kun.config.js"] as const;

export async function loadConfig(cwd: string): Promise<KunConfig> {
  for (const filename of CONFIG_FILES) {
    const filepath = resolve(cwd, filename);
    try {
      await access(filepath);
    } catch {
      continue;
    }

    // For .ts files, rely on Node's --import tsx or similar loader
    const url = pathToFileURL(filepath).href;
    const mod = await import(url);
    const config: KunConfig = mod.default ?? mod;

    if (!config.provider) {
      throw new Error(`kun.config: "provider" is required`);
    }
    if (!config.model) {
      throw new Error(`kun.config: "model" is required`);
    }

    return config;
  }

  throw new Error(
    `No kun.config.ts or kun.config.js found in ${cwd}.\n` +
      `Create one — see https://github.com/kun-js/kun#llm-provider`
  );
}
