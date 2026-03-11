---
id: misc-apis
title: Miscellaneous APIs
sidebar_position: 7
---

# Miscellaneous APIs

Additional APIs for element templates, themes, color sets, logs, version, uptime, explorer folders, data views, chart data, scripting, security, session, license, configuration, and system operations.

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

Creates or returns an existing session and provides a CSRF token for the SPA. Returns `{ "csrfToken": "...", "expiresAtUtc": "..." }`.

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
```

- **sync** — Force sync of official plugins and color themes from registry
- **install** — Install from registry. Body: `{ "manifestId": "..." }`
- **update** — Update installed plugin. Body: `{ "manifestId": "..." }`
- **sideload** — Install from GitHub. Body: `{ "repo": "...", "path": "...", "ref": "..." }`

## System (`SystemController`)

```
GET  /api/v1/system/port-status
POST /api/v1/system/disable-all-ports
POST /api/v1/system/enable-all-ports
POST /api/v1/system/shutdown
```

- **port-status** — Whether any devices have connected/enabled ports
- **disable-all-ports** — Disable all enabled ports
- **enable-all-ports** — Enable all disabled ports that have elements
- **shutdown** — Graceful shutdown. Body: `{ "disableAll": true }` (optional)
