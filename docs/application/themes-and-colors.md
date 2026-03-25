# Themes and Color Sets

BruControl's theming system separates **layout themes** (which control element positioning per device type) from **color sets** (which define the color palette). This decoupled design lets you mix and match any layout with any color scheme — switch from a dark palette to a light one without affecting element positions, or create a mobile layout without losing your desktop arrangement.

## Theme Selector

The Theme Selector is located in the application header and provides two independent dropdowns:

- **Color Set selector** (palette icon) — choose or manage the active color palette
- **Layout Theme selector** (grid icon) — choose or manage the active layout theme

Selecting a color set updates the theme's `colorSetId` via PATCH. Selecting a layout theme switches the active theme entirely, which changes both the layout and whichever color set is assigned to that theme.

---

## Color Sets

A color set is a named collection of color values that define the visual palette for the entire application. Color sets are independent of layout themes and can be shared across multiple themes.

### Built-in Color Sets

BruControl ships with pre-installed color sets synced from the official registry on startup:

- VS Code Dark (default)
- Cream Sand
- Neobrutal
- Laurel Swamp
- Inkwell
- Newsprint
- Kitty Meow Meow
- and others added over time

Built-in color sets are marked with a **Built-in** badge in the dropdown. They cannot be edited or deleted, but can be **duplicated** to create a custom version.

### Custom Color Sets

From the Color Set dropdown you can:

- **Create** a new color set (starts with VS Code Dark defaults)
- **Duplicate** any existing color set (built-in or custom) to use as a starting point
- **Edit** a custom color set's name and colors
- **Delete** a custom color set (only if it is not in use by any theme)

### Color Properties

Each color set defines **39 CSS color variables** organized into eight categories:

| Category | Keys | Purpose |
|---|---|---|
| **Background** | `bgPrimary`, `bgSecondary`, `bgTertiary`, `bgHover`, `bgActive`, `bgSelection` | Application backgrounds, panels, hover/active states |
| **Text** | `textPrimary`, `textSecondary`, `textMuted` | Primary, secondary, and disabled text |
| **Border** | `borderColor`, `borderSubtle`, `borderFocus` | Standard borders, dividers, focus rings |
| **Accent Colors** | `accentPrimary`, `accentHover`, `accentBlue`, `accentGreen`, `accentYellow`, `accentOrange`, `accentPurple`, `accentRed` | Buttons, links, status indicators, syntax highlights |
| **Scrollbar** | `scrollbarBg`, `scrollbarThumb`, `scrollbarThumbHover` | Scrollbar track and thumb styling |
| **List Selection** | `listActiveBackground`, `listActiveHoverBackground` | Selected/active items in lists and trees |
| **Code Editor** | `editorLineHighlight`, `editorLineNumber`, `editorLineNumberActive`, `editorCursor`, `editorExecutionLineRunning`, `editorExecutionLinePaused`, `editorExecutionGlyphRunning`, `editorExecutionGlyphPaused` | Script editor line highlighting, cursor, execution markers |
| **Script Editor** | `editorComment`, `editorString`, `editorKeyword`, `editorType`, `editorFunction`, `editorOperator`, `inputBackground`, `inputForeground`, `inputBorder` | Syntax token colors and input field styling |

### Color Set Edit Modal

The `ColorSetEditModal` provides a full color customization UI:

- **Name field** at the top (read-only for built-in sets)
- **Category tabs** to navigate between the eight color groups
- **Color pickers** for each property with label and description
- **Footer actions**: Duplicate, Delete (with confirmation), Cancel, Save/Create
- Built-in color sets display an info message directing you to duplicate before editing

---

## Layout Themes

A layout theme controls the spatial arrangement of elements on screen — position, size, rotation — independent of colors. Each theme references a color set, and elements store per-theme web appearances.

### Default Themes

Two themes are created by default and marked with a **Default** badge:

- **Desktop** — optimized for desktop/laptop screens
- **Mobile** — optimized for phone/tablet screens

Default themes cannot be deleted but can be edited (renamed, assigned a different color set).

### Custom Layout Themes

From the Layout Theme dropdown you can:

- **Create** a new layout theme (starts with VS Code Dark color set)
- **Edit** any theme's name and assigned color set
- **Delete** non-default themes

### Per-Theme Element Appearances

Each element stores separate web appearance data (position, size, rotation) per theme. When you switch themes, the canvas re-renders elements according to that theme's saved layout. Layout appearance data is stored and retrieved via the theme's layout endpoints.

### Theme Edit Modal

The `ThemeEditModal` provides:

- **Name field** for the theme
- **Color Set dropdown** to assign any available color set
- **Delete button** (disabled for default themes, with confirmation for others)

