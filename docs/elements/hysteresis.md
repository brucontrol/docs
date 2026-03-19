---
id: hysteresis
title: Hysteresis
sidebar_position: 11
---

# Hysteresis

A **Hysteresis** element provides simple on/off control based on a process variable. The output turns **on** when the input crosses an activation band around **Target** (**On Offset**) and turns **off** when the input returns toward the setpoint, preventing relay chatter. The Dashboard tile shows target, output, offset, and input; the device drives a **digital output** for compressors, heaters, solenoids, and similar loads.

## What It Is

Hysteresis compares the calibrated **input** (from **InputPortID**) to **Target**. **On Offset** shifts the turn-on threshold relative to the target (negative offsets suit heating: the output energizes when the reading drops below target by the offset; positive offsets suit cooling). **On Delay** enforces a minimum time between activations. **Value** (read-only boolean) reflects the current output state. **Active Low** and **Predictive Hysteresis** are configured in the element editor UI; they are **not** exposed to Process scripts—adjust them in the designer, not via assignments in script.

## Hardware Connection

- **Input**: Choose an **Analog Input**, **OW Temp**, **SPI Sensor**, or another numeric source; its port ID becomes **InputPortID**.
- **Output**: The hysteresis device occupies a **digital output** port on the interface for the physical load.

## Port Type

**Hysteresis** — Output port on the interface; references an input by **InputPortID**.

## Native Properties

| Property | Type | Description |
|----------|------|-------------|
| **Value** | boolean | Current output state (read-only in script). |
| **InputPortID** | string | ID of the input (process variable). |
| **Target** | number | Setpoint. |
| **OnOffset** | number | Offset from target where output turns on (sign determines heating vs cooling style behavior). |
| **OnDelay** | number | Minimum seconds between output activations (0–1800). |
| **ActiveLow** | boolean | Invert the electrical output (UI only). |
| **PredictiveHysteresis** | boolean | Predictive algorithm (UI only). |
| **Enabled** | boolean | Master enable for the device. |
| **User Control** | boolean | Allow operator adjustments where applicable. |
| **Refresh Multiple** | number | Refresh rate multiplier (1–60). |

Calibrations apply before comparison—use the **Calibration** tab to scale or offset the input.

## Custom Properties

All names below match the **hysteresis** entry in `ui-controls.json`.

### Layout

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showHeader` | boolean | true | Show the header region. |
| `showBackground` | boolean | true | Show template background and border. |
| `showLabel` | boolean | true | Show the title label. |
| `showValue` | boolean | true | Show primary value rows (“Show primary value rows”). |
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

### Output section

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showOutput` | boolean | true | Show the output state row. |
| `outputColor` | text | — | Output value color (theme default: **accentGreen**). |
| `outputBg` | text | — | Output row background (theme default: **bgTertiary**). |
| `outputLabelColor` | text | — | Output label color (theme default: **textSecondary**). |
| `outputFont` | text | — | Output value font family. |
| `outputSize` | number | null | Output value size (8–120). |
| `outputWeight` | text | — | Output value weight. |
| `outputStyle` | text | — | Output value style. |

### On Offset section

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showOnOffset` | boolean | true | Show the on-offset row. |
| `onOffsetColor` | text | — | On-offset value color (theme default: **accentGreen**). |
| `onOffsetLabelColor` | text | — | On-offset label color (theme default: **textSecondary**). |
| `onOffsetFont` | text | — | On-offset font family. |
| `onOffsetSize` | number | null | On-offset size (8–120). |
| `onOffsetWeight` | text | — | On-offset weight. |
| `onOffsetStyle` | text | — | On-offset style. |

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

:::info UI-only options

**ActiveLow** and **PredictiveHysteresis** are edited in the element properties UI. They are **not** script properties—do not assign them in Process scripts.

:::

## Script Integration

**Hysteresis-specific script properties:** **`InputPortID`** (string, read/write), **`Target`** (number, read/write), **`OnOffset`** (number, read/write), **`OnDelay`** (number, read/write), **`Value`** (boolean, read-only).

**Common device script properties:** **`Enabled`** (boolean, read/write), **`Connected`** (boolean, read-only), **`RefreshMultiple`** (number, read/write), **`DisplayText`** (string, read-only), **`PortID`** (string, read-only).

**Common element script properties:** **`ID`** (string, read-only), **`DisplayName`** (string, read/write), **`Visibility`** (string, read/write), **`EnableHistoricalLogging`** (boolean, read/write), **`LoggingIntervalSeconds`** (number, read/write), **`MaxSilenceSeconds`** (number, read/write).

```
// Read whether cooling is active
new bool coolingOn
coolingOn = "Fermenter Cool" Value

// Adjust setpoint from a recipe step
"Fermenter Cool" Target = 68

// Temporarily disable output without deleting the element
"Fermenter Cool" Enabled = off

// Confirm wiring and interface health
new bool online
online = "Fermenter Cool" Connected

// Operator-facing label
"Fermenter Cool" DisplayName = "Fermenter: Cooling"

// Optional logging
"Fermenter Cool" EnableHistoricalLogging = true
"Fermenter Cool" LoggingIntervalSeconds = 5
"Fermenter Cool" MaxSilenceSeconds = 60
```

:::tip Sign of **OnOffset**

Negative **OnOffset** is typical for **heating** (turn on when the reading has fallen enough below target). Positive **OnOffset** is typical for **cooling** (turn on when the reading has risen enough above target). Verify against your physical wiring and **ActiveLow**.

:::

:::warning `Visibility` values

Use **`"default"`**, **`"visible"`**, **`"hidden"`**, or **`"hiddenlocked"`** for **`Visibility`**. See [Elements Overview](./overview).

:::

## Theming, `headerColor`, and `image`

Use **`headerColor`** to visually group hysteresis tiles with other control elements. **`image`** can reinforce equipment zones; ensure **`targetBg`**, **`outputBg`**, and **`inputBg`** keep value text legible against the photo or pattern.

## Troubleshooting

| Symptom | Things to check |
|---------|------------------|
| Output never turns on | **Enabled**; **Connected**; correct **InputPortID**; **Target** and **OnOffset** sign; input calibration; wiring and **ActiveLow**. |
| Rapid cycling | Widen effective hysteresis via **OnOffset**; increase **OnDelay**; enable **PredictiveHysteresis** in the UI if appropriate; filter noisy inputs. |
| Output inverted | **ActiveLow** in the UI; physical relay wiring; script should use **Value** as logical state, not raw pin level. |
| Script errors assigning **ActiveLow** | Not script-accessible—set in the designer only. |
| Dashboard cluttered | Set **`showSecondaryRows`** or individual **`showTarget`** / **`showInput`** flags; adjust **`precision`**. |
| Wrong port in scripts | **`PortID`** is the hysteresis **output** port (read-only); **`InputPortID`** selects the **sensor** element. |
| No history on charts | **`EnableHistoricalLogging`** and logging intervals; see [Elements Overview](./overview). |

## Related Topics

- [PID](./pid) — Continuous control instead of bang-bang
- [Deadband](./deadband) — Gradual output near setpoint
- [Digital Output](./digital-output) — Direct coil control
- [Elements Overview](./overview) — Common properties and logging
