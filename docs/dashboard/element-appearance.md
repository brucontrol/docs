---
id: element-appearance
title: Element Appearance
sidebar_position: 5
---

# Element Appearance

Element appearance controls how elements look and where they sit on the dashboard. Position, size, rotation, and stacking are edited directly on the canvas. Element template, visual properties, and per-instance configuration are edited in the Edit Drawer.

## Edit Drawer

The **Edit Drawer** slides in from the right when you edit an element. It opens when you:

- **Double-click** an element (in Edit mode)
- Click **Edit** on a selected element (toolbar or kebab menu)
- Right-click an element in Solution Explorer → **Edit**

### Drawer Behavior

- **Title** — Shows the element name
- **Save status** — Idle, Saving…, Saved, or Error (with tooltip for error details)
- **Close** — Click the X button, click outside the drawer, or press **Escape**; calls `onFlush` before closing
- **Loading** — Spinner replaces content while data loads
- **Auto-pan** — If the element would be covered by the drawer, the canvas automatically pans so the element stays visible

The drawer is non-modal (`aria-modal="false"`); you can interact with the canvas while it is open. `EditDrawerContext` provides `closeAllEditDrawers()` to close all drawers across Dashboard and Solution Explorer.

## Position and Size

Position and size are changed **on the canvas**, not in the Edit Drawer.

| Action | How |
|--------|-----|
| **Move** | Edit mode → drag the element |
| **Resize** | Edit mode → select element → drag one of the 8 resize handles on the selection frame |
| **Rotate** | Edit mode → select element → drag the rotation handle (15° snap) |

Layout is stored per theme in **WebAppearance** entities (X, Y, Width, Height, Z, Rotation). Values are in grid units: X/Y in columns/rows, Width in columns, Height in row units.

## Element Template

The **Element Template** controls how the element is rendered (e.g., gauge vs numeric display, button style, chart appearance). It is edited in the Edit Drawer:

1. Open the Edit Drawer for the element
2. Go to the **Appearance** tab
3. Use the **Element Template** dropdown
4. Choose a template (or "Default (Built-in)")
5. Optionally use **Reload** to refresh the template

Templates are fetched per element type via `useElementTemplates(elementType)`. Each element template runs inside an iframe (CustomElementHost) and communicates with the main app via Penpal.

### Template-Specific UI Controls

Many element templates define custom configuration properties through `uiControlsJson`. When a template has UI controls, the Appearance tab in the Edit Drawer automatically generates form fields for them. The supported format hints include:

| Format | Input Type |
|--------|------------|
| `color` | Color picker (`#RRGGBB`) |
| `color-alpha` | Color picker with alpha (`#RRGGBBAA`) |
| `element-ref` | Element reference picker |
| `font-family` | Font family selector |
| `file-path` | File picker (opens File Manager) |

### Template Metadata

Each element instance can store per-instance configuration in `templateMetadata` — a JSON string containing the values for all template-defined UI controls. This means two elements using the same template can have different colors, fonts, or other settings.

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
| elementTemplateId | Which template renders this element |
| templateMetadata | Per-instance template configuration (JSON) |

Examples: `GlobalVariableWebAppearanceViewModel`, `ChartWebAppearanceViewModel`, `DeviceElementWebAppearanceViewModel`. Appearances are updated when you drag, resize, rotate, or use layer controls on the canvas.

## Element Overlays

Elements display status overlays that communicate their state at a glance:

### Device Disconnected

When a device loses connection, all its elements show a **"Device Disconnected"** overlay. The overlay covers the element to clearly indicate that values may be stale.

### Element Disabled

When an element's port is disabled, a **"Disabled"** overlay appears with an **Enable** button. Click the button to re-enable the port without opening the Edit Drawer.

### User Locked

When the environment is locked (via Security settings) and the element does not have User Control enabled, a **lock badge** appears and the element does not accept interaction.

### Hidden / Invisible

Elements set to **Hidden** visibility are not shown on the dashboard by default. When **Show invisible** is toggled on in the canvas controls, hidden elements appear as ghosted overlays so you can select and edit them.

Elements set to **HiddenLocked** are never visible, even with Show invisible enabled.

## Element Interaction Flyouts

Element templates can trigger flyout pickers for user input. These appear as modal overlays when interacting with elements:

### NumericKeypad

A numeric input flyout with:
- Min/max value constraints
- Precision (decimal places)
- Large touch-friendly buttons
- Used for temperature setpoints, numeric variable values, duty cycle percentages

### TextInputFlyout

A text input overlay for entering string values. Used for string variables and names.

### TimeSpanPicker

A duration picker for hours, minutes, and seconds. Used for timer values, intervals, and delay settings.

### DateTimePicker

A date and time picker. Used for datetime variables and scheduled events.

### SelectionFlyout

A list-based picker for choosing from predefined options. Used for enumerations, modes, and multi-choice settings.

## Layer Controls

In **Edit mode**, when an element is selected, the ElementBarActions toolbar shows layer controls:

- **Bring to front** / **Send to back**
- **Bring forward** / **Send backward**
- **Hide** / **Show** (visibility)
- **Edit** (opens Edit Drawer)

Z-order is stored in WebAppearance; visibility is stored on the element.

## Tips

- Double-click is the fastest way to open the Edit Drawer for an element
- The drawer auto-pans the canvas so the element stays visible — no need to manually adjust your view
- Use **template-specific UI controls** in the Appearance tab to customize colors, fonts, and other visual properties without editing the template itself
- Layer controls are essential for overlapping elements — use "Bring to front" for elements that should be clickable on top

## Related

- [Tool Mode](./tool-mode) — Edit vs Pan mode
- [Canvas Layout](./canvas-layout) — Grid and layout units
- [Element Templates](../element-templates/templates) — Template structure and customization
- [Dashboard Overview](./overview) — Alarm sounds, keyboard shortcuts, and more
