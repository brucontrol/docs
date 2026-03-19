---
id: duty-cycle
title: Duty Cycle
sidebar_position: 4
---

# Duty Cycle

The **Duty Cycle** element drives a repeating on/off pattern on a hardware output: you set the **DutyCycle** percentage (0–100) and the full cycle **Interval** in milliseconds. The firmware turns the output on for the proportional slice of each period, then off for the remainder. Scripts can read the instantaneous **Value** (boolean) to see whether the output is currently in the ON phase of the waveform.

## What it does

Unlike a steady digital output, duty-cycle control modulates **how long** the output is high within each period. That is useful for proportional control of heaters, dimming (where hardware supports it), or pulsing solenoids at a controlled rate. The UI typically shows **duty** and **interval** rows with independent colors and typography, plus optional secondary rows and footer.

:::info
**DutyCycle** and **Interval** together define the timing model. Changing either one immediately affects the pattern the interface generates, subject to hardware limits and refresh timing.
:::

## When to use it

- Rough proportional heat or load control when PWM-style analog output is not available or not required.
- Periodic pulsing with a defined mark/space ratio.
- Visualizing both the configured percentage and period on the dashboard.

:::tip
If you need smooth analog levels (e.g., true PWM voltage), compare with **PWM Output**; duty cycle here is a timed digital pattern with the semantics your interface implements for this port type.
:::

## Adding a Duty Cycle element

1. Add the **Interface** device with a port that supports the duty-cycle capability for your hardware.
2. **Add Device Element** → **Duty Cycle**.
3. Bind device and port.
4. Configure **DutyCycle**, **Interval**, and appearance in the designer; use scripts for runtime changes.

## Custom properties (appearance)

Keys follow the Duty Cycle `ui-controls.json`.

### Layout

| Property | Notes |
|----------|--------|
| `showHeader` | boolean, default `true`. |
| `showBackground` | boolean, default `true`. |
| `showLabel` | boolean, default `true`. |
| `showValue` | boolean, default `true`. |
| `showSecondaryRows` | boolean, default `true` — extra detail rows when applicable. |
| `showFooter` | boolean, default `false`. |
| `precision` | number, default `1`, range `0`–`6` — decimal places for numeric display. |

### Label

| Property | Notes |
|----------|--------|
| `labelFontFamily` | text, inherits when empty. |
| `labelFontSize` | number, default `12`, range `8`–`48`. |
| `labelFontWeight` | text, default `"500"`. |
| `labelFontStyle` | text, default `"normal"`. |
| `labelColor` | text, default theme `textPrimary`. |

### Duty section

| Property | Notes |
|----------|--------|
| `showDuty` | boolean, default `true`. |
| `dutyColor` | default theme `accentGreen`. |
| `dutyBg` | default theme `bgTertiary`. |
| `dutyLabelColor` | default theme `textSecondary`. |
| `dutyFont` | text, default `""` (inherits `font-family`). |
| `dutySize` | number, default `null`, range `8`–`120` when set. |
| `dutyWeight` | text, default `""` (inherits `font-weight`). |
| `dutyStyle` | text, default `""` (inherits `font-style`). |

### Interval section

| Property | Notes |
|----------|--------|
| `showInterval` | boolean, default `true`. |
| `intervalColor` | default theme `accentGreen`. |
| `intervalLabelColor` | default theme `textSecondary`. |
| `intervalFont` | text, default `""`. |
| `intervalSize` | number, default `null`, range `8`–`120`. |
| `intervalWeight` | text, default `""`. |
| `intervalStyle` | text, default `""`. |

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
| `ID` | string | RO | Element identifier. |
| `DisplayName` | string | RW | Display name on the tile. |
| `Visibility` | string | RW | `default`, `visible`, `hidden`, `hiddenlocked`. |
| `EnableHistoricalLogging` | boolean | RW | Historical storage for charting. |
| `LoggingIntervalSeconds` | number | RW | Min seconds between logs; `0` = every change. |
| `MaxSilenceSeconds` | number | RW | Force periodic log when value is static; `0` off. |

## Script properties — all device elements

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `Enabled` | boolean | RW | Master enable for hardware I/O. |
| `Connected` | boolean | RO | Link status to interface. |
| `RefreshMultiple` | number | RW | Refresh rate multiplier. |
| `DisplayText` | string | RO | Formatted port text. |
| `PortID` | string | RO | Port binding id. |

## Script properties — Duty Cycle only

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `DutyCycle` | number | RW | Percent on-time per cycle, **0–100**. |
| `Interval` | number | RW | Full cycle length in **milliseconds**. |
| `Value` | boolean | RO | Current phase: ON vs OFF within the pattern. |

:::warning
Extremely short **Interval** values with high **RefreshMultiple** may make the UI and scripts appear out of sync with the physical output. Validate on the bench with an oscilloscope or logical analyzer when timing is critical.
:::

## Example scripts

Set 40% duty and a 10 s period:

```
HeaterPWM.DutyCycle = 40;
HeaterPWM.Interval = 10000;
```

Ramp duty based on a temperature error (illustrative):

```
var err = Setpoint.Value - TankTemp.Value;
var d = Math.min(100, Math.max(0, err * 2));
HeaterPWM.DutyCycle = d;
```

Record duty and phase for diagnostics:

```
HeaterPWM.EnableHistoricalLogging = true;
HeaterPWM.LoggingIntervalSeconds = 1;
```

## Troubleshooting

- **No output toggling** — Check **Enabled**, **Connected**, and that **DutyCycle** is between 0 and 100. **DutyCycle** `0` or **Interval** too large/small may look like a steady state.
- **UI numbers do not match behavior** — Confirm **precision** in custom properties; script values are full precision while the label may round.
- **Choppy updates** — **RefreshMultiple** reduces traffic; increase it only if you accept slower UI refresh.
- **Cannot set DutyCycle above 100** — Clamp in script; hardware may also enforce limits not visible in the type range alone.
- **History shows steps** — **LoggingIntervalSeconds** coarsens stored data; shorten the interval or rely on **Value** transitions if logged on change.
- **Styling wrong section** — Duty row uses **duty**\* keys; interval row uses **interval**\* keys; do not confuse with other element families’ naming.
