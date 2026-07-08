# PicaroIA Scope (Hardware-First)

## Decision

El core del proyecto se delimita a:

1. Hardware ESP32 y runtime local de voz.
2. Contrato de payload externo versionado.
3. Integracion multi-dispositivo y pruebas reproducibles con datos mockeados por cable.

## In Scope (v1)

1. Firmware para captura/reproduccion de audio (I2S).
2. HAL para microfono, speaker, servo y perifericos.
3. Maquina de estados local: idle, listening, speaking, interrupted, error.
4. Transporte WebSocket para recibir/enviar payload externo en tiempo real.
5. Validacion de payload externo (schema, tamano, timeouts).
6. Reconexion WebSocket, heartbeat y manejo de desconexion segura.
7. Manejo de concurrencia multi-ESP32 y arbitraje first-to-lock.
8. Harness de pruebas serial/I2S con inyeccion de datos sinteticos.
9. Observabilidad local de latencia, dropouts y eventos de estado.

## Out of Scope (core)

1. Orquestacion cloud de LLM.
2. Moderacion cloud, billing, auth y gestion de usuarios.
3. Lógica de producto backend no necesaria para operar el dispositivo.
4. Acoplamiento del runtime a un proveedor de IA especifico.

## Payload Contract Principles

1. Todo payload incluye `schema_version`.
2. Compatibilidad hacia atras por version menor cuando sea viable.
3. El runtime rechaza payload invalido de forma segura.
4. El contrato define maximos de tamano, frecuencia y tiempo de vida.
5. El contrato separa comandos de control de datos de contenido.

## Acceptance Criteria for PRs

1. El cambio aporta valor directo al runtime de hardware.
2. El cambio define o respeta el contrato de payload.
3. El cambio incluye pruebas (feature: nuevos tests; bugfix: regresion).
4. Si afecta latencia/estado, reporta impacto en metricas.
5. No introduce dependencia dura a servicios cloud en el core.

## Roadmap Boundaries

- v1: Runtime local estable + contrato versionado + pruebas multi-ESP32.
- v2: Mejoras de ergonomia, tooling y diagnostico.
- v3: Integraciones cloud opcionales solo como adaptadores externos.
