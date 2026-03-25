---
id: mcp
title: MCP Server (AI Integration)
sidebar_position: 8
---

# MCP Server (AI Integration)

BruControl includes a [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server that enables AI assistants — Claude, Cursor, GitHub Copilot, and others — to interact with your automation system programmatically. Through MCP, an AI agent can list workspaces, read sensor values, toggle outputs, run scripts, configure devices, and more, all via structured tool calls rather than raw HTTP requests.

## Requirements

- **Professional license** required (enforced by the API access middleware).
- BruControl must be running with the API service enabled.
- The MCP endpoint is served at **`/mcp`** using Streamable HTTP transport.

## Setup

### Connecting an MCP Client

Point your MCP-compatible client at the BruControl server's `/mcp` endpoint. The transport is **Streamable HTTP** (the standard for web-hosted MCP servers).

#### Cursor / Claude Desktop

Add an entry to your MCP client configuration (e.g. `~/.cursor/mcp.json` or Claude Desktop settings):

```json
{
  "mcpServers": {
    "brucontrol": {
      "url": "http://localhost:5005/mcp"
    }
  }
}
```

Replace `localhost:5005` with your BruControl server's address and port if different.

#### Authentication

The MCP endpoint is protected by the same access-control middleware as the REST API. If your BruControl instance requires authentication, your MCP client must present a valid session. In practice this means:

1. **Session cookie** — Obtain a session by logging in through the BruControl web UI or the `/api/v1/auth/login` endpoint, then include the session cookie in MCP requests.
2. **CSRF token** — For state-changing operations, include the `X-CSRF-TOKEN` header (same as the REST API).

If authentication is disabled in settings, the MCP endpoint is open to any client on the network.

## Available Tools

BruControl registers **48 MCP tools** organized into the categories below. Every tool returns a JSON object; on failure the object contains an `error` field with a descriptive message.

### Workspaces

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `list_workspaces` | List all workspaces with id, name, and element count. Supports pagination. | `page` (int, default 1), `pageSize` (int, default 50) |
| `get_elements` | Get elements in a workspace. Optionally filter by type. | `workspaceId` (guid, **required**), `typeFilter` (string) |
| `list_all_elements` | List all elements across all workspaces. Optionally filter by type. | `typeFilter` (string) |

`typeFilter` accepts: `Button`, `Timer`, `Alarm`, `GlobalVariable`, `Script`, `Profile`, `Chart`, `DeviceElement`, `ToggleSwitch`, `Generic`.

### Elements

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `get_element` | Get a single element by ID with full details including all properties. | `elementId` (guid, **required**) |
| `patch_element` | Partially update an element. Accepts a JSON patch object. | `elementId` (guid, **required**), `patchDataJson` (string, **required**) |
| `create_element` | Create a new element in a workspace. | `workspaceId` (guid, **required**), `elementType` (string, **required**) |
| `delete_element` | Delete an element by ID. | `elementId` (guid, **required**) |
| `duplicate_element` | Duplicate a non-device element. Creates a copy with a unique name in the same workspace. | `elementId` (guid, **required**) |
| `trigger_button` | Trigger a button element (momentary press — sets state to true). | `elementId` (guid, **required**) |

**`patch_element` fields:** `name`, `displayName`, `userControl`, `visibility` (0=Visible, 1=Hidden, 2=Collapsed), or any dynamic property key. For Button elements, `state` (bool) can be set. For GlobalVariable, use `variableType` with exact names: `Boolean`, `String`, `Value`, `TimeSpan`, `DateTime`.

**`create_element` types:** `Button`, `Generic`, `Timer`, `Alarm`, `GlobalVariable`, `Script`, `Profile`, `Chart`, `ToggleSwitch`. DeviceElement is not supported (requires device/port setup — use `create_device_element` instead).

### Scripts (Processes)

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `get_processes` | List all scripts with id, name, and state. Supports pagination. | `page` (int, default 1), `pageSize` (int, default 50) |
| `get_process` | Get a single script by ID with full details including script code. | `processId` (guid, **required**) |
| `create_process` | Create a new empty script. Use `patch_process` to set the code and name. | — |
| `start_process` | Start (run) a script by ID. | `processId` (guid, **required**) |
| `stop_process` | Stop a running or paused script by ID. | `processId` (guid, **required**) |
| `patch_process` | Partially update a script. | `processId` (guid, **required**), `patchDataJson` (string, **required**) |

**`patch_process` fields:** `name`, `script` (the code that runs), `userControl`, `autoStart`, `folder`, `order`.

### Devices

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `list_devices` | List all devices with id, name, connected, enabled, mockMode, typeName, interfaceType, wiringMap. | — |
| `get_device` | Get a device by ID with full details. | `deviceId` (guid, **required**) |
| `create_device` | Create a new device from a JSON configuration. | `createViewModelJson` (string, **required**) |
| `patch_device` | Partially update a device by ID. | `deviceId` (guid, **required**), `patchDataJson` (string, **required**) |
| `delete_device` | Delete a device and its configuration. | `deviceId` (guid, **required**) |
| `get_device_available_ports` | Get available ports for a device based on its wiring map, with supported types and in-use info. | `deviceId` (guid, **required**) |
| `toggle_device_mock_mode` | Enable or disable mock mode for a device (testing without hardware). | `deviceId` (guid, **required**), `enable` (bool, **required**) |

**`create_device` JSON fields:** `name`, `typeName`, `wiringMap`, `interfaceType` (`Tcp` or `Serial`).

**`patch_device` fields:** `name`, `enabled`, `address`, `port`, etc.

### Device Elements

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `list_device_elements` | List all device elements. Optionally filter by device. | `deviceId` (guid) |
| `get_device_element` | Get a device element by ID with full type-specific details. | `elementId` (guid, **required**) |
| `create_device_element` | Create a device element on a specific device port. | `workspaceId` (guid, **required**), `deviceId` (guid, **required**), `port` (int, **required**), `portType` (string, **required**) |
| `patch_device_element` | Partially update a device element by ID. Routes to type-specific patch logic. | `elementId` (guid, **required**), `patchDataJson` (string, **required**) |
| `delete_device_element` | Delete a device element by ID. | `elementId` (guid, **required**) |

**Supported `portType` values:** `DigitalInput`, `DigitalOutput`, `DutyCycle`, `Hysteresis`, `PID`, `Deadband`, `AnalogInput`, `PWMOutput`, `Counter`, `OWTemp`, `SPISensor`, `Hydrometer`.

### Ports

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `get_device_ports` | Get all ports for a device (id, deviceId, number, enabled, etc.). | `deviceId` (guid, **required**) |
| `get_port_interface_info` | Get read-only interface metadata for a port (portNumber, deviceName, deviceConnected, portEnabled). | `portId` (guid, **required**) |
| `patch_port` | Partially update a port. Currently supports `enabled` (bool) only. | `portId` (guid, **required**), `patchDataJson` (string, **required**) |

### Device Diagnostics

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `get_device_diagnostics_messages` | Get buffered diagnostic messages for a device. | `deviceId` (guid, **required**), `limit` (int) |
| `clear_device_diagnostics_messages` | Clear the diagnostic message buffer for a device. | `deviceId` (guid, **required**) |
| `device_diagnostics_transmit` | Send a raw message to a connected device. | `deviceId` (guid, **required**), `message` (string, **required**) |
| `device_diagnostics_suspend` | Suspend or resume a device's normal communications. | `deviceId` (guid, **required**), `suspended` (bool, **required**) |
| `device_diagnostics_get_suspend_state` | Get the current suspend state of a device. | `deviceId` (guid, **required**) |
| `device_diagnostics_reconfigure` | Trigger a reconfigure (invalidate ports) on a device. | `deviceId` (guid, **required**) |

### Device Types

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `list_device_types` | List all available device types (id, name, connections). | — |
| `get_device_type` | Get a device type by ID with full details including connections, serial options, and analog options. | `id` (string, **required**) |

### Settings

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `get_settings` | Get application settings (general, security, mocking, etc.). | — |
| `patch_settings` | Partially update application settings. Supports nested keys like `mocking.enabled`, `general.themeId`. | `patchDataJson` (string, **required**) |

### Logs

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `search_logs` | Search log files with optional filters. Returns paginated events. | `text` (string), `level` (string), `levels` (string), `from` (datetime), `to` (datetime), `skip` (int, default 0), `take` (int, default 100) |
| `list_log_files` | List available log files (name, sizeBytes, lastModified). | — |
| `get_log_file_content` | Get content of a log file by name. Truncated to 100 KB if larger. | `fileName` (string, **required**) |

### System

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `get_uptime` | Get server uptime. Returns `startedAtUtc` (ISO 8601). | — |
| `get_version` | Get application version and update status (current, latest, updateAvailable, releaseNotesUrl). | `beta` (bool, default false) |
| `get_port_status` | Get port status across connected devices (anyConnectedEnabledPorts, anyConnectedDisabledPorts). | — |
| `disable_all_ports` | Disable all enabled ports on all connected devices. Returns count of disabled ports. | — |
| `shutdown` | Initiate graceful application shutdown. Optionally disables all ports first. | `disableAll` (bool) |

## Error Handling

All tools follow a consistent error pattern. On success, results include the relevant data fields. On failure, the response contains a single `error` field:

```json
{ "error": "Workspace '00000000-0000-0000-0000-000000000000' not found" }
```

Common error scenarios:
- **Not found** — the requested resource ID does not exist.
- **Invalid JSON** — a `patchDataJson` or `createViewModelJson` parameter could not be parsed.
- **Missing required parameter** — a required field was not supplied.
- **License restriction** — Professional license is not active.

## Security Considerations

- The MCP endpoint is subject to the same access-control middleware as the REST API. A valid session or Professional license API access is required.
- State-changing tools (`patch_*`, `create_*`, `delete_*`, `start_process`, `stop_process`, `shutdown`, etc.) carry the same authorization requirements as their REST API counterparts.
- The `shutdown` and `disable_all_ports` tools are destructive operations — AI agents should confirm intent before calling them.
- `device_diagnostics_transmit` sends raw data to hardware; use with caution.

## Relationship to the REST API

The MCP tools delegate to the same API layer (`IProcessApi`, `IWorkspaceApi`, `IDeviceApi`, etc.) used by the REST controllers. They are functionally equivalent — the MCP server is a structured interface over the same operations. If you need capabilities not yet exposed via MCP (such as setting digital output port values), fall back to the [REST API](./overview.md).
