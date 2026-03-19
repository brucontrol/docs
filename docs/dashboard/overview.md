---
id: overview
title: Dashboard Overview
sidebar_position: 1
---

# Dashboard Overview

The **Dashboard** is the main canvas where workspace elements appear. Each workspace has its own dashboard, and you switch between them using the workspace tabs. The dashboard provides real-time monitoring, interactive controls, and a flexible layout system for arranging your elements exactly how you want them.

## What You See

- **Elements** — Each element (button, timer, chart, device control, alarm, etc.) renders on the canvas as an interactive widget hosted in an iframe
- **Tabs** — When you have multiple workspaces, tabs appear above the dashboard; click to switch
- **Canvas** — A large, pannable, zoomable surface where elements are arranged freely
- **Canvas Controls** — A toolbar with mode switches, zoom controls, and view options

## Canvas Controls Toolbar

The **CanvasControls** toolbar provides quick access to all dashboard actions. It can appear as a floating bar on the canvas or integrated into the header.

| Control | Icon | Purpose |
|---------|------|---------|
| **Edit mode** | Pencil | Toggle between Edit and Pan mode. Shortcuts: **V** (Edit), **H** (Pan) |
| **Show invisible** | Eye | Toggle visibility of hidden elements |
| **Zoom out** | − | Decrease zoom (disabled at 10%) |
| **Zoom %** | Percentage | Click to reset zoom to 100% |
| **Zoom in** | + | Increase zoom (disabled at 200%) |
| **Home** | Home | Reset pan position to the initial view |
| **Fit to view** | Maximize | Zoom and pan to fit all elements in the viewport |
| **Fullscreen** | Maximize/Minimize | Toggle fullscreen mode (when available) |

## Modes

The dashboard has two modes that control how you interact with the canvas:

- **Pan mode (H)** — Drag to move the canvas, scroll to pan. Elements with **User Control** remain interactive. This is the default mode on first load.
- **Edit mode (V)** — Click elements to select them, double-click to edit. Drag to move elements, use handles to resize and rotate. Hold **Space** to temporarily pan.

Press **Escape** to deselect the current element in Edit mode.

See [Tool Mode](./tool-mode) for full details.

## Element Rendering

Each element on the dashboard is rendered inside a **CustomElementHost** — an iframe that loads the element's template. Communication between the dashboard and the iframe uses Penpal (v7) for secure, structured message passing. This means element templates run in isolation and cannot interfere with each other or the main application.

## Element Overlays

Elements display contextual overlays to communicate their state:

| Overlay | When It Appears | What It Shows |
|---------|-----------------|---------------|
| **Device Disconnected** | The parent device has lost connection | "Device Disconnected" overlay covering the element |
| **Element Disabled** | The element's port is disabled | "Disabled" overlay with an **Enable** button to re-enable |
| **User Locked** | The environment is locked and the element does not allow user control | Lock badge preventing interaction |
| **Hidden / Invisible** | The element visibility is set to Hidden | Ghost overlay (only visible when "Show invisible" is enabled) |

:::info HiddenLocked Visibility
Elements with visibility set to **HiddenLocked** are invisible even when "Show invisible" is toggled on. This is useful for elements that should never be visible on the dashboard (e.g., behind-the-scenes variables).
:::

## Element Selection and Actions

When you select an element in Edit mode, the **ElementBarActions** toolbar appears above the canvas:

| Action | Description |
|--------|-------------|
| **Bring to front** | Move to the highest Z-layer |
| **Send to back** | Move to the lowest Z-layer |
| **Bring forward** | Move one Z-layer up |
| **Send backward** | Move one Z-layer down |
| **Hide / Show** | Toggle element visibility |
| **Edit** | Open the Edit Drawer for this element |

## Element Interaction Flyouts

When interacting with element templates, several flyout pickers may appear depending on the element type:

| Flyout | Use |
|--------|-----|
| **NumericKeypad** | Enter numeric values with min/max/precision constraints. Appears for temperature setpoints, timer values, variable inputs. |
| **TextInputFlyout** | Enter text values (strings, names). |
| **TimeSpanPicker** | Pick a time duration (hours, minutes, seconds). Used for timer settings and intervals. |
| **DateTimePicker** | Pick a date and time. Used for datetime variables and scheduling. |
| **SelectionFlyout** | Choose from a list of predefined options. Used for enumerations and mode selection. |

These flyouts are triggered by element templates through the Penpal communication bridge and appear as modal overlays on top of the dashboard.

## Alarm Sound Player

When an alarm element becomes active and has a configured sound file, BruControl plays the audio on the dashboard. The alarm sound player:

- Plays the configured sound file (from `/uploads/` or a URL)
- Supports **looping** for continuous alarms
- Falls back to a **default alarm sound** if the configured file is missing or fails to load
- Shows an **"Alarm audio is blocked"** banner if the browser blocks autoplay, with an **Enable Audio** button

:::tip
Modern browsers block audio autoplay until the user interacts with the page. If you see the autoplay banner, click **Enable Audio** once — after that, alarm sounds will play automatically for the rest of the session.
:::

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **H** | Switch to Pan mode |
| **V** | Switch to Edit mode |
| **Escape** | Deselect current element |
| **Space** (hold) | Temporarily pan while in Edit mode (release to return to Edit) |
| **Ctrl/Cmd + Scroll** | Zoom toward cursor |

## Adding Elements

Elements are **not** added directly from the dashboard canvas. They are added from the **Solution Explorer**:

1. Right-click a **Workspace** or **Folder** in the tree
2. Choose the element type
3. The element appears on the Dashboard at the center of the current viewport

See [Adding Elements](../solution-explorer/add-elements) for the full element creation guide.

## Tips

- Use **Pan mode** as your default for day-to-day monitoring — you can still interact with buttons and switches
- Switch to **Edit mode** only when rearranging your layout
- Use **Fit to view** after adding several elements to see everything at once
- Use **Home** to quickly return to the initial canvas position
- Use the **Show invisible** toggle to find hidden elements you need to edit
- On touch devices, drag on empty canvas to pan; use the ⋮ button for context menus

## Related

- [Workspaces](../application/workspaces) — Create workspaces and add elements
- [Tool Mode](./tool-mode) — Edit vs Pan mode details
- [Element Appearance](./element-appearance) — Position, size, element template
- [Canvas Layout](./canvas-layout) — Grid system and viewport
- [Zoom and Pan](./zoom-pan) — Navigation and persistence
