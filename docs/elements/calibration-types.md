---
id: calibration-types
title: Calibration Types
sidebar_position: 12
---

# Calibration Types

BruControl supports multiple calibration types. Each can be enabled/disabled and has type-specific parameters.

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

## When to Use Each

| Scenario | Recommended Type(s) |
|----------|----------------------|
| Thermistor (NTC) | SteinhartHart → KelvinToFahrenheit |
| RTD (Pt100/Pt1000) | RTD |
| Linear voltage scaling | Multiplier, Offset, or both |
| Custom sensor curve | LookupTable |
| Prevent out-of-range | Floor, Ceiling |
| Unit conversion (°F↔°C) | FahrenheitToCelsius, CelsiusToFahrenheit |
| Count scaling (e.g., pulses → gallons) | Multiplier or Divider |

---

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
