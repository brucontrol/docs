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

## Authentication

The BruControl API is designed for use within a trusted environment (local network or same machine). Authentication behavior depends on the deployment configuration. When security features are enabled, consult the application settings for API access requirements.

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

## API Sections

| Section | Description |
|--------|-------------|
| [Workspace API](./workspace-api) | Workspaces, elements, canvas layout |
| [Element APIs](./element-apis) | Global variables, toggles, buttons, timers, alarms, scripts, charts, profiles, generic elements |
| [Device API](./device-api) | Devices, ports, mock mode, device types, diagnostics |
| [Process API](./process-api) | Scripts (processes), run/stop/resume/step |
| [Settings API](./settings-api) | Application settings |
| [Miscellaneous APIs](./misc-apis) | Widget templates, themes, color sets, logs, version, uptime, explorer folders, data views, chart data, scripting, license, session, security, plugin registry, configurations, system |

## Real-Time Updates

BruControl uses SignalR for real-time updates. Connect to the hub to receive live changes for elements, processes, and devices without polling. See the application source for hub endpoints and message contracts.
