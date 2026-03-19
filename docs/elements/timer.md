---
id: timer
title: Timer
sidebar_position: 6
---

# Timer

A **Timer** counts up or down. It can run automatically, be controlled by scripts, and work with alarms at configured thresholds.

## What It Is

A Timer is a non-device element that tracks elapsed or remaining time. It supports **CountUp** (stopwatch) and **CountDown** modes. You can drive it from the Dashboard (when user control is enabled) or from scripts using **start**, **stop**, **reset**, and **restart**.

## Why It Exists

- **Mash timer** — Count up during mash; pair with an alarm at rest time
- **Boil timer** — Count down from a set duration; alarm at zero
- **Process timing** — Scripts start, stop, and reset based on process state
- **Visible countdown** — Operators see remaining time on the Dashboard

## How to Add

1. In Solution Explorer, right-click a **Workspace** or **Folder**
2. Choose **Timer**
3. Edit the element to set type (CountUp/CountDown), reset value, format, init-running behavior, and alarm associations as needed

:::tip
Alarm associations are often configured on the Timer so a linked **Alarm** fires when a threshold is reached. The Timer element’s UI can show the running value, type, and running state in separate styled rows—toggle those rows under **Layout** and the Timer/Type/Running sections in custom properties.
:::

## Native Properties

| Property | Type | Description |
|----------|------|-------------|
| `displayName` | string | Name shown in UI |
| `name` | string | Internal name (fallback) |
| `type` | CountUp \| CountDown | Count direction |
| `resetValue` | string | TimeSpan for countdown start (e.g., `00:60:00`) |
| `format` | string | Display format for elapsed or remaining time |
| `value` | TimeSpan | Current value; scripts use **Value** (see below) |
| `isRunning` | boolean | Whether the timer is running at runtime |
| `initRunning` | boolean | Start the timer when the workspace initializes |
| `alarms` | array | Alarm associations: `{ alarmID, enabled, threshold }` |
| `userControl` | boolean | Allow start/stop/reset from the Dashboard |
| `visibility` | Default \| Visible \| Hidden \| HiddenLocked | When to show |
| `enableHistoricalLogging` | boolean | Log value over time |
| `loggingIntervalSeconds` | number | Interval for historical logging |
| `maxSilenceSeconds` | number | Max silence window for logging (when applicable) |

## Common Script Properties

These identifiers are available consistently across many elements when referenced from scripts or conditions:

| Property | Notes |
|----------|--------|
| **ID** | Stable element identifier |
| **DisplayName** | User-facing name |
| **Visibility** | Whether the element is shown or hidden per visibility rules |
| **EnableHistoricalLogging** | Whether samples are logged for charts and history |
| **LoggingIntervalSeconds** | Seconds between logged samples |
| **MaxSilenceSeconds** | Related logging silence handling |

## Script Properties and Commands

From the timer script surface (`timer.ts`):

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| **Value** | time | RW | Current time as `hh:mm:ss` (elapsed for CountUp, remaining for CountDown) |
| **Type** | string | RW | `CountUp` or `CountDown` |
| **ResetValue** | time | RW | Value used when resetting (time format) |

**Commands:** `start`, `stop`, `reset`, `restart` (restart = stop, reset, start).

```
start "BoilTimer"
stop "BoilTimer"
reset "BoilTimer"
restart "BoilTimer"

"BoilTimer" Value
"BoilTimer" Type = CountDown
"BoilTimer" ResetValue = 00:60:00

if "BoilTimer" Value > 00:30:00
  print "30 minutes elapsed"
endif
```

## Custom Properties (`timer/ui-controls.json`)

Custom properties are grouped in the designer to match the template. Empty string often means “use theme default.” Numeric ranges are enforced in the UI where noted.

