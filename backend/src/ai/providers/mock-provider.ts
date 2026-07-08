import {
  GenerationRequest,
  GenerationResponse,
  LLMProvider,
  ProviderCapabilities,
  StreamHandler,
} from "../contracts";

export class MockProvider implements LLMProvider {
  readonly id = "mock" as const;

  readonly capabilities: ProviderCapabilities = {
    streaming: true,
    tools: false,
    jsonMode: false,
    moderationNative: false,
  };

  async generate(request: GenerationRequest): Promise<GenerationResponse> {
    const lastUserMessage = [...request.messages]
      .reverse()
      .find((m) => m.role === "user")?.content ?? "";

    return {
      text: `mock-response: ${lastUserMessage}`,
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
