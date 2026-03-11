---
id: tool-mode
title: Tool Mode
sidebar_position: 4
---

# Tool Mode

The dashboard has two modes: **Pan** and **Edit**. They control whether you pan/zoom the canvas or select and edit elements.

## Pan Mode

- **Pan** — Drag to move the canvas
- **Zoom** — Ctrl/Cmd + scroll to zoom toward cursor
- **Scroll** — Plain scroll (without Ctrl/Cmd) pans the canvas
- **Touch** — Single-finger pan; pinch-to-zoom with two fingers

Elements with **User Control** enabled remain interactive (buttons, toggles, sliders). Other elements do not capture pointer events so panning works over them.

**Shortcut:** **H**

## Edit Mode

- **Select** — Click an element to select it (shows selection frame)
- **Edit** — Double-click an element to open the Edit Drawer
- **Deselect** — Click empty canvas or press **Escape**
- **Drag** — Move selected element
- **Resize** — Use resize handles on the selection frame
- **Rotate** — Use the rotation handle (15° snap)
- **Layer** — Bring forward, send backward, bring to front, send to back
- **Pan** — Middle mouse button drag, or **hold Space** and drag
- **Zoom** — Ctrl/Cmd + scroll (same as Pan mode)

**Shortcut:** **V**

## Switching Modes

- Click the **Edit mode** button (pencil icon) in the canvas controls — active = Edit mode, inactive = Pan mode
- Press **H** for Pan, **V** for Edit
- **Hold Space** — Temporarily switch to Pan while in Edit mode (release to return)
- Tool mode is persisted in a cookie and restored when switching workspaces

## Adding Elements

Elements are **not** added from the dashboard. They are added from the **Solution Explorer**:

1. Right-click a **Workspace** or **Folder**
2. Choose the element type (e.g., **Button**, **Timer**, **Chart**)
3. For device elements, choose **Device** and configure interface/port in the dialog

New elements appear on the dashboard and in the tree. See [Adding Elements](../solution-explorer/add-elements) for details.

## Show Invisible

The **Show invisible** toggle (ghost icon) in the canvas controls reveals elements that are hidden. When enabled, hidden elements appear as ghosted overlays so you can select and edit them. When disabled, hidden elements are not shown.

## Related

- [Element Appearance](./element-appearance) — Edit drawer, position, size, template
- [Zoom and Pan](./zoom-pan) — Canvas navigation
- [Adding Elements](../solution-explorer/add-elements) — Add elements from Solution Explorer
