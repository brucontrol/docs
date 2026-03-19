---
id: chart
title: Chart
sidebar_position: 9
---

# Chart

A **Chart** displays time-series data from workspace elements. It binds up to **eight** channels (Value, Analog Input, and similar sources) and plots them over a configurable time window with shared styling for series, axes, and legend.

## What It Is

A Chart is a non-device element that subscribes to historical samples from elements in the same workspace. It renders **line**, **area**, or **bar** series with optional smoothing, fill, grid lines, dual Y axes, and a legend. Appearance is controlled through `chart/ui-controls.json`, including **headerColor**, **image**, axis colors, and per-channel colors for **channel1** through **channel8**.

## Why It Exists

- **Temperature history** — Mash tun, HLT, fermenter traces on one view
- **Trend analysis** — Visualize logged globals or device values
- **Process monitoring** — PID output, duty cycle, or sensor blends
- **Debugging** — Compare channels while tuning

## How to Add

1. In Solution Explorer, right-click a **Workspace** or **Folder**
2. Choose **Chart**
3. Edit the chart and add **Chart Channels** (bind each channel to an element and property index)
4. Set span, max points, and axis options

:::tip
Charts only plot data that exists in history. Enable **EnableHistoricalLogging** on source elements and set **LoggingIntervalSeconds** (and **MaxSilenceSeconds** where relevant) so samples appear within the chart’s time window.
:::

## Native Properties

| Property | Type | Description |
|----------|------|-------------|
| `displayName` | string | Name shown in UI |
| `name` | string | Internal name (fallback) |
| `spanSeconds` | number | Visible time window (seconds), typically 4–604800 |
| `channels` | array | Bindings: `{ channelID: { elementID, index }, autoScale, axisYMin, axisYMax, appearance }` — configure in Edit Chart |
| `hGridLines` | 0 \| 1 \| 2 | Horizontal grid density (native); aligns with designer **showGrid** for template |
| `vGridLines` | 0 \| 1 \| 2 | Vertical grid density |
| `userControl` | boolean | Allow user interaction (pan/zoom where supported) |
| `visibility` | Default \| Visible \| Hidden \| HiddenLocked | When to show |
| `enableHistoricalLogging` | boolean | Log chart metadata if applicable |
| `loggingIntervalSeconds` | number | Logging interval |
| `maxSilenceSeconds` | number | Silence handling for logging |

## Common Script Properties

| Property | Notes |
|----------|--------|
| **ID** | Element identifier |
| **DisplayName** | Shown name |
| **Visibility** | Whether the chart tile is visible |
| **EnableHistoricalLogging** | Historical logging flag |
| **LoggingIntervalSeconds** | Sample interval |
| **MaxSilenceSeconds** | Logging silence window |

## Script Integration

Charts are **display-only**. Scripts do not read or write series points directly. Control the **source elements** (setpoints, sensors, globals) and ensure logging is enabled. PWM and duty-cycle style channels may support oscillation-style rendering depending on channel configuration.

```
// Illustrative: drive a logged source the chart binds to
"MTTemp" EnableHistoricalLogging = true
```

## Custom Properties (`chart/ui-controls.json`)

### Layout

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showHeader` | boolean | `true` | Header bar |
| `showBackground` | boolean | `true` | Chart card background |
| `showLegend` | boolean | `true` | Legend for series |

### Series

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `chartStyle` | text | `line` | `line`, `area`, or `bar` |
| `lineWidth` | number | `2` | Stroke width (1–8) |
| `pointRadius` | number | `0` | Point markers (0–6) |
| `smoothing` | number | `0.25` | Smoothing factor (0–0.95, step 0.05) |
| `fillArea` | boolean | `false` | Fill under line/area |
| `channel1Label` … `channel8Label` | text | `""` | Per-channel legend labels |
| `channel1Color` … `channel8Color` | color | theme accents | Series colors (defaults below) |

**Default channel theme colors**

| Channel | Default theme token |
|---------|---------------------|
| 1 | `accentGreen` |
| 2 | `accentYellow` |
| 3 | `accentBlue` |
| 4 | `accentOrange` |
| 5 | `accentPurple` |
| 6 | `accentRed` |
| 7 | `accentGreen` |
| 8 | `accentBlue` |

### Time

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `maxPoints` | number | `1000` | Max points per channel (100–5000, step 50) |

### Axes

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showGrid` | boolean | `true` | Grid lines |
| `showAxes` | boolean | `true` | Axis lines and ticks |
| `rightAxisEnabled` | boolean | `true` | Right Y-axis for alternating channels |
| `leftAxisLabel` | text | `""` | Left axis caption |
| `rightAxisLabel` | text | `""` | Right axis caption |
| `axisColor` | text | `""` | Axis ink (theme: `textPrimary`) |
| `gridLineColor` | text | `""` | Grid lines (theme: `textSecondary`) |
| `legendColor` | text | `""` | Legend text (theme: `textPrimary`) |

### Appearance

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `backgroundColor` | theme | `bgSecondary` | Plot/card background |
| `borderColor` | theme | `borderColor` | Border |
| `headerColor` | theme | `bgTertiary` | Header bar |
| `image` | file-upload | — | Optional header or branding image |

:::warning
The chart template does **not** include `showTooltip`. Tooltip behavior, if any, comes from the runtime or channel tooling—not from a `showTooltip` custom property.
:::

## Use Cases

- **Mash profile** — Multiple temperature probes on one timeline
- **Fermentation** — Long **spanSeconds** with moderate **maxPoints**
- **PID tuning** — Output vs process variable on dual axes (**rightAxisEnabled**)
- **Comparative runs** — Distinct **channelNColor** and **channelNLabel** for up to eight traces

## Troubleshooting

| Symptom | Things to check |
|---------|------------------|
| Empty chart | Channel bindings; source element logging enabled; **LoggingIntervalSeconds**; time **spanSeconds** |
| Only some channels draw | Each channel bound; correct **index**; element producing data |
| Jagged or sparse lines | Lower **smoothing** or raise **maxPoints**; verify sample rate |
| Wrong colors | **channel1Color**–**channel8Color** overrides vs theme defaults in table above |
| Legend unreadable | **legendColor**; **showLegend**; shorten **channelNLabel** |
| Axes hard to see | **axisColor**, **gridLineColor**, **showAxes**, **showGrid** |
| Dual-axis confusion | **rightAxisEnabled**; channel axis assignment in native channel config |
| Header/image wrong | **headerColor**, **image** asset; **showHeader** |
| Performance | **maxPoints** cap; fewer active channels; longer logging interval |
