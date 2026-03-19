---
id: counter
title: Counter
sidebar_position: 7
---

# Counter

A **Counter** element accumulates pulses from a digital flow meter, encoder, hall sensor, or any source that produces discrete edges faster than you would comfortably sample with a normal **Digital Input**. It reports a running **Total** and derived **Rate** so you can monitor consumption, speed, or production counts from the Dashboard and from Process scripts.

## What it is

The Counter binds to a **Counter** port on an interface. Hardware or firmware counts transitions on the pin; BruControl exposes the aggregate **Total** and rate information. **SamplingPeriod** (read/write, 1–10 seconds in the documented range) governs how the platform times rate-related updates—tune it to match how quickly your process meaningfully changes without overloading communication.

**RawRate** and **Rate** are read-only numeric values scripts can use for logic and logging; which one you prefer depends on whether you need the least processed tap (**RawRate**) or the value aligned with the same smoothing the UI favors (**Rate**).

:::tip

When commissioning a new meter, compare **Total** against a known volume or manual count first. Once totals match, tune **SamplingPeriod** and dashboard precision so **Rate** updates feel responsive without flickering.

:::

## Hardware connection

Wire the pulse output of your sensor to the designated **Counter** pin per the wiring map, with appropriate voltage levels (often 5 V or 3.3 V logic). Open-collector outputs may need a pull-up. Keep signal wires short and separated from motor or relay cabling where possible.

:::warning

Applying mains or higher voltages directly to a logic counter input will destroy the interface. Use isolators or level shifters when the field device is not logic-level safe.

:::

## Port type

**Counter** — Use only pins your board documents as high-speed or dedicated counter inputs.

## How to add

1. Confirm the interface firmware and wiring map expose a **Counter** port.
2. **Add Device Element** → **Counter** → select interface and port.
3. Set **Display Name**, **Enabled**, logging, and **SamplingPeriod** in the editor.
4. Style the card with the template’s custom properties (default template **`counter`**).

## Native and editor properties (summary)

The editor also provides standard device options (**User Control**, visibility, historical logging, refresh behavior). Use calibrations if your solution applies scaling to counts or rates for a particular meter K-factor workflow.

## Custom properties (template)

From `ui-controls.json` for the default **Counter** template.

### Layout

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| showHeader | boolean | true | Show header bar |
| showBackground | boolean | true | Show element background and border |
| showLabel | boolean | true | Show title label in header |
| showValue | boolean | true | Show primary value rows |
| showSecondaryRows | boolean | true | Show secondary detail rows |

### Label

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| labelFontFamily | text | — | Header label font |
| labelFontSize | number | 12 | Label size (8–48) |
| labelFontWeight | text | "500" | Label weight |
| labelFontStyle | text | "normal" | Label style |
| labelColor | text | — | Label color (theme: textPrimary) |

### Count

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| showCount | boolean | true | Show the Count section |
| countLabel | text | "Count" | Label beside the count (e.g. Count, Total) |
| countPrecision | number | 0 | Decimal places for count (0–6) |
| countColor | text | — | Count value color (theme: accentGreen) |
| countBg | text | — | Count box background (theme: bgTertiary) |
| countLabelColor | text | — | Count label color (theme: textSecondary) |
| countFont | text | — | Count value font family |
| countSize | number | null | Count value size px (8–120) |
| countWeight | text | — | Count value weight |
| countStyle | text | — | Count value style |
| countLabelFontFamily | text | — | Count label font family |
| countLabelFontSize | number | 10 | Count label size (8–24) |
| countLabelFontWeight | text | — | Count label weight |
| countLabelFontStyle | text | "normal" | Count label style |

### Rate

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| showRate | boolean | true | Show the Rate section |
| ratePrecision | number | 2 | Decimal places for rate (0–6) |
| rateColor | text | — | Rate value color (theme: accentGreen) |
| rateLabelColor | text | — | Rate label color (theme: textSecondary) |
| rateFont | text | — | Rate value font family |
| rateSize | number | null | Rate value size px (8–120) |
| rateWeight | text | — | Rate value weight |
| rateStyle | text | — | Rate value style |

### Background and border

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| backgroundColor | text | — | Card background (theme: bgSecondary) |
| headerColor | text | — | Header background (theme: bgTertiary) |
| borderColor | text | — | Border color (theme: borderColor) |
| image | text | — | Card background image (file upload); replaces color/border presentation per template |

:::info

Use **showSecondaryRows** to simplify the card when only **Total** matters for operators, or when vertical space on the Dashboard is tight. **headerColor** and **image** should still preserve enough contrast for **countColor** / **rateColor** against their backgrounds.

:::

## Script integration — common element properties

| Property | Access | Description |
|----------|--------|-------------|
| ID | Read-only | Unique element identifier |
| DisplayName | Read/write | Dashboard label |
| Visibility | Read/write | `"default"`, `"visible"`, `"hidden"`, `"hiddenlocked"` |
| EnableHistoricalLogging | Read/write | Historical logging on/off |
| LoggingIntervalSeconds | Read/write | Minimum seconds between log entries |
| MaxSilenceSeconds | Read/write | Force a log after silence; `0` disables |

## Script integration — common device properties

| Property | Access | Description |
|----------|--------|-------------|
| Enabled | Read/write | Communication active |
| Connected | Read-only | Link to interface healthy |
| RefreshMultiple | Read/write | Refresh multiplier (1–60) |
| DisplayText | Read-only | UI-formatted text |
| PortID | Read-only | Assigned port id |

## Script integration — counter properties

| Property | Access | Description |
|----------|--------|-------------|
| SamplingPeriod | Read/write | Sampling window for rate timing (1–10 s) |
| Total | Read-only | Accumulated count |
| RawRate | Read-only | Raw rate value |
| Rate | Read-only | Rate value (presentation-aligned) |

### Examples

Log totals and rate:

```
new value gallons
gallons = "Main Flow" Total
new value gpm
gpm = "Main Flow" Rate
print gallons
print gpm
```

Slow down host traffic when idle:

```
if "Process Active" Value = off
  "Main Flow" RefreshMultiple = 20
else
  "Main Flow" RefreshMultiple = 1
endif
```

Adjust sampling for a sluggish display:

```
"Main Flow" SamplingPeriod = 5
```

## Calibrations

If your workflow applies calibrations to scale pulses to engineering units, configure them on the **Calibration** tab; **DisplayText** reflects those transforms for operator-facing strings.

## Troubleshooting

| Symptom | Things to check |
|---------|-----------------|
| Total does not increment | Wiring, active-high vs active-low, sensor power; **Enabled** and **Connected**; correct **Counter** pin |
| Rate jumps or reads zero | **SamplingPeriod** too long/short for pulse frequency; compare **RawRate** and **Rate**; mechanical slip or electrical noise |
| Values freeze | **Connected** false (USB/network/interface reset); **RefreshMultiple** too high |
| Dashboard cluttered | **showRate**, **showCount**, **showSecondaryRows**; template layout |
| Script cannot write Total | **Total** is read-only—reset flows are handled via device-specific or calibration workflows, not direct assignment |
| Logging gaps | **LoggingIntervalSeconds**, **MaxSilenceSeconds**, and whether **EnableHistoricalLogging** is on |
| Poor legibility | **countBg** / **rateLabelColor** vs **countColor** / **rateColor**; **headerColor** and **image** contrast |
