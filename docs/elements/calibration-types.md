---
id: calibration-types
title: Calibration Types
sidebar_position: 12
---

# Calibration Types

BruControl supports multiple calibration types. Each can be enabled/disabled and has type-specific parameters.

For how chains combine and how ports expose calibrated values, see [Calibrations Overview](./calibrations-overview).

## Typical chain order

Arrange calibrations so each step receives values in the domain it expects. A practical pattern is: **(1)** sensor model or curve—**RTD**, **SteinhartHart**, or **LookupTable**—so raw ADC or bus counts become a physical quantity; **(2)** **unit conversions** (**KelvinToFahrenheit**, **CelsiusToFahrenheit**, etc.) so operators and setpoints use consistent units; **(3)** **linear tweaks** (**Multiplier**, **Divider**, **Offset**) for final scaling; **(4)** **Floor** and **Ceiling** last (or immediately after conversion) to bound the signal before control elements consume **Value**. Deviations are fine when you know the math—for example, scaling raw counts before a lookup—but if results look wrong, compare against this baseline order first.

## Configuring types in the Edit Drawer

All types below are added from the element **Edit Drawer** → **Calibration** tab (for ports that support calibrations).

1. Open the device element (e.g., [Analog Input](./analog-input), [SPI Sensor](./spi-sensor)) and select **Calibration**.
2. Choose the **calibrated value** you are editing (`Value`, `Temp`, `Rate`, etc.) when the port exposes more than one.
3. Click **Add calibration** (or equivalent) and pick the **type** from the list.
4. Fill in **type-specific fields** (numbers, coefficients, table rows). Empty optional fields usually default to safe values documented per type.
5. Leave **Enabled** on for each step you want in the active chain; drag or reorder if your UI supports reordering so the math runs top-to-bottom.
6. Save and verify **Value** (and **RawValue** if exposed) on the Dashboard or in a script.

:::tip
Temperature conversions (**FahrenheitToCelsius**, **KelvinToFahrenheit**, etc.) have **no extra parameters**—add them when you only need a unit change. **SteinhartHart**, **RTD**, and **LookupTable** need accurate physical parameters; double-check units (ohms, Kelvin vs °F) against the datasheet.
:::

## Temperature Conversions

| Type | Formula | Use When |
|------|---------|----------|
| **FahrenheitToCelsius** | °C = (°F − 32) × 5/9 | Sensor outputs °F; you want °C |
| **CelsiusToFahrenheit** | °F = °C × 9/5 + 32 | Sensor outputs °C; you want °F |
| **FahrenheitToKelvin** | K = (°F − 32) × 5/9 + 273.15 | Convert to Kelvin |
| **KelvinToFahrenheit** | °F = (K − 273.15) × 9/5 + 32 | Convert from Kelvin |

**Parameters:** None (conversion is fixed).

**Example:** Thermistor outputs °C; add CelsiusToFahrenheit to display in °F.

---

## Linear Scaling

| Type | Formula | Parameters | Use When |
|------|---------|------------|----------|
| **Multiplier** | out = in × multiplier | `multiplier` (default: 1) | Scale by constant |
| **Divider** | out = in ÷ divider | `divider` (default: 1) | Scale down |
| **Offset** | out = in + offset | `offset` (default: 0) | Add constant (zero shift) |

**Example:** ADC 0–1023 → 0–100%: use Multiplier = 100/1023, or chain Divider(1023) + Multiplier(100).

**API example:** `{ "type": "Offset", "enabled": true, "offset": 5 }`

---

## Clamping

| Type | Formula | Parameters | Use When |
|------|---------|------------|----------|
| **Floor** | out = max(in, minimum) | `minimum` | Clamp to minimum |
| **Ceiling** | out = min(in, maximum) | `maximum` | Clamp to maximum |

**Example:** Prevent negative readings: add Floor with minimum = 0.

**API examples:**

```json
{ "type": "Floor", "enabled": true, "minimum": 0 }
```

```json
{ "type": "Ceiling", "enabled": true, "maximum": 100 }
```

---

## RTD (Resistance Temperature Detector)

| Type | Description | Parameters |
|------|-------------|------------|
| **RTD** | Converts raw ADC reading to temperature using standard RTD curves (e.g., PT100, PT1000) | `ref` — Reference resistance (Ω) at 0°C |

**Use when:** You have an RTD sensor (Pt100, Pt1000, etc.) on an analog input. The calibration converts raw ADC value → resistance → temperature.

**API example:** `{ "type": "RTD", "enabled": true, "ref": 100 }` (for PT100)

---

## Steinhart-Hart (Thermistor)

| Type | Description | Parameters |
|------|-------------|------------|
| **SteinhartHart** | Analog input (ADC) → resistance → temperature via Steinhart-Hart equation | `a`, `b`, `c` — Coefficients from sensor datasheet; `resistor` — Series resistor value (Ω) |

**Formula:** 1/T = A + B·ln(R) + C·(ln(R))³. The coefficients (A, B, C) come from the thermistor manufacturer. Input is raw ADC value; the calibration derives resistance from the voltage-divider reading.

**Use when:** NTC thermistor with known Steinhart-Hart coefficients on an analog input. Output is Kelvin; chain with KelvinToFahrenheit for °F display.

---

## Lookup Table