---

## For Element Template Developers

Element templates run inside sandboxed iframes and receive theme colors automatically through the BruControl SDK.

### CSS Variables

When a theme is applied, CSS variables are injected into the iframe's `:root`:

```css
:root {
  --bg-primary: #1e1e1e;
  --bg-secondary: #252526;
  --text-primary: #d4d4d4;
  --accent-primary: #0e639c;
  /* ... all 39 theme keys */
}
```

Use them in your element template CSS:

```css
.my-widget {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}
.my-widget-header {
  background: var(--bg-secondary);
  color: var(--accent-green);
}
```

### JavaScript API

The SDK exposes theme access on the global `BruControl` object:

```javascript
// Get the current theme colors (returns an object keyed by CSS variable name)
const theme = BruControl.getTheme();
// theme['bg-primary'] => '#1e1e1e'

// Register a callback for theme changes (also fires immediately if theme is already loaded)
BruControl.onTheme(function(theme) {
  console.log('Background:', theme['bg-primary']);
  console.log('Accent:', theme['accent-green']);
});

// Full list of available keys
console.log(BruControl.THEME_KEYS);
// ['bg-primary', 'bg-secondary', 'bg-tertiary', 'bg-hover', ...]
```

### Theme-Aware Default Colors via `x-theme-default`

In `ui-controls.json`, color-type controls can specify an `x-theme-default` property to bind their default value to a theme color. When the user leaves the color field empty, the resolved theme color is used automatically.

Use **camelCase** property names matching the `ThemeColorSetViewModel`:

```json
{
  "backgroundColor": {
    "type": "string",
    "format": "color",
    "x-theme-default": "bgPrimary",
    "description": "Background color (defaults to theme background)"
  },
  "textColor": {
    "type": "string",
    "format": "color",
    "x-theme-default": "textPrimary",
    "description": "Text color (defaults to theme text)"
  }
}
```

The resolution logic: if the element property value is empty, `resolveThemeDefaultColor` looks up the `x-theme-default` key on the current color set and returns that color. The color picker UI shows a "Theme Default" indicator when this fallback is active.

### Available `x-theme-default` Keys

Any camelCase property from the color set can be used:

`bgPrimary`, `bgSecondary`, `bgTertiary`, `bgHover`, `bgActive`, `bgSelection`, `textPrimary`, `textSecondary`, `textMuted`, `borderColor`, `borderSubtle`, `borderFocus`, `accentPrimary`, `accentHover`, `accentBlue`, `accentGreen`, `accentYellow`, `accentOrange`, `accentPurple`, `accentRed`, `scrollbarBg`, `scrollbarThumb`, `scrollbarThumbHover`, `listActiveBackground`, `listActiveHoverBackground`, `editorLineHighlight`, `editorLineNumber`, `editorLineNumberActive`, `editorCursor`, `inputBackground`, `inputForeground`, `inputBorder`

---

## API Endpoints

### Theme API — `api/v1/theme`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/theme` | List all themes |
| `GET` | `/api/v1/theme/{id}` | Get a theme by ID |
| `POST` | `/api/v1/theme` | Create a new theme (`{ name, colorSetId? }`) |
| `PATCH` | `/api/v1/theme/{id}` | Update theme name and/or color set |
| `DELETE` | `/api/v1/theme/{id}` | Delete a non-default theme |
| `GET` | `/api/v1/theme/{id}/layout/{layoutType}` | Get layout appearance for a theme |
| `PATCH` | `/api/v1/theme/{id}/layout/{layoutType}` | Update layout appearance (`{ layoutJson }`) |

**Theme response shape:**

```json
{
  "id": "guid",
  "name": "Desktop",
  "isDefault": true,
  "colorSetId": "guid"
}
```

### Color Set API — `api/v1/color-set`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/color-set` | List all color sets |
| `GET` | `/api/v1/color-set/{id}` | Get a color set by ID |
| `POST` | `/api/v1/color-set` | Create a new color set (`{ name }`) |
| `POST` | `/api/v1/color-set/duplicate` | Duplicate a color set (`{ sourceId, name }`) |
| `PATCH` | `/api/v1/color-set/{id}` | Update color set name and/or color values |
| `DELETE` | `/api/v1/color-set/{id}` | Delete a color set (must not be built-in or in use) |

**Color set response includes:** `id`, `name`, `isBuiltIn`, `usageCount`, `registryVersion`, and all 39 color properties.

**Constraints:**
- Built-in color sets cannot be edited or deleted (PATCH returns 400)
- Color sets in use by one or more themes cannot be deleted
- Default themes cannot be deleted
