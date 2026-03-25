---
id: updates-releases
title: Updates and Releases
sidebar_position: 5
---

# Updates and Releases

BruControl checks for updates and provides download information for new versions. This page explains how updates work, what the version indicator tells you, and where to get the latest release.

## How BruControl Checks for Updates

BruControl periodically fetches version information from the brucontrol-releases repository:

- **Stable channel** — Uses `version.json` from the main branch
- **Beta channel** — Uses `version-beta.json` for pre-release versions

The application compares the latest available version with the version you are running. Results are cached for approximately **15 minutes** to avoid excessive requests.

## Version Status Indicator

The **VersionStatus** component in the application header displays your current version. When a newer version is available:

- An **orange pulsing dot** appears next to the version number
- **Hover** over the version indicator to see a tooltip with the release notes URL
- **Click** the link to visit the release notes page where you can download the update

If your version is current, the indicator remains neutral with no pulsing dot.

### Version Check API

The version check is available at `GET /api/v1/version` (optionally `?beta=true` for the beta channel). The response includes:

- **Current** — Your installed version
- **Latest** — The newest version available for your channel
- **Update Available** — Whether an update is recommended
- **Release Notes URL** — Link to release notes
- **Windows Download URL** — Direct link to the Windows ZIP (when provided)
- **Docker Image** — Docker image name and tag (when provided)

## Where to Download

### Windows Zip

- **BruControl.com** — Visit [brucontrol.com](https://brucontrol.com) for the official download page
- **GitHub Releases** — [github.com/brucontrol/app/releases](https://github.com/brucontrol/app/releases) for versioned releases and release notes
- **Version indicator** — When an update is available, the tooltip shows the release notes URL (e.g. GitHub releases page where you can download)

Download the ZIP, extract it to a folder, and run the executable. You can overwrite an existing installation by extracting into the same folder, but backing up your `Documents\BruControl` configuration first is recommended.

### Docker

Docker images are published for containerized deployments. The image name and tag are included in the version check response when available. Typical usage:

```bash
docker pull <registry>/brucontrol:<tag>
```

Check the release notes or brucontrol-releases repository for the exact image path and recommended tag.

## Docker vs Windows Zip

| Aspect | Windows Zip | Docker |
|--------|-------------|--------|
| **Platform** | Windows 10+ (64-bit) | Any platform with Docker (Linux, Windows, macOS) |
| **Installation** | Extract and run | Pull image and run container |
| **Updates** | Download new ZIP, extract, replace | Pull new image, recreate container |
| **Configuration** | Stored in Documents\BruControl | Typically mounted volume or bind mount |
| **Use case** | Windows host with direct USB access | Server, NAS, headless, or cross-platform deployment |

Choose the option that fits your deployment. Both receive the same application updates.

## Beta vs Stable Channel

- **Stable** — Production-ready releases. Recommended for most users.
- **Beta** — Pre-release versions with new features or fixes. May be less stable. Enable **Check for beta updates** in **Settings** → **General** if you want to see beta updates.

The version check uses different JSON files for each channel, so you only see updates for the channel you are following.

## Updating BruControl

### Windows Zip

1. **Back up** your `Documents\BruControl` folder (especially `.brucfg` files).
2. **Download** the latest release ZIP.
3. **Close** BruControl if it is running (use **Settings → Shutdown** for a clean shutdown).
4. **Extract** the new files, overwriting the old application files. Do not overwrite or delete your Documents\BruControl folder.
5. **Run** the new executable.

Your configuration, workspaces, and data remain in Documents\BruControl and are loaded automatically.

### Docker

1. **Back up** any mounted configuration or data volumes.
2. **Pull** the new image: `docker pull <image>:<new-tag>`
3. **Stop** the running container.
4. **Start** a new container with the new image, using the same volume mounts and environment.

## Tips

- Check the **header version indicator** regularly — the pulsing orange dot makes updates easy to spot
- Always **back up your configuration** before updating, especially the `.brucfg` files
- Use the **beta channel** if you want early access to new features, but switch back to stable for production systems

## Next Steps

- [Application Setup](./setup) — Initial installation
- [Settings](./settings) — Configure update and version check behavior
