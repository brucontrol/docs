---
id: profile
title: Profile
sidebar_position: 10
---

# Profile

A **Profile** element implements ramp or step control. It reads a **source** value (e.g., temperature) and writes a **destination** value (e.g., setpoint) according to a table of thresholds and setpoints.

## What It Is

A Profile has a **source** (element + property to read) and a **destination** (element + property to write). A **table** defines threshold → value pairs. As the source value changes, the Profile computes the destination value (with optional directional handling for ramps).

## Why It Exists

- **Temperature ramps** — Step mash: as time or temp increases, adjust setpoint
- **Step mashing** — Multiple rest temperatures with automatic transitions
- **Ramp control** — Gradually increase/decrease setpoint based on source (e.g., timer)

## How to Add

1. In Solution Explorer, right-click a **Workspace** or **Folder**
2. Choose **Profile**
3. Edit to set **Source** (element + property) and **Destination** (element + property)
4. Build the **table** with threshold and value columns
5. Enable **Directional** if the profile should behave differently when source increases vs decreases

## Native Properties

| Property | Type | Description |
|----------|------|-------------|
| `displayName` | string | Name shown in UI |
| `name` | string | Internal name (fallback) |
| `sourceId` | string | Element ID for source |
| `sourceProperty` | string | Property to read (e.g., Value for Timer or Analog Input) |
| `destinationId` | string | Element ID for destination |
| `destinationProperty` | string | Property to write (e.g., Value) |
| `directional` | boolean | Use different values when source increases vs decreases |
| `table` | array | Rows: `{ threshold, valueIncreasing, valueDecreasing }`. When `directional` is false, `valueDecreasing` is ignored. |
| `userControl` | boolean | Allow user interaction from Dashboard |
| `visibility` | Default \| Visible \| Hidden \| HiddenLocked | When to show |

## Custom Properties (from plugin-library)

From `profile` widget `ui-controls.json`:

| Property | Type | Group | Description |
|----------|------|-------|-------------|
| `showHeader`, `showBackground`, `showLabel`, `showValue` | boolean | Layout | Visibility |
| `labelFontFamily`, `labelFontSize`, `labelColor` | — | Label | Label styling |
| `valueFontFamily`, `valueFontSize`, `valueColor` | — | Value | Value styling |
| `backgroundColor`, `borderColor` | — | Background & Border | Theme-aware overrides |

## Script Integration

Profiles run automatically: they read the source and write the destination based on the table. Scripts typically:

- Control the **source** (e.g., start a timer that the Profile uses as source)
- Read/write the **destination** if manual override is needed
- Adjust the **source** element to drive the profile (e.g., a Global Variable or Timer)

```
// Profile might use "MashTimer" Value as source
// and "TempSetpoint" Target as destination (PID Target = setpoint)
// Script starts the timer; Profile updates setpoint automatically
"MashTimer" start
```

## Use Cases

- **Step mash** — Source: Timer Value; Destination: PID Target; Table: 0→152, 30→158, 60→168
- **Ramp down** — Source: temperature; Destination: setpoint; ramp down as temp rises
- **Multi-rest** — Table defines each rest temp and transition threshold
