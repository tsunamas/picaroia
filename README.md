# PicaroIA 🦜🤖

¡Bienvenido a **PicaroIA**! Un proyecto de código abierto diseñado para crear un asistente de voz interactivo, ultra rápido y de baja latencia para niños, utilizando hardware accesible y el poder de la Inteligencia Artificial en la nube.

A diferencia de los asistentes tradicionales que sufren de largas pausas o respuestas lentas, PicaroIA utiliza **WebSockets** y control de flujo de audio directo en el hardware (**ESP32**). Esto permite que el dispositivo maneje las interrupciones de forma natural: en cuanto el niño habla, la IA se calla de inmediato, logrando una experiencia mágica, fluida y profesional.

---

## ✨ Características Principales

* **Interrupción Inteligente:** Corte de audio instantáneo a nivel de palabra gracias al manejo de buffers locales en la ESP32.
* **Audio Digital Inmune al Ruido:** Uso del protocolo I2S tanto para la captura (micrófono) como para la salida (altavoz), eliminando el zumbido del Wi-Fi.
* **Arquitectura Full-Duplex:** Conexión bidireccional constante mediante WebSockets impulsada por Node.js y TypeScript.
* **Control de Acentos Regionales:** Integración flexible con modelos de IA (OpenAI, Azure TTS, ElevenLabs) para adaptar la voz al acento local solicitado.

---

## 🛠️ Lista de Componentes (BOM)

Para armar el hardware de PicaroIA necesitas los siguientes componentes económicos y comerciales:

| Componente | Modelo Recomendado | Función | Costo Aprox. |
| :--- | :--- | :--- | :--- |
| **Microcontrolador** | ESP32-WROOM-32E (o ESP32-S3) | El cerebro del dispositivo y puente Wi-Fi. | $4.00 - $6.00 USD |
| **Micrófono Digital** | INMP441 (I2S) | Captura la voz limpia del niño en formato digital. | $2.00 USD |
| **Amplificador DAC** | MAX98357A (I2S) | Decodifica y amplifica el audio recibido del backend. | $2.50 USD |
| **Altavoz / Bocina** | Mini Altavoz 8 Ohms (1W - 3W) | Reproduce la voz de la IA de forma clara. | $1.50 USD |

---

## 🔌 Diagrama de Conexiones (Pinout)

Interconecta los componentes con la ESP32 siguiendo este mapa de pines. Recuerda que el micrófono y el amplificador **comparten las líneas de reloj (SCK/BCLK y WS/LRC)**.

### 1. Alimentación (Energía)
* **INMP441 (Mic):** VDD ➡️ **3.3V** de la ESP32 | GND ➡️ **GND**
* **MAX983
