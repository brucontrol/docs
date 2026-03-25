# Device Diagnostics

The Device Diagnostics page provides real-time monitoring of hardware communication for debugging connection issues, protocol problems, and device behavior. It streams every byte exchanged between BruControl and a device so you can watch Rx/Tx traffic, spot errors, and send raw test messages without leaving the browser.

## Accessing Diagnostics

| Method | Path / Action |
|--------|---------------|
| Direct URL | `/device/:deviceId/diagnostics` |
| Solution Explorer | Right-click an interface → **Open Diagnostics** |

The page header shows the device name and connection state. A **Back** button returns to the previous view.

## Live Communication Stream

The **Live** tab displays a scrolling log of communication events in real time. Each entry contains a timestamp (down to milliseconds), a message type badge, and the raw message text.

### Message Types

| Badge | Type | Meaning |
|-------|------|---------|
| **RX** | `Rx` | Data received from the device |
| **TX** | `Tx` | Data transmitted to the device |
| **ERR** | `Error` | Communication error |
| **CON** | `Connected` | Device connection established |
| **DIS** | `Disconnected` | Device connection lost |
| **GEN** | `General` | General informational message |

### Filtering

- **Type filter chips** — click one or more type badges in the toolbar to show only those message types.
- **Text search** — free-text filter applied against the message body (case-insensitive).

### Stream Controls

| Control | Behavior |
|---------|----------|
| **Pause / Resume** | Pauses the live display. Events received while paused are buffered (up to 1 000) and flushed on resume. |
| **Clear** | Clears the on-screen log *and* the server-side message buffer. |
| **↓ Bottom** | Scrolls to the latest entry and re-enables auto-scroll. |

Auto-scroll is active by default and disables automatically when you scroll up.

## History Tab

The **History** tab searches the system log store for historical log entries associated with the device. Results depend on per-device historical logging being enabled in the element configuration.

## Raw Transmit

At the bottom of the Live tab, a text input lets you send a raw protocol message directly to the device (`Device.Write`). Type a message and press **Enter** or click **Send**. The input is disabled when the device is disconnected.

## Suspend / Resume Communications

Click **Suspend Comms** to temporarily stop the device's normal communication polling. This is useful when you need exclusive access to the serial port for raw transmit testing. The button toggles to **Resume Comms** while suspended, and the status bar shows "Comms suspended."

## Reconfigure

Click **Reconfigure** to force a device reconfiguration (invalidate ports). This causes BruControl to tear down and re-establish the communication channel.

## REST API

All endpoints are under `api/v1/device/{deviceId}/diagnostics`.

### GET /messages

Returns buffered diagnostic messages.

| Parameter | In | Type | Description |
|-----------|----|------|-------------|
| `deviceId` | path | `Guid` | Device identifier |
| `limit` | query | `int?` | Max messages to return (optional) |

**Response:** `200` — `DeviceCommEventDto[]`

### DELETE /messages

Clears the server-side diagnostic message buffer.

**Response:** `204 No Content`

### POST /transmit

Sends a raw message to the device.

**Request body:**

```json
{ "message": "string" }
```

**Responses:** `200 OK` on success, `400 Bad Request` if message is empty, `404 Not Found` if device not found.

### GET /suspend

Returns the current suspend state.

**Response:**

```json
{ "suspended": true }
```

### POST /suspend

Sets the suspend state.

**Request body:**

```json
{ "suspended": true }
```

**Response:**

```json
{ "suspended": true }
```

### POST /reconfigure

Triggers a reconfigure (invalidate ports) on the device.

**Response:** `200 OK`

## SignalR Events

The live stream uses the shared `BruControlHub` SignalR connection.

### Subscription

| Method | Direction | Description |
|--------|-----------|-------------|
| `SubscribeToDeviceDiagnostics(deviceId)` | Client → Server | Start receiving events for the given device |
| `UnsubscribeFromDeviceDiagnostics(deviceId)` | Client → Server | Stop receiving events |

The `useDeviceDiagStream` hook manages subscription automatically when the page mounts and unsubscribes on unmount. If the hub reconnects, it re-subscribes via a 500 ms polling interval.

### Server-Pushed Events

| Event | Payload | Description |
|-------|---------|-------------|
| `DeviceCommEventReceived` | Single `DeviceCommEventDto` | Fired for individual communication events |
| `DeviceCommEventBatchReceived` | `DeviceCommEventDto[]` | Fired when multiple events are available in a single tick |

### DeviceCommEventDto

```json
{
  "deviceId": "guid",
  "type": "Rx | Tx | Error | Connected | Disconnected | General",
  "timestamp": "ISO 8601",
  "message": "string"
}
```

### Client-Side Buffering

The frontend retains a maximum of **1 000 events** in memory. When paused, incoming events are buffered separately and merged on resume, applying the same cap.
