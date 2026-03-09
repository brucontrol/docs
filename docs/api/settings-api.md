---
id: settings-api
title: Settings API
sidebar_position: 6
---

# Settings API

Application settings control security, data retention, email, and other global configuration. Settings are persisted to `settings.yaml` and survive application restart.

## Endpoints

### Get Settings

```
GET /api/v1/settings
```

Returns the current application settings.

**Response:** `SettingsViewModel` or `500 Internal Server Error` if load fails

### Update Settings

```
PATCH /api/v1/settings
```

Partially updates application settings. Patches are applied to the in-memory settings object and persisted to `settings.yaml`.

**Request body:** JSON object with the fields to update. Structure matches `SettingsViewModel`. Use camelCase.

**Example:**

```json
{
  "dataStorage": {
    "dataStorageDays": 30,
    "databaseProvider": "sqlite"
  }
}
```

**Response:** `SettingsViewModel` or `400 Bad Request` if patch fails

## Settings Structure

The settings view model includes (among others):

- **general** — Configuration name, exception reporting, shutdown behavior, beta updates, logging
- **security** — Auto-lock idle time, locked state, pin
- **service** — API service (enabled, port, openBrowserOnStartup)
- **license** — License email, password
- **startup** — Startup behavior (minimizeToTray)
- **dataStorage** — Database provider, connection strings, data retention, purge interval, log retention, max size
- **mocking** — Mock devices (enabled, port, openBrowserOnStartup)
- **dataExplorer** — Data explorer options (shareYAxis, timeSpanSurrogate)

Interfaces (devices) are managed via the [Device API](./device-api), not Settings.

Only include the properties you want to change in the PATCH body. Unspecified fields remain unchanged.
