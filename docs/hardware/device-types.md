---
id: device-types
title: Device Types
sidebar_position: 2
---

# Device Types

BruControl supports a wide range of device types for reading sensors and controlling actuators. Each device type maps to a specific port type on the interface, and in most cases supporting hardware (relays, signal conditioners, power supplies) is required to bridge the low-voltage interface signals to real-world equipment. This page describes every supported device type, what it does, and when to use it.

:::info Input/Output Direction
The "input" or "output" direction is always from the interface's perspective. A "digital output" means the interface sends a signal out to a relay or actuator. A "digital input" means the interface reads a signal from a switch or sensor.
:::

## Supported Device Types

BruControl defines 12 port types in firmware, organized into the categories below. Each port type corresponds to a device element type when configuring elements in the application. For configuration details, see [Device Elements Overview](../elements/device-elements-overview).

| Code | Port Type | Category | Description |
|------|-----------|----------|-------------|
| **D** | DigitalOutput | Output | Binary on/off switching |
| **D** | DigitalInput | Input | Binary on/off reading |
| **P** | PWMOutput | Output | Pulse-width modulated variable output |
| **A** | AnalogInput | Input | Variable voltage reading (ADC) |
| **C** | Counter | Input | High-speed pulse counting |
| **O** | OWTemp | Input | 1-Wire temperature sensor (DS18B20) |
| **R** | SPISensor | Input | SPI-based RTD sensor (PT100/PT1000) |
| **H** | Hydrometer | Input | Bluetooth/Wi-Fi hydrometer (ESP32 only) |
| — | DutyCycle | Control | Time-ratio on/off cycling |
| — | Hysteresis | Control | On/off control with setpoint band |
| — | PID | Control | Proportional-Integral-Derivative output |
| — | Deadband | Control | Multi-zone band-based control |

### 1. Digital Outputs

Digital outputs are commanded on/off signals used to switch devices such as:

- Motors and pumps
- Heaters (via SSR or contactor)
- Refrigeration compressors
- Motorized valves and solenoids
- Relays and indicators (LEDs, buzzers)

**Typical integration:** The interface pin drives a Solid State Relay (SSR) or mechanical relay. The relay switches the higher-voltage load. Never connect high-voltage loads directly to interface pins.

---

### 2. Digital Inputs

Digital inputs read the on/off state of switches, contacts, and binary sensors:

- Push buttons and toggle switches
- Float switches (liquid level detection)
- Proximity and limit switches
- Door/lid contacts and safety interlocks
- Emergency stop buttons

**Typical integration:** Wire the switch between the interface input pin and ground (or VCC, depending on pull-up configuration). The interface reads HIGH or LOW.

---

### 3. PWM Outputs (Analog Outputs)

PWM (Pulse Width Modulation) outputs provide variable or proportional control by modulating the duty cycle of a digital signal. Devices controlled include:

- Variable speed pumps and fans
- Proportional valves and actuators
- Motor speed control
- Dimmable lighting
- Heater power modulation

**How it works:** PWM rapidly switches the output on and off. The ratio of on-time to total cycle time (duty cycle) controls the effective power delivered to the device, providing smooth 0–100% control. PWM can be converted to a true analog voltage with an RC low-pass filter circuit.

---

### 4. Analog Inputs

Analog inputs read variable voltage levels from proportional sensors:

- Pressure transducers (0–5V or 4–20mA with converter)
- Thermistors and analog temperature sensors
- Flow sensors with analog output
- Weight/load cells (with amplifier)
- pH sensors
- Liquid level sensors (analog)

**Characteristics:** The interface ADC converts the voltage to a digital value (typically 0–1023 for 10-bit or 0–4095 for 12-bit resolution). Values are mapped to engineering units via [calibration](../appendix/interface-specific) in BruControl.

---

### 5. Counter Inputs

Counter inputs measure high-speed pulses from pulse-output sensors:

- Encoders and tachometers
- Hall effect sensors
- Flow meters with pulse output
- Proximity sensors used for counting

**Measurement modes:**
- **Total Count** — Cumulative pulses since last reset (e.g., total gallons)
- **Rate** — Pulses per time period / frequency (e.g., GPM, RPM)

---

### 6. Temperature Sensors

BruControl supports two specialized temperature sensor types for high-accuracy readings.

