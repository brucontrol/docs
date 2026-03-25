---
id: folders
title: Folders
sidebar_position: 3
---

# Folders

Folders help you organize elements and scripts in the Solution Explorer. They provide a logical grouping structure without affecting how elements appear on the dashboard—folders are purely an organizational tool for the tree view.

## Where Folders Can Be Created

| Location | Action | Purpose |
|----------|--------|---------|
| **Workspace** | Right-click → Folder | Organize elements (buttons, timers, devices, etc.) within a workspace |
| **Workspace folder** | Right-click → New Folder | Create subfolders for deeper organization |
| **Processes** | Right-click → New Folder | Organize scripts into groups |
| **Processes folder** | Right-click → New Folder | Create subfolders for scripts |

## Folder Scoping

Folders are scoped to their section:

- **Workspace folders** belong to a specific workspace and can only contain elements from that workspace. Each folder tracks which workspace it belongs to via `workspaceId`.
- **Process folders** belong to the Processes section and can only contain scripts. They have no workspace association.

This scoping means you cannot accidentally drag a workspace element into a process folder or vice versa.

## How to Create a Folder

1. **Right-click** the workspace, processes root, or an existing folder.
2. Select **Folder** (from a workspace) or **New Folder** (from a folder or processes root).
3. **Name** the folder when prompted.
4. The folder appears in the tree, ready for items to be added.

## Folder Actions

Right-click a folder for:

- **Rename Folder** — Change the folder name
- **Delete Folder** — Remove the folder. When a folder is deleted, its contents (elements or scripts) **move to the parent level** — they are not deleted. If the folder is inside a workspace, elements move to the workspace root. If it's a subfolder, elements move to the parent folder.

## Drag and Drop

You can reorganize items by dragging:

- **Drag elements** into a folder to group them
- **Drag elements** out of a folder to the workspace root (drag to the workspace item in the tree)
- **Drag scripts** into or out of process folders
- **Drag folders** to nest them within other folders or move them to a different parent

Supported drag types include elements, processes, workspace folders, and script folders.

:::note Cross-Workspace Moves
Elements can only be dragged within the same workspace. To move an element to a different workspace, use the **Move to Workspace** context menu action.
:::

:::tip Moving to Root
To move an element out of a folder back to the workspace root, drag it onto the workspace name in the tree. This sets its folder to `null`, placing it at the top level.
:::

## Nesting Folders

Folders can be nested inside other folders for deeper organization. For example:

```
Workspace: Brew System
├── Temperatures/
│   ├── Mash Temps/
│   │   ├── Mash Tun Temp
│   │   └── HLT Temp
│   └── Boil Temp
├── Valves/
│   ├── Hot Liquor Valve
│   └── Mash Outlet Valve
└── Timers/
    ├── Mash Timer
    └── Boil Timer
```

## Tips

- Use folders to mirror the physical layout of your system (e.g., "Mash", "Boil", "Ferment")
- Folders don't affect dashboard layout — only how the Solution Explorer tree is organized
- Deleting a folder is safe — contents are preserved and moved to the parent
- Create separate folders for different element categories (e.g., "Temperatures", "Valves", "Timers") for quick access

## Related

- [Solution Explorer Overview](./overview) — Tree navigation
- [Tree Structure](./tree-structure) — Full tree hierarchy
- [Context Menu](./context-menu) — Actions available on folders
