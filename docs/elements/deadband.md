---
id: deadband
title: Deadband
sidebar_position: 13
---

# Deadband

A **Deadband** element keeps the output steady while the process variable sits inside a neutral band around **Target**, then ramps or steps the output at different rates in **inner** and **outer** regions as the error grows. That behavior reduces unnecessary actuator motion for valves, variable-speed drives, or other equipment that wears when commanded to twitch around setpoint. The Dashboard template groups **Reading**, **Target**, **Band**, and **Input** rows so operators can see both the live process variable and the band parameters that shape the response.

## What It Is

**DeadbandOffset** defines the symmetric “no change” region: while the input remains within target ± deadband, the algorithm holds the last output (subject to your configuration). **InnerBandOffset** extends outside the deadband where **InnerBandDrive** applies per **CalcTime** cycle; beyond that, **OuterBandDrive** applies for large errors. **InitialOutput** seeds the command when the device becomes enabled. **Reversed** flips whether output increases when the input is above target (cooling-style) or below (heating-style). **RawValue** and **Value** expose read-only output feedback—**RawValue** uncalibrated, **Value** calibrated—useful for trending and diagnostics alongside **InputPortID**’s source element.

## Hardware Connection

- **Input**: **InputPortID** references the analog or derived numeric element representing the controlled variable.
- **Output**: The deadband device drives the configured physical output on the interface according to your workspace hardware setup.

## Port Type

**Deadband Output** — Control device with an output port and a referenced input port.

## Native Properties

Alongside the script fields below, the designer exposes **Enabled**, **User Control**, calibration on the input, timing fields, and **Refresh Multiple**, consistent with other control outputs. Configure band geometry and drives in the editor; use scripts for sequencing, mode switches, and supervisory setpoints.

## Custom Properties

All names below match the **deadband** entry in `ui-controls.json`.

### Layout

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showHeader` | boolean | true | Show the header region. |
| `showBackground` | boolean | true | Show template background and border. |
| `showLabel` | boolean | true | Show the title label. |
| `showValue` | boolean | true | Show primary value rows. |
| `showSecondaryRows` | boolean | true | Show secondary detail rows. |
| `showFooter` | boolean | true | Show footer controls. |
| `precision` | number | 2 | Decimal places for numeric display (0–6). |

### Footer

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `footerButtonColor` | text | — | Footer control color (theme default: **accentPrimary**). |

### Label

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `labelFontFamily` | text | — | Header label font family. |
| `labelFontSize` | number | 12 | Label size (8–48). |
| `labelFontWeight` | text | "500" | Label weight. |
| `labelFontStyle` | text | — | Label style. |
| `labelColor` | text | — | Label color (theme default: **textPrimary**). |

### Reading section

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showReading` | boolean | true | Show the reading row (live process display). |
| `readingColor` | text | — | Reading value color (theme default: **accentGreen**). |
| `readingBg` | text | — | Reading row background (theme default: **bgTertiary**). |
| `readingLabelColor` | text | — | Reading label color (theme default: **textSecondary**). |
| `readingFont` | text | — | Reading value font family. |
| `readingSize` | number | null | Reading value size (8–120). |
| `readingWeight` | text | — | Reading value weight. |
| `readingStyle` | text | — | Reading value style. |

### Target section

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showTarget` | boolean | true | Show the target row. |
| `targetColor` | text | — | Target value color (theme default: **accentGreen**). |
| `targetBg` | text | — | Target row background (theme default: **bgTertiary**). |
| `targetLabelColor` | text | — | Target label color (theme default: **textSecondary**). |
| `targetFont` | text | — | Target value font family. |
| `targetSize` | number | null | Target value size (8–120). |
| `targetWeight` | text | — | Target value weight. |
| `targetStyle` | text | — | Target value style. |

### Band section

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showBand` | boolean | true | Show band parameter summary. |
| `bandColor` | text | — | Band text color (theme default: **accentGreen**). |
| `bandLabelColor` | text | — | Band label color (theme default: **textSecondary**). |
| `bandFont` | text | — | Band text font family. |
| `bandSize` | number | null | Band text size (8–120). |
| `bandWeight` | text | — | Band text weight. |
| `bandStyle` | text | — | Band text style. |

