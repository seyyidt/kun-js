import type { KunConfig } from "../config.js";
import type { Provider } from "./provider.js";
import { createAnthropicProvider } from "./anthropic.js";
import { createOpenAIProvider } from "./openai.js";

export type { Provider, ProviderRequest, ProviderResponse } from "./provider.js";

export function createProvider(config: KunConfig): Provider {
  const key = config.apiKey ?? "";

  switch (config.provider) {
    case "anthropic":
      if (!key) throw new Error("anthropic provider requires apiKey");
      return createAnthropicProvider(key);

    case "openai":
      if (!key) throw new Error("openai provider requires apiKey");
      return createOpenAIProvider(key);

    case "custom":
      if (!config.baseUrl) throw new Error("custom provider requires baseUrl");
      return createOpenAIProvider(key, config.baseUrl);

    default:
      throw new Error(`Unknown provider: ${config.provider}`);
  }
}
