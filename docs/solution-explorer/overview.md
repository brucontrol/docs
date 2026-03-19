---
id: overview
title: Solution Explorer Overview
sidebar_position: 1
---

# Solution Explorer Overview

The **Solution Explorer** is the tree panel on the left side of BruControl. It organizes your entire project—workspaces, scripts, data views, devices, media, and settings—into a navigable hierarchy. Think of it as your project's table of contents.

## Top-Level Folders

| Folder | Contents |
|--------|----------|
| **Workspaces** | Your dashboards; each workspace has elements (buttons, timers, devices, charts, etc.) organized in optional folders |
| **Processes** | Scripts (processes) you can run, edit, and organize in folders |
| **Data Views** | Saved chart configurations for the Data Explorer |
| **Interfaces** | Hardware devices (microcontrollers); right-click → New Interface to add |
| **Media** | Shared media assets (images, sounds) available to element templates and alarm sounds |
| **Mocks** | Mock device simulators (visible when mock mode is enabled on an interface) |
| **Settings** | General, Security, License, Data Storage, Data Explorer, Element Templates, Device Types, Plugin Store, System Logs, Shutdown |

## Common Actions

- **Right-click** any item for a context menu with actions (New, Edit, Run, Delete, etc.)
- **Click** a workspace to switch to its Dashboard
- **Click** an element to **navigate to it** on the Dashboard — the dashboard switches to the element's workspace and pans to center the element in the viewport
- **Click** a script to open it in the Script Panel
- **Expand/collapse** folders to navigate
- On touch devices, tap the **⋮ button** that appears next to items to open the context menu

## Element Navigation

One of the most useful features of the Solution Explorer is **element-to-dashboard navigation**. When you click an element in the tree:

1. BruControl finds which workspace contains the element
2. Switches to that workspace's tab
3. Pans and zooms the dashboard to center the element in the viewport

This makes it easy to locate any element, even in large projects with many workspaces.

## Tree State Preservation

The Solution Explorer uses a **RefreshableTreeDataProvider** that preserves your expanded folders and current selection when data updates arrive (e.g., when elements are added, renamed, or moved by other users or processes). You won't lose your place in the tree when the data refreshes.

## Mobile Layout

On mobile and tablet devices, the Solution Explorer opens in a **slide-out sidebar drawer** instead of a fixed panel:

- Tap **Explorer** in the bottom navigation bar to open the drawer
- The drawer slides in from the left over the Dashboard
- Tap outside the drawer or select an item to close it
- The bottom navigation bar provides three tabs: **Explorer**, **Workspace** (Dashboard), and **Script**

## Tips

- Use the Solution Explorer as your primary way to navigate between workspaces, elements, and settings
- Right-click is your gateway to all creation and management actions
- Click elements to jump directly to them on the dashboard — no need to manually search through workspaces
- Organize large projects with folders inside workspaces and under Processes

## Related

- [Tree Structure](./tree-structure) — Detailed breakdown of the tree hierarchy
- [Folders](./folders) — Creating and managing folders
- [Context Menu](./context-menu) — All available right-click actions
- [Adding Elements](./add-elements) — How to add elements to workspaces
- [Application Overview](../application/overview) — The full application layout
