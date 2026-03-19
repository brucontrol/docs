---
id: default-templates
title: Default Templates
sidebar_position: 6
---

# Default Templates

When you add a new element, BruControl assigns a default element template based on the element type. You can override this per type in Settings or via the template defaults API.

## How the Default Is Chosen

Resolution order (first match wins):

1. **User override** — A template you've explicitly set as default for that type (stored in `ElementTemplateDefault`)
2. **defaultForTypes** — Templates that declare `defaultFor` (or `DefaultForTypes`) for the element type
3. **supportedTypes** — Templates that list the type in `supportedTypes` but don't have `defaultFor`

## Changing the Default

### Per element

In the element Edit Drawer, Appearance tab, choose a different template from the **Element Template** dropdown. This affects only that element.

### Per type (global)

Use the template defaults API to set which template is the default for each element type:

```
PUT /api/v1/element-template/defaults
```

**Example payload:**

```json
{
  "defaults": [
    {
      "elementType": "timer",
      "elementTemplateId": "abc12345-6789-..."
    },
    {
      "elementType": "globalVariable-value",
      "elementTemplateId": "def98765-4321-..."
    }
  ]
}
```

New elements of that type will use the new default template.

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

## Override Precedence

| Priority | Source | How to set |
|----------|--------|------------|
| 1 (highest) | User override | Edit Drawer → Element Template dropdown, or defaults API |
| 2 | `defaultFor` in manifest | Plugin `element-template.yaml` |
| 3 (lowest) | `supportedTypes` match | Any template that supports the element type |

## Related Topics

- [Templates](templates.md) — What templates are, supportedTypes
- [Plugin Store](plugin-store.md) — Install template plugins
- [Element Template Developer Guide](element-template-developer-guide.md) — Build your own templates
