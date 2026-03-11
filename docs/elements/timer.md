---
id: timer
title: Timer
sidebar_position: 6
---

# Timer

A **Timer** counts up or down. It can run automatically, be controlled by scripts, and trigger alarms at configured thresholds.

## What It Is

A Timer is a non-device element that tracks elapsed time. It supports **CountUp** (stopwatch) or **CountDown** modes. Optional alarm associations can trigger when the timer reaches a threshold.

## Why It Exists

- **Mash timer** — Count up during mash; alarm at rest time
- **Boil timer** — Count down from 60 minutes; alarm at 0
- **Process timing** — Scripts start/stop/reset based on process state
- **User-visible countdown** — Display remaining time on Dashboard

## How to Add

1. In Solution Explorer, right-click a **Workspace** or **Folder**
2. Choose **Timer**
3. Edit to set type (CountUp/CountDown), reset value, format, and alarm associations

## Native Properties

| Property | Type | Description |
|----------|------|-------------|
| `displayName` | string | Name shown in UI |
| `name` | string | Internal name (fallback) |
| `type` | CountUp \| CountDown | Count direction |
| `resetValue` | string | TimeSpan for countdown start (e.g., 00:60:00) |
| `format` | string | Display format for elapsed/remaining |
| `value` | TimeSpan | Current elapsed (CountUp) or remaining (CountDown) time; script reads via **Value** |
| `isRunning` | boolean | Whether timer is currently running (runtime) |
| `initRunning` | boolean | Start timer running on init |
| `alarms` | array | Alarm associations: `{ alarmID, enabled, threshold }` (alarmID: Guid, threshold: TimeSpan) |
| `userControl` | boolean | Allow start/stop/reset from Dashboard |
| `visibility` | Default \| Visible \| Hidden \| HiddenLocked | When to show |
| `enableHistoricalLogging` | boolean | Log elapsed over time |
| `loggingIntervalSeconds` | number | Logging interval |

## Custom Properties (from plugin-library)

From `timer` element template `ui-controls.json`:

| Property | Type | Group | Description |
|----------|------|-------|-------------|
| `showHeader`, `showBackground`, `showLabel`, `showValue` | boolean | Layout | Visibility |
| `labelFontFamily`, `labelFontSize`, `labelColor` | — | Label | Label styling |
| `valueFontFamily`, `valueFontSize`, `valueColor` | — | Value | Timer value styling |
| `backgroundColor`, `borderColor` | — | Background & Border | Theme-aware overrides |

## Script Integration

```
// Start timer
start "BoilTimer"

// Stop timer
stop "BoilTimer"

// Reset timer
reset "BoilTimer"

// Restart timer (stop, reset, start)
restart "BoilTimer"

// Read current timer value (Value for CountUp = elapsed; for CountDown = remaining)
"BoilTimer" Value

// Use in condition
if "BoilTimer" Value > 00:30:00
  print "30 minutes elapsed"
endif
```

## Use Cases

- **Mash rest** — CountUp; alarm at 60 minutes
- **Boil countdown** — CountDown from 60:00; alarm at 0
- **Hop addition** — CountDown; script adds hops at thresholds
- **Process phase** — Script starts timer when phase begins; checks Value for transitions
