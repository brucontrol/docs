---
id: overview
title: Widgets Overview
sidebar_position: 1
---

# Widgets Overview

A **widget** is the visual representation of an element on the Dashboard. Each element (timer, button, global variable, device element, etc.) appears as a widget—a small, interactive card or control that displays data and lets you interact with it.

## Element + Template = Widget

A widget is the combination of:

1. **Element** — The underlying data and logic (e.g., a Timer with elapsed time, a Digital Output with on/off state).
2. **Template** — The visual design and behavior (HTML, CSS, JavaScript) that defines how the element is rendered.

The Dashboard fetches the element's assigned template and injects it into a sandboxed iframe. Layout (position, size, rotation) is stored per theme in **Appearance** entities.

## Template Sources

Templates come from three sources:

| Source | Description |
|--------|-------------|
| **Built-in** | System templates shipped with BruControl. Read-only; duplicate to customize. |
| **Plugin** | Installed from the Plugin Store (official or community). Core plugins are auto-installed. |
| **Custom** | Created or duplicated in the Widget Editor. Fully editable. |

## Device vs Non-Device Elements

Both use the same widget system:

| Category | Examples |
|----------|----------|
| **Device** | Digital Output, Digital Input, Analog Input, Duty Cycle, PWM Output, Counter, OW Temp, SPI Sensor, Hydrometer, Hysteresis, PID, Deadband |
| **Non-device** | Global Variable, Toggle Switch, Button, Timer, Alarm, Script Element, Chart, Profile, Generic |

Device elements connect to hardware; non-device elements do not. The widget model treats them uniformly: **element + template + appearance**.

## Related Topics

- [Templates](templates.md) — What a template is, supported types, default assignment
- [Custom Properties](custom-properties.md) — Configurable widget options (uiControls)
- [Default Templates](default-templates.md) — How defaults are chosen and overridden
- [Widget Editor](widget-editor.md) — Create and edit templates
- [Plugin Store](plugin-store.md) — Browse and install widget plugins
