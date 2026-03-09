---
id: plugin-store
title: Plugin Store
sidebar_position: 6
---

# Plugin Store

The Plugin Store lets you browse, install, and update widget plugins. Open it at **`/plugin-store`**.

## Browse

The store lists plugins from the BruControl registry (brucontrol-releases). It has two tabs:

- **Widgets** — Widget templates you can install or update. Each appears in the registry with metadata (name, version, badges, tags).
- **Color themes** — Synced automatically from the registry; no manual install. Use **Sync defaults** to refresh.

## Install

Click **Install** on a widget plugin to download and add it to your templates. After installation:

- The template appears in the **Widget Template** picker for elements of the supported types.
- If the plugin declares `defaultFor`, new elements of that type may use it as the default.

## Update

When a newer version of an installed widget plugin is available, an **Update** button appears. Click it to upgrade to the latest version.

## Badges and Sources

| Badge | Meaning |
|-------|---------|
| **Official** | From the BruControl plugin library; maintained by BruControl |
| **Core** | Auto-installed at startup; part of the core widget set |
| **Beta** | Pre-release; not auto-installed unless already present |

Official plugins are vetted and supported. Developers can sideload plugins from GitHub via the **Developer / Sideload** section for testing.

## After Install

Installed templates appear in:

- **Widget Editor** — Under "Templates" (custom) or "Built-ins" (core plugins)
- **Element Edit Drawer** — In the Widget Template dropdown for supported element types

Core plugins are installed automatically when BruControl starts. Non-core official plugins require manual install from the Plugin Store.
