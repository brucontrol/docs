---
id: global-variable
title: Global Variable
sidebar_position: 2
---

# Global Variable

A **Global Variable** element stores a value in your BruControl workspace that is independent of any device port. It is one of the most frequently used **non-device** elements: recipes, sequencing flags, operator setpoints, and scratch values can all live in globals so multiple [Script Element](./script) processes and Dashboard tiles stay aligned. Globals support several underlying data types (numeric, boolean, string, time, and datetime). The **element template** determines how that value is drawn: **gv-value** emphasizes a large numeric readout with configurable **precision**, while **gv-bool** frames a boolean as a toggle with ON/OFF labels and distinct on/off colors.

## When to Use a Global Variable

Reach for a global when the data is **logical state** for the batch or the workspace, not a raw sensor reading. Examples include target mash temperatures, current recipe step indices, “silent” flags that suppress alarms, or string labels that scripts compose for logging. Globals participate in the same **historical logging** machinery as other elements, so you can trend them on a [Chart](./chart) when **`EnableHistoricalLogging`** is true and intervals suit the process.

:::tip Changing templates later

You can swap between **gv-value** and **gv-bool** (or other compatible templates) from the **Appearance** tab after the element exists. Re-open **Custom Properties** afterward—font sizes that looked balanced on one template may need tuning on another.

:::

## Creating and Naming

Add a global from Solution Explorer the same way as other non-device elements (see [Elements Overview](./overview)). Choose an internal **Name** that reads well in scripts, and set **DisplayName** for operator-facing text; scripts still refer to the element by the solution name conventions your team uses. Because **`DisplayName`** is read/write from script, you can temporarily retitle a tile during a phase (“Heat ON — wait”) without renaming the underlying element.

## Native Data vs Template Chrome

**Native** configuration (type, initial value, editor constraints) defines what the variable **is**. **Custom properties** from `ui-controls.json` define how it **looks**: layout switches, label typography, the **`display*`** value styling on **gv-value**, toggle styling on **gv-bool**, and the card chrome including **`headerColor`**, **`borderColor`**, **`backgroundColor`**, and optional **`image`**. Keeping that separation in mind speeds up troubleshooting: if the number is wrong, inspect value and scripts; if the number is right but ugly, inspect the template properties.

## Custom Properties — gv-value Template

The **gv-value** template is for numeric-style globals where a prominent readout matters. Property names are exactly as in **`element-templates/gv-value/ui-controls.json`**.

| Property | Type | Default | Group | Description |
|----------|------|---------|-------|-------------|
| showHeader | boolean | true | Layout | Show the header bar. |
| showBackground | boolean | true | Layout | Show element background and border. |
| showLabel | boolean | true | Layout | Show the title label in the header. |
| showValue | boolean | true | Layout | Show the main value text. |
| precision | number | 0 | Layout | Decimal places for numeric display (0–6). |
| labelFontFamily | text | — | Label | Label font family. |
| labelFontSize | number | 12 | Label | Label size (8–48). |
| labelFontWeight | text | — | Label | Label weight. |
| labelFontStyle | text | normal | Label | Label style. |
| labelColor | text | — | Label | Label color (color-alpha; theme default: textPrimary). |
| displayColor | text | — | Display | Value text color (color-alpha; theme default: accentGreen). |
| displayFontFamily | text | — | Display | Value font family. |
| displayFontSize | number | 26 | Display | Value font size (10–120). |
| displayFontWeight | text | — | Display | Value weight. |
| displayFontStyle | text | normal | Display | Value style. |
| backgroundColor | text | — | Background & Border | Card background (color-alpha; theme default: bgSecondary). |
| headerColor | text | — | Background & Border | Header background (color-alpha; theme default: bgTertiary). |
| borderColor | text | — | Background & Border | Border color (color-alpha; theme default: borderColor). |
| image | text | — | Background & Border | Background image (file-upload). |

:::info Value styling uses display*, not value*

Outdated docs may mention **`valueFontFamily`**, **`valueFontSize`**, or **`valueColor`**. For **gv-value**, the supported names are **`displayFontFamily`**, **`displayFontSize`**, **`displayFontWeight`**, **`displayFontStyle`**, and **`displayColor`**.

:::

## Custom Properties — gv-bool Template

The **gv-bool** template targets boolean globals. Label and background groups mirror **gv-value**; the toggle group adds captions and colors. Names match **`element-templates/gv-bool/ui-controls.json`**.

