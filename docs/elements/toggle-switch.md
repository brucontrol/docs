---
id: toggle-switch
title: Toggle Switch
sidebar_position: 3
---

# Toggle Switch

A **Toggle Switch** is an on/off control that maintains its state. Users (or scripts) flip it between true and false.

## What It Is

A Toggle Switch is a non-device element with a binary **State** (on/off). Unlike a Button, it stays in the state you set until changed.

## Why It Exists

- **Manual override** — Let operators enable/disable pumps, heaters, or automation
- **Script trigger** — Scripts read the state to decide behavior; users set it from the Dashboard
- **Persistent flag** — State persists across script runs and sessions

## How to Add

1. In Solution Explorer, right-click a **Workspace** or **Folder**
2. Choose **Toggle Switch**
3. Edit to set display name and configure appearance

## Native Properties

| Property | Type | Description |
|----------|------|-------------|
| `displayName` | string | Name shown in UI |
| `name` | string | Internal name (fallback) |
| `state` | boolean | Current on/off state |
| `userControl` | boolean | Allow manual toggle from Dashboard |
| `visibility` | Default \| Visible \| Hidden \| HiddenLocked | When to show |

## Custom Properties (from plugin-library)

From `toggle-switch` widget `ui-controls.json`:

| Property | Type | Group | Description |
|----------|------|-------|-------------|
| `showHeader` | boolean | Layout | Show header bar |
| `showBackground` | boolean | Layout | Show widget background and border |
| `showLabel` | boolean | Layout | Show title label |
| `showValue` | boolean | Layout | Show toggle control |
| `showToggleLabel` | boolean | Layout | Show ON/OFF text beside toggle |
| `onLabel` | text | Toggle | Text when true (default: ON) |
| `offLabel` | text | Toggle | Text when false (default: OFF) |
| `labelFontFamily`, `labelFontSize`, `labelColor` | — | Label | Label styling |
| `valueFontFamily`, `valueFontSize`, `valueColor` | — | Value | Value styling |
| `backgroundColor`, `borderColor` | — | Background & Border | Theme-aware overrides |

## Script Integration

```
// Read state
"PumpSwitch" State

// Set state (start)
"PumpSwitch" State = true

// Set state (stop)
"PumpSwitch" State = false

// Use in condition
if "PumpSwitch" State
  "Pump" State = true
endif
```

## Use Cases

- **Pump override** — Toggle pump on/off manually during setup
- **Heater enable** — Enable/disable heating element
- **Automation bypass** — Script checks state; if true, skip automated control
- **Manual mode** — Toggle between auto and manual control
