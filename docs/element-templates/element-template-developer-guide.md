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
5. **Use the SDK** — Call `BruControl.onData(callback)` to receive element data; use `BruControl.updateProperties(props)` or host pickers (`requestKeypad`, etc.) to send changes

## Checklist for LLM

When generating a plugin from a photo or spec:

- [ ] Create folder under `element-templates/`
- [ ] Write `element-template.yaml` with `supportedTypes` matching the element type(s)
- [ ] Write `index.html` (structure), `style.css` (styles), `index.js` (logic)
- [ ] Add `ui-controls.json` if the template needs configurable options (colors, fonts, visibility)
- [ ] Use `BruControl.onData(render)` to receive and render element data
- [ ] Use `BruControl.updateProperties({ key: value })` for user-controlled changes
- [ ] Use `BruControl.requestKeypad`, `requestTextInput`, etc. for input dialogs when appropriate
- [ ] Resolve colors via `BruControl.getTheme()` or `getComputedStyle` for theme-aware styling
- [ ] Use strict `!== undefined` checks for optional text (not `||`) so users can intentionally blank fields
- [ ] Read custom properties at root level: `data.title`, `data.min` — not `data.appearance.title`
- [ ] **Call** `BruControl.onData(callback)` — do not assign `BruControl.onData = callback` (that breaks the pipeline)
- [ ] Do not put native properties (`value`, `state`, etc.) in ui-controls.json for device elements — they shadow live hardware data
- [ ] Use the first `onData` payload as initialization; do not rely only on DOMContentLoaded (it can race with data)
- [ ] ui-controls.json is a flat dictionary (no `"properties"` wrapper); use `default`, `title`, `type: "text"`

---

## Table of Contents

