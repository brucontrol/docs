---
id: element-apis
title: Element APIs
sidebar_position: 3
---

# Element APIs

Non-device elements are dashboard elements that display data, trigger actions, or link to scripts. Each element type has its own API route. All element APIs follow the same patterns: list, get by ID, create, patch, delete, and optional web-appearance endpoints.

## Element Types and Routes

| Element Type | Route | Create Path |
|--------------|-------|-------------|
| Global Variable | `/api/v1/global-variable` | `POST /workspace/{workspaceId}` |
| Toggle Switch | `/api/v1/toggle-switch` | `POST /workspace/{workspaceId}` |
| Button | `/api/v1/button` | `POST /workspace/{workspaceId}` |
| Generic | `/api/v1/generic` | `POST /workspace/{workspaceId}` |
| Timer | `/api/v1/timer` | `POST /workspace/{workspaceId}` |
| Alarm | `/api/v1/alarm` | `POST /workspace/{workspaceId}` |
| Script Element | `/api/v1/script-element` | `POST /workspace/{workspaceId}` |
| Profile | `/api/v1/profile` | `POST /workspace/{workspaceId}` |
| Chart | `/api/v1/chart` | `POST /workspace/{workspaceId}` |

## Common Patterns

### List Elements

```
GET /api/v1/{element-type}
GET /api/v1/{element-type}?page=1&pageSize=50
```

Returns all elements or a paged result. Paging is optional. When paging is used, `page` must be ≥ 1 and `pageSize` must be between 1 and 1000.

### Get Element by ID

```
GET /api/v1/{element-type}/{id}
```

### Create Element

```
POST /api/v1/{element-type}/workspace/{workspaceId}
```

Creates a new element in the specified workspace. No request body required for most types. Returns `201 Created` with the new element.

### Update Element

```
PATCH /api/v1/{element-type}/{id}
```

Send a JSON object with the fields to update. Native properties (e.g. `value`, `state`, `variableName`) and custom properties (from the element template) can be patched.

### Delete Element

```
DELETE /api/v1/{element-type}/{id}
```

Returns `204 No Content` on success.

### Web Appearance

All element types support:

```
GET /api/v1/{element-type}/{id}/web-appearance?themeId={themeId}
PATCH /api/v1/{element-type}/{id}/web-appearance?themeId={themeId}
```

Web appearance stores position (X, Y), size (Width, Height), Z-order, and rotation per theme.

**Batch web appearances:** All element types support `POST /api/v1/{element-type}/batch-web-appearances?themeId={themeId}` with body `{ "elementIds": ["guid1", "guid2", ...] }` (element IDs as GUID strings) to fetch multiple web appearances in one request.

## Common Patchable Fields

All element types share these patchable base properties:

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Internal name |
| `displayName` | string | Display label on the dashboard |
| `userControl` | boolean | Whether end users can interact with this element |
| `visibility` | int | `0` = Visible, `1` = Hidden, `2` = Collapsed |
| `elementTemplateId` | GUID / null | Assign or change the element template; rebuilds element appearance |
| `uiControls` | string / null | JSON string defining custom UI controls; rebuilds element schema |

:::warning Reserved Field Names
The following field names are reserved and cannot be used as custom properties: `id`, `workspaceId`, `enabled`. Attempting to patch these returns `400 Bad Request`.
:::

:::info Null Patch Behavior
Setting a custom property to `null` in a PATCH request removes that property from the element. This only applies to custom (dynamic) properties — native properties cannot be removed.
:::

## Element-Specific Notes

### Global Variable

- **Route:** `/api/v1/global-variable`
- **Native properties:** `value`, `variableName`, `variableType`, `precision`, `format`, `enableHistoricalLogging`, `loggingIntervalSeconds`, `maxSilenceSeconds`

### Toggle Switch

- **Route:** `/api/v1/toggle-switch`
- **Native properties:** `state` (boolean)

### Button

- **Route:** `/api/v1/button`
- **Native properties:** `state` (momentary)

### Timer

- **Route:** `/api/v1/timer`
- **Native properties:** `value` (current timer value, hh:mm:ss), `resetValue`, `type` (CountUp/CountDown), `initRunning`, `format`, `isRunning`, `reset`, `alarms`, `enableHistoricalLogging`, `loggingIntervalSeconds`, `maxSilenceSeconds`

### Alarm

- **Route:** `/api/v1/alarm`
- **Native properties:** `active` (boolean — whether alarm is triggered), `soundFile`, `loop`, `digitalOutputId`, `enableHistoricalLogging`, `loggingIntervalSeconds`, `maxSilenceSeconds`

:::warning Alarm Properties Update
The patchable properties for Alarm are `active`, `soundFile`, `loop`, `digitalOutputId`, `enableHistoricalLogging`, `loggingIntervalSeconds`, and `maxSilenceSeconds`. Fields such as `sound`, `soundFile2`, `soundFile3`, `zeroFileIndex`, and `fileIndex` are not valid patch targets.
:::

### Script Element

- **Route:** `/api/v1/script-element`
- **Native properties:** `processId`, `variableName`
- Links to a Process (script). Use [Process API](./process-api) for run/stop/pause/resume.

### Chart

- **Route:** `/api/v1/chart`
- **Native properties:** `channels`, `spanSeconds`, `refreshInterval`, `hGridLines`, `vGridLines`, `xAxisColor`

### Profile

- **Route:** `/api/v1/profile`
- **Native properties:** `sourceId`, `sourceProperty`, `destinationId`, `destinationProperty`, `directional`, `table` (threshold, valueIncreasing, valueDecreasing)

### Generic

- **Route:** `/api/v1/generic`
- Flexible container; custom properties only (from element template)

## Duplicate Element

```
POST /api/v1/element/{id}/duplicate
```

Duplicates a non-device element. Creates a copy with a unique name (e.g. "(1)", "(2)"), same workspace, copied properties, and web appearances with X/Y offset.

**Response:** `201 Created` with body:

```json
{
  "id": "new-element-guid",
  "elementType": "toggleSwitch"
}
```

**Supported types:** global-variable, toggle-switch, button, generic, timer, alarm, script-element, profile, chart. Device elements are not supported; use the [Device API](./device-api) for device management.

## Cross-References

- [Workspace API](./workspace-api) — Manage workspaces that contain elements
- [Device API](./device-api) — Device elements (hardware-bound)
- [Settings API](./settings-api) — Application-level configuration
- [API Overview](./overview) — SignalR events for real-time element updates
