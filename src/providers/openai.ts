import OpenAI from "openai";
import type { Provider, ProviderRequest, ProviderResponse } from "./provider.js";

export function createOpenAIProvider(
  apiKey: string,
  baseUrl?: string,
): Provider {
  const client = new OpenAI({ apiKey, baseURL: baseUrl });

  return {
    async complete(req: ProviderRequest): Promise<ProviderResponse> {
      const response = await client.chat.completions.create({
        model: req.model,
        messages: [
          { role: "system", content: req.system },
          { role: "user", content: req.prompt },
        ],
      });

      const content = response.choices[0]?.message?.content ?? "";
      return {
        content,
        usage: response.usage
          ? {
              inputTokens: response.usage.prompt_tokens,
              outputTokens: response.usage.completion_tokens ?? 0,
            }
          : undefined,
      };
    },
  };
}