1. [Plugin Structure](#1-plugin-structure)
2. [Manifest (element-template.yaml)](#2-manifest-element-templateyaml)
3. [Source Files](#3-source-files)
4. [UIControls Schema (ui-controls.json)](#4-uicontrols-schema-ui-controlsjson)
5. [Base Element Properties](#5-base-element-properties)
6. [Element Types Reference](#6-element-types-reference)
7. [BruControl SDK](#7-brucontrol-sdk)
8. [SDK Methods Reference](#8-sdk-methods-reference)
9. [Theme and Colors](#9-theme-and-colors)
10. [Control Examples](#10-control-examples)
11. [Complete Example: Water Level Meter](#11-complete-example-water-level-meter)
12. [Full SDK Source](#12-full-sdk-source)
13. [Common Pitfalls](#13-common-pitfalls)

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

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Display name (e.g. "Timer - Card") |
| `description` | string | No | Short description |
| `version` | string | No | Semantic version; defaults to `1.0.0` or from `package.json` |
| `supportedTypes` | string[] | Yes | Element types this template supports |
| `defaultFor` | string | No | Single type this template is the default for |
| `defaultWidth` | int | No | Default width in pixels when creating a new element |
| `defaultHeight` | int | No | Default height in pixels |
| `id` | string (UUID) | No* | Stable plugin ID; `generate-manifests` assigns if missing |
| `beta` | boolean | No | Set by CI; do not edit manually |
| `tags` | string[] | No | Discoverability tags |
| `collection` | string | No | Group name (e.g. "BruControl Cards") |

\*`id` is required for registry publish; the script assigns one if missing.

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

| Type | Purpose | Example |
|------|---------|---------|
| `text` | String | label, font-family |
| `number` | Numeric, optional min/max/step | fontSize, value |
| `boolean` | Toggle | showHeader, showLabel |
| `date` | Date picker | — |
| `time` | Time picker | — |
| `object` | Nested object | — |
| `array` | List, optional items.enum | hiddenRowKeys |

### Format Values (from plugin-library)

| Format | Purpose |
|--------|---------|
| `font-family` | Font picker |
| `font-size` | Font size (use min/max) |
| `font-weight` | Font weight |
| `font-style` | Font style |
| `text-align` | Text alignment |
| `color-alpha` | Color picker; hex #RRGGBB or #RRGGBBAA; theme-aware via `x-theme-default` |
| `range` | Slider (use min, max, step) |
| `file-upload` | File picker; use `x-accept`, `x-picker-title` |

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `type` | string | One of: text, number, boolean, date, time, object, array |
| `title` | string | Display label |
| `description` | string | Help text |
| `default` | any | Default value |
| `group` | string | Group for organization (e.g. "Layout", "Label", "Value", "Background & Border") |
| `min`, `max`, `step` | number | For number/range |
| `enum` | array | For constrained choice |
| `format` | string | Format hint (see above) |
| `x-theme-default` | string | Theme key when value is empty (e.g. `textPrimary`, `accentGreen`, `bgSecondary`, `borderColor`) |
| `hidden` | boolean | When true, not shown in Appearance tab |
| `x-accept` | string | For file-upload: MIME/types (e.g. `image/*,.png,.jpg`) |
| `x-picker-title` | string | For file-upload: dialog title |

### x-theme-default

When the user leaves a color (or other theme-bound) property empty, the template uses the theme's default. `x-theme-default` binds to a theme key. Theme keys use kebab-case: `bg-primary`, `text-primary`, `accent-green`, `accent-blue`, `border-color`, `bg-secondary`, `bg-tertiary`, etc.

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
    "x-accept": "image/*,.png,.jpg,.jpeg,.gif,.webp,.svg,.bmp,.ico,.avif",
    "x-picker-title": "Select Background Image"
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

## 7. BruControl SDK

The SDK is injected into every compiled template iframe. Your template runs in a sandboxed iframe; communication with the dashboard uses **Penpal v7**.

- **`window.BruControl`** — Public API
- **Host → Template:** `receiveData`, `receiveTheme`, `receiveSamples`, `receiveElementUpdate`
- **Template → Host:** `updateProperties`, `requestKeypad`, `requestTextInput`, `fetchSamples`, `subscribeElement`, etc.

**Registration methods, not properties:** `onData`, `onTheme`, `onSamples`, and `onElementUpdate` are **methods you call with a callback**. Do not assign to them (e.g. `BruControl.onData = function(data) { ... }`). Assigning overwrites the internal method and breaks the data pipeline. Always call: `BruControl.onData(function(data) { ... })`.

**No explicit init hook:** There is no `onInit` or `onMount`. The first time your `onData` callback runs is the de facto initialization. Use that first payload to build or update the DOM. Relying only on `DOMContentLoaded` can race with BruControl's template injection — the host may not have sent data yet.

**CDN scripts loaded before your code:** Penpal, Chart.js, Chart.js date adapter.

**Safe area:** The SDK injects `body { padding: 1px; }` so borders/shadows are not clipped.

**Theme:** The SDK injects `:root { --bg-primary: #1e1e1e; --text-primary: #fff; ... }` from the current theme.

---

## 8. SDK Methods Reference

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

**requestKeypad options:** `{ currentValue, label, min, max, precision, allowNegative }`

**requestTextInput options:** `{ currentValue, label, placeholder, maxLength }`

**requestTimeSpanPicker options:** `{ currentValue, label, allowDays, maxHours }`

**requestDateTimePicker options:** `{ currentValue, label, minDate, maxDate }`

---

## 9. Theme and Colors

### Theme Keys (BruControl.THEME_KEYS)

Background: `bg-primary`, `bg-secondary`, `bg-tertiary`, `bg-hover`, `bg-active`, `bg-selection`

Text: `text-primary`, `text-secondary`, `text-muted`

Border: `border-color`, `border-subtle`, `border-focus`

Accent: `accent-primary`, `accent-hover`, `accent-blue`, `accent-green`, `accent-yellow`, `accent-orange`, `accent-purple`, `accent-red`

Input: `input-background`, `input-foreground`, `input-border`

(Plus scrollbar, list, editor keys — see full list in SDK source.)

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

## 10. Control Examples

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

## 11. Complete Example: Water Level Meter

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

## 12. Full SDK Source

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

  function _notifyData(data) {
    var previousChartId = _currentData && _currentData.id ? String(_currentData.id) : null;
    _currentData = data;
    var nextChartId = _currentData && _currentData.id ? String(_currentData.id) : null;

    if (previousChartId !== nextChartId) {
      if (previousChartId && _parentConnection && _parentConnection.unsubscribeSamples) {
        _parentConnection.unsubscribeSamples({ chartId: previousChartId }).catch(function(err) {
          console.error('[BruControl SDK] unsubscribeSamples failed:', err);
        });
      }
      _subscribedChartId = null;
    }

    if (_sampleCallbacks.length > 0 && nextChartId && _parentConnection && _parentConnection.subscribeSamples && _subscribedChartId !== nextChartId) {
      _parentConnection.subscribeSamples({ chartId: nextChartId }).then(function() {
        _subscribedChartId = nextChartId;
      }).catch(function(err) {
        console.error('[BruControl SDK] subscribeSamples failed:', err);
      });
    }

    for (var i = 0; i < _dataCallbacks.length; i++) {
      try { _dataCallbacks[i](data); } catch(e) { console.error('[BruControl SDK] onData callback error:', e); }
    }
  }

  function _applyTheme(theme) {
    _theme = theme && typeof theme === 'object' && !Array.isArray(theme) ? theme : {};
    var styleEl = document.getElementById('brucontrol-theme-vars');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'brucontrol-theme-vars';
      document.head.appendChild(styleEl);
    }
    var parts = [];
    for (var k in _theme) {
      if (Object.prototype.hasOwnProperty.call(_theme, k) && _theme[k]) {
        parts.push('--' + k + ': ' + _theme[k]);
      }
    }
    styleEl.textContent = parts.length ? ':root { ' + parts.join('; ') + ' }' : '';
    for (var j = 0; j < _themeCallbacks.length; j++) {
      try { _themeCallbacks[j](_theme); } catch(e) { console.error('[BruControl SDK] onTheme callback error:', e); }
    }
  }

  function _notifySamples(sample) {
    for (var i = 0; i < _sampleCallbacks.length; i++) {
      try { _sampleCallbacks[i](sample); } catch(e) { console.error('[BruControl SDK] onSamples callback error:', e); }
    }
  }

  function _notifyElementUpdate(payload) {
    var key = payload.elementType + ':' + payload.elementId;
    _elementSubscriptions[key] = payload.data;
    for (var i = 0; i < _elementUpdateCallbacks.length; i++) {
      try { _elementUpdateCallbacks[i](payload); } catch(e) { console.error('[BruControl SDK] onElementUpdate callback error:', e); }
    }
  }

  window.BruControl = {
    onData: function(callback) {
      if (typeof callback !== 'function') return;
      _dataCallbacks.push(callback);
      if (_currentData) {
        try { callback(_currentData); } catch(e) { console.error('[BruControl SDK] onData callback error:', e); }
      }
    },
    onTheme: function(callback) {
      if (typeof callback !== 'function') return;
      _themeCallbacks.push(callback);
      if (_theme && Object.keys(_theme).length > 0) {
        try { callback(_theme); } catch(e) { console.error('[BruControl SDK] onTheme callback error:', e); }
      }
    },
    onSamples: function(callback) {
      if (typeof callback !== 'function') return;
      _sampleCallbacks.push(callback);
      var chartId = _currentData && _currentData.id ? String(_currentData.id) : null;
      if (chartId && _parentConnection && _parentConnection.subscribeSamples && _subscribedChartId !== chartId) {
        _parentConnection.subscribeSamples({ chartId: chartId }).then(function() {
          _subscribedChartId = chartId;
        }).catch(function(err) {
          console.error('[BruControl SDK] subscribeSamples failed:', err);
        });
      }
    },
    updateProperties: function(props) {
      if (!props || typeof props !== 'object' || Array.isArray(props)) {
        console.warn('[BruControl SDK] updateProperties expects a plain object, got:', typeof props);
        return;
      }
      if (_parentConnection) {
        _parentConnection.updateProperties(props);
      } else {
        console.warn('[BruControl SDK] updateProperties called but no parent connection established yet');
      }
    },
    getData: function() { return _currentData; },
    getTheme: function() { return _theme; },
    fetchSamples: function(elementId, index, since, points) {
      if (!_parentConnection || !_parentConnection.fetchSamples) return Promise.resolve([]);
      return _parentConnection.fetchSamples({ elementId: elementId, index: index, since: since, points: points });
    },
    fetchChartChannels: function() {
      if (!_parentConnection || !_parentConnection.fetchChartChannels) return Promise.resolve([]);
      return _parentConnection.fetchChartChannels({});
    },
    subscribeSamples: function(chartId) {
      if (!_parentConnection || !_parentConnection.subscribeSamples) return Promise.resolve(false);
      var targetChartId = chartId || (_currentData && _currentData.id ? String(_currentData.id) : null);
      if (!targetChartId) return Promise.resolve(false);
      return _parentConnection.subscribeSamples({ chartId: targetChartId }).then(function(result) {
        _subscribedChartId = targetChartId;
        return result;
      });
    },
    unsubscribeSamples: function(chartId) {
      if (!_parentConnection || !_parentConnection.unsubscribeSamples) return Promise.resolve(false);
      var targetChartId = chartId || _subscribedChartId;
      if (!targetChartId) return Promise.resolve(false);
      return _parentConnection.unsubscribeSamples({ chartId: targetChartId }).then(function(result) {
        if (_subscribedChartId === targetChartId) _subscribedChartId = null;
        return result;
      });
    },
    subscribeElement: function(elementType, elementId) {
      if (!elementType || !elementId) {
        console.warn('[BruControl SDK] subscribeElement requires elementType and elementId');
        return Promise.resolve(null);
      }
      var key = elementType + ':' + elementId;
      if (!_parentConnection || !_parentConnection.subscribeElement) {
        console.warn('[BruControl SDK] subscribeElement called but no parent connection established yet');
        return Promise.resolve(null);
      }
      return _parentConnection.subscribeElement({ elementType: elementType, elementId: elementId }).then(function(data) {
        _elementSubscribedKeys[key] = true;
        if (data) {
          _elementSubscriptions[key] = data;
          _notifyElementUpdate({ elementType: elementType, elementId: elementId, data: data });
        }
        return data;
      }).catch(function(err) {
        console.error('[BruControl SDK] subscribeElement failed:', err);
        return null;
      });
    },
    unsubscribeElement: function(elementType, elementId) {
      if (!elementType || !elementId) return Promise.resolve(false);
      var key = elementType + ':' + elementId;
      delete _elementSubscribedKeys[key];
      delete _elementSubscriptions[key];
      if (!_parentConnection || !_parentConnection.unsubscribeElement) return Promise.resolve(false);
      return _parentConnection.unsubscribeElement({ elementType: elementType, elementId: elementId }).then(function(result) {
        return result;
      }).catch(function(err) {
        console.error('[BruControl SDK] unsubscribeElement failed:', err);
        return false;
      });
    },
    onElementUpdate: function(callback) {
      if (typeof callback !== 'function') return;
      _elementUpdateCallbacks.push(callback);
    },
    getElementData: function(elementType, elementId) {
      if (!elementType || !elementId) return null;
      var key = elementType + ':' + elementId;
      return _elementSubscriptions[key] || null;
    },
    requestKeypad: function(options) {
      if (!_parentConnection || !_parentConnection.requestKeypad) {
        console.warn('[BruControl SDK] requestKeypad not available');
        return Promise.resolve(null);
      }
      return _parentConnection.requestKeypad(options || {});
    },
    requestTextInput: function(options) {
      if (!_parentConnection || !_parentConnection.requestTextInput) {
        console.warn('[BruControl SDK] requestTextInput not available');
        return Promise.resolve(null);
      }
      return _parentConnection.requestTextInput(options || {});
    },
    requestTimeSpanPicker: function(options) {
      if (!_parentConnection || !_parentConnection.requestTimeSpanPicker) {
        console.warn('[BruControl SDK] requestTimeSpanPicker not available');
        return Promise.resolve(null);
      }
      return _parentConnection.requestTimeSpanPicker(options || {});
    },
    requestDateTimePicker: function(options) {
      if (!_parentConnection || !_parentConnection.requestDateTimePicker) {
        console.warn('[BruControl SDK] requestDateTimePicker not available');
        return Promise.resolve(null);
      }
      return _parentConnection.requestDateTimePicker(options || {});
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
        receiveElementUpdate: function(payload) {
          if (payload && payload.elementType && payload.elementId) {
            var key = payload.elementType + ':' + payload.elementId;
            if (_elementSubscribedKeys[key]) _notifyElementUpdate(payload);
          }
        }
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

---

## 13. Common Pitfalls

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

Defining a property in ui-controls.json makes BruControl treat it as a **static user-defined setting**. If that property name is also a **native** property of the element (e.g. `value` on an analog input or 1-Wire sensor), your config entry **shadows** the live hardware value — the template will receive the stored config value instead of the live sensor reading. To let hardware/element data pass through, **omit native properties from ui-controls.json**. Only include template-specific options (colors, labels, visibility, display ranges, etc.). See [Section 4](#4-uicontrols-schema-ui-controlsjson).

### Method registration vs. property assignment

`BruControl.onData`, `onTheme`, `onSamples`, and `onElementUpdate` are **registration methods**: you must **call** them and pass a callback. Assigning to them overwrites the SDK’s internal method and silently breaks the data pipeline.

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

## Related Documentation

- [Element Template Request — Prompt Template](element-template-request-prompt-template.md) — Reusable prompt template to request a new template from an AI (fill in element type, goal, visuals).
- [Element Templates Overview](overview.md)
- [Templates](templates.md)
- [Custom Properties](custom-properties.md)
- [Default Templates](default-templates.md)
- [Element Template Editor](element-template-editor.md)
- [Plugin Store](plugin-store.md)
