---

## id: element-template-request-prompt-template
title: Element Template Request — Prompt Template
sidebar_position: 3

# Element Template Request — Prompt Template

Copy the prompt below, fill in the details at the top, and paste into your AI assistant (e.g. Claude, Gemini). Attach any reference image when the prompt asks for it.

---

## 1. Fill in these details (then delete this section before sending)


| Placeholder            | Example                                                                      | Your value |
| ---------------------- | ---------------------------------------------------------------------------- | ---------- |
| **Element type**       | `pwmOutput`, `analogInput`, `generic`, `timer`, …                            |            |
| **Short goal**         | Create a PWM element template / Create a circular gauge for analog input     |            |
| **Visual / design**    | Follow the attached image; use raw SVG and CSS. Make background transparent. |            |
| **Extra requirements** | Dynamic min/max, user-editable labels, color ui-controls                     |            |


Use the [Element Types Reference](element-template-developer-guide.md#6-element-types-reference) in the developer guide for valid `element type` values (e.g. `pwmOutput`, `analogInput`, `globalVariable-value`, `generic`).

---

## 2. Prompt (copy from here down)

I need you to build a production-ready element template plugin for BruControl.

**Required reading — you must follow and cross-check against this guide:**

- **Element Template Developer Guide:**  
[https://github.com/brucontrol/bru-docs/blob/main/docs/element-templates/element-template-developer-guide.md](https://github.com/brucontrol/bru-docs/blob/main/docs/element-templates/element-template-developer-guide.md)

Read it carefully. The info in it is critical (flat data, ui-controls schema, SDK usage, pitfalls).

**Details for this template:**

- **Element type:** [ELEMENT_TYPE — e.g. pwmOutput, analogInput, generic]
- **Goal:** [GOAL — e.g. Create a PWM element template. / Create a circular gauge for analog input.]
- **Visuals / design:** [VISUAL_NOTES — e.g. Follow the attached image as closely as possible (minus watermarks). Use raw SVG and CSS. Make the background transparent so it looks good on any dashboard.]
- **Extra requirements:** [REQUIREMENTS — e.g. Dynamic min/max; user-editable text labels; ui-controls for colors so users can alter colors.]

**Deliverables:**

- Complete `index.js`, `index.html`, `style.css`, and `ui-controls.json`.
- Wrap the JS in an IIFE.

**Crucial BruControl rules (from the developer guide):**

1. **Flat data:** Custom properties from ui-controls.json arrive **flat on the root** of the object passed to `BruControl.onData(data)`. Use `data.min`, `data.title`, `data.labelColor` — **not** `data.appearance.title` or `data.properties.min`.
2. **Empty string handling:** Use strict `!== undefined` checks (or explicit handling of `""`) when applying optional text/labels. Do **not** use `||` fallbacks for user-editable text; otherwise when a user clears a field to leave it blank, your code will overwrite with a default instead of showing nothing.
3. **SDK registration:** **Call** `BruControl.onData(function(data) { ... })` — do **not** assign `BruControl.onData = function(...)`. Same for `onTheme`: call it with a callback. Assigning overwrites the SDK and breaks the data pipeline.
4. **No native properties in ui-controls for device elements:** If this template is for a device element (e.g. pwmOutput, analogInput), do **not** put native properties like `value` or `state` in ui-controls.json. They would shadow live hardware data. Only include template-specific options (labels, colors, min/max for display, visibility, etc.). For `generic` elements, value/min/max can be template display config.
5. **Initialization:** There is no onInit/onMount. Use the **first** `onData` payload as the trigger to build or update the DOM (e.g. draw gauge, set labels). Do not rely only on DOMContentLoaded; it can race with BruControl’s data.
6. **ui-controls.json shape:** Flat dictionary: keys are property names, values are control definitions with `type`, `default`, `title`, `group`, etc. No `"properties"` wrapper; not standard JSON Schema.

Take your time: get the math for gauges/pointers right, keep the code bug-free, and ensure it matches the developer guide.