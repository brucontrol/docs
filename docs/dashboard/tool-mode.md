---
id: tool-mode
title: Tool Mode
sidebar_position: 4
---

# Tool Mode

The dashboard has two modes: **Pan** and **Edit**. They control whether you navigate the canvas or select and manipulate elements. The current mode is persisted in a browser cookie and restored when you return.

## Pan Mode

Pan mode is the default and is designed for day-to-day monitoring and interaction:

- **Pan** — Drag to move the canvas
- **Zoom** — Ctrl/Cmd + scroll to zoom toward cursor
- **Scroll** — Plain scroll (without Ctrl/Cmd) pans the canvas
- **Touch** — Single-finger pan; pinch-to-zoom with two fingers

Elements with **User Control** enabled remain interactive (buttons, toggles, sliders). Other elements do not capture pointer events so panning works over them.

**Shortcut:** **H**

## Edit Mode

Edit mode is for arranging, resizing, and configuring elements:

- **Select** — Click an element to select it (shows the selection frame with handles)
- **Edit** — Double-click an element to open the Edit Drawer
- **Deselect** — Click empty canvas or press **Escape**
- **Drag** — Move selected element by dragging it
- **Resize** — Drag one of the 8 resize handles on the selection frame
- **Rotate** — Drag the rotation handle (snaps to **15° increments**)
- **Layer** — Use the ElementBarActions toolbar to change stacking order
- **Pan** — Middle mouse button drag, or **hold Space** and drag
- **Zoom** — Ctrl/Cmd + scroll (same as Pan mode)

**Shortcut:** **V**

## ElementBarActions Toolbar

When an element is selected in Edit mode, a toolbar appears with quick actions:

| Button | Action |
|--------|--------|
| **Bring to front** | Move the element to the highest Z-layer |
| **Send to back** | Move the element to the lowest Z-layer |
| **Bring forward** | Move one Z-layer up |
| **Send backward** | Move one Z-layer down |
| **Hide / Show** | Toggle element visibility (Hidden elements appear as ghosts when "Show invisible" is on) |
| **Edit** | Open the Edit Drawer for this element |

Buttons are disabled when the action is not available (e.g., "Bring to front" when the element is already at the top).

## Switching Modes

- Click the **Edit mode** button (pencil icon) in the canvas controls — active = Edit mode, inactive = Pan mode
- Press **H** for Pan, **V** for Edit
- **Hold Space** — Temporarily switch to Pan while in Edit mode (release to return)
- Tool mode is persisted in a browser cookie and restored when switching workspaces

## Selection Frame

When you select an element in Edit mode, a **SelectionFrame** appears around it with:

- **8 resize handles** — One at each corner and one at each edge midpoint. Handles are zoom-aware (they maintain a consistent visual size regardless of zoom level).
- **Rotation handle** — A circular handle above the element. Drag to rotate; snaps to **15° increments** for precise alignment.

## Adding Elements

Elements are **not** added from the dashboard. They are added from the **Solution Explorer**:

1. Right-click a **Workspace** or **Folder**
2. Choose the element type (e.g., **Button**, **Timer**, **Chart**)
3. For device elements, choose **Device** and configure interface/port in the dialog

New elements appear on the dashboard at the center of the current viewport and in the tree. See [Adding Elements](../solution-explorer/add-elements) for details.

## Show Invisible

The **Show invisible** toggle (eye icon) in the canvas controls reveals elements that are hidden. When enabled, hidden elements appear as ghosted overlays so you can select and edit them. When disabled, hidden elements are not shown.

:::info
Elements with **HiddenLocked** visibility are never shown, even with Show invisible enabled. This is intentional for elements that should never appear on the dashboard.
:::

## Touch Device Behavior

On touch devices, the dashboard applies a `touch-mode` class to element hosts which adjusts interaction behavior:

- In Pan mode, single-finger drag pans the canvas
- In Edit mode, touching empty canvas pans; touching an element selects it
- Use the **⋮ button** on tree items for context menus (replaces right-click)
- Drag handles are slightly larger for easier touch targeting

## Tips

- Stay in **Pan mode** for normal use — you can still press buttons, flip switches, and interact with elements that have User Control enabled
- Switch to **Edit mode** only when you need to rearrange, resize, or rotate elements
- Use **Space + drag** for quick panning without switching modes
- Use the **rotation handle** with 15° snap to align elements precisely (0°, 15°, 30°, 45°, etc.)
- Press **Escape** to quickly deselect an element after editing

## Related

- [Element Appearance](./element-appearance) — Edit drawer, position, size, template
- [Zoom and Pan](./zoom-pan) — Canvas navigation
- [Adding Elements](../solution-explorer/add-elements) — Add elements from Solution Explorer
