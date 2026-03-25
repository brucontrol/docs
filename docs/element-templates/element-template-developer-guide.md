---
id: element-template-developer-guide
title: Element Template Developer Guide
sidebar_position: 2
---

# BruControl Element Template Developer Guide

> Complete reference for external developers building element template plugins for BruControl. Use the [plugin-library](https://github.com/brucontrol/plugin-library) as source of truth. An LLM given this document and a design reference can produce a working plugin.

---

## Quick Start

1. **Create folder** — `element-templates/{your-template-name}/`
2. **Add manifest** — `element-template.yaml` with `name`, `description`, `supportedTypes` (and optionally `defaultFor`)
3. **Add source files** — `index.html`, `style.css`, `index.js` (all required)
4. **Add ui-controls** — `ui-controls.json` if your template has configurable properties
5. **Use the SDK** — Call `BruControl.onData(callback)` to receive element data; use `BruControl.updateProperties(props)` or host pickers (`requestKeypad`, `requestSelection`, etc.) to send changes

## Checklist for LLM

When generating a plugin from a photo or spec:

- [ ] Create folder under `element-templates/`
- [ ] Write `element-template.yaml` with `supportedTypes` matching the element type(s)
- [ ] Write `index.html` (structure), `style.css` (styles), `index.js` (logic)
- [ ] Add `ui-controls.json` if the template needs configurable options (colors, fonts, visibility)
- [ ] Use `BruControl.onData(render)` to receive and render element data
- [ ] Use `BruControl.updateProperties({ key: value })` for user-controlled changes
- [ ] Use `BruControl.requestKeypad`, `requestTextInput`, `requestSelection`, `fetchExternal`, etc. for input dialogs and data fetching when appropriate
- [ ] Resolve colors via `BruControl.getTheme()` or `getComputedStyle` for theme-aware styling
- [ ] Use strict `!== undefined` checks for optional text (not `||`) so users can intentionally blank fields
- [ ] Read custom properties at root level: `data.title`, `data.min` — not `data.appearance.title`
- [ ] **Call** `BruControl.onData(callback)` — do not assign `BruControl.onData = callback` (that breaks the pipeline)
- [ ] Do not put native properties (`value`, `state`, etc.) in ui-controls.json for device elements — they shadow live hardware data
- [ ] Use the first `onData` payload as initialization; do not rely only on DOMContentLoaded (it can race with data)
- [ ] ui-controls.json is a flat dictionary (no `"properties"` wrapper); use `default`, `title`, `type: "text"`
- [ ] For dropdown/select controls, use `type: "text"` with an `enum` array (there is no `type: "select"`)
- [ ] For file-upload, use `accept` and `pickerTitle` (not `x-accept` or `x-picker-title`)
- [ ] For `requestSelection`, pass `options: string[]` (not `items: [{value, label}]`)

---

## Table of Contents

1. [Plugin Structure](#1-plugin-structure)
2. [Manifest (element-template.yaml)](#2-manifest-element-templateyaml)
3. [Source Files](#3-source-files)
4. [UIControls Schema (ui-controls.json)](#4-uicontrols-schema-ui-controlsjson)
5. [Base Element Properties](#5-base-element-properties)
6. [Element Types Reference](#6-element-types-reference)
7. [Multi-Type Templates (Native vs Custom Properties)](#7-multi-type-templates-native-vs-custom-properties)
8. [BruControl SDK](#8-brucontrol-sdk)
9. [SDK Methods Reference](#9-sdk-methods-reference)
10. [Theme and Colors](#10-theme-and-colors)
11. [Control Examples](#11-control-examples)
12. [Complete Example: Water Level Meter](#12-complete-example-water-level-meter)
13. [Full SDK Source](#13-full-sdk-source)
14. [Common Pitfalls](#14-common-pitfalls)
15. [Build Pipeline Notes](#15-build-pipeline-notes)

---

## 1. Plugin Structure

Each element template lives in a folder under `element-templates/`:

```
element-templates/{template-name}/
├── element-template.yaml   # Required: manifest (name, supportedTypes, etc.)
├── index.html              # Required: HTML structure
├── style.css               # Required: styles (inlined into compiled HTML)
├── index.js                # Required: template logic (uses window.BruControl)
├── ui-controls.json        # Optional: configurable properties schema
├── package.json            # Optional: npm deps (rare)
└── dependencies.json       # Optional: external script URLs (loaded before SDK)
```

**Reference templates:** `generic`, `water-level-meter`, `gv-value`, `toggle-switch`, `digital-output`

---

## 2. Manifest (element-template.yaml)

Each template must have an `element-template.yaml` manifest.

**Runtime fields** (parsed and used by BruControl at install/load):

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Display name (e.g. "Timer - Card") |
| `description` | string | No | Short description |
| `supportedTypes` | string[] | Yes | Element types this template supports |
| `defaultFor` | string | No | Single type this template is the default for |
| `defaultWidth` | int | No | Default width in pixels when creating a new element |
| `defaultHeight` | int | No | Default height in pixels |
| `id` | string (UUID) | No* | Stable plugin ID; `generate-manifests` assigns if missing |

\*`id` is required for registry publish; the script assigns one if missing.

**Registry-only fields** (used by the plugin store / CI pipeline; silently ignored by the app at runtime):

| Field | Type | Description |
|-------|------|-------------|
| `version` | string | Semantic version; defaults to `1.0.0` or from `package.json` |
| `beta` | boolean | Set by CI; do not edit manually |
| `tags` | string[] | Discoverability tags for the plugin store |
| `collection` | string | Group name (e.g. "BruControl Cards") |

### Examples

**Generic (single type, default):**
```yaml
name: Generic Element - Card
collection: BruControl Cards
description: Built-in default element template for generic elements.
version: 1.0.10
supportedTypes:
  - generic
defaultFor: generic
defaultWidth: 160
defaultHeight: 160
id: e9956a29-972c-4f64-9caf-3cb8b5ecbb7d
beta: false
```

**Global Variable (multiple types):**
```yaml
name: Global Variable - Card
supportedTypes:
  - globalVariable-bool
  - globalVariable-value
  - globalVariable-string
  - globalVariable-datetime
  - globalVariable-timespan
defaultFor: globalVariable-value
defaultWidth: 160
defaultHeight: 160
```

**Water Level Meter (generic, no default):**
```yaml
name: Water Level Meter
description: Displays a value between min and max as a water level gauge.
version: 1.0.8
supportedTypes:
  - generic
id: ce890220-fd42-4197-9fda-c522e286f0ca
beta: false
```

**Digital Output (device element):**
```yaml
name: Digital Output - Card
description: Built-in digital output element template.
version: 1.1.7
supportedTypes:
  - digitalOutput
defaultFor: digitalOutput
defaultWidth: 160
defaultHeight: 160
```

---

## 3. Source Files

### index.html

- Defines the DOM structure.
- Link to `style.css`: `<link rel="stylesheet" href="style.css">`
- Script tag for `index.js`: `<script src="index.js"></script>`
- No external scripts except via `dependencies.json` (those load before the SDK).

**Example (generic):**
```html
<div id="element">
  <div class="element-header">
    <span class="element-title" id="elementTitle">Generic</span>
  </div>
  <div class="element-content">
    <div id="propertyList"></div>
  </div>
</div>
```

**Example (water-level-meter):**
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="style.css">
</head>
<body data-element-type="generic">
  <div id="element">
    <div id="water-container">
      <div id="water-fill">
        <div class="water-surface"></div>
        <div id="bubbles"></div>
      </div>
    </div>
  </div>
  <script src="index.js"></script>
</body>
</html>
```

### style.css

- Inlined into the compiled HTML at build time.
- Use theme CSS variables: `var(--bg-primary)`, `var(--accent-green)`, `var(--text-primary)`, etc.
- The SDK injects `:root { --bg-primary: #1e1e1e; ... }` from the current theme.

### index.js

- Vanilla JavaScript; no build step.
- Use an IIFE pattern: `(function() { ... })();`
- `window.BruControl` is injected by the host before your script runs.
- Call `BruControl.onData(callback)` to receive element data; the callback is invoked whenever data changes.

### dependencies.json

Optional. Maps dependency names to CDN URLs. Loaded before the SDK.

```json
{
  "some-lib": "https://cdn.example.com/some-lib.min.js"
}
```

---

## 4. UIControls Schema (ui-controls.json)

`ui-controls.json` defines configurable properties that appear in the element Edit Drawer under the **Appearance** tab.

**Schema shape:** BruControl uses a **flat dictionary**, not standard JSON Schema. The file is a single object whose keys are property names and whose values are control definitions. There is no `"properties"` wrapper. Use keys like `default`, `title`, and `type: "text"` (not `defaultValue` or a nested schema).

### Do not put native properties in ui-controls.json (shadowing)

**Critical:** Any property you define in ui-controls.json is treated as a **user-defined setting** and is stored in the element's config. If you add a key that is also a **native** property of the element (e.g. `value`, `state`, `precision`), it **shadows** the live data from the hardware or element model.

- For **device elements** (e.g. analogInput, owTemp, digitalOutput): do **not** include `value`, `state`, or other native fields in ui-controls.json if you want the live sensor/output value to pass through. Use only template-specific options (e.g. `labelColor`, `showHeader`, `min`/`max` for display range on a gauge).
- For **generic** elements, `value`/`min`/`max` can be template display config (e.g. water-level-meter), but for device elements omit native keys so live data flows through.

### Control Types

| Type | Purpose | Renders as | Example |
|------|---------|------------|---------|
| `text` | String | Text input (or dropdown when `enum` is provided — see below) | label, font-family |
| `number` | Numeric, optional min/max/step | Number input (or range slider with `format: "range"`) | fontSize, value |
| `boolean` | Toggle | Checkbox | showHeader, showLabel |
| `date` | Date picker | Native date input | — |
| `time` | Time picker | Text input (hh:mm:ss) | — |
| `object` | Nested object | JSON textarea | — |
| `array` | List, optional `items` sub-schema | Falls through to text input (no dedicated editor) | hiddenRowKeys |

### Dropdown / Select (text + enum)

There is no dedicated `select` type. To create a dropdown, use **`type: "text"` with an `enum` array**:

```json
{
  "mode": {
    "type": "text",
    "title": "Operating Mode",
    "default": "auto",
    "enum": ["auto", "manual", "off"],
    "group": "General"
  }
}
```

This renders a native `<select>` in the Appearance tab. Each `enum` value is used as both the option value and the display label. The stored value is the selected string.

### Format Values

The `format` field provides specialized rendering for `text` and `number` controls:

| Format | Type | Renders as |
|--------|------|------------|
| `font-family` | text | Searchable font picker (system + Google Fonts) |
| `font-size` | number | Number input with "px" suffix |
| `font-weight` | text | Dropdown (100 Thin → 900 Black) |
| `font-style` | text | Dropdown (Normal, Italic, Oblique) |
| `text-align` | text | Button group (Left, Center, Right) |
| `color` | text | Color picker (hex #RRGGBB) |
| `color-alpha` | text | Color picker with alpha (hex #RRGGBB or #RRGGBBAA); theme-aware via `x-theme-default` |
| `element-ref` | text | Element picker filtered by `elementType`; requires `elementType` field |
| `file-upload` | text | File path input + Browse modal + Clear button; use `accept`, `pickerTitle`, `initialPath` |
| `file-picker` | text | Alias for `file-upload` |
| `range` | number | Range slider + number input (use `min`, `max`, `step`) |

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `type` | string | One of: `text`, `number`, `boolean`, `date`, `time`, `object`, `array` |
| `title` | string | Display label |
| `description` | string | Help text shown below the control |
| `default` | any | Default value |
| `group` | string | Group for organization (e.g. "Layout", "Label", "Value", "Background & Border") |
| `format` | string | Format hint that changes rendering (see above) |
| `min`, `max`, `step` | number | For `number` and `range` controls |
| `enum` | array | String array for dropdown (`type: "text"` + `enum` → `<select>`) |
| `precision` | number | Decimal precision for number values |
| `elementType` | string | Required for `format: "element-ref"` — filters element picker by type |
| `accept` | string | For `file-upload`: MIME/type filter (e.g. `"image/*,.png,.jpg"`) |
| `pickerTitle` | string | For `file-upload`: dialog title (e.g. `"Select Background Image"`) |
| `initialPath` | string | For `file-upload`: initial directory path in file picker |
| `items` | UIControlDefinition | For `type: "array"` — schema definition for list items |
| `x-theme-default` | string | Theme key used as fallback when value is empty (e.g. `textPrimary`, `accentGreen`, `bgSecondary`, `borderColor`) |
| `hidden` | boolean | When true, not shown in Appearance tab (used for internal storage like anchors) |

### x-theme-default

When the user leaves a color (or other theme-bound) property empty, the template uses the theme's default. `x-theme-default` binds to a theme key. The `x-theme-default` field values use **camelCase** (e.g., `textPrimary`, `bgSecondary`, `accentGreen`, `borderColor`) to match the `ThemeColorSetViewModel` property names. The CSS variables use kebab-case (e.g., `--text-primary`, `--bg-secondary`), but the `x-theme-default` values are camelCase.

### Example (generic ui-controls.json)

```json
{
  "showHeader": {
    "type": "boolean",
    "default": true,
    "description": "Show header bar",
    "group": "Layout"
  },
  "labelColor": {
    "type": "text",
    "default": "",
    "group": "Label",
    "format": "color-alpha",
    "x-theme-default": "textPrimary"
  },
  "valueColor": {
    "type": "text",
    "default": "",
    "group": "Value",
    "format": "color-alpha",
    "x-theme-default": "accentGreen"
  },
  "image": {
    "type": "text",
    "default": "",
    "group": "Background & Border",
    "format": "file-upload",
    "title": "Background Image",
    "accept": "image/*,.png,.jpg,.jpeg,.gif,.webp,.svg,.bmp,.ico,.avif",
    "pickerTitle": "Select Background Image"
  }
}
```

### Example (dropdown via text + enum)

```json
{
  "unit": {
    "type": "text",
    "title": "Display Unit",
    "default": "celsius",
    "enum": ["celsius", "fahrenheit", "kelvin"],
    "group": "General"
  },
  "displayMode": {
    "type": "text",
    "title": "Display Mode",
    "default": "gauge",
    "enum": ["gauge", "numeric", "bar"],
    "group": "Layout"
  }
}
```

### Example (water-level-meter ui-controls.json)

```json
{
  "value": { "type": "number", "title": "Value", "default": 50, "min": 0, "max": 100 },
  "min": { "type": "number", "title": "Minimum", "default": 0 },
  "max": { "type": "number", "title": "Maximum", "default": 100 },
  "liquidColor": {
    "type": "text",
    "title": "Liquid Color",
    "default": "",
    "format": "color-alpha",
    "x-theme-default": "accentBlue"
  },
  "levelTransitionMs": {
    "type": "number",
    "title": "Level Transition (ms)",
    "default": 500,
    "min": 100,
    "max": 3000,
    "step": 50
  },
  "bubbleDensity": {
    "type": "number",
    "title": "Bubble Density",
    "default": 8,
    "min": 0,
    "max": 20,
    "step": 1
  }
}
```

---

## 5. Base Element Properties

Every element template receives a flat data object. These keys are always present (base):

| Key | Description |
|-----|--------------|
| `id` | Element GUID |
| `workspaceId` | Workspace GUID |
| `name` | Element name |
| `displayName` | Display name (user-editable) |
| `enabled` | Whether element is enabled |
| `userControl` | Whether user can control (if false, updateProperties is ignored) |
| `visibility` | Visibility setting |
| `elementType` | Element type (e.g. `generic`, `globalVariable-value`, `digitalOutput`) |
| `enableHistoricalLogging` | Logging enabled |
| `loggingIntervalSeconds` | Logging interval |
| `maxSilenceSeconds` | Max silence |

**Custom properties from ui-controls.json** (e.g. `title`, `labelColor`, `min`, `liquidColor`) are **flattened onto the root data object**. Use `data.title`, `data.min`, etc. — not `data.appearance.title`.

**Stripped before receiveData (not in template payload):** `propertiesJson`, `schemaJson`, `uiControls`, `elementTemplateId`

**Additional keys** depend on element type: `value`, `state`, `isRunning`, `variableType`, `precision`, `channels`, etc. See [Element Types Reference](#6-element-types-reference).

### Flat data mapping

**Custom properties from ui-controls.json are flattened onto the root data object.** You receive them at the top level, not nested.

- ✅ `data.title`, `data.min`, `data.labelColor`, `data.liquidColor` — correct
- ❌ `data.appearance.title`, `data.properties.min` — wrong

The `appearance` object (when present) holds only layout metadata (X, Y, Width, Height, Z, Rotation) used by the dashboard — it is separate from ui-controls. All properties defined in your `ui-controls.json` appear as root-level keys on the data object.

---

## 6. Element Types Reference

### All Element Types

**GlobalVariable:**
- `globalVariable-bool`, `globalVariable-value`, `globalVariable-string`, `globalVariable-datetime`, `globalVariable-timespan`

**Non-device:**
- `toggleSwitch`, `button`, `timer`, `alarm`, `scriptElement`, `chart`, `profile`, `generic`

**Device:**
- `digitalOutput`, `digitalInput`, `dutyCycle`, `pwmOutput`, `analogInput`, `counter`, `owTemp`, `spiSensor`, `hydrometer`, `hysteresis`, `pid`, `deadband`

### Per-Type Native Properties (examples)

| Element Type | Native Properties | Notes |
|--------------|------------------|-------|
| `globalVariable-value` | `value`, `variableType`, `precision` | value is string or number |
| `globalVariable-bool` | `value` | "True" / "False" |
| `toggleSwitch` | `state`, `onLabel`, `offLabel` | state is boolean |
| `digitalOutput` | `state`, `activeLow`, `deviceConnected` | state is boolean |
| `button` | — | Trigger on click |
| `timer` | `isRunning`, `elapsed`, `duration`, etc. | |
| `chart` | `channels`, `spanSeconds`, `maxPoints`, etc. | |
| `generic` | Any custom keys from PropertiesJson | Flexible |
| `analogInput` | `value`, `rawValue`, `precision`, `unit` | |
| `pwmOutput` | `value`, `requestedValue`, `pwm` | |

Native properties are never stored in `PropertiesJson`; they come from the element's domain model. Custom properties (from ui-controls) are stored in `PropertiesJson` and flattened onto the data object.

---

## 7. Multi-Type Templates (Native vs Custom Properties)

A single template can support multiple element types. This is one of the most powerful — and most nuanced — features of the system. Understanding how native properties and custom properties interact across types is critical.

### How supportedTypes works

In `element-template.yaml`, list every element type the template should work with:

```yaml
name: Value Display - Card
supportedTypes:
  - globalVariable-value
  - globalVariable-string
  - generic
defaultFor: globalVariable-value
```

When a user assigns this template to an element, BruControl checks that the element's type is in `supportedTypes`. The **same compiled HTML/JS** runs for every supported type — your template code must handle the differences.

### Native properties vs custom properties

Every element type has a set of **native properties** — fields that come from the element's domain model (hardware, scripting engine, etc.). These are determined by reflection on the element's view model type.

| Element Type | Native Properties | Notes |
|--------------|------------------|-------|
| `generic` | **None** | All properties are custom |
| `globalVariable-value` | `value`, `variableName`, `precision`, `format`, `variableType` | `value` is the live variable |
| `globalVariable-bool` | `value`, `variableName`, `variableType` | `value` is `"True"`/`"False"` |
| `globalVariable-string` | `value`, `variableName`, `variableType` | `value` is a string |
| `toggleSwitch` | `state` | boolean |
| `digitalOutput` | `state`, `portId`, `deviceConnected`, `activeLow`, ... | boolean state + device metadata |
| `analogInput` | `value`, `rawValue`, `precision`, `prefix`, `suffix`, ... | live sensor value |
| `owTemp` | `value`, `rawValue`, ... | live temperature |

**The key rule:** When a template defines a property in `ui-controls.json` that shares a name with a native property, what happens depends on the element type:

### The value field across types — a concrete example

Suppose your template defines `value` in `ui-controls.json`:

```json
{
  "value": { "type": "number", "title": "Value", "default": 50, "min": 0, "max": 100 }
}
```

**When this template is assigned to a `generic` element:**
- `generic` has **no native properties** (its native set is empty)
- `value` from ui-controls is stored in `PropertiesJson` as a custom property
- The template receives `data.value = 50` (the default from ui-controls)
- Users can edit `value` via the Appearance tab — it's a configurable setting
- The template controls this value entirely

**When this template is assigned to a `globalVariable-value` element:**
- `globalVariable-value` has `value` as a **native property**
- BruControl detects the collision and **strips** `value` from `PropertiesJson` — it is never stored as a custom property
- The template receives `data.value = 42.5` (the **live variable value** from the element model)
- The `value` field does **not** appear in the Appearance tab for this element type
- The template reads the live value and can update it via `updateProperties({ value: newVal })`

**This happens automatically.** The server uses `NativePropertyKeysService` to determine which keys are native for each element type, and:
1. `DefaultTemplateResolver.ApplyDefaultTemplate` skips writing native keys to `Properties`
2. `DefaultTemplateResolver.ApplyTemplate` removes native keys from the merged property bag
3. `ElementTemplateSyncService` strips native keys before persisting
4. `ElementMapper.ToFlatViewModel` excludes native keys from `DynamicProperties` (they come from the typed view model instead)

### Switching on elementType in your template

Your `onData` callback always receives `data.elementType` (e.g. `"globalVariable-value"`, `"generic"`, `"toggleSwitch"`). Use this to branch your logic:

```javascript
function render(data) {
  var label = data.displayName || data.name || 'Element';
  document.getElementById('title').textContent = label;

  switch (data.elementType) {
    case 'globalVariable-value':
    case 'globalVariable-string':
    case 'globalVariable-datetime':
    case 'globalVariable-timespan':
      // value comes from the live variable — read-only display or use a picker to change it
      renderLiveValue(data);
      break;

    case 'globalVariable-bool':
      // value is "True"/"False" — render as a toggle
      renderBoolToggle(data);
      break;

    case 'toggleSwitch':
      // uses state (boolean), not value
      renderToggle(data.state);
      break;

    case 'generic':
      // value is a custom property from ui-controls — use it as display config
      renderGauge(data.value, data.min, data.max);
      break;

    default:
      renderFallback(data);
  }
}
```

### Using variableType for global variable subtypes

For global variables, `data.variableType` tells you the subtype (`"Value"`, `"Boolean"`, `"String"`, `"DateTime"`, `"TimeSpan"`). This is essential for choosing the right picker:

```javascript
function handleValueClick() {
  if (!currentData || currentData.userControl === false) return;
  if (!window.BruControl) return;

  var vt = String(currentData.variableType || 'Value');

  if (vt === 'Value') {
    window.BruControl.requestKeypad({
      currentValue: String(currentData.value || '0'),
      label: currentData.displayName || 'Set Value',
      precision: currentData.precision,
      allowNegative: true
    }).then(function(result) {
      if (result !== null) window.BruControl.updateProperties({ value: String(result) });
    });
  } else if (vt === 'Boolean') {
    var isTrue = /^(true|1|on)$/i.test(String(currentData.value || ''));
    window.BruControl.updateProperties({ value: isTrue ? 'False' : 'True' });
  } else if (vt === 'String') {
    window.BruControl.requestTextInput({
      currentValue: String(currentData.value || ''),
      label: currentData.displayName || 'Set Value'
    }).then(function(result) {
      if (result !== null) window.BruControl.updateProperties({ value: String(result) });
    });
  } else if (vt === 'TimeSpan') {
    window.BruControl.requestTimeSpanPicker({
      currentValue: String(currentData.value || ''),
      label: currentData.displayName || 'Set Duration'
    }).then(function(result) {
      if (result !== null) window.BruControl.updateProperties({ value: String(result) });
    });
  } else if (vt === 'DateTime') {
    window.BruControl.requestDateTimePicker({
      currentValue: String(currentData.value || ''),
      label: currentData.displayName || 'Set Date/Time'
    }).then(function(result) {
      if (result !== null) window.BruControl.updateProperties({ value: String(result) });
    });
  }
}
```

### Toggle templates across toggleSwitch and globalVariable-bool

A toggle template can support both `toggleSwitch` and `globalVariable-bool`, but the update API differs:

```javascript
function handleToggleClick() {
  if (!currentData || !window.BruControl) return;
  if (currentData.userControl === false) return;

  if (currentData.elementType === 'toggleSwitch') {
    // toggleSwitch uses native "state" (boolean)
    window.BruControl.updateProperties({ state: !currentData.state });
  } else {
    // globalVariable-bool uses native "value" ("True"/"False" strings)
    var isTrue = /^(true|1|on)$/i.test(String(currentData.value || ''));
    window.BruControl.updateProperties({ value: isTrue ? 'False' : 'True' });
  }
}

function isOn(data) {
  if (data.elementType === 'toggleSwitch') return Boolean(data.state);
  return /^(true|1|on)$/i.test(String(data.value || ''));
}
```

### Design patterns for multi-type templates

**Pattern 1: Generic-only template with display config**

For templates like a gauge or meter that only support `generic`, you can freely use `value`, `min`, `max` in ui-controls — they are all custom properties:

```json
{
  "value": { "type": "number", "default": 50, "min": 0, "max": 100 },
  "min": { "type": "number", "default": 0 },
  "max": { "type": "number", "default": 100 }
}
```

**Pattern 2: Multi-type template with safe custom properties**

For templates that support both `generic` and typed elements, avoid ui-controls keys that collide with native properties. Use distinct names:

```json
{
  "displayMin": { "type": "number", "title": "Display Minimum", "default": 0 },
  "displayMax": { "type": "number", "title": "Display Maximum", "default": 100 },
  "showLabel": { "type": "boolean", "default": true },
  "labelColor": { "type": "text", "format": "color-alpha", "x-theme-default": "textPrimary" }
}
```

This way, on a `globalVariable-value` the template reads the live `data.value` from the native field and uses `data.displayMin`/`data.displayMax` for gauge bounds. On a `generic`, there is no native `value` — the template would need to handle that case (e.g. show a placeholder or use `data.displayMin` as the default).

**Pattern 3: Intentional collision for dual behavior**

You can intentionally define `value` in ui-controls knowing it will behave differently:

- On `generic`: `value` becomes a user-editable config slider in the Appearance tab
- On `globalVariable-value`: `value` is stripped and the live variable value passes through

Your template code handles both:

```javascript
function render(data) {
  var value = parseFloat(data.value);
  if (isNaN(value)) value = 0;

  // Same rendering logic — the value source is different per type but the template doesn't care
  updateGauge(value, data.min || 0, data.max || 100);
}
```

This is the **recommended approach** for templates like gauges and meters that should work as both standalone display widgets (generic) and live data displays (globalVariable, analogInput, etc.).

### What gets stripped before reaching your template

Before the host sends data to your iframe via `receiveData`, it strips these internal keys:
- `propertiesJson` — raw JSON storage string
- `schemaJson` — JSON Schema for properties
- `uiControls` — control definitions (used by the Appearance tab, not the template)
- `elementTemplateId` — which template is assigned

Your template never sees these. Everything else on the flat data object is available.

---

## 8. BruControl SDK

The SDK is injected into every compiled template iframe. Your template runs in a sandboxed iframe; communication with the dashboard uses **Penpal v7**.

- **`window.BruControl`** — Public API
- **Host → Template:** `receiveData`, `receiveTheme`, `receiveSamples`, `receiveElementUpdate`
- **Template → Host:** `updateProperties`, `requestKeypad`, `requestTextInput`, `requestSelection`, `fetchSamples`, `subscribeElement`, etc.

**Registration methods, not properties:** `onData`, `onTheme`, `onSamples`, and `onElementUpdate` are **methods you call with a callback**. Do not assign to them (e.g. `BruControl.onData = function(data) { ... }`). Assigning overwrites the internal method and breaks the data pipeline. Always call: `BruControl.onData(function(data) { ... })`.

**Unified SDK:** The SDK is a single JavaScript file embedded as a resource in both the TypeScript (editor preview / dashboard) and C# (server-side plugin compilation) paths. Both inject the same `window.BruControl` API surface including `fetchExternal` and `THEME_KEYS`. There is no separate "C# version" — the JS SDK source is shared.

**No explicit init hook:** There is no `onInit` or `onMount`. The first time your `onData` callback runs is the de facto initialization. Use that first payload to build or update the DOM. Relying only on `DOMContentLoaded` can race with BruControl's template injection — the host may not have sent data yet.

**CDN scripts loaded before your code:** The following libraries are injected into every template iframe before the SDK and your code:

| Library | Version | Global |
|---------|---------|--------|
| Penpal | v7.0.4 | `window.Penpal` |
| Chart.js | 4.4.6 | `window.Chart` (also `window.BruControlLibs.Chart`) |
| chartjs-adapter-date-fns | 3.x | (auto-registers with Chart.js) |

:::tip BruControlLibs.Chart
To access Chart.js from your template, use `window.BruControlLibs.Chart` or `window.Chart`. The SDK sets up `BruControlLibs.Chart` as a convenience reference.
:::

**Safe area:** The SDK injects `body { padding: 1px; }` so borders/shadows are not clipped.

**Theme:** The SDK injects `:root { --bg-primary: #1e1e1e; --text-primary: #fff; ... }` from the current theme.

---

## 9. SDK Methods Reference

### Core Data and Theme

| Method | Signature | Returns | Description |
|--------|-----------|---------|-------------|
| `onData` | `(callback: (data) => void) => void` | — | **Call** with a callback to register (e.g. `BruControl.onData(fn)`). Do not assign (`BruControl.onData = fn`). Register callback for element data updates; called immediately if data already exists. |
| `onTheme` | `(callback: (theme) => void) => void` | — | Register callback for theme color updates. |
| `updateProperties` | `(props: object) => void` | — | Patch element properties. Ignored if `userControl === false`. |
| `getData` | `() => unknown` | Current data or null | Get current element data synchronously. |
| `getTheme` | `() => Record<string, string>` | Theme object | Get current theme colors (kebab-case keys → hex values). |

**Example (onData, updateProperties):**
```javascript
function render(data) {
  document.getElementById('elementTitle').textContent = data.displayName || data.name || 'Element';
  document.getElementById('valueDisplay').textContent = data.value ?? '--';
}

if (window.BruControl) {
  window.BruControl.onData(render);
  // Optional: re-render on theme change
  window.BruControl.onTheme(function() {
    var data = window.BruControl.getData();
    if (data) render(data);
  });
} else {
  render({ displayName: 'Preview', value: 42 });
}
```

**Example (toggle switch — updateProperties):**
```javascript
function handleToggleClick() {
  if (!currentData || !window.BruControl || !canControl()) return;
  // ToggleSwitch uses state; GlobalVariable uses value
  if (currentData.elementType === 'toggleSwitch') {
    window.BruControl.updateProperties({ state: !currentData.state });
  } else {
    window.BruControl.updateProperties({ value: currentData.value ? 'False' : 'True' });
  }
}
```

### Chart Methods

| Method | Signature | Returns | Description |
|--------|-----------|---------|-------------|
| `onSamples` | `(callback: (sample) => void) => void` | — | Register callback for real-time chart samples. Auto-subscribes when callback added. |
| `fetchSamples` | `(elementId, index?, since?, points?) => Promise<Array>` | Chart samples | Fetch historical samples. Defaults: index 0, since 5 min ago, points 1000. |
| `fetchChartChannels` | `() => Promise<Array>` | Channel metadata | Fetch chart channel metadata. |
| `subscribeSamples` | `(chartId?) => Promise<boolean>` | — | Subscribe to real-time samples. |
| `unsubscribeSamples` | `(chartId?) => Promise<boolean>` | — | Unsubscribe. |

### Element Subscription (other elements)

| Method | Signature | Returns | Description |
|--------|-----------|---------|-------------|
| `subscribeElement` | `(elementType, elementId) => Promise<data \| null>` | Element data | Subscribe to live updates for another element. |
| `unsubscribeElement` | `(elementType, elementId) => Promise<boolean>` | — | Unsubscribe. |
| `onElementUpdate` | `(callback: (payload) => void) => void` | — | Callback receives `{ elementType, elementId, data }`. |
| `getElementData` | `(elementType, elementId) => unknown` | Last-known data or null | Get data for a subscribed element. |

### Host Pickers

| Method | Signature | Returns | Description |
|--------|-----------|---------|-------------|
| `requestKeypad` | `(options?) => Promise<string \| null>` | Entered value or null | Full-screen numeric keypad. |
| `requestTextInput` | `(options?) => Promise<string \| null>` | Entered text or null | Text input flyout. |
| `requestTimeSpanPicker` | `(options?) => Promise<string \| null>` | ISO 8601 duration or null | Time span picker. |
| `requestDateTimePicker` | `(options?) => Promise<string \| null>` | ISO 8601 datetime or null | Date/time picker. |
| `requestSelection` | `(options?) => Promise<string \| null>` | Selected option string or null | Selection dialog with a list of string options. |

**requestKeypad options:** `{ currentValue, label, min, max, precision, allowNegative }`

**requestTextInput options:** `{ currentValue, label, placeholder, maxLength }`

**requestTimeSpanPicker options:** `{ currentValue, label, allowDays, maxHours }`

**requestDateTimePicker options:** `{ currentValue, label, minDate, maxDate }`

**requestSelection options:** `{ options, label, currentValue }`

- `options` — Array of **strings** (each string is both the value and the display label)
- `label` — Title for the selection dialog
- `currentValue` — Currently selected string (for highlighting)

**Example (requestSelection):**
```javascript
function openModeSelector() {
  if (!window.BruControl || !window.BruControl.requestSelection) return;
  window.BruControl.requestSelection({
    options: ['Automatic', 'Manual', 'Off'],
    label: 'Select Mode',
    currentValue: currentData.mode || 'Automatic'
  }).then(function(result) {
    if (result !== null && window.BruControl) {
      window.BruControl.updateProperties({ mode: result });
    }
  });
}
```

### External HTTP Requests

| Method | Signature | Returns | Description |
|--------|-----------|---------|-------------|
| `fetchExternal` | `(init) => Promise<object>` | Response object | Send an HTTP request through the BruControl server proxy. |

**fetchExternal init:** `{ method, url, headers?, bodyBase64? }`

- `method` — HTTP method string (`"GET"`, `"POST"`, `"PUT"`, `"PATCH"`, `"DELETE"`)
- `url` — Absolute HTTPS URL of the external service
- `headers` — Optional `{ key: value }` request headers (only permitted headers are forwarded: Content-Type, Accept, Authorization, X-Api-Key, etc.)
- `bodyBase64` — Optional Base64-encoded request body (null for GET)

**fetchExternal response:** `{ statusCode, headers, bodyBase64?, error? }`

- `statusCode` — Upstream HTTP status code (0 for transport/validation errors)
- `headers` — Subset of upstream response headers
- `bodyBase64` — Base64-encoded response body (null when empty)
- `error` — Human-readable error string (only when `statusCode` is 0)

**Example (fetchExternal):**
```javascript
function fetchWeatherData(apiKey) {
  if (!window.BruControl || !window.BruControl.fetchExternal) return;
  window.BruControl.fetchExternal({
    method: 'GET',
    url: 'https://api.example.com/weather?city=Portland',
    headers: { 'X-Api-Key': apiKey, 'Accept': 'application/json' }
  }).then(function(response) {
    if (response.error) {
      console.error('Fetch failed:', response.error);
      return;
    }
    if (response.bodyBase64) {
      var json = JSON.parse(atob(response.bodyBase64));
      // Use json data...
    }
  }).catch(function(err) {
    console.error('fetchExternal not available:', err);
  });
}
```

### Constants

| Name | Value | Description |
|------|-------|-------------|
| `THEME_KEYS` | Array of strings | All theme CSS variable names. See [Theme and Colors](#10-theme-and-colors). |

---

## 10. Theme and Colors

### Theme Keys (BruControl.THEME_KEYS)

Background: `bg-primary`, `bg-secondary`, `bg-tertiary`, `bg-hover`, `bg-active`, `bg-selection`

Text: `text-primary`, `text-secondary`, `text-muted`

Border: `border-color`, `border-subtle`, `border-focus`

Accent: `accent-primary`, `accent-hover`, `accent-blue`, `accent-green`, `accent-yellow`, `accent-orange`, `accent-purple`, `accent-red`

Input: `input-background`, `input-foreground`, `input-border`

Scrollbar: `scrollbar-bg`, `scrollbar-thumb`, `scrollbar-thumb-hover`

List: `list-active-background`, `list-active-hover-background`

Editor: `editor-line-highlight`, `editor-line-number`, `editor-line-number-active`, `editor-cursor`, `editor-execution-line-running`, `editor-execution-line-paused`, `editor-execution-glyph-running`, `editor-execution-glyph-paused`, `editor-comment`, `editor-string`, `editor-keyword`, `editor-type`, `editor-function`, `editor-operator`

### Using Theme in Your Template

**Via CSS:** The SDK injects `:root { --bg-primary: #1e1e1e; --text-primary: #fff; ... }`. Use `var(--accent-green)` in your CSS.

**Via JavaScript:**
```javascript
function getThemeColor(cssVarName, fallback) {
  try {
    if (window.BruControl && window.BruControl.getTheme) {
      var theme = window.BruControl.getTheme();
      var key = cssVarName.replace(/^--/, '');
      if (theme && typeof theme[key] === 'string' && theme[key].trim())
        return theme[key].trim();
    }
    return getComputedStyle(document.documentElement).getPropertyValue(cssVarName).trim() || fallback;
  } catch (e) {
    return fallback;
  }
}

function resolveColor(value, themeVar, fallback) {
  if (value && /^#[0-9A-Fa-f]{6}$/.test(value.trim())) return value.trim();
  if (value && /^#[0-9A-Fa-f]{8}$/.test(value.trim())) return value.trim();
  return getThemeColor(themeVar, fallback);
}

// Usage: user override or theme default
var labelColor = resolveColor(data.labelColor, '--text-primary', '#d4d4d4');
```

---

## 11. Control Examples

### Numeric Keypad (gv-value)

```javascript
function openNumericKeypad() {
  if (!window.BruControl || !window.BruControl.requestKeypad) return;
  var currentVal = currentData ? String(currentData.value || '0') : '0';
  var precision = currentData && typeof currentData.precision === 'number' ? currentData.precision : undefined;
  var label = (currentData ? (currentData.displayName || currentData.name) : 'Value') || 'Set Value';

  window.BruControl.requestKeypad({
    currentValue: currentVal,
    label: label,
    precision: precision,
    allowNegative: true
  }).then(function(result) {
    if (result !== null && result !== undefined && window.BruControl) {
      window.BruControl.updateProperties({ value: String(result) });
    }
  });
}
```

### Text Input (gv-value)

```javascript
window.BruControl.requestTextInput({
  currentValue: currentVal,
  label: label,
  placeholder: undefined
}).then(function(result) {
  if (result != null && window.BruControl) {
    window.BruControl.updateProperties({ value: String(result) });
  }
});
```

### TimeSpan Picker (gv-value)

```javascript
window.BruControl.requestTimeSpanPicker({
  currentValue: currentVal,
  label: label,
  allowDays: true
}).then(function(result) {
  if (result != null && window.BruControl) {
    window.BruControl.updateProperties({ value: String(result) });
  }
});
```

### DateTime Picker (gv-value)

```javascript
window.BruControl.requestDateTimePicker({
  currentValue: currentVal,
  label: label
}).then(function(result) {
  if (result != null && window.BruControl) {
    window.BruControl.updateProperties({ value: String(result) });
  }
});
```

### Selection Dialog

```javascript
window.BruControl.requestSelection({
  options: ['Fahrenheit', 'Celsius'],
  label: 'Select Unit',
  currentValue: currentData.unit || 'Fahrenheit'
}).then(function(result) {
  if (result !== null && window.BruControl) {
    window.BruControl.updateProperties({ unit: result });
  }
});
```

### Click-to-Edit by Variable Type (gv-value)

```javascript
function handleValueClick() {
  if (!currentData || currentData.userControl === false) return;
  var vt = String(currentData.variableType || 'Value');
  if (vt === 'Value') openNumericKeypad();
  else if (vt === 'Boolean') {
    var isTrue = /^(true|1|on)$/i.test(String(currentData.value || ''));
    window.BruControl.updateProperties({ value: isTrue ? 'False' : 'True' });
  } else if (vt === 'TimeSpan') openTimeSpanPicker();
  else if (vt === 'DateTime') openDateTimePicker();
  else if (vt === 'String') openTextInputFlyout();
}
```

---

## 12. Complete Example: Water Level Meter

A full template that displays `value` between `min` and `max` as an animated water level.

### element-template.yaml

```yaml
name: Water Level Meter
description: Displays a value between min and max as a water level gauge.
version: 1.0.8
supportedTypes:
  - generic
id: ce890220-fd42-4197-9fda-c522e286f0ca
beta: false
```

### index.html

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="style.css">
</head>
<body data-element-type="generic">
  <div id="element">
    <div id="water-container">
      <div id="water-fill">
        <div class="water-surface"></div>
        <div id="bubbles"></div>
      </div>
    </div>
  </div>
  <script src="index.js"></script>
</body>
</html>
```

### index.js (core logic)

```javascript
(function () {
  var fill = document.getElementById('water-fill');
  var bubbleContainer = document.getElementById('bubbles');

  function getThemeColor(varName, fallback) {
    try {
      var val = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
      return val || fallback;
    } catch (e) {
      return fallback;
    }
  }

  function render(data) {
    if (!fill) return;
    data = data || {};

    var value = parseFloat(data.value);
    if (isNaN(value)) value = 0;
    var min = parseFloat(data.min);
    if (isNaN(min)) min = 0;
    var max = parseFloat(data.max);
    if (isNaN(max)) max = 100;

    var range = max - min;
    var pct = range <= 0 ? 0 : Math.max(0, Math.min(100, ((value - min) / range) * 100));

    fill.style.height = pct + '%';

    var liquidColor = (data.liquidColor && String(data.liquidColor).trim()) || getThemeColor('--accent-blue', '#569cd6');
    // Apply liquidColor to fill gradient (simplified; full impl uses hexToRgba)
    fill.style.background = 'linear-gradient(180deg, ' + liquidColor + ' 0%, ' + liquidColor + ' 100%)';
  }

  if (window.BruControl) {
    if (window.BruControl.getData) {
      try {
        var initial = window.BruControl.getData();
        if (initial) render(initial);
      } catch (e) {}
    }
    window.BruControl.onData(render);
  } else {
    render({ value: 50, min: 0, max: 100 });
  }
})();
```

### ui-controls.json

See [Section 4](#4-uicontrols-schema-ui-controlsjson) for the full water-level-meter ui-controls example.

---

## 13. Full SDK Source

The following is the canonical Element Template SDK injected into every compiled template. It is from `elementTemplateSdk.ts` (frontend). Plugin install uses a backend equivalent; both expose the same API. **Do not use `onState`/`receiveState`** — the host never calls them; use `onData`/`receiveData` only.

```javascript
(function() {
  'use strict';

  (function injectSafeArea() {
    var el = document.getElementById('brucontrol-safe-area');
    if (el) return;
    el = document.createElement('style');
    el.id = 'brucontrol-safe-area';
    el.textContent = 'html,body{height:100%;margin:0;}body{padding:1px;box-sizing:border-box;}';
    if (document.head) document.head.appendChild(el); else document.documentElement.appendChild(el);
  })();

  var _currentData = null;
  var _theme = {};
  var _dataCallbacks = [];
  var _themeCallbacks = [];
  var _sampleCallbacks = [];
  var _parentConnection = null;
  var _subscribedChartId = null;
  var _elementUpdateCallbacks = [];
  var _elementSubscriptions = {};
  var _elementSubscribedKeys = {};

  window.BruControlLibs = window.BruControlLibs || {};
  if (typeof window.Chart !== 'undefined') {
    window.BruControlLibs.Chart = window.Chart;
  }

  function _notifyData(data) { /* ...internal... */ }
  function _applyTheme(theme) { /* ...internal... */ }
  function _notifySamples(sample) { /* ...internal... */ }
  function _notifyElementUpdate(payload) { /* ...internal... */ }

  window.BruControl = {
    onData: function(callback) { /* register data callback */ },
    onTheme: function(callback) { /* register theme callback */ },
    onSamples: function(callback) { /* register samples callback */ },
    updateProperties: function(props) { /* send property updates to host */ },
    getData: function() { return _currentData; },
    getTheme: function() { return _theme; },
    fetchSamples: function(elementId, index, since, points) { /* ... */ },
    fetchChartChannels: function() { /* ... */ },
    subscribeSamples: function(chartId) { /* ... */ },
    unsubscribeSamples: function(chartId) { /* ... */ },
    subscribeElement: function(elementType, elementId) { /* ... */ },
    unsubscribeElement: function(elementType, elementId) { /* ... */ },
    onElementUpdate: function(callback) { /* register element update callback */ },
    getElementData: function(elementType, elementId) { /* ... */ },
    requestKeypad: function(options) { /* ... */ },
    requestTextInput: function(options) { /* ... */ },
    requestTimeSpanPicker: function(options) { /* ... */ },
    requestDateTimePicker: function(options) { /* ... */ },
    requestSelection: function(options) {
      if (!_parentConnection || !_parentConnection.requestSelection) {
        console.warn('[BruControl SDK] requestSelection not available');
        return Promise.resolve(null);
      }
      return _parentConnection.requestSelection(options || {});
    },
    fetchExternal: function(init) {
      if (!_parentConnection || !_parentConnection.externalFetch) {
        return Promise.reject(new Error('fetchExternal not available (no parent connection)'));
      }
      return _parentConnection.externalFetch(init || {});
    },
    THEME_KEYS: ['bg-primary','bg-secondary','bg-tertiary','bg-hover','bg-active','bg-selection','text-primary','text-secondary','text-muted','border-color','border-subtle','border-focus','accent-primary','accent-hover','accent-blue','accent-green','accent-yellow','accent-orange','accent-purple','accent-red','scrollbar-bg','scrollbar-thumb','scrollbar-thumb-hover','list-active-background','list-active-hover-background','editor-line-highlight','editor-line-number','editor-line-number-active','editor-cursor','editor-execution-line-running','editor-execution-line-paused','editor-execution-glyph-running','editor-execution-glyph-paused','editor-comment','editor-string','editor-keyword','editor-type','editor-function','editor-operator','input-background','input-foreground','input-border']
  };

  function initPenpal() {
    if (typeof Penpal === 'undefined' || !Penpal.connect) {
      setTimeout(initPenpal, 50);
      return;
    }
    var connection = Penpal.connect({
      messenger: new Penpal.WindowMessenger({ remoteWindow: window.parent, allowedOrigins: ['*'] }),
      methods: {
        receiveData: function(data) { _notifyData(data); },
        receiveTheme: function(theme) { _applyTheme(theme); },
        receiveSamples: function(sample) { _notifySamples(sample); },
        receiveElementUpdate: function(payload) { /* ... */ }
      }
    });
    connection.promise.then(function(parent) {
      _parentConnection = parent;
    }).catch(function(err) {
      console.error('[BruControl SDK] Failed to connect to parent:', err);
    });
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initPenpal();
  } else {
    document.addEventListener('DOMContentLoaded', initPenpal);
  }
})();
```

:::info Abbreviated for readability
The SDK source above is abbreviated — internal callback notification functions are shown as comments. The full implementation is in `elementTemplateSdk.ts`. The API surface (all methods on `window.BruControl`) is complete and accurate.
:::

---

## 14. Common Pitfalls

### Empty string handling

The BruControl UI allows users to **intentionally clear** text fields (e.g. label, custom text). When cleared, the value is an empty string `""`, not `undefined`.

Using `||` for fallbacks treats `""` as falsy and replaces it with your default:

```javascript
// ❌ Wrong: user cannot intentionally blank the label
var label = data.label || "Default Label";

// ✅ Correct: only use default when value is undefined
var label = data.label !== undefined ? data.label : "Default Label";
// Or, if you want to treat both undefined and "" as "use default":
var label = (data.label !== undefined && data.label !== "") ? data.label : "Default Label";
```

**Rule:** Use strict `!== undefined` (or explicit checks for `undefined` and `""`) when you need to distinguish "user left it blank" from "not set". Use `||` only when you truly want to treat both `undefined` and `""` as "use default".

### Flat data mapping (reminder)

Custom properties live at the root: `data.title`, `data.min`, not `data.appearance.title`. See [Section 5](#5-base-element-properties).

### The shadowing trap in ui-controls.json

Defining a property in ui-controls.json makes BruControl treat it as a **static user-defined setting**. If that property name is also a **native** property of the element (e.g. `value` on an analog input or 1-Wire sensor), the server **strips** it from `Properties` so the live value passes through. However, for `generic` elements (which have no native properties), all ui-controls keys become custom properties. This dual behavior is intentional — see [Section 7: Multi-Type Templates](#7-multi-type-templates-native-vs-custom-properties) for the full explanation and design patterns.

### Method registration vs. property assignment

`BruControl.onData`, `onTheme`, `onSamples`, and `onElementUpdate` are **registration methods**: you must **call** them and pass a callback. Assigning to them overwrites the SDK's internal method and silently breaks the data pipeline.

```javascript
// ❌ Wrong: overwrites the internal method; no data will flow
window.BruControl.onData = function(data) { render(data); };

// ✅ Correct: register your callback
window.BruControl.onData(function(data) { render(data); });
```

### No explicit initialization hook

BruControl does not provide an `onInit` or `onMount` lifecycle hook. The **first time your `onData` callback runs** is effectively initialization. Use that first payload to build or update the DOM (e.g. create SVG, fill in values). Do not rely only on `DOMContentLoaded` to map the DOM and then expect data later — the host may inject the template and send data in an order that races with `DOMContentLoaded`. Treat the first `onData` call as the trigger to set up or refresh the view.

### Flat UI schema (not JSON Schema)

ui-controls.json is a **flat dictionary**: keys are property names, values are control definitions. There is no `"properties"` wrapper and no standard JSON Schema structure. Use BruControl keys: `default` (not `defaultValue`), `title`, `type: "text"`, etc. See [Section 4](#4-uicontrols-schema-ui-controlsjson).

---

## 15. Build Pipeline Notes

### How templates are compiled

When a plugin is installed (or sideloaded), the server:

1. Parses `element-template.yaml` via `ElementTemplateManifestParser` (YamlDotNet, camelCase mapping; unrecognized fields are silently ignored)
2. Reads all `*.html`, `*.css`, `*.js` files from the plugin folder
3. If `package.json` exists, extracts its `dependencies` object as `dependencies.json`
4. If `ui-controls.json` exists, reads it as raw JSON and stores it on the template entity
5. Builds compiled HTML via `BuildCompiledHtml`:
   - Concatenates **all** CSS files (not just `style.css`) and inlines as `<style>`
   - Concatenates **all** JS files (not just `index.js`)
   - Strips `import` lines referencing `.css` files from JS
   - Injects Google Fonts link, Penpal CDN, Chart.js CDN, chartjs-adapter-date-fns CDN
   - Injects dependency scripts from `dependencies.json` (HTTP/HTTPS URLs only)
   - Injects the SDK inline script
   - Removes `<link>` tags referencing CSS files (CSS is already inlined)
   - Appends user JS as inline `<script>` before `</body>`

### Multiple CSS/JS files

If your plugin has multiple `.css` or `.js` files, they are all concatenated. Use this for modular organization, but be aware of global scope collisions in JS. Wrapping each file in an IIFE is recommended.

### Editor preview vs server compilation

The element template editor preview uses the same pipeline but runs client-side (the TS version of `buildCompiledHtml`). The editor injects the TS SDK which includes `fetchExternal` and `THEME_KEYS`. Server-compiled plugins use the C# SDK which may lag behind the TS version.

---

## Related Documentation

- [Element Template Request — Prompt Template](element-template-request-prompt-template.md) — Reusable prompt template to request a new template from an AI (fill in element type, goal, visuals).
- [Element Templates Overview](overview.md)
- [Templates](templates.md)
- [Custom Properties](custom-properties.md)
- [Default Templates](default-templates.md)
- [Element Template Editor](element-template-editor.md)
- [Plugin Store](plugin-store.md)
