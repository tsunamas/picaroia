import { describe, expect, it } from "vitest";
import { BasicPromptInjectionSanitizer, PassThroughModerator } from "../../src/ai/guardrails";
import { DefaultRoutingPolicy } from "../../src/ai/policy";
import { MockProvider } from "../../src/ai/providers/mock-provider";
import { OpenAIProvider } from "../../src/ai/providers/openai-provider";
import { LLMRouter } from "../../src/ai/router";

describe("LLMRouter integration", () => {
  it("routes and returns a response", async () => {
    const providers = new Map();
    providers.set("openai", new OpenAIProvider());
    providers.set("mock", new MockProvider());

    const router = new LLMRouter(
      providers,
      new DefaultRoutingPolicy(),
      new BasicPromptInjectionSanitizer(),
      new PassThroughModerator(),
    );

    const text = await router.generate({
      messages: [{ role: "user", content: "hola" }],
      context: {},
    });

    expect(text.length).toBeGreaterThan(0);
  });
});
