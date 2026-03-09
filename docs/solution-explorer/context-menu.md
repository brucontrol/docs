---
id: context-menu
title: Context Menu
sidebar_position: 4
---

# Context Menu

Right-click (or tap the ⋮ button on touch devices) any item in the Solution Explorer to open a context menu with actions for that item. The menu shows different options depending on what you clicked.

## How to Use

1. Right-click an item in the tree (workspace, script, element, device, folder, etc.)
2. Choose an action from the menu
3. The menu closes after you select an action

## Actions by Target

### Workspaces Folder

| Action | Description |
|--------|-------------|
| New Workspace | Create a new workspace |

### Workspace

| Action | Description |
|--------|-------------|
| Device | Add a device element (opens device creation flow) |
| Alarm | Add an alarm element |
| Button | Add a button element |
| Chart | Add a chart element |
| Generic | Add a generic element |
| Global Variable | Add a global variable |
| Profile | Add a profile element |
| Script | Add a script element |
| Timer | Add a timer element |
| Toggle Switch | Add a toggle switch element |
| Folder | Create a folder to organize elements |
| Rename Workspace | Change the workspace name |
| Hide Workspace / Show Workspace | Hide or show the workspace in the tab bar |
| Clear Workspace | Remove all elements from the workspace (elements are deleted) |
| Delete Workspace | Delete the workspace and its elements |

### Workspace Folder

| Action | Description |
|--------|-------------|
| New Folder | Create a subfolder |
| Rename Folder | Change the folder name |
| Delete Folder | Delete the folder (elements move to workspace root) |

### Processes Folder

| Action | Description |
|--------|-------------|
| New Script | Create a new script (process) |
| New Folder | Create a folder to organize scripts |

### Script Folder

| Action | Description |
|--------|-------------|
| New Script | Create a script in this folder |
| New Folder | Create a subfolder |
| Rename Folder | Change the folder name |
| Delete Folder | Delete the folder |

### Process (Script)

| Action | Description |
|--------|-------------|
| Run | Start the script |
| Stop | Stop the running script |
| Edit Script | Open the script editor |
| Delete Script | Delete the script |

:::tip Pause and Resume
Pause and Resume are available in the **Script Panel** when a script is running, not in the context menu.
:::

### Elements (Global Variable, Toggle Switch, Button, etc.)

| Action | Description |
|--------|-------------|
| Edit [Type] | Open the edit drawer for that element |
| Move to Workspace | Move the element to a different workspace |
| Duplicate | Create a copy of the element (non-device elements only) |
| Delete [Type] | Delete the element |

### Device Elements (Digital Output, Analog Input, etc.)

| Action | Description |
|--------|-------------|
| Edit [Type] | Open the edit drawer |
| Calibrations... | Open calibrations for analog/control elements (Analog Input, Counter, OW Temp, etc.) |
| Move to Workspace | Move the element to a different workspace |
| Delete [Type] | Delete the device element |

### Device (Interface)

| Action | Description |
|--------|-------------|
| Open Diagnostics | Open the device diagnostics page in a new tab |
| Enable Mock Mode / Disable Mock Mode | Toggle mock mode for testing without hardware (Professional license required) |
| Delete Interface | Remove the interface and its device elements |

### Mock Device

| Action | Description |
|--------|-------------|
| Open Controls (New Tab) | Open the mock device control page |
| Remove Mock Device | Delete the mock device and restore normal communication |

### Data Views Folder

| Action | Description |
|--------|-------------|
| New Data View | Create a new data view |

### Data View

| Action | Description |
|--------|-------------|
| Open | Open the data view in the Data Explorer |
| Duplicate | Create a copy of the data view |
| Delete Data View | Delete the data view |

### Interfaces Folder

| Action | Description |
|--------|-------------|
| New Interface | Add a new interface (opens device creation) |

## Drag and Drop

You can also drag items to move them:

- **Elements** — Drag into a folder or to another workspace (via Move to Workspace)
- **Processes** — Drag into script folders
- **Folders** — Drag to reorder or nest
