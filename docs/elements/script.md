---
id: script
title: Script Element
sidebar_position: 8
---

# Script Element

A **Script Element** links a workspace element to a **Process** (script). It lets you run, stop, pause, and resume the script from the Dashboard.

## What It Is

A Script Element is a non-device element that references a Process by ID. It displays the process state and provides controls (Start, Stop, Pause) on the Dashboard. Optionally, it can bind to a process variable for display.

## Why It Exists

- **Dashboard control** — Start/stop scripts without opening the Script panel
- **Process status** — Show running, stopped, or paused state
- **Variable display** — Optionally show a process variable (e.g., current step name)
- **User-initiated automation** — Operators trigger processes from the workspace

## How to Add

1. In Solution Explorer, right-click a **Workspace** or **Folder**
2. Choose **Script Element**
3. Edit the element (double-click or context menu → Edit) to select the **Process** (script) to link
4. Optionally choose a **Variable** from that process to display

## Native Properties

| Property | Type | Description |
|----------|------|-------------|
| `displayName` | string | Name shown in UI |
| `name` | string | Internal name (fallback) |
| `processId` | string | ID of the linked Process (script) |
| `variableName` | string | Optional process variable to display |
| `userControl` | boolean | Allow run/stop/pause from Dashboard |
| `visibility` | Default \| Visible \| Hidden \| HiddenLocked | When to show |

## Custom Properties (from plugin-library)

From `script` element template `ui-controls.json`:

| Property | Type | Group | Description |
|----------|------|-------|-------------|
| `showHeader` | boolean | Layout | Show header bar |
| `showLabel` | boolean | Layout | Show variable name label |
| `showValue` | boolean | Layout | Show value |
| `showBackground` | boolean | Layout | Show element template background and border |
| `labelFontFamily`, `labelFontSize`, `labelColor` | text/number | Label | Label styling |
| `valueFontFamily`, `valueFontSize`, `valueColor` | text/number | Value | Variable value styling |
| `backgroundColor`, `borderColor` | text (color) | Background & Border | Theme-aware overrides |

## Script Integration

Script Elements are controlled from the UI (Start, Stop, Pause). From *within* a script, you control the linked **Process** by its **process name** (the script's name in the Script panel), not by the Script Element's display name.

To start/stop a process from another script:

```
// Use the process name (script name in Script panel), not the Script Element name
"MainProcess" start

// Stop
"MainProcess" stop

// Pause
"MainProcess" pause

// Resume
"MainProcess" resume
```

The Script Element displays the linked process's state and, if configured, the value of the selected variable.

## Use Cases

- **Main automation** — "Start Brew" button runs the main process
- **Emergency stop** — Stop button halts the process
- **Step indicator** — Display current step variable from the process
- **Pause/resume** — Pause for manual steps, resume when ready
