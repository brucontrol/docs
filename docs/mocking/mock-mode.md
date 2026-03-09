---
id: mock-mode
title: Mock Mode
sidebar_position: 2
---

# Mock Mode

Mock mode redirects device communication from the real interface to a software simulator. When enabled, BruControl creates a mock device on a TCP port and routes all traffic to it.

## Enable Mock Mode

1. **From the Solution Explorer** — Right-click the interface (device) under **Interfaces** → **Enable Mock Mode**.
2. **From the device editor** — Select an interface in the Solution Explorer to open its settings; the Mock Mode toggle appears in the device form.

Mock mode creates a simulator that listens on a TCP port; BruControl connects to it instead of the physical interface (whether serial or TCP).

## Disable Mock Mode

Right-click the interface in the Solution Explorer → **Disable Mock Mode**, or use the Mock Mode toggle in the device editor. Communication returns to the real interface.

## TCP Port

When mock mode is enabled, a **mock device** appears under the **Mocks** folder in the Solution Explorer. Right-click the mock device → **Open Controls (New Tab)** to open the mock page and inspect or control the simulator.

Use this port to open the [Mock Page](mock-page.md) and inspect or control the simulator.

## Redirect Behavior

| State | Communication |
|-------|----------------|
| **Mock mode OFF** | Normal: BruControl talks to the real serial or TCP interface |
| **Mock mode ON** | Redirected: BruControl talks to the mock simulator on the assigned TCP port |

Scripts, dashboards, and element bindings work the same way. The only difference is the target of communication.

## Professional License

Mock mode requires a Professional license. If you see *"Mock device service requires a Professional license"*, upgrade your license to use this feature.
