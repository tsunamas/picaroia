# PicaroIA 🦜🤖

¡Bienvenido a **PicaroIA**! Un runtime de hardware de voz, de código abierto y ultra baja latencia, diseñado para ejecutar interacción local en ESP32 consumiendo un payload externo.

A diferencia de soluciones monolíticas, PicaroIA separa responsabilidades: el dispositivo resuelve audio, estado e interrupciones en tiempo real; la inteligencia externa solo entrega payloads de entrada/salida mediante contrato versionado.

---

## 🎯 Alcance del Proyecto (Scope V1)

Este repositorio se delimita al **hardware** y su runtime local:

1. Firmware ESP32 y HAL (micrófono, speaker I2S, servo, botones, leds).
2. Máquina de estados local para turn-taking e interrupciones.
3. Contrato de payload externo (entrada/salida) y validación local.
4. Pruebas de hardware, multi-ESP32 y harness con datos mockeados por cable.

Fuera de scope del core:

1. Orquestación de LLM en la nube.
2. Moderación cloud, billing, auth o lógica de producto backend.
3. Dependencia directa de un proveedor específico de IA.

Documento oficial de alcance:

* `docs/architecture/scope.md`
* `docs/architecture/lvgl-integration-spec.md`

---

## 🛡️ Pilares de Seguridad, Privacidad y Robustez Local

Este proyecto considera la **seguridad y la privacidad como prioridades máximas** en dispositivo. El runtime local aplica las siguientes protecciones:

* **Privacidad por Diseño (Cero Almacenamiento):** El audio se procesa en memoria y se descarta al terminar cada ciclo.
* **Validación Estricta de Payloads:** Todo payload externo debe cumplir esquema y límites de tamaño/tiempo.
* **Control de Fallos Local:** Watchdog, límites de cola y manejo de reconexiones para evitar estados colgados.
* **Identidad de Dispositivo Acotada:** Uso de identificadores seudónimos y mínimo metadata para operación.

---

## 👥 Ecosistema Multi-Compañero y Accesibilidad Económica

PicaroIA permite conectar dos o más dispositivos físicos dentro de una misma sala de interacción, abriendo una puerta gigante a la accesibilidad cognitiva y social por **menos de $25 USD en total**.

Para resolver el solapamiento de audio en la misma habitación (evitando el eco o bucles infinitos de procesamiento), implementamos un **Algoritmo de Arbitraje de Micrófono por Software (First-to-Lock):**
1. **Alerta Activa:** Todos los dispositivos de la sala escuchan en paralelo.
2. **Bloqueo por Velocidad (First-to-Lock):** El runtime selecciona el primer stream de audio válido y descarta redundancia de los demás dispositivos.
3. **Inhibición Cruzada:** Mientras un compañero reproduce audio, se inhibe temporalmente la captura de los micrófonos del resto para evitar bucles.

---

## 🚀 Opciones de Hardware Soportadas

Gracias a nuestra Capa de Abstracción de Hardware (HAL), puedes elegir el camino que mejor se adapte a tu presupuesto:

### Opción A: Plug & Play (Cero cables, cero soldadura)
* **Dispositivo:** [M5Stack Atom Echo](https://docs.m5stack.com/en/core/atom_echo) (~$12 USD).
* **Ventajas:** Mini altavoz inteligente listo para usar con carcasa, chip ESP32, micrófono digital y altavoz integrado.

### Opción B: DIY Personalizada (Para peluches o juguetes con movimiento)
* **Componentes:** ESP32-WROOM-32E, Micrófono Digital INMP441 (I2S), Amplificador DAC MAX98357A (I2S), Mini Bocina (8 Ohms) y un **Servomotor SG90/MG90S** para controlar la apertura física de la boca en sincronía con la voz.

---

## 🔌 Diagrama de Conexiones (Solo para Opción B - DIY)

| Función I2S | Pin INMP441 (Mic) | Pin MAX98357A (Amp) | Pin Digital ESP32 |
| :--- | :--- | :--- | :--- |
| **BCLK** (Bit Clock) | SCK | BCLK | **GPIO 14** |
| **WS / LRCLK** | WS | LRC | **GPIO 15** |
| **SD / DIN** (Datos) | SD (Data Out) | *No conectar* | **GPIO 32** (Entrada) |
| **DIN** (Datos) | *No conectar* | DIN (Data In) | **GPIO 22** (Salida) |

* **Servomotor (Boca):** Señal ➡️ **GPIO 13** | VCC ➡️ **5V** | GND ➡️ **GND**
* *Configuración:* Soldar pin **L/R** del Mic a **GND**. Dejar pines **GAIN** y **SD** del Amp sueltos.

---

## 📂 Estructura del Monorepo

```text
picaroia/
├── firmware/         # Código C++ para la ESP32 (runtime local, audio y servos)
├── hardware/         # Planos, esquemáticos y diseño de carcasas
├── docs/             # Alcance, proceso y estrategia de pruebas
└── backend/          # Referencias/harness de integración (no core de producto)
```

---

## 🔌 Contrato de Payload Externo (v1)

El core del dispositivo solo consume/produce payloads versionados. El proveedor externo (backend, orquestador o LLM gateway) es intercambiable.

Campos clave esperados:

1. `schema_version`
2. `session_id` y `device_id`
3. `command` o `audio/text payload`
4. Metadatos de control de latencia e interrupción

Reglas:

1. Si el payload no valida, se rechaza de forma segura.
2. El runtime no depende de APIs propietarias para funcionar.
3. El contrato se versiona y se mantiene compatibilidad hacia atrás cuando sea posible.

---

## ✅ Flujo de Trabajo y Calidad para Features

Para mantener calidad consistente en crecimiento colaborativo, el proyecto fija un flujo obligatorio de `branch -> tests -> PR -> merge`, con control estricto de alcance hardware-first.

Documentos clave:

* `CONTRIBUTING.md`
* `docs/process/feature-workflow.md`
* `docs/testing/test-strategy.md`
* `docs/architecture/lvgl-integration-spec.md`
* `docs/testing/local-websocket-test-server-spec.md`

Reglas centrales:

1. Toda feature nueva debe traer tests nuevos.
2. Todo bugfix debe traer test de regresión.
3. Ningún PR se mergea sin quality gates en verde (lint, tests, e2e y performance cuando aplique).
