---
id: pid
title: PID
sidebar_position: 12
---

# PID

A **PID** element implements proportional–integral–derivative control for one loop. It reads a numeric **input** (**InputPortID**), compares to **Target**, and produces a bounded **output** for time-proportioned heating or cooling, analog drives, or other actuators per your hardware. The template exposes **Output**, **Target**, **Kp/Ki/Kd**, and **Input** rows with separate typography for tuning-focused layouts.

## What It Is

The PID algorithm integrates error over time, applies derivative action on the rate of change, and sums the contributions according to **Kp**, **Ki**, and **Kd**. **CalcTime** sets how often the loop evaluates; **OutTime** defines the output update period (including duty-cycle style behavior when not using raw PWM). **MaxIntegral** limits integral windup; **MaxOutput** caps the command. **Reversed** flips the control direction (for example, cooling where output should increase as the process variable rises above target). **RawValue** and **Value** are read-only feedback from the controller: **RawValue** is the uncalibrated internal reading; **Value** is the calibrated output value you typically trend alongside setpoint.

## Hardware Connection

- **Input**: Bind **InputPortID** to a temperature sensor, pressure transducer, or other analog source that represents the variable under control.
- **Output**: The PID device drives the configured output mechanism on the interface (implementation depends on your hardware profile—heaters, SSRs, valves, and so on).

## Port Type

**PID Output** — Control device with an output port and a referenced input port.

## Native Properties

Editor fields include **Target**, gains, timing limits, **Reversed**, input calibration, **Enabled**, **User Control**, and **Refresh Multiple**, like other control devices. Use the designer for detailed tuning; scripts bump setpoints, sequence modes, and read live output.

## Custom Properties

All names below match the **pid** entry in `ui-controls.json`.

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

### Output section

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showOutput` | boolean | true | Show the output row. |
| `outputColor` | text | — | Output value color (theme default: **accentGreen**). |
| `outputBg` | text | — | Output row background (theme default: **bgTertiary**). |
| `outputLabelColor` | text | — | Output label color (theme default: **textSecondary**). |
| `outputFont` | text | — | Output value font family. |
| `outputSize` | number | null | Output value size (8–120). |
| `outputWeight` | text | — | Output value weight. |
| `outputStyle` | text | — | Output value style. |

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

### Kp / Ki / Kd section

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showKpKiKd` | boolean | true | Show the combined gains row. |
| `kpKiKdColor` | text | — | Gains text color (theme default: **accentGreen**). |
| `kpKiKdLabelColor` | text | — | Gains label color (theme default: **textSecondary**). |
| `kpKiKdFont` | text | — | Gains font family. |
| `kpKiKdSize` | number | null | Gains text size (8–120). |
| `kpKiKdWeight` | text | — | Gains weight. |
| `kpKiKdStyle` | text | — | Gains style. |

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

:::tip Tuning layout for brew panels

During mash, operators often care most about **Target** and **Input**. Increase **`targetSize`** and **`inputSize`** slightly and temporarily hide **`showKpKiKd`** on production dashboards so gains are edited only in the designer, not stared at during the run.

:::

## Script Integration

**PID-specific script properties:** **`InputPortID`** (string, read/write), **`Target`** (number, read/write), **`Kp`** (number, read/write), **`Ki`** (number, read/write), **`Kd`** (number, read/write), **`Reversed`** (boolean, read/write), **`CalcTime`** (number, read/write), **`OutTime`** (number, read/write), **`MaxIntegral`** (number, read/write), **`MaxOutput`** (number, read/write), **`RawValue`** (number, read-only), **`Value`** (number, read-only).

**Common device script properties:** **`Enabled`** (boolean, read/write), **`Connected`** (boolean, read-only), **`RefreshMultiple`** (number, read/write), **`DisplayText`** (string, read-only), **`PortID`** (string, read-only).

**Common element script properties:** **`ID`** (string, read-only), **`DisplayName`** (string, read/write), **`Visibility`** (string, read/write), **`EnableHistoricalLogging`** (boolean, read/write), **`LoggingIntervalSeconds`** (number, read/write), **`MaxSilenceSeconds`** (number, read/write).

```
// Recipe-driven setpoint
"Mash PID" Target = 152

// Read current output and process variable feedback
new number outPct
outPct = "Mash PID" Value
new number rawIn
rawIn = "Mash PID" RawValue

// Soft gain schedule (example: gentler near boil)
if "Boil PID" Target > 205
  "Boil PID" Kp = 1.2
  "Boil PID" Ki = 0.05
else
  "Boil PID" Kp = 2.0
  "Boil PID" Ki = 0.12
endif

// Disable loop safely when a manual valve is open
if "Manual Steam" State = on
  "Boil PID" Enabled = off
else
  "Boil PID" Enabled = on
endif

"Mash PID" DisplayName = "Mash Tun: Heat"
"Mash PID" EnableHistoricalLogging = true
"Mash PID" LoggingIntervalSeconds = 10
"Mash PID" MaxSilenceSeconds = 120
```

:::warning `Visibility` values

Use **`"default"`**, **`"visible"`**, **`"hidden"`**, or **`"hiddenlocked"`** for **`Visibility`**. See [Elements Overview](./overview).

:::

:::info **RawValue** vs **Value**

**RawValue** reflects the uncalibrated input path used internally. **Value** is the calibrated output value. When diagnosing sensor scaling issues, compare the bound input element’s readings with **RawValue** trends.

:::

## Theming, `headerColor`, and `image`

**`headerColor`** anchors the PID tile in dense dashboards. **`image`** can indicate vessel or zone; keep **`outputBg`** and **`inputBg`** contrasting with both the photo and **`outputColor`** / **`inputColor`** so live numbers stay readable during alarms.

## Troubleshooting

| Symptom | Things to check |
|---------|------------------|
| Oscillation or hunting | Lower **Kp** / **Ki**; increase **CalcTime** slightly; verify **Reversed** matches heating vs cooling; check noisy **InputPortID** source. |
| Slow approach to setpoint | Increase **Kp** cautiously; ensure **MaxOutput** is not choking the command; confirm **Enabled** and **Connected**. |
| Integral windup | **MaxIntegral**; anti-windup is easier when **OutTime** and **CalcTime** are sensible; avoid saturating **MaxOutput** at zero. |
| Output always zero | **Enabled**; hardware mapping; **MaxOutput**; **Connected**; input calibration producing plausible error. |
| Wrong direction | **Reversed**; swapped thermistor leads vs expected curve; actuator wiring. |
| Script changes ignored | **User Control** / mode locks; element disabled; typo in **DisplayName** vs script string ID. |
| Chart gaps | **EnableHistoricalLogging**, **LoggingIntervalSeconds**, **MaxSilenceSeconds**; see [Elements Overview](./overview). |
| UI hard to read | Adjust **`labelColor`** vs **`headerColor`**; reduce **`image`** contrast or increase row backgrounds (**`outputBg`**, **`inputBg`**). |

## Related Topics

- [Profile](./profile) — Step or ramp **Target** from schedules
- [Hysteresis](./hysteresis) — Bang-bang alternative
- [Deadband](./deadband) — Piecewise output near setpoint
- [Elements Overview](./overview) — Common properties and logging
