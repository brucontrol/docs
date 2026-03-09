---
id: pwm-output
title: PWM Output
sidebar_position: 5
---

# PWM Output

A **PWM (Pulse Width Modulation) Output** produces a variable output level by varying the duty cycle of a high-frequency square wave. It can drive proportional valves, variable-speed motors, dimmable lights, or (with an RC filter) an analog voltage.

## What It Is

A PWM Output typically outputs 0–255 (8-bit) or 0–100% to the interface. The interface drives the pin with a PWM signal. The **Requested Value** is what you set; the **Value** is the calibrated output (if calibrations are applied).

## Hardware Connection

- **Direct PWM**: Connect the pin to a PWM-compatible device (e.g., LED dimmer, motor driver). Many Arduino pins support hardware PWM.
- **Analog output**: Use an RC low-pass filter (resistor + capacitor) to convert PWM to a DC voltage for analog devices.

:::tip
Check your interface wiring map for pins marked (P) for PWM. Not all pins support hardware PWM.
:::

## Port Type

**PWMOutput** — Use a pin designated as PWM Output (P) on your interface wiring map.

## Native Properties

| Property | Type | Description |
|----------|------|-------------|
| **Value** | number | Current output value (after calibration). Read-only. |
| **RawValue** | number | Raw output (0–255). Read-only. |
| **RequestedValue** | number | Target output value. Read/write. |
| **Precision** | number | Decimal places for display. Read-only (configured in device settings). |
| **Prefix** | string | Text before value (e.g., unit). Read-only (configured in device settings). |
| **Suffix** | string | Text after value. Read-only (configured in device settings). |
| **Enabled** | boolean | Whether the device is active |
| **User Control** | boolean | Allow manual adjustment from the Dashboard |
| **Refresh Multiple** | number | Refresh rate multiplier (1–60) |

## Custom Properties

From the default PWM Output widget template (`pwm-output`):

| Property | Type | Default | Group | Description |
|----------|------|---------|-------|--------------|
| showHeader | boolean | true | Layout | Show header bar |
| showBackground | boolean | true | Layout | Show widget background and border |
| showLabel | boolean | true | Layout | Show title label in header |
| hiddenRowKeys | array | — | Layout | Hide rows: "value", "requested" |
| showValue | boolean | true | Layout | Show primary value rows |
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

PWM Output supports calibrations. Use the **Calibration** tab in the Edit Drawer to apply transforms (e.g., Multiplier, Offset, Floor, Ceiling) to convert between your desired units and the raw 0–255 range.

## Script Integration

### Read Value

```
new value pumpSpeed
pumpSpeed = "Pump PWM" Value
```

### Write Requested Value

```
"Pump PWM" RequestedValue = 128
"Valve PWM" RequestedValue = 75
```

### Common Patterns

```
// Set pump to 50%
"Recirc Pump" RequestedValue = 127

// Ramp valve open (0-100% or 0-255 raw)
new value v
v = 0
while v < 100
  "Proportional Valve" RequestedValue = v
  v = v + 10
  sleep 1000
endwhile
```
