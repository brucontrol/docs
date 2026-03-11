---
id: digital-output
title: Digital Output
sidebar_position: 2
---

# Digital Output

A **Digital Output** is an on/off output that drives a relay, pump, heater, LED, or other binary device. It outputs either HIGH (on) or LOW (off).

## What It Is

A Digital Output element controls a single digital pin on the interface. When the output is **ON**, the pin is driven high (or low if Active Low is enabled). When **OFF**, the pin is driven to the opposite state. The interface firmware handles the actual pin toggling.

## Hardware Connection

Connect the interface pin to your load through appropriate circuitry:

- **Low-current loads** (e.g., LEDs, small relays): Use a current-limiting resistor if needed
- **High-current loads** (motors, heaters, pumps): Use a relay or solid-state relay (SSR) — the interface pin drives the relay coil, not the load directly

:::tip
Interface pins typically source or sink only a few milliamps (e.g., 5–15 mA). Use an SSR that triggers at 5 mA or less for reliable operation.
:::

## How to Add

1. Add and enable an **Interface** (device) with available Digital Output ports
2. Use **Add Device Element** (e.g., from the device context in Solution Explorer) and choose **Digital Output**
3. Select the device and port
4. Edit the element (double-click or context menu → Edit) to configure properties

## Port Type

**DigitalOutput** — Use a pin designated as Digital Output (D) on your interface wiring map.

## Native Properties

| Property | Type | Description |
|----------|------|-------------|
| **State** | boolean | Current output state — ON (true) or OFF (false). Read/write. |
| **Enabled** | boolean | Whether the device is active in the system |
| **Active Low** | boolean | Invert the output (active when pin is low) |
| **User Control** | boolean | Allow manual toggle from the Dashboard |
| **Refresh Multiple** | number | Refresh rate multiplier (1–60) |
| **Dual Throw Port** | number | Port number for dual-throw mode (-1 = disabled) |
| **Dual Throw Delay** | number | Delay in ms between dual-throw transitions (0–25000) |
| **One-Shot Time** | number | One-shot pulse duration in ms (0–25000) |
| **One-Shot Direction** | 0 or 1 | 0 = ON→OFF, 1 = OFF→ON |
| **Enable Historical Logging** | boolean | Log state over time |
| **Logging Interval Seconds** | number | Logging interval |

## Custom Properties

From the default Digital Output element template (`digital-output`):

| Property | Type | Default | Group | Description |
|----------|------|---------|-------|--------------|
| showHeader | boolean | true | Layout | Show header bar |
| showBackground | boolean | true | Layout | Show element template background and border |
| showLabel | boolean | true | Layout | Show title label in header |
| showValue | boolean | true | Layout | Show toggle control |
| showToggleLabel | boolean | true | Layout | Show ON/OFF text beside toggle |
| showActiveIndicator | boolean | true | Layout | Show Active Low / Active High indicator |
| onLabel | text | "ON" | Toggle | Toggle text when on |
| offLabel | text | "OFF" | Toggle | Toggle text when off |
| toggleOnColor | color | (theme) | Toggle | Toggle track color when on |
| toggleOffColor | color | (theme) | Toggle | Toggle track color when off |
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

Digital Output does not use calibrations.

## Script Integration

Use the element name in quotes, then the property.

### Read State

```
new bool outState
outState = "Pump 1" State
```

### Write State (Turn On/Off)

```
"Pump 1" State = on
"Pump 1" State = off
```

Or with a variable:

```
new bool pumpOn
pumpOn = true
"Pump 1" State = pumpOn
```

### Wait for Condition

```
wait "Pump 1" State = on 5000
```

### Common Patterns

```
// Turn on heater
"Heater" State = on

// Turn off pump
"Recirc Pump" State = off

// Conditional control
if "Temp Probe" Value > 150
  "Cooling Fan" State = on
else
  "Cooling Fan" State = off
endif
```
