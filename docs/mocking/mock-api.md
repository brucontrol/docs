---
id: mock-api
title: Mock Device REST API
sidebar_position: 4
---

# Mock Device REST API

In addition to the SignalR-based real-time interface documented in [Mock Page](./mock-page.md), mock devices expose a REST API for programmatic control. This enables CI/CD automation, testing scripts, and external tool integration.

## Base URL

All mock device API endpoints are under:

```
/api/v1/mock/
```

Most endpoints include a `{tcpPort}` path parameter that identifies the target mock device by its TCP port number (e.g., `12345`).

---

## Port Management

**Route base:** `/api/v1/mock/device/{tcpPort}/ports`

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | List all ports |
| GET | `/{portNumber}` | Get a specific port |
| PUT | `/{portNumber}/value` | Set port value (decimal) |
| PUT | `/{portNumber}/hydrometer` | Set hydrometer temperature and specific gravity |
| PUT | `/{portNumber}/parameter` | Update a named port parameter |
| POST | `/{portNumber}/name` | Rename a port |
| PUT | `/name-lookup` | Bulk set port names from a lookup dictionary |

### GET `/` — List All Ports

Returns an array of all ports on the device with their current state.

```bash
curl http://localhost:5000/api/v1/mock/device/12345/ports
```

### GET `/{portNumber}` — Get Specific Port

Returns the state of a single port.

```bash
curl http://localhost:5000/api/v1/mock/device/12345/ports/3
```

### PUT `/{portNumber}/value` — Set Port Value

Sets the decimal value of a port. For temperature sensors (`OWTemp`, `SPISensor`), this also updates the `TargetTemperature` parameter. For `AnalogInput`, it updates `BaseValue`.

**Request body:**

```json
{
  "value": 72.5
}
```

**Response:**

```json
{
  "message": "Port value updated",
  "portNumber": 3,
  "value": 72.5
}
```

### PUT `/{portNumber}/hydrometer` — Set Hydrometer Values

Sets both temperature and specific gravity on a Hydrometer port. Returns `400` if the port is not a Hydrometer.

**Request body:**

```json
{
  "temperature": 65.0,
  "specificGravity": 1.048
}
```

**Response:**

```json
{
  "message": "Hydrometer values updated",
  "portNumber": 5,
  "temperature": 65.0,
  "specificGravity": 1.048
}
```

### PUT `/{portNumber}/parameter` — Update Port Parameter

Sets an arbitrary named parameter on a port. The value can be a string, number, or boolean. Sending `{ "name": "ResetCount", "value": true }` on a Counter port resets the counter.

**Request body:**

```json
{
  "name": "BaseValue",
  "value": 512
}
```

**Response:**

```json
{
  "message": "Parameter updated",
  "portNumber": 3,
  "name": "BaseValue",
  "value": 512
}
```

### POST `/{portNumber}/name` — Rename a Port

Sets the display name of a port. The body is a plain JSON string.

**Request body:**

```json
"Fermentation Temp"
```

**Response:**

```json
{
  "message": "Port name updated",
  "portNumber": 3,
  "name": "Fermentation Temp"
}
```

### PUT `/name-lookup` — Bulk Set Port Names

Provides a dictionary of port number → name mappings. Existing ports whose numbers appear in the dictionary are renamed immediately; the lookup is also stored so that newly created ports receive the correct name automatically.

**Request body:**

```json
{
  "portNames": {
    "1": "HLT Temp",
    "2": "Mash Temp",
    "3": "Pump Relay",
    "10": "Boil Valve"
  }
}
```

**Response:**

```json
{
  "message": "Port name lookup dictionary set successfully",
  "totalPortsInLookup": 4,
  "updatedPorts": 3,
  "updatedPortNumbers": [1, 2, 3]
}
```

---

## Communication

**Route base:** `/api/v1/mock/device/{tcpPort}/communication`

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/messages` | Get buffered protocol messages |
| DELETE | `/messages` | Clear the message log |

### GET `/messages` — Get Message Log

Returns recent protocol messages exchanged between BruControl and the mock device. Accepts an optional `limit` query parameter (default `100`).

```bash
curl "http://localhost:5000/api/v1/mock/device/12345/communication/messages?limit=50"
```

### DELETE `/messages` — Clear Message Log

Clears the in-memory message log for the device.

```bash
curl -X DELETE http://localhost:5000/api/v1/mock/device/12345/communication/messages
```

**Response:**

```json
{
  "message": "Message log cleared"
}
```

---

## Device Management

**Route base:** `/api/v1/mock/management`

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/devices` | List all mock devices |
| POST | `/devices` | Create a mock device |
| DELETE | `/devices/{tcpPort}` | Remove a mock device |
| PUT | `/devices/{tcpPort}/name` | Rename a mock device |

### GET `/devices` — List All Devices

Returns summary info for every mock device.

```bash
curl http://localhost:5000/api/v1/mock/management/devices
```

**Response:**

```json
[
  {
    "tcpPort": 12345,
    "name": "Fermentation Controller",
    "isRunning": true,
    "status": "...",
    "portCount": 12
  }
]
```

### POST `/devices` — Create Device

Creates and starts a new mock device on the specified TCP port.

**Request body:**

```json
{
  "tcpPort": 12345,
  "name": "Fermentation Controller"
}
```

`name` is optional. `tcpPort` must be between 1 and 65535 and must not already be in use. Returns `201 Created` on success, `409 Conflict` if a device already exists on that port.

**Response (201):**

```json
{
  "tcpPort": 12345,
  "name": "Fermentation Controller",
  "isRunning": true,
  "status": "...",
  "message": "Device 'Fermentation Controller' created on TCP port 12345"
}
```

### DELETE `/devices/{tcpPort}` — Remove Device

Stops and removes a mock device.

```bash
curl -X DELETE http://localhost:5000/api/v1/mock/management/devices/12345
```

**Response:**

```json
{
  "message": "Device on TCP port 12345 removed successfully"
}
```

### PUT `/devices/{tcpPort}/name` — Rename Device

Updates the display name of a mock device.

**Request body:**

```json
{
  "name": "Boil Kettle Controller"
}
```

**Response:**

```json
{
  "message": "Device on TCP port 12345 renamed to 'Boil Kettle Controller'"
}
```

---

## Device Status

**Route base:** `/api/v1/mock/device/{tcpPort}`

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/status` | Get device status |

### GET `/status` — Get Device Status

Returns the current status object for a mock device.

```bash
curl http://localhost:5000/api/v1/mock/device/12345/status
```

---

## Error Responses

All endpoints return a consistent error shape when something goes wrong:

```json
{
  "message": "Device on TCP port 99999 not found"
}
```

| HTTP Status | Meaning |
|-------------|---------|
| `400` | Bad request — invalid input (empty name, port out of range, wrong port type) |
| `404` | Device or port not found |
| `409` | Conflict — device already exists on the requested TCP port |
| `500` | Internal server error |
