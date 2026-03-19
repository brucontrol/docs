---
id: canvas-layout
title: Canvas Layout
sidebar_position: 2
---

# Canvas Layout

The dashboard uses a grid-based layout system for element positioning. The canvas is a large fixed surface with free-floating placement where elements can overlap, giving you full control over your dashboard design.

## Grid System

The layout uses two coordinate systems that work together:

### Pixel Grid (Frontend)

The frontend uses a pixel-based grid where **1 grid unit = 20 pixels** (`PX_PER_GRID = 20`). The backend stores element positions in pixels, and the frontend converts between pixels and grid units using:

- `gridToPixels(gridValue)` — Multiplies by 20 to get pixel position
- `pixelsToGrid(pixelValue)` — Divides by 20 to get grid position

### React-Grid-Layout Configuration

The layout engine (react-grid-layout) uses these settings:

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

Layout IDs use prefixes to map to element types: `gv-` (GlobalVariable), `ts-` (ToggleSwitch), `btn-` (Button), `cht-` (Chart), `do-` (DigitalOutput), `di-` (DigitalInput), `dc-` (DutyCycle), `pwm-` (PWMOutput), `ai-` (AnalogInput), `cnt-` (Counter), `owt-` (OWTemp), `spi-` (SPISensor), `hyd-` (Hydrometer), `hys-` (Hysteresis), `pid-` (PID), `db-` (Deadband), `tmr-` (Timer), `alm-` (Alarm), `scr-` (Script), `prf-` (Profile), `gen-` (Generic).

## Canvas Viewport

The **canvas-viewport** is a transformed container:

- **Size** — 10000 × 8000 px (fixed)
- **Transform** — `translate(panX, panY) scale(zoom)` with `transform-origin: 0 0`
- **Padding** — 12 px

The viewport does not change size with zoom; the CSS transform scales its contents.

## Background

The dashboard background uses `var(--bg-primary)` from the active color set. The canvas area has `overflow: hidden` and `touch-action: none` for custom pan/pinch handling. Workspaces can also have background images that display behind elements.

## New Element Placement

When a new element is added from the Solution Explorer, it is placed at the **center of the current viewport** using `getViewportCenterPosition()`. This means new elements always appear where you're currently looking, regardless of zoom or pan position.

Default sizes vary by element type:

| Element Type | Default Size (grid units) |
|--------------|--------------------------|
| Global Variable, Toggle Switch, Button | 6 × 4 |
| Duty Cycle, PWM Output, Analog Input | 6 × 5 |
| Chart, Profile | 6 × 6 |

## Element Navigation

When you click an element in the Solution Explorer, the dashboard navigates to the workspace containing that element and **centers it in the viewport** using `computeCenterPanForElement()`. This makes it easy to find and focus on specific elements in large layouts.

## Tips

- Elements can **overlap** freely — use Z-order (Bring to front / Send to back) to control which element appears on top
- The 10000 × 8000 px canvas is large enough for complex layouts, but use **Fit to view** if elements get scattered
- New elements always appear at viewport center, so pan to where you want the element before adding it

## Related

- [Element Appearance](./element-appearance) — Position, size, WebAppearance
- [Zoom and Pan](./zoom-pan) — Zoom, pan, viewport transform