### Layout

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showHeader` | boolean | `true` | Show the header bar |
| `showBackground` | boolean | `true` | Show template background |
| `showLabel` | boolean | `true` | Show the label row |
| `showValue` | boolean | `true` | Show timer value row (“Show timer value row”) |
| `showDetails` | boolean | `true` | Show detail rows (type, running, etc.) |
| `showFooter` | boolean | `true` | Show footer with controls |

### Label

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `labelFontFamily` | text | `""` | Label font family |
| `labelFontSize` | number | `12` | Size (8–48) |
| `labelFontWeight` | text | `""` | Label weight |
| `labelFontStyle` | text | `normal` | Label style |
| `labelColor` | text | `""` | Label color (theme: `textPrimary`) |

### Timer (value row)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showTimer` | boolean | `true` | Show the timer value section |
| `timerColor` | text | `""` | Main timer text (theme: `accentGreen`) |
| `timerBg` | text | `""` | Timer row background (theme: `bgTertiary`) |
| `timerLabelColor` | text | `""` | Caption/label for timer (theme: `textSecondary`) |
| `timerFont` | text | `""` | Font family |
| `timerSize` | number | `null` | Font size (8–120) |
| `timerWeight` | text | `""` | Font weight |
| `timerStyle` | text | `""` | Font style |

### Type

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showType` | boolean | `true` | Show CountUp/CountDown row |
| `typeColor` | text | `""` | Type value color (theme: `accentGreen`) |
| `typeLabelColor` | text | `""` | Type label color (theme: `textSecondary`) |
| `typeFont` | text | `""` | Font family |
| `typeSize` | number | `null` | Size (8–120) |
| `typeWeight` | text | `""` | Weight |
| `typeStyle` | text | `""` | Style |

### Running

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showRunning` | boolean | `true` | Show running state row |
| `runningColor` | text | `""` | Running value color (theme: `accentGreen`) |
| `runningLabelColor` | text | `""` | Running label color (theme: `textSecondary`) |
| `runningFont` | text | `""` | Font family |
| `runningSize` | number | `null` | Size (8–120) |
| `runningWeight` | text | `""` | Weight |
| `runningStyle` | text | `""` | Style |

### Background and chrome

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `backgroundColor` | theme | `bgSecondary` | Element body background |
| `headerColor` | theme | `bgTertiary` | Header bar fill |
| `borderColor` | theme | `borderColor` | Border color |
| `image` | file-upload | — | Optional header or decorative image asset |

### Footer

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `footerButtonColor` | text | `""` | Footer button accent (theme: `accentPrimary`) |
| `buttonFontFamily` | text | `""` | Button font family |
| `buttonFontSize` | number | `13` | Button text size (8–48) |
| `buttonFontWeight` | text | `""` | Button weight |
| `buttonFontStyle` | text | `normal` | Button style |
| `buttonTextColor` | text | `""` | Button text (theme: `textPrimary`) |

:::info
The timer template does **not** define `valueFontFamily`, `valueFontSize`, or `valueColor`. Timer digits use the **timer**\* and related properties above.
:::

## Use Cases

- **Mash rest** — CountUp with an alarm at the target rest duration
- **Boil countdown** — CountDown from 60:00; script or alarm handles completion
- **Hop additions** — CountDown with script checks on **Value**
- **Phase timing** — `start` when a phase begins; `reset`/`restart` on transitions

## Troubleshooting

| Symptom | Things to check |
|---------|------------------|
| Timer does not start from Dashboard | **userControl** enabled; element **Visibility** not hidden locked |
| **Value** does not change in script | Use the element’s script name; ensure `start` was issued; CountDown needs a valid **ResetValue** |
| Wrong direction (up vs down) | **Type** in script or native type setting: `CountUp` vs `CountDown` |
| Alarm never fires | Threshold and association on the **Timer** or **Alarm** configuration; alarm enabled |
| Chart shows no history | **EnableHistoricalLogging** on the timer (or bound element) and **LoggingIntervalSeconds** |
| Huge or tiny timer text | `timerSize` / `typeSize` / `runningSize` (null uses theme defaults) |
| Header or image looks wrong | `headerColor` and `image` asset path; clear custom colors to fall back to theme |
