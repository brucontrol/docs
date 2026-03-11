---
id: generic
title: Generic
sidebar_position: 5
---

# Generic

A **Generic** element is a flexible container with no built-in data semantics. It displays whatever the element template defines — labels, static content, or custom layouts.

## What It Is

A Generic element has no native value or state. It exists to hold an **element template** and **custom properties**. The template determines what appears on the Dashboard.

## Why It Exists

- **Labels** — Static text, section headers, instructions
- **Custom displays** — Markdown, images, or custom HTML from plugin templates
- **Layout placeholders** — Spacers, dividers, decorative elements
- **Plugin-driven content** — Templates like `generic-markdown` or `generic-image` render custom content

## How to Add

1. In Solution Explorer, right-click a **Workspace** or **Folder**
2. Choose **Generic**
3. Edit to set display name and choose an element template
4. Configure custom properties in the Custom Properties tab

## Native Properties

| Property | Type | Description |
|----------|------|-------------|
| `displayName` | string | Name shown in UI |
| `name` | string | Internal name (fallback) |
| `userControl` | boolean | Allow users to interact with this element |
| `visibility` | Default \| Visible \| Hidden \| HiddenLocked | When to show |
| `elementTemplateId` | string | Element template (e.g. `generic`, `generic-markdown`, `generic-image`) |

Generic has no `value`, `state`, or data-logging properties. All display comes from the template and its custom properties.

## Custom Properties (from plugin-library)

From `generic` element template `ui-controls.json`:

| Property | Type | Group | Description |
|----------|------|-------|-------------|
| `showBackground` | boolean | Layout | Show element template background and border |
| `showValue` | boolean | Layout | Show value text |
| `valueFontFamily`, `valueFontSize`, `valueColor` | — | Value | Value styling |
| `backgroundColor`, `borderColor` | — | Background & Border | Theme-aware overrides |

Other Generic templates (e.g., `generic-markdown`, `generic-image`) define their own `ui-controls.json` with properties like `markdownContent`, `imageUrl`, etc. Configure custom properties in the **Custom Properties** tab of the Edit drawer.

## Script Integration

Generic elements typically have no script-accessible properties. They are display-only. If a template exposes a property, it would be element-specific and not part of the core Generic model.

## Use Cases

- **Section header** — "Mash Tun", "Boil Kettle" labels
- **Instructions** — Static text: "Press Start to begin"
- **Markdown content** — Template renders markdown from a custom property
- **Image** — Template displays an image from URL or upload
- **Spacer** — Empty or minimal template for layout
