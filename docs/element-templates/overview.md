---
id: overview
title: Element Templates Overview
sidebar_position: 1
---

# Element Templates Overview

An **element template** defines the visual representation of an element on the Dashboard. Each element (timer, button, global variable, device element, etc.) is rendered using a template—a small, interactive card or control that displays data and lets you interact with it.

Whether you're a user picking a template from the Plugin Store, or a developer building your own, the element template system is how BruControl connects raw element data to a visual widget on the Dashboard.

## Element + Template = Visual

The dashboard display is the combination of:

1. **Element** — The underlying data and logic (e.g., a Timer with elapsed time, a Digital Output with on/off state).
2. **Template** — The visual design and behavior (HTML, CSS, JavaScript) that defines how the element is rendered.

## Data Flow

The data flow from element to screen works like this:

1. **Element model** — The backend maintains the element's state (value, properties, enabled/disabled, etc.)
2. **Flat data object** — The element's properties are flattened into a single JavaScript object (no nesting)
3. **Iframe + SDK** — The compiled template HTML is loaded in a sandboxed iframe. The Element Template SDK (injected automatically) passes data to the template via **Penpal v7** (a lightweight iframe communication library)
4. **Template renders** — Your template's `onData` callback receives the flat data object and renders the UI

```
Element Model → Flat Data Object → Penpal v7 → iframe SDK → Template renders
```

The host also sends **theme colors** (via `onTheme`) so templates can adapt to the user's color theme.

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

:::note Generic elements
Generic elements have no native properties — all properties are custom (defined via `ui-controls.json` or added by the user). This makes `generic` the most flexible element type for template authors, since every property key in ui-controls becomes a user-configurable setting with no risk of shadowing live data.
:::

## Related Topics

- [Element Template Developer Guide](element-template-developer-guide.md) — **Complete reference for plugin authors** (SDK, manifest, ui-controls, examples)
- [Templates](templates.md) — What a template is, supported types, default assignment
- [Custom Properties](custom-properties.md) — Configurable element template options (uiControls)
- [Default Templates](default-templates.md) — How defaults are chosen and overridden
- [Element Template Editor](element-template-editor.md) — Create and edit templates
- [Plugin Store](plugin-store.md) — Browse and install element template plugins
