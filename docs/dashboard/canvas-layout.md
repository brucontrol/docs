---
id: canvas-layout
title: Canvas Layout
sidebar_position: 2
---

# Canvas Layout

The dashboard uses **react-grid-layout** for element positioning. The canvas is a large fixed grid with free-floating placement and overlap allowed.

## Grid Configuration

| Property | Value | Purpose |
|----------|-------|---------|
| cols | 360 | Fine horizontal snap (~27.78 px per column) |
| rowHeight | 30 | Row height in pixels |
| width | 10000 | Fixed canvas width in pixels |
| margin | [10, 10] | Gap between items (x, y) |
| containerPadding | [10, 10] | Same as margin |
| compactType | null | Free-floating; no auto-compaction |
| allowOverlap | true | Elements can overlap; Z-index controls stacking |
| transformScale | zoom | Syncs grid with CSS zoom for correct drag/resize coordinates |

## Layout Format

Each layout item has:

- **i** — Layout ID (e.g., `gv-abc123`, `cht-xyz789`)
- **x**, **y** — Grid position
- **w** — Width in columns
- **h** — Height in row units

Layout IDs use prefixes to map to element types: `gv-` (GlobalVariable), `ts-` (ToggleSwitch), `btn-` (Button), `cht-` (Chart), `do-` (DigitalOutput), etc.

## Canvas Viewport

The **canvas-viewport** is a transformed container:

- **Size** — 10000 × 8000 px (fixed)
- **Transform** — `translate(panX, panY) scale(zoom)` with `transform-origin: 0 0`
- **Padding** — 12 px

The viewport does not change size with zoom; the CSS transform scales its contents.

## Background

The dashboard background uses `var(--bg-primary)` from the theme. The canvas area has `overflow: hidden` and `touch-action: none` for custom pan/pinch handling.

## New Element Placement

When a new element is added (from Solution Explorer), it is placed using `findNextAvailablePosition()`: the first non-overlapping grid position starting from `ITEM_OFFSET` (36, 24), scanning rows then columns. Default sizes vary by element type (e.g., 6×4 for variables/toggles/buttons, 6×5 for duty/pwm/analog in, 6×6 for charts/profiles).

## Related

- [Element Appearance](./element-appearance) — Position, size, WebAppearance
- [Zoom and Pan](./zoom-pan) — Zoom, pan, viewport transform
