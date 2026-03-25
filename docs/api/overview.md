---
id: overview
title: API Overview
sidebar_position: 1
---

# API Overview

The BruControl REST API provides programmatic access to workspaces, elements, devices, processes (scripts), settings, and system information. Use it for automation, integrations, or custom dashboards.

## Base URL

All API endpoints use the base path:

```
/api/v1/
```

When BruControl is running locally, the full base URL is typically:

```
http://localhost:5005/api/v1/
```

The default port is **5005** (configurable in **Settings** → **Services** → API Service Port). For network access, replace `localhost` with the hostname or IP address of the BruControl server.

## OpenAPI / Swagger

BruControl exposes an OpenAPI (Swagger) specification and interactive UI for exploring and testing the API:

| Resource | URL |
|----------|-----|
| Swagger UI | `http://localhost:5005/swagger` |
| OpenAPI JSON | `http://localhost:5005/swagger/v1/swagger.json` |

Swagger and the OpenAPI document require a **Professional license**. Without it, requests to `/swagger` or `/openapi` return `403 Forbidden`.

## Authentication & CSRF

The BruControl API is designed for use within a trusted environment (local network or same machine). The web UI authenticates via a session cookie and CSRF token:

1. **Obtain a session** — Call `GET /api/v1/session`. The server sets an `HttpOnly` session cookie and returns a CSRF token:

```json
{ "csrfToken": "abc123...", "expiresAtUtc": "2026-04-01T00:00:00Z" }
```

2. **Include the CSRF token** — For all mutating requests (`POST`, `PATCH`, `PUT`, `DELETE`), include the `X-CSRF-Token` header with the token from step 1.

3. **Session cookie** — The session cookie is sent automatically by the browser. External API clients must persist cookies across requests.

:::info License-Gated Endpoints
Some endpoints require a specific license tier. These are marked with `[ApiAccess(LicenseType.Professional)]` in the codebase. Calling a gated endpoint without the required license returns `403 Forbidden`.
:::

## Common Patterns

### HTTP Methods

| Method | Purpose |
|-------|---------|
| `GET` | Retrieve one or more resources |
| `POST` | Create a new resource or trigger an action |
| `PATCH` | Partially update an existing resource |
| `PUT` | Replace or reorder resources |
| `DELETE` | Remove a resource |

### List vs. Single Resource

- **List all**: `GET /api/v1/{resource}` — returns an array or paged response
- **Get by ID**: `GET /api/v1/{resource}/{id}` — returns a single resource
- **Create**: `POST /api/v1/{resource}` — returns the created resource (often `201 Created`)
- **Update**: `PATCH /api/v1/{resource}/{id}` — returns the updated resource
- **Delete**: `DELETE /api/v1/{resource}/{id}` — returns `204 No Content` on success

### Paging

Many list endpoints support optional paging via query parameters:

- `page` — 1-based page number
- `pageSize` — items per page (typically 1–1000)

If paging parameters are omitted, the endpoint returns all items.

### PATCH (Partial Update)

PATCH endpoints accept a JSON object with only the fields you want to change. Unspecified fields remain unchanged. Use camelCase for property names.

Example:

```json
{ "name": "New Name", "displayName": "Display" }
```

### IDs

Most resources use GUIDs (e.g. `550e8400-e29b-41d4-a716-446655440000`). Device types use string IDs (e.g. `MEGA`, `ESP32`).

### Error Responses

API errors return an appropriate HTTP status code with a body that is either a plain string or a JSON object:

```json
{ "error": "Description of the problem" }
```

Common status codes: `400` (bad request / validation), `403` (license required), `404` (not found), `409` (conflict), `500` (server error).

## API Sections

| Section | Description |
|--------|-------------|
| [Workspace API](./workspace-api) | Workspaces, elements, canvas layout |
| [Element APIs](./element-apis) | Global variables, toggles, buttons, timers, alarms, scripts, charts, profiles, generic elements |
| [Device API](./device-api) | Devices, ports, mock mode, device types, diagnostics |
| [Process API](./process-api) | Scripts (processes), run/stop/resume/step/load |
| [Settings API](./settings-api) | Application settings |
| [Miscellaneous APIs](./misc-apis) | Element templates, themes, color sets, logs, version, uptime, explorer folders, data views, chart data, scripting, license, session, security, plugin registry, configurations, system, **media**, **file upload**, **data exchange** |

## Real-Time Updates (SignalR)

BruControl uses [SignalR](https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction) for real-time push updates. Connect to the hub to receive live changes for elements, processes, and devices without polling.

### Main Hub

| Property | Value |
|----------|-------|
| **URL** | `/hubs/brucontrol` |
| **Transports** | WebSockets (preferred), Server-Sent Events, Long Polling |
| **Auth** | Session cookie (call `GET /api/v1/session` first) |

### Server Methods (invoke from client)

