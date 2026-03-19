---
id: alarm
title: Alarm
sidebar_position: 7
---

# Alarm

An **Alarm** monitors a condition and becomes active when a threshold is met. It can play sound, drive a digital output, and be acknowledged by the user.

## What It Is

An Alarm is a non-device element that watches a source (for example, a Timer crossing a threshold or a monitored value). When the condition is satisfied, the alarm is **Active**. It supports sound playback, optional digital output, and operator acknowledgment from the Dashboard when user control is allowed.

## Why It Exists

- **Timer-based alerts** — “Mash rest complete,” “Boil complete”
- **Threshold alerts** — High temperature, low level when bound to a monitored value
- **Audible notification** — Play a chosen sound file, optionally looping
- **Physical annunciation** — Drive a buzzer or light via digital output

## How to Add

1. In Solution Explorer, right-click a **Workspace** or **Folder**
2. Choose **Alarm**
3. Edit to configure sound, digital output, acknowledgment, and how the alarm is triggered (often via Timer associations)

:::tip
Timers frequently reference Alarms in **alarm associations**. The Timer supplies the threshold (for example `00:60:00`); when the Timer reaches it, the linked Alarm becomes **Active**.
:::

## Native Properties

| Property | Type | Description |
|----------|------|-------------|
| `displayName` | string | Name shown in UI |
| `name` | string | Internal name (fallback) |
| `active` | boolean | Whether the alarm is currently active (condition met; script can clear to acknowledge) |
| `sound` | None \| Default \| Custom | Sound playback mode |
| `soundFile`, `soundFile2`, `soundFile3` | string | Custom sound file paths |
| `zeroFileIndex` | number | Active sound slot (0, 1, 2) for custom files |
| `loop` | boolean | Loop sound until acknowledged |
| `digitalOutputId` | string | Digital output to assert when the alarm triggers |
| `userControl` | boolean | Allow manual acknowledge from the Dashboard |
| `visibility` | Default \| Visible \| Hidden \| HiddenLocked | When to show |
| `enableHistoricalLogging` | boolean | Log active state over time |
| `loggingIntervalSeconds` | number | Logging interval |
| `maxSilenceSeconds` | number | Max silence window for logging (when applicable) |

## Common Script Properties

| Property | Notes |
|----------|--------|
| **ID** | Stable element identifier |
| **DisplayName** | User-facing name |
| **Visibility** | Show/hide behavior for the element |
| **EnableHistoricalLogging** | Log samples for trends and charts |
| **LoggingIntervalSeconds** | Seconds between samples |
| **MaxSilenceSeconds** | Logging silence handling |

## Script Properties (`alarm.ts`)

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| **Active** | bool | RW | `true` when the alarm condition is latched active; set `false` to acknowledge when allowed |
| **SoundFile** | media | RW | Media reference for playback |
| **Loop** | bool | RW | Whether sound loops until cleared |

```
// Read alarm state
"BoilComplete" Active

if "BoilComplete" Active
  "Heater" State = false
  "Pump" State = false
  print "Boil complete - shut down"
endif

"BoilComplete" Loop = true
```

Alarms driven by Timers usually flip **Active** when the Timer association fires; your scripts can still react to **Active** for sequencing and safety interlocks.

## Custom Properties (`alarm/ui-controls.json`)

The alarm template styles the **label**, the **Active** row, the **Sound** row, footer buttons, and overall chrome. There is **no** separate “value” font trio: do not use `valueFontFamily`, `valueFontSize`, or `valueColor`—they are not defined on this template.

### Layout

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showHeader` | boolean | `true` | Header bar |
| `showBackground` | boolean | `true` | Template background |
| `showLabel` | boolean | `true` | Title/label area |
| `showFooter` | boolean | `true` | Footer actions |

### Label

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `labelFontFamily` | text | `""` | Label font family |
| `labelFontSize` | number | `12` | Size (8–48) |
| `labelFontWeight` | text | `""` | Weight |
| `labelFontStyle` | text | `normal` | Style |
| `labelColor` | text | `""` | Label color (theme: `textPrimary`) |

### Active

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showActive` | boolean | `true` | Show active state row |
| `activeColor` | text | `""` | Active value text (theme: `accentGreen`) |
| `activeBg` | text | `""` | Active row background (theme: `bgTertiary`) |
| `activeLabelColor` | text | `""` | Active row label (theme: `textSecondary`) |
| `activeFont` | text | `""` | Font family |
| `activeSize` | number | `null` | Size (8–120) |
| `activeWeight` | text | `""` | Font weight |
| `activeStyle` | text | `""` | Font style |

### Sound

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showSound` | boolean | `true` | Show sound row |
| `soundColor` | text | `""` | Sound value text (theme: `accentGreen`) |
| `soundLabelColor` | text | `""` | Sound label (theme: `textSecondary`) |
| `soundFont` | text | `""` | Font family |
| `soundSize` | number | `null` | Size (8–120) |
| `soundWeight` | text | `""` | Weight |
| `soundStyle` | text | `""` | Style |

### Footer

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `buttonColor` | text | `""` | Footer button fill (theme: `bgTertiary`) |

### Background and chrome

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `backgroundColor` | theme | `bgSecondary` | Element background |
| `headerColor` | theme | `bgTertiary` | Header bar |
| `borderColor` | theme | `borderColor` | Border |
| `image` | file-upload | — | Optional image asset |

:::warning
Documentation or snippets that mention `showValue` or value-level font properties for Alarm are outdated. Use **Active** and **Sound** sections for the main status rows.
:::

## Use Cases

- **Mash rest complete** — Timer threshold; play sound; require acknowledge
- **Boil complete** — Countdown Timer at zero; shut heat; annunciate
- **Equipment fault** — Bind to monitored condition; drive output and sound
- **Operator acknowledgment** — **userControl** so the footer can clear **Active**

## Troubleshooting

| Symptom | Things to check |
|---------|------------------|
| Alarm never goes Active | Timer association threshold, enabled flag, or condition source; element not disabled |
| Sound does not play | **SoundFile** / native sound mode; file path valid; **Loop** vs one-shot behavior |
| Cannot acknowledge | **userControl**; script or logic re-triggering condition immediately |
| **Active** stuck true | Underlying condition still true; association firing every scan—fix source or hysteresis |
| No history on chart | **EnableHistoricalLogging** and **LoggingIntervalSeconds** for this alarm |
| UI looks cramped | `showActive` / `showSound` / `showFooter` toggles; font sizes (`activeSize`, `soundSize`) |
| Wrong colors | Clear custom text colors to use theme tokens; verify `headerColor`, `backgroundColor`, `borderColor`, `image` |
