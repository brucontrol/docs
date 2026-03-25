---
id: digital-output
title: Digital Output
sidebar_position: 2
---

# Digital Output

A **Digital Output** element represents a single binary output on your interface: it drives a pin **ON** or **OFF**. Typical uses include relay coils, indicator LEDs, solenoids (with proper drivers), and enable lines for other equipment. The on-screen element can show a header, label, and an interactive toggle that mirrors and controls the hardware state.

## What it does

When the output is **ON**, the interface drives the configured pin to the active level (high or low, depending on **Active Low**). When **OFF**, it drives the inactive level. BruControl scripts and the UI both read and write **State**; the firmware applies **Active Low**, **OneShot**, and **DualThrow** settings when those features are used.

:::info
Digital outputs are **not** meant to source heavy loads directly. Treat the pin as a logic signal and use relays, MOSFETs, or SSRs for motors, heaters, and pumps.
:::

## Hardware and wiring

- Match the port to a **Digital Output** (or equivalent) pin on your interface documentation.
- For inductive loads (relays, solenoids), use flyback protection where required by your hardware design.
- **Active Low** in script properties inverts the electrical meaning of ON/OFF: enable it when your external circuit expects a low voltage to mean “energized.”

:::tip
If a load “sticks on” when you expect it off, verify **Active Low**, wiring to the correct port, and whether a dual-throw or one-shot sequence is still in progress.
:::

## Adding a Digital Output element

1. Ensure your **Interface** device is added, enabled, and has an available digital output port.
2. Use **Add Device Element** (for example from the device in Solution Explorer) and choose **Digital Output**.
3. Bind the element to the device and port.
4. Open the element editor to set appearance options and script-facing behavior.

**Port type:** **DigitalOutput** — use only pins designated for digital output on your wiring map.

## Custom properties (appearance)

These names match the Digital Output template’s `ui-controls.json`. Use them in the element designer or theme overrides as your workflow allows.

### Layout

| Property | Notes |
|----------|--------|
| `showHeader` | boolean, default `true` — show the element header strip. |
| `showBackground` | boolean, default `true` — show the main card background. |
| `showLabel` | boolean, default `true` — show the label text. |
| `showValue` | boolean, default `true` — label in UI: “Show toggle control”. |
| `showToggleLabel` | boolean, default `true` — show ON/OFF labels on the toggle. |
| `showActiveIndicator` | boolean, default `true` — visual indicator when output is active. |

### Label

| Property | Notes |
|----------|--------|
| `labelFontFamily` | text, default `""` (inherits). |
| `labelFontSize` | number, default `12`, range `8`–`48`. |
| `labelFontWeight` | text, default `"500"`. |
| `labelFontStyle` | text, default `"normal"`. |
| `labelColor` | text, default `""` (theme: `textPrimary`). |

### Toggle (not “value” fonts)

The toggle uses **toggle**\* properties. Older docs sometimes referred to `valueFontFamily` / `valueFontSize` / `valueColor`; those keys are **not** defined for this template—use the toggle fields below.

| Property | Notes |
|----------|--------|
| `onLabel` | text, default `"ON"`. |
| `offLabel` | text, default `"OFF"`. |
| `toggleOnColor` | color, default theme `accentGreen`. |
| `toggleOffColor` | color, default theme `bgTertiary`. |
| `toggleTextColor` | text, default `""` (theme: `accentGreen`). |
| `toggleFontFamily` | text, default `""` (inherits `font-family`). |
| `toggleFontSize` | number, default `19`, range `10`–`120`. |
| `toggleFontWeight` | text, default `"700"`. |
| `toggleFontStyle` | text, default `"normal"`. |

### Background and chrome

| Property | Notes |
|----------|--------|
| `backgroundColor` | default theme `bgSecondary`. |
| `headerColor` | default theme `bgTertiary` — header strip behind the title area. |
| `borderColor` | default theme `borderColor`. |
| `image` | file-upload — optional background image for the element. |

## Script properties — common to all elements

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `ID` | string | RO | Unique element identifier. |
| `DisplayName` | string | RW | Name shown on the element. |
| `Visibility` | string | RW | `default`, `visible`, `hidden`, or `hiddenlocked`. |
| `EnableHistoricalLogging` | boolean | RW | Store history for charting when enabled. |
| `LoggingIntervalSeconds` | number | RW | Minimum seconds between stored samples; `0` logs every change. |
| `MaxSilenceSeconds` | number | RW | Force a log after N seconds with no change; `0` disables. |

## Script properties — all device elements

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `Enabled` | boolean | RW | When `false`, the element does not talk to hardware. |
| `Connected` | boolean | RO | Whether the device is connected to the interface. |
| `RefreshMultiple` | number | RW | Multiplier for refresh interval (reduces traffic when increased). |
| `DisplayText` | string | RO | Formatted text from the port (includes calibrations/formatting). |
| `PortID` | string | RO | Port identifier for this binding. |

## Script properties — Digital Output only

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `State` | boolean | RW | On/off output state. |
| `ActiveLow` | boolean | RW | Invert active level: ON drives low instead of high when enabled. |
| `OneShot` | number | RW | One-shot duration in ms; `0` disables one-shot. |
| `OneShotDirection` | boolean | RW | `true` = pulse **OFF→ON**, `false` = pulse **ON→OFF**. |
| `ActualState` | boolean | RO | State as received from the physical device (may differ from `State` during one-shot or dual-throw transitions). |
| `DualThrowPortNum` | number | RW | Companion port index for dual-throw relay logic. |
| `DualThrowDelay` | number | RW | Delay in ms between throws when using dual-throw mode. |

:::warning
**OneShot** and **DualThrow** timing interact with hardware and safety interlocks. Test with light loads before connecting production equipment.
:::

## Example scripts

Turn a pump on when a condition is met:

```
if (SomeSensor.Value > 50) {
    PumpRelay.State = true;
} else {
    PumpRelay.State = false;
}
```

Pulse a line for 200 ms (ON then return), direction ON→OFF:

```
PumpRelay.OneShot = 200;
PumpRelay.OneShotDirection = 0;
PumpRelay.State = true;
```

Hide the element from the dashboard but keep it scriptable:

```
AuxOutput.Visibility = "hidden";
```

## Troubleshooting

- **Toggle moves but hardware does not** — Check **Enabled**, **Connected**, and **PortID**. Confirm the port is a digital output in hardware configuration. Verify **RefreshMultiple** is not set so high that updates appear stuck.
- **Polarity seems reversed** — Toggle **ActiveLow** in script or element settings so ON matches your circuit’s expectation.
- **Output flickers or only pulses** — Inspect **OneShot** (non-zero enables timed pulse). Clear or set **OneShot** to `0` if you need steady state. Review **DualThrowDelay** and **DualThrowPortNum** if dual-throw sequencing is configured unintentionally.
- **No historical data** — Set **EnableHistoricalLogging** to `true` and adjust **LoggingIntervalSeconds** / **MaxSilenceSeconds** so values are stored as you expect.
- **Wrong label or toggle styling** — Use **toggleFontFamily**, **toggleFontSize**, **toggleTextColor**, etc., not deprecated `value*` keys; those are not part of this template.
