---
id: deadband
title: Deadband
sidebar_position: 13
---

# Deadband

A **Deadband** element provides multi-zone control based on an input value. Instead of simple on/off (hysteresis) or continuous output (PID), it drives the output at different levels depending on how far the input is from the target.

## What It Is

Deadband control divides the range around the target into bands:

- **Deadband** — Region where output is minimal or zero
- **Inner band** — Output at **Inner Band Drive** when within inner band offset
- **Outer band** — Output at **Outer Band Drive** when farther from target

This allows stepped control (e.g., low/medium/high heating) without full PID tuning.

## Hardware Connection

- **Input**: Select an Analog Input, OW Temp, SPI Sensor, or other value element as the **Input Port**.
- **Output**: The Deadband uses a Digital Output or PWM Output port. **Use PWM** enables proportional output within each band.

## Port Type

**Deadband** — Uses an output port on the interface and references an input port by ID.

## Native Properties

| Property | Type | Description |
|----------|------|-------------|
| **Value** | number | Current calibrated output value. Read-only. |
| **RawValue** | number | Current uncalibrated output value. Read-only. |
| **InputPortID** | string | ID of the input port (process variable) |
| **Target** | number | Setpoint for deadband control |
| **DeadbandOffset** | number | Offset from target defining the deadband region |
| **InnerBandOffset** | number | Offset from target defining the inner band |
| **InitialOutput** | number | Initial output percentage (0–100) |
| **InnerBandDrive** | number | Drive change per calculation cycle in inner band (0–50) |
| **OuterBandDrive** | number | Drive change per calculation cycle in outer band (0–50) |
| **CalcTime** | number | Calculation interval in seconds (1–30) |
| **OutTime** | number | Output interval in seconds (1–10) |
| **Reversed** | boolean | Reverse the output direction |
| **PWM** | boolean | Use PWM output instead of on/off |
| **Enabled** | boolean | Whether the device is active |
| **User Control** | boolean | Allow manual target adjustment |
| **Refresh Multiple** | number | Refresh rate multiplier (1–60) |
| **Primary Display Channel** | 0 or 1 | 0 = Output, 1 = Target |

## Custom Properties

From the default Deadband element template (`deadband`):

| Property | Type | Default | Group | Description |
|----------|------|---------|-------|--------------|
| showHeader | boolean | true | Layout | Show header bar |
| showBackground | boolean | true | Layout | Show element template background and border |
| showLabel | boolean | true | Layout | Show title label in header |
| hiddenRowKeys | array | — | Layout | Hide rows: "value", "target", "band" |
| showValue | boolean | true | Layout | Show primary value rows |
| showSecondaryRows | boolean | true | Layout | Show secondary detail rows |
| showFooter | boolean | true | Layout | Show footer controls |
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
| backgroundColor | color | (theme) | Background & Border | Element template background |
| headerColor | color | (theme) | Background & Border | Header background |
| borderColor | color | (theme) | Background & Border | Border color |
| rowLabelColor | color | (theme) | Rows | Row label color |
| rowValueColor | color | (theme) | Rows | Row value color |

## Calibrations

Deadband supports calibrations on the input. Use the **Calibration** tab to transform the process variable before the deadband algorithm.

## Script Integration

### Read Output

```
new value dbOut
dbOut = "Heater Deadband" Value
```

### Read/Write Target

```
"Heater Deadband" Target = 150
new value sp
sp = "Heater Deadband" Target
```

### Common Patterns

```
// Set target
"Heater Deadband" Target = 152

// Adjust for different phase
"Heater Deadband" Target = 168
```
