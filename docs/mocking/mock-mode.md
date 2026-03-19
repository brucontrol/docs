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
3. **Via the API** — Send a POST request to toggle mock mode programmatically:

```
POST /api/v1/device/{id}/mock-mode
```

**Request body:**

```json
{ "enable": true }
```

**Response:** `DeviceViewModel` with `mockMode: true`, or `403 Forbidden` if the Professional license is not active.

See the [Device API](../api/device-api#toggle-mock-mode) for full endpoint details.

Mock mode creates a simulator that listens on a TCP port; BruControl connects to it instead of the physical interface (whether serial or TCP).

## Disable Mock Mode

Right-click the interface in the Solution Explorer → **Disable Mock Mode**, use the Mock Mode toggle in the device editor, or call the API with `{ "enable": false }`. Communication returns to the real interface.

## Mock Device in the Solution Explorer

When mock mode is enabled, a **mock device** appears under the **Mocks** folder in the Solution Explorer. The mock device is named after the original interface with a "(Mock)" suffix — for example, "Brew Panel MEGA (Mock)".

Right-click the mock device → **Open Controls (New Tab)** to open the [Mock Page](mock-page.md) where you can inspect and control the simulator.

## TCP Port

Each mock device listens on a unique TCP port assigned when mock mode is activated. This port is visible in the mock device's properties. Use this port to open the mock page directly at `/mock/{port}`.

## Redirect Behavior

| State | Communication |
|-------|----------------|
| **Mock mode OFF** | Normal: BruControl talks to the real serial or TCP interface |
| **Mock mode ON** | Redirected: BruControl talks to the mock simulator on the assigned TCP port |

Scripts, dashboards, and element bindings work the same way. The only difference is the target of communication.

## Real-Time Events

When mock mode is toggled, BruControl broadcasts a `DeviceStatusChanged` SignalR event with the updated `mockMode` property. A `MockDevicesChanged` event is also broadcast so UI components (like the Solution Explorer Mocks folder) can refresh the mock device list.

:::info Professional License
Mock mode requires a Professional license. If you see *"Mock device service requires a Professional license"*, upgrade your license to use this feature.
:::

## Cross-References

- [Mock Page](mock-page.md) — Inspect port state and message log
- [Mocking Overview](./overview) — What mocking is and why to use it
- [Device API](../api/device-api#toggle-mock-mode) — API endpoint for mock mode
- [API Overview](../api/overview) — `MockDevicesChanged` and `DeviceStatusChanged` SignalR events
