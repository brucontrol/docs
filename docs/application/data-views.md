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

## Configuring a Data View

When you create or edit a Data View, you can configure:

### View Type

Choose how the data is laid out:

- **Time Series** — Single time-series chart (line, step, area, or bar)
- **Stacked Panels** — Vertical stack of multiple time-series panels
- **Grid Layout** — Grid of time-series panels (configurable columns and rows)
- **Summary Dashboard** — Summary cards with current value, min/max/avg, and optional sparklines

### Time Range

- **Preset** — Fixed ranges such as 1 hour, 6 hours, 24 hours
- **Live** — Rolling window that updates as new data arrives
- **Custom** — Specific start and end date/time

### Channels

Select which element properties to display (e.g., a temperature sensor's Value, a duty cycle's State). You can:

- Search and filter available channels
- Assign colors to each channel
- Add or remove channels from panels

### Refresh Interval

How often to fetch new samples from the server. Shorter intervals give more real-time updates but may increase load.

### Grid Size (Grid Layout)

For grid layout views, set the number of columns and rows to arrange panels in a grid.

## Using a Data View

1. **Select** a Data View in the Solution Explorer.
2. The main area switches from the Dashboard to the Data View.
3. Use the **toolbar** to:
   - Change time range presets (1H, 6H, 24H, etc.)
   - Refresh data
   - Edit the configuration
   - Toggle fullscreen
   - Close the view (return to Dashboard)

Data Views are rendered by the **DataExplorerView** component and receive real-time samples via the **DataViewSampleBroadcaster** (SignalR), which routes channel data to open views. Live data updates automatically when a Data View is selected.

## Data View vs Chart Element

| Feature | Chart Element | Data View |
|---------|---------------|-----------|
| **Location** | On a workspace Dashboard | Separate view in main area |
| **Scope** | One workspace | Application-wide |
| **Layout** | Single chart element | Multiple panels, grid, or summary |
| **Access** | Click workspace tab | Select in Data Views folder |

Use Chart elements for quick, workspace-specific graphs. Use Data Views for dedicated analysis, multi-panel monitoring, or when you want a full-screen data dashboard.

## Next Steps

- [Charts](../elements/chart) — Chart elements on the Dashboard
- [Solution Explorer](../solution-explorer/overview) — Navigating the tree
- [Dashboard](../dashboard/overview) — Workspace canvas and elements
