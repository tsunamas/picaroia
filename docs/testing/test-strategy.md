# Testing Strategy

## Objetivo

Garantizar que cada cambio sea seguro, estable y medible en backend y firmware, incluyendo escenarios de multiples ESP32.

## Piramide de pruebas

1. Unit tests: logica aislada (router LLM, guardrails, parsing, estado).
2. Integration tests: contratos entre modulos (websocket, STT/LLM/TTS pipeline).
3. E2E tests: flujo completo de voz con interrupciones y arbitraje.
4. Performance tests: latencia p50/p95/p99, throughput y estabilidad.
5. HIL tests: validacion con hardware real (ESP32).

## Regla obligatoria por PR

- Feature nueva: tests nuevos obligatorios.
- Bug fix: test de regresion obligatorio.
- Cambio critico (seguridad, auth, ejecucion remota, streaming): pruebas de seguridad y carga.

## Suite multi-ESP32

Casos minimos:

1. First-to-lock con 2+ dispositivos hablando casi simultaneo.
2. Inhibicion cruzada durante reproduccion TTS.
3. Reconexion de dispositivos en medio de una sesion activa.
4. Perdida parcial de paquetes sin romper estado global.

## Pruebas con datos mockeados por cable

Para acelerar debugging y entrenamiento de alumnos, se define un harness con inyeccion de payloads mock en canales seriales/I2S:

1. Generar tramas de audio sinteticas con marcas de tiempo controladas.
2. Inyectar jitter y dropout para simular condiciones reales.
3. Reproducir secuencias deterministicas para comparar resultados entre ramas.
4. Guardar reporte de diferencias de latencia y eventos de arbitraje.

## Metricas minimas a reportar

- Latencia total de turno de voz (ms).
- Tiempo de interrupcion efectiva (ms).
- Tasa de errores por minuto.
- Eventos de arbitraje por sesion.
- Uso de tokens/costo estimado por proveedor LLM.

## Criterio de aprobacion

Un PR aprueba si todas las suites requeridas para su categoria pasan y no excede los umbrales de regresion definidos.
