---
id: winc1500-wifi
title: WINC1500 Wi-Fi Considerations
sidebar_position: 5
---

# WINC1500 Wi-Fi Considerations

The Atmel WINC1500 is a Wi-Fi module used by several BruControl-compatible interfaces for wireless network connectivity. This page covers which interfaces use it, firmware requirements, update procedures, power considerations, and troubleshooting.

## Which Interfaces Use WINC1500?

| Interface | WINC1500 Configuration |
|-----------|----------------------|
| Arduino MEGA 2560 | External shield (e.g. Adafruit WINC1500 Wi-Fi Shield) |
| Adafruit Grand Central M4 | External shield |
| Adafruit Feather M0 WINC1500 | Built-in on the board |

**ESP32 and ESP8266 do NOT use WINC1500** — they have built-in Wi-Fi radios. Their Wi-Fi setup process differs; see [Interface-Specific Considerations](./interface-specific#esp32-specific).

## WINC1500 Module Firmware

The WINC1500 module has its own firmware, separate from the BruControl interface firmware. Boards often ship with an outdated version.

### Compatible Versions

BruControl interface firmware is compatible with WINC1500 firmware versions:

- **19.5.2**
- **19.5.4**
- **19.6.1**

If you purchased the shield via BruControl, the firmware is typically updated before shipment. If purchased from a reseller, it may need updating.

:::warning Version Mismatch
Running an incompatible WINC1500 firmware version can cause connection failures or unpredictable behavior. If your WINC1500 interface connects intermittently or fails to obtain an IP address, check the module firmware version.
:::

## Updating WINC1500 Firmware

:::info Arduino MEGA Limitation
As of this writing, Arduino MEGA and Arduino UNO may not successfully connect for WINC1500 firmware updates. You may need a different board (such as Adafruit Metro M4) as a temporary programmer.
:::

### Update Procedure

1. Download the [Arduino IDE](https://www.arduino.cc/en/Main/Software) (ZIP for portable install is recommended).
2. Unzip and run `arduino.exe`.
3. Connect the interface (with the WINC1500 shield attached) via USB.
4. Under **Tools**, select the appropriate board type and COM port.
5. Navigate to **File → Examples → WiFi101** and select **Firmware Updater**.
6. Upload the sketch: **Sketch → Upload**.
7. After the upload completes, go to **Tools → WiFi101 Firmware Updater**.
8. Select the COM port and choose the target firmware version (19.5.2, 19.5.4, or 19.6.1).
9. Click **Update Firmware** and wait for confirmation.
10. After the WINC1500 firmware is updated, install the BruControl interface firmware per [Firmware Installation](../hardware/firmware-installation).

### Verifying the Update

After updating, you can verify the WINC1500 firmware version by:

1. Connecting via USB and opening the Termite terminal
2. Sending the debug control code `%1&14;` to enable debug reporting
3. The firmware version will be printed during the startup sequence
4. Send `%2&17;` to disable debug reporting when done

## Power Considerations

The WINC1500 module draws approximately **200 mA at 5V** during active Wi-Fi communication.

### Arduino MEGA with WINC1500 Shield

The Arduino MEGA 2560's onboard 5V regulator can supply approximately 450 mA total. With the WINC1500 consuming ~200 mA, nearly half the available current is used by Wi-Fi alone.

**If you are also powering these from the 5V pin:**

- RTD amplifier boards (e.g. MAX31865) — ~10 mA each
- Sensor boards, relay boards, or other shields

You may exceed the regulator's capacity, causing instability, random resets, or communication failures.

:::tip External Power Supply
If the total current draw exceeds ~400 mA from the 5V rail, power accessory boards from a separate external 5V power supply. **Tie all power supply grounds together** in a star pattern to maintain a common reference voltage.
:::

### Feather M0 WINC1500

The Feather M0 has the WINC1500 built in, so its power budget already accounts for Wi-Fi. However, the USB port provides limited current (~500 mA). For production use, power via a LiPo battery or external regulated supply.

## Wi-Fi Network Setup

Wi-Fi network settings (SSID, password, IP configuration) are configured during the firmware setup process:

1. Install BruControl interface firmware via USB
2. Enter setup mode by sending `%0&15;` via the Termite terminal within 10 seconds
3. Follow the prompts to enter SSID, password, and IP settings
4. For detailed steps, see [Firmware Installation — Network Configuration](../hardware/firmware-installation#network-configuration-ethernetwi-fi-only)

### Network Settings Persistence

| Interface | Settings Persist Through FW Update? |
|-----------|-------------------------------------|
| Arduino MEGA + WINC1500 shield | **Yes** (permanent) |
| Adafruit Grand Central M4 + WINC1500 shield | **No** (must reconfigure after firmware update) |
| Adafruit Feather M0 WINC1500 | **No** (must reconfigure after firmware update) |

Power cycling does not affect network settings in any case.

## Troubleshooting WINC1500 Wi-Fi

### Cannot Connect to Wi-Fi Network

1. **Verify SSID and password** — Re-run setup to re-enter credentials; SSID is case-sensitive
2. **Check encryption** — WPA and WPA2 are supported; WEP is not recommended
3. **2.4 GHz only** — WINC1500 does not support 5 GHz networks
4. **Signal strength** — Move the interface closer to the router for initial testing

### Intermittent Disconnections

1. **Power supply** — See [Power Considerations](#power-considerations) above; insufficient power is the most common cause
2. **Channel congestion** — Use a Wi-Fi analyzer to check for crowded channels; switch your router to a less busy channel
3. **Distance and obstacles** — Walls, metal enclosures, and other obstructions reduce signal strength
4. **Firmware version** — Ensure WINC1500 firmware is one of the compatible versions listed above

### IP Address Issues

- **0.0.0.0** — DHCP failed to assign an address; check that the DHCP server (router) is reachable
- **255.255.255.255** — Network settings not configured; run firmware setup
- **Duplicate IP** — If using static IP, ensure no other device on the network has the same address

For more network troubleshooting steps, see [Troubleshooting Network Connectivity](./troubleshooting-network).

## Cross-References

- [Interface Overview](./interface-overview) — Full interface specifications
- [Interface-Specific Considerations](./interface-specific) — WINC1500 section and other per-board notes
- [Firmware Installation](../hardware/firmware-installation) — Firmware install and network setup
- [Troubleshooting](./troubleshooting) — General troubleshooting guide
