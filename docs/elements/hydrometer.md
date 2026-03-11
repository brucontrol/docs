---
id: hydrometer
title: Hydrometer
sidebar_position: 10
---

# Hydrometer

A **Hydrometer** element receives data from electronic hydrometers such as iSpindel and compatible devices. It reports **temperature** and **specific gravity** (SG) for fermentation monitoring.

## What It Is

Electronic hydrometers float in the fermenting liquid and transmit temperature and specific gravity via Wi-Fi or Bluetooth to a gateway that forwards data to BruControl. The element displays both values and supports calibrations for each channel.

## Hardware Connection

- **iSpindel and similar**: Configure the device to send data to a BruControl-compatible gateway or service. The interface receives the data over the network or through a bridge.
- **Color**: Each hydrometer can be assigned a color (Red, Green, Black, Purple, Orange, Blue, Yellow, Pink) to identify it when multiple devices are used.

:::tip
See the BruControl documentation and iSpindel setup guides for configuring the hydrometer to communicate with your system.
:::

## Port Type

**Hydrometer** — Uses a dedicated hydrometer port or network input on the interface.

## Native Properties

| Property | Type | Description |
|----------|------|-------------|
| **Temp** | number | Temperature (calibrated). Read-only. |
| **SG** | number | Specific gravity (calibrated). Read-only. |
| **RawTemp** | number | Raw temperature before calibration |
| **RawSG** | number | Raw specific gravity before calibration |
| **TempPrecision** | number | Decimal places for temperature |
| **SGPrecision** | number | Decimal places for SG |
| **TempPrefix** | string | Text before temperature |
| **TempSuffix** | string | Text after temperature |
| **SGPrefix** | string | Text before SG |
| **SGSuffix** | string | Text after SG |
| **Color** | number | Beacon color (1–8) |
| **Enabled** | boolean | Whether the device is active |
| **User Control** | boolean | Allow interaction (read-only) |
| **Refresh Multiple** | number | Refresh rate multiplier (1–60) |
| **Primary Display Channel** | 0 or 1 | 0 = Temp, 1 = SG |

## Custom Properties

From the default Hydrometer element template (`hydrometer`):

| Property | Type | Default | Group | Description |
|----------|------|---------|-------|--------------|
| showHeader | boolean | true | Layout | Show header bar |
| showBackground | boolean | true | Layout | Show element template background and border |
| showLabel | boolean | true | Layout | Show title label in header |
| hiddenRowKeys | array | — | Layout | Hide rows: "temperature", "specificgravity" |
| showValue | boolean | true | Layout | Show primary value rows |
| labelFontFamily | font-family | — | Label | Label font |
| labelFontSize | number | 12 | Label | Label font size (8–48) |
| labelFontWeight | text | "500" | Label | Label font weight |
| labelFontStyle | text | "normal" | Label | Label font style |
| labelColor | color | (theme) | Label | Label color |
| valueFontFamily | font-family | — | Value | Value font |
| valueFontSize | number | 14 | Value | Value font size (10–120) |
| valueFontWeight | text | "700" | Value | Value font weight |
| valueFontStyle | text | "normal" | Value | Value font style |
| valueColor | color | (theme) | Value | Value color |
| backgroundColor | color | (theme) | Background & Border | Element template background |
| headerColor | color | (theme) | Background & Border | Header background |
| borderColor | color | (theme) | Background & Border | Border color |
| rowLabelColor | color | (theme) | Rows | Row label color |
| rowValueColor | color | (theme) | Rows | Row value color |

## Calibrations

Hydrometer supports calibrations for both temperature and specific gravity. Use the **Calibration** tab to add transforms for each channel.

See [Calibrations Overview](./calibrations-overview.md) for details.

## Script Integration

### Read Temperature

```
new value fermTemp
fermTemp = "iSpindel 1" Temp
```

### Read Specific Gravity

```
new value sg
sg = "iSpindel 1" SG
```

### Common Patterns

```
// Check fermentation progress
if "iSpindel 1" SG <= 1.010
  print "Fermentation complete"
endif

// Temperature alert
if "iSpindel 1" Temp > 75
  print "Fermenter too warm!"
endif
```
