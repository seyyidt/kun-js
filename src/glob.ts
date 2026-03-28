import { readdir } from "node:fs/promises";
import { join } from "node:path";

/**
 * Simple recursive glob for .kun files.
 * Avoids a runtime dependency on a glob library.
 */
export async function glob(pattern: string, cwd: string): Promise<string[]> {
  const ext = pattern.replace("**/", "").replace("*", "");
  const results: string[] = [];

  async function walk(dir: string) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules" || entry.name === ".git") continue;
        await walk(full);
      } else if (entry.name.endsWith(ext)) {
        results.push(full);
      }
    }
  }

  await walk(cwd);
  return results;
}
