---
id: analog-input
title: Analog Input
sidebar_position: 6
---

# Analog Input

An **Analog Input** samples a variable voltage on an interface analog pin and turns it into a numeric value you can display, log, and use in Process scripts. Typical sources include pressure transducers, thermistors, load cells (through signal conditioning), flow sensors with voltage output, and any sensor that presents a proportional DC level within the ADC range of your board.

## What it is

The Analog Input element binds to a single **AnalogInput** port on an interface (microcontroller). The firmware reads the ADC, optionally averages samples over time, and BruControl applies **calibrations** (scaling, thermistor math, lookup tables, and so on) so **`Value`** represents engineering units. **`RawValue`** remains available for diagnostics as the pre-calibration numeric reading from the port.

Polling behavior is controlled by **`PollRate`** (how often the port is sampled, in milliseconds) and **`AvgWeight`** (how heavily recent samples are weighted in the average, expressed as a percentage from 1 to 100). Together they trade responsiveness against noise rejection and bus traffic.

:::tip

If the trace looks jittery on the Dashboard but the physical process is smooth, increase **`AvgWeight`** slightly or lengthen **`PollRate`** before adding aggressive calibrations. If the loop feels sluggish, reduce **`PollRate`** within the allowed range and only then tighten averaging.

:::

## Hardware connection

Wire the sensor output to the analog pin shown on your interface wiring map, with common ground to the interface. Match the sensor’s output span to the ADC reference (often 0–5 V or 0–3.3 V). For resistive sensors, use an appropriate divider or front-end board; precision RTD front-ends are often **SPI** rather than a raw analog pin—see [SPI Sensor](./spi-sensor.md) when the hardware uses SPI.

:::warning

Over-voltage or negative voltage on an analog pin can damage the microcontroller. Verify levels with a meter before energizing, and use conditioning circuits when sensors swing outside the rated ADC range.

:::

## Port type

**AnalogInput** — Assign a pin designated as analog input (often labeled **A** or **AI**) on your board’s port map.

## How to add

1. Add and enable an **Interface** with at least one free **AnalogInput** port.
2. Use **Add Device Element** (for example from the device context in Solution Explorer), choose **Analog Input**, and pick the interface and port.
3. Open the element editor to set **Display Name**, logging, **`PollRate`** / **`AvgWeight`**, and calibrations on the **Calibration** tab.
4. Optionally change the **element template**; custom appearance comes from the template’s `ui-controls.json` (default template id **`analog-input`**).

## Native and editor properties (summary)

Beyond script-accessible fields, the editor exposes calibration chains, display formatting (prefix, suffix, precision where applicable), **User Control**, and other standard device fields. Calibrations are applied in order; see [Calibrations Overview](./calibrations-overview.md).

## Custom properties (template)

These properties are defined by the default **Analog Input** template (`analog-input`) in `ui-controls.json`. Empty string defaults generally mean “use theme.”

### Layout

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| showHeader | boolean | true | Show header bar |
| showBackground | boolean | true | Show element background and border |
| showLabel | boolean | true | Show title label in header |
| showValue | boolean | true | Show primary value rows |
| precision | number | 2 | Decimal places for value display (0–6) |

### Label

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| labelFontFamily | text | — | Header label font (font-family) |
| labelFontSize | number | 12 | Label size (8–48) |
| labelFontWeight | text | "500" | Label weight |
| labelFontStyle | text | "normal" | Label style |
| labelColor | text | — | Label color (theme default: textPrimary) |

### Reading

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| showReading | boolean | true | Show the value reading section |
| readingColor | text | — | Reading value text (theme: accentGreen) |
| readingBg | text | — | Reading box background (theme: bgTertiary) |
| readingLabelColor | text | — | Reading label text (theme: textSecondary) |
| readingFont | text | — | Reading value font family |
| readingSize | number | null | Reading value size in px (8–120) |
| readingWeight | text | — | Reading value font weight |
| readingStyle | text | — | Reading value font style |

### Background and border

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| backgroundColor | text | — | Card background (theme: bgSecondary) |
| headerColor | text | — | Header background (theme: bgTertiary) |
| borderColor | text | — | Border color (theme: borderColor) |
| image | text | — | Background image upload; when set, replaces color/border treatment for the card per template behavior |

:::info

**headerColor** and **image** both affect how the header and card read visually. If you assign **image**, the template uses it as the card background; review contrast for the reading text (**readingColor**, **readingBg**) so operators can still read values at a glance.

:::

## Script integration — common element properties

Every element exposes:

| Property | Access | Description |
|----------|--------|-------------|
| ID | Read-only | Unique element identifier |
| DisplayName | Read/write | Shown on the Dashboard |
| Visibility | Read/write | `"default"`, `"visible"`, `"hidden"`, or `"hiddenlocked"` |
| EnableHistoricalLogging | Read/write | Enables historical logging |
| LoggingIntervalSeconds | Read/write | Minimum seconds between logged samples; `0` can mean log on change |
| MaxSilenceSeconds | Read/write | Log a point after this many seconds without a change; `0` disables |

See [Elements Overview](./overview.md) for behavior details.

## Script integration — common device properties

| Property | Access | Description |
|----------|--------|-------------|
| Enabled | Read/write | When false, the element does not communicate |
| Connected | Read-only | True when the runtime has a live interface link |
| RefreshMultiple | Read/write | Multiplier for refresh cadence (1–60) |
| DisplayText | Read-only | Formatted string as shown in the UI (includes calibrations) |
| PortID | Read-only | Port identifier for this element |

See [Device Elements Overview](./device-elements-overview.md).

## Script integration — analog input properties

| Property | Access | Description |
|----------|--------|-------------|
| PollRate | Read/write | Sample period in milliseconds (250–25000) |
| AvgWeight | Read/write | Averaging weight (1–100 %) |
| RawValue | Read-only | Raw reading before calibrations |
| Value | Read-only | Calibrated engineering value |

### Examples

Read the calibrated value:

```
new value pressure
pressure = "Pressure Sensor" Value
```

Diagnostics using raw value and connection state:

```
new bool online
online = "Tank Level" Connected
if online = off
  print "Analog input offline"
else
  new value raw
  raw = "Tank Level" RawValue
  print raw
endif
```

Adjust smoothing during a noisy phase:

```
"Condenser Pressure" PollRate = 500
"Condenser Pressure" AvgWeight = 40
```

Wait until a threshold is met:

```
wait "Mash Temp" Value >= 168 120000
```

## Calibrations

Analog Input supports linear scaling, offsets, clamps, thermistor (**SteinhartHart**), **RTD**, unit conversions, **LookupTable**, and other transforms documented under [Calibrations Overview](./calibrations-overview.md).

## Troubleshooting

| Symptom | Things to check |
|---------|-----------------|
| Value stuck or never updates | **Enabled**, **Connected**, and cable power; **`RefreshMultiple`** not set excessively high; interface firmware running |
| Reads random or drift | Ground loops, long unshielded runs near relays; **`AvgWeight`** and **`PollRate`**; sensor supply stability |
| Value wrong but stable | Calibration order and coefficients; correct **AnalogInput** pin; **`RawValue`** vs **Value** to see if the issue is ADC or math |
| Script errors on assignment | **Value** and **RawValue** are read-only; only **PollRate**, **AvgWeight**, and common fields like **Enabled** are writable where documented |
| Logging too sparse or too dense | **EnableHistoricalLogging**, **LoggingIntervalSeconds**, **MaxSilenceSeconds**; noisy inputs may need longer intervals |
| UI hard to read after theming | **readingColor**, **readingBg**, **labelColor**, **headerColor**, and **image** together—adjust contrast |