| Method | Parameters | Description |
|--------|-----------|-------------|
| `SubscribeToAllElements` | — | Receive all element CRUD and value events |
| `UnsubscribeFromAllElements` | — | Stop receiving element events |
| `SubscribeToWorkspace` | `workspaceId` | Receive element events for one workspace |
| `UnsubscribeFromWorkspace` | `workspaceId` | Stop workspace-scoped events |
| `SubscribeToAllProcesses` | — | Receive all process state events |
| `UnsubscribeFromAllProcesses` | — | Stop receiving process events |
| `SubscribeToProcess` | `processId` | Receive events for one process |
| `UnsubscribeFromProcess` | `processId` | Stop single-process events |
| `SubscribeToChartSamples` | `chartId` | Receive live chart data points |
| `UnsubscribeFromChartSamples` | `chartId` | Stop chart sample stream |
| `SubscribeToDataViewSamples` | `dataViewId` | Receive live data view samples |
| `UnsubscribeFromDataViewSamples` | `dataViewId` | Stop data view sample stream |
| `SubscribeToSystemLogs` | — | Subscribe to live system log events |
| `UnsubscribeFromSystemLogs` | — | Unsubscribe from system log events |
| `SubscribeToDeviceDiagnostics` | `deviceId` (Guid) | Subscribe to real-time device communication events for a specific device |
| `UnsubscribeFromDeviceDiagnostics` | `deviceId` (Guid) | Unsubscribe from device communication events |

:::info Initial State on Subscribe
When calling `SubscribeToAllProcesses` or `SubscribeToProcess`, the hub sends the current process state and variables to the caller immediately.
:::

### Client Events (received from server)

**Element events** — For each of the 9 non-device element types (GlobalVariable, ToggleSwitch, Button, Generic, Timer, Alarm, ScriptElement, Chart, Profile), the hub sends `{Type}Updated`, `{Type}Created`, and `{Type}Deleted` events with parameters `(elementId, data)`.

**Device element events** — `DeviceElementUpdated`, `DeviceElementCreated`, `DeviceElementDeleted` for base property changes. Port-specific value changes use `DigitalOutStateChanged`, `DigitalInValueChanged`, `DutyCycleValueChanged`, `PWMOutValueChanged`, `AnalogInValueChanged`, `CounterValueChanged`, `OWTempValueChanged`, `SPISensorValueChanged`, `HydrometerValueChanged`, `HysteresisValueChanged`, `PIDValueChanged`, `DeadbandValueChanged` — each with parameters `(portId, elementId, data)`.

**Fine-grained events:**

| Event | Parameters | Description |
|-------|-----------|-------------|
| `ElementPropertyChanged` | `elementId, elementType, propertyName, newValue` | Single property changed |
| `ElementVisibilityChanged` | `elementId, elementType, visibility` | Visibility state changed |

**Process events:**

| Event | Parameters | Description |
|-------|-----------|-------------|
| `ProcessUpdated` | `processId, data` | Process patched (name, script) |
| `ProcessStateChanged` | `processId, stateData` | Execution state changed (Running/Paused/Stopped) |
| `ProcessVariablesUpdated` | `processId, variables` | Script local variables updated |
| `ProcessOutputReceived` | `processId, text` | Print statement or system message |

**Device & system events:**

| Event | Parameters | Description |
|-------|-----------|-------------|
| `DeviceStatusChanged` | `deviceId, data` | Device connected/disconnected/mock mode changed |
| `MockDevicesChanged` | — | Mock device list changed |

**Chart and data view samples:**

| Event | Parameters | Description |
|-------|-----------|-------------|
| `ChartSampleReceived` | `chartId, channelKey, timestampUnixMs, value, oscillationDutyPercent?, oscillationPeriodMs?` | Live chart data point |
| `DataViewSampleReceived` | `dataViewId, channelKey, timestampUnixMs, value` | Live data view data point |

**Log and diagnostics events:**

| Event | Description |
|-------|-------------|
| `LogEventReceived` | Single system log event (timestamp, level, message, source) |
| `LogEventBatchReceived` | Batch of system log events |
| `DeviceCommEventReceived` | Single device communication event (Rx, Tx, Connected, Disconnected, Error) |
| `DeviceCommEventBatchReceived` | Batch of device communication events (replayed on subscribe) |
| `WebhookCallCompleted` | Webhook dispatch result (webhookName, statusCode, error, durationMs) |

### Mock Device Hub

A separate hub exists for the mock device page:

| Property | Value |
|----------|-------|
| **URL** | `/hubs/device?tcpPort={port}` |

Events: `DeviceStatus`, `AllPorts`, `RecentMessages` (on connect), `PortUpdated`, `PortDeleted`, `MessageLogged` (ongoing).

:::tip Connection Example
```js
import { HubConnectionBuilder } from '@microsoft/signalr';

const connection = new HubConnectionBuilder()
  .withUrl('/hubs/brucontrol', { withCredentials: true })
  .withAutomaticReconnect()
  .build();

await connection.start();
await connection.invoke('SubscribeToAllElements');

connection.on('GlobalVariableUpdated', (elementId, data) => {
  console.log('Variable changed:', elementId, data.value);
});
```
:::
