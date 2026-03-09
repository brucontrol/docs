---
id: counter
title: Counter
sidebar_position: 7
---

# Counter

A **Counter** element counts high-speed pulses from an encoder, flow meter, hall-effect sensor, or similar device. It provides both a **total count** and a **rate** (counts per interval).

## What It Is

A Counter element uses a hardware counter on the interface to count pulses. The **Sampling Period** defines the interval for rate calculation. The **Primary Display Channel** selects whether the widget shows Count or Rate.

## Hardware Connection

Connect the pulse source to the interface counter pin:

- **Flow meter**: Pulse output to counter pin, power and ground as per datasheet
- **Hall-effect sensor**: Output to counter pin
- **Encoder**: A or B channel (or both for quadrature, if supported) to counter pin

:::tip
Counter pins are often dedicated hardware inputs. Check your interface wiring map for pins marked (C) for Counter.
:::

## Port Type

**Counter** — Use a pin designated as Counter Input (C) on your interface wiring map.

## Native Properties

| Property | Type | Description |
|----------|------|-------------|
| **Total** | number | Total count (calibrated). Read-only. |
| **Rate** | number | Rate (counts per interval, calibrated). Read-only. |
| **RawValue** | number | Raw count before calibration |
| **RawRate** | number | Raw rate before calibration |
| **CountPrecision** | number | Decimal places for count display. Read-only (configured in Calibration tab). |
| **RatePrecision** | number | Decimal places for rate display. Read-only (configured in Calibration tab). |
| **CountPrefix** | string | Text before count. Read-only (configured in Calibration tab). |
| **CountSuffix** | string | Text after count. Read-only (configured in Calibration tab). |
| **RatePrefix** | string | Text before rate. Read-only (configured in Calibration tab). |
| **RateSuffix** | string | Text after rate. Read-only (configured in Calibration tab). |
| **Enabled** | boolean | Whether the device is active |
| **User Control** | boolean | Allow user interaction with the widget |
| **Refresh Multiple** | number | Refresh rate multiplier (1–60) |
| **SamplingPeriod** | number | Sampling period in seconds (1–10) for rate calculation. Read/write. |
| **PrimaryDisplayChannel** | 0 or 1 | 0 = Count, 1 = Rate. Read/write. |

## Custom Properties

From the default Counter widget template (`counter`):

| Property | Type | Default | Group | Description |
|----------|------|---------|-------|--------------|
| showHeader | boolean | true | Layout | Show header bar |
| showBackground | boolean | true | Layout | Show widget background and border |
| showLabel | boolean | true | Layout | Show title label in header |
| hiddenRowKeys | array | — | Layout | Hide rows: "count", "rate" |
| showValue | boolean | true | Layout | Show primary value rows |
| showSecondaryRows | boolean | true | Layout | Show secondary detail rows |
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

Counter supports calibrations. Use the **Calibration** tab to add transforms:

- **Multiplier** / **Divider** — Scale count or rate (e.g., pulses per gallon)
- **Offset** — Add or subtract
- **Floor** / **Ceiling** — Clamp range

See [Calibrations Overview](./calibrations-overview.md) for details.

## Script Integration

### Read Count

```
new value totalPulses
totalPulses = "Flow Meter" Total
```

### Read Rate

```
new value flowRate
flowRate = "Flow Meter" Rate
```

### Set Sampling Period (optional)

```
"Flow Meter" SamplingPeriod = 5
"Flow Meter" PrimaryDisplayChannel = 1
```

### Common Patterns

```
// Check flow rate
if "Flow Meter" Rate < 1
  print "Low flow detected"
endif

// Wait for minimum volume (count)
wait "Flow Meter" Total >= 1000 60000
```
