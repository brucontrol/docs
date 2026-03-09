---
id: device-elements-overview
title: Device Elements Overview
sidebar_position: 1
---

# Device Elements Overview

Device elements are BruControl elements that connect to physical hardware through an **interface** (microcontroller). Each device element represents a specific port on that interface and a specific **port type** that determines what the element can do.

## What Is a Device?

A **device** in BruControl is defined by three things:

1. **Interface** — The microcontroller board (e.g., Arduino MEGA) that connects to your PC via USB or network
2. **Port** — A specific pin or channel on that interface
3. **Element Type** — The kind of device (Digital Output, Analog Input, PID, etc.)

When you add a device element, you choose the interface, the port number, and the element type. The interface wiring map for your board shows which pins support which types.

## Enable and Disable

Every device element has an **Enabled** property. When disabled:

- The element is not communicated with
- Scripts cannot read or write its values
- The element may show as "DISABLED" or inactive in the UI

Enable a device when it is wired and ready to use; disable it when troubleshooting or when the hardware is disconnected.

## Port Types

Each device element uses one of these port types. The port type determines the hardware capability and the properties available.

| Port Type | Description | Typical Use |
|-----------|-------------|-------------|
| **DigitalOutput** | On/off output | Relays, pumps, heaters, LEDs |
| **DigitalInput** | On/off input | Switches, sensors, contacts |
| **DutyCycle** | Cycled on/off output | Proportional control via time ratio |
| **PWMOutput** | Pulse-width modulated output | Variable speed motors, dimming, proportional valves |
| **AnalogInput** | Variable voltage input | Pressure, temperature (analog), flow, weight |
| **Counter** | High-speed pulse counting | Flow meters, encoders, hall-effect sensors |
| **OWTemp** | 1-Wire temperature sensor | DS18B20 and compatible probes |
| **SPISensor** | SPI-connected sensor | RTD boards, specialized sensors |
| **Hydrometer** | Electronic hydrometer | iSpindel and compatible devices |
| **Hysteresis** | On/off control from an input | Simple temperature control (e.g., refrigeration) |
| **PID** | Proportional–Integral–Derivative control | Precise temperature, pressure, or flow control |
| **Deadband** | Band-based control from an input | Multi-zone heating/cooling, stepped control |

## Adding a Device Element

1. In the Solution Explorer, right-click a workspace
2. Choose **Device** from the context menu
3. In the Add Device Element modal, select the **Interface** (microcontroller)
4. Select the **Element Type** (Digital Output, Analog Input, etc.)
5. Select the **Port** (pin number from the wiring map)

The port must support the chosen element type per your interface's wiring map.

## Common Properties

All device elements share some properties:

- **Display Name** — Shown in the UI and Solution Explorer
- **Name** — Internal name (fallback if Display Name is empty)
- **Enabled** — Whether the device is active
- **Visibility** — Whether the element appears on the Dashboard
- **User Control** — Whether users can manually change values from the Dashboard
- **Refresh Multiple** — Multiplier for the interface refresh interval (1–60)
- **Data Logging** — Enable historical logging and set logging interval

## Edit Drawer Tabs

When you edit a device element, the Edit Drawer includes:

- **General** — Display name, native properties (Enabled, User Control, etc.), port-specific settings
- **Custom Properties** — Widget appearance (from the selected template)
- **Appearance** — Widget template choice, position, size
- **Calibration** — (Where applicable) Transform raw values (e.g., Analog Input, 1-Wire Temp, SPI Sensor)
- **Interface** — Port assignment and connection status

## Related Pages

- [Digital Output](./digital-output.md)
- [Digital Input](./digital-input.md)
- [Duty Cycle](./duty-cycle.md)
- [PWM Output](./pwm-output.md)
- [Analog Input](./analog-input.md)
- [Counter](./counter.md)
- [1-Wire Temperature](./ow-temp.md)
- [SPI Sensor](./spi-sensor.md)
- [Hydrometer](./hydrometer.md)
- [Hysteresis](./hysteresis.md)
- [PID](./pid.md)
- [Deadband](./deadband.md)
