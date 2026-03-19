---
id: data-views
title: Data Views
sidebar_position: 6
---

# Data Views

Data Views are configurable views over your chart and time-series data. They let you create custom dashboards for historical analysis, monitoring, and reporting—separate from the main workspace Dashboard.

## What Are Data Views?

A Data View is a saved configuration that defines:

- **Which data** to display (channels from elements such as temperatures, values, states)
- **How it is displayed** (time-series chart, stacked panels, grid layout, or summary dashboard)
- **Time range** (preset, live rolling window, or custom start/end)
- **Refresh interval** — How often to fetch new data

Data Views appear in the Solution Explorer under **Data Views**. When you select a Data View, it replaces the Dashboard in the main area and shows your configured panels and charts.

## Creating a Data View

1. In the **Solution Explorer**, locate the **Data Views** folder.
2. **Right-click** the Data Views folder.
3. Select **New Data View** from the context menu.
4. A new data view is created. Click it to open the view in the main area.

To create a copy of an existing data view, right-click it and select **Duplicate**.

## Configuring a Data View

When you create or edit a Data View, you can configure:

### View Type

Choose how the data is laid out:

| View Type | Description |
|-----------|-------------|
| **Time Series** | Single time-series chart with multiple channels overlaid |
| **Stacked Panels** | Charts stacked vertically with a shared time axis |
| **Grid Layout** | Configurable grid of independent chart tiles |
| **Summary Dashboard** | Stat cards with current value, min/max/avg, and optional sparklines, plus a main chart |

### Time Range Presets

Select a preset time window or define a custom range:

| Preset | Duration |
|--------|----------|
| **1m** | Last 1 minute |
| **5m** | Last 5 minutes |
| **15m** | Last 15 minutes |
| **1h** | Last 1 hour |
| **6h** | Last 6 hours |
| **24h** | Last 24 hours |
| **7d** | Last 7 days |
| **2w** | Last 2 weeks |
| **30d** | Last 30 days |

You can also set a **custom** range with specific start and end date/time, or use **live** mode for a rolling window that updates as new data arrives.

### Chart Types

Each panel supports four chart types:

- **Line** — Standard line chart connecting data points
- **Step Line** — Stepped line chart (horizontal segments between points, useful for discrete values like on/off states)
- **Area** — Filled area under the line
- **Bar** — Vertical bar chart

### Y-Axis Modes

Control how the vertical axis is scaled:

- **Auto** — Automatically scales to fit the data range
- **Manual** — Set fixed Y-min and Y-max values
- **Dual** — Two independent Y-axes for channels with different scales

### Channels

Select which element properties to display (e.g., a temperature sensor's Value, a duty cycle's State). You can:

- Search and filter available channels
- Assign colors to each channel
- Add or remove channels from panels

### Max Points and Downsampling

The `maxPoints` setting (default: 1000) controls how many data points are returned per channel. The backend automatically downsamples data when the actual number of points exceeds this limit, keeping charts responsive without losing important trends.

### Refresh Interval

How often to fetch new samples from the server. Shorter intervals give more real-time updates but may increase load.

### Grid Size (Grid Layout)

For grid layout views, set the number of columns and rows to arrange panels in a grid.

## Style Options

Data Views support extensive visual customization through style metadata:

| Category | Options |
|----------|---------|
| **General** | Legend (show/hide, position: top/bottom/left/right), grid lines (show/hide, color), tooltips, crosshair, animation |
| **Typography** | Font family, font size, axis label color, legend text color |
| **Line/Area** | Line smoothing, line width, point radius, fill opacity |
| **Stacked Panels** | Panel gap, panel borders (show/hide, color) |
| **Grid Layout** | Tile gap, tile borders, border radius, tile headers, tile background/border color |
| **Summary Dashboard** | Sparklines (show/hide), min/max display, average display, card columns, card styling (border radius, background, border color), value font size |

## Using a Data View

1. **Select** a Data View in the Solution Explorer.
2. The main area switches from the Dashboard to the Data View.
3. Use the **toolbar** to:
   - Change time range presets
   - Refresh data
   - Edit the configuration
   - Toggle fullscreen
   - Close the view (return to Dashboard)

Data Views receive real-time samples via SignalR (DataViewSampleBroadcaster), which routes channel data to open views. Live data updates automatically when a Data View is selected.

## Data View vs Chart Element

| Feature | Chart Element | Data View |
|---------|---------------|-----------|
| **Location** | On a workspace Dashboard | Separate view in main area |
| **Scope** | One workspace | Application-wide |
| **Layout** | Single chart element | Multiple panels, grid, or summary |
| **Access** | Click workspace tab | Select in Data Views folder |

Use Chart elements for quick, workspace-specific graphs. Use Data Views for dedicated analysis, multi-panel monitoring, or when you want a full-screen data dashboard.

## Tips

- Use **Summary Dashboard** view type for at-a-glance monitoring of key values across your system
- Set **maxPoints** higher (e.g., 2000–5000) for long time ranges where you need more detail, but keep it at 1000 for real-time monitoring to maintain performance
- Use **Stacked Panels** when comparing channels that have different Y-axis scales
- **Duplicate** a data view to create variations (e.g., same channels but different time ranges)

## Next Steps

- [Charts](../elements/chart) — Chart elements on the Dashboard
- [Solution Explorer](../solution-explorer/overview) — Navigating the tree
- [Dashboard](../dashboard/overview) — Workspace canvas and elements
- [Settings — Data Explorer](./settings#data-explorer) — Default data view settings
