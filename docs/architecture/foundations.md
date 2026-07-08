# Project Foundations (Hardware-First)

## 1) Scope boundaries

- Core = firmware + hardware + payload contract.
- Cloud/backends are external integrations, not core runtime.
- Every module must declare whether it is core or support tooling.

## 2) Runtime architecture baseline

- Deterministic state machine for turn-taking and interruptions.
- HAL abstraction for audio, servo and GPIO peripherals.
- Transport abstraction for payload ingestion (WebSocket, serial, others).

## 3) Payload contract baseline

- Versioned schema with backward compatibility policy.
- Strict validation at runtime entrypoint.
- Explicit limits for payload size, frequency and timeout.

## 4) Security and privacy baseline

- Zero-audio-storage by default.
- Minimal metadata collection and pseudonymous device ids.
- Input validation and fail-safe rejection paths.

## 5) Reliability baseline

- Idempotent reconnect behavior.
- Bounded queues and backpressure handling.
- Watchdog and recovery strategy for deadlocks.

## 6) Observability baseline

- Structured events for state transitions.
- Metrics: capture latency, playback latency, interruption time, dropouts.
- Error taxonomy focused on actionable hardware/runtime failures.

## 7) Testing baseline

- Unit tests for state machine and validators.
- Integration tests for transport + runtime interactions.
- E2E scenarios for multi-device arbitration.
- Performance tests with thresholds for latency regressions.
- Cable-based mock data harness for reproducible classroom/lab setups.

## 8) Contribution baseline

- Scope gate required in every PR.
- Feature requires new tests; bugfix requires regression test.
- Docs update required whenever payload contract or behavior changes.
