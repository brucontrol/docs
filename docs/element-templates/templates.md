---
id: templates
title: Templates
sidebar_position: 4
---

# Templates

A **template** is an HTML/CSS/JavaScript bundle that defines how an element appears and behaves on the Dashboard. Each template declares which element types it supports and, optionally, which type it is the default for. Templates are the visual layer of BruControl's element system.

## What a Template Is

A template consists of:

- **Source files** — `index.html`, `style.css`, `index.js`, and optionally `ui-controls.json`, `dependencies.json`, `package.json`
- **Compiled HTML** — At save time, the source files are compiled into a single self-contained HTML document. This compiled HTML is what gets loaded into the Dashboard iframe.
- **UIControls** — A schema (`ui-controls.json`) defining configurable properties (label, colors, visibility, etc.) that appear in the element Edit Drawer

### Compile process

When you save a template in the Element Template Editor, the system:

1. Inlines `style.css` into a `<style>` tag
2. Inlines `index.js` into a `<script>` tag
3. Injects CDN scripts loaded before user code (Penpal v7, Chart.js 4.x, chartjs-adapter-date-fns 3.x)
4. Injects the Element Template SDK (`window.BruControl`)
5. Produces a single compiled HTML document stored in the database

### dependencies.json

If your template needs external libraries beyond the pre-loaded CDN scripts, list them in `dependencies.json`. These scripts are loaded into the iframe before the SDK:

```json
{
  "some-lib": "https://cdn.example.com/some-lib.min.js"
}
```

## supportedTypes

Templates declare which element types they support via `supportedTypes` (a JSON array of strings).

| supportedTypes | Meaning |
|----------------|---------|
| `["timer"]` | This template can be used only for Timer elements |
| `["globalVariable-value", "globalVariable-bool"]` | This template can be used for both Value and Boolean global variables |
| `["generic"]` | Works with Generic elements (flexible type) |
| `["digitalOutput"]` | For Digital Output elements only |

The **template picker** in the element Edit Drawer shows only templates whose `supportedTypes` includes the element's type, or whose `elementType` matches the element's type (when `supportedTypes` is not set). This filtering ensures you only see compatible templates.

## defaultFor

A template can declare itself the default for one or more types via `defaultForTypes` (from the manifest field `defaultFor`).

| Type | Meaning |
|------|---------|
| `timer` | When you create a new Timer, this template is selected by default |
| `globalVariable-value` | When you create a new Value global variable, this template is selected by default |

If multiple templates have `defaultFor` for the same type, the first one wins. User-configured overrides take precedence over `defaultFor`. See [Default Templates](default-templates.md) for the full resolution order.

## Template Picker

In the element Edit Drawer, under the **Appearance** tab, you can choose a template from the **Element Template** dropdown. The picker lists:

1. Templates compatible with the element's type (`supportedTypes` includes it, or `elementType` matches when `supportedTypes` is not set)
2. Built-in and custom templates (flat list by name)

Select a template to change how the element looks on the Dashboard. Changes apply immediately.

## Related Topics

- [Custom Properties](custom-properties.md) — Configurable template options
- [Default Templates](default-templates.md) — How defaults are chosen
- [Element Template Developer Guide](element-template-developer-guide.md) — Build your own templates
