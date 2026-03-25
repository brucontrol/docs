---
id: element-template-editor
title: Element Template Editor
sidebar_position: 7
---

# Element Template Editor

The Element Template Editor lets you create and edit element templates with a live preview. Open it at **`/element-templates/:id`** (or `/element-templates` to create a new template).

## Overview

The editor provides a complete authoring environment for element templates:

- **Code editor** — Sandpack-powered editor with syntax highlighting for HTML, CSS, JavaScript, and JSON
- **Live preview** — Real-time rendering of your template as you edit
- **Metadata panel** — Configure name, description, supported types, and default-for settings
- **File tabs** — Switch between `index.html`, `style.css`, `index.js`, `ui-controls.json`, and `dependencies.json`
- **Background presets** — Test your template against different backgrounds
- **Preview type switcher** — Simulate different element types to test compatibility

## Sandpack-Based Authoring

The editor uses [Sandpack](https://sandpack.codesandbox.io/) to provide a live coding environment:

- **Files** — `index.html`, `style.css`, `index.js`, `ui-controls.json`, `dependencies.json`
- **Live preview** — Changes are compiled and rendered in real time in a preview iframe
- **Full IntelliSense** — Code completion for HTML, CSS, and JavaScript

## Creating a New Template

1. Go to `/element-templates` or click **+ New** in the template list.
2. A default starter for `globalVariable-value` is applied automatically.
3. Edit the HTML, CSS, and JavaScript in the code editor.
4. Define `ui-controls.json` for configurable properties (see [Custom Properties](custom-properties.md)).
5. Configure the **metadata panel**:
   - **Name** — Display name for the template (e.g. "Timer - Card")
   - **Description** — Short description of what the template does
   - **Supported Types** — Which element types can use this template (multi-select)
   - **Default For** — Optionally make this the default template for a type
6. Click **Save**.

## Live Preview

The preview panel shows the element template with mock element data. You can:

- **Switch the preview element type** — Use the type switcher to simulate different element types (e.g., Timer vs Global Variable vs Digital Output). This lets you verify your template works for all supported types.
- **Interact with the template** — Host pickers (keypad, text input, date/time pickers, selection dialogs) work in preview mode, so you can test the full interaction flow.
- **Change the background color** — Use background presets to simulate light/dark themes and verify your template looks good in all environments.

### Background presets

| Preset | Background |
|--------|------------|
| Transparent | Checkerboard (transparent) |
| White | `#ffffff` |
| Light gray | Light gray |
| Gray | Medium gray |
| Dark | Dark background |
| VS Code dark | VS Code default dark (`#1e1e1e`) |
| Black | `#000000` |
| Custom | User-defined color |

## Metadata Panel

The metadata panel (typically in the sidebar or header area) lets you configure:

| Field | Description |
|-------|-------------|
| **Name** | Template display name (shown in the template picker) |
| **Description** | Short text describing the template |
| **Supported Types** | Element types this template works with (multi-select list) |
| **Default For** | Make this the default template for one type |

## Editing Built-in Templates

Built-in templates are **read-only** — you cannot modify them directly. To customize a built-in template:

1. Open the built-in template in the editor
2. Click **Duplicate** to create an editable copy
3. Modify the copy as needed
4. Save with a new name

## Importing Templates

:::note
Local file import (uploading a folder) is not available. To sideload a template developed externally, use the **Developer / Sideload** feature in the [Plugin Store](plugin-store.md), which accepts a GitHub repository URL pointing to the plugin folder.
:::

## Save and Compile Pipeline

When you click **Save**, the editor:

1. Validates the source files
2. Compiles the source files into a single HTML document (inlines CSS, JS, and CDN dependencies)
3. Stores the compiled HTML and source files in the database
4. Elements already using this template will immediately receive the updated design on their next render

## Actions

| Action | Description |
|--------|-------------|
| **Save** | Compile and store the template. Existing elements using this template update automatically |
| **Duplicate** | Create an editable copy (use this for built-in templates) |
| **Delete** | Remove the template. Elements using it will need a new template assigned |

## When to Use the Element Template Editor

- Customize the appearance of an element (colors, fonts, layout)
- Create a new look for an existing element type
- Duplicate a built-in template and modify it (built-ins are read-only)
- Prototype and test templates with live preview before publishing as a plugin
- Debug template behavior with different element types and themes

## Related Topics

- [Element Template Developer Guide](element-template-developer-guide.md) — Full SDK reference and plugin structure
- [Custom Properties](custom-properties.md) — ui-controls.json schema
- [Templates](templates.md) — How templates work
