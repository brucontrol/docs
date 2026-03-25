---
id: ow-temp
title: 1-Wire Temperature (OW Temp)
sidebar_position: 8
---

# 1-Wire Temperature (OW Temp)

The **1-Wire Temperature** element (often called **OW Temp**) reads Dallas/Maxim **1-Wire** temperature sensors such as the DS18B20 family. A single data line plus ground (and parasitic or powered 3.3 V / 5 V arrangements per your board) can support multiple probes on a bus; this element represents **one** selected sensor index on the assigned **OWTemp** port.

## What it is

The interface firmware performs 1-Wire discovery and conversion, then BruControl exposes **`Value`** as the temperature in the unit chosen by **`Unit`**. **`RawValue`** is the read-only numeric reading before the same calibration layer you might apply elsewhere on the element—use it to confirm the probe is responding when **`Value`** looks wrong after scaling.

**SensorIndex** (read/write, 0–99) selects which device on the bus maps to this element when more than one sensor shares the port. **`Unit`** at the API/model layer is an **integer** (`0` = Celsius, `1` = Fahrenheit). The scripting engine also accepts the string values **`"Fahrenheit"`** and **`"Celsius"`** for convenience, but the REST API uses the integer representation.

:::warning

**Unit** has different representations depending on the access layer. The **REST API** uses integers (`0` = Celsius, `1` = Fahrenheit). **Process scripts** accept the string values **`"Fahrenheit"`** and **`"Celsius"`**. Use the correct form for the context you are working in.

:::

## Hardware connection

Connect the probe’s data pin to the **OWTemp** pin from the wiring map, ground to ground, and power per the sensor datasheet (parasitic mode vs strong pull-up has strict timing requirements). Use appropriate pull-up resistance on the data line (commonly 4.7 kΩ at 5 V; follow your interface documentation). Keep cable length within the limits your firmware supports; star topology and long unshielded runs are common sources of conversion failures.

:::tip

If readings are `85 °C` or obviously wrong on DS18B20 devices, that often indicates a failed conversion or weak power—verify pull-up, supply current, and that the bus settles before the next read.

:::

## Port type

**OWTemp** — Dedicated 1-Wire bus pin on the interface, not a generic digital I/O unless the map explicitly allows sharing.

## How to add

1. Wire the probe and confirm the interface shows 1-Wire capability on the chosen pin.
2. **Add Device Element** → **1-Wire Temperature** / **OW Temp** → pick interface and port.
3. Set **SensorIndex** to match the ordering your firmware uses when multiple sensors exist.
4. Choose display precision with template property **decimalPlaces** and set **`Unit`** from the editor or script.
5. Apply calibrations if you need probe-specific offset or scaling.

## Native and editor properties (summary)

Standard device fields (**Enabled**, **User Control**, logging, refresh) apply. Calibrations can refine **`Value`** after the sensor’s native conversion.

## Custom properties (template)

Default template **`ow-temp`**.

### Layout

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| showHeader | boolean | true | Show header bar |
| showBackground | boolean | true | Show element background and border |
| showLabel | boolean | true | Show title label in header |
| showValue | boolean | true | Show primary value rows |
| decimalPlaces | number | 1 | Decimal places for temperature (0–5) |

### Label

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| labelFontFamily | text | — | Header label font |
| labelFontSize | number | 12 | Label size (8–48) |
| labelFontWeight | text | "500" | Label weight |
| labelFontStyle | text | "normal" | Label style |
| labelColor | text | — | Label color (theme: textPrimary) |

### Temperature

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| showTemperature | boolean | true | Show the Temperature section |
| temperatureColor | text | — | Value color (theme: accentGreen) |
| temperatureBg | text | — | Value box background (theme: bgTertiary) |
| temperatureLabelColor | text | — | Label color (theme: textSecondary) |
| temperatureFont | text | — | Value font family |
| temperatureSize | number | null | Value size px (8–120) |
| temperatureWeight | text | — | Value weight |
| temperatureStyle | text | — | Value style |

### Background and border

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| backgroundColor | text | — | Card background (theme: bgSecondary) |
| headerColor | text | — | Header background (theme: bgTertiary) |
| borderColor | text | — | Border color (theme: borderColor) |
| image | text | — | Background image upload for the card |

:::info

**decimalPlaces** controls how many digits appear in the temperature row; it works together with **temperatureSize** and **temperatureColor** for glanceable tanks and fermenters. **image** can reinforce branding but should not obscure the temperature text—adjust **temperatureBg** and **temperatureColor** if needed.

:::

## Script integration — common element properties

| Property | Access | Description |
|----------|--------|-------------|
| ID | Read-only | Unique element identifier |
| DisplayName | Read/write | Dashboard label |
| Visibility | Read/write | `"default"`, `"visible"`, `"hidden"`, `"hiddenlocked"` |
| EnableHistoricalLogging | Read/write | Historical logging |
| LoggingIntervalSeconds | Read/write | Minimum seconds between log points |
| MaxSilenceSeconds | Read/write | Silence heartbeat interval; `0` off |

## Script integration — common device properties

| Property | Access | Description |
|----------|--------|-------------|
| Enabled | Read/write | Communication on/off |
| Connected | Read-only | Interface link status |
| RefreshMultiple | Read/write | Refresh multiplier (1–60) |
| DisplayText | Read-only | Formatted UI string |
| PortID | Read-only | Port identifier |

## Script integration — 1-Wire properties

| Property | Access | Description |
|----------|--------|-------------|
| SensorIndex | Read/write | Sensor index on the bus (0–99) |
| Unit | Read/write | Temperature unit — integer at the API layer (`0` = Celsius, `1` = Fahrenheit); scripts also accept `"Fahrenheit"` / `"Celsius"` strings |
| RawValue | Read-only | Raw reading before calibrations |
| Value | Read-only | Temperature after processing |

### Examples

Read temperature in the current unit:

```
new value mashTemp
mashTemp = "Mash Probe" Value
```

Switch display and script-facing unit to Celsius:

```
"FV Temp" Unit = "Celsius"
```

Select the second sensor on a shared bus:

```
"RIMS Outlet" SensorIndex = 1
```

Compare raw vs calibrated when debugging:

```
new value raw
raw = "FV Temp" RawValue
print raw
```

## Calibrations

Use the **Calibration** tab when you need offset or scaling after the chip’s conversion. See [Calibrations Overview](./calibrations-overview.md).

## Troubleshooting

| Symptom | Things to check |
|---------|-----------------|
| No reading or fixed fault value | **Connected**, **Enabled**, pull-up, power mode, cable length, **SensorIndex** pointing at a missing device |
| Wrong sensor | **SensorIndex** order vs physical labeling; power-cycle and rescan if your workflow requires it |
| Unit surprises in script | **Unit** must be **`"Fahrenheit"`** or **`"Celsius"`** strings |
| UI shows wrong decimals | **decimalPlaces** in template; calibrations rounding |
| Good **RawValue**, bad **Value** | Calibration chain order and coefficients |
| Intermittent spikes | Electrical noise, loose connectors, insufficient delay between conversions |
| Logging too coarse/fine | **LoggingIntervalSeconds**, **MaxSilenceSeconds**, **EnableHistoricalLogging** |
| Hard-to-read Dashboard | **temperatureColor** on **temperatureBg**; **headerColor** and **image** contrast |
