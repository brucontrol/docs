---
id: calibrations-overview
title: Calibrations Overview
sidebar_position: 11
---

# Calibrations Overview

**Calibrations** transform raw values from device ports into meaningful units. They convert voltage to temperature, resistance to °F/°C, or apply scaling and limits.

## What Calibrations Are

A calibration is a mathematical or lookup transformation applied to a value. The **raw value** (e.g., ADC reading, resistance) is fed through the calibration chain to produce a **calibrated value** (e.g., temperature in °F).

- **Forward**: Raw → Calibrated (used for readings)
- **Reverse**: Calibrated → Raw (used when writing setpoints back to hardware, if supported)

## Where Calibrations Live

Calibrations are attached to **device ports**, not to elements directly. Each port can expose one or more **calibrated values** (e.g., `Value`, `Count Total`, `Rate`, `Temp`, `SG`). Each calibrated value has its own calibration chain.

| Location | Description |
|----------|-------------|
| **Port** | Device port (Analog Input, 1-Wire Temp, SPI Sensor, etc.) |
| **Calibrated value** | Named output such as `Value`, `Temp`, `SG`, `Count Total`, `Rate` |
| **Calibration chain** | Ordered list of calibrations applied to that value |

Configure calibrations in the device/port edit UI. The API endpoints are:

- `GET /api/v1/device-port/{portId}/calibrations` — List all calibrated values and their chains
- `PUT /api/v1/device-port/{portId}/calibrations/{calibratedValueName}` — Update a calibration chain

## Calibration Chain

Multiple calibrations can be applied **in order**. The output of one becomes the input of the next.

```
Raw Value → [Cal 1] → [Cal 2] → [Cal 3] → Calibrated Value
```

Example for a thermistor:

1. **SteinhartHart** — Resistance → temperature (Kelvin)
2. **KelvinToFahrenheit** — Convert to °F for display

Each calibration has an **Enabled** flag. Disabled calibrations are skipped.

## Display Settings

Each calibrated value also has display options:

| Setting | Description |
|---------|-------------|
| `prefix` | Text before the value (e.g., `"°F"` or `""`) |
| `suffix` | Text after the value (e.g., `"°F"`) |
| `precision` | Decimal places |
| `previewReverse` | Whether to show reverse-calculation preview when editing |

## Which Ports Use Calibrations

Ports that produce numeric readings typically support calibrations:

- **Analog Input** — Voltage/resistance → temperature, level, etc.
- **1-Wire Temp** — Some sensors need Steinhart-Hart or lookup
- **SPI Sensor** — Raw values → physical units
- **Hydrometer** — Raw → temperature (Temp) and specific gravity (SG)
- **Counter** — Count Total and Rate values can be scaled (Multiplier, Divider)
- **Hysteresis**, **PID**, **Deadband** — Calibration is on the **input port**; the control reads the calibrated value from the input

## Next Steps

- [Calibration Types](./calibration-types) — FahrenheitToCelsius, CelsiusToFahrenheit, Multiplier, Divider, Offset, Floor, Ceiling, RTD, SteinhartHart, LookupTable
