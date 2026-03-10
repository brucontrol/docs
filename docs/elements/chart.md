---
id: chart
title: Chart
sidebar_position: 9
---

# Chart

A **Chart** displays time-series data from workspace elements. It binds to one or more data channels (Value, Analog Input, etc.) and plots them over a configurable time window.

## What It Is

A Chart is a non-device element that subscribes to historical samples from elements in the same workspace. It renders line, area, or bar charts with configurable axes, colors, and time range.

## Why It Exists

- **Temperature history** — Plot mash tun, HLT, or fermenter temperature over time
- **Data logging** — Visualize logged values from Global Variables or device elements
- **Process monitoring** — Watch PID output, duty cycle, or sensor readings
- **Troubleshooting** — Inspect trends when tuning or debugging

## How to Add

1. In Solution Explorer, right-click a **Workspace** or **Folder**
2. Choose **Chart**
3. Edit to add **Chart Channels** (bind to elements with Value or similar)
4. Set time range, refresh interval, and grid options

## Native Properties

| Property | Type | Description |
|----------|------|-------------|
| `displayName` | string | Name shown in UI |
| `name` | string | Internal name (fallback) |
| `spanSeconds` | number | Time window (seconds) — 4 to 604800 |
| `refreshInterval` | number | Sample refresh interval (seconds), min 1 |
| `timeRangeMode` | realtime \| history | **Realtime** = sliding window. **History** = fixed window at load (no left-side erosion); use Refresh to reload. |
| `channels` | array | Channel bindings: `{ channelID: { elementID, index }, autoScale, axisYMin, axisYMax, appearance }`. Configure in Edit Chart → Chart Channels. |
| `hGridLines` | 0 \| 1 \| 2 | Horizontal grid: None, Major, Major+Minor |
| `vGridLines` | 0 \| 1 \| 2 | Vertical grid: None, Major, Major+Minor |
| `userControl` | boolean | Allow user interaction with chart |
| `visibility` | Default \| Visible \| Hidden \| HiddenLocked | When to show |

## Custom Properties (from plugin-library)

From `chart` widget `ui-controls.json`:

| Property | Type | Group | Description |
|----------|------|-------|-------------|
| `showHeader`, `showBackground`, `showLegend` | boolean | Layout | Visibility |
| `chartStyle` | line \| area \| bar | Series | Rendering style |
| `lineWidth`, `pointRadius`, `smoothing`, `fillArea` | — | Series | Line appearance |
| `channel1Label`–`channel4Label` | text | Series | Channel labels |
| `channel1Color`–`channel4Color` | color | Series | Channel colors |
| `timeRangePreset` | 15s, 30s, 1m, 5m, 15m, 1h, 6h, 24h, 7d, custom | Time | Default time window |
| `customSpanSeconds` | number | Time | Custom window (when preset=custom), 4–604800 |
| `maxPoints` | number | Time | Max samples per channel (100–5000) |
| `showGrid`, `showAxes`, `showTooltip` | boolean | Axes | Grid and tooltip |
| `rightAxisEnabled` | boolean | Axes | Right Y-axis for alternating channels |
| `leftAxisLabel`, `rightAxisLabel` | text | Axes | Axis labels |
| `backgroundColor`, `borderColor` | — | Appearance | Theme-aware overrides |

## Script Integration

Charts are display-only. Scripts do not read or write chart data directly. Scripts control the **elements** that feed the chart (e.g., setpoints, device values). Enable **historical logging** on those elements so the chart receives samples. PWM and duty-cycle channels support **oscillation mode** to render synthetic waveforms.

## Use Cases

- **Mash temperature** — Chart Analog Input (temp probe) over mash duration
- **Fermenter temp** — Monitor fermentation temperature trend
- **PID output** — Visualize duty cycle or PWM over time
- **Multi-channel** — Plot HLT, MLT, and BK temps on one chart
