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

Configure calibrations in the device/port edit UI (see [Adding calibrations in the Edit Drawer](#adding-calibrations-in-the-edit-drawer) below). The API endpoints are:

- `GET /api/v1/device-port/{portId}/calibrations` — List all calibrated values and their chains
- `PUT /api/v1/device-port/{portId}/calibrations/{calibratedValueName}` — Update a calibration chain

Example request body shape when updating via API:

```json
{
  "calibrations": [
    { "type": "Multiplier", "enabled": true, "multiplier": 0.1 }
  ],
  "prefix": "",
  "suffix": " °F",
  "precision": 1,
  "previewReverse": false
}
```

## Adding calibrations in the Edit Drawer

Use the **Calibration** tab on the element **Edit Drawer** to build and maintain calibration chains without calling the API.

1. **Open the element for editing** — On the Dashboard, double-click the device element (or use your usual edit workflow) so the [Edit Drawer](../dashboard/element-appearance#edit-drawer) opens on the right.
2. **Select the Calibration tab** — Tabs typically include **General**, **Custom Properties**, **Appearance**, **Calibration** (where supported), and **Interface**. Choose **Calibration**.
3. **Pick the calibrated value** — If the port exposes more than one calibrated output (for example **Temp** and **SG** on a hydrometer), select the value you are configuring. Most simple ports use **Value**.
4. **Add calibrations in order** — Use **Add** (or equivalent) to append a step to the chain. Each step has a **type** (see [Calibration Types](./calibration-types)) and type-specific fields.
5. **Enable each step** — Ensure each calibration you want active has **Enabled** turned on. Disabled steps are skipped when computing the live value.
6. **Set display options** — Adjust **prefix**, **suffix**, and **precision** so labels match what operators expect. Optional **preview reverse** helps when tuning write-back paths.
7. **Save** — Apply changes so the process reloads the chain. Confirm the live **Value** (and **DisplayText**, if used) on the Dashboard or in [scripts](../scripting/element-properties).

:::tip
Complete **General** and **Interface** first—correct **PortID** and **Enabled** state—so you are calibrating live data from the intended pin. See [Device elements overview](./device-elements-overview) for how Edit Drawer tabs fit together.
:::

## Example: Adding a thermistor calibration to an Analog Input

This walkthrough assumes an NTC thermistor in a voltage divider on an [Analog Input](./analog-input).

1. Wire the divider per your interface documentation; the analog pin must see a voltage the ADC can measure.
2. Open the **Analog Input** element → **Calibration** tab → select the **Value** calibrated output (if listed).
3. **Add SteinhartHart** — Enter coefficients **a**, **b**, and **c** from the thermistor datasheet, and the series **resistor** value in ohms. Steinhart-Hart outputs temperature in **Kelvin**.
4. **Add KelvinToFahrenheit** so operators see °F. For **°C** display, add **FahrenheitToCelsius** after **KelvinToFahrenheit** (Kelvin → °F → °C), since Steinhart-Hart outputs Kelvin.
5. Optionally add **Floor** / **Ceiling** to clamp impossible readings (e.g., floor at 0 °F).
6. Set **suffix** to `°F` (or your unit), set **precision**, save, and verify **Value** tracks temperature while **RawValue** stays as the raw ADC domain.

Parameter details for each type are on [Calibration Types](./calibration-types).

## PWM Output and unit conversion

[PWM Output](./pwm-output) elements drive hardware with an internal **raw** range (commonly **0–255**). Calibrations on that port let you work in **engineering units** in the UI and scripts—percent, RPM, valve stroke, etc.—while the firmware still receives the correct duty command.

- **Forward**: When you read **Value**, the chain maps raw 0–255 ↔ your custom range (e.g., **Multiplier** / **Offset**, or a **LookupTable**).
- **Reverse**: When you write **RequestedValue**, supported paths translate your engineering number back into the raw PWM count the board expects.

:::info
Treat PWM calibrations as a **bidirectional contract**: the same chain that scales **Value** for display should reverse correctly for writes. If reverse is not used for your workflow, you can still use forward-only scaling for readbacks and set raw **RequestedValue** explicitly—see your element and API docs for the exact properties.
:::

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

## Port support matrix

| Port / element type | Typical calibrated outputs | Notes |
|---------------------|---------------------------|--------|
| **Analog Input** | `Value` | Voltage/resistance → temperature, level, pressure, etc. |
| **1-Wire Temp** | `Value` (and similar) | Some sensors need Steinhart-Hart or lookup |
| **SPI Sensor** | `Value` | Raw bus readings → physical units ([SPI Sensor](./spi-sensor)) |
| **Hydrometer** | `Temp`, `SG` | Separate chains per channel ([Hydrometer](./hydrometer)) |
| **Counter** | `Count Total`, `Rate` | Scale pulses with **Multiplier** / **Divider** ([Counter](./counter)) |
| **Hysteresis**, **PID**, **Deadband** | Input-side `Value` | Calibration is on the **input** port; the control reads calibrated **Value** ([PID](./pid), [Hysteresis](./hysteresis), [Deadband](./deadband)) |
| **PWM Output** | `Value` / `RequestedValue` | Map 0–255 ↔ custom range for operators and scripts ([PWM Output](./pwm-output)) |

Ports that do not expose numeric calibration chains (for example **Duty Cycle** in many setups) are documented on their individual pages.

## Troubleshooting

### Value shows a raw number (ADC counts, ohms, or 0–255)

If the Dashboard or **Value** in scripts looks like an unscaled raw reading:

- **Calibration disabled** — Open the **Calibration** tab and confirm each step in the chain has **Enabled** checked.
- **Chain not applied to the output you are viewing** — Multi-output ports (hydrometer, counter) may calibrate **Rate** but not **Count Total**, or vice versa. Select the correct calibrated value in the UI.
- **Wrong element or port** — Verify **Interface** tab **PortID** matches the wired sensor; a stale or duplicate element can show raw data from another pin.
- **Process not refreshed** — After saving, confirm the solution is running and the element is **Enabled**.

Use **RawValue** vs **Value** in scripts to separate raw from calibrated readings ([Element properties](../scripting/element-properties)).

:::warning
If **every** calibration is disabled, the port may fall back to exposing the raw reading as **Value**. Re-enable the chain or add at least one enabled step to restore engineering units.
:::

## Related documentation

- [Calibration Types](./calibration-types) — FahrenheitToCelsius, CelsiusToFahrenheit, FahrenheitToKelvin, KelvinToFahrenheit, Multiplier, Divider, Offset, Floor, Ceiling, RTD, SteinhartHart, LookupTable
- [Analog Input](./analog-input) — Thermistors, scaling, and **Calibration** tab
- [SPI Sensor](./spi-sensor) — Calibrated **Value** vs **RawValue**
- [PWM Output](./pwm-output) — 0–255 and calibration for display/setpoint
- [Device elements overview](./device-elements-overview) — Edit Drawer tabs and **DisplayText**
- [Device API](../api/device-api) — Calibration GET/PUT details
