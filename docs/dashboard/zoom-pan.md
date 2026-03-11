---
id: zoom-pan
title: Zoom and Pan
sidebar_position: 3
---

# Zoom and Pan

The dashboard canvas supports zoom and pan for navigating large layouts. Zoom and pan state are persisted per workspace and restored when you switch workspaces.

## Zoom

| Range | 10% to 200% (0.1 to 2) |
|-------|------------------------|
| **Mouse** | Ctrl/Cmd + scroll — zooms toward cursor (both modes) |
| **Touch** | Pinch with two fingers (both modes) |
| **Buttons** | Zoom in (+), Zoom out (−), Reset (100%), Fit to view |

Zoom in/out are disabled at 200% and 10% respectively. **Fit to view** calculates a zoom level that fits all elements in the viewport (capped at 100%) and centers the content.

## Pan

| Input | Behavior |
|-------|----------|
| **Pan mode** | Drag with left mouse button |
| **Pan mode** | Scroll wheel (without Ctrl/Cmd) |
| **Edit mode** | Middle mouse button drag, or hold Space and drag |
| **Touch** | Single-finger drag (Pan mode, or Edit mode when touching empty canvas) |

Initial pan positions the content area in view with a small offset so elements near the origin are visible.

## Canvas Controls

The **CanvasControls** component in the header bar provides:

| Control | Purpose |
|---------|---------|
| Edit mode (pencil) | Toggle Edit/Pan mode. Active = Edit, inactive = Pan. Shortcuts: H (Pan), V (Edit). Hold Space to temporarily pan in Edit mode. |
| Show invisible | Toggle visibility of hidden elements |
| Zoom out | Decrease zoom (disabled at 10%) |
| Zoom % | Reset to 100% on click |
| Zoom in | Increase zoom (disabled at 200%) |
| Fit to view | Zoom to fit all content |
| Fullscreen | Toggle fullscreen (when provided) |

## Persistence

Zoom level and pan position (`canvasX`, `canvasY`) are saved to the workspace appearance when they change. Tool mode is also persisted. Values are debounced (500 ms for zoom/pan) to avoid excessive API calls.

## Related

- [Tool Mode](./tool-mode) — Edit vs Pan
- [Canvas Layout](./canvas-layout) — Grid and viewport
