---
id: mock-page
title: Mock Page
sidebar_position: 3
---

# Mock Page

The Mock Page lets you inspect and control a mock device. Open it at **`/mock/:tcpPort`** (e.g., `/mock/12345`), where `tcpPort` is the port assigned when mock mode was enabled.

## What It Shows

| Section | Purpose |
|---------|---------|
| **Header** | Device name, TCP port, BruControl connection status, Hub status (Live/Offline) |
| **Port state** | Current values for each port (digital, analog, etc.) |
| **Port controls** | Set values, temperature, specific gravity, or parameters for testing |
| **Message log** | Communication traffic between BruControl and the mock device |

## Port State

The port table lists each port with its number, type, name, value, and display. It is read-only; use **Port controls** to set values and simulate sensor readings or actuator states.

## Message Log

The message log shows the protocol messages exchanged with the mock device. Use it to:

- Verify that BruControl is sending the expected commands
- Debug communication issues
- Understand the device protocol

You can clear the log to focus on recent traffic.

## Use During Testing

1. Enable mock mode on an interface (right-click interface → Enable Mock Mode).
2. A mock device appears under **Mocks** in the Solution Explorer. Right-click it → **Open Controls (New Tab)**, or navigate to `/mock/{port}`.
3. Run your scripts or interact with the dashboard.
4. Watch port values and messages update in real time.
5. Manually set port values to simulate hardware responses.

The mock page connects to the DeviceHub SignalR endpoint (`/hubs/device?tcpPort=...`) to receive live updates (`PortUpdated`, `PortDeleted`, `MessageLogged`) and initial data on connect (`DeviceStatus`, `AllPorts`, `RecentMessages`).
