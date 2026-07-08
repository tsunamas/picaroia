export type ProviderId = "openai" | "anthropic" | "local" | "mock";

export type Role = "system" | "user" | "assistant" | "tool";

export interface Message {
  role: Role;
  content: string;
}

export interface ProviderCapabilities {
  streaming: boolean;
  tools: boolean;
  jsonMode: boolean;
  moderationNative: boolean;
}

export interface GenerationOptions {
  temperature?: number;
  maxTokens?: number;
  stop?: string[];
}

export interface GenerationRequest {
  model: string;
  messages: Message[];
  options?: GenerationOptions;
  metadata?: {
    roomId?: string;
    deviceId?: string;
    locale?: string;
  };
}

export interface Usage {
  inputTokens?: number;
  outputTokens?: number;
}

export interface GenerationResponse {
  text: string;
  finishReason: "stop" | "length" | "content_filter" | "error";
  usage?: Usage;
  provider: ProviderId;
  model: string;
}

export interface StreamChunk {
  deltaText: string;
  done?: boolean;
}

export type StreamHandler = (chunk: StreamChunk) => Promise<void> | void;

export interface LLMProvider {
  readonly id: ProviderId;
  readonly capabilities: ProviderCapabilities;

  generate(request: GenerationRequest): Promise<GenerationResponse>;
  stream(request: GenerationRequest, onChunk: StreamHandler): Promise<GenerationResponse>;
}
