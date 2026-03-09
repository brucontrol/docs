---
id: analog-input
title: Analog Input
sidebar_position: 6
---

# Analog Input

An **Analog Input** reads a variable voltage (typically 0–5 V or 0–3.3 V) from a sensor. Common uses include pressure, temperature (via thermistor or analog sensor), flow, weight, and level.

## What It Is

An Analog Input element samples an interface analog pin. The raw value is converted using calibrations (e.g., linear scaling, thermistor curves) to produce a meaningful **Value**. The interface may apply averaging to reduce noise.

## Hardware Connection

Connect the sensor output to the interface analog pin:

- **Voltage output sensors** (0–5 V or 0–3.3 V): Connect signal to the analog pin, ground to ground. Ensure the sensor voltage range matches the interface's ADC reference.
- **Resistive sensors** (thermistors, RTDs): Use a voltage divider or dedicated interface board. RTDs typically require an SPI interface board.

:::tip
For noisy environments, use shielded cable and keep analog wiring away from high-current switching. The **Avg Weight** (1–100) setting increases smoothing.
:::

## Port Type

**AnalogInput** — Use a pin designated as Analog Input (A) on your interface wiring map.

## Native Properties

| Property | Type | Description |
|----------|------|-------------|
| **Value** | number | Calibrated value. Read-only. |
| **RawValue** | number | Raw ADC reading before calibration. Read-only. |
| **Precision** | number | Decimal places for display. Read-only (configured in Calibration tab). |
| **Prefix** | string | Text before value. Read-only (configured in Calibration tab). |
| **Suffix** | string | Text after value. Read-only (configured in Calibration tab). |
| **Enabled** | boolean | Whether the device is active |
| **User Control** | boolean | Allow user interaction with the widget |
| **Refresh Multiple** | number | Refresh rate multiplier (1–60) |
| **PollRate** | number | Poll rate in ms (250–25000). Read/write. |
| **AvgWeight** | number | Averaging weight (1–100). Read/write. |

## Custom Properties

From the default Analog Input widget template (`analog-input`):

| Property | Type | Default | Group | Description |
|----------|------|---------|-------|--------------|
| showHeader | boolean | true | Layout | Show header bar |
| showBackground | boolean | true | Layout | Show widget background and border |
| showLabel | boolean | true | Layout | Show title label in header |
| hiddenRowKeys | array | — | Layout | Hide rows: "value" |
| showValue | boolean | true | Layout | Show primary value rows |
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

Analog Input supports calibrations. Use the **Calibration** tab to add transforms:

- **Multiplier** / **Divider** — Scale raw value
- **Offset** — Add or subtract
- **Floor** / **Ceiling** — Clamp range
- **SteinhartHart** — Thermistor resistance → temperature
- **RTD** — Resistance temperature device
- **FahrenheitToCelsius** / **CelsiusToFahrenheit** — Unit conversion
- **LookupTable** — Custom X→Y mapping

Calibrations are applied in order. See [Calibrations Overview](./calibrations-overview.md) for details.

## Script Integration

### Read Value

```
new value pressure
pressure = "Pressure Sensor" Value
```

### Wait for Condition

```
wait "Temp Probe" Value >= 150 5000
```

### Set Poll Rate (optional)

```
"Mash Temp" PollRate = 1000
"Mash Temp" AvgWeight = 50
```

### Common Patterns

```
// Read and use
new value temp
temp = "Mash Temp" Value
if temp > 170
  print "Mash temp too high!"
endif

// Wait for temperature
wait "Boil Temp" Value >= 212 60000
```
