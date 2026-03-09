---
id: ow-temp
title: 1-Wire Temperature (OW Temp)
sidebar_position: 8
---

# 1-Wire Temperature (OW Temp)

An **OW Temp** (1-Wire Temperature) element reads temperature from DS18B20 or compatible 1-Wire sensors. Multiple sensors can share a single bus.

## What It Is

A 1-Wire temperature sensor uses a single data line (plus power and ground) for communication. Multiple DS18B20 sensors can be daisy-chained. Each sensor has an address; the **Sensor Index** selects which sensor on the bus this element reads.

## Hardware Connection

- **Single sensor**: Connect data (DQ), VDD, and GND per the DS18B20 datasheet. A 4.7 kΩ pull-up resistor on the data line is typically required.
- **Multiple sensors**: All sensors share the same data line. Each has a unique 64-bit address; the interface discovers them and assigns indices.

:::tip
1-Wire is sensitive to cable length and noise. Keep the bus short and use shielded cable if needed. For long runs, consider a dedicated 1-Wire interface or powered bus.
:::

## Port Type

**OWTemp** — Use a pin designated for 1-Wire (O) on your interface wiring map.

## Native Properties

| Property | Type | Description |
|----------|------|-------------|
| **Value** | number | Current temperature (calibrated). Read-only. |
| **RawValue** | number | Raw temperature before calibration. Read-only. |
| **Precision** | number | Decimal places for display. Read-only (configured in Calibration tab). |
| **Prefix** | string | Text before value. Read-only (configured in Calibration tab). |
| **Suffix** | string | Text after value. Read-only (configured in Calibration tab). |
| **Enabled** | boolean | Whether the device is active |
| **User Control** | boolean | Allow user interaction with the widget |
| **Refresh Multiple** | number | Refresh rate multiplier (1–60). Read/write. |
| **SensorIndex** | number | Sensor index on bus (0–99). Read/write. |
| **Unit** | 0 or 1 | 0 = Celsius, 1 = Fahrenheit. Read/write. |

## Custom Properties

From the default OW Temp widget template (`ow-temp`):

| Property | Type | Default | Group | Description |
|----------|------|---------|-------|--------------|
| showHeader | boolean | true | Layout | Show header bar |
| showBackground | boolean | true | Layout | Show widget background and border |
| showLabel | boolean | true | Layout | Show title label in header |
| hiddenRowKeys | array | — | Layout | Hide rows: "temperature" |
| showValue | boolean | true | Layout | Show primary value rows |
| decimalPlaces | number | 1 | Value | Decimal places (0–5) |
| labelFontFamily | font-family | — | Label | Label font |
| labelFontSize | number | 12 | Label | Label font size (8–48) |
| labelFontWeight | text | "500" | Label | Label font weight |
| labelFontStyle | text | "normal" | Label | Label font style |
| labelColor | color | (theme) | Label | Label color |
| valueFontFamily | font-family | — | Value | Value font |
| valueFontSize | number | 14 | Value | Value font size (10–120) |
| valueFontWeight | text | "700" | Value | Value font weight |
| valueFontStyle | text | "normal" | Value | Value font style |
| valueColor | color | (theme) | Value | Value color |
| backgroundColor | color | (theme) | Background & Border | Widget background |
| headerColor | color | (theme) | Background & Border | Header background |
| borderColor | color | (theme) | Background & Border | Border color |
| rowLabelColor | color | (theme) | Rows | Row label color |
| rowValueColor | color | (theme) | Rows | Row value color |

## Calibrations

OW Temp supports calibrations. Use the **Calibration** tab to add transforms:

- **Multiplier** / **Divider** — Scale temperature
- **Offset** — Add or subtract (e.g., probe offset)
- **FahrenheitToCelsius** / **CelsiusToFahrenheit** — Unit conversion
- **Floor** / **Ceiling** — Clamp range

See [Calibrations Overview](./calibrations-overview.md) for details.

## Script Integration

### Read Temperature

```
new value temp
temp = "Mash Temp" Value
```

### Wait for Temperature

```
wait "Boil Temp" Value >= 212 60000
```

### Set Sensor or Unit (optional)

```
"Mash Temp" SensorIndex = 0
"Mash Temp" Unit = 1
```

### Common Patterns

```
// Temperature control
if "Fermenter Temp" Value > 68
  "Cooling" State = on
else
  "Cooling" State = off
endif

// Ramp check
wait "Mash Temp" Value >= 152 120000
```
