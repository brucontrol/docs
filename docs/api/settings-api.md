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

**Example response (abbreviated):**

```json
{
  "general": {
    "configurationName": "Default",
    "exceptionReporting": true,
    "disableAllOnShutdown": true,
    "betaUpdates": false
  },
  "security": {
    "autoLockIdleTime": 0,
    "locked": false,
    "hasPin": false
  },
  "service": {
    "enabled": true,
    "port": 5005,
    "openBrowserOnStartup": true
  },
  "dataStorage": {
    "databaseProvider": "sqlite",
    "dataStorageDays": 30,
    "purgeIntervalMinutes": 60,
    "logRetentionDays": 7,
    "maxLogSizeMb": 50
  },
  "mocking": {
    "enabled": true,
    "port": 5006,
    "openBrowserOnStartup": false
  }
}
```

### Update Settings

```
PATCH /api/v1/settings
```

Partially updates application settings. Patches are applied to the in-memory settings object immediately and persisted to `settings.yaml` so changes survive restart.

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

The settings view model includes the following sections:

| Section | Key Fields | Description |
|---------|-----------|-------------|
| **general** | `configurationName`, `exceptionReporting`, `disableAllOnShutdown`, `betaUpdates` | Application behavior, shutdown policy, update channel |
| **security** | `autoLockIdleTime`, `locked`, `hasPin`, `pin` | Security PIN and auto-lock; see [Security API](./misc-apis#security-securitycontroller) |
| **service** | `enabled`, `port`, `openBrowserOnStartup` | API web server configuration |
| **license** | `email`, `password` | License credentials (activate via [License API](./misc-apis#license-licensecontroller)) |
| **startup** | `minimizeToTray` | Startup behavior |
| **dataStorage** | `databaseProvider`, `connectionString`, `dataStorageDays`, `purgeIntervalMinutes`, `logRetentionDays`, `maxLogSizeMb` | Database backend and data retention |
| **mocking** | `enabled`, `port`, `openBrowserOnStartup` | Mock device server configuration |
| **dataExplorer** | `shareYAxis`, `timeSpanSurrogate` | Data explorer display options |

:::info Immediate vs. Restart-Required
Most settings take effect immediately after patching. However, changes to `service.port` (the API port) and `dataStorage.databaseProvider` require an application restart to take effect.
:::

:::warning
Only include the properties you want to change in the PATCH body. Unspecified fields remain unchanged. Interfaces (devices) are managed via the [Device API](./device-api), not Settings.
:::

## Cross-References

- [Device API](./device-api) — Device and interface management
- [Miscellaneous APIs](./misc-apis) — Security, license, and configuration endpoints
- [Mocking](../mocking/overview) — Mock device server settings
