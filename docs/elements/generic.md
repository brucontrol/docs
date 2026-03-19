---
id: generic
title: Generic
sidebar_position: 5
---

# Generic

The **Generic** element is a flexible Dashboard tile that can present **named values** from the element’s own data payload in a simple card layout. It is often used for diagnostics, quick readouts of auxiliary fields, or situations where a specialized template is unnecessary. The default **generic** template focuses on a header (with optional **`headerColor`**), a title label, a primary **value** line styled with **`displayFontFamily`**, **`displayFontSize`**, and **`displayColor`**, plus **`backgroundColor`**, **`borderColor`**, and an optional full-card **`image`** background.

## What Generic Shows

At runtime, the template renders **`displayName`** (or **name**) in the header when **`showLabel`** is true, and formats a main **value** region when **`showValue`** is true. Beyond the standard BruControl base fields, any additional native or custom fields on the element that are not part of the template’s fixed UI control keys can appear as a structured list—making Generic useful when you want to surface several related properties at once without building a bespoke element template.

:::tip When not to use Generic

If you need a stored workspace value with logging and clear numeric semantics, consider a [Global Variable](./global-variable) with **gv-value** or **gv-bool**. If you need operator on/off control, use a [Toggle Switch](./toggle-switch). Generic is best as a **presentational** or **diagnostic** surface rather than the primary control for critical hardware.

:::

## Custom Properties

Names and groups match **`element-templates/generic/ui-controls.json`**.

| Property | Type | Default | Group | Description |
|----------|------|---------|-------|-------------|
| showHeader | boolean | true | Layout | Show the header bar. |
| showLabel | boolean | true | Layout | Show the title label in the header. |
| showBackground | boolean | true | Layout | Show element background and border. |
| showValue | boolean | true | Layout | Show the primary value text. |
| labelFontFamily | text | — | Label | Title font family. |
| labelFontSize | number | 12 | Label | Title size (8–48). |
| labelFontWeight | text | — | Label | Title weight. |
| labelFontStyle | text | normal | Label | Title style. |
| labelColor | text | — | Label | Title color (color-alpha; theme default: textPrimary). |
| displayColor | text | — | Display | Primary value text color (color-alpha; theme default: accentGreen). |
| displayFontFamily | text | — | Display | Primary value font family. |
| displayFontSize | number | 14 | Display | Primary value font size (8–120). |
| headerColor | text | — | Background & Border | Header background (color-alpha; theme default: bgTertiary). |
| backgroundColor | text | — | Background & Border | Card background (color-alpha; theme default: bgSecondary). |
| borderColor | text | — | Background & Border | Border color (color-alpha; theme default: borderColor). |
| image | text | — | Background & Border | Background image (file-upload); when set, can replace flat background treatment per template behavior. |

:::info Prefer display* for the main readout

Older documentation sometimes used **`valueFontFamily`**, **`valueFontSize`**, or **`valueColor`**. The **generic** template uses **`displayFontFamily`**, **`displayFontSize`**, and **`displayColor`** for the primary value line. There are no **`value*`** font keys in this template’s `ui-controls.json`.

:::

## Header, Background, and Image

**`headerColor`** tints only the header strip when **`showHeader`** is true and no conflicting artwork path hides it. **`backgroundColor`** and **`borderColor`** define the card body and outline when **`showBackground`** is true. **`image`** supplies a file-upload background; high-contrast photos may require softer **`displayColor`** and **`labelColor`** choices so numbers and titles remain readable. Test under both light and dark themes if your operators switch themes frequently.

## Script Integration

Generic elements have **no additional script properties** beyond the common set shared by all elements:

| Property | Type | Access | Notes |
|----------|------|--------|-------|
| `ID` | string | Read-only | Stable element identifier. |
| `DisplayName` | string | Read/write | Shown in the UI when the label is visible. |
| `Visibility` | string | Read/write | `"default"`, `"visible"`, `"hidden"`, or `"hiddenlocked"`. |
| `EnableHistoricalLogging` | boolean | Read/write | Enables historical samples when applicable to the backing data. |
| `LoggingIntervalSeconds` | number | Read/write | Minimum seconds between logged samples; `0` logs on change. |
| `MaxSilenceSeconds` | number | Read/write | Force a sample after this many seconds without change; `0` disables. |

