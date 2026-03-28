# kun

**kun** (كُن) is Arabic for *"become"* — the imperative form of existence.
In Arabic, *kun* is the first word of the phrase *kun fayakūn* (كن فيكون) — "Be, and it is [done]."

You state intent. Kun translates it into real code.

That is the philosophy of this tool: you describe what something should be, and it becomes.

---

**kun** is a requirements-driven development convention used in this project.
Instead of writing code directly, developers write `.kun` files — structured
requirement files that describe *what* a source file should do. A CLI tool
(`kun build`) reads the `.kun` file and generates the actual source file using
an LLM.

---

## This project

`kun-js` is itself an NPM package — written in TypeScript, published to the NPM
registry, and installable in any project:

```bash
npm install -g kun-js        # global CLI usage
npm install --save-dev kun-js  # project-local usage via npx / package scripts
```

**Language:** TypeScript (strict mode)
**Module format:** ESM only (`"type": "module"` in package.json)
**Runtime:** Node.js ≥ 20
**Output:** Compiled to `dist/` — `.js` (ESM) + `.d.ts` declaration files
**Entry points:**
  - `bin/kun.js` — CLI entrypoint (referenced in `package.json#bin`)
  - `src/index.ts` — public API for programmatic use

All source lives in `src/`. The CLI is a thin wrapper over the public API so
that everything testable is importable. No CommonJS output — ESM only.

`tsconfig.json` targets `ESNext` with `"moduleResolution": "Bundler"` or
`"NodeNext"` depending on what the build pipeline requires. Prefer `NodeNext`
for Node.js CLI tooling.

When adding new source files to this project, use `.kun` files to spec them
first — kun is dogfooded on itself.

---

## LLM provider

kun is provider-agnostic. The LLM backend is configured via a `kun.config.ts`
(or `kun.config.js`) file in the project root. Any provider can be used as long
as it exposes a chat completion interface.

```ts
// kun.config.ts
import type { KunConfig } from "kun-js";

export default {
  provider: "anthropic",          // "anthropic" | "openai" | "custom"
  model: "claude-sonnet-4-20250514",
  apiKey: process.env.ANTHROPIC_API_KEY,
} satisfies KunConfig;
```

```ts
// kun.config.ts — OpenAI example
export default {
  provider: "openai",
  model: "gpt-4o",
  apiKey: process.env.OPENAI_API_KEY,
} satisfies KunConfig;
```

```ts
// kun.config.ts — custom / local / any OpenAI-compatible endpoint
export default {
  provider: "custom",
  model: "llama-3.3-70b",
  apiKey: process.env.MY_API_KEY,
  baseUrl: "http://localhost:11434/v1",  // Ollama, vLLM, LM Studio, etc.
} satisfies KunConfig;
```

Built-in providers (`anthropic`, `openai`) are implemented inside `src/providers/`.
Each provider implements the shared `Provider` interface — a single `complete()`
method. Adding a new provider means adding one file and registering it.

The `custom` provider uses the OpenAI-compatible chat completions format
(`POST /v1/chat/completions`) and works with any endpoint that speaks it.

If no config file is found, `kun build` exits with a clear error message
pointing to the docs — it never falls back to a hardcoded provider or key.

---

## The core idea

`.kun` is the next abstraction level above code.
You don't write implementation — you write intent.

```
SearchBar.vue.kun   →   kun build   →   SearchBar.vue
```

The filename encodes the output target. Everything before `.kun` is the
file that will be generated.

---

## File format

A `.kun` file is written in plain, structured natural language.
There is no strict syntax — clarity is the only rule.
Use whatever structure makes the requirements readable.

Common sections (not mandatory, use what fits):

```
@target    vue3          ← output language / framework hint
@component SearchBar     ← component/module name

intent:
  What this file is and why it exists.
  Plain prose. No implementation detail.

props / inputs / interface:
  What goes in.

layout / structure:
  What regions or elements exist. Describe, don't markup.

behavior:
  Cause → effect pairs.
  "on X → do Y"

constraints:
  Hard rules the generator must not violate.

assumptions:
  What external things (composables, components, libs) can be imported freely.
```

Nothing is required. A `.kun` file can be as minimal as:

```
@target vue3

A button that copies text to clipboard.
Shows "Copied!" for two seconds after click.
Uses no external libraries.
```

---

## The git sync contract

**Commit = sync.**

When a developer commits both a `.kun` file and its generated source file
in the same commit, they are declaring them in sync — regardless of content.

This means:
- A developer can freely edit the generated source file directly.
- Once committed, the source file is the ground truth for implementation.
- The `.kun` file is the ground truth for intent.
- They can drift. That is acceptable. Drift is tracked by git history, not enforced by tooling.

There is no automated drift detection (yet).

---

## kun build — how it works

`kun build` reads a `.kun` file, computes the git diff of the `.kun` file
against its last committed state, and sends both the full requirements and
the diff to an LLM. The LLM either generates a new source file (if none
exists) or applies a targeted patch to the existing one (if the source file
already exists).

```bash
# Generate a new source file from a new .kun file
kun build SearchBar.vue.kun

# Rebuild after editing a .kun file (diff-aware, patches the source)
kun build SearchBar.vue.kun

# Build all .kun files in the project
kun build

# Preview the prompt without calling the API
kun build --dry-run SearchBar.vue.kun
```

---

## How to work with kun in this project

When a `.kun` file exists alongside a source file, treat the `.kun` file
as the canonical description of that file's purpose and requirements.

When asked to add a feature, fix behavior, or change a component:
1. First check if a `.kun` file exists for that source file.
2. If yes — update the `.kun` file with the new or changed requirement.
   Then run `kun build` to apply the change to the source file.
3. If no `.kun` file exists for that source file — work directly on the
   source file as normal. kun is opt-in, not enforced.

When creating a new source file from scratch:
1. Create the `.kun` file first.
2. Write the requirements.
3. Run `kun build` to generate the source file.
4. Review, adjust the `.kun` if needed, rebuild.
5. Commit both files together.

---

## What goes in a good `.kun` file

**Do write:**
- What the component/module is *for*
- What data it receives and what it emits
- How it should behave in response to user actions or data changes
- Hard constraints (no external libs, must be accessible, mobile-first, etc.)
- What it may assume exists (imported composables, design system components)

**Don't write:**
- HTML structure or markup
- CSS class names or style values
- Variable names or function signatures
- Implementation strategy

The generator decides *how*. You decide *what*.

---

## Example

`SearchBar.vue.kun`:
```
@target vue3
@style  tailwind

intent:
  A search input used across the app header.
  Debounces input and emits a search event to the parent.

props:
  placeholder: string (default: "Search…")
  debounceMs:  number (default: 300)

emits:
  search(query: string)

behavior:
  on input    → debounce by debounceMs, then emit search
  on Escape   → clear the input and emit search with empty string
  on mount    → focus the input if autofocus prop is true

constraints:
  - no external search or debounce libraries
  - fully keyboard accessible
  - loading state: show a spinner inside the input when isLoading prop is true
```

Run `kun build SearchBar.vue.kun` → produces `SearchBar.vue`.
