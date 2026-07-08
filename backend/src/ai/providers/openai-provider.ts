import {
  GenerationRequest,
  GenerationResponse,
  LLMProvider,
  ProviderCapabilities,
  StreamHandler,
} from "../contracts";

export class OpenAIProvider implements LLMProvider {
  readonly id = "openai" as const;

  readonly capabilities: ProviderCapabilities = {
    streaming: true,
    tools: true,
    jsonMode: true,
    moderationNative: true,
  };

  async generate(request: GenerationRequest): Promise<GenerationResponse> {
    // Placeholder adapter: wire provider SDK/API here.
    return {
      text: `openai-placeholder: model=${request.model}`,
      finishReason: "stop",
      provider: this.id,
      model: request.model,
    };
  }

  async stream(request: GenerationRequest, onChunk: StreamHandler): Promise<GenerationResponse> {
    const response = await this.generate(request);
    await onChunk({ deltaText: response.text, done: true });
    return response;
  }
}
