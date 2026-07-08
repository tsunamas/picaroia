# PicaroIA 🦜🤖

¡Bienvenido a **PicaroIA**! Un asistente de voz interactivo, de código abierto y ultra baja latencia diseñado para niños. 

Gracias al uso de **WebSockets** y una arquitectura de control de flujo de audio directo en el hardware, PicaroIA es capaz de cortar las respuestas de la IA de forma instantánea en cuanto detecta que el niño la interrumpe.

---

## 🚀 Opciones de Hardware Soportadas

Este proyecto está diseñado con una Capa de Abstracción de Hardware (HAL). Puedes elegir entre dos caminos para construir tu PicaroIA:

### Opción A: Plug & Play (Recomendada para empezar)
* **Dispositivo:** [M5Stack Atom Echo](https://docs.m5stack.com/en/core/atom_echo) (~$12 USD).
* **Ventajas:** Es un mini altavoz inteligente del tamaño de una caja de fósforos que ya incluye ESP32, micrófono, amplificador, bocina y carcasa. **Cero cables, cero soldadura.**

### Opción B: DIY Personalizada (Para peluches o juguetes propios)
Si prefieres armar tu propio circuito para integrarlo dentro de un juguete, necesitas:
* **Microcontrolador:** ESP32-WROOM-32E o ESP32-S3.
* **Micrófono Digital:** INMP441 (I2S).
* **Amplificador DAC:** MAX98357A (I2S).
* **Altavoz:** Mini Bocina de 8 Ohms (1W - 3W).

> 👁️ **Nota sobre el futuro (Fase 2 - Visión):** La arquitectura del firmware está preparada para soportar el módulo **M5Stack CoreS3**. En la próxima fase, activar la cámara frontal permitirá interacciones multimodales (Voz + Visión).

---

## 🔌 Diagrama de Conexiones (Solo para Opción B - DIY)

| Función I2S | Pin INMP441 (Mic) | Pin MAX98357A (Amp) | Pin Digital ESP32 |
| :--- | :--- | :--- | :--- |
| **BCLK** (Bit Clock) | SCK | BCLK | **GPIO 14** |
| **WS / LRCLK** | WS | LRC | **GPIO 15** |
| **SD / DIN** (Datos) | SD (Data Out) | *No conectar* | **GPIO 32** (Entrada) |
| **DIN** (Datos) | *No conectar* | DIN (Data In) | **GPIO 22** (Salida) |

*Alimentación:* Micrófono a **3.3V**. Amplificador a **5V / Vin**. Pin **L/R** del micrófono a **GND**.

---

## 📂 Estructura del Monorepo

```text
picaroia/
├── backend/          # Servidor Node.js + TypeScript (Orquestador de IA)
├── firmware/         # Código C++ para la ESP32 (Soporta múltiples placas)
└── hardware/         # Documentación de circuitos y carcasas
