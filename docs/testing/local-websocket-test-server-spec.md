# Local WebSocket Test Server Spec

## Objetivo

Definir un servidor WebSocket local para pruebas de firmware que permita enviar comandos/payloads y simular condiciones de red de forma reproducible.

## Alcance

1. Soportar uno o multiples dispositivos ESP32 conectados en paralelo.
2. Simular proveedor externo de payload para runtime hardware-first.
3. Facilitar debugging en laboratorio y automatizacion en CI.

## Contrato base de mensajes

Cada mensaje debe incluir:

1. `schema_version`
2. `message_type`
3. `session_id`
4. `device_id`
5. `timestamp_ms`
6. `payload`

## Comandos minimos del servidor

1. `CONNECT_ACK`
2. `PLAYBACK_START`
3. `PLAYBACK_STOP`
4. `INTERRUPT`
5. `PING`
6. `FORCE_RECONNECT`

## Eventos esperados del dispositivo

1. `SESSION_CONNECTED`
2. `SESSION_DISCONNECTED`
3. `LISTENING_STARTED`
4. `PLAYBACK_STARTED`
5. `PLAYBACK_STOPPED`
6. `INTERRUPTION_TRIGGERED`
7. `ERROR_RAISED`

## Inyeccion de fallas de red

El servidor debe poder parametrizar:

1. `delay_ms`
2. `jitter_ms`
3. `drop_rate`
4. `disconnect_after_n_messages`
5. `stall_duration_ms`

## Modos de ejecucion

1. Interactivo: consola para enviar comandos manuales.
2. Scripted: ejecucion de escenarios desde fixtures JSON.
3. CI mode: ejecucion no interactiva con salida en formato maquina.

## Artefactos de salida

1. Log de mensajes RX/TX con timestamps monotonic.
2. Resultado de escenario (pass/fail).
3. Metricas: latencia de conexion, reconexiones, timeouts, mensajes descartados.

## Criterios de aceptacion

1. El firmware puede operar contra servidor local sin cambios de codigo fuente.
2. Todos los comandos minimos son procesados de forma estable.
3. Se puede reproducir un escenario de fallo de red de manera determinista.
4. Los reportes generados son aptos para adjuntar en PR.
