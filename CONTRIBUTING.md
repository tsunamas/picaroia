# Contributing to PicaroIA

## Objetivo

Este proyecto adopta una disciplina de desarrollo orientada a seguridad, calidad y escalabilidad para trabajo colaborativo con multiples dispositivos ESP32.

## Flujo oficial por feature

1. Crear branch desde `main`.
2. Implementar la feature o bugfix en ese branch.
3. Correr quality gates locales obligatorios.
4. Abrir PR con evidencia de pruebas.
5. Hacer merge solo si todos los checks pasan.

## Convencion de branches

- `feature/<scope>-<short-name>`
- `fix/<scope>-<short-name>`
- `chore/<scope>-<short-name>`
- `perf/<scope>-<short-name>`
- `security/<scope>-<short-name>`

Ejemplos:

- `feature/backend-llm-router`
- `fix/firmware-i2s-desync`
- `perf/backend-streaming-latency`

## Quality gates obligatorios

Antes de abrir o actualizar un PR, deben pasar:

1. Linter.
2. Type checks (cuando aplique).
3. Unit tests / test cases.
4. Integration tests.
5. End-to-end tests (E2E).
6. Performance tests para rutas criticas.
7. Pruebas de seguridad aplicables al cambio.

## Regla de testing por tipo de cambio

- Feature nueva: debe incluir tests nuevos que validen comportamiento esperado y edge cases.
- Bug fix: debe incluir al menos un test de regresion que falle sin el fix y pase con el fix.
- Refactor sin cambio funcional: debe mantener cobertura y no romper suites existentes.

## Politica de PR

Un PR no se considera listo si falta alguno de estos puntos:

1. Descripcion de alcance y riesgo.
2. Evidencia de pruebas ejecutadas.
3. Casos cubiertos (happy path + edge cases).
4. Impacto en seguridad, privacidad y costos.
5. Plan de rollback cuando el riesgo sea medio/alto.

## Multi-ESP32 y pruebas con datos mockeados

Para soportar escenarios con multiples ESP32 (por ejemplo alumnos en paralelo), toda feature relevante de firmware/backend debe incluir pruebas de concurrencia y arbitraje.

Se aceptan dos capas de validacion:

1. Simulacion con datos mockeados por canal cableado (serial/I2S harness) para reproducibilidad.
2. Validacion hardware-in-the-loop (HIL) con al menos dos dispositivos en sala de prueba.

## Definicion de Done (DoD)

Una tarea se considera terminada solo si:

1. Codigo implementado y revisado.
2. Tests requeridos agregados/actualizados.
3. Todos los quality gates en verde.
4. Documentacion actualizada (si cambia arquitectura o comportamiento).
5. PR aprobado y mergeado a `main`.
