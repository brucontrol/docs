---
id: overview
title: Mocking Overview
sidebar_position: 1
---

# Mocking Overview

BruControl's mocking system lets you simulate hardware interfaces entirely in software, so you can build, test, and demonstrate your automation system without connecting physical devices. When mock mode is enabled for an interface, BruControl creates a software simulator that behaves like the real hardware — accepting commands, reporting sensor values, and responding to protocol messages — all over a local TCP connection.

## What Mocking Is

A **mock device** is a software simulator that mimics the communication protocol and port behavior of a real BruControl interface. Instead of talking to a physical Arduino MEGA or ESP32 over serial or TCP, BruControl connects to the mock device on a local TCP port. From the application's perspective, the mock device looks and behaves like real hardware.

This means:

- **Device elements** work normally — digital outputs toggle, analog inputs report values, control elements compute outputs
- **Scripts** run against mock ports exactly as they would against real hardware
- **Dashboards and workspaces** display live data from mock ports
- **Communication logs** show the raw protocol messages exchanged between BruControl and the simulator
- **You control the simulator** — set input values (temperature, pressure, switch state) through the Mock Page UI to simulate real-world conditions

## Why Use Mocking

| Use Case | Benefit |
|----------|---------|
| **Development** | Build and test workspaces, scripts, and dashboards without having hardware on hand |
| **Script testing** | Verify automation logic, alarm triggers, and control element behavior by simulating sensor inputs |
| **Demonstrations** | Show BruControl's capabilities to others without a physical setup |
| **Debugging** | Inspect port state and protocol messages in real time to diagnose script or logic issues |
| **Pre-wiring validation** | Test your entire system configuration before committing to physical wiring |
| **CI / Automated testing** | Run integration tests against mock devices in headless or Docker environments |

:::tip Start With Mocking
If you are new to BruControl, enabling mock mode on a device is the fastest way to explore device elements, scripting, and dashboards without any hardware. Follow the [Quick Start](../quick-start) guide and substitute mock mode for the hardware steps.
:::

## How It Works

The mocking workflow has three parts:

1. **Enable mock mode** on an interface — BruControl spins up a mock device simulator on a local TCP port and redirects all communication from the real interface to the simulator.

2. **Interact via the Mock Page** — Open the Mock Page at `/mock/{tcpPort}` (or from the Solution Explorer) to view port states, manually set input values, and inspect protocol messages.

3. **Run your system** — Scripts, dashboards, alarms, and control elements operate against the mock device as if it were real hardware. Change simulated inputs on the Mock Page and watch your system respond.

```
┌─────────────────┐         ┌──────────────┐         ┌────────────────┐
│   BruControl    │  TCP    │  Mock Device  │  HTTP   │   Mock Page    │
│   Application   │◄───────►│  Simulator    │◄───────►│   /mock/:port  │
│  (scripts, UI)  │         │  (in-process) │         │   (browser)    │
└─────────────────┘         └──────────────┘         └────────────────┘
```

All 12 port types are supported in mock mode: Digital Input, Digital Output, PWM Output, Analog Input, Counter, OW Temp (1-Wire), SPI Sensor (RTD), Hydrometer, Duty Cycle, Hysteresis, PID, and Deadband.

## Professional License Required

Mock mode requires a **Professional** license. If you attempt to enable mock mode without one, BruControl will display:

> *"Mock device service requires a Professional license."*

See [Technical Assistance](../appendix/technical-assistance#license-and-purchasing) for licensing information.

## Getting Started with Mocking

1. **Enable mock mode** on any configured interface — right-click the interface in the Solution Explorer and select **Enable Mock Mode**, or use the [Device API](../api/device-api).

2. **Open the Mock Page** — expand the **Mocks** folder in the Solution Explorer, right-click the mock device, and select **Open Controls (New Tab)**. Alternatively, navigate directly to `/mock/{tcpPort}`.

3. **Set simulated values** — use the port controls on the Mock Page to set temperature readings, toggle digital inputs, or adjust analog values.

4. **Run scripts and observe** — start your automation scripts and watch the system respond to your simulated inputs in real time.

5. **Disable mock mode** when you are ready to connect to real hardware — communication returns to the physical interface.

:::info Port Name Display
When mock mode is enabled, BruControl automatically sends your configured device element names to the mock simulator so that port controls on the Mock Page display meaningful names (e.g., "Mash Temp" instead of "Port 22").
:::

## Related Topics

- [Mock Mode](mock-mode.md) — Enable/disable mock mode, TCP port assignment, redirect behavior, and SignalR events
- [Mock Page](mock-page.md) — Inspect port state, set simulated values, and view protocol message logs at `/mock/:tcpPort`
- [Device Types](../hardware/device-types) — All 12 supported port types and their descriptions
- [Device API](../api/device-api) — `POST /api/v1/device/{id}/mock-mode` endpoint for programmatic control