| Property | Type | Default | Group | Description |
|----------|------|---------|-------|-------------|
| showHeader | boolean | true | Layout | Show the header bar. |
| showBackground | boolean | true | Layout | Show element background and border. |
| showLabel | boolean | true | Layout | Show the title label in the header. |
| showValue | boolean | true | Layout | Show the toggle control. |
| showToggleLabel | boolean | true | Layout | Show ON/OFF text beside the toggle. |
| onLabel | text | ON | Toggle | Caption when true. |
| offLabel | text | OFF | Toggle | Caption when false. |
| toggleOnColor | text | — | Toggle | Track/color when on (color-alpha; theme default: accentGreen). |
| toggleOffColor | text | — | Toggle | Track/color when off (color-alpha; theme default: bgTertiary). |
| toggleFontFamily | text | — | Toggle | Toggle text font family. |
| toggleFontSize | number | 19 | Toggle | Toggle text size (10–120). |
| toggleFontWeight | text | — | Toggle | Toggle text weight. |
| toggleFontStyle | text | normal | Toggle | Toggle text style. |
| toggleTextColor | text | — | Toggle | Toggle text color (color-alpha; theme default: accentGreen). |
| labelFontFamily | text | — | Label | Same semantics as **gv-value** label group. |
| labelFontSize | number | 12 | Label | Label size (8–48). |
| labelFontWeight | text | — | Label | Label weight. |
| labelFontStyle | text | normal | Label | Label style. |
| labelColor | text | — | Label | Label color (color-alpha; theme default: textPrimary). |
| backgroundColor | text | — | Background & Border | Card background (color-alpha; theme default: bgSecondary). |
| headerColor | text | — | Background & Border | Header background (color-alpha; theme default: bgTertiary). |
| borderColor | text | — | Background & Border | Border color (color-alpha; theme default: borderColor). |
| image | text | — | Background & Border | Background image (file-upload). |

## Script Integration

Globals expose **`Value`** (read/write; type follows the variable’s configured type). For numeric globals, **`Precision`** (read/write number) controls how many decimal places are shown in contexts that honor precision.

Every element also supports: **`ID`** (string, read-only), **`DisplayName`** (string, read/write), **`Visibility`** (string, read/write), **`EnableHistoricalLogging`** (boolean, read/write), **`LoggingIntervalSeconds`** (number, read/write), **`MaxSilenceSeconds`** (number, read/write).

```
// Numeric setpoint
new value target
target = "Mash Temp SP" Value
"Mash Temp SP" Value = 148.0
"Mash Temp SP" Precision = 1

// Boolean mode bit
if "Boil Started" Value = off
  "Boil Started" Value = on
endif

// Visibility and logging together
"Batch ID" EnableHistoricalLogging = true
"Batch ID" LoggingIntervalSeconds = 0
"Batch ID" MaxSilenceSeconds = 3600
"Batch ID" Visibility = "visible"
```

:::warning Valid Visibility strings

Use **`"default"`**, **`"visible"`**, **`"hidden"`**, or **`"hiddenlocked"`** only. Other strings may not round-trip correctly through the Dashboard.

:::

## Historical Logging and Charts

Globals that change slowly (setpoints, batch IDs) still benefit from **`MaxSilenceSeconds`**: periodic samples keep [Chart](./chart) traces honest even when **`Value`** has not changed. Fast-changing computed values may need a larger **`LoggingIntervalSeconds`** to avoid oversized history. These knobs are documented at a high level on [Elements Overview](./overview).

## Troubleshooting

**Value “sticks” or ignores script.** Confirm no other process writes the same global every scan, and that the variable’s type matches what you assign (boolean vs numeric). **User Control** can also block operator edits without blocking scripts—verify expectations.

**Decimals look wrong.** Adjust **`Precision`** in script or native settings; **`precision`** in **gv-value** custom properties also caps presentation for the template.

**Template mismatch.** Booleans rendered with **gv-value** may look odd; switch to **gv-bool**. Large numbers may need **`displayFontSize`** reduced or tile width increased in **Appearance**.

**Background image hides header.** Depending on theme and asset, **`image`** can dominate the card; tune **`headerColor`** and **`showHeader`** or pick a subtler image.

**Charts show flat lines.** Increase **`MaxSilenceSeconds`** or confirm logging is enabled and the global actually changes during the window you are viewing.

## Related Topics

- [Elements Overview](./overview) — Non-device vs device elements, common configuration
- [Toggle Switch](./toggle-switch) — Standalone boolean **State** (not the same object as a global, unless you bridge them in script)
- [Button](./button) — Momentary actions
- [Generic](./generic) — Diagnostic layouts without **`Value`** script API
- [Chart](./chart) — Plotting logged globals
