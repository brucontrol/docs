---
id: templates
title: Templates
sidebar_position: 4
---

# Templates

A **template** is an HTML/CSS/JavaScript bundle that defines how an element appears and behaves on the Dashboard. Each template declares which element types it supports and, optionally, which type it is the default for.

## What a Template Is

A template consists of:

- **Source files** — `index.html`, `style.css`, `index.js`, and optionally `package.json`, `ui-controls.json`, `dependencies.json`
- **Compiled HTML** — A bundled, self-contained HTML document injected into a sandboxed iframe on the Dashboard
- **UIControls** — A schema (`ui-controls.json`) defining configurable properties (label, colors, visibility, etc.)

The Dashboard loads the template by ID, injects its compiled HTML into an iframe, and passes element data and theme colors via the Element Template SDK.

## supportedTypes

Templates declare which element types they support via `supportedTypes` (a JSON array of strings).

| supportedTypes | Meaning |
|----------------|---------|
| `["timer"]` | This template can be used only for Timer elements |
| `["globalVariable-value", "globalVariable-bool"]` | This template can be used for both Value and Boolean global variables |

The **template picker** in the element Edit Drawer shows only templates whose `supportedTypes` includes the element's type, or whose `elementType` matches the element's type (when `supportedTypes` is not set).

## defaultFor

A template can declare itself the default for one or more types via `defaultForTypes` (from the manifest field `defaultFor`).

| Type | Meaning |
|------|---------|
| `timer` | When you create a new Timer, this template is selected by default |
| `globalVariable-value` | When you create a new Value global variable, this template is selected by default |

If multiple templates have `defaultFor` for the same type, the first one wins. User-configured overrides take precedence over `defaultFor`.

## Template Picker

In the element Edit Drawer, under the **Appearance** tab, you can choose a template from the **Element Template** dropdown. The picker lists:

1. Templates compatible with the element's type (`supportedTypes` includes it, or `elementType` matches when `supportedTypes` is not set)
2. Built-in and custom templates (flat list by name)

Select a template to change how the element looks on the Dashboard. Changes apply immediately.
