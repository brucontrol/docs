---
id: toggle-switch
title: Toggle Switch
sidebar_position: 3
---

# Toggle Switch

The **Toggle Switch** element is a dedicated boolean control for the Dashboard. Operators see a switch affordance with optional ON/OFF labels, while Process scripts read and write the same boolean **`State`**. This element is distinct from a boolean [Global Variable](./global-variable) using **gv-bool**: both can represent true/false, but the toggle switch template is tuned for immediate mode control with **`toggleOnColor`**, **`toggleOffColor`**, and toggle typography, plus card chrome including **`headerColor`** and an optional **`image`** background.

## When to Use a Toggle Switch

Choose a toggle when the meaning is **sustained state**—arming a loop, selecting manual override, enabling a feature flag for the rest of the session, or gating a script path. Pair toggles with [Button](./button) elements when you need both a durable mode (toggle) and a one-shot action (button). If the boolean is primarily **data** (recipe parameter, computed flag) rather than a primary control, a **gv-bool** global may fit better because it keeps the value in the global-variable subsystem your scripts already use for setpoints.

## Layout Flags

**`showHeader`**, **`showLabel`**, and **`showBackground`** follow the same pattern as other card templates. **`showValue`** controls whether the switch control renders at all (description in `ui-controls.json`: “Show toggle control”). **`showToggleLabel`** controls whether the textual ON/OFF (or custom) labels appear beside the switch—useful when the switch color alone carries meaning in a compact panel.

:::tip Script and UI agreement

Decide whether the operator or automation “wins” when both can touch **`State`**. Many teams let scripts set **`State`** on mode entry but allow operator override only while **User Control** is enabled. Document that contract next to the element name in Solution Explorer comments or your runbook.

:::

## Custom Properties

Names match **`element-templates/toggle-switch/ui-controls.json`**.

| Property | Type | Default | Group | Description |
|----------|------|---------|-------|-------------|
| showHeader | boolean | true | Layout | Show the header bar. |
| showBackground | boolean | true | Layout | Show element background and border. |
| showLabel | boolean | true | Layout | Show the title label in the header. |
| showValue | boolean | true | Layout | Show the toggle control. |
| showToggleLabel | boolean | true | Layout | Show ON/OFF text beside the toggle. |
| onLabel | text | ON | Toggle | Text when **`State`** is true. |
| offLabel | text | OFF | Toggle | Text when **`State`** is false. |
| toggleFontFamily | text | — | Toggle | Toggle label font family. |
| toggleFontSize | number | 19 | Toggle | Toggle label size (10–120). |
| toggleFontWeight | text | — | Toggle | Toggle label weight. |
| toggleFontStyle | text | normal | Toggle | Toggle label style. |
| toggleTextColor | text | — | Toggle | Toggle label color (color-alpha; theme default: accentGreen). |
| toggleOnColor | text | — | Toggle | Color when ON (color-alpha; theme default: accentGreen). |
| toggleOffColor | text | — | Toggle | Color when OFF (color-alpha; theme default: bgTertiary). |
| labelFontFamily | text | — | Label | Header/title font family. |
| labelFontSize | number | 12 | Label | Label size (8–48). |
| labelFontWeight | text | — | Label | Label weight. |
| labelFontStyle | text | normal | Label | Label style. |
| labelColor | text | — | Label | Label color (color-alpha; theme default: textPrimary). |
| backgroundColor | text | — | Background & Border | Card background (color-alpha; theme default: bgSecondary). |
| headerColor | text | — | Background & Border | Header background (color-alpha; theme default: bgTertiary). |
| borderColor | text | — | Background & Border | Border color (color-alpha; theme default: borderColor). |
| image | text | — | Background & Border | Background image (file-upload). |

:::info No value* font keys on this template

The title uses **`label*`** properties. The switch captions use **`toggle*`** properties. Do not use deprecated **`valueFontFamily`**, **`valueFontSize`**, or **`valueColor`** names—they do not exist on **toggle-switch**.

:::

## Script Integration

**`State`** is boolean, read/write.

Common properties on all elements: **`ID`** (string, read-only), **`DisplayName`** (string, read/write), **`Visibility`** (string, read/write), **`EnableHistoricalLogging`** (boolean, read/write), **`LoggingIntervalSeconds`** (number, read/write), **`MaxSilenceSeconds`** (number, read/write).

```
new bool manual
manual = "Heater Manual" State

// Automation forces auto mode when safe
if TankTemp < 40
  "Heater Manual" State = off
endif

// Operator label polish
"Heater Manual" DisplayName = "Heater: manual heat"

// Hide when the tank is empty
if LevelOk
  "Heater Manual" Visibility = "visible"
else
  "Heater Manual" Visibility = "hidden"
endif

"Heater Manual" EnableHistoricalLogging = true
"Heater Manual" LoggingIntervalSeconds = 0
"Heater Manual" MaxSilenceSeconds = 600
```

:::warning Visibility enum

Stick to **`"default"`**, **`"visible"`**, **`"hidden"`**, and **`"hiddenlocked"`** for **`Visibility`** (see [Elements Overview](./overview)).

:::

## Visual Design Notes

**`toggleOnColor`** and **`toggleOffColor`** describe the switch’s on/off presentation; **`toggleTextColor`** should remain legible on both. **`headerColor`** differentiates the title strip from the body. A strong **`image`** background may require muting **`backgroundColor`** or choosing darker **`labelColor`** / **`toggleTextColor`** values. Preview on the target display size—wall-mounted monitors need larger **`toggleFontSize`** than laptop dashboards.

## Operator Interaction

When **User Control** is off, operators might be unable to flip **`State`** even though scripts can still assign it—handy for read-only indicators mirrored from automation. **`DisplayName`** appears when **`showLabel`** is true; shorten it if the tile is narrow.

## Troubleshooting

**Switch does not move.** Check **User Control**, element **Enabled** state (if applicable in your build), and whether a script immediately overwrites **`State`**.

**Colors look wrong in dark theme.** Prefer theme-driven defaults (empty strings let theme tokens apply) or explicit hex with alpha if you need a fixed brand color.

**ON/OFF text clipped.** Reduce **`toggleFontSize`** or lengthen the tile in **Appearance**.

## Related Topics

- [Global Variable](./global-variable) — **`Value`** for booleans with **gv-bool**
- [Button](./button) — Different **`State`** semantics (momentary / latch patterns)
- [Generic](./generic) — Readouts without built-in toggle behavior
- [Elements Overview](./overview) — Logging and visibility model
- [Digital Output](./digital-output) — When **`State`** should ultimately energize hardware
