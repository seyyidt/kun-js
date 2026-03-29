# Kun-js

**kun** (كُن) is Arabic for _"become"_ — the command to become. It is the first word of the phrase _kun fayakun_ (كن فيكون) — "Be, and it is [done]."

You state intent. Kun translates it into real code.

---

## What is kun?

kun is a CLI tool that generates source code from `.kun` requirement files using LLMs. You describe _what_ a file should do, and kun produces a working first draft.

```
SearchBar.vue.kun   →   kun build   →   SearchBar.vue
```

The filename encodes the output. Everything before `.kun` is the file that gets generated.

## Install

```bash
npm install -g @seyyidt/kun-js
# or
npm install --save-dev @seyyidt/kun-js
```

Requires Node.js >= 20.

## Quick start

**1. Configure your LLM provider**

Create a `kun.config.js` (or `kun.config.ts`) in your project root:

```js
// kun.config.js
import "dotenv/config";

export default {
  provider: "anthropic",
  model: "claude-sonnet-4-20250514",
  apiKey: process.env.ANTHROPIC_API_KEY,
};
```

**2. Write a `.kun` file**

```
@target vue3

A button that copies text to clipboard.
Shows "Copied!" for two seconds after click.
Uses no external libraries.
```

**3. Generate**

```bash
kun build CopyButton.vue.kun    # generates CopyButton.vue
kun build                       # builds all .kun files in the project
kun build --dry-run             # preview the prompt without calling the API
```

## `.kun` file format

Plain, structured natural language. No strict syntax — clarity is the only rule.

```
@target    vue3
@component SearchBar

intent:
  A search input used across the app header.
  Debounces input and emits a search event.

props:
  placeholder: string (default: "Search…")
  debounceMs:  number (default: 300)

emits:
  search(query: string)

behavior:
  on input  → debounce, then emit search
  on Escape → clear input and emit empty string

constraints:
  - no external libraries
  - fully keyboard accessible
```

Write _what_, not _how_. The LLM decides the implementation.

## Providers

kun is provider-agnostic. Built-in support for:

| Provider | Config |
|---|---|
| Anthropic (Claude) | `provider: "anthropic"` |
| OpenAI | `provider: "openai"` |
| Any OpenAI-compatible endpoint | `provider: "custom"`, `baseUrl: "..."` |

```js
// OpenAI
export default {
  provider: "openai",
  model: "gpt-4o",
  apiKey: process.env.OPENAI_API_KEY,
};

// Local / Ollama / vLLM / LM Studio
export default {
  provider: "custom",
  model: "llama-3.3-70b",
  baseUrl: "http://localhost:11434/v1",
};
```

## How it works

`kun build` reads a `.kun` file, computes the git diff against its last committed state, and sends both the full requirements and the diff to an LLM. If a source file already exists, the LLM patches it. If not, it generates a new one.

## The git sync contract

When you commit both a `.kun` file and its generated source file together, they are declared in sync. After that, you own the generated code — edit it freely. The `.kun` file remains as documentation of intent.

## License

[MIT](LICENSE)