#### 1-Wire Temperature Sensors — OWTemp

- DS18B20 and compatible sensors
- Digital output — each sensor has a unique address
- Multiple sensors on a single data wire (parasitic or powered mode)
- Good accuracy (±0.5°C typical)
- Easy to implement with minimal wiring

#### RTD Sensors — SPISensor

- PT100 and PT1000 Resistance Temperature Detectors
- 2-wire, 3-wire, or 4-wire configurations
- High accuracy and long-term stability
- Requires SPI interface amplifier boards (e.g., MAX31865)
- See [SPI Sensor Considerations](../appendix/interface-specific#spi-sensor-considerations) for pull-up resistor notes

**Typical use cases:** Fermentation temperature control, mash temperature monitoring, boil kettle temperature, hot liquor tank monitoring, glycol loop monitoring, and refrigeration monitoring.

---

### 7. Control Elements

Control elements are virtual output ports that combine a sensor input with a control algorithm to drive an output automatically. They run on the interface firmware, providing fast, reliable closed-loop control.

#### Duty Cycle Output

- Cycled on/off output for proportional control via time ratio
- Configurable interval (cycle period) and duty percentage
- Alternative to PWM for relay-based loads that cannot switch fast enough for PWM frequencies

#### Hysteresis Output

- On/off control driven by an analog input (e.g., temperature)
- Configurable high and low setpoints with a hysteresis band to prevent rapid cycling
- Typical use: refrigeration control, simple heating/cooling, level control

#### PID Control

- Proportional–Integral–Derivative closed-loop controller
- Tunes output to maintain a setpoint from an analog input
- Configurable P, I, D gains, output limits, and sample interval
- Typical use: precise temperature control, pressure regulation, flow control

#### Deadband Control

- Multi-zone band-based control from an analog input
- Multiple output zones (e.g., heat zone, dead zone, cool zone)
- Typical use: dual-action heating/cooling, stepped control with separate heat and cool outputs

---

### 8. Electronic Hydrometers

Electronic hydrometers are wireless sensors used primarily in fermentation monitoring. They connect via Bluetooth (ESP32 only) or Wi-Fi.

**Supported devices:**
- iSpindel
- Tilt hydrometer (all colors)

**Data provided:** Specific gravity, temperature, battery level, and tilt angle.

**Virtual ports:** Hydrometers use virtual port numbers 220–224 on ESP32 interfaces. See [iSpindel Considerations](../appendix/interface-specific#ispindel-hydrometer-considerations) for integration details.

---

## Integration Requirements

### Supporting Hardware

Most devices require supporting hardware for integration:

| Component | Purpose | Examples |
|-----------|---------|----------|
| **Relays** | Switch high-power loads from low-voltage interface signals | SSRs, mechanical relays, contactors |
| **Signal conditioning** | Convert sensor signals to interface-compatible voltage | Amplifiers, 4–20mA converters, voltage dividers |
| **Power supplies** | Provide correct voltage/current for sensors and actuators | 5V, 12V, 24V DC supplies |
| **Protection circuits** | Protect interface and downstream devices | Fuses, flyback diodes, TVS diodes, MOVs |
| **Interface boards** | Specialized sensor interfaces | MAX31865 RTD amplifiers, load cell amplifiers |

### Wiring Considerations

- Use proper wire gauge for the current requirements of each circuit
- Use shielded cables for analog signals in electrically noisy environments
- Maintain proper grounding to prevent noise and ground loops
- Use appropriate connectors rated for the application
- Route low-voltage signal wires away from high-voltage/high-current power lines
- Label all wires at both ends for future serviceability

:::tip Mock Mode for Testing
You can test device elements, scripts, and dashboards without physical hardware using [Mock Mode](../mocking/overview). Mock mode simulates all 12 port types, so you can verify control logic before wiring anything.
:::

## Next Steps

- [Interface Wiring Maps](./wiring-maps) — Pin assignments for your interface board
- [Control System Considerations](./control-system) — Safety and design guidelines for your control panel
- [Device Elements](../elements/device-elements-overview) — Configure device elements in BruControl
- [Interface-Specific Notes](../appendix/interface-specific) — Per-board considerations (SPI pull-ups, ESP32 AP mode, WINC1500)
