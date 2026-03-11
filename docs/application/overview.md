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

### Header

The header bar shows status and controls:

- **Panel toggles** — Show or hide the Configuration (Solution Explorer) panel and the Script Panel
- **Status indicators** — Version, uptime, device connections (connected/total), and license status
- **Enable/Disable all ports** — Quick controls for all interface ports
- **Theme selector** — Switch between light and dark themes

### Solution Explorer (Left Panel)

The Solution Explorer is the tree on the left side of the application (labeled **Configuration** in the pane header). It organizes everything in your project:

- **Workspaces** — Your dashboards and their elements (you can create folders to organize workspaces)
- **Processes** — Automation scripts (processes) you can run, pause, or stop (folders available for organization)
- **Data Views** — Configurable views over chart and time-series data
- **Interfaces** — Your connected hardware devices (click a device to open the Device Editor)
- **Mocks** — Simulated devices (only visible when mock mode is enabled)
- **Settings** — Application configuration

Use the Solution Explorer to create workspaces, add elements, manage processes, and open settings. Right-click items for context menus with actions like New, Edit, Rename, Delete, and Run. The left panel can be toggled on or off via the header.

### Dashboard (Center Area)

The Dashboard is the main canvas where your workspace elements appear. Each workspace has its own dashboard. You can:

- **Arrange elements** — Drag, resize, and layer elements
- **Zoom and pan** — Navigate large layouts
- **Switch workspaces** — Use the workspace tab bar above the dashboard
- **Edit elements** — In Select mode, select an element and click Edit to open its properties drawer

The Dashboard shows real-time values, buttons, switches, charts, timers, alarms, and device controls.

### Script Panel (Bottom Panel)

The Script Panel shows the code for the currently selected script (process). You can:

- **Edit script code** — Write and modify automation logic
- **Run, Stop, Pause** — Control script execution
- **View status** — See which scripts are running

Scripts use a simple language with variables, conditionals, timers, alarms, and element control. Multiple scripts can run at the same time.

### Settings (Solution Explorer)

Settings control how BruControl behaves. Open Settings by expanding **Settings** in the Solution Explorer and selecting an item (e.g., General, Security, License). Settings open in a modal. Settings panels include: **General**, **Security**, **License**, **Data Storage**, **Element Templates**, and **Device Types**. **Plugin Store** and **System Logs** open in separate browser tabs.

## Tabs and Navigation

### Workspace Tabs

When you have multiple workspaces, tabs appear above the Dashboard. Click a tab to switch to that workspace. You can reorder tabs by dragging them. (Hidden workspaces do not appear in the tab bar.)

### Scripts Tab

The Scripts icon toggles the Script Panel on or off. When a script is selected in the Solution Explorer, its code appears in the Script Panel.

### Data Views

Data Views appear in the Solution Explorer under **Data Views**. Selecting a data view shows it in the main area instead of the Dashboard, with time-series charts, panels, or summary views. Use the close button to return to the Dashboard.

### Interfaces

Interfaces (your hardware devices) are listed under **Interfaces** in the Solution Explorer. Each interface shows connection status. Add interfaces by right-clicking **Interfaces** → **New Interface**. Configure device types and firmware in **Settings** → **Device Types**. Click a device to open the Device Editor.

## Mobile and Tablet Layout

On mobile and tablet devices, the layout adapts:

- **Bottom navigation** — Switch between Dashboard and Script panels
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

## Next Steps

- [Application Setup](./setup) — Download, install, license, and first run
- [Workspaces](./workspaces) — Create workspaces, add elements, use background images
- [Settings](./settings) — Configure General, Security, License, Data, and more
- [Data Views](./data-views) — Create and configure data views
- [File Manager](./file-manager) — Browse, upload, and download files
- [Log Viewer](./log-viewer) — Search and filter logs for troubleshooting
