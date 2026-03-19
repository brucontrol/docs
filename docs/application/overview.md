---
id: overview
title: Application Overview
sidebar_position: 1
---

# BruControl Application Overview

BruControl is a software application that serves as the central hub for your process control and automation system. It provides a unified interface for setup, monitoring, and control of devices, workspaces, and automated processes—ideal for breweries, fermenters, and other process equipment.

## What BruControl Does

BruControl communicates with one or more microcontroller interfaces (such as Arduino boards) via USB or network. These interfaces act as the hardware layer between the software and your physical devices—relays, sensors, heaters, pumps, valves, and more. The application gives you:

- **Real-time monitoring** of temperatures, levels, states, and values
- **Control** of outputs, timers, and automated sequences
- **Scripting** for full automation without programming experience
- **Customizable dashboards** with elements, charts, and layouts

## Main Areas of the Interface

The interface is built with **resizable split panes** (powered by Allotment). You can drag the dividers between the Solution Explorer, Dashboard, and Script Panel to customize how much space each area gets. Panel visibility (explorer shown/hidden, script panel shown/hidden) is **persisted in a cookie** so your layout preference is restored when you return.

### Header

The header bar shows status and controls:

- **Panel toggles** — Show or hide the Configuration (Solution Explorer) panel and the Script Panel
- **Status indicators** — Version (with update indicator), device connections (connected/total), and license status
- **Uptime ticker** — A real-time counter showing how long the application has been running since it was started
- **Enable/Disable all ports** — Quick controls for all interface ports
- **Theme selector** — Choose from 7+ built-in color sets: VS Code Dark, Cream Sand, Neobrutal, Laurel Swamp, Inkwell, Newsprint, and Kitty Meow Meow. You can also create custom color sets with full control over backgrounds, text, borders, accents, scrollbars, and editor syntax colors.

:::info Theme System
BruControl uses a full **color set** system, not a simple light/dark toggle. Each color set defines 40+ CSS variables covering the entire UI. Select a color set from the header dropdown, or create your own in the Plugin Store.
:::

### Solution Explorer (Left Panel)

The Solution Explorer is the tree on the left side of the application (labeled **Configuration** in the pane header). It organizes everything in your project:

- **Workspaces** — Your dashboards and their elements (you can create folders to organize workspaces)
- **Processes** — Automation scripts (processes) you can run, pause, or stop (folders available for organization)
- **Data Views** — Configurable views over chart and time-series data
- **Interfaces** — Your connected hardware devices (click a device to open the Device Editor)
- **Media** — Shared media assets (images, sounds) available to element templates
- **Mocks** — Simulated devices (only visible when mock mode is enabled)
- **Settings** — Application configuration (General, Security, License, Data Storage, Data Explorer, Element Templates, Device Types, Plugin Store, System Logs, and Shutdown)

Use the Solution Explorer to create workspaces, add elements, manage processes, and open settings. Right-click items for context menus with actions like New, Edit, Rename, Delete, and Run. The left panel can be toggled on or off via the header.

### Dashboard (Center Area)

The Dashboard is the main canvas where your workspace elements appear. Each workspace has its own dashboard. You can:

- **Arrange elements** — Drag, resize, and layer elements
- **Zoom and pan** — Navigate large layouts
- **Switch workspaces** — Use the workspace tab bar above the dashboard
- **Edit elements** — In Edit mode, select an element and click Edit to open its properties drawer

The Dashboard shows real-time values, buttons, switches, charts, timers, alarms, and device controls. When an alarm is active, the **alarm sound player** plays the configured audio file. If the browser blocks autoplay, a banner appears at the top of the dashboard with an **Enable Audio** button so you can allow playback.

### Script Panel (Bottom Panel)

The Script Panel shows the code for the currently selected script (process). You can:

- **Edit script code** — Write and modify automation logic
- **Run, Stop, Pause** — Control script execution
- **View status** — See which scripts are running

Scripts use a simple language with variables, conditionals, timers, alarms, and element control. Multiple scripts can run at the same time.

### Settings (Solution Explorer)

