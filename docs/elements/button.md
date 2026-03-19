---
id: button
title: Button
sidebar_position: 4
---

# Button

The **Button** element provides a clear clickable target on the Dashboard for operator actions. In BruControl’s scripting model, the element exposes a boolean **`State`** that processes can read or write—typical patterns latch **`State`** when the operator presses, clear it after handling, or use it as a short-lived flag between scans. The default **button** template (`element-templates/button/ui-controls.json`) focuses on the face of the control: **`showButtonText`** decides whether the caption appears, **`buttonColor`** and **`buttonTextColor`** set the primary colors, font properties tune typography, and **`image`** allows a full background graphic instead of (or blended with) a flat fill.

## When to Use a Button

Buttons fit **one-shot** or **explicit acknowledgment** workflows: start transitions, reset counters, acknowledge messages, or trigger a script block guarded by “if button pressed.” They complement [Toggle Switch](./toggle-switch) elements, which represent **held** state. They also differ from [Global Variable](./global-variable) elements, which store arbitrary typed **`Value`** data; a button’s script contract is the boolean **`State`** surface plus the common metadata properties shared by all elements.

## Custom Properties

All keys below are defined in **`element-templates/button/ui-controls.json`**.

| Property | Type | Default | Group | Description |
|----------|------|---------|-------|-------------|
| showButtonText | boolean | true | Button | Show the text label on the button face. |
| buttonColor | text | — | Button | Button background color (color-alpha; theme default: accentPrimary). |
| buttonFontFamily | text | — | Button | Button text font family. |
| buttonFontSize | number | 15 | Button | Button text size (8–120). |
| buttonFontWeight | text | 600 | Button | Button text weight. |
| buttonFontStyle | text | normal | Button | Button text style. |
| buttonTextColor | text | — | Button | Button text color (color-alpha; theme default: textOnAccent). |
| image | text | — | Button | Background image (file-upload); replaces solid background when set per template behavior. |

**`showButtonText`** supports icon-forward layouts: set it to false and rely on **`image`** or a bold **`buttonColor`** block while keeping a large hit target. When text is visible, ensure **`buttonTextColor`** contrasts with **`buttonColor`** for both light and dark themes.

**`image`** accepts standard image uploads (see picker constraints in the editor). High-detail photos may need a semi-transparent **`buttonColor`** overlay or a simpler asset so the label remains readable when **`showButtonText`** is true.

:::info No header strip on the button template

Card-style templates such as [Toggle Switch](./toggle-switch) and [Generic](./generic) expose **`headerColor`** because they render a distinct header region. The **button** template’s `ui-controls.json` file includes **only** the **Button** group properties in the table above—there is no separate **`headerColor`** key. Align visual hierarchy with neighboring tiles using **`buttonColor`**, **`image`**, and **`DisplayName`** in Solution Explorer.

:::

## Script Integration

**`State`** is boolean, read/write. The idiomatic use depends on your Process scripts; some solutions pulse **`State`**, others read edges.

Common script properties: **`ID`** (string, read-only), **`DisplayName`** (string, read/write), **`Visibility`** (string, read/write), **`EnableHistoricalLogging`** (boolean, read/write), **`LoggingIntervalSeconds`** (number, read/write), **`MaxSilenceSeconds`** (number, read/write).

```
new bool go
go = "Advance Step" State

// Example hand-off: consume press
if go = on
  // ... run transition ...
  "Advance Step" State = off
endif

"Advance Step" DisplayName = "Next step (confirms)"

// Hide when the sequence is done
if RecipeComplete
  "Advance Step" Visibility = "hidden"
else
  "Advance Step" Visibility = "visible"
endif

"Advance Step" EnableHistoricalLogging = true
"Advance Step" LoggingIntervalSeconds = 0
"Advance Step" MaxSilenceSeconds = 0
```

:::warning User Control and safety

Disabling **User Control** may prevent operators from driving **`State`** from the Dashboard. Never rely on a button as a sole safety interlock without verifying hardware limits and interlocks independently.

:::

## Layout and Readability

**`buttonFontSize`** spans 8–120; toward the upper end, single-word labels remain legible on touch panels. When **`showButtonText`** is false, add a tooltip or surrounding label in the workspace so new operators understand the action. **`DisplayName`** still matters for logs and Solution Explorer even if the face is icon-only.

## Troubleshooting

**Clicks seem ignored.** Verify **User Control**, **`Visibility`**, and z-order in **Appearance**. Confirm no script clears **`State`** before your handler runs.

**Text overflows.** Shorten **`DisplayName`**, reduce **`buttonFontSize`**, or widen the element.

**Image does not show.** Re-upload the asset, confirm **`image`** is non-empty in **Custom Properties**, and check whether **`buttonColor`** fully obscures translucent artwork.

**Script never sees `on`.** Instrument the Process to log **`State`** each scan during testing; you may need a rising-edge pattern instead of level checks.

## Related Topics

- [Toggle Switch](./toggle-switch) — Boolean **`State`** with persistent switch UI
- [Global Variable](./global-variable) — Typed **`Value`** storage
- [Script Element](./script) — Processes that react to button patterns
- [Alarm](./alarm) — Scenarios that combine alerts with acknowledgments
- [Elements Overview](./overview) — Shared logging and visibility properties