### Input section

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showInput` | boolean | true | Show the input row. |
| `inputColor` | text | — | Input value color (theme default: **accentGreen**). |
| `inputBg` | text | — | Input row background (theme default: **bgTertiary**). |
| `inputLabelColor` | text | — | Input label color (theme default: **textSecondary**). |
| `inputFont` | text | — | Input value font family. |
| `inputSize` | number | null | Input value size (8–120). |
| `inputWeight` | text | — | Input value weight. |
| `inputStyle` | text | — | Input value style. |

### Background and border

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `backgroundColor` | text | — | Element background (theme default: **bgSecondary**). |
| `headerColor` | text | — | Header background (theme default: **bgTertiary**). |
| `borderColor` | text | — | Border color (theme default: **borderColor**). |
| `image` | text | — | Background image (**file-upload**). |

:::info Band geometry on the Dashboard

The **Band** row summarizes deadband and inner-band parameters for at-a-glance verification. If operators find it noisy during normal runs, set **`showBand`** off and keep **`showReading`** and **`showTarget`** on for a minimal tile.

:::

## Script Integration

**Deadband-specific script properties:** **`InputPortID`** (string, read/write), **`Target`** (number, read/write), **`DeadbandOffset`** (number, read/write), **`InnerBandOffset`** (number, read/write), **`InnerBandDrive`** (number, read/write), **`OuterBandDrive`** (number, read/write), **`InitialOutput`** (number, read/write), **`Reversed`** (boolean, read/write), **`CalcTime`** (number, read/write), **`OutTime`** (number, read/write), **`RawValue`** (number, read-only), **`Value`** (number, read-only).

**Common device script properties:** **`Enabled`** (boolean, read/write), **`Connected`** (boolean, read-only), **`RefreshMultiple`** (number, read/write), **`DisplayText`** (string, read-only), **`PortID`** (string, read-only).

**Common element script properties:** **`ID`** (string, read-only), **`DisplayName`** (string, read/write), **`Visibility`** (string, read/write), **`EnableHistoricalLogging`** (boolean, read/write), **`LoggingIntervalSeconds`** (number, read/write), **`MaxSilenceSeconds`** (number, read/write).

```
// Set supervisory target from schedule
"Tank Valve DB" Target = 72

// Tighten deadband during holding, widen during fill
if Phase = hold
  "Tank Valve DB" DeadbandOffset = 0.5
else
  "Tank Valve DB" DeadbandOffset = 2.0
endif

// Read commanded output for interlocks
new number cmd
cmd = "Tank Valve DB" Value

// Safe disable
"Tank Valve DB" Enabled = off

// Health and wiring sanity
new bool ok
ok = "Tank Valve DB" Connected

"Tank Valve DB" DisplayName = "Tank: Valve Modulation"
"Tank Valve DB" EnableHistoricalLogging = true
"Tank Valve DB" LoggingIntervalSeconds = 15
"Tank Valve DB" MaxSilenceSeconds = 300
```

:::warning `Visibility` values

Use **`"default"`**, **`"visible"`**, **`"hidden"`**, or **`"hiddenlocked"`** for **`Visibility`**. See [Elements Overview](./overview).

:::

:::tip Start with **InitialOutput**

When enabling the loop mid-process, **InitialOutput** avoids slamming from an arbitrary starting command. Match it roughly to the current valve position or drive level when switching from manual to automatic.

:::

## Theming, `headerColor`, and `image`

**`headerColor`** differentiates deadband tiles from adjacent PID or hysteresis blocks. **`image`** can mark equipment zones; verify **`readingBg`** and **`inputBg`** preserve contrast for **`readingColor`** and **`inputColor`** on alarm states.

## Troubleshooting

| Symptom | Things to check |
|---------|------------------|
| Output never moves | **Enabled**; **Connected**; **DeadbandOffset** larger than actual error; **InnerBandDrive** / **OuterBandDrive** magnitudes; **CalcTime** too long. |
| Output jumps or feels “steppy” | **InnerBandDrive** / **OuterBandDrive** too aggressive relative to **CalcTime**; sensor noise; **OutTime** interaction with physical actuator. |
| Hunts outside deadband | Widen **DeadbandOffset** slightly; reduce drives; verify **Reversed** matches process direction; filter input at source. |
| Sluggish recovery from large error | Increase **OuterBandDrive** (carefully); confirm **InnerBandOffset** progression makes sense relative to **DeadbandOffset**. |
| Wrong direction | **Reversed**; swapped sense of error vs actuator; confirm **InputPortID** points at the variable you think it does. |
| Stale **Value** in scripts | Compare **RawValue** vs **Value** for calibration issues; confirm element ID in script matches **DisplayName** binding rules. |
| No chart history | **EnableHistoricalLogging** and interval settings; see [Elements Overview](./overview). |
| Busy UI | Lower **`precision`**; hide **`showBand`** or **`showSecondaryRows`**; simplify **`image`**. |

## Related Topics

- [PID](./pid) — Continuous proportional control
- [Hysteresis](./hysteresis) — Discrete on/off control
- [Profile](./profile) — Scheduled **Target** changes
- [Elements Overview](./overview) — Common properties and logging
