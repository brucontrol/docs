---
id: hysteresis
title: Hysteresis
sidebar_position: 11
---

# Hysteresis

A **Hysteresis** element provides simple on/off control based on an input value. The output turns on when the input rises above a threshold and turns off when it falls below a lower threshold, preventing rapid cycling.

## What It Is

Hysteresis compares an **Input Port** (process variable) to a **Target** setpoint. The **On Offset** defines how far above (or below) the target the output turns on. The output turns off when the input returns toward the target. This creates a "dead band" that avoids rapid on/off switching (e.g., for refrigeration).

## Hardware Connection

- **Input**: Select an existing Analog Input, OW Temp, SPI Sensor, or other value element as the **Input Port**.
- **Output**: The Hysteresis element uses a Digital Output port on the interface to drive a relay, compressor, or heater.

## Port Type

**Hysteresis** — Uses an output port on the interface and references an input port by ID.

## Native Properties

| Property | Type | Description |
|----------|------|-------------|
| **Value** | boolean | Current output state (ON/OFF). Read-only. |
| **InputPortID** | string | ID of the input port (process variable). Scripts use element or port ID. |
| **Target** | number | Setpoint for hysteresis control |
| **OnOffset** | number | Offset from target at which output turns on. Negative for heating, positive for cooling. |
| **OnDelay** | number | Minimum time in seconds (0–1800) between output activations |
| **ActiveLow** | boolean | Invert the output signal |
| **PredictiveHysteresis** | boolean | Use predictive algorithm to anticipate target crossing |
| **Enabled** | boolean | Whether the device is active |
| **User Control** | boolean | Allow manual target adjustment |
| **Refresh Multiple** | number | Refresh rate multiplier (1–60) |

## Custom Properties

From the default Hysteresis widget template (`hysteresis`):

| Property | Type | Default | Group | Description |
|----------|------|---------|-------|--------------|
| showHeader | boolean | true | Layout | Show header bar |
| showBackground | boolean | true | Layout | Show widget background and border |
| showLabel | boolean | true | Layout | Show title label in header |
| hiddenRowKeys | array | — | Layout | Hide rows: "target", "output", "onoffset" |
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

Hysteresis supports calibrations on the input. Use the **Calibration** tab to transform the input value before comparison.

## Script Integration

### Read Output State

```
new bool coolingOn
coolingOn = "Fermenter Cool" Value
```

### Read/Write Target

```
new value setpoint
setpoint = "Fermenter Cool" Target
"Fermenter Cool" Target = 68
```

### Common Patterns

```
// Change setpoint for cold crash
"Fermenter Cool" Target = 34

// Check if cooling is active
if "Fermenter Cool" Value = on
  print "Cooling running"
endif
```
