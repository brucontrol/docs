---
id: misc-apis
title: Miscellaneous APIs
sidebar_position: 7
---

# Miscellaneous APIs

Additional APIs for element templates, themes, color sets, logs, version, uptime, explorer folders, data views, chart data, scripting, security, session, license, configuration, plugin registry, system, media, file management, and data exchange.

## Element Templates (`ElementTemplateController`)

```
GET    /api/v1/element-template
GET    /api/v1/element-template?elementType=globalVariable-value
GET    /api/v1/element-template/:id
GET    /api/v1/element-template/default-starters
GET    /api/v1/element-template/defaults
PUT    /api/v1/element-template/defaults
POST   /api/v1/element-template
POST   /api/v1/element-template/batch
POST   /api/v1/element-template/:id/duplicate
POST   /api/v1/element-template/:templateId/sync-element
PUT    /api/v1/element-template/:id
DELETE /api/v1/element-template/:id
```

- **GET** — List templates (optional `elementType` filter) or get by ID
- **default-starters** — Default source files keyed by element type for the element template editor
- **defaults** — Map of element type → default template ID
- **PUT defaults** — Set user-configured default template IDs (body: `{ "elementType": "templateId", ... }`)
- **batch** — Get multiple templates by ID. Body: `{ "ids": ["id1", "id2"] }`
- **POST** — Create template (JSON body with name, elementType, sourceFiles, etc.)
- **duplicate** — Duplicate an existing template into a new editable custom template
- **sync-element** — Sync a single element with its element template. Body: `{ "elementType": "...", "elementId": "guid" }`
- **PUT** — Update template (not PATCH; built-in templates cannot be modified)
- **DELETE** — Delete template (built-in templates cannot be deleted)

## Themes (`ThemeController`)

```
GET    /api/v1/theme
GET    /api/v1/theme/:id
POST   /api/v1/theme
PATCH  /api/v1/theme/:id
DELETE /api/v1/theme/:id
GET    /api/v1/theme/:id/layout/:layoutType
PATCH  /api/v1/theme/:id/layout/:layoutType
```

- Themes define layout configurations (e.g. Desktop vs Mobile)
- **layout** — Layout appearance for a theme. `layoutType` examples: `scriptPanel`, `appLayout`
- **PATCH layout** body: `{ "layoutJson": "..." }`
- Default themes cannot be deleted

## Color Sets (`ThemeColorSetController`)

```
GET    /api/v1/color-set
GET    /api/v1/color-set/:id
POST   /api/v1/color-set
POST   /api/v1/color-set/duplicate
PATCH  /api/v1/color-set/:id
DELETE /api/v1/color-set/:id
```

- Color sets define the color palette for themes
- **POST** body: `{ "name": "..." }`
- **duplicate** body: `{ "sourceId": "guid", "name": "..." }`
- Built-in color sets cannot be edited; duplicate to create your own version

## Logs (`LogSearchController`)

```
GET /api/v1/logs/search
GET /api/v1/logs/files
GET /api/v1/logs/files/:fileName/content
GET /api/v1/logs/files/:fileName
```

- **search** — Search log files. Query params: `text`, `level`, `levels`, `from`, `to`, `skip`, `take`
- **files** — List available log files
- **files/:fileName/content** — Get log file content (truncated to 100KB if larger)
- **files/:fileName** — Download log file (returns file stream)

## Version (`VersionController`)

```
GET /api/v1/version
GET /api/v1/version?beta=true
```

Returns version check result (current version, latest version, update available). Use `beta=true` for beta channel.

**Response:** `VersionCheckResult`

## Uptime (`UptimeController`)

```
GET /api/v1/uptime
```

Returns when the BruControl server started.

**Response:** `{ "startedAtUtc": "2026-03-08T12:00:00Z" }`

## Explorer Folders (`ExplorerFolderController`)

```
GET    /api/v1/explorer-folder
GET    /api/v1/explorer-folder/:section
POST   /api/v1/explorer-folder
PUT    /api/v1/explorer-folder/:id
PUT    /api/v1/explorer-folder/:id/move
DELETE /api/v1/explorer-folder/:id
PUT    /api/v1/explorer-folder/item
DELETE /api/v1/explorer-folder/item/:itemId/:itemType
```

- **section** — `processes` or `workspaces`
- **POST** body: `{ "name": "Folder Name", "section": "workspaces", "parentFolderId": null, "workspaceId": null }`
- **PUT :id** — Rename folder. Body: `{ "name": "..." }`
- **PUT :id/move** — Move folder to new parent. Body: `{ "newParentFolderId": "guid" }` (null for root)
- **PUT item** — Assign item to folder. Body: `{ "itemId": "...", "itemType": "...", "folderId": "guid" }`
- **DELETE item/:itemId/:itemType** — Remove item from folder

## Data Views (`DataViewController`)

```
GET    /api/v1/data-view
GET    /api/v1/data-view/:id
POST   /api/v1/data-view
PATCH  /api/v1/data-view/:id
PATCH  /api/v1/data-view/reorder
DELETE /api/v1/data-view/:id
POST   /api/v1/data-view/:id/duplicate
```

