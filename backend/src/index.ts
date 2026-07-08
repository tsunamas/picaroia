import {
  BasicPromptInjectionSanitizer,
  PassThroughModerator,
} from "./ai/guardrails";
import { DefaultRoutingPolicy } from "./ai/policy";
import { LLMRouter } from "./ai/router";
import { OpenAIProvider } from "./ai/providers/openai-provider";
import { MockProvider } from "./ai/providers/mock-provider";

async function bootstrap(): Promise<void> {
  const providers = new Map();
  providers.set("openai", new OpenAIProvider());
  providers.set("mock", new MockProvider());

  const router = new LLMRouter(
    providers,
    new DefaultRoutingPolicy(),
    new BasicPromptInjectionSanitizer(),
    new PassThroughModerator(),
  );

  const output = await router.generate({
    messages: [
      { role: "system", content: "Eres PicaroIA. Responde de forma breve y segura." },
      { role: "user", content: "Hola, que puedes hacer?" },
    ],
    context: {
      roomId: "demo-room",
      locale: "es-MX",
    },
  });

  console.log(output);
}

void bootstrap();
