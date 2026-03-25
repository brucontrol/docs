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

## Host Requirements

BruControl is a .NET 10 ASP.NET Core web application. The host machine runs the server; users access the interface through a web browser from any device on the network.

### Operating System

- **Windows** (64-bit): Windows 10 or later
  - Run the self-contained `BruControl.WebHost.exe` (no separate runtime install needed)
  - Or install the [.NET 10 ASP.NET Core Runtime](https://dotnet.microsoft.com/en-us/download) for framework-dependent deployment
- **Linux** (64-bit): Debian, Ubuntu, Alpine, or any distro with .NET 10 support
  - Docker image: `ghcr.io/brucontrol/brucontrol-web:latest`
  - Native: Extract the `BruControl-Web-*-linux-x64.tar.gz` release and run `dotnet BruControl.WebHost.dll`

:::info Web Application
BruControl runs as a web server on the host machine. After starting the application, open a browser on any device and navigate to `http://<host-ip>:5005` (or the configured port) to access the interface. No software needs to be installed on client devices — only a modern browser is required.
:::

### Host Hardware

- Any modern x64 machine (PC, server, NAS, single-board computer, or VM)
- **RAM**: 4GB minimum, 8GB recommended
- **Disk Space**: 500MB available (plus space for logs and historical data)
- **USB Ports**: 1+ available if using serial (USB) connected interfaces or for firmware upload

### Network Requirements

- **Default port**: 5005 (configurable in `appsettings.json` or via `ASPNETCORE_URLS` environment variable)
- **Internet connectivity** — Required for license verification and update checks
- **Remote access** — Since BruControl is a web application, any device with a browser on the same network can access the interface directly. No remote desktop software is needed for normal operation.

### Network Interface Requirements

If microcontroller interfaces are connected by network, you'll need:

- Local Ethernet switch or Wi-Fi router
- Network bridge (optional) — For linking different network segments (e.g., Ethernet to Wi-Fi)

## Software Requirements

- Acquire a BruControl license
- Install interface firmware
- Download and install BruControl application

:::info License Tiers
BruControl offers **Basic**, **Advanced**, and **Professional** license tiers. **Basic** supports a single serial interface. **Advanced** unlocks unlimited serial and network interfaces. Upgrading to **Professional** adds [Mock Mode](./mocking/overview) (hardware simulation for testing without physical devices), [Data Exchange Legacy API](./api/misc-apis#data-exchange-legacy-api) (third-party integrations via HTTP), and [OpenAPI/Swagger](./api/overview) interactive documentation.
:::

### Browser Requirements (Client Devices)

The BruControl interface runs in a web browser on any device — desktop, laptop, tablet, or phone.

- **Recommended browsers**: Chrome, Edge, Firefox, or Safari (current versions)
- **Required**: WebSocket support (for real-time updates via SignalR)
- **Minimum browser window**: 1024 x 768 or larger for the full interface
- **Browser zoom**: Use Ctrl+/- (or Cmd+/- on Mac) to adjust the interface scale

:::tip
The web UI is responsive and touch-friendly. You can access BruControl from multiple devices simultaneously — for example, a wall-mounted tablet for daily operation and a laptop for configuration.
:::

## Touchscreen Considerations

BruControl's web interface is designed to be touch-friendly:

- Long-press on touch devices opens context menus (equivalent to right-click)
- Large buttons, fonts, and menus to accommodate touch input
- Works well on tablets and touchscreen displays alongside traditional mouse and keyboard
