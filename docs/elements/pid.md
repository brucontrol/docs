---
id: pid
title: PID
sidebar_position: 12
---

# PID

A **PID** (Proportional–Integral–Derivative) element provides precise closed-loop control. It reads a process variable from an input port, compares it to a target setpoint, and adjusts an output to minimize error.

## What It Is

PID control is used for temperature, pressure, flow, or other variables that need accurate regulation. The algorithm uses three terms:

- **Proportional (Kp)** — Response to current error
- **Integral (Ki)** — Eliminates steady-state error
- **Derivative (Kd)** — Anticipates future error

The output can drive a Digital Output (on/off) or a PWM Output, depending on the **Use PWM** setting.

## Hardware Connection

- **Input**: Select an Analog Input, OW Temp, or SPI Sensor as the **Input Port**.
- **Output**: The PID uses a Digital Output or PWM Output port. Enable **Use PWM** for proportional output; otherwise it uses on/off switching.

## Port Type

**PID** — Uses an output port on the interface and references an input port by ID.

## Native Properties

| Property | Type | Description |
|----------|------|-------------|
| **Value** | number | Current calibrated output value. Read-only. |
| **RawValue** | number | Uncalibrated output value. Read-only. |
| **InputPortID** | string | GUID of the input port (process variable) |
| **Target** | number | Setpoint for PID control |
| **Kp** | number | Proportional gain |
| **Ki** | number | Integral gain |
| **Kd** | number | Derivative gain |
| **MaxOutput** | number | Maximum output percentage (0–100) |
| **MaxIntegral** | number | Maximum integral windup (0–100) |
| **CalcTime** | number | PID calculation interval in seconds (1–10) |
| **OutTime** | number | Output update period in seconds (1–10); duty cycle period when not PWM |
| **Reversed** | boolean | Reverse the output direction |
| **PWM** | boolean | Use PWM output instead of on/off |
| **Enabled** | boolean | Whether the device is active |
| **User Control** | boolean | Allow manual target adjustment |
| **Refresh Multiple** | number | Refresh rate multiplier (1–60) |
| **Primary Display Channel** | number | 0 = Output, 1 = Target |

## Custom Properties

From the default PID widget template (`pid`):

| Property | Type | Default | Group | Description |
|----------|------|---------|-------|--------------|
| showHeader | boolean | true | Layout | Show header bar |
| showBackground | boolean | true | Layout | Show widget background and border |
| showLabel | boolean | true | Layout | Show title label in header |
| hiddenRowKeys | array | — | Layout | Hide rows: "output", "target", "kpkikd" |
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
| backgroundColor | color | (theme) | Background & Border | Widget background |
| headerColor | color | (theme) | Background & Border | Header background |
| borderColor | color | (theme) | Background & Border | Border color |
| rowLabelColor | color | (theme) | Rows | Row label color |
| rowValueColor | color | (theme) | Rows | Row value color |

## Calibrations

PID supports calibrations on the input. Use the **Calibration** tab to transform the process variable before the PID algorithm.

## Script Integration

### Read Output

```
new value pidOut
pidOut = "Mash PID" Value
```

### Read/Write Target (Setpoint)

```
"Mash PID" Target = 152
new value sp
sp = "Mash PID" Target
```

### Common Patterns

```
// Set mash temperature
"Mash PID" Target = 152

// Ramp setpoint
new value t
t = 100
while t <= 168
  "Mash PID" Target = t
  t = t + 2
  sleep 60000
endwhile

// Cold crash
"Fermenter PID" Target = 34
```
