---
id: overview
title: Elements Overview
sidebar_position: 1
---

# Elements Overview

Elements are the building blocks of your BruControl system. Each element combines **data**, an **element template**, and **appearance** (position, size, rotation) to create what you see and control on the Dashboard.

## Device vs Non-Device Elements

| Category | Description | Examples |
|----------|-------------|----------|
| **Non-Device** | Software-only elements that live in a workspace. No physical hardware connection. | Global Variable, Toggle Switch, Button, Timer, Alarm, Chart, Profile, Script Element, Generic |
| **Device** | Elements backed by a device port (interface + port). Read from or control physical hardware. | Digital Output, Analog Input, 1-Wire Temp, PID, Hysteresis, Duty Cycle, etc. |

Non-device elements are created directly in a workspace or folder. Device elements are created by adding a device (interface + port) and choosing the element type for that port.

## Element = Data + Template + Appearance

Every element has three layers:

1. **Data** — Native properties (value, state, etc.) and optional custom properties from the element template
2. **Element Template** — The visual representation (e.g., gauge, toggle, chart). Templates define custom properties (colors, fonts, layout) via `ui-controls.json`
3. **Appearance** — Position (x, y), size (width, height), z-order, rotation — stored per theme

## All Element Types

### Non-Device Elements

| Type | Description |
|------|-------------|
| [Global Variable](./global-variable) | Store values (numeric, boolean, string, time, datetime). Script variables, displays. |
| [Toggle Switch](./toggle-switch) | On/off state. Manual override, script trigger. |
| [Button](./button) | Momentary press. One-shot actions. |
| [Generic](./generic) | Flexible container. Labels, custom displays. |
| [Timer](./timer) | Count-up or count-down. Mash timer, boil timer. |
| [Alarm](./alarm) | Threshold monitoring. High temp, low level alerts. |
| [Script Element](./script) | Links to a Process (script). Run, stop, pause from UI. |
| [Chart](./chart) | Time-series display. Temperature history, data logging. |
| [Profile](./profile) | Ramp/profile control. Temperature ramps, step mashing. |

### Device Elements

| Type | Description |
|------|-------------|
| Digital Output | On/off control (relays, valves) |
| Digital Input | Read on/off states |
| Duty Cycle | Time-based on/off cycling |
| PWM Output | Pulse-width modulation |
| Analog Input | Variable voltage reading |
| Counter | Pulse counting (flow meters) |
| 1-Wire Temp | Temperature sensors |
| SPI Sensor | SPI-connected sensors |
| Hydrometer | Specific gravity |
| Hysteresis | Temperature control with deadband |
| PID | Proportional-Integral-Derivative control |
| Deadband | Prevent oscillation |

See [Device Elements Overview](./device-elements-overview) for device-specific documentation.

## Adding Elements

- **Non-device**: Right-click a workspace in Solution Explorer → [Element Type] (e.g., Button, Timer, Alarm)
- **Device**: Right-click a workspace → **Device**, then select interface, element type, and port

## Next Steps

- [Non-Device Elements](./global-variable) — One page per type with properties and script integration
- [Calibrations](./calibrations-overview) — Transform raw device values (temperature, voltage, etc.)
