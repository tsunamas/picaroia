import { describe, expect, it } from "vitest";
import { BasicPromptInjectionSanitizer, PassThroughModerator } from "../../src/ai/guardrails";
import { DefaultRoutingPolicy } from "../../src/ai/policy";
import { MockProvider } from "../../src/ai/providers/mock-provider";
import { OpenAIProvider } from "../../src/ai/providers/openai-provider";
import { LLMRouter } from "../../src/ai/router";

describe("E2E chat flow", () => {
  it("simulates one safe turn from user to LLM output", async () => {
    const providers = new Map();
    providers.set("openai", new OpenAIProvider());
    providers.set("mock", new MockProvider());

    const router = new LLMRouter(
      providers,
      new DefaultRoutingPolicy(),
      new BasicPromptInjectionSanitizer(),
      new PassThroughModerator(),
    );

    const answer = await router.generate({
      messages: [
        { role: "system", content: "responde corto" },
        { role: "user", content: "que puedes hacer" },
      ],
      context: {
        roomId: "room-1",
        locale: "es-MX",
      },
    });

    expect(answer).toContain("openai-placeholder");
  });
});