- Data views are saved chart configurations for the Data Explorer
- **POST** body: `{ "name": "My View", "viewType": "line", "configuration": {...}, "styleMetadata": {...} }`
- **PATCH** — Partial update: `name`, `viewType`, `configuration`, `styleMetadata`, `folderId`
- **reorder** body: `{ "orderedIds": ["guid1", "guid2", ...] }`

## Chart Data (`ChartDataController`)

```
GET /api/v1/chart-data/channels
GET /api/v1/chart-data/samples?elementId=:guid&index=0&since=&points=1000
```

- **channels** — Returns all channels that can be charted
- **samples** — Historical chart samples for a channel. Query params: `elementId` (required), `index` (default 0), `since`, `points` (25–10000)

## Scripting (`ScriptingController`)

```
GET /api/v1/scripting/elements
```

Returns all scriptable elements (global variables, device elements, timers, alarms, processes, generics) with their types for IntelliSense support.

## Security (`SecurityController`)

```
GET    /api/v1/security/status
POST   /api/v1/security/pin
DELETE /api/v1/security/pin
POST   /api/v1/security/lock
POST   /api/v1/security/unlock
```

- **status** — Current lock status, hasPin, locked, autoLockIdleTime
- **POST pin** — Set or change PIN. Body: `{ "pin": "1234" }`
- **DELETE pin** — Clear configured PIN
- **POST lock** — Lock the controller (requires PIN)
- **POST unlock** — Unlock with PIN. Body: `{ "pin": "1234" }`

## Session (`SessionController`)

```
GET /api/v1/session
```

Creates or returns an existing session and provides a CSRF token for the SPA. The server sets an `HttpOnly` session cookie and returns the token in the response body.

**Response:**

```json
{ "csrfToken": "abc123...", "expiresAtUtc": "2026-04-01T00:00:00Z" }
```

:::info CSRF Flow
For all mutating requests (`POST`, `PATCH`, `PUT`, `DELETE`), include the CSRF token as the `X-CSRF-Token` header. The session cookie is sent automatically by the browser. See [API Overview](./overview) for full authentication details.
:::

## License (`LicenseController`)

```
GET  /api/v1/license/status
POST /api/v1/license/activate
POST /api/v1/license/release
POST /api/v1/license/eval/request
POST /api/v1/license/eval/verify
```

- **status** — License type, expiration, last sync
- **activate** — Validate credentials with licensing server
- **release** — Release current license (free installation slot)
- **eval/request** — Request evaluation verification email. Body: `{ "email": "..." }`
- **eval/verify** — Verify code and activate eval. Body: `{ "email": "...", "code": "..." }`

## Configuration (`ConfigurationController`)

```
GET    /api/v1/configurations
POST   /api/v1/configurations
POST   /api/v1/configurations/activate
PUT    /api/v1/configurations/rename
DELETE /api/v1/configurations
```

- **GET** — List available configurations (name, path, isActive)
- **POST** — Create and activate. Body: `{ "name": "..." }`
- **activate** — Switch to config. Body: `{ "path": "..." }`
- **rename** — Rename config file. Body: `{ "currentPath": "...", "newName": "..." }`
- **DELETE** — Delete config. Body: `{ "path": "..." }` (cannot delete last remaining)

## Plugin Registry (`PluginRegistryController`)

```
POST /api/v1/plugin-registry/sync
POST /api/v1/plugin-registry/install
POST /api/v1/plugin-registry/update
POST /api/v1/plugin-registry/sideload
POST /api/v1/plugin-registry/revert-to-stable
```

- **sync** — Force sync of official plugins and color themes from registry
- **install** — Install from registry. Body: `{ "manifestId": "..." }`
- **update** — Update installed plugin. Body: `{ "manifestId": "..." }`
- **sideload** — Install from GitHub. Body: `{ "repo": "...", "path": "...", "ref": "..." }`
- **revert-to-stable** — Revert a beta plugin to its stable version. Reassigns all elements using the beta template to the stable version, then removes the beta template. Body: `{ "manifestId": "{uuid}-beta" }`. The `manifestId` must end with `-beta`. Returns the stable `ElementTemplateViewModel`.

**Status codes for revert-to-stable:**

| Code | Meaning |
|------|---------|
| `200` | Reverted successfully; returns stable template |
| `400` | `manifestId` missing or not a beta ID |
| `404` | Beta plugin not installed, or stable version not found |
| `502` | Failed to fetch stable plugin from upstream registry |

## System (`SystemController`)

```
GET  /api/v1/system/port-status
POST /api/v1/system/disable-all-ports
POST /api/v1/system/shutdown
```

- **port-status** — Whether any devices have connected and enabled ports. Response: `{ "anyConnectedEnabledPorts": true, "anyConnectedDisabledPorts": false }`
- **disable-all-ports** — Disable all enabled ports on all connected devices. Response: `{ "disabled": 5 }`
- **shutdown** — Graceful shutdown. Optional body: `{ "disableAll": true }` to disable all ports before shutdown. Response: `{ "message": "Shutting down...", "disableAll": true }`

