import Anthropic from "@anthropic-ai/sdk";
import type { Provider, ProviderRequest, ProviderResponse } from "./provider.js";

export function createAnthropicProvider(apiKey: string): Provider {
  const client = new Anthropic({ apiKey });

  return {
    async complete(req: ProviderRequest): Promise<ProviderResponse> {
      const response = await client.messages.create({
        model: req.model,
        max_tokens: 8192,
        system: req.system,
        messages: [{ role: "user", content: req.prompt }],
      });

      const text = response.content
        .filter((block): block is Anthropic.TextBlock => block.type === "text")
        .map((block) => block.text)
        .join("");

      return {
        content: text,
        usage: {
          inputTokens: response.usage.input_tokens,
          outputTokens: response.usage.output_tokens,
        },
      };
    },
  };
}
