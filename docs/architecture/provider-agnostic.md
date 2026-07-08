# Provider-Agnostic LLM Architecture (v0)

## Goals

- Avoid vendor lock-in while preserving low latency voice UX.
- Keep guardrails independent from any specific LLM vendor.
- Support multiple providers with deterministic routing policies.

## Layering

1. Interface layer: `LLMProvider` contract and common request/response types.
2. Adapter layer: one adapter per provider under `backend/src/ai/providers`.
3. Policy layer: deterministic selection rules in `RoutingPolicy`.
4. Guardrail layer: sanitizer + moderation before/after generation.
5. Orchestration layer: `LLMRouter` as the only entrypoint for inference.

## Rules

- Do not call provider SDKs outside adapters.
- Do not embed moderation logic in adapters.
- Keep policy logic auditable (if/else, no hidden heuristics).
- Cap input/output sizes by policy to control abuse and cost.

## Migration Path

1. Replace placeholder adapters with real SDK calls.
2. Add `AnthropicProvider` and `LocalProvider`.
3. Add provider health checks and fallback order.
4. Add streaming orchestration for TTS interruption behavior.
