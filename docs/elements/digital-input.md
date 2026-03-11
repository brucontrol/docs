---
id: digital-input
title: Digital Input
sidebar_position: 3
---

# Digital Input

A **Digital Input** reads the state of a switch, sensor, or contact — either HIGH (on) or LOW (off). It is read-only from the application.

## What It Is

A Digital Input element reads a single digital pin on the interface. The pin is typically connected to a switch, float sensor, proximity sensor, or other binary sensor. The interface reports the pin state (high or low) to BruControl.

## Hardware Connection

Connect the interface pin to your sensor or switch:

- **Switch/button**: One side to the pin, other to ground (or VCC for active-low). Use a pull-up or pull-down resistor as needed.
- **Float sensor, proximity sensor**: Follow the sensor datasheet. Many output an open-collector or logic-level signal.

:::tip
If the input reads erratically, add debouncing (hardware or via script logic) or check wiring and grounding.
:::

## How to Add

1. Add and enable an **Interface** (device) with available Digital Input ports
2. Use **Add Device Element** (e.g., from the device context in Solution Explorer) and choose **Digital Input**
3. Select the device and port
4. Edit the element (double-click or context menu → Edit) to configure properties

## Port Type

**DigitalInput** — Use a pin designated as Digital Input (D) on your interface wiring map.

## Native Properties

| Property | Type | Description |
|----------|------|-------------|
| **Value** | boolean | Current input state — HIGH (true) or LOW (false). Read-only. |
| **Enabled** | boolean | Whether the device is active in the system |
| **Active Low** | boolean | Invert the input (treat low as "active") |
| **Refresh Multiple** | number | Refresh rate multiplier (1–60) |
| **Enable Historical Logging** | boolean | Log value over time |
| **Logging Interval Seconds** | number | Interval between log entries (seconds) |

## Custom Properties

From the default Digital Input element template (`digital-input`):

| Property | Type | Default | Group | Description |
|----------|------|---------|-------|--------------|
| showHeader | boolean | true | Layout | Show header bar |
| showBackground | boolean | true | Layout | Show element template background and border |
| showLabel | boolean | true | Layout | Show title label in header |
| showValue | boolean | true | Layout | Show ON/OFF value text |
| showActiveIndicator | boolean | true | Layout | Show Active Low / Active High indicator |
| onLabel | text | "ON" | Display | Label text when input is high |
| offLabel | text | "OFF" | Display | Label text when input is low |
| labelFontFamily | font-family | — | Label | Label font |
| labelFontSize | number | 12 | Label | Label font size (8–48) |
| labelFontWeight | text | "500" | Label | Label font weight |
| labelFontStyle | text | "normal" | Label | Label font style |
| labelColor | color | (theme) | Label | Label color |
| valueFontFamily | font-family | — | Value | Value font |
| valueFontSize | number | 19 | Value | Value font size (10–120) |
| valueFontWeight | text | "700" | Value | Value font weight |
| valueFontStyle | text | "normal" | Value | Value font style |
| valueColor | color | (theme) | Value | Value color |
| backgroundColor | color | (theme) | Background & Border | Element template background |
| headerColor | color | (theme) | Background & Border | Header background |
| borderColor | color | (theme) | Background & Border | Border color |

## Calibrations

Digital Input does not use calibrations.

## Script Integration

Use the element name in quotes, then the property. Digital Input is read-only.

### Read Value

```
new bool switchState
switchState = "Float Switch" Value
```

### Wait for Condition

```
wait "Start Button" Value = on 10000
```

### Common Patterns

```
// Check if liquid level is low
if "Low Level Sensor" Value = on
  print "Low level warning!"
endif

// Wait for user to press button
wait "Confirm Button" Value = on 30000

// Use in conditional
if "Safety Interlock" Value = off
  "Pump" State = off
  print "Interlock open - pump disabled"
endif
```
