---
id: pwm-output
title: PWM Output
sidebar_position: 5
---

# PWM Output

A **PWM Output** element controls a pulse-width or scaled analog-style output on the interface. Scripts set a **RequestedValue** (read/write); the device applies calibration and hardware mapping, producing **Value** (calibrated, read-only) and **RawValue** (0–255 style raw output, read-only) for feedback and diagnostics. The dashboard can emphasize **current** output vs **requested** target with separate styling groups.

## What it does

**RequestedValue** is your control input: set it from scripts, bindings, or manual UI where supported. The firmware translates that request into the electrical PWM (or DAC) output according to port configuration and calibration. **Value** reflects the effective output after calibration layers; **RawValue** exposes the underlying numeric drive level before calibration interpretation.

:::info
Naming recap: **RequestedValue** = what you ask for; **Value** = calibrated result as seen by the element; **RawValue** = low-level hardware magnitude. Use the right one for control vs monitoring.
:::

## Typical applications

- LED brightness, fan speed (with suitable drivers), heater SSR modulation.
- Any port documented as PWM or analog output on your interface.
- Closed-loop setups where another element (PID, hysteresis) writes **RequestedValue**.

:::tip
If the load does not respond linearly to **RequestedValue**, fix calibration on the port or add a curve in logic rather than guessing scaling in the UI only.
:::

## Adding a PWM Output element

1. Configure the **Interface** with an available PWM (or analog output) port.
2. **Add Device Element** → **PWM Output**.
3. Assign device and port; set default **RequestedValue** if the designer allows.
4. Tune **current** vs **requested** presentation and **precision** for readability.

## Custom properties (appearance)

Keys match the PWM Output `ui-controls.json`.

### Layout

| Property | Notes |
|----------|--------|
| `showHeader` | boolean, default `true`. |
| `showBackground` | boolean, default `true`. |
| `showLabel` | boolean, default `true`. |
| `showValue` | boolean, default `true`. |
| `showFooter` | boolean, default `true`. |
| `precision` | number, default `2`, range `0`–`6` decimals. |

### Label

| Property | Notes |
|----------|--------|
| `labelFontFamily` | text, inherits when empty. |
| `labelFontSize` | number, default `12`, range `8`–`48`. |
| `labelFontWeight` | text, default `"500"`. |
| `labelFontStyle` | text, default `"normal"`. |
| `labelColor` | text, default theme `textPrimary`. |

### Current section (measured / effective output)

| Property | Notes |
|----------|--------|
| `showCurrent` | boolean, default `true`. |
| `currentColor` | default theme `accentGreen`. |
| `currentBg` | default theme `bgTertiary`. |
| `currentLabelColor` | default theme `textSecondary`. |
| `currentFont` | text, default `""`. |
| `currentSize` | number, default `null`, range `8`–`120`. |
| `currentWeight` | text, default `""`. |
| `currentStyle` | text, default `""`. |

### Requested section (setpoint / command)

| Property | Notes |
|----------|--------|
| `showRequested` | boolean, default `true`. |
| `requestedColor` | default theme `accentGreen`. |
| `requestedBg` | default theme `bgTertiary`. |
| `requestedLabelColor` | default theme `textSecondary`. |
| `requestedFont` | text, default `""`. |
| `requestedSize` | number, default `null`, range `8`–`120`. |
| `requestedWeight` | text, default `""`. |
| `requestedStyle` | text, default `""`. |

### Background and chrome

| Property | Notes |
|----------|--------|
| `backgroundColor` | default theme `bgSecondary`. |
| `headerColor` | default theme `bgTertiary`. |
| `borderColor` | default theme `borderColor`. |
| `image` | file-upload — optional background image. |

## Script properties — common to all elements

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `ID` | string | RO | Unique id. |
| `DisplayName` | string | RW | Label on the element. |
| `Visibility` | string | RW | `default`, `visible`, `hidden`, `hiddenlocked`. |
| `EnableHistoricalLogging` | boolean | RW | Enable history database writes. |
| `LoggingIntervalSeconds` | number | RW | Minimum seconds between stored samples; `0` every change. |
| `MaxSilenceSeconds` | number | RW | Re-log after N seconds without change; `0` disabled. |

## Script properties — all device elements

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `Enabled` | boolean | RW | Disables I/O when false. |
| `Connected` | boolean | RO | Interface connectivity. |
| `RefreshMultiple` | number | RW | Slows refresh polling when increased. |
| `DisplayText` | string | RO | Formatted textual representation from port. |
| `PortID` | string | RO | Port identifier string. |

## Script properties — PWM Output only

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `Value` | number | RO | Current output after calibration. |
| `RawValue` | number | RO | Raw drive level (e.g., 0–255) before calibration. |
| `RequestedValue` | number | RW | Target output; firmware maps to hardware. |

:::warning
Writing **RequestedValue** out of range for your calibration may clamp or saturate at the hardware/firmware limits. Always confirm against interface documentation and measured output.
:::

## Example scripts

Set half-scale request (adjust magnitude to your calibration):

```
FanPWM.RequestedValue = 128;
```

Slewing ramp (pseudo-code style step):

```
var target = 200;
var step = 5;
if (FanPWM.RequestedValue < target) {
    FanPWM.RequestedValue = FanPWM.RequestedValue + step;
}
```

Monitor raw vs calibrated for debugging:

```
if (FanPWM.RawValue != FanPWM.Value) {
    // Calibration is shifting the effective output
}
```

## Troubleshooting

- **RequestedValue changes but load is dead** — Verify **Enabled**, **Connected**, wiring, and that the port is PWM-capable. Check **RawValue** for any movement at the driver level.
- **Value lags RequestedValue** — Normal under calibration or rate limits; reduce **RefreshMultiple** if the UI seems too slow, within performance constraints.
- **Output saturates at min/max** — Calibration or hardware ceiling; inspect port settings and physical supply voltage to the load driver.
- **DisplayText confusing** — Prefer **Value** / **RawValue** / **RequestedValue** in scripts; **DisplayText** is formatted for humans and may include units.
- **Footers or decimals look wrong** — Adjust **precision**; **current**\* vs **requested**\* control which row’s typography applies.
- **No trend data** — Turn on **EnableHistoricalLogging** and tune **LoggingIntervalSeconds**; steady outputs may need **MaxSilenceSeconds** to appear on time-series charts.
