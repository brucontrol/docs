---
id: wiring-maps
title: Interface Wiring Maps
sidebar_position: 3
---

# Interface Wiring Maps

Once you have selected a BruControl interface board, you need to know which pins support which device types so you can wire your sensors and actuators correctly. Interface Wiring Maps are the definitive reference for this — they show every pin on a given board/firmware combination and indicate exactly which device types can be connected to each pin.

## Pin Type Codes

Each pin on a wiring map is annotated with one or more letter codes indicating the device types it supports:

| Code | Device Type | Description |
|------|-------------|-------------|
| **D** | Digital Input/Output | Binary on/off devices and switches |
| **P** | PWM Output | Variable power / proportional control (pulse-width modulation) |
| **A** | Analog Input | Variable voltage sensors (ADC reading) |
| **C** | Counter Input | High-speed pulse sensors (flow meters, encoders) |
| **R** | RTD (SPI Sensor) | Resistive Temperature Device via SPI amplifier board |
| **O** | 1-Wire | DS18B20 and similar 1-Wire temperature sensors |
| **H** | Hydrometer | Bluetooth hydrometers — ESP32 only, virtual ports 220–224 |

A pin labeled `D,P` can be used as either a Digital I/O or a PWM output — you choose based on what device you wire to it. A pin labeled `A` only supports Analog Input. Control elements (Duty Cycle, Hysteresis, PID, Deadband) are configured in software and do not map to physical pins directly; they reference other ports.

## Firmware Variations

There is a different wiring map for each combination of interface board and firmware variant. Variations include:

- **Connection type** — Serial (USB), Ethernet (with shield), or Wi-Fi (with shield or built-in)
- **Special features** — RTD board capability, LCD display support, extended I/O configurations
- **Firmware version** — Newer firmware may support additional pin configurations (e.g., firmware 44N+ changed SPI port pull-up behavior)

:::info One Map Per Combo
Always download the wiring map that matches both your board **and** your installed firmware. Using the wrong map may cause incorrect wiring.
:::

## Reading a Wiring Map

Each wiring map lists the interface's pins with their supported type codes. Here is an example showing how to read a typical map:

```
Pin 2:   D         Digital Input or Output only
Pin 3:   D, P      Digital I/O or PWM Output
Pin 4:   D         Digital Input or Output only
Pin 5:   D, C      Digital I/O or Counter Input
Pin A0:  A         Analog Input only
Pin A1:  A         Analog Input only
Pin 10:  D, R      Digital I/O or RTD (SPI Sensor) chip-select
Pin 22:  D, O      Digital I/O or 1-Wire temperature bus
```

**Steps to use a wiring map:**

1. List all the physical devices in your control system (pumps, valves, sensors, etc.)
2. Determine each device's required port type (see [Device Types](./device-types))
3. Match each device to a pin that supports its required type code
4. Wire the device to that pin following proper electrical practices
5. Document your pin assignments — you will need them when creating device elements in BruControl

## Common Interface Boards

### Arduino MEGA 2560

The MEGA is the most capable interface with the highest pin count.

| Feature | Capability |
|---------|-----------|
| Digital I/O | ~45 pins |
| PWM Outputs | 12 pins |
| Analog Inputs | 16 pins |
| Counter Inputs | Up to 4 (hardware interrupt pins) |
| 1-Wire Sensors | 10+ on dedicated pins |
| RTD Sensors | 4+ (with SPI amplifier board) |

**Connection options:** USB Serial (native), Ethernet (with Ethernet shield), Wi-Fi (with WINC1500 shield). Multiple firmware variants available for each connection method.

**Example pin map excerpt (MEGA Serial firmware):**

| Pin | Supported Types | Typical Use |
|-----|----------------|-------------|
| 2 | D | Digital In/Out |
| 3 | D, P | Digital or PWM |
| 4 | D | Digital In/Out |
| 5 | D, P, C | Digital, PWM, or Counter |
| 6 | D, P | Digital or PWM |
| A0 | A | Analog Input |
| A1 | A | Analog Input |
| 22 | D, O | Digital or 1-Wire |
| 50–53 | R | SPI (RTD board) |

