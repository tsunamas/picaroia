import { describe, expect, it } from "vitest";
import { performance } from "node:perf_hooks";
import { BasicPromptInjectionSanitizer, PassThroughModerator } from "../../src/ai/guardrails";
import { DefaultRoutingPolicy } from "../../src/ai/policy";
import { MockProvider } from "../../src/ai/providers/mock-provider";
import { LLMRouter } from "../../src/ai/router";

describe("Router performance", () => {
  it("handles 100 sequential requests under baseline threshold", async () => {
    const providers = new Map();
    providers.set("local", new MockProvider());
    providers.set("mock", new MockProvider());
    providers.set("openai", new MockProvider());

    const router = new LLMRouter(
      providers,
      new DefaultRoutingPolicy(),
      new BasicPromptInjectionSanitizer(),
      new PassThroughModerator(),
    );

    const start = performance.now();

    for (let i = 0; i < 100; i += 1) {
      await router.generate({
        messages: [{ role: "user", content: `hola ${i}` }],
        context: { preferLowCost: true },
      });
    }

    const elapsedMs = performance.now() - start;

    expect(elapsedMs).toBeLessThan(2500);
  });
});
