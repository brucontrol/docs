---
id: overview
title: Elements Overview
sidebar_position: 1
---

# Elements Overview

Elements are the building blocks of your BruControl system. Each element combines **data**, an **element template**, and **appearance** (position, size, rotation) to create what you see and control on the Dashboard.

## Device vs Non-Device Elements

| Category | Description | Examples |
|----------|-------------|----------|
| **Non-Device** | Software-only elements that live in a workspace. No physical hardware connection. | Global Variable, Toggle Switch, Button, Timer, Alarm, Chart, Profile, Script Element, Generic |
| **Device** | Elements backed by a device port (interface + port). Read from or control physical hardware. | Digital Output, Analog Input, 1-Wire Temp, PID, Hysteresis, Duty Cycle, etc. |

Non-device elements are created directly in a workspace or folder. Device elements are created by adding a device (interface + port) and choosing the element type for that port.

Whether an element is device-backed or software-only, it still participates in the same overall model: you name it, optionally give it a friendlier **DisplayName**, choose how visible it is, and decide how much operators may change from the Dashboard (**UserControl**). That consistency makes it easier to build solutions where scripts, alarms, and manual controls all cooperate without surprises.

## Element = Data + Template + Appearance

Every element has three layers:

1. **Data** — Native properties (value, state, etc.) and optional custom properties from the element template
2. **Element Template** — The visual representation (e.g., gauge, toggle, chart). Templates define custom properties (colors, fonts, layout) via `ui-controls.json`
3. **Appearance** — Position (x, y), size (width, height), z-order, rotation — stored per theme

Element templates define how an element **looks** on the Dashboard: controls, styling, and any template-driven custom properties. You can **change the template after the element is created** (for example, switching from a simple label to a dial) without recreating the element. After you pick a new template, review custom properties and appearance so the layout still fits your workspace.

Templates are versioned assets in the solution ecosystem: the **ElementTemplateId** (or equivalent choice in the **Appearance** tab) selects which package of UI controls and default styling applies. Switching templates does not destroy the element’s underlying data—native properties like sensor values or output states remain—but template-specific custom properties may change or need to be reconfigured because each template exposes its own `ui-controls.json` schema.

:::tip Themes and per-theme appearance

BruControl supports **themes**. Layout and appearance settings such as position, size, and rotation can be stored **per theme**, so the same logical element can be placed or sized differently when users switch themes. Non-layout data (values, enabled state, logging settings) is shared across themes.

:::

## Common Properties

All elements share a common set of configuration and behavior. These apply in the editor, on the Dashboard, and (where noted) in **scripts**.

| Property | Description |
|----------|-------------|
| **Name** | Internal name of the element. Used for identification in Solution Explorer, exports, and references. |
| **DisplayName** | Label shown on the element in the UI. Can differ from **Name** for clearer operator-facing text. |
| **Visibility** | Controls whether the element appears on the Dashboard: `default` (follows normal rules), `visible`, `hidden`, or `hiddenlocked` (hidden and not trivially revealed). |
| **UserControl** | Whether operators may change values or interact with the element from the Dashboard when the design allows it. |
| **Enabled** | Whether the element is active (boolean, default `true`). For device elements this controls hardware communication and is read/write. For non-device elements the property is read-only. |
| **ElementTemplateId** | Identifies the **element template** used for visual representation and template-defined custom properties. |
| **EnableHistoricalLogging** | When enabled, the element’s values can be stored for history and charts. |
| **LoggingIntervalSeconds** | Minimum seconds between stored samples when logging is enabled (default: `1`). Set to `0` to log on every change. |
| **MaxSilenceSeconds** | If no value change occurs for this many seconds, the current value is logged anyway; `0` disables this. Useful for values that stay stable for long periods (for example, setpoints or global variables). |

**Visibility** and **UserControl** work together: an element can exist in the solution but stay off the Dashboard (`hidden` / `hiddenlocked`), or stay visible while scripts still enforce whether operators may click or drag values. Use **`hiddenlocked`** when you want elements removed from normal operator view without inviting casual unhide actions.

**ElementTemplateId** is how the application knows which visual template to load. You normally manage it through the element editor (**Appearance** / template selection) rather than typing an identifier by hand.

Device elements add shared hardware-oriented properties (such as **Enabled** and **Connected**). See [Device Elements Overview](./device-elements-overview).

