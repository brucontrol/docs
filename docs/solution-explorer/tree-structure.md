---
id: tree-structure
title: Tree Structure
sidebar_position: 2
---

# Tree Structure

The Solution Explorer tree is organized into a well-defined hierarchy. Understanding this structure helps you navigate and manage your BruControl project efficiently.

## Root Level

```
├── Workspaces           (dashboards)
│   ├── [workspace folders]
│   └── [workspaces with elements]
├── Processes            (scripts you can run)
│   ├── [script folders]
│   └── [scripts]
├── Data Views           (saved chart configurations)
│   └── [data views]
├── Interfaces           (hardware devices)
│   └── [devices with ports]
├── Media                (shared media assets)
├── Mocks                (mock device simulators, when enabled)
│   └── [mock devices]
└── Settings             (application configuration)
    ├── General
    ├── Security
    ├── License
    ├── Data Storage
    ├── Webhooks
    ├── Element Templates
    ├── Device Types
    ├── Plugin Store      (opens in new tab)
    ├── System Logs       (opens in new tab)
    └── Shutdown          (opens shutdown dialog)
```

## Workspace Contents

Under each workspace you find:

- **Folders** — Organize elements into groups
- **Elements** — All element types that can be placed on the dashboard:

### Non-Device Elements

| Element Type | Description |
|-------------|-------------|
| Global Variable | Stores a value (numeric, boolean, string, time, or datetime) |
| Toggle Switch | On/off state control |
| Button | Momentary press trigger |
| Timer | Count-up or count-down timer |
| Alarm | Threshold monitoring with optional sound |
| Script (Inspector) | Links to a runnable script (process) |
| Chart | Time-series data display |
| Profile | Ramp and step control |
| Generic | Flexible container for custom displays |

### Device Elements

Device elements are created by selecting **Device** from the context menu and choosing an interface, port type, and port number:

| Element Type | Description |
|-------------|-------------|
| Digital Output | On/off output control (relays, solenoids) |
| Digital Input | On/off input reading (switches, sensors) |
| Duty Cycle | Time-proportioned output control |
| PWM Output | Pulse-width modulation output |
| Analog Input | Continuous value input (temperature, pressure, level) |
| Counter | Pulse counting and rate measurement |
| OW Temperature | One-wire temperature sensor (DS18B20, etc.) |
| SPI Sensor | SPI bus sensor reading |
| Hydrometer | Wireless hydrometer (temperature + specific gravity) |
| Hysteresis | On/off control with hysteresis band around a setpoint |
| PID | Proportional-integral-derivative control |
| Deadband | Deadband control with inner/outer band drive |

## Processes Contents

Under Processes you find:

- **Folders** — Organize scripts into groups
- **Scripts** — Automation processes. Each script shows its state (Stopped, Running, Paused, Loading)

## Data Views Contents

Under Data Views you find:

- **Data Views** — Saved chart and analysis configurations. Click to open in the Data Explorer view. Each data view can be one of: Time Series, Stacked Panels, Grid Layout, or Summary Dashboard.

## Interfaces Contents

Under Interfaces you find:

- **Devices** — Each hardware interface (microcontroller board). Shows connection status.
  - **Ports** — Under each device, available ports are listed. Ports that have elements assigned show the element name.

## Media Folder

The **Media** folder provides access to shared media assets (images, sounds, and other files). These assets can be referenced by element templates and alarm configurations. Select the Media folder to open the media browser view.

## Mocks Contents

Under Mocks (visible only when mock mode is enabled on at least one interface):

- **Mock Devices** — Simulated devices for testing without hardware. Each mock device runs a TCP server that mimics real device communication.

## Settings Items

Settings items open their respective configuration panels in a modal, except for a few special cases:

| Item | Behavior |
|------|----------|
| General | Opens General settings modal |
| Security | Opens Security settings modal |
| License | Opens License settings modal |
| Data Storage | Opens Data Storage settings modal |
| Webhooks | Opens Webhooks settings modal |
| Element Templates | Opens Element Templates settings modal |
| Device Types | Opens Device Types settings modal |
| Plugin Store | Opens Plugin Store in a **new browser tab** |
| System Logs | Opens Log Viewer in a **new browser tab** |
| Shutdown | Opens the **Shutdown dialog** (Keep Ports & Shutdown / Close Ports & Shutdown) |

## Tips

- Click any element in the tree to navigate directly to it on the dashboard
- Expand workspace folders to see all elements organized by your folder structure
- The tree updates in real time — if another session adds an element, it appears automatically
- Use the tree structure to get an overview of your entire project at a glance

## Related

- [Solution Explorer Overview](./overview) — Navigation and common actions
- [Folders](./folders) — Creating and managing folders
- [Context Menu](./context-menu) — Right-click actions for each item type
- [Adding Elements](./add-elements) — How to create elements
