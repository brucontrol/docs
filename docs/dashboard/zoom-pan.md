---
id: zoom-pan
title: Zoom and Pan
sidebar_position: 3
---

# Zoom and Pan

The dashboard canvas supports zoom and pan for navigating large layouts. Zoom and pan state are persisted per workspace per theme, so your view is restored when you switch workspaces or return to the application.

## Zoom

| Property | Value |
|----------|-------|
| **Range** | 10% to 200% (0.1 to 2.0) |
| **Mouse** | Ctrl/Cmd + scroll — zooms toward cursor position (works in both modes) |
| **Touch** | Pinch with two fingers (works in both modes) |
| **Buttons** | Zoom in (+), Zoom out (−), Reset (100%), Fit to view |

Zoom in/out buttons are disabled at the 200% and 10% limits respectively. **Fit to view** calculates a zoom level that fits all elements in the viewport (capped at 100%) and centers the content.

## Pan

| Input | Behavior |
|-------|----------|
| **Pan mode** | Drag with left mouse button |
| **Pan mode** | Scroll wheel (without Ctrl/Cmd) |
| **Edit mode** | Middle mouse button drag, or hold **Space** and drag |
| **Touch** | Single-finger drag (Pan mode, or Edit mode when touching empty canvas) |

Initial pan positions the content area in view with a small offset so elements near the origin are visible.

## Canvas Controls

The **CanvasControls** component provides all zoom and pan controls. It has two layout variants:

- **Floating** — Appears as an overlay bar on the canvas (default)
- **Header** — Integrated into the application header bar

### Control Reference

| Control | Icon | Purpose | Notes |
|---------|------|---------|-------|
| Edit mode | Pencil | Toggle Edit/Pan mode | Active = Edit, inactive = Pan. **H** = Pan, **V** = Edit |
| Show invisible | Eye/EyeOff | Toggle visibility of hidden elements | |
| Zoom out | − | Decrease zoom | Disabled at 10% |
| Zoom % | Percentage text | Reset to 100% on click | |
| Zoom in | + | Increase zoom | Disabled at 200% |
| Home | Home | Reset pan/zoom to initial position | Returns to the default view |
| Fit to view | Maximize2 | Zoom to fit all elements | Caps at 100% zoom |
| Fullscreen | Maximize/Minimize | Toggle fullscreen mode | Only shown when supported |

## Persistence

Zoom level, pan position (`canvasX`, `canvasY`), and tool mode are saved to the workspace appearance when they change. Saves are **debounced at 500 ms** for zoom and pan to avoid excessive API calls.

Tool mode (Pan or Edit) is also persisted in a **browser cookie** so it is restored across sessions and across workspaces. The cookie stores layout preferences including tool mode, explorer visibility, and script panel visibility.

## Tips

- Use **Ctrl/Cmd + scroll** for precision zooming — it zooms toward your cursor position
- **Fit to view** is useful after adding many elements to see the whole layout at once
- **Home** returns to the initial view — useful when you've panned far from your elements
- On touch devices, pinch-to-zoom works everywhere; single-finger drag pans in Pan mode

## Related

- [Tool Mode](./tool-mode) — Edit vs Pan
- [Canvas Layout](./canvas-layout) — Grid and viewport