Settings control how BruControl behaves. Open Settings by expanding **Settings** in the Solution Explorer and selecting an item (e.g., General, Security, License). Settings open in a modal. Settings panels include: **General**, **Security**, **License**, **Data Storage**, **Data Explorer**, **Element Templates**, and **Device Types**. **Plugin Store** and **System Logs** open in separate browser tabs. **Shutdown** opens a dedicated shutdown dialog.

## Security and Access Control

### PIN Lock Gate

When a security PIN is configured, BruControl gates the entire application behind a **PIN lock screen**. You must enter the correct PIN before any content is visible. This protects your system from unauthorized access on shared or public displays.

### Unsaved Changes Protection

BruControl uses a **browser navigation guard** (BeforeUnloadGuard) that warns you before leaving the page if there are unsaved changes. If you try to close the browser tab or navigate away, the browser will show a confirmation dialog.

## Tabs and Navigation

### Workspace Tabs

When you have multiple workspaces, tabs appear above the Dashboard. Click a tab to switch to that workspace. You can reorder tabs by dragging them. (Hidden workspaces do not appear in the tab bar.)

### Scripts Tab

The Scripts icon toggles the Script Panel on or off. When a script is selected in the Solution Explorer, its code appears in the Script Panel.

### Data Views

Data Views appear in the Solution Explorer under **Data Views**. Selecting a data view shows it in the main area instead of the Dashboard, with time-series charts, panels, or summary views. Use the close button to return to the Dashboard.

### Interfaces

Interfaces (your hardware devices) are listed under **Interfaces** in the Solution Explorer. Each interface shows connection status. Add interfaces by right-clicking **Interfaces** → **New Interface**. Configure device types and firmware in **Settings** → **Device Types**. Click a device to open the Device Editor.

## Shutdown

To shut down the application, select **Shutdown** from the Settings tree in the Solution Explorer. The shutdown dialog presents two options:

- **Keep Ports & Shutdown** — Shuts down the application while leaving hardware ports in their current state
- **Close Ports & Shutdown** — Sends disable commands to all active ports before shutting down (recommended when you want equipment to turn off safely)

If there are devices with active, enabled ports, the dialog displays a warning so you can make an informed choice.

:::warning
Choosing **Keep Ports & Shutdown** leaves hardware in its current state. If outputs are active (heaters on, pumps running), they will remain active after BruControl shuts down until the hardware is independently powered off or reset.
:::

## Mobile and Tablet Layout

On mobile and tablet devices, the layout adapts:

- **Bottom navigation** — Switch between Explorer, Dashboard (Workspace), and Script panels
- **Sidebar drawer** — The Solution Explorer opens in a slide-out drawer (tap Explorer in the bottom nav to open)
- **Workspace tabs** — Still appear above the Dashboard when multiple workspaces exist

## Other Pages and Routes

Some features open in separate pages or new tabs:

- **File Manager** (`/files`) — Browse, upload, and download files
- **Log Viewer** (`/logs`) — Live logs and search (also via **Settings** → **System Logs**)
- **Plugin Store** (`/plugin-store`) — Install element templates and themes (also via **Settings** → **Plugin Store**)
- **Element Template Editor** (`/element-templates`) — Create and edit element templates
- **Device Diagnostics** (`/device/:id/diagnostics`) — Per-device diagnostics
- **Mock Device** (`/mock/:port`) — Simulate a device for testing

## Tips

- **Resize panels** by dragging the dividers between Solution Explorer, Dashboard, and Script Panel
- **Hide panels** you don't need to maximize Dashboard space — your preferences are saved automatically
- **Use keyboard shortcuts** on the dashboard: **H** for Pan mode, **V** for Edit mode, **Escape** to deselect, **Space** (hold) to temporarily pan while in Edit mode
- **Choose a color set** that works for your environment — dark themes reduce glare for brewery settings, while light themes like Cream Sand or Newsprint work well in bright spaces

## Next Steps

- [Application Setup](./setup) — Download, install, license, and first run
- [Workspaces](./workspaces) — Create workspaces, add elements, use background images
- [Settings](./settings) — Configure General, Security, License, Data, and more
- [Data Views](./data-views) — Create and configure data views
- [File Manager](./file-manager) — Browse, upload, and download files
- [Log Viewer](./log-viewer) — Search and filter logs for troubleshooting
- [Dashboard Overview](../dashboard/overview) — Canvas, elements, overlays, and interactions
