---
id: global-variable
title: Global Variable
sidebar_position: 2
---

# Global Variable

A **Global Variable** stores a value that can be read and written by scripts and displayed on the Dashboard. It acts as shared state across your automation.

## What It Is

A Global Variable is a non-device element that holds a single value. It supports multiple types: **Value** (numeric), **Boolean**, **String**, **Time Span**, and **Date/Time**.

## Why It Exists

- **Script variables** — Store intermediate values, setpoints, and flags between script runs
- **Display** — Show computed or script-driven values on the Dashboard
- **User input** — With User Control enabled, allow manual override from the UI
- **Data logging** — Optional historical logging for trending

## How to Add

1. In Solution Explorer, right-click a **Workspace** or **Folder**
2. Choose **Global Variable**
3. Edit the element (double-click or context menu → Edit) to set name, type, and value

## Native Properties

| Property | Type | Description |
|----------|------|-------------|
| `displayName` | string | Name shown in UI |
| `name` | string | Script reference name (used in `"Name" Value` syntax) |
| `variableName` | string | Alternate name (e.g. for display; falls back to `name` when empty) |
| `variableType` | Value \| Boolean \| String \| TimeSpan \| DateTime | Data type |
| `value` | string | Current value (format depends on type) |
| `precision` | number | Decimal places (Value type only) |
| `format` | string | Display format (TimeSpan, DateTime) |
| `enableHistoricalLogging` | boolean | Log value over time |
| `loggingIntervalSeconds` | number | Min seconds between logged values; 0 = every change |
| `maxSilenceSeconds` | number | Force log current value if no change for N seconds (0 = disabled). Default 60 for globals. |
| `userControl` | boolean | Allow manual edit from Dashboard |
| `visibility` | Default \| Visible \| Hidden \| HiddenLocked | When to show on Dashboard |

## Custom Properties (from plugin-library)

Element templates (e.g., `gv-value`, `gv-bool`) define custom properties in `ui-controls.json`:

| Property | Type | Group | Description |
|----------|------|-------|-------------|
| `showHeader` | boolean | Layout | Show header bar |
| `showBackground` | boolean | Layout | Show element template background and border |
| `showLabel` | boolean | Layout | Show title label |
| `showValue` | boolean | Layout | Show value text |
| `showToggleLabel` | boolean | Layout | Show ON/OFF text (Boolean) |
| `onLabel` | text | Toggle | Text when true (default: ON) |
| `offLabel` | text | Toggle | Text when false (default: OFF) |
| `labelFontFamily`, `labelFontSize`, `labelColor` | — | Label | Font and color |
| `valueFontFamily`, `valueFontSize`, `valueColor` | — | Value | Value styling |
| `backgroundColor`, `borderColor` | — | Background & Border | Theme-aware overrides |

## Script Integration

In scripts, reference a Global Variable by its **Name**. Use **Value** for all types, including Boolean:

```
// Read value (numeric)
"TempSetpoint" Value

// Write value
"TempSetpoint" Value = 152

// Boolean: read
"PumpOverride" Value

// Boolean: set
"PumpOverride" Value = true
```

## Use Cases

- **Setpoint storage** — Hold target temperature, duration, or threshold for scripts
- **Manual override flag** — Boolean to let users bypass automation
- **Computed display** — Script writes a calculated value; element template shows it
- **Data logging** — Enable historical logging to chart the variable over time
