export interface ProviderRequest {
  model: string;
  system: string;
  prompt: string;
}

export interface ProviderResponse {
  content: string;
  usage?: { inputTokens: number; outputTokens: number };
}

export interface Provider {
  complete(request: ProviderRequest): Promise<ProviderResponse>;
}
