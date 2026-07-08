import { LLMProvider, Message } from "./contracts";
import { Moderator, Sanitizer } from "./guardrails";
import { RoutingContext, RoutingPolicy } from "./policy";

export interface GenerateParams {
  messages: Message[];
  context: RoutingContext;
}

export class LLMRouter {
  constructor(
    private readonly providers: Map<string, LLMProvider>,
    private readonly policy: RoutingPolicy,
    private readonly sanitizer: Sanitizer,
    private readonly moderator: Moderator,
  ) {}

  async generate(params: GenerateParams): Promise<string> {
    const selected = this.policy.choose(params.context);
    const provider = this.providers.get(selected.provider);

    if (!provider) {
      throw new Error(`Provider not configured: ${selected.provider}`);
    }

    const sanitizedMessages = params.messages.map((m) => ({
      ...m,
      content: this.sanitizer.sanitize(m.content),
    }));

    const inputText = sanitizedMessages.map((m) => m.content).join("\n");
    if (inputText.length > selected.maxInputChars) {
      throw new Error("Input exceeds policy limit");
    }

    const inputModeration = await this.moderator.checkInput(inputText);
    if (!inputModeration.allowed) {
      throw new Error(`Input blocked by moderation: ${inputModeration.reason ?? "unknown"}`);
    }

    const response = await provider.generate({
      model: selected.model,
      messages: sanitizedMessages,
      options: {
        maxTokens: selected.maxOutputTokens,
      },
      metadata: {
        roomId: params.context.roomId,
        locale: params.context.locale,
      },
    });

    const outputModeration = await this.moderator.checkOutput(response.text);
    if (!outputModeration.allowed) {
      throw new Error(`Output blocked by moderation: ${outputModeration.reason ?? "unknown"}`);
    }

    return response.text;
  }
}
