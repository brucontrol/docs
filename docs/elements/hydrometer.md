---
id: hydrometer
title: Hydrometer
sidebar_position: 10
---

# Hydrometer

The **Hydrometer** element integrates electronic hydrometers such as the **iSpindel** and compatible telemetry devices. These sensors report **tilt-derived specific gravity** and often an onboard **temperature**, letting brewers and other operators track fermentation progress without opening a vessel. In BruControl, the element maps to a **Hydrometer** port on an interface that receives the device’s payloads (commonly via Wi-Fi bridges or serial forwarding, depending on your hardware stack).

## What it is

A **Hydrometer** device element decodes the sensor’s transmission and exposes two script-visible numbers: **`SG`** (specific gravity) and **`Temp`** (temperature). The Dashboard template shows styled rows for temperature and specific gravity with independent precision and typography.

:::info

**RawTemp**, **RawSG**, **Color**, **PrimaryDisplayChannel**, and similar fields may appear in the **native** or **designer** UI for configuration and diagnostics. They are **not** script-accessible. In Process scripts, only **`SG`** and **`Temp`** are available from the hydrometer element itself—plan diagnostics and transforms around that contract.

:::

## Hardware connection

Follow your hydrometer vendor’s pairing guide: charging, Wi-Fi provisioning, and reporting interval all affect how quickly **`Temp`** and **`SG`** refresh in BruControl. Ensure the interface or gateway you use is on the same network plan and that firewall rules allow the microcontroller to receive UDP/TCP or serial frames as required. Physical placement still matters—strap length and trub can shift tilt and therefore apparent gravity.

:::tip

When comparing **`SG`** to manual samples, allow time for equilibrium and temperature compensation assumptions to match your calibration workflow. Log **`Temp`** alongside **`SG`** so post-run analysis can separate thermal effects from true gravity movement.

:::

## Port type

**Hydrometer** — Available only where the interface definition lists hydrometer support.

## How to add

1. Commission the physical hydrometer per vendor instructions.
2. **Add Device Element** → **Hydrometer** → select the interface and **Hydrometer** port that receives its data.
3. Set **Display Name**, logging, and refresh options like any other device element.
4. Tune the **`hydrometer`** template: **tempPrecision**, **sgPrecision**, colors, and optional **image** / **headerColor** for your Dashboard theme.

## Native and editor properties (summary)

Editor-only fields (including raw readings, color hints, or channel selection where provided) configure how the device is interpreted and displayed. Scripts do not see those properties—use **`SG`**, **`Temp`**, **`DisplayText`**, and common device diagnostics instead.

### Color

The **`Color`** property uses the **HydrometerColor** enum to visually distinguish hydrometers on the Dashboard and in device lists:

| Value | Name |
|-------|------|
| 1 | Red |
| 2 | Green |
| 3 | Black |
| 4 | Purple |
| 5 | Orange |
| 6 | Blue |
| 7 | Yellow |
| 8 | Pink |

## Custom properties (template)

From `ui-controls.json` for **`hydrometer`**.

### Layout

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| showHeader | boolean | true | Show header bar |
| showBackground | boolean | true | Show element background and border |
| showLabel | boolean | true | Show title label in header |
| showValue | boolean | true | Show primary value rows |

### Label

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| labelFontFamily | text | — | Header label font |
| labelFontSize | number | 12 | Label size (8–48) |
| labelFontWeight | text | "500" | Label weight |
| labelFontStyle | text | "normal" | Label style |
| labelColor | text | — | Label color (theme: textPrimary) |

### Temperature

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| showTemperature | boolean | true | Show the Temperature section |
| tempPrecision | number | 1 | Decimal places for temperature (0–6) |
| tempColor | text | — | Temperature value color (theme: accentGreen) |
| tempBg | text | — | Temperature box background (theme: bgTertiary) |
| tempLabelColor | text | — | Temperature label color (theme: textSecondary) |
| tempFont | text | — | Temperature value font family |
| tempSize | number | null | Temperature value size (8–120 px) |
| tempWeight | text | — | Temperature value weight |
| tempStyle | text | — | Temperature value style |