```
// Rename for a cleaner dashboard label
"Sensor Debug" DisplayName = "Aux PT100 — debug"

// Hide when not commissioning
if ProductionMode
  "Sensor Debug" Visibility = "hidden"
else
  "Sensor Debug" Visibility = "visible"
endif

// Tune logging if the element participates in history
"Sensor Debug" EnableHistoricalLogging = true
"Sensor Debug" LoggingIntervalSeconds = 10
"Sensor Debug" MaxSilenceSeconds = 120
```

:::warning No element-specific script API

Because Generic does not define a **`Value`** or **`State`** property in script IntelliSense, automation should target the **underlying elements** (device ports, globals, etc.) that own the data you care about. Use Generic for visibility and display-name polish, not as a substitute for those elements in Process logic.

:::

## Operator and Layout Considerations

Turn off **`showHeader`** for dense instrument panels where the surrounding layout already provides context. Disable **`showValue`** only when the auxiliary property list alone carries meaning—otherwise operators lose the primary readout. **`displayFontSize`** defaults to 14; increase it for wall displays or decrease it when stacking many generics in a column.

Because **`headerColor`** is independent from **`backgroundColor`**, you can keep a consistent header brand color across tiles even when each card’s body uses a different pastel fill. When you add **`image`**, preview the result in every theme your operators use: photographs that look fine on a dark workspace may lose contrast when someone switches to a light palette unless you adjust **`displayColor`** and **`labelColor`**.

## Themes and Appearance Tab

Like other elements, Generic’s layout (position, size, rotation) can be stored per theme while the logical data behind the element stays shared. After you duplicate a workspace for a new seasonal theme, revisit **Custom Properties** to confirm that an **`image`** chosen for dark mode still reads well when the global chrome flips to light surfaces. The **Appearance** tab is also where you change templates; if you outgrow Generic, migrate to a specialized template and revalidate fonts.

## Choosing Generic vs Other Elements

| Need | Prefer |
|------|--------|
| Stored numeric/boolean workspace value with **`Value`** in script | [Global Variable](./global-variable) |
| Operator flips a boolean with a switch control | [Toggle Switch](./toggle-switch) |
| One-shot operator action | [Button](./button) |
| Read-only or diagnostic surfacing of extra fields | **Generic** |

This table is guidance, not a hard rule—some solutions combine multiple element types to separate “what operators touch” from “what scripts log.”

## Commissioning Checklist

When you drop a Generic tile onto a new dashboard page, walk through: (1) **`DisplayName`** clarity, (2) which layout flags are off to save space, (3) whether **`image`** is decorative or functional, (4) logging settings if history matters, and (5) **`Visibility`** rules driven by Process scripts for different phases (cleaning, production, maintenance). Spending a minute on that checklist prevents rework when the first brew day arrives.

## Troubleshooting

**Blank card.** Check **`showBackground`**, **`showLabel`**, and **`showValue`**. If everything is disabled except an **`image`**, confirm the asset uploaded correctly.

**Unreadable text.** Adjust **`displayColor`** / **`labelColor`** against **`backgroundColor`** or choose a calmer **`image`**. Remember **`headerColor`** is independent of the body background.

**Unexpected properties listed.** Generic intentionally surfaces non-template fields; if a field should not appear, resolve it at the data model or use a specialized template that hides internal keys.

**Script errors referencing `.Value`.** Generic is not a global variable; use the correct element name for the data source.

## Related Topics

- [Elements Overview](./overview) — Common properties, themes, logging model
- [Global Variable](./global-variable) — **`Value`**, **`Precision`**, gv-value / gv-bool templates
- [Toggle Switch](./toggle-switch) — Boolean **State** and switch styling
- [Button](./button) — Momentary **`State`** and **`showButtonText`**
- [Device Elements Overview](./device-elements-overview) — When data comes from hardware ports
