---
id: add-elements
title: Adding Elements
sidebar_position: 5
---

# Adding Elements

Elements are added to workspaces from the Solution Explorer. Right-click a **workspace** and choose the element type from the context menu.

## Non-Device Elements

Non-device elements (Global Variable, Toggle Switch, Button, Timer, Alarm, Script, Chart, Profile, Generic) are created directly in a workspace:

1. Right-click a **Workspace** in the Solution Explorer
2. Choose the element type (e.g., **Global Variable**, **Timer**, **Button**)
3. The element is created and appears in the tree and on the Dashboard
4. Double-click or right-click → **Edit** to configure it

### Available Non-Device Elements

| Menu Item | Element Type |
|-----------|--------------|
| Global Variable | Stores a value (numeric, boolean, string, time, or datetime) |
| Toggle Switch | On/off state |
| Button | Momentary press |
| Timer | Count-up or count-down |
| Alarm | Threshold monitoring |
| Script | Links to a runnable script (process) |
| Chart | Time-series display |
| Profile | Ramp/profile control |
| Generic | Flexible container for custom displays |

## Device Elements

Device elements require an interface (microcontroller) and a port. The flow is different:

1. Right-click a **Workspace**
2. Choose **Device**
3. In the dialog:
   - Select the **Interface** (your microcontroller board)
   - Select the **Element Type** (Digital Output, Analog Input, etc.)
   - Select the **Port** (pin number from the wiring map)
4. Click **Create Element** to create the device and its element

The port must support the chosen element type. See [Device Elements Overview](../elements/device-elements-overview) and [Wiring Maps](../hardware/wiring-maps) for details.

## Folders

To organize elements or scripts:

1. Right-click a **Workspace** (for elements) or the **Processes** folder (for processes)
2. Choose **Folder** (workspace) or **New Folder** (Processes)
3. Name the folder when prompted
4. Drag elements or processes into the folder. To add more elements, right-click the **workspace** (not the folder) and choose an element type

## Duplicating Elements

To copy an existing non-device element:

1. Right-click the element
2. Choose **Duplicate**
3. A copy is created with a unique name in the same workspace

:::info Device Elements
Device elements cannot be duplicated via the context menu. Create a new device with the same interface and port configuration instead.
:::

## Adding Scripts (Processes)

Scripts (processes) live under the **Processes** folder:

1. Right-click **Processes** or a script folder
2. Choose **New Script**
3. Name the script and add your code

See [Scripting](../scripting/introduction) for the scripting language.
