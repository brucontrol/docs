---
id: script
title: Script Element
sidebar_position: 8
---

# Script Element

A **Script Element** links a workspace element to a **Process** (script). It lets you run, stop, pause, and resume that process from the Dashboard while showing status and optional variable display.

## What It Is

A Script Element is a non-device element that references a Process by ID. It surfaces **Start**, **Stop**, **Pause**, and **Resume** (per configuration) and shows the process **state** and optional bound variable text. The visual “value” row is styled with **display**\* properties in `ui-controls.json`, not with a `valueFont*` prefix.

## Why It Exists

- **Dashboard control** — Run automation without opening the Script panel
- **Process status** — Show Running, Paused, or Stopped at a glance
- **Variable readout** — Display a selected process variable (for example, current step)
- **Operator workflows** — One-tap start/stop for batch routines

## How to Add

1. In Solution Explorer, right-click a **Workspace** or **Folder**
2. Choose **Script Element**
3. Edit the element to pick the **Process** to link
4. Optionally select a **Variable** from that process to show in the value area

:::tip
Commands issued from *other* scripts target the **process name** (the script’s name in the Script panel), not necessarily the Script Element’s display name. The Script Element is the Dashboard face; the Process is what the runtime executes.
:::

## Native Properties

| Property | Type | Description |
|----------|------|-------------|
| `displayName` | string | Name shown in UI |
| `name` | string | Internal name (fallback) |
| `processId` | string | Linked Process ID |
| `variableName` | string | Optional process variable to display |
| `userControl` | boolean | Allow run/stop/pause from Dashboard |
| `visibility` | Default \| Visible \| Hidden \| HiddenLocked | When to show |
| `enableHistoricalLogging` | boolean | Log state over time when supported |
| `loggingIntervalSeconds` | number | Logging interval |
| `maxSilenceSeconds` | number | Logging silence handling when applicable |

## Common Script Properties

| Property | Notes |
|----------|--------|
| **ID** | Element identifier |
| **DisplayName** | Shown name |
| **Visibility** | UI visibility rules |
| **EnableHistoricalLogging** | Historical samples |
| **LoggingIntervalSeconds** | Sample period |
| **MaxSilenceSeconds** | Silence window for logging |

## Process Script Properties (`process.ts`)

Scripts and conditions can inspect the linked **Process** (not the Script Element’s decorative ID) for execution state:

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| **state** | string | RO | `Running`, `Paused`, or `Stopped` |
| **currentline** | number | RO | Current line index in the process |

:::info
Use the **process** name for `start`, `stop`, `pause`, and `resume` commands. Use **state** / **currentline** when you need execution metadata inside logic.
:::

## Controlling the Process from Scripts

```
// Process name = script name in Script panel
"MainProcess" start
"MainProcess" stop
"MainProcess" pause
"MainProcess" resume
```

The Script Element reflects the same process’s **state** and optional variable value on the Dashboard.

## Custom Properties (`script/ui-controls.json`)

### Layout

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showHeader` | boolean | `true` | Header bar |
| `showLabel` | boolean | `true` | Variable / label row |
| `showValue` | boolean | `true` | Display row for the bound value |
| `showBackground` | boolean | `true` | Background and border |

### Label

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `labelFontFamily` | text | `""` | Label font family |
| `labelFontSize` | number | `11` | Size (8–24) |
| `labelFontWeight` | text | `""` | Weight |
| `labelFontStyle` | text | `normal` | Style |
| `labelColor` | text | `""` | Color (theme: `textPrimary`) |

### Display (main value text)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `displayColor` | text | `""` | Value text color (theme: `accentGreen`) |
| `displayFontFamily` | text | `""` | Font family |
| `displayFontSize` | number | `26` | Size (10–120) |
| `displayFontWeight` | text | `""` | Weight |
| `displayFontStyle` | text | `normal` | Style |

### Background and chrome

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `backgroundColor` | theme | `bgSecondary` | Element background |
| `headerColor` | theme | `bgTertiary` | Header bar |
| `borderColor` | theme | `borderColor` | Border |
| `image` | file-upload | — | Optional image |

:::warning
The Script template does **not** expose `valueFontFamily`, `valueFontSize`, or `valueColor`. Use **displayFontFamily**, **displayFontSize**, **displayColor**, and related **display**\* fields for the large value row.
:::

## Use Cases

- **Main brew sequence** — Start button for the primary process
- **Emergency stop** — Stop halts the linked process immediately
- **Step name** — Bind a string variable that tracks the recipe step
- **Pause for manual tasks** — Pause until the operator taps Resume

## Troubleshooting

| Symptom | Things to check |
|---------|------------------|
| Start does nothing | **processId** points at the correct Process; process not already Running; permissions |
| Wrong script runs | Command uses **process name**, not element display name |
| Blank value row | **variableName** set; variable exists in process; **showValue** true |
| Label/value too small or large | `labelFontSize` vs `displayFontSize` (10–120) |
| Colors ignore theme | Clear `displayColor` / `labelColor` to inherit; check dark/light theme |
| **state** always Stopped | Process never started; name typo in script command |
| **currentline** unexpected | Breakpoints, errors, or process edited while running |
| Header/image issues | `headerColor` and `image` asset; **showHeader** toggle |
