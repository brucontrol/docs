---
id: workspaces
title: Workspaces
sidebar_position: 3
---

# Workspaces

A workspace is a container for elements—the building blocks of your control interface. Each workspace has its own dashboard where you arrange elements, charts, buttons, and device controls.

## What Is a Workspace?

A workspace is an "open canvas" where you add, organize, and manage graphical elements. You can have multiple workspaces, each representing:

- A single control system (e.g., brew kettle, fermenter)
- A subsection of a larger system
- Different views or pages for the same equipment

Each workspace can hold as many or as few elements as you need. Elements can be moved, sized, and formatted to create a custom layout.

## Creating Workspaces

1. In the **Solution Explorer**, locate the **Workspaces** folder.
2. **Right-click** the Workspaces folder.
3. Select **New Workspace**.
4. A new workspace appears in the tree. When you have two or more visible workspaces, the tab bar appears above the Dashboard so you can switch between them.

You can create as many workspaces as you need. Use them to separate different machines, processes, or screens.

## Workspace Tab Bar

When you have two or more *visible* workspaces, a tab bar appears above the Dashboard. Each tab represents one workspace. (Hidden workspaces do not appear in the tab bar.)

- **Switch workspaces** — Click a tab to view that workspace's dashboard
- **Reorder tabs** — Drag a tab left or right to change the order
- **Current workspace** — The selected tab is highlighted

The Dashboard always shows the elements belonging to the currently selected workspace.

## Adding Elements to a Workspace

Elements are added from the Solution Explorer:

1. **Right-click** a workspace (or a folder inside it).
2. Choose the element type (e.g., **Device**, **Button**, **Chart**):
   - **Device** — Add a device element (interface, port, type)
   - **Alarm** — Threshold monitoring and notifications
   - **Button** — Momentary trigger
   - **Chart** — Time-series graphs
   - **Generic** — Labels, custom displays
   - **Global Variable** — Store and display values
   - **Profile** — Ramp and step control
   - **Script** — Link to a runnable script
   - **Timer** — Count-up or count-down
   - **Toggle Switch** — On/off control
   - **Folder** — Organize elements in subfolders

3. The new element appears in the Solution Explorer and on the Dashboard.

Elements must have **unique names** within the application. BruControl assigns default names, but you can rename them in the element's properties (Edit drawer).

## Organizing with Folders

You can create folders inside a workspace to group elements:

1. **Right-click** the workspace or an existing folder.
2. Select **Folder** (when right-clicking a workspace) or **New Folder** (when right-clicking an existing folder).
3. Name the folder.
4. **Drag and drop** elements into the folder.

Folders help keep large projects organized. They do not change how elements appear on the Dashboard—only how they are listed in the Solution Explorer.

## Moving Elements Between Workspaces

To move an element to another workspace:

1. **Right-click** the element in the Solution Explorer.
2. Select **Move to Workspace**.
3. Choose the destination workspace.

The element is removed from the current workspace and added to the selected one.

## Saving

BruControl saves your configuration automatically. Workspaces and elements are stored in the configuration file (`.brucfg`); dashboard layouts (positions, zoom) are stored in the web database. The default data folder is `Documents\BruControl` (Windows) or `~/Documents/BruControl` (Linux). No manual save action is required for normal operation.

:::warning Deleting a Workspace
When you delete a workspace, all of its elements are also deleted. This cannot be undone. Use **Clear Workspace** if you want to remove all elements but keep the workspace itself.
:::

## Next Steps

- [Settings](./settings) — Configure application behavior
- [Solution Explorer](../solution-explorer/overview) — Tree structure and context menus
- [Dashboard](../dashboard/overview) — Canvas layout, zoom, and tool mode
