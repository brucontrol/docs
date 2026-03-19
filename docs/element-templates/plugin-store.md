---
id: plugin-store
title: Plugin Store
sidebar_position: 8
---

# Plugin Store

The Plugin Store lets you browse, install, update, and manage element template plugins. Open it at **`/plugin-store`**.

## Browse

The store lists plugins from the BruControl registry (`brucontrol-releases`). It has two tabs:

- **Element Templates** — Element templates you can install or update. Each plugin shows metadata: name, version, badges, tags, and description.
- **Color Themes** — Color themes that sync automatically from the registry; no manual install required. Use **Sync defaults** to refresh the theme list.

## Install

Click **Install** on an element template plugin to download and add it to your templates. After installation:

- The template appears in the **Element Template** picker for elements of the supported types.
- If the plugin declares `defaultFor`, new elements of that type may use it as the default.
- The template files are stored locally and can be viewed (but not edited for built-in/core plugins) in the Element Template Editor.

## Update

When a newer version of an installed element template plugin is available, an **Update** button appears. Click it to upgrade to the latest version. Plugin updates use **semantic versioning** (semver) — version numbers follow the `major.minor.patch` pattern.

## Uninstall

To remove a plugin template, delete it from the Element Template Editor. Elements currently using the template will need a new template assigned.

## Badges and Sources

| Badge | Meaning |
|-------|---------|
| **Official** | From the BruControl plugin library; maintained by BruControl |
| **Core** | Auto-installed at startup; part of the core element template set |
| **Beta** | Pre-release; not auto-installed unless already present |

Official plugins are vetted and supported. Core plugins are installed automatically when BruControl starts and kept up to date.

## Developer Sideload

Developers can sideload plugins from GitHub for testing. The **Developer / Sideload** section in the Plugin Store accepts a GitHub repository URL pointing to a plugin folder. This lets you test plugins before publishing to the registry.

### Sideload format

Provide a GitHub URL pointing to the folder containing `element-template.yaml` and the source files. The store will fetch and install the plugin from that URL.

## After Install

Installed templates appear in:

- **Element Template Editor** — Under "Templates" (custom) or "Built-ins" (core plugins)
- **Element Edit Drawer** — In the Element Template dropdown for supported element types

## Color Themes Tab

The Color Themes tab shows available color themes from the registry:

- Themes sync automatically — no install button needed
- Use **Sync defaults** to pull the latest themes from the registry
- Each theme defines a complete set of colors (background, text, accent, border, etc.) that element templates use via CSS variables

## Related Topics

- [Element Template Editor](element-template-editor.md) — Create and edit templates
- [Default Templates](default-templates.md) — How defaults are chosen
- [Element Template Developer Guide](element-template-developer-guide.md) — Build plugins for the store
