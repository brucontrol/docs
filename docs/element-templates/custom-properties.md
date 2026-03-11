---
id: custom-properties
title: Custom Properties
sidebar_position: 3
---

# Custom Properties

Custom properties are configurable options for an element template. Template-defined properties come from the template's `ui-controls.json` schema and appear in the **Appearance** tab of the element Edit Drawer. User-added properties (not in the template) appear in the **Custom Properties** tab.

## uiControls Schema

Each template can define a `ui-controls.json` file (or `UIControlsJson` in the database) with a flat map of property names to control definitions:

```json
{
  "showHeader": {
    "type": "boolean",
    "default": true,
    "description": "Show header bar",
    "group": "Layout"
  },
  "labelFontSize": {
    "type": "number",
    "default": 12,
    "group": "Label",
    "format": "font-size",
    "min": 8,
    "max": 48
  }
}
```

## Control Types

| Type | Purpose | Example |
|------|---------|---------|
| `text` | String | label, font-family |
| `number` | Numeric, optional min/max/step | fontSize, value |
| `boolean` | Toggle | showHeader, showLabel |
| `date` | Date picker | — |
| `time` | Time picker | — |
| `object` | Nested object | — |
| `array` | List, optional items.enum | hiddenRowKeys |

## Groups

Properties can be grouped for organization in the edit form:

- **Layout** — showHeader, showBackground, showLabel, showValue
- **Label** — labelFontFamily, labelFontSize, labelColor
- **Value** — valueFontFamily, valueFontSize, valueColor
- **Background & Border** — backgroundColor, borderColor
- **Rows** — row visibility, etc.

## format and x-theme-default

| Field | Purpose |
|-------|---------|
| `format` | Theme-aware styling: `font-family`, `font-size`, `font-weight`, `font-style`, `text-align`, `color`, `element-ref`, `file-picker`, `file-upload`, `range` |
| `x-theme-default` | Binds to a theme color (e.g. `textPrimary`, `accentGreen`, `bgSecondary`, `borderColor`). When empty, the element template uses the theme's default for that key. |

Example:

```json
"labelColor": {
  "type": "text",
  "default": "",
  "group": "Label",
  "format": "color",
  "x-theme-default": "textPrimary"
}
```

## Native vs Custom Properties

| | Native | Custom |
|---|--------|--------|
| **Examples** | `value`, `state`, `active` | `showHeader`, `labelColor`, `precision` |
| **Storage** | Never in `PropertiesJson` | Stored in `PropertiesJson` |
| **Template config form** | Excluded (not shown) | Shown in Appearance tab (template-defined) or Custom Properties tab (user-added) |
| **Element template receives** | From element view model | From `DynamicProperties` |

Native properties are part of the element's domain model (e.g., a Global Variable's `value`, a Toggle Switch's `state`). Custom properties are either template-defined (from `ui-controls.json`) or user-added configuration stored on the element in `PropertiesJson`.
