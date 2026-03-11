---
id: setup
title: Application Setup
sidebar_position: 2
---

# BruControl Application Setup

This guide covers downloading, installing, licensing, and running BruControl for the first time.

## Download Options

BruControl is available in two forms:

### Windows Zip

- **Best for:** Running on a Windows PC (desktop or laptop)
- **Download:** Visit [BruControl.com](https://brucontrol.com) or the [GitHub releases page](https://github.com/brucontrol/app/releases)
- **Format:** A ZIP file containing the application and dependencies
- **Requirements:** Windows 10 or 11 (64-bit). See [System Requirements](../requirements) for details.

### Docker

- **Best for:** Running as a containerized service (e.g., on a server or NAS)
- **Image:** Available from the BruControl Docker registry (see [Updates and Releases](./updates-releases) for the image name)
- **Requirements:** Docker or a compatible container runtime

Choose the option that matches how you plan to run BruControl.

## Installation (Windows Zip)

1. **Download** the latest release ZIP from BruControl.com or the releases page.
2. **Extract** the files into a new, empty folder. Do not extract into the same folder as firmware or other tools.
3. **Navigate** to the folder where you extracted the files.
4. **Run** `BruControl.WebHost.exe`.
5. If Windows shows a security warning, this is normal for unsigned or less common applications. The application is digitally signed when distributed officially.
6. The browser opens automatically to the application. If it does not, go to `http://localhost:5005` (or the port in `appsettings.json`).

:::tip First Run
On first run, BruControl will create a folder in your Documents directory called **BruControl**. This is where configuration, logs, and data are stored. Migrations run automatically to set up settings and any required data structures.
:::

:::info Windows Behavior
- **No console window** — The application runs without a visible command window.
- **Browser auto-open** — Your default browser opens to the application when it starts.
- **Single instance** — Starting BruControl while another instance is running will close the previous instance and start fresh.
:::

### Configuring the URL and Port

The host and port are configured in `appsettings.json` in the same folder as the executable. Edit `BruControl:Urls` to change the binding (e.g. `http://0.0.0.0:5005` for port 5005 on all interfaces). You can also set the `ASPNETCORE_URLS` environment variable to override this.

## Installation (Docker)

1. **Pull** the image: `docker pull ghcr.io/brucontrol/brucontrol-web:latest` (check release notes for the exact image path).
2. **Run** the container with a persistent volume:

```bash
docker run -p 5005:5005 -e BRUCONTROL_DATA_DIR=/data/brucontrol -v brucontrol_data:/data/brucontrol ghcr.io/brucontrol/brucontrol-web:latest
```

3. **Open** a browser and go to `http://localhost:5005` (or your host's address).

:::info Data Persistence
Set `BRUCONTROL_DATA_DIR` to the path inside the container where data is stored, and mount that path to a volume or host directory so configuration and data persist across container restarts.
:::

## License

BruControl uses a license system. The application is fully functional without activation except for interface communications—you cannot connect to hardware until a license is activated.

### Evaluation License

- **Duration:** 15 days of full functionality
- **How to start:** Open **Settings** (Solution Explorer → Settings) → **License**, then select **Start Evaluation**
- **Steps:** Enter your email, receive a verification link, enter the code in BruControl
- **Conversion:** Evaluation licenses can be converted to a purchased license using the same credentials

### Purchased License

- **Purchase:** Visit [BruControl.com/product](https://brucontrol.com/product/brucontrol-application/) to purchase
- **Activation:** Open **Settings** (Solution Explorer → Settings) → **License**, enter your license email, then select **Activate** (activation is email-based)
- **Verification:** BruControl confirms authorization with a remote server. Your computer must have internet access for initial and periodic verification (roughly once per day)
- **Offline:** If the computer cannot reach the internet, BruControl will continue attempting verification for up to 30 days before suspending interface communications

### License Levels

| Level | Capabilities |
|-------|--------------|
| **Evaluation** | Full functionality for 15 days; mirrors Advanced level |
| **Basic** | One serial (USB) interface |
| **Advanced** | Unlimited serial and network interfaces |
| **Professional** | Advanced + Data Exchange (external API communication), Mock Mode |

:::info Machine ID
If you change your computer's hardware significantly (and thus its machine ID), activation may become invalid. Contact BruControl Technical Support to release the license for use on another computer.
:::

## First Run

1. **Launch** BruControl.
2. **Activate a license** (Solution Explorer → Settings → License) if you have not already.
3. **Add an interface** (Solution Explorer → right-click **Interfaces** → New Interface): Configure your microcontroller (device type, interface type, wiring map).
4. **Create a workspace** (Solution Explorer → right-click **Workspaces** → New Workspace).
5. **Add elements** (right-click a workspace → choose element type, e.g., Button, Timer, Device) and place them on the Dashboard.

See [Workspaces](./workspaces) for details on building your control interface.

## Configuration Location

When BruControl runs for the first time, it creates a data folder. The default location is:

- **Windows:** `%USERPROFILE%\Documents\BruControl\`
- **Linux:** `~/Documents/BruControl/`

You can override this with the `BRUCONTROL_DATA_DIR` environment variable (useful for Docker or custom deployments).

This folder contains:

- **Configuration files** (`.brucfg`) — Your workspaces, elements, scripts, and settings
- **Config Backup** — Automatic daily backups (retention configurable in Settings, default 30 days)
- **Logs** — Application and interface log files
- **Data** — Database and historical data (if applicable)
- **uploads** — User-uploaded files (e.g., for element templates)
- **settings.yaml** — Application settings (database, security, etc.)
- **migration-state.json** — Tracks completed data migrations (do not edit)

For the Windows ZIP, `appsettings.json` in the same folder as the executable controls the web server URL and port (see [Configuring the URL and Port](#configuring-the-url-and-port)).

:::danger Do Not Delete
Do not delete or edit files in the BruControl folder without understanding their purpose or without guidance from BruControl Technical Support.
:::

## Backup and Restore

### Backing Up

Back up the entire **BruControl** data folder (default: `Documents\BruControl`) to a remote or external location. Configuration files (`.brucfg`) are the most critical—losing them means losing your workspaces, elements, and scripts.

BruControl creates automatic daily backups of the active configuration in the **Config Backup** subfolder. These use the original config name plus a date code and `.bak` extension (e.g., `default.brucfg.20190331.bak`). Configuration is also auto-saved every 30 seconds. Backup retention uses the Log retention days setting (Settings → Data Storage → Data Retention, default: 30 days).

### Restoring a Backup

1. **Close** BruControl if it is running.
2. **Delete** the current configuration file you want to replace.
3. **Open** the `Config Backup` subfolder inside your BruControl data folder.
4. **Copy** the backup file you want to restore into the main BruControl data folder.
5. **Rename** the file: remove the date code and `.bak` extension so it has a `.brucfg` extension.
6. **Start** BruControl and select the restored configuration if prompted.

## Next Steps

- [Workspaces](./workspaces) — Create and organize your control interface
- [Settings](./settings) — Configure interfaces, security, and data
- [Updates and Releases](./updates-releases) — How to get the latest version