| Type | Description | Parameters |
|------|-------------|------------|
| **LookupTable** | X→Y mapping with linear interpolation between points | `rows` — Array of `{ x, y }` pairs |

**Use when:** Non-linear response (e.g., custom sensor curve, hydrometer, or one-off calibration). Define (raw, calibrated) pairs; values between points are interpolated.

**Example rows:** `[{x: 0, y: 32}, {x: 100, y: 212}]` for a simple linear 0–100 → 32–212°F.

---

## Example chain: Complete PT100 setup for SPI Sensor

A common pattern for a **PT100** on an [SPI Sensor](./spi-sensor) (or any port whose raw reading maps cleanly into the RTD model) is: convert to temperature, then clamp to a safe process range.

Apply these steps **in order**:

1. **RTD** with `ref: 100` — Interprets the raw input as a PT100 curve and outputs temperature in the model’s native unit for that calibration (configure following your sensor documentation).
2. **Floor** with `minimum: 0` — Drops unphysical low readings (e.g., broken wire noise) to zero for control logic.
3. **Ceiling** with `maximum: 500` — Caps spikes or sensor faults so downstream alarms and PID see bounded values.

**API-oriented representation of the chain:**

```json
{
  "calibrations": [
    { "type": "RTD", "enabled": true, "ref": 100 },
    { "type": "Floor", "enabled": true, "minimum": 0 },
    { "type": "Ceiling", "enabled": true, "maximum": 500 }
  ]
}
```

Add **KelvinToFahrenheit** or **CelsiusToFahrenheit** in the chain if your RTD stage does not already end in the unit you display.

:::info
Exact temperature unit at each stage depends on firmware and port implementation—always verify against live **RawValue** vs **Value** after commissioning ([Verifying calibration](#verifying-calibration)).
:::

## Verifying calibration

Use these checks whenever you change coefficients or order:

- **Raw vs calibrated in the UI** — Many device templates show both **RawValue** and **Value**. After saving the chain, change the physical input (or simulate) and confirm **RawValue** moves in the ADC/bus domain while **Value** moves in engineering units.
- **Scripts** — Read **`RawValue`** and **`Value`** with standard [element property syntax](../scripting/element-properties). They should diverge only by the amount your chain prescribes; if they are identical, the chain may be empty, disabled, or attached to a different calibrated output.
- **DisplayText** — For strings that must match operator-facing labels (prefix, suffix, precision), compare **`DisplayText`** to **Value**; see [Device elements overview](./device-elements-overview).

:::tip
Log both **RawValue** and **Value** briefly during bring-up. A linear trend on raw with a flat calibrated value often means a wrong **Divider**, saturated **Floor**/**Ceiling**, or a unit mistake (Kelvin vs °F).
:::

## When to Use Each

| Scenario | Recommended Type(s) |
|----------|----------------------|
| Thermistor (NTC) | SteinhartHart → KelvinToFahrenheit; for **°C**, append **FahrenheitToCelsius** |
| RTD (Pt100/Pt1000) | RTD with correct `ref`; optional Floor/Ceiling for limits |
| Linear voltage or count scaling | Multiplier, Divider, Offset (alone or chained) |
| PWM or fixed integer range ↔ engineering units | Multiplier + Offset or LookupTable on [PWM Output](./pwm-output) |
| Custom non-linear sensor | LookupTable with enough points across the operating range |
| Prevent out-of-range or unsafe readings | Floor, Ceiling (often after conversion, before control) |
| Unit conversion (°F↔°C, K↔°F) | FahrenheitToCelsius, CelsiusToFahrenheit, FahrenheitToKelvin, KelvinToFahrenheit |
| Count scaling (pulses → gallons, etc.) | Multiplier or Divider on **Count Total** / **Rate** |

---

## Troubleshooting

| Symptom | Things to check |
|---------|------------------|
| **Wrong magnitude or unit** | Order of operations: scaling before vs after temperature conversion; Kelvin vs °C vs °F; correct `ref` for RTD |
| **Calibrated value ignores a step** | That step’s **Enabled** flag; steps are skipped when disabled |
| **Nothing seems calibrated** | Empty chain, all steps disabled, or editing the wrong calibrated value on multi-output ports ([Calibrations Overview](./calibrations-overview#troubleshooting)) |
| **Reverse / setpoint does not match hardware** | Reverse path not supported or not configured for that port; confirm **previewReverse** and API payload; for PWM, ensure forward and reverse maps are consistent |
| **LookupTable looks “steppy”** | Too few **rows**; add points where curvature is high |

:::warning
Reordering the chain changes the math. **Multiplier(10)** then **Offset(5)** is not the same as **Offset(5)** then **Multiplier(10)**. After reordering, re-verify with known physical inputs.
:::

## API Format

Calibrations are sent/received as JSON. Each calibration has:

- `type` — One of the type names above
- `enabled` — boolean
- Type-specific fields (e.g., `multiplier`, `divider`, `offset`, `a`, `b`, `c`, `resistor`, `ref`, `rows`)

Example Multiplier calibration:

```json
{
  "type": "Multiplier",
  "enabled": true,
  "multiplier": 0.1
}
```

Example LookupTable:

```json
{
  "type": "LookupTable",
  "enabled": true,
  "rows": [
    { "x": 0, "y": 32 },
    { "x": 100, "y": 212 }
  ]
}
```

For REST details, see [Device API](../api/device-api) and [Calibrations Overview](./calibrations-overview).