## Media API (`MediaController`)

The Media API manages slug-to-file mappings for media assets. Slugs are human-friendly identifiers used in scripts to reference images (e.g. `"Element" imageUrl = "my_boil_img"`).

```
GET    /api/v1/media
GET    /api/v1/media/slugs
GET    /api/v1/media/resolve?slug={slug}
PATCH  /api/v1/media
DELETE /api/v1/media/{slug}
```

| Method | URL | Description | Request | Response |
|--------|-----|-------------|---------|----------|
| `GET` | `/api/v1/media` | List all media items with their slugs | — | Array of `MediaItemViewModel` |
| `GET` | `/api/v1/media/slugs` | Get all slug names (for IntelliSense) | — | Array of strings |
| `GET` | `/api/v1/media/resolve?slug={slug}` | Resolve a slug to a file URL | Query: `slug` (required) | File URL string, or `404` |
| `PATCH` | `/api/v1/media` | Create or update a slug mapping | `{ "slug": "my_img", "path": "/uploads/boil.png" }` | `204 No Content` |
| `DELETE` | `/api/v1/media/{slug}` | Delete a slug mapping (file is not deleted) | — | `204 No Content` |

:::info
The slug system allows scripts to reference media by a stable name. If the underlying file moves, update the slug mapping instead of changing all scripts.
:::

## File Upload API (`FileUploadController`)

The File Upload API provides file and folder management within the BruControl data directory.

```
GET    /api/v1/files?path={path}
POST   /api/v1/files/upload?path={path}
POST   /api/v1/files/folder?path={path}
PATCH  /api/v1/files/rename
PATCH  /api/v1/files/move
DELETE /api/v1/files?path={path}
```

| Method | URL | Description | Request | Response |
|--------|-----|-------------|---------|----------|
| `GET` | `/api/v1/files?path=` | List files and folders at path | Query: `path` (optional, root if omitted) | `FileListResponseViewModel` |
| `POST` | `/api/v1/files/upload?path=` | Upload files (multipart/form-data) | Query: `path`; Form: `files` | Array of `FileEntryViewModel` |
| `POST` | `/api/v1/files/folder?path=` | Create a folder | Query: `path`; Body: `{ "name": "folder-name" }` | `FileEntryViewModel` |
| `PATCH` | `/api/v1/files/rename` | Rename a file or folder | `{ "path": "old/path.txt", "newName": "new-name.txt" }` | `FileEntryViewModel` |
| `PATCH` | `/api/v1/files/move` | Move a file or folder | `{ "sourcePath": "from/file.txt", "destinationPath": "to/" }` | `FileEntryViewModel` |
| `DELETE` | `/api/v1/files?path=` | Delete a file or folder | Query: `path` (required) | `204 No Content` |

**`FileEntryViewModel` shape:**

```json
{
  "name": "boil.png",
  "path": "uploads/boil.png",
  "isDirectory": false,
  "size": 24576,
  "contentType": "image/png",
  "modifiedAtUtc": "2026-03-10T14:30:00Z",
  "url": "/files/uploads/boil.png"
}
```

## Data Exchange Legacy API (`DataExchangeLegacyController`)

The Data Exchange Legacy API provides external system access to BruControl global variables. This is the legacy "Data Exchange" protocol for third-party integrations (e.g. Node-RED, Home Assistant, custom scripts).

:::warning Professional License & External Access Only
This API requires a **Professional** license and is accessible only from external HTTP clients — not from the BruControl web UI. The `AllowWeb = false` attribute blocks requests originating from the browser session.
:::

```
GET /global/{name}
PUT /global/{name}
GET /globals?offset=0&limit=0
PUT /globals
```

| Method | URL | Description | Request | Response |
|--------|-----|-------------|---------|----------|
| `GET` | `/global/{name}` | Get a global variable by name | — | `{ "name": "...", "value": "...", "valueType": "..." }` |
| `PUT` | `/global/{name}` | Set a global variable by name | `{ "name": "...", "value": "72.5", "valueType": "Decimal" }` | `200 OK` |
| `GET` | `/globals?offset=0&limit=0` | Get all global variables (paged) | Query: `offset`, `limit` (0 = all) | Array of global variable objects |
| `PUT` | `/globals` | Set multiple global variables | Array of `{ "name": "...", "value": "...", "valueType": "..." }` | `200 OK` |

:::info Route Note
These routes are at the **root** path (not under `/api/v1/`). For example: `http://localhost:5005/global/MyTemp`.
:::

**Value types:** `String`, `Integer`, `Decimal`, `Boolean`

**Example — read a variable from an external system:**

```bash
curl http://brucontrol-host:5005/global/MashTemp
```

```json
{ "name": "MashTemp", "value": "152.3", "valueType": "Decimal" }
```

**Example — write a variable:**

```bash
curl -X PUT http://brucontrol-host:5005/global/MashTemp \
  -H "Content-Type: application/json" \
  -d '{"value": "155.0", "valueType": "Decimal"}'
```
