---
id: duty-cycle
title: Duty Cycle
sidebar_position: 4
---

# Duty Cycle

A **Duty Cycle** element controls an output by cycling it on and off over a fixed interval. The **duty cycle percentage** (0–100%) determines how much of that interval the output is on. This provides simple proportional control without PWM hardware.

## What It Is

A Duty Cycle output turns a digital pin on and off repeatedly. For example, at 50% duty cycle and a 1-second interval, the output is on for 0.5 seconds and off for 0.5 seconds. The interface firmware handles the timing; BruControl sends the duty cycle percentage and interval.

## Hardware Connection

Connect the Duty Cycle output like a Digital Output — to a relay, SSR, or other switching device. The load sees a pulsed signal whose average power is proportional to the duty cycle.

:::tip
Duty Cycle is useful when you need proportional control but don't have a PWM-capable pin, or when the load (e.g., heater) responds well to on/off cycling.
:::

## Port Type

**DutyCycle** — Use a pin designated for Duty Cycle on your interface wiring map.

## Native Properties

| Property | Type | Description |
|----------|------|-------------|
| **Value** | boolean | Current output state (ON/OFF). Read-only, reflects real-time cycling. |
| **DutyCycle** | number | Duty cycle percentage (0–100). Read/write. |
| **Interval** | number | Cycle interval in milliseconds (100–10000). Read/write. |
| **Enabled** | boolean | Whether the device is active |
| **User Control** | boolean | Allow manual adjustment from the Dashboard |
| **Refresh Multiple** | number | Refresh rate multiplier (1–60) |

## Custom Properties

From the default Duty Cycle element template (`duty-cycle`):

| Property | Type | Default | Group | Description |
|----------|------|---------|-------|--------------|
| showHeader | boolean | true | Layout | Show header bar |
| showBackground | boolean | true | Layout | Show element template background and border |
| showLabel | boolean | true | Layout | Show title label in header |
| hiddenRowKeys | array | — | Layout | Hide rows: "value", "interval" |
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

Duty Cycle does not use calibrations.

## Script Integration

### Read Duty Cycle

```
new value heatLevel
heatLevel = "Heater Duty" DutyCycle
```

### Write Duty Cycle

```
"Heater Duty" DutyCycle = 75
```

### Common Patterns

```
// Set heating to 50%
"Heater Duty" DutyCycle = 50

// Ramp up over time
new value pct
pct = 0
while pct < 80
  "Heater Duty" DutyCycle = pct
  pct = pct + 10
  sleep 5000
endwhile
```
