---
id: element-appearance
title: Element Appearance
sidebar_position: 5
---

# Element Appearance

Element appearance controls how widgets look and where they sit on the dashboard. Position, size, rotation, and stacking are edited on the canvas. Widget template and web-specific properties are edited in the Edit Drawer.

## Edit Drawer

The **Edit Drawer** slides in from the right when you edit an element. It opens when you:

- Click **Edit** on a selected widget (header bar or kebab menu)
- Double-click a widget header (in Select mode)
- Right-click an element in Solution Explorer → **Edit**

### Drawer Behavior

- **Title** — Shows the element name
- **Save status** — Idle, Saving…, Saved, or Error (with tooltip for error details)
- **Close** — Button or **Escape** key; calls `onFlush` before closing
- **Loading** — Spinner replaces content while data loads

The drawer is non-modal (`aria-modal="false"`); you can interact with the canvas while it is open. `EditDrawerContext` provides `closeAllEditDrawers()` to close all drawers across Dashboard and Solution Explorer.

## Position and Size

Position and size are changed **on the canvas**, not in the Edit Drawer.

| Action | How |
|--------|-----|
| **Move** | Select mode → drag the widget |
| **Resize** | Select mode → select widget → drag resize handles on the SelectionFrame |
| **Rotate** | Select mode → select widget → drag the rotation handle (15° snap) |

Layout is stored per theme in **WebAppearance** entities (X, Y, Width, Height, Z, Rotation). Values are in grid units: X/Y in columns/rows, Width in columns, Height in row units.

## Widget Template

The **Widget Template** controls how the widget is rendered (e.g., gauge vs numeric, button style). It is edited in the Edit Drawer:

1. Open the Edit Drawer for the element
2. Go to the **Appearance** tab
3. Use the **Widget Template** dropdown
4. Choose a template (or "Default (Built-in)")
5. Optionally use **Reload** to refresh the template

Templates are fetched per widget type via `useWidgetTemplates(widgetType)`. The Appearance tab also shows template-specific UI controls (e.g., font, colors) when defined in the template's `uiControlsJson`.

## Web Appearance

Each element type has a corresponding WebAppearance entity per theme (keyed by `themeId`):

| Field | Purpose |
|-------|---------|
| X | Grid x position |
| Y | Grid y position |
| Width | Width in columns |
| Height | Height in row units |
| Z | Stacking order (higher = on top) |
| Rotation | Rotation in degrees |

Examples: `GlobalVariableWebAppearanceViewModel`, `ChartWebAppearanceViewModel`, `DeviceElementWebAppearanceViewModel`. Appearances are updated when you drag, resize, rotate, or use layer controls (Bring forward, Send backward, etc.) on the canvas.

## Layer Controls

In **Select mode**, when a widget is selected, the header bar or kebab menu shows layer controls:

- **Bring to front** / **Send to back**
- **Bring forward** / **Send backward**
- **Hide** / **Show** (visibility)
- **Edit** (opens Edit Drawer)

Z-order is stored in WebAppearance; visibility is stored on the element.

## Related

- [Tool Mode](./tool-mode) — Select vs Hand mode
- [Canvas Layout](./canvas-layout) — Grid and layout units
- [Widget Templates](../widgets/templates) — Template structure and customization
