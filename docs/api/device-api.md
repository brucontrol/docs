---
id: device-api
title: Device API
sidebar_position: 4
---

# Device API

Devices (interfaces) are physical microcontroller boards that connect to BruControl. Each device has ports (pins) that can be configured as digital outputs, digital inputs, duty cycle, PWM, analog input, counter, 1-wire temp, SPI sensor, hydrometer, hysteresis, PID, or deadband. Device elements are the logical representation of a port with a specific type.

## Device Endpoints

### List Devices

```
GET /api/v1/device
```

**Response:** Array of `DeviceViewModel`

### Get Device by ID

```
GET /api/v1/device/{id}
```

**Response:** `DeviceViewModel` or `404 Not Found`

### Create Device

```
POST /api/v1/device
```

**Request body:** `DeviceCreateViewModel` — interface selection, port, device type, etc.

**Response:** `201 Created` with `DeviceViewModel`

### Update Device

```
PATCH /api/v1/device/{id}
```

Partially updates device configuration. Send a JSON object with the fields to change.

**Response:** `DeviceViewModel`

### Delete Device

```
DELETE /api/v1/device/{id}
```

**Response:** `204 No Content` or `404 Not Found`

### Get Available Ports

```
GET /api/v1/device/{id}/available-ports
```

Returns ports available for the device based on its wiring map and supported port types.

**Response:** Array of `SupportedPortViewModel`

### Refresh Device Connection

```
POST /api/v1/device/{id}/refresh
```

Closes and reinitializes the device connection. Use when the device is not communicating but should be — for example, after startup timing issues or a transient network failure.

**Response:** `DeviceViewModel`, `400 Bad Request`, or `404 Not Found`

### Toggle Mock Mode

```
POST /api/v1/device/{id}/mock-mode
```

Enables or disables mock mode for a device. When enabled, creates a mock device instance and redirects communication to it. Requires Professional license.

**Request body:**

```json
{
  "enable": true
}
```

**Response:** `DeviceViewModel` or `403 Forbidden` (license), `404 Not Found`

:::tip Mock Mode
See the [Mocking guide](../mocking/overview) for full details on mock mode, the mock page, and the mock device hub.
:::

## Device Type Endpoints

### List Device Types

```
GET /api/v1/device-type
```

Returns all device type summaries (e.g. MEGA, ESP32).

**Response:** Array of `DeviceTypeSummaryViewModel`

### Get Device Type by ID

```
GET /api/v1/device-type/{id}
```

**Response:** `DeviceTypeViewModel` or `404 Not Found`

### List Device Types (with source)

```
GET /api/v1/device-type/list
```

Returns device types with their source (Registry or UserUpload).

**Response:** `DeviceTypeListResponse` with `items` array

### Device Type Settings

```
GET /api/v1/device-type/settings
PUT /api/v1/device-type/settings
```

Get or update selected firmware version and available versions. GET returns `DeviceTypeSettingsViewModel`; PUT returns `200 OK` with no body.

**PUT body (example):**

```json
{
  "selectedFirmwareVersion": "46.0"
}
```

### Sync Device Types

```
POST /api/v1/device-type/sync
```

Triggers a sync of device types from the registry for the selected firmware version.

**Response:** `200 OK` with `{ "message": "Sync complete" }`

### Upload Device Type

```
POST /api/v1/device-type/upload
```

Uploads `.brumc` file(s) as user overrides. Form data with `files` (multipart).

**Response:** `200 OK` or `400 Bad Request` with validation errors

## Device Port Endpoints

### Get Ports by Device

```
GET /api/v1/device-port/device/{deviceId}
```

**Response:** Array of `DevicePortViewModel`

### Get Port Interface Info

```
GET /api/v1/device-port/{portId}/interface
```

Returns read-only interface details for a port.

**Response:** `DevicePortInterfaceInfoViewModel`

### Patch Port

```
PATCH /api/v1/device-port/{portId}
```

Enable or disable a port. Uses mutual-exclusion rules for ports sharing the same hardware pin.

**Request body (example):**

```json
{
  "enabled": true
}
```

**Response:** `200 OK` with `{ "portId": "...", "enabled": true }`

### Port-Type-Specific Endpoints

Ports can be retrieved by type. Only digital output has a type-specific PATCH route; for all other types, use the generic `PATCH /api/v1/device-port/{portId}`.

- `GET /api/v1/device-port/digitalinput/{portId}`
- `GET /api/v1/device-port/digitaloutput/{portId}` — `PATCH` also available at `PATCH /api/v1/device-port/digitaloutput/{portId}`
- `GET /api/v1/device-port/dutycycle/{portId}`
- `GET /api/v1/device-port/pwmoutput/{portId}`
- `GET /api/v1/device-port/analoginput/{portId}`
- `GET /api/v1/device-port/counter/{portId}`
- `GET /api/v1/device-port/owtemp/{portId}`
- `GET /api/v1/device-port/spisensor/{portId}`
- `GET /api/v1/device-port/hydrometer/{portId}`
- `GET /api/v1/device-port/hysteresis/{portId}`
- `GET /api/v1/device-port/pid/{portId}`
- `GET /api/v1/device-port/deadband/{portId}`

### Calibrations

- `GET /api/v1/device-port/{portId}/calibrations` — Returns calibrated values with their calibration chains.
- `PUT /api/v1/device-port/{portId}/calibrations/{calibratedValueName}` — Replaces the full calibration chain and display settings for a calibrated value. Body: `{ calibrations: [...], prefix?, suffix?, precision?, previewReverse? }`.

Calibrations apply to analog input, 1-wire temp, SPI sensor, and hydrometer port types.

## Device Diagnostics