### Specific gravity

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| showSpecificGravity | boolean | true | Show the Specific Gravity section |
| sgPrecision | number | 3 | Decimal places for SG (0–6) |
| sgColor | text | — | SG value color (theme: accentGreen) |
| sgBg | text | — | SG box background (theme: bgTertiary) |
| sgLabelColor | text | — | SG label color (theme: textSecondary) |
| sgFont | text | — | SG value font family |
| sgSize | number | null | SG value size (8–120 px) |
| sgWeight | text | — | SG value weight |
| sgStyle | text | — | SG value style |

### Background and border

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| backgroundColor | text | — | Card background (theme: bgSecondary) |
| headerColor | text | — | Header background (theme: bgTertiary) |
| borderColor | text | — | Border color (theme: borderColor) |
| image | text | — | Background image for the card |

:::warning

Do not assume **RawTemp** or **RawSG** are writable from scripts—they are UI/native aids. Automations should use **`Temp`**, **`SG`**, or a **Global Variable** you copy into via script.

:::

## Script integration — common element properties

| Property | Access | Description |
|----------|--------|-------------|
| ID | Read-only | Unique element identifier |
| DisplayName | Read/write | Dashboard label |
| Visibility | Read/write | `"default"`, `"visible"`, `"hidden"`, `"hiddenlocked"` |
| EnableHistoricalLogging | Read/write | Historical logging |
| LoggingIntervalSeconds | Read/write | Minimum seconds between log entries |
| MaxSilenceSeconds | Read/write | Silence heartbeat; `0` disables |

## Script integration — common device properties

| Property | Access | Description |
|----------|--------|-------------|
| Enabled | Read/write | Communication on/off |
| Connected | Read-only | Interface link status |
| RefreshMultiple | Read/write | Refresh multiplier (1–60) |
| DisplayText | Read-only | Operator-facing formatted string |
| PortID | Read-only | Port identifier |

## Script integration — hydrometer properties

| Property | Access | Description |
|----------|--------|-------------|
| SG | Read-only | Specific gravity |
| Temp | Read-only | Temperature reported by the hydrometer |

### Examples

Track fermentation progress:

```
new value gravity
gravity = "FV1 Hydrometer" SG
new value fermTemp
fermTemp = "FV1 Hydrometer" Temp
```

Gate alarms on connectivity:

```
new bool linkOk
linkOk = "FV1 Hydrometer" Connected
if linkOk = off
  print "Hydrometer offline"
endif
```

Log what operators see:

```
new text status
status = "FV1 Hydrometer" DisplayText
print status
```

## Calibrations

If your workflow applies calibrations to **`SG`** or **`Temp`**, use the **Calibration** tab; **`DisplayText`** will include those transforms for display-aligned logging.

## Troubleshooting

| Symptom | Things to check |
|---------|-----------------|
| Stale **SG** / **Temp** | **Connected**, **Enabled**, hydrometer battery, Wi-Fi, gateway, reporting interval |
| Values differ from vendor app | Unit assumptions; calibrations; compare **DisplayText** with vendor formatting |
| Script cannot set **SG** | Only **`SG`** and **`Temp`** are exposed as readings—both read-only |
| Missing **RawTemp** in script expected | **RawTemp** is **not** script-accessible; use **`Temp`** or native UI |
| Dashboard too busy | **showTemperature**, **showSpecificGravity**, **showValue** toggles |
| Hard to read | **tempColor**/**tempBg**, **sgColor**/**sgBg**, plus **headerColor**/**image** contrast |
| History gaps | **EnableHistoricalLogging**, **LoggingIntervalSeconds**, **MaxSilenceSeconds** |
