# PicaroIA 🦜🤖

¡Bienvenido a **PicaroIA**! Un asistente de voz interactivo, de código abierto y ultra baja latencia diseñado para revolucionar la interacción humana-IA mediante hardware accesible.

A diferencia de los asistentes tradicionales que sufren de pausas largas, PicaroIA utiliza **WebSockets** y control de flujo directo en el hardware. Esto permite manejar interrupciones de forma quirúrgica: en cuanto el usuario habla, el dispositivo limpia su buffer local y la IA se calla en seco, logrando una experiencia fluida, natural y profesional.

---

## 🛡️ Pilares de Seguridad, Privacidad y Mitigación de Mal Uso

Este proyecto considera la **seguridad y la privacidad como prioridades máximas**. El código base implementa las siguientes trabas y protecciones nativas en el backend para evitar su explotación o mal uso:

* **Privacidad por Diseño (Cero Almacenamiento):** El flujo de audio se procesa estrictamente en memoria (streaming de bytes) y se desecha inmediatamente después de ser transcrito. El servidor **no almacena grabaciones de voz** por defecto.
* **Filtros Anti-Prompt Injection:** Sanitización activa de texto previa al envío al LLM, evitando que comandos de voz maliciosos intenten "hackear" o alterar las instrucciones del sistema.
* **Moderación de Contenido Automatizada:** Todo texto generado por la IA pasa por un pipeline estricto de moderación (ej. OpenAI Moderation API) antes de convertirse en audio, bloqueando en seco cualquier contenido violento, inadecuado o peligroso.
* **Protección contra Drenado de Créditos (Rate Limiting):** Limitación de solicitudes por IP e identificador de hardware para prevenir ataques de denegación de servicio (DoS) y bucles infinitos de facturación de APIs de pago.

---

## 👥 Ecosistema Multi-Compañero y Accesibilidad Económica

PicaroIA permite conectar dos o más dispositivos físicos dentro de una misma "Sala de WebSockets" administrada centralmente por el backend, abriendo una puerta gigantesca a la accesibilidad cognitiva y social por **menos de $25 USD en total**.

Para resolver el solapamiento de audio en la misma habitación (evitando el eco o bucles infinitos de procesamiento), implementamos un **Algoritmo de Arbitraje de Micrófono por Software (First-to-Lock):**
1. **Alerta Activa:** Todos los dispositivos de la sala escuchan en paralelo.
2. **Bloqueo por Velocidad (First-to-Lock):** El niño habla y el backend selecciona el primer paquete de audio que llegue con éxito (el micrófono con mejor señal o cercanía). En ese microsegundo, bloquea la sala para ese dispositivo y descarta el audio redundante de los demás.
3. **Inhibición Cruzada:** Mientras un compañero reproduce la respuesta de la IA a través de su altavoz, el backend ignora temporalmente la entrada de todos los micrófonos de la sala, eliminando la necesidad de hardware caro de cancelación de eco.

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
├── backend/          # Servidor Node.js + TypeScript (Orquestador de IA y Seguridad)
├── firmware/         # Código C++ para la ESP32 (Manejo de audio local y servos)
└── hardware/         # Planos, esquemáticos y diseño de carcasas
```

---

## 🧠 Base de Arquitectura LLM Provider-Agnostic (v0)

Para mantener la libertad de elección de modelos y evitar lock-in por proveedor, el backend inicia con una arquitectura desacoplada:

* **Contrato común de proveedores LLM:** `backend/src/ai/contracts.ts`
* **Adaptadores por proveedor:** `backend/src/ai/providers/*`
* **Política de ruteo auditable:** `backend/src/ai/policy.ts`
* **Guardrails desacoplados (sanitización + moderación):** `backend/src/ai/guardrails.ts`
* **Orquestación central única:** `backend/src/ai/router.ts`

Documentación de esta base:

* `docs/architecture/provider-agnostic.md`
* `docs/architecture/foundations.md`

Con esta base, agregar un proveedor nuevo implica solo crear su adapter y registrarlo, sin tocar la lógica de seguridad ni el flujo principal de orquestación.

---

## ✅ Flujo de Trabajo y Calidad para Features

Para mantener calidad consistente en crecimiento colaborativo, el proyecto fija un flujo obligatorio de `branch -> tests -> PR -> merge`.

Documentos clave:

* `CONTRIBUTING.md`
* `docs/process/feature-workflow.md`
* `docs/testing/test-strategy.md`

Reglas centrales:

1. Toda feature nueva debe traer tests nuevos.
2. Todo bugfix debe traer test de regresión.
3. Ningún PR se mergea sin quality gates en verde (lint, tests, e2e y performance cuando aplique).