### Arduino UNO

The UNO is a smaller, lower-cost option suitable for simple systems.

| Feature | Capability |
|---------|-----------|
| Digital I/O | ~14 pins |
| PWM Outputs | 6 pins |
| Analog Inputs | 6 pins |
| Counter Inputs | Limited (2 hardware interrupt pins) |
| 1-Wire Sensors | Supported on select pins |

**Connection options:** USB Serial only — no Ethernet or Wi-Fi firmware variants are available for the UNO in BruControl.

:::warning UNO Limitations
The UNO has significantly fewer pins and no network firmware support. It is best suited for small, simple systems or as a secondary interface alongside a MEGA or ESP32 for the main control.
:::

### ESP32-Based Interfaces

ESP32 boards offer built-in Wi-Fi and Bluetooth, making them ideal for wireless installations and hydrometer integration.

| Feature | Capability |
|---------|-----------|
| Digital I/O | Multiple pins (varies by board variant) |
| PWM Outputs | Supported on most digital pins |
| Analog Inputs | 2 ADC channels with multiple pins each |
| 1-Wire Sensors | Supported on select pins |
| Hydrometer | Bluetooth hydrometer support (virtual ports 220–224) |

**Connection options:** USB Serial (native) and Wi-Fi (built-in). Supports Access Point mode for wireless network configuration — see [ESP32 AP Mode](../appendix/interface-specific#esp32-specific).

:::info Hydrometer Support
Only ESP32 interfaces support Bluetooth hydrometers (iSpindel, Tilt). Hydrometer ports are virtual (220–224) and do not correspond to physical pins.
:::

## Wiring Best Practices

### Planning Your Layout

1. **Map all devices first** — List every sensor and actuator in your system before starting to wire
2. **Group similar devices** — Keep digital outputs in one area, analog inputs together, etc., for easier troubleshooting
3. **Reserve special pins** — PWM, Counter, and 1-Wire pins have specific hardware requirements; allocate them first
4. **Leave room for expansion** — Don't use every available pin; leave a few spare for future additions
5. **Document everything** — Maintain a wiring diagram and label both ends of every wire

### Physical Wiring

1. **Use appropriate wire gauge** — Match to current requirements; 22–26 AWG for signal wires, heavier for power
2. **Keep wires organized** — Cable management, ties, and labels save hours of debugging later
3. **Separate signal types** — Route high-power lines away from sensor wires to prevent noise interference
4. **Use shielded cable** — For analog signals in electrically noisy environments (near motors, SSRs, VFDs)
5. **Secure all connections** — Use screw terminals, ferrules, or quality connectors; avoid loose wire-wrap connections

### Testing

1. **Verify with a multimeter** before powering up — check for shorts, correct polarity, and expected resistance
2. **Test low voltage first** — Verify logic before applying high power to loads
3. **Add one device at a time** — Wire, test, confirm in BruControl, then move to the next device
4. **Use [Mock Mode](../mocking/overview)** — Test scripts and dashboards with simulated hardware before connecting real devices

## Downloading Wiring Maps

Per-pin wiring maps for every interface and firmware combination are available from [brucontrol.com/download/firmware/](https://brucontrol.com/download/firmware/). Download the wiring map PDF that matches your board and firmware variant.

## Next Steps

- [Control System Considerations](./control-system) — Safety, two-stage power, and panel design guidelines
- [Firmware Installation](./firmware-installation) — Install and configure firmware on your interface
- [Device Types](./device-types) — Detailed description of each supported device type
- [Interface Overview (Appendix)](../appendix/interface-overview) — Specifications and I/O capabilities summary
- [Interface-Specific Considerations](../appendix/interface-specific) — Board-specific notes (WINC1500, ESP32, SPI pull-ups)
