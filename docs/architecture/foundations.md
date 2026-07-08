# Project Foundations To Set Early

## 1) Runtime boundaries

- Define hard boundaries between `backend`, `firmware`, and `hardware`.
- Enforce API contracts between firmware and backend (versioned messages).

## 2) Security baseline (already started)

- Prompt-injection sanitizer with test vectors.
- Input/output moderation pipeline.
- Rate limits per IP and device id.
- Secrets policy: no secrets in repo, only env vars.

## 3) LLM freedom and portability

- Provider-agnostic interface.
- Vendor adapters as plugins.
- Routing policy independent from provider SDKs.
- Fallback strategy by cost/latency/availability.

## 4) Observability baseline

- Structured logs with request ids and room ids.
- Core metrics: STT latency, LLM latency, TTS latency, drop/interruption counts.
- Error taxonomy with actionable categories.

## 5) Reliability baseline

- Idempotent handling for reconnects and duplicate websocket frames.
- Backpressure handling and bounded queues.
- Circuit breakers for provider failures.

## 6) Data and privacy baseline

- Explicit retention policy (default: zero audio storage).
- Configurable redaction for transcripts in logs.
- Pseudonymous device identifiers.

## 7) Contribution baseline

- ADRs for architecture decisions.
- Definition of done requiring tests + docs updates.
- Minimal CI: lint, typecheck, unit tests.

## 8) Domain baseline for voice UX

- Turn-taking state machine (listening, speaking, interrupted, idle).
- First-to-lock arbitration as a deterministic module with tests.
- Echo suppression behavior specified and validated in integration tests.
