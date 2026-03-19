---
id: mock-page
title: Mock Page
sidebar_position: 3
---

# Mock Page

The Mock Page lets you inspect and control a mock device in real time. Open it at **`/mock/:tcpPort`** (e.g., `/mock/12345`), where `tcpPort` is the port assigned when mock mode was enabled.

You can also open it from the Solution Explorer: expand **Mocks**, right-click the mock device, and select **Open Controls (New Tab)**.

## What It Shows

| Section | Purpose |
|---------|---------|
| **Header** | Device name, TCP port, BruControl connection status, Hub status (Live/Offline) |
| **Port state** | Current values for each port (digital, analog, etc.) |
| **Port controls** | Set values, temperature, specific gravity, or parameters for testing |
| **Message log** | Communication traffic between BruControl and the mock device |

## Port State Table

The port table lists each port with its number, type, name, current value, and display representation. This table is read-only and updates in real time as BruControl sends commands or as you manipulate port controls.

## Port Controls

Port controls let you simulate hardware responses. The available controls depend on the port type:

| Port Type | Controls | Description |
|-----------|----------|-------------|
| **Digital Output** | ON/OFF toggle | Reflects the state BruControl commands; the mock device accepts the command |
| **Digital Input** | ON/OFF toggle | Set the input state to simulate a switch, float, or sensor |
| **PWM Output** | Read-only value | Shows the PWM duty cycle value commanded by BruControl |
| **Analog Input** | Numeric input (0–1023 or 0–4095) | Set the raw ADC value to simulate a sensor reading |
| **Counter** | Pulse button, total/rate display | Simulate pulse inputs for flow meters or encoders |
| **OW Temp (1-Wire)** | Temperature input (°F or °C) | Set the temperature reading to simulate a DS18B20 sensor |
| **SPI Sensor (RTD)** | Temperature input | Set the RTD reading to simulate a PT100/PT1000 sensor |
| **Hydrometer** | SG input, Temperature input | Set specific gravity and temperature to simulate an iSpindel or Tilt |
| **Hysteresis** | Read-only (driven by input) | Shows the on/off state driven by the linked input port |
| **PID** | Read-only (driven by input) | Shows the PID output value driven by the linked input port |
| **Deadband** | Read-only (driven by input) | Shows the deadband output driven by the linked input port |
| **Duty Cycle** | Read-only | Shows the duty cycle on/off cycling |

:::tip Testing Workflows
Set analog input values to simulate temperature changes, then observe how hysteresis, PID, or deadband control elements respond. This is a powerful way to test control logic without real hardware.
:::

## Message Log

The message log shows the raw protocol messages exchanged between BruControl and the mock device. Each entry includes:

- **Direction** — Sent (from BruControl) or Received (from mock)
- **Message** — The protocol string (e.g. `!13,4,50,1000;`)
- **Timestamp** — When the message was exchanged

Use the message log to:

- Verify that BruControl is sending the expected commands
- Debug communication issues or script behavior
- Understand the device protocol format

You can clear the log to focus on recent traffic.

## SignalR Connection

The mock page connects to a dedicated DeviceHub SignalR endpoint:

```
/hubs/device?tcpPort={port}
```

### Events Received on Connect

| Event | Description |
|-------|-------------|
| `DeviceStatus` | Initial device status (name, connection state) |
| `AllPorts` | Full snapshot of all port states |
| `RecentMessages` | Buffered recent protocol messages |

### Ongoing Events

| Event | Description |
|-------|-------------|
| `PortUpdated` | A port value changed (from BruControl command or manual control) |
| `PortDeleted` | A port was removed from the mock device |
| `MessageLogged` | A new protocol message was sent or received |

## Use During Testing

1. Enable mock mode on an interface (right-click interface → Enable Mock Mode).
2. A mock device appears under **Mocks** in the Solution Explorer. Right-click it → **Open Controls (New Tab)**, or navigate to `/mock/{port}`.
3. Run your scripts or interact with the dashboard.
4. Watch port values and messages update in real time.
5. Manually set port values (temperature, SG, analog inputs) to simulate hardware responses.
6. Verify that control elements (hysteresis, PID, deadband) respond correctly to simulated inputs.

## Cross-References

- [Mock Mode](./mock-mode) — Enable/disable mock mode, API endpoint
- [Mocking Overview](./overview) — What mocking is and why to use it
- [Device API](../api/device-api) — Device management endpoints
- [API Overview](../api/overview) — Main hub and mock device hub SignalR reference
