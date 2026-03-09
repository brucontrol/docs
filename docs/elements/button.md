---
id: button
title: Button
sidebar_position: 4
---

# Button

A **Button** is a momentary control. When pressed, it triggers an action. It does not maintain state like a Toggle Switch.

## What It Is

A Button is a non-device element that reports **State** when pressed. Scripts typically react to the press (e.g., start a process, trigger a one-shot action) rather than reading a persistent value.

## Why It Exists

- **Manual trigger** — Start a script, reset a timer, or perform a one-shot action
- **Quick actions** — "Start Mash", "Emergency Stop", "Calibrate"
- **User-initiated processes** — Operator presses to begin a sequence

## How to Add

1. In Solution Explorer, right-click a **Workspace** or **Folder**
2. Choose **Button**
3. Edit to set display name and appearance

## Native Properties

| Property | Type | Description |
|----------|------|-------------|
| `displayName` | string | Name shown in UI (button label) |
| `name` | string | Internal name (fallback) |
| `state` | boolean | Pressed state (momentary) |
| `userControl` | boolean | Allow button press from Dashboard |
| `visibility` | Default \| Visible \| Hidden \| HiddenLocked | When to show |

## Custom Properties (from plugin-library)

From `button` widget `ui-controls.json`:

| Property | Type | Group | Description |
|----------|------|-------|-------------|
| `buttonColor` | color | Button | Background color (theme: accentPrimary) |
| `buttonFontFamily` | font-family | Button | Font for button text |
| `buttonFontSize` | number (8–120, default: 15) | Button | Font size |
| `buttonFontWeight` | font-weight | Button | Font weight (default: 600) |
| `buttonFontStyle` | font-style | Button | normal/italic |
| `buttonTextColor` | color | Button | Text color (theme: textOnAccent) |

## Script Integration

```
// Read state (true when pressed)
"StartButton" State

// Typical pattern: poll or react
if "StartButton" State
  call startMash
  "StartButton" State = false  // Reset after handling
endif
```

Scripts often use Buttons with `start`/`stop` on linked processes or one-shot logic. The Button's **State** (PascalCase in scripts) goes true when pressed; scripts should reset it to `false` if needed.

## Use Cases

- **Start Process** — Button linked to Script Element; press starts the process
- **Reset Timer** — Script resets timer when Button State is true
- **Emergency Stop** — Script monitors Button and stops all outputs
- **Calibrate** — One-shot calibration routine triggered by press