```
GET /api/v1/device/{deviceId}/diagnostics/messages?limit=100
DELETE /api/v1/device/{deviceId}/diagnostics/messages
POST /api/v1/device/{deviceId}/diagnostics/transmit
POST /api/v1/device/{deviceId}/diagnostics/suspend
GET /api/v1/device/{deviceId}/diagnostics/suspend
POST /api/v1/device/{deviceId}/diagnostics/reconfigure
```

- **messages** — Buffered diagnostic messages; GET returns events (optional `?limit=` query param), DELETE clears buffer
- **transmit** — Sends a raw message to the device. Body: `{ "message": "!13,4,50,1000;" }`
- **suspend** — GET returns current suspend state `{ "suspended": true|false }`; POST sets it with body `{ "suspended": true }`
- **reconfigure** — Triggers port invalidation/reconfigure on the device

## Device Element API

Device elements (the logical elements tied to device ports) are managed via `DeviceElementController` at base route `api/v1/device-element`.

### Generic Endpoints

```
GET    /api/v1/device-element
GET    /api/v1/device-element/{id}
PATCH  /api/v1/device-element/{id}
DELETE /api/v1/device-element/{id}
```

- **GET** (list) — Returns array of `DeviceElementFlatViewModel`
- **GET** (by id) — Returns `DeviceElementFlatViewModel` or `404 Not Found`
- **PATCH** — Partially updates element. Send JSON object with fields to change. Returns `DeviceElementFlatViewModel`
- **DELETE** — Returns `204 No Content` or `404 Not Found`

### Get Available Inputs

```
GET /api/v1/device-element/{id}/available-inputs
```

Returns the available input ports for a control element (Hysteresis, PID, Deadband). The response lists configured AnalogInput, OWTemp, and SPISensor ports on the same device that can serve as input sources.

**Response:** Array of `AvailableInputPortViewModel`:

```json
[
  { "id": "port-guid", "name": "AnalogInput A0", "portType": "AnalogInput" },
  { "id": "port-guid", "name": "OWTemp 1", "portType": "OWTemp" }
]
```

Returns `404` if the device element is not found. Returns an empty array if no suitable input ports exist.

### Type-Specific Endpoints (12 device element types)

Each of the 12 device element types has dedicated endpoints for create, list, get-by-id, and patch. Use type-specific GET/PATCH when you need the full detail view model (port value, calibrations, type-specific properties).

| Element Type | POST (create) | GET (list) | GET (by id) | PATCH |
|--------------|---------------|------------|-------------|-------|
| Digital Input | `POST /api/v1/device-element/digitalinput` | `GET /api/v1/device-element/digitalinput` | `GET /api/v1/device-element/digitalinput/{id}` | `PATCH /api/v1/device-element/digitalinput/{id}` |
| Digital Output | `POST /api/v1/device-element/digitaloutput` | `GET /api/v1/device-element/digitaloutput` | `GET /api/v1/device-element/digitaloutput/{id}` | `PATCH /api/v1/device-element/digitaloutput/{id}` |
| Duty Cycle | `POST /api/v1/device-element/dutycycle` | `GET /api/v1/device-element/dutycycle` | `GET /api/v1/device-element/dutycycle/{id}` | `PATCH /api/v1/device-element/dutycycle/{id}` |
| Hysteresis | `POST /api/v1/device-element/hysteresis` | `GET /api/v1/device-element/hysteresis` | `GET /api/v1/device-element/hysteresis/{id}` | `PATCH /api/v1/device-element/hysteresis/{id}` |
| PID | `POST /api/v1/device-element/pid` | `GET /api/v1/device-element/pid` | `GET /api/v1/device-element/pid/{id}` | `PATCH /api/v1/device-element/pid/{id}` |
| Deadband | `POST /api/v1/device-element/deadband` | `GET /api/v1/device-element/deadband` | `GET /api/v1/device-element/deadband/{id}` | `PATCH /api/v1/device-element/deadband/{id}` |
| Analog Input | `POST /api/v1/device-element/analoginput` | `GET /api/v1/device-element/analoginput` | `GET /api/v1/device-element/analoginput/{id}` | `PATCH /api/v1/device-element/analoginput/{id}` |
| PWM Output | `POST /api/v1/device-element/pwmoutput` | `GET /api/v1/device-element/pwmoutput` | `GET /api/v1/device-element/pwmoutput/{id}` | `PATCH /api/v1/device-element/pwmoutput/{id}` |
| Counter | `POST /api/v1/device-element/counter` | `GET /api/v1/device-element/counter` | `GET /api/v1/device-element/counter/{id}` | `PATCH /api/v1/device-element/counter/{id}` |
| OW Temp | `POST /api/v1/device-element/owtemp` | `GET /api/v1/device-element/owtemp` | `GET /api/v1/device-element/owtemp/{id}` | `PATCH /api/v1/device-element/owtemp/{id}` |
| SPI Sensor | `POST /api/v1/device-element/spisensor` | `GET /api/v1/device-element/spisensor` | `GET /api/v1/device-element/spisensor/{id}` | `PATCH /api/v1/device-element/spisensor/{id}` |
| Hydrometer | `POST /api/v1/device-element/hydrometer` | `GET /api/v1/device-element/hydrometer` | `GET /api/v1/device-element/hydrometer/{id}` | `PATCH /api/v1/device-element/hydrometer/{id}` |

**Create request body:** `DeviceElementCreateViewModel` (workspaceId, portId, displayName, etc.)

**Delete:** Use the generic `DELETE /api/v1/device-element/{id}` for all types. There is no type-specific delete endpoint.

## Cross-References

- [Element APIs](./element-apis) — Non-device elements (dashboard)
- [Process API](./process-api) — Script execution
- [Mocking](../mocking/overview) — Mock mode for testing without hardware
