---
id: spi-sensor
title: SPI Sensor
sidebar_position: 9
---

# SPI Sensor

An **SPI Sensor** element reads a sensor or front-end board attached to the interface over the **Serial Peripheral Interface (SPI)** bus. This pattern is common for precision analog front ends, RTD or thermocouple converters, and other peripherals that expose a measured quantity as a digital register read rather than a single analog voltage pin.

## What it is

The **SPISensor** port encapsulates SPI framing, chip select, and device-specific decoding on the firmware side. BruControl surfaces **`Value`** as the primary calibrated reading and **`RawValue`** as the diagnostic pre-calibration number. **`PollRate`** and **`AvgWeight`** behave like an **Analog Input**: you choose how often to sample and how aggressively to smooth, trading noise rejection against latency and bus utilization.

Typical **`PollRate`** values fall in the **250–25000 ms** range (matching other polled sensor elements in BruControl), and **`AvgWeight`** accepts **1–100** percent weighting for averaging.

:::tip

When bringing up a new SPI board, read **`RawValue`** while applying known physical inputs (ice bath, shunt voltage, etc.). Once **`RawValue`** tracks expectations, layer calibrations so **`Value`** matches field standards—avoid chasing calibration math before the bus is stable.

:::

## Hardware connection

Route **MOSI**, **MISO**, **SCK**, and **CS** (or the names your interface uses) per the wiring map. Match logic voltage (3.3 V vs 5 V), keep leads short, and share a solid ground reference. Some boards require specific power-up sequencing or delay after reset; follow the manufacturer datasheet alongside your interface documentation.

:::warning

SPI is sensitive to incorrect mode (clock polarity/phase) and edge rates. If the device shares the bus with other peripherals, ensure chip-select discipline in firmware so two devices never drive MISO simultaneously.

:::

## Port type

**SPISensor** — Only available on interfaces and pins that list SPI sensor capability.

## How to add

1. Verify the interface firmware supports the target SPI device or a compatible profile.
2. **Add Device Element** → **SPI Sensor** → select interface and **SPISensor** port.
3. Configure **`PollRate`**, **`AvgWeight`**, and calibrations so **`Value`** reflects engineering units.
4. Apply the default template **`spi-sensor`** (or another compatible template) and tune **`reading*`** and **`headerColor`** / **image** for the Dashboard.

## Native and editor properties (summary)

Editor tabs expose device enablement, user control, logging, and calibration chains analogous to other numeric sensors. **`DisplayText`** aggregates formatting so scripts can log exactly what operators see.

## Custom properties (template)

From `ui-controls.json` for **`spi-sensor`**.

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
| labelFontFamily | text | — | Header label font |
| labelFontSize | number | 12 | Label size (8–48) |
| labelFontWeight | text | "500" | Label weight |
| labelFontStyle | text | "normal" | Label style |
| labelColor | text | — | Label color (theme: textPrimary) |

### Reading

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| showReading | boolean | true | Show the value reading section |
| readingColor | text | — | Reading value color (theme: accentGreen) |
| readingBg | text | — | Reading box background (theme: bgTertiary) |
| readingLabelColor | text | — | Reading label color (theme: textSecondary) |
| readingFont | text | — | Reading value font family |
| readingSize | number | null | Reading value size (8–120 px) |
| readingWeight | text | — | Reading value weight |
| readingStyle | text | — | Reading value style |

### Background and border

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| backgroundColor | text | — | Card background (theme: bgSecondary) |
| headerColor | text | — | Header background (theme: bgTertiary) |
| borderColor | text | — | Border color (theme: borderColor) |
| image | text | — | Background image; replaces flat color/border styling per template rules |

:::info

**precision** applies to how the primary reading is rendered; **`readingSize`** and **`readingWeight`** control emphasis. When using **image**, verify **readingColor** remains readable on busy photographs—**readingBg** can restore a calm panel over the photo.

:::

## Script integration — common element properties

| Property | Access | Description |
|----------|--------|-------------|
| ID | Read-only | Unique element identifier |
| DisplayName | Read/write | Dashboard label |
| Visibility | Read/write | `"default"`, `"visible"`, `"hidden"`, `"hiddenlocked"` |
| EnableHistoricalLogging | Read/write | Historical logging |
| LoggingIntervalSeconds | Read/write | Minimum seconds between log samples |
| MaxSilenceSeconds | Read/write | Silence heartbeat; `0` disables |

## Script integration — common device properties

| Property | Access | Description |
|----------|--------|-------------|
| Enabled | Read/write | Communication on/off |
| Connected | Read-only | Interface link status |
| RefreshMultiple | Read/write | Refresh multiplier (1–60) |
| DisplayText | Read-only | UI-formatted value string |
| PortID | Read-only | Port identifier |

## Script integration — SPI sensor properties

| Property | Access | Description |
|----------|--------|-------------|
| PollRate | Read/write | Poll interval in ms (typically 250–25000) |
| AvgWeight | Read/write | Averaging weight (1–100 %) |
| RawValue | Read-only | Raw reading before calibrations |
| Value | Read-only | Calibrated reading |

### Examples

Read the processed value:

```
new value rtdTemp
rtdTemp = "Boil RTD" Value
```

Slow polling during soak, fast during heat-up:

```
if "Boil Phase" Value = on
  "Boil RTD" PollRate = 250
else
  "Boil RTD" PollRate = 2000
endif
```

Heavy filtering when steam noise is present:

```
"Boil RTD" AvgWeight = 75
```

Surface operator text:

```
new text line
line = "Boil RTD" DisplayText
print line
```

## Calibrations

Apply multipliers, offsets, lookup tables, or specialized transforms on the **Calibration** tab. Order matters; see [Calibrations Overview](./calibrations-overview.md).

## Troubleshooting

| Symptom | Things to check |
|---------|-----------------|
| No updates | **Enabled**, **Connected**, SPI wiring, power, chip-select; **`RefreshMultiple`** not extreme |
| Garbage **RawValue** | SPI mode, voltage levels, ground, cable length, conflicting devices on the bus |
| Sluggish response | **`PollRate`** too high; **`AvgWeight`** too heavy |
| Noisy **Value** | Increase **`AvgWeight`**; shielding; separate SPI from switching loads |
| **Value** wrong but **RawValue** sane | Calibration coefficients and order |
| Script cannot set **Value** | **Value** is read-only—adjust hardware scaling via calibrations or **`PollRate`** / **`AvgWeight`** |
| Dashboard unreadable | **readingBg** vs **readingColor**; **headerColor** and **image** contrast |
| Sparse history | **EnableHistoricalLogging**, **LoggingIntervalSeconds**, **MaxSilenceSeconds** |
