---
id: element-template-editor
title: Element Template Editor
sidebar_position: 5
---

# Element Template Editor

The Element Template Editor lets you create and edit element templates. Open it at **`/element-templates/:id`** (or `/element-templates` to create a new template).

## Sandpack-Based Authoring

The editor uses [Sandpack](https://sandpack.codesandbox.io/) to provide a live coding environment:

- **Files** — `index.html`, `style.css`, `index.js`, `ui-controls.json`, `dependencies.json`
- **Live preview** — Changes are compiled and rendered in real time in a preview iframe
- **Background presets** — Toggle between transparent, white, light gray, gray, dark, VS Code dark, black, or a custom color to test appearance

## Creating a New Template

1. Go to `/element-templates` or click **+ New** in the template list.
2. A default starter for `globalVariable-value` is applied automatically.
3. Edit the HTML, CSS, and JavaScript.
4. Define `ui-controls.json` for configurable properties.
5. Set **Supported types** (which element types can use this template).
6. Click **Save**.

## Live Preview

The preview panel shows the element template with mock element data. You can:

- Switch the preview type to test different element types (e.g., Timer vs Global Variable).
- Interact with the template (keypad, text input, date/time pickers work in preview).
- Change the background color to simulate light/dark themes (transparent, white, gray, dark, or custom).

## Saving and Applying

- **Save** — Stores the template. Elements already using this template will receive the updated design.
- **Duplicate** — For built-in templates, use Duplicate to create an editable copy.
- **Delete** — Removes the template. Elements using it will need a new template assigned.

## When to Use the Element Template Editor

- Customize the appearance of an element (colors, fonts, layout).
- Create a new look for an existing element type.
- Duplicate a built-in template and modify it (built-ins are read-only).
