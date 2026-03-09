---
id: alarm
title: Alarm
sidebar_position: 7
---

# Alarm

An **Alarm** monitors a condition and triggers when a threshold is met. It can play sound, drive a digital output, and be acknowledged by the user.

## What It Is

An Alarm is a non-device element that watches a source (e.g., a Timer's elapsed time, or a device value) and becomes **Active** when the condition is met. It supports sound playback, optional digital output, and user acknowledgment.

## Why It Exists

- **Timer-based alerts** — "Mash rest complete", "Boil complete"
- **Threshold alerts** — High temperature, low level (when bound to a monitored value)
- **Audible/visual notification** — Play sound, flash output
- **User acknowledgment** — Allow operators to silence after responding

## How to Add

1. In Solution Explorer, right-click a **Workspace** or **Folder**
2. Choose **Alarm**
3. Edit to configure sound, digital output, and thresholds (often via Timer associations)

Alarms are frequently associated with Timers: the Timer defines the threshold (e.g., 00:60:00); the Alarm triggers when the Timer reaches it.

## Native Properties

| Property | Type | Description |
|----------|------|-------------|
| `displayName` | string | Name shown in UI |
| `name` | string | Internal name (fallback) |
| `active` | boolean | Whether alarm is currently active (set by condition; script can set false to acknowledge) |
| `sound` | None \| Default \| Custom | Sound playback mode |
| `soundFile`, `soundFile2`, `soundFile3` | string | Custom sound file paths |
| `zeroFileIndex` | number | Active sound slot index (0, 1, 2) for custom sound files |
| `loop` | boolean | Loop sound until acknowledged |
| `digitalOutputId` | string | Digital output to drive when alarm triggers |
| `userControl` | boolean | Allow manual acknowledge from Dashboard |
| `visibility` | Default \| Visible \| Hidden \| HiddenLocked | When to show |
| `enableHistoricalLogging` | boolean | Log active state over time |
| `loggingIntervalSeconds` | number | Logging interval |

## Custom Properties (from plugin-library)

From `alarm` widget `ui-controls.json`:

| Property | Type | Group | Description |
|----------|------|-------|-------------|
| `showHeader`, `showBackground`, `showLabel`, `showValue` | boolean | Layout | Visibility |
| `labelFontFamily`, `labelFontSize`, `labelColor` | — | Label | Label styling |
| `valueFontFamily`, `valueFontSize`, `valueColor` | — | Value | Active state styling |
| `backgroundColor`, `borderColor` | — | Background & Border | Theme-aware overrides |

## Script Integration

```
// Read alarm state (Active is true when alarm is triggered)
"BoilComplete" Active

// Typical: react when alarm activates
if "BoilComplete" Active
  "Heater" State = false
  "Pump" State = false
  print "Boil complete - shut down"
endif
```

Alarms are often driven by Timer associations (configured in the Timer's Alarm Associations). The Alarm's `Active` property becomes true when the condition is met.

## Use Cases

- **Mash rest complete** — Timer alarm at 60 min; play sound, notify user
- **Boil complete** — Timer alarm at 0; shut off heat, play sound
- **High temp** — (When bound to monitored value) Alarm when temp exceeds threshold
- **Digital output** — Drive a buzzer or strobe via `digitalOutputId`