:::warning Historical logging and storage

Turning on **EnableHistoricalLogging** increases database activity. Pair **LoggingIntervalSeconds** and **MaxSilenceSeconds** with how fast the value really changes and how granular your charts need to be. Logging every change on a noisy analog input can generate far more points than logging once per minute with an occasional silence heartbeat.

:::

### Script access (common to all elements)

In Process scripts, every element exposes a common subset of properties for automation and diagnostics. These align with the definitions used for editor IntelliSense:

| Property | Type | Access | Notes |
|----------|------|--------|-------|
| `ID` | string | Read-only | Unique element identifier. |
| `DisplayName` | string | Read/write | Display name shown on the element. |
| `Visibility` | string | Read/write | One of `"default"`, `"visible"`, `"hidden"`, `"hiddenlocked"`. |
| `EnableHistoricalLogging` | boolean | Read/write | Turns historical logging on or off. |
| `LoggingIntervalSeconds` | number | Read/write | Minimum interval between logged points (seconds). |
| `MaxSilenceSeconds` | number | Read/write | Force a log after this many seconds without a change; `0` disables. |

Type-specific and device-specific properties are documented on each element’s page.

```javascript
// Example: hide an element from the Dashboard until a condition is met
if (SomeGlobal.Value > 100) {
  MyElement.Visibility = "visible";
} else {
  MyElement.Visibility = "hidden";
}

// Example: tune logging for a slowly changing value
MyElement.EnableHistoricalLogging = true;
MyElement.LoggingIntervalSeconds = 60;
MyElement.MaxSilenceSeconds = 300;
```

:::info Naming in scripts vs the UI

Scripts refer to elements by the names you define in the solution. **`DisplayName`** is what operators usually see on screen; **`ID`** is the stable unique identifier if you need to correlate with APIs or diagnostics.

:::

## All Element Types

### Non-Device Elements

| Type | Description |
|------|-------------|
| [Global Variable](./global-variable) | Store values (numeric, boolean, string, time, datetime). Script variables, displays. |
| [Toggle Switch](./toggle-switch) | On/off state. Manual override, script trigger. |
| [Button](./button) | Momentary press. One-shot actions. |
| [Generic](./generic) | Flexible container. Labels, custom displays. |
| [Timer](./timer) | Count-up or count-down. Mash timer, boil timer. |
| [Alarm](./alarm) | Threshold monitoring. High temp, low level alerts. |
| [Script Element](./script) | Links to a Process (script). Run, stop, pause from UI. |
| [Chart](./chart) | Time-series display. Temperature history, data logging. |
| [Profile](./profile) | Ramp/profile control. Temperature ramps, step mashing. |

### Device Elements

| Type | Description |
|------|-------------|
| [Digital Output](./digital-output) | On/off control (relays, valves) |
| [Digital Input](./digital-input) | Read on/off states |
| [Duty Cycle](./duty-cycle) | Time-based on/off cycling |
| [PWM Output](./pwm-output) | Pulse-width modulation |
| [Analog Input](./analog-input) | Variable voltage reading |
| [Counter](./counter) | Pulse counting (flow meters) |
| [1-Wire Temperature](./ow-temp) | Temperature sensors |
| [SPI Sensor](./spi-sensor) | SPI-connected sensors |
| [Hydrometer](./hydrometer) | Specific gravity |
| [Hysteresis](./hysteresis) | Temperature control with deadband |
| [PID](./pid) | Proportional-Integral-Derivative control |
| [Deadband](./deadband) | Prevent oscillation |

See [Device Elements Overview](./device-elements-overview) for device-specific documentation.

## Adding Elements

- **Non-device**: Right-click a workspace in Solution Explorer → [Element Type] (e.g., Button, Timer, Alarm)
- **Device**: Right-click a workspace → **Device**, then select interface, element type, and port

After creation, open the **Edit Drawer** to finish setup: pick a template, position the element on the Dashboard for each theme you care about, and configure logging if you plan to chart the value. Device elements also need a valid port on a connected interface before live data appears; software elements are ready as soon as scripts or bindings reference them.

## Next Steps

- [Non-Device Elements](./global-variable) — One page per type with properties and script integration
- [Calibrations](./calibrations-overview) — Transform raw device values (temperature, voltage, etc.)
