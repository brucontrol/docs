---
id: requirements
title: System Requirements
sidebar_position: 3
---

# System Requirements

To implement a BruControl system, the user must:

## Hardware Requirements

### Control System Hardware

- Plan, source, and/or build the electrical control system, including needed parts such as:
  - Microcontroller interface(s)
  - Enclosure
  - Circuit breakers and fuses
  - Relays/contactors/distribution blocks
  - Plugs/receptacles
  - Power supplies
  - Wires and terminals

### Electrical Expertise

- Be or employ an installer who has electrical wiring knowledge/experience
- The installer must be able to perform all electrical system integration, including:
  - Microcontroller interface setup
  - All associated/ancillary hardware
  - Appropriate wiring according to each component's specification

:::danger Safety First
Knowledge and experience with electrical integration, low and high voltage wiring, electrical noise management, schematic writing and reading, electrical safety, and building control systems is needed. Integration hardware will include mechanical or solid state relays and boards, power supplies, high voltage contactors, sensors, switches, lighted indicators, daughter boards, and all associated wiring and terminations.
:::

## PC Requirements

### Operating System

- Windows 7, 8, 10, or 11 (32-bit or 64-bit editions)
- If installing on Windows 7, the .NET 10 Desktop Runtime or higher must be installed
  - Download from: https://dotnet.microsoft.com/en-us/download

### Hardware Specifications

- Any relatively modern PC
- **RAM**: 8GB minimum
- **Disk Space**: 500MB available
- **USB Ports**: 1+ available (for firmware upload and/or serial (USB) connected interfaces)

### Display Requirements

- **Resolution**: 1024 x 768 or higher recommended
- See display scaling table below for optimal viewing

#### Display Resolution and Scaling

The vertical resolution is the second number in a screen resolution format. For example, 1920 x 1080 (or 1080p) is 1080. In this table, any display scale less than the maximum shown is OK. Resolution/scale combinations that indicate "OK w/opt" means for the application to be properly viewed, either the taskbar must be set to auto-hide, or the application's display scaling must be disabled.

| Vertical Resolution | Maximum Scale Allowable | Result |
|---------------------|-------------------------|---------|
| 1080 | 125% | OK |
| 1080 | 150% | OK w/opt |
| 1050 | 125% | OK |
| 1050 | 150% | OK w/opt |
| 1024 | 125% | OK w/opt |
| 1000 | 125% | OK w/opt |
| 960 | 125% | OK w/opt |
| 900 | 125% | OK w/opt |
| 768 | 100% | OK w/opt |

:::tip Display Optimization
- **To auto-hide the task bar**: Right-click the Taskbar, select Settings, then turn on 'Automatically hide the taskbar'
- **To disable display scaling**: Right-click the BruControl.exe or shortcut file, select 'Properties'...'Compatibility' tab...'Settings'...check 'Disable display scaling on high DPI settings'
:::

### Network Requirements

- **Internet connectivity** - Required for software licensing and updates
- **Remote Control** (optional) - If PC is not located next to the machine where the user is operating, remote control software can be used:
  - Microsoft Remote Desktop
  - TeamViewer
  - Chrome Remote Desktop
  - Other remote desktop solutions

### Network Interface Requirements

If interface connected by network, you'll need:

- Local Ethernet switch or Wi-Fi router
- Network bridge (optional) - For linking different systems (e.g., Ethernet to Wi-Fi)
  - Example: TP-Link TL-WR710N or similar

## Software Requirements

- Acquire a BruControl license
- Install interface firmware
- Download and install BruControl application

## Touchscreen Considerations

BruControl is intended to be touch-screen friendly:

- No mouse right-clicks required
- Large buttons, fonts, and menus to accommodate touch
- Optimized for tablet and touchscreen displays
- Can be used with standard mouse and keyboard as well
