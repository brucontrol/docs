---
id: workspace-api
title: Workspace API
sidebar_position: 2
---

# Workspace API

Manage workspaces, which are containers for dashboard elements. Each workspace has its own canvas layout and can contain global variables, toggle switches, buttons, timers, alarms, script elements, charts, profiles, generic elements, and device elements.

**Implementation:** `WorkspaceController` uses `IWorkspaceApi` for list/get operations, `IWorkspaceService` for create, update, delete, reorder, move-element, and clear, and `IWorkspaceWebAppearanceService` for web appearance.

## Endpoints

### List Workspaces

```
GET /api/v1/workspace
```

Returns all workspaces or a paged result.

**Query parameters (optional):**

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | int | 1-based page number |
| `pageSize` | int | Items per page (1–1000) |

**Response:** Array of `WorkspaceViewModel` or `PagedResponse<WorkspaceViewModel>`

### Get Workspace by ID

```
GET /api/v1/workspace/{id}
```

**Response:** `WorkspaceViewModel` or `404 Not Found`

### Create Workspace

```
POST /api/v1/workspace
```

Creates a new workspace with an auto-generated name. No request body required.

**Response:** `201 Created` with `WorkspaceViewModel` in body and `Location` header

### Update Workspace

```
PATCH /api/v1/workspace/{id}
```

Partially updates a workspace. Send a JSON object with the fields to change.

**Request body (example):**

```json
{
  "name": "Brew House",
  "displayName": "Brew House Dashboard"
}
```

**Response:** `WorkspaceViewModel`

### Reorder Workspaces

```
PUT /api/v1/workspace/reorder
```

Reorders workspaces by the given list of IDs. Sets `SortOrder` based on position.

**Request body:**

```json
[ "guid-1", "guid-2", "guid-3" ]
```

**Response:** `200 OK`

### Move Element to Workspace

```
POST /api/v1/workspace/{workspaceId}/move-element
```

Moves an element from its current workspace to the target workspace.

**Request body:**

```json
{
  "elementId": "550e8400-e29b-41d4-a716-446655440000"
}
```

Optional: `elementType` (e.g. `"toggleSwitch"`, `"button"`) for validation.

**Response:** `200 OK`, `400 Bad Request` (null body or validation error), or `404 Not Found` (workspace or element not found)

### Clear Workspace

```
POST /api/v1/workspace/{id}/clear
```

Removes all elements from the workspace. Does not delete the workspace itself.

**Response:** `200 OK` or `404 Not Found`

### Delete Workspace

```
DELETE /api/v1/workspace/{id}
```

**Response:** `204 No Content` or `404 Not Found`

### Get Workspace Web Appearance

```
GET /api/v1/workspace/{id}/web-appearance?themeId={themeId}
```

Returns canvas position, zoom level, and lock/edit permissions for a workspace in a given theme.

**Query parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `themeId` | Guid | Yes | Theme ID |

**Response:** `WorkspaceWebAppearanceViewModel`

### Update Workspace Web Appearance

```
PATCH /api/v1/workspace/{id}/web-appearance?themeId={themeId}
```

Updates or creates the web appearance for a workspace. Upsert operation.

**Request body (example):**

```json
{
  "canvasX": 0,
  "canvasY": 0,
  "zoomLevel": 1,
  "isCanvasLocked": false,
  "allowEditButton": true,
  "allowLayerControls": true,
  "allowDrag": true,
  "allowResize": true,
  "allowZoom": true,
  "allowPan": true
}
```

**Response:** `WorkspaceWebAppearanceViewModel`
