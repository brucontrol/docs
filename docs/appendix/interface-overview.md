---
id: interface-overview
title: Interface Overview
sidebar_position: 4
---

# Interface Overview

This appendix provides specifications and considerations for BruControl-supported interfaces. See [Hardware Overview](../hardware/overview) for general interface considerations.

## Supported Interfaces

| Interface | USB Port Type | Ethernet | Wi-Fi | Network Settings Saved |
|-----------|---------------|----------|-------|------------------------|
| Arduino MEGA (2560) | Type B | W5100 or W5500 based | WINC1500 based | Permanent |
| ESP32 (e.g. Dev Board) | Micro | N/A | Built-in | Permanent |
| Adafruit Grand Central M4 | Micro | W5500 based | WINC1500 based | Until New FW |
| Adafruit Feather M0 | Micro | W5500 based | WINC1500 based | Until New FW |
| ESP8266 (e.g. NodeMCU 1.0) | Micro | N/A | Built-in | Permanent |

:::info Network Settings
- **Permanent** — Settings persist through firmware install/update
- **Until New FW** — Settings must be re-entered after each firmware install/update
- Power cycling does not affect network settings in either case
:::

## Interface Specifications

### Power and Voltage

| Interface | Power Supply (DC) | I/O Voltage | Notes |
|-----------|------------------|-------------|-------|
| Arduino MEGA (2560) | 6–12V / VIN | 5V | Readily available. Beware modified designs. |
| ESP32 (e.g. Dev Board) | 5V / VIN | 3.3V | Ancillary hardware must be 3.3V compliant. Use voltage dividers or level shifters. |
| Adafruit Grand Central M4 | 6–12V / VIN | 3.3V | Same as ESP32. |
| Adafruit Feather M0 | 5V / USB | 3.3V | Same as ESP32. |
| ESP8266 (e.g. NodeMCU 1.0) | 5–12V / VIN | 3.3V | Same as ESP32. |

### I/O Capabilities

| Interface | Max Digital I/O | Max PWM Outputs | Max Analog Inputs | Analog Divisions | Max 1-Wire Temp | Max Counters |
|-----------|-----------------|-----------------|------------------|------------------|-----------------|--------------|
| Arduino MEGA (2560) | 43 / 46 | 12 / 15 | 16 / 16 | 1024 | 10 | 4 |
| ESP32 (e.g. Dev Board) | 22 / 22 | 14 / 14 | 6 / 6 | 4096 | 10 | 8 |
| Adafruit Grand Central M4 | 43 / 46 | 12 / 15 | 16 / 16 | 4096 | 10 | 4 |
| Adafruit Feather M0 | 17 / 17 | 7 / 7 | 8 / 8 | 1024 | 10 | 4 |
| ESP8266 (e.g. NodeMCU 1.0) | 10 / 10 | 9 / 9 | 1 / 1 | 1024 | 10 | 4 |

*Values may vary by connection type (Serial vs Network).*

## Firmware Options

Firmware filenames use the format: `BruControl.{version}.{board}.{options}.hex`

### Options Codes

| Code | Communication Method |
|------|----------------------|
| **E** | Ethernet via W5100 or W5500 shield/board. Network settings configured during firmware setup (Termite). Add interface in BruControl via Solution Explorer → Interfaces → New Interface. |
| **W** | Wi-Fi via WINC1500 or native (ESP8266/ESP32). Network settings configured during firmware setup. Add interface in BruControl via Solution Explorer → Interfaces → New Interface. |
| **S** | Serial (USB) only, 115200 baud. No network settings. Optional baud rates use `_#` suffix (e.g. `S_230400`). |

## Recommended Interfaces

1. **Arduino MEGA (2560)**
   - Readily available, high I/O, 5V, 12V power capable, RTD support
   - Ethernet: WizNet 5500 (Ethernet 2) shield
   - Wi-Fi: Adafruit WINC1500 shield

2. **Adafruit Feather M0 WINC1500**
   - Small footprint, built-in Wi-Fi

3. **ESP32**
   - Reduced footprint, built-in Wi-Fi and Bluetooth
   - Bluetooth supports Tilt hydrometer integration

Order lists are available at [brucontrol.com/build/order-lists/](https://brucontrol.com/build/order-lists/) to help select hardware.

## Wiring Maps Reference

Each interface and firmware combination has a specific [Interface Wiring Map](../hardware/wiring-maps). Pin type codes:

| Code | Device Type |
|------|-------------|
| D | Digital Input/Output |
| P | PWM Output / Analog Output |
| A | Analog Input |
| C | Counter Input |
| R | RTD (SPI Sensor) |
| O | 1-Wire |
| H | Hydrometer (ESP32 only) |

## Next Steps

- [Interface-Specific Considerations](./interface-specific) — Per-board notes (WINC1500, SPI sensors, ESP32)
- [Firmware Installation](../hardware/firmware-installation) — Install and configure firmware
- [Troubleshooting](./troubleshooting) — Resolve connection and setup issues
