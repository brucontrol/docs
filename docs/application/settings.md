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

:::info URL and Port Configuration
The web server host and port are **not** in the Settings UI. Configure them in `appsettings.json` in the same folder as the executable (Windows ZIP) or via the `ASPNETCORE_URLS` environment variable. See [Application Setup](./setup#configuring-the-url-and-port) for details.
:::

## Settings Panels

Settings are opened one panel at a time in a modal. Select a panel from the Solution Explorer; there are no tabs inside the modal.

### General

General settings control configuration, error reporting, updates, shutdown behavior, and logging:

- **Configuration** — Select the active configuration. Create, rename, or delete configurations. Each configuration has its own workspaces, elements, and data. Changing configuration reloads the application.
- **Error Reporting** — Enable or disable anonymous exception reporting. A unique reporting ID is shown for crash reports.
- **Updates** — Toggle whether to check for beta updates instead of stable releases.
- **Shutdown Behavior** — When enabled (`disableAllOnShutdown`), all hardware ports are sent disable commands before disconnecting during shutdown (manual or external signals such as SIGTERM). This is the default behavior referenced when using the Shutdown dialog's "Close Ports & Shutdown" option.
- **Logging** — Configure which log domains are recorded and at what level. There are 10 logging domains:

| Domain | What It Covers |
|--------|----------------|
| Device | Hardware communication |
| Licensing | License verification |
| Database | Data storage operations |
| Web API | HTTP request handling |
| Framework | ASP.NET Core framework |
| System | Core system operations |
| Elements & Workspaces | Element and workspace changes |
| Scripts & Processes | Script execution |
| Alarms & Profiles | Alarm triggers and profile execution |
| Mock Devices | Mock device simulation |

Each domain can be independently enabled/disabled and set to a level: **Verbose**, **Debug**, **Information**, **Warning**, **Error**, or **Fatal**.

### Security

Security settings protect your system from unauthorized or accidental changes:

- **Auto-Lock** — Automatically lock the application after a period of inactivity (Never, 1 minute, 5 minutes, 10 minutes, 15 minutes, 30 minutes, or 60 minutes). The idle timer listens for mouse, keyboard, touch, scroll, and pointer events.
- **Lock Status** — Shows whether the environment is locked or unlocked. Use **Lock Now** to lock immediately (requires a PIN to be set).
- **PIN Protection** — Create or change a four-digit PIN using the scrambled keypad. When the Lock icon is toggled off, the PIN is required to complete the unlock.
- **Clear PIN** — Use this to remove the PIN if you no longer want lock protection.

When the environment is locked, workspaces cannot be edited or deleted, and element layout changes are prevented. User-controllable elements (e.g., buttons, switches) can still be used if **User Control** is enabled on those elements.

:::info PIN Lock Gate
When a PIN is configured, the entire application is gated behind a **PIN lock screen** (PinLockGate). No content is visible until the correct PIN is entered. This applies to all routes including the main dashboard, file manager, and log viewer.
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

### Data Explorer

The Data Explorer settings panel controls default behavior for Data Views:

- **Share Y-Axis** — When enabled, all panels in a data view share the same Y-axis scale for easier comparison across channels.
- **Time Span** — Default time span (in seconds) used when opening a new Data View.

See [Data Views](./data-views) for more about creating and using data views.

### Element Templates

Element template settings control the visual representation of elements on the Dashboard:

- **Default Templates** — Choose which element template is used by default for each element type.
- **Element Template Editor** — Open the visual editor to create and customize element templates.

### Device Types

Device type settings relate to firmware and hardware compatibility:

- **Firmware Version** — Select the firmware version used by your interfaces. This affects which device types and wiring maps are available.
- **Sync from Registry** — Manually trigger a sync of device types from the registry for the selected firmware version.
- **Upload .brumc Files** — Upload device type definitions to add or override registry types.

### Plugin Store

Opens the Plugin Store in a new browser tab to browse, install, and update plugins (element templates, themes, etc.).

### System Logs

Opens the Log Viewer in a new browser tab for troubleshooting and viewing application logs.

### Shutdown

Selecting **Shutdown** in the Settings tree opens the **Shutdown Dialog** — a dedicated dialog for safely shutting down the application.

The dialog checks whether any devices have active, enabled ports and presents two options:

| Option | Behavior |
|--------|----------|
| **Keep Ports & Shutdown** | Shuts down the application immediately, leaving all ports in their current state |
| **Close Ports & Shutdown** | Sends disable commands to all active ports before shutting down |

:::warning Active Ports
If you choose **Keep Ports & Shutdown** while hardware is active (heaters, pumps, valves), those outputs remain in their current state. Ensure you have independent safety controls or manually disable outputs first.
:::

## When to Use Each Panel

| Panel | Use When |
|-----|----------|
| **General** | Switching configuration, error reporting, updates, shutdown behavior, or logging domains and levels |
| **Security** | Setting auto-lock, locking now, or setting/clearing the unlock PIN |
| **License** | Activating, evaluating, releasing, or checking license status |
| **Data Storage** | Adjusting data retention, maintenance intervals, or database size limits |
| **Data Explorer** | Changing shared Y-axis default or default time span for data views |
| **Element Templates** | Changing default element templates or opening the Element Template Editor |
| **Device Types** | Updating firmware version, syncing from registry, or uploading .brumc files |
| **Plugin Store** | Installing or updating plugins (opens in new tab) |
| **System Logs** | Viewing logs for troubleshooting (opens in new tab) |
| **Shutdown** | Safely shutting down the application with port control |

## Tips

- Use **Configuration** management in General settings to maintain separate configs for different brewing setups (e.g., "Production" vs "Experimental")
- Set **Auto-Lock** to 5–15 minutes if your BruControl machine is accessible to others
- Enable **Shutdown Behavior** in General settings if you want Docker containers to cleanly disable ports on `docker stop`
- Configure **Logging** domains to Debug level only when troubleshooting — Verbose and Debug levels generate large log files

## Next Steps

- [Application Setup](./setup) — License activation details
- [Workspaces](./workspaces) — Creating and organizing workspaces
- [Updates and Releases](./updates-releases) — Keeping BruControl up to date
