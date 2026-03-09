---
id: settings
title: Application Settings
sidebar_position: 4
---

# Application Settings

Settings control how BruControl behaves, how it connects to hardware, and how your data is stored. Open Settings by expanding **Settings** in the Solution Explorer and selecting an item (e.g., General, Security, License). There is no gear icon or settings button in the header—Settings are accessed only from the Solution Explorer.

## Where Settings Live

- **Solution Explorer:** Expand the **Settings** folder and click an item (e.g., General, Security, License). The corresponding settings panel opens in a modal.

Settings are organized into panels. Changes are saved automatically when you update a value.

## Settings Panels

Settings are opened one panel at a time in a modal. Select a panel from the Solution Explorer; there are no tabs inside the modal.

### General

General settings control configuration, error reporting, updates, shutdown behavior, and logging:

- **Configuration** — Select the active configuration. Create, rename, or delete configurations. Each configuration has its own workspaces, elements, and data. Changing configuration reloads the application.
- **Error Reporting** — Enable or disable anonymous exception reporting. A unique reporting ID is shown for crash reports.
- **Updates** — Toggle whether to check for beta updates instead of stable releases.
- **Shutdown Behavior** — When enabled, all hardware ports are sent disable commands before disconnecting during shutdown (manual or external signals such as SIGTERM).
- **Logging** — Configure which log domains (Device, Licensing, Database, Web API, Framework, System, Elements & Workspaces, Scripts & Processes, Alarms & Profiles, Mock Devices) are recorded and at what level (Verbose, Debug, Information, Warning, Error, Fatal).

### Security

Security settings protect your system from unauthorized or accidental changes:

- **Auto-Lock** — Automatically lock the application after a period of inactivity (Never, 1 minute, 5 minutes, 10 minutes, 15 minutes, 30 minutes, or 60 minutes).
- **Lock Status** — Shows whether the environment is locked or unlocked. Use **Lock Now** to lock immediately (requires a PIN to be set).
- **PIN Protection** — Create or change a four-digit PIN using the scrambled keypad. When the Lock icon is toggled off, the PIN is required to complete the unlock.
- **Clear PIN** — Use this to remove the PIN if you no longer want lock protection.

When the environment is locked, workspaces cannot be edited or deleted, and element layout changes are prevented. User-controllable elements (e.g., buttons, switches) can still be used if **User Control** is enabled on those elements.

### Services

The Services panel configures the **web API service** and **mock devices**:

- **API Service**
  - **Enable API Service** — Start the web service for remote connections and API access
  - **Port** — TCP port (1–65535) for the API. Stop the service to change.
  - **Open Browser on Startup** — Automatically open the web interface when the service starts
- **Mock Devices**
  - **Enable Mock Devices** — Allow device mocking for testing without physical hardware. Both the API service and mock devices require a Professional license.

:::info Interfaces vs Services
Interfaces (microcontroller boards) are **not** configured here. Add interfaces via **Solution Explorer** → right-click **Interfaces** → **New Interface**. The Services panel only configures the web API and mock device service.
:::

### License

Manage your BruControl license:

- **License Status** — Shows activation date, verification status, and license level (Evaluation, Basic, Advanced, Professional).
- **Activate** — Enter your license email and click Activate. Activation is email-based.
- **Start Evaluation** — Begin a 15-day evaluation with full functionality. Enter your email and verify with a code sent to you.
- **Release License** — Release the license from this computer so it can be used elsewhere. The application will no longer be allowed to communicate with network interfaces until re-activated.

See [Application Setup](./setup#license) for license levels and evaluation details.

### Data Storage

Configure how BruControl stores data:

- **Data Retention** — Number of days to retain historical data (1–365) and log entries (1–365).
- **Maintenance** — Data purge interval (hours), maximum database size (GB), and database size monitor interval (minutes).
- **Database** — The database provider and connection strings are configured in the **settings.yaml** file, not in this UI.

### Widgets

Widget settings control the visual representation of elements on the Dashboard:

- **Default Templates** — Choose which widget template is used by default for each element type.
- **Widget Editor** — Open the visual editor to create and customize widget templates.

### Device Types

Device type settings relate to firmware and hardware compatibility:

- **Firmware Version** — Select the firmware version used by your interfaces. This affects which device types and wiring maps are available.
- **Sync from Registry** — Manually trigger a sync of device types from the registry for the selected firmware version.
- **Upload .brumc Files** — Upload device type definitions to add or override registry types.

### Plugin Store

Opens the Plugin Store in a new browser tab to browse, install, and update plugins (widgets, themes, etc.).

### System Logs

Opens the Log Viewer in a new browser tab for troubleshooting and viewing application logs.

## When to Use Each Panel

| Panel | Use When |
|-----|----------|
| **General** | Switching configuration, error reporting, updates, shutdown behavior, or logging domains and levels |
| **Security** | Setting auto-lock, locking now, or setting/clearing the unlock PIN |
| **Services** | Enabling the web API service, setting port, enabling mock devices |
| **License** | Activating, evaluating, releasing, or checking license status |
| **Data Storage** | Adjusting data retention, maintenance intervals, or database size limits |
| **Widgets** | Changing default widget templates or opening the Widget Editor |
| **Device Types** | Updating firmware version, syncing from registry, or uploading .brumc files |
| **Plugin Store** | Installing or updating plugins (opens in new tab) |
| **System Logs** | Viewing logs for troubleshooting (opens in new tab) |

## Next Steps

- [Application Setup](./setup) — License activation details
- [Workspaces](./workspaces) — Creating and organizing workspaces
- [Updates and Releases](./updates-releases) — Keeping BruControl up to date
