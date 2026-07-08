import { ProviderId } from "./contracts";

export interface ProviderPolicy {
  provider: ProviderId;
  model: string;
  maxInputChars: number;
  maxOutputTokens: number;
  allowStreaming: boolean;
}

export interface RoutingContext {
  roomId?: string;
  locale?: string;
  requiresTools?: boolean;
  preferLowCost?: boolean;
}

export interface RoutingPolicy {
  choose(ctx: RoutingContext): ProviderPolicy;
}

export class DefaultRoutingPolicy implements RoutingPolicy {
  choose(ctx: RoutingContext): ProviderPolicy {
    // Keep this deterministic and easy to audit.
    if (ctx.preferLowCost) {
      return {
        provider: "local",
        model: "local-chat-small",
        maxInputChars: 4000,
        maxOutputTokens: 300,
        allowStreaming: true,
      };
    }

    if (ctx.requiresTools) {
      return {
        provider: "openai",
        model: "gpt-4.1-mini",
        maxInputChars: 8000,
        maxOutputTokens: 500,
        allowStreaming: true,
      };
    }

    return {
      provider: "openai",
      model: "gpt-4.1-mini",
      maxInputChars: 6000,
      maxOutputTokens: 350,
      allowStreaming: true,
    };
  }
}
