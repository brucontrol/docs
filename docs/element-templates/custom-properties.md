---
id: custom-properties
title: Custom Properties
sidebar_position: 5
---

# Custom Properties

Custom properties are configurable options for an element template. Template-defined properties come from the template's `ui-controls.json` schema and appear in the **Appearance** tab of the element Edit Drawer. User-added properties (not in the template) appear in the **Custom Properties** tab.

## uiControls Schema

Each template can define a `ui-controls.json` file (or `UIControlsJson` in the database) with a flat map of property names to control definitions. The schema is a **flat dictionary** — keys are property names, values are control definitions. There is no `"properties"` wrapper.

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

## Schema Fields

| Field | Type | Description |
|-------|------|-------------|
| `type` | string | One of: `text`, `number`, `boolean`, `date`, `time`, `object`, `array` |
| `title` | string | Display label shown in the edit form |
| `description` | string | Help text displayed as a tooltip |
| `default` | any | Default value when the property is not set |
| `group` | string | Group for organization (e.g. "Layout", "Label", "Value", "Background & Border") |
| `min`, `max`, `step` | number | For number/range controls |
| `enum` | array | For constrained choices — user picks from a list of allowed values |
| `format` | string | Format hint (see Format Values below) |
| `hidden` | boolean | When `true`, the property is not shown in the Appearance tab but is still available in the data object |
| `x-theme-default` | string | Theme key when value is empty (e.g. `textPrimary`, `accentGreen`, `bgSecondary`, `borderColor`) |
| `accept` | string | For `file-upload`: MIME/types (e.g. `image/*,.png,.jpg`) |
| `pickerTitle` | string | For `file-upload`: dialog title |

## Format Values

| Format | Purpose |
|--------|---------|
| `font-family` | Font picker |
| `font-size` | Font size (use min/max) |
| `font-weight` | Font weight |
| `font-style` | Font style |
| `text-align` | Text alignment |
| `color-alpha` | Color picker; hex #RRGGBB or #RRGGBBAA; theme-aware via `x-theme-default` |
| `element-ref` | References another element by ID. The edit form shows an element picker |
| `file-upload` | File picker; use `accept` for MIME types, `pickerTitle` for dialog title |
| `range` | Slider (use min, max, step) |

### element-ref format

The `element-ref` format allows a property to reference another element by ID. In the edit form, this renders as an element picker dropdown:

```json
{
  "linkedElement": {
    "type": "text",
    "title": "Linked Element",
    "default": "",
    "format": "element-ref",
    "group": "Data"
  }
}
```

### enum for constrained choices

Use the `enum` field to restrict a property to a set of allowed values:

```json
{
  "alignment": {
    "type": "text",
    "title": "Text Alignment",
    "default": "center",
    "enum": ["left", "center", "right"],
    "group": "Layout"
  }
}
```

## Groups

Properties can be grouped for organization in the edit form:

- **Layout** — showHeader, showBackground, showLabel, showValue
- **Label** — labelFontFamily, labelFontSize, labelColor
- **Value** — valueFontFamily, valueFontSize, valueColor
- **Background & Border** — backgroundColor, borderColor
- **Rows** — row visibility, etc.

## x-theme-default

When the user leaves a color (or other theme-bound) property empty, the template uses the theme's default. `x-theme-default` binds to a theme key. The `x-theme-default` field values use **camelCase** (e.g., `textPrimary`, `bgSecondary`, `accentGreen`, `borderColor`) to match the `ThemeColorSetViewModel` property names. The CSS variables use kebab-case (e.g., `--text-primary`, `--bg-secondary`), but the `x-theme-default` values are camelCase.

Example:

```json
"labelColor": {
  "type": "text",
  "default": "",
  "group": "Label",
  "format": "color-alpha",
  "x-theme-default": "textPrimary"
}
```

## File Upload

For properties that accept uploaded files (images, sounds):

```json
"image": {
  "type": "text",
  "default": "",
  "format": "file-upload",
  "title": "Background Image",
  "accept": "image/*,.png,.jpg,.jpeg,.gif,.webp,.svg,.bmp,.ico,.avif",
  "pickerTitle": "Select Background Image"
}
```

## Hidden Properties

Use `hidden: true` to define a property that is available in the data object but not shown in the Appearance tab. This is useful for internal state or computed values:

```json
{
  "internalState": {
    "type": "text",
    "default": "idle",
    "hidden": true
  }
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

:::warning Do not shadow native properties
For device elements, do not include native property names like `value` or `state` in `ui-controls.json`. They would shadow live hardware data. Only include template-specific options (colors, labels, visibility, display ranges). See [Common Pitfalls](element-template-developer-guide.md#14-common-pitfalls) in the developer guide.
:::

For the complete ui-controls schema, format values, and plugin authoring guide, see [Element Template Developer Guide](element-template-developer-guide.md).
