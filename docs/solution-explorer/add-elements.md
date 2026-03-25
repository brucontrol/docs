---
id: add-elements
title: Adding Elements
sidebar_position: 5
---

# Adding Elements

Elements are added to workspaces from the Solution Explorer. Right-click a **workspace** and choose the element type from the context menu. New elements appear both in the tree and on the dashboard, placed at the center of your current viewport.

## Non-Device Elements

Non-device elements (Global Variable, Toggle Switch, Button, Timer, Alarm, Script Inspector, Chart, Profile, Generic) are created directly in a workspace:

1. Right-click a **Workspace** in the Solution Explorer
2. Choose the element type (e.g., **Global Variable**, **Timer**, **Button**)
3. The element is created and appears in the tree and on the Dashboard
4. Double-click or right-click → **Edit** to configure it

### Available Non-Device Elements

| Menu Item | Element Type | Default Size |
|-----------|--------------|-------------|
| Global Variable | Stores a value (numeric, boolean, string, time, or datetime) | 6 × 4 |
| Toggle Switch | On/off state | 6 × 4 |
| Button | Momentary press | 6 × 4 |
| Timer | Count-up or count-down | 6 × 4 |
| Alarm | Threshold monitoring with optional sound | 6 × 4 |
| Script Inspector | Links to a runnable script (process) | 6 × 4 |
| Chart | Time-series display | 6 × 6 |
| Profile | Ramp/profile control | 6 × 6 |
| Generic | Flexible container for custom displays | 6 × 4 |

Default sizes are in grid units (width × height). You can resize any element after creation by using the resize handles in Edit mode.

## Device Elements

Device elements require an interface (microcontroller) and a port. The creation flow uses a dedicated **DeviceElementCreateModal** dialog:

1. Right-click a **Workspace**
2. Choose **Device**
3. In the dialog:
   - Select the **Interface** (your microcontroller board)
   - Select the **Element Type** (see table below)
   - Select the **Port** (pin number from the wiring map — only ports that support the chosen type are shown)
4. Click **Create Element** to create the device and its element

The port must support the chosen element type. Available ports are filtered based on the selected type, and ports already in use show which element occupies them.

### Available Device Element Types

| Element Type | Description | Default Size |
|-------------|-------------|-------------|
| Digital Output | On/off output control (relays, solenoids, valves) | 6 × 4 |
| Digital Input | On/off input reading (switches, float sensors) | 6 × 4 |
| Duty Cycle | Time-proportioned output control | 6 × 5 |
| PWM Output | Pulse-width modulation output (0–255) | 6 × 5 |
| Analog Input | Continuous value input (temperature, pressure, level) | 6 × 5 |
| Counter | Pulse counting and rate measurement | 6 × 4 |
| OW Temperature | One-wire temperature sensor (DS18B20, etc.) | 6 × 4 |
| SPI Sensor | SPI bus sensor reading | 6 × 4 |
| Hydrometer | Wireless hydrometer (temperature + specific gravity) | 6 × 4 |
| Hysteresis | On/off control with hysteresis band around a setpoint | 6 × 4 |
| PID | Proportional-integral-derivative control loop | 6 × 4 |
| Deadband | Deadband control with inner/outer band drive | 6 × 4 |

See [Device Elements Overview](../elements/device-elements-overview) and [Wiring Maps](../hardware/wiring-maps) for details on each type and port compatibility.

## Element Placement

New elements are placed at the **center of the current viewport**. This means the element appears wherever you're currently looking on the dashboard. To control where a new element lands:

1. Pan the dashboard to the area where you want the element
2. Add the element from the Solution Explorer
3. The element appears at viewport center — adjust position by dragging in Edit mode

:::tip
If you add multiple elements quickly, they may stack on top of each other at viewport center. Switch to Edit mode and drag them apart, or pan slightly between additions.
:::

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
Device elements cannot be duplicated via the context menu because each device element is bound to a specific hardware port. Create a new device element with the desired interface and port configuration instead.
:::

## Adding Scripts (Processes)

Scripts (processes) live under the **Processes** folder:

1. Right-click **Processes** or a script folder
2. Choose **New Script**
3. Name the script and add your code

See [Scripting](../scripting/introduction) for the scripting language.

## Tips

- Right-click the **workspace** (not a folder) to see the full list of element types you can add
- Use the **Device** option for any hardware-connected element — the dialog guides you through interface and port selection
- **Analog Input**, **OW Temperature**, **SPI Sensor**, and **Hydrometer** elements support calibrations — configure them after creation via right-click → **Calibrations...**
- Name elements descriptively (e.g., "Mash Tun Temp" instead of "OWTemp1") — names must be unique and are used in scripts

## Related

- [Context Menu](./context-menu) — All right-click actions
- [Element Appearance](../dashboard/element-appearance) — Configuring element visuals
- [Workspaces](../application/workspaces) — Workspace management
- [Dashboard Overview](../dashboard/overview) — How elements render on the canvas
