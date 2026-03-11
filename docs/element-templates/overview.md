---
id: overview
title: Element Templates Overview
sidebar_position: 1
---

# Element Templates Overview

An **element template** defines the visual representation of an element on the Dashboard. Each element (timer, button, global variable, device element, etc.) is rendered using a template—a small, interactive card or control that displays data and lets you interact with it.

## Element + Template = Visual

The dashboard display is the combination of:

1. **Element** — The underlying data and logic (e.g., a Timer with elapsed time, a Digital Output with on/off state).
2. **Template** — The visual design and behavior (HTML, CSS, JavaScript) that defines how the element is rendered.

The Dashboard fetches the element's assigned template and injects it into a sandboxed iframe. Layout (position, size, rotation) is stored per theme in **Appearance** entities.

## Template Sources

Templates come from three sources:

| Source | Description |
|--------|-------------|
| **Built-in** | System templates shipped with BruControl. Read-only; duplicate to customize. |
| **Plugin** | Installed from the Plugin Store (official or community). Core plugins are auto-installed. |
| **Custom** | Created or duplicated in the Element Template Editor. Fully editable. |

## Device vs Non-Device Elements

Both use the same element template system:

| Category | Examples |
|----------|----------|
| **Device** | Digital Output, Digital Input, Analog Input, Duty Cycle, PWM Output, Counter, OW Temp, SPI Sensor, Hydrometer, Hysteresis, PID, Deadband |
| **Non-device** | Global Variable, Toggle Switch, Button, Timer, Alarm, Script Element, Chart, Profile, Generic |

Device elements connect to hardware; non-device elements do not. The element template model treats them uniformly: **element + template + appearance**.

## Related Topics

- [Templates](templates.md) — What a template is, supported types, default assignment
- [Custom Properties](custom-properties.md) — Configurable element template options (uiControls)
- [Default Templates](default-templates.md) — How defaults are chosen and overridden
- [Element Template Editor](element-template-editor.md) — Create and edit templates
- [Plugin Store](plugin-store.md) — Browse and install element template plugins
