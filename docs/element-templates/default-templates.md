---
id: default-templates
title: Default Templates
sidebar_position: 4
---

# Default Templates

When you add a new element, BruControl assigns a default element template based on the element type. You can override this per type in Settings or via the template defaults API.

## How the Default Is Chosen

Resolution order (first match wins):

1. **User override** — A template you've explicitly set as default for that type (stored in `ElementTemplateDefault`)
2. **defaultForTypes** — Templates that declare `defaultFor` (or `DefaultForTypes`) for the element type
3. **supportedTypes** — Templates that list the type in `supportedTypes` but don't have `defaultFor`

## Changing the Default

- **Per element** — In the element Edit Drawer, Appearance tab, choose a different template from the Element Template dropdown. This affects only that element.
- **Per type (global)** — Use the template defaults API (`PUT /api/v1/element-template/defaults`) to set which template is the default for each element type. New elements of that type will use the new default.

## New Element Behavior

When you create a new element (e.g., right-click workspace → Timer), the element is assigned the resolved default template for its type. You can change it immediately in the Edit Drawer.

## defaultFor in Plugin Manifests

Plugin element templates declare `defaultFor` in `element-template.yaml` (plugin manifest format):

```yaml
supportedTypes:
  - timer
defaultFor: timer
```

This becomes `DefaultForTypes: ["timer"]` when installed. Only one template should be the default for a given type; if multiple plugins declare it, the most recently updated template wins unless you override.
