---
id: tool-mode
title: Tool Mode
sidebar_position: 4
---

# Tool Mode

The dashboard has two tool modes: **Hand** and **Select**. They control whether you pan/zoom the canvas or edit widgets.

## Hand Mode

- **Pan** — Drag to move the canvas
- **Zoom** — Ctrl/Cmd + scroll to zoom toward cursor
- **Scroll** — Plain scroll (without Ctrl/Cmd) pans the canvas
- **Touch** — Single-finger pan; pinch-to-zoom with two fingers

Widgets with **User Control** enabled remain interactive (buttons, toggles, sliders). Other widgets do not capture pointer events so panning works over them.

**Shortcut:** **H**

## Select Mode

- **Select** — Click a widget to select it
- **Deselect** — Click empty canvas or press **Escape**
- **Drag** — Move selected widget
- **Resize** — Use resize handles on the SelectionFrame
- **Rotate** — Use the rotation handle (15° snap)
- **Layer** — Bring forward, send backward, bring to front, send to back
- **Edit** — Open Edit Drawer via header bar or kebab menu
- **Pan** — Middle mouse button drag
- **Zoom** — Ctrl/Cmd + scroll (same as Hand mode)

**Shortcut:** **V**

## Switching Modes

- Click the **Hand** or **Select** button in the canvas controls (header bar)
- Press **H** for Hand, **V** for Select
- Tool mode is persisted in a cookie and restored when switching workspaces

## Adding Elements

Elements are **not** added from the dashboard. They are added from the **Solution Explorer**:

1. Right-click a **Workspace** or **Folder**
2. Choose the element type (e.g., **Button**, **Timer**, **Chart**)
3. For device elements, choose **Device** and configure interface/port in the dialog

New elements appear on the dashboard and in the tree. See [Adding Elements](../solution-explorer/add-elements) for details.

## Show Invisible

The **Show invisible** toggle (ghost icon) in the canvas controls reveals widgets that are hidden. When enabled, hidden widgets appear as ghosted overlays so you can select and edit them. When disabled, hidden widgets are not shown.

## Related

- [Element Appearance](./element-appearance) — Edit drawer, position, size, template
- [Zoom and Pan](./zoom-pan) — Canvas navigation
- [Adding Elements](../solution-explorer/add-elements) — Add elements from Solution Explorer
