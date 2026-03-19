---
id: digital-input
title: Digital Input
sidebar_position: 3
---

# Digital Input

A **Digital Input** element reads a single binary signal from your interface: **ON** or **OFF** (high/low, subject to **Active Low**). Use it for limit switches, flow switches, pushbuttons, door sensors, and any other two-state sensor. The UI can show a label, ON/OFF text, and an active indicator that reflects the live **Value** property.

## What it does

The interface samples the bound pin and exposes the logical state as **Value** (read-only in scripts). **Active Low** lets you interpret a physical low voltage as logical ON, which is common for switches that pull to ground. The element’s appearance—fonts and colors for the status text—is controlled by **status**\* custom properties, not by legacy `valueFont*` names.

:::info
**Value** is read-only: scripts react to inputs; they do not “set” a digital input’s electrical state. Use outputs, software elements, or device logic to drive actuators.
:::

## Hardware and wiring

- Use a port designated **Digital Input** on your interface.
- Observe voltage limits and pull-up/pull-down requirements from your hardware manual.
- Noisy lines may need debouncing in hardware or higher-level logic (timers, hysteresis elements).

:::tip
If a switch reads “floating” or random, add or enable a pull-up/pull-down on the pin or fix the wiring so the line is always driven to a defined level.
:::

## Adding a Digital Input element

1. Add and enable the **Interface** device with a free digital input port.
2. **Add Device Element** → **Digital Input**.
3. Select device and port.
4. Edit the element to tune labels, status styling, and logging.

**Port type:** **DigitalInput** — match the physical pin map for inputs only.

## Custom properties (appearance)

Property keys match the Digital Input `ui-controls.json`.

### Layout

| Property | Notes |
|----------|--------|
| `showHeader` | boolean, default `true`. |
| `showBackground` | boolean, default `true`. |
| `showLabel` | boolean, default `true`. |
| `showValue` | boolean, default `true` — UI label: “Show ON/OFF value text”. |
| `showActiveIndicator` | boolean, default `true` — highlights when input is logically ON. |

### Label

| Property | Notes |
|----------|--------|
| `labelFontFamily` | text, default `""` (inherits). |
| `labelFontSize` | number, default `12`, range `8`–`48`. |
| `labelFontWeight` | text, default `"500"`. |
| `labelFontStyle` | text, default `"normal"`. |
| `labelColor` | text, default theme `textPrimary`. |

### Status text (ON/OFF display)

Use **status**\* properties for the ON/OFF value presentation. Do **not** use `valueFontFamily`, `valueFontSize`, or `valueColor`—they are not defined on this template.

| Property | Notes |
|----------|--------|
| `onLabel` | text, default `"ON"`. |
| `offLabel` | text, default `"OFF"`. |
| `statusColor` | text, default `""` (theme: `accentGreen`). |
| `statusFontFamily` | text, default `""` (inherits `font-family`). |
| `statusFontSize` | number, default `19`, range `10`–`120`. |
| `statusFontWeight` | text, default `"700"`. |
| `statusFontStyle` | text, default `"normal"`. |

### Background and chrome

| Property | Notes |
|----------|--------|
| `backgroundColor` | default theme `bgSecondary`. |
| `headerColor` | default theme `bgTertiary`. |
| `borderColor` | default theme `borderColor`. |
| `image` | file-upload — optional background image. |

## Script properties — common to all elements

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `ID` | string | RO | Unique element identifier. |
| `DisplayName` | string | RW | Shown name on the element. |
| `Visibility` | string | RW | `default`, `visible`, `hidden`, `hiddenlocked`. |
| `EnableHistoricalLogging` | boolean | RW | Record history for trends when enabled. |
| `LoggingIntervalSeconds` | number | RW | Minimum seconds between stored points; `0` stores on every change. |
| `MaxSilenceSeconds` | number | RW | Log again after N seconds unchanged; `0` off. |

## Script properties — all device elements

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `Enabled` | boolean | RW | Disables hardware communication when `false`. |
| `Connected` | boolean | RO | Device connection state. |
| `RefreshMultiple` | number | RW | Stretches refresh interval to reduce bus traffic. |
| `DisplayText` | string | RO | Port’s formatted display string. |
| `PortID` | string | RO | Bound port identifier. |

## Script properties — Digital Input only

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `Value` | boolean | RO | Current logical ON/OFF state. |
| `ActiveLow` | boolean | RW | When `true`, low voltage reads as ON. |

:::warning
Assigning **Active Low** incorrectly makes every reading look inverted. Confirm against a known switch position and a multimeter before relying on interlocks.
:::

## Example scripts

React to a limit switch:

```
if (LimitSwitch.Value) {
    Alarm.DisplayName = "Limit tripped";
} else {
    Alarm.DisplayName = "OK";
}
```

Log only when you need trends (interval in seconds):

```
LimitSwitch.EnableHistoricalLogging = true;
LimitSwitch.LoggingIntervalSeconds = 5;
```

Temporarily hide the tile but keep scripts running:

```
SpareInput.Visibility = "hidden";
```

## Troubleshooting

- **Value never changes** — Confirm **Enabled** and **Connected**. Check **PortID** matches the wired pin. Increase polling visibility by lowering **RefreshMultiple** if the UI seems stale (within acceptable bus load).
- **Always ON or always OFF** — Revisit **ActiveLow**. Test the pin voltage while toggling the switch. Fix floating inputs with pull resistors.
- **Chattering ON/OFF** — Mechanical bounce: use debounce in hardware or implement software delays / timers that require stable **Value** for N ms before acting.
- **DisplayText disagrees with Value** — **DisplayText** reflects port formatting; trust **Value** for boolean logic unless your calibration docs say otherwise.
- **History gaps** — If values are steady, **LoggingIntervalSeconds** may suppress duplicates; use **MaxSilenceSeconds** to force periodic samples.
- **Wrong typography on ON/OFF** — Adjust **statusFontFamily**, **statusFontSize**, **statusFontWeight**, **statusFontStyle**, and **statusColor**; avoid nonexistent `valueFont*` keys.
