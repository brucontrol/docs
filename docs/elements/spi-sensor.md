---
id: spi-sensor
title: SPI Sensor
sidebar_position: 9
---

# SPI Sensor

An **SPI Sensor** element reads data from SPI-connected devices, such as RTD (resistance temperature device) boards, specialized ADC boards, or other SPI peripherals.

## What It Is

SPI (Serial Peripheral Interface) is a high-speed serial bus. SPI sensors are typically daughter boards or modules connected to the interface's SPI pins (MOSI, MISO, SCK, CS). The element reads a numeric value from the device.

## Hardware Connection

Connect the SPI sensor board to the interface:

- **SPI pins**: MOSI, MISO, SCK, and one or more chip-select (CS) per device
- **Power**: Follow the sensor board's datasheet for VCC and GND

:::tip
SPI wiring is board-specific. See the wiring map and interface documentation for your RTD or SPI sensor board. Some interfaces use a dedicated SPI bus for sensors.
:::

## Port Type

**SPISensor** — Use a port designated for SPI Sensor on your interface wiring map.

## Native Properties

| Property | Type | Description |
|----------|------|-------------|
| **Value** | number | Current value (calibrated). Read-only. |
| **RawValue** | number | Raw value before calibration. Read-only. |
| **Precision** | number | Decimal places for display. Read-only (configured in Calibration tab). |
| **Prefix** | string | Text before value. Read-only (configured in Calibration tab). |
| **Suffix** | string | Text after value. Read-only (configured in Calibration tab). |
| **Enabled** | boolean | Whether the device is active |
| **User Control** | boolean | Allow user interaction with the widget |
| **Refresh Multiple** | number | Refresh rate multiplier (1–60) |
| **PollRate** | number | Poll rate in ms (250–25000). Read/write. |
| **AvgWeight** | number | Averaging weight (1–100). Read/write. |

## Custom Properties

From the default SPI Sensor widget template (`spi-sensor`):

| Property | Type | Default | Group | Description |
|----------|------|---------|-------|--------------|
| showHeader | boolean | true | Layout | Show header bar |
| showBackground | boolean | true | Layout | Show widget background and border |
| showLabel | boolean | true | Layout | Show title label in header |
| hiddenRowKeys | array | — | Layout | Hide rows: "value" |
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
| backgroundColor | color | (theme) | Background & Border | Widget background |
| headerColor | color | (theme) | Background & Border | Header background |
| borderColor | color | (theme) | Background & Border | Border color |
| rowLabelColor | color | (theme) | Rows | Row label color |
| rowValueColor | color | (theme) | Rows | Row value color |

## Calibrations

SPI Sensor supports calibrations. Use the **Calibration** tab to add transforms:

- **RTD** — Resistance temperature device (PT100/RTD)
- **Multiplier** / **Divider** — Scale raw value
- **Offset** — Add or subtract
- **FahrenheitToCelsius** / **CelsiusToFahrenheit** — Unit conversion
- **Floor** / **Ceiling** — Clamp range

See [Calibrations Overview](./calibrations-overview.md) for details.

## Script Integration

### Read Value

```
new value temp
temp = "RTD Probe" Value
```

### Wait for Condition

```
wait "RTD Probe" Value >= 150 30000
```

### Common Patterns

```
// Temperature monitoring
if "Vessel Temp" Value > 180
  print "Over temperature!"
endif
```
