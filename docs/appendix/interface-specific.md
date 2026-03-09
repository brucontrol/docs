---
id: interface-specific
title: Interface-Specific
sidebar_position: 5
---

# Interface-Specific Considerations

This page covers per-board notes, Wi-Fi module firmware, SPI sensors, and other interface-specific details.

## WINC1500 Wi-Fi Considerations

Wi-Fi shields and boards using the Atmel WINC1500 module have specific requirements.

### Firmware Version

The WINC1500 module has its own firmware, separate from the BruControl interface firmware. Boards often ship with an outdated version. BruControl interface firmware is compatible with WINC1500 firmware versions **19.5.2**, **19.5.4**, or **19.6.1**.

If the shield was purchased via BruControl, the firmware is typically updated before shipment. If purchased from a reseller, it may need updating.

### Updating WINC1500 Firmware

1. **Note:** As of this writing, Arduino MEGA and Arduino UNO may not successfully connect for WINC1500 updates. An interface such as Adafruit Metro M4 may be required.
2. Download the [Arduino IDE](https://www.arduino.cc/en/Main/Software) (ZIP for portable install).
3. Unzip and run `arduino.exe`.
4. Connect the interface (with shield attached) via USB.
5. Under **Tools**, select the appropriate board type and COM port.
6. Under **File → Examples → WiFi101**, select **Firmware Updater**.
7. Select **Sketch → Upload**.
8. After upload, select **Tools → WiFi101 Firmware Updater**.
9. Select the COM port and version, then **Update Firmware**.
10. Install the BruControl interface firmware per [Firmware Installation](../hardware/firmware-installation).

### Power Draw

WINC1500 modules draw approximately **200 mA at 5V**. When powered via an Arduino MEGA 2560's 5V regulator, almost half of its available power may be used. If powering other accessories (RTD amplifiers, sensors, relay boards) from the 5V pin, the limit may be exceeded. In that case, power those devices from an external 5V supply. Tie all power supply grounds together in a star pattern.

## SPI Sensor Considerations

### Port Pull-Up (Firmware 44N+)

In firmware versions prior to 44N, RTD (via SPI) capable ports were actively pulled up to high voltage on interface startup. This limited RTD ports to a fixed set. Starting in version 44N, ports are not pulled up, allowing any digital I/O port to be used as an RTD port.

### Pull-Up Resistors

Certain RTD amplifier boards contain built-in pull-up resistors to prevent communication until commanded. Ensure any SPI sensor either has on-board pull-up resistors or add them externally (10–47kΩ is typically adequate).

## iSpindel Hydrometer Considerations

Electronic hydrometers such as iSpindel connect via Bluetooth or Wi-Fi. Consult the device documentation and BruControl support for integration details. Tilt hydrometers integrate with ESP32 via Bluetooth.

## ESP32 Specific

### Access Point Mode (Wi-Fi Setup)

BruControl firmware (v45O+) includes an Access Point mode for Wi-Fi network setup.

- **Trigger:** Pull GPIO 5 to ground (via resistor strong enough to override internal pull-up) prior to power-up.
- **Duration:** 3 minutes, then reverts to normal operation.
- **Caution:** If an ESP32 board has GPIO 5 hardwired to ground, BruControl cannot communicate for the first 3 minutes after power-up.

**Setup steps:**

1. Power on with GPIO 5 grounded.
2. Connect a Wi-Fi device to the access point "BruControl_######" (password: "BruControl").
3. Open a browser at http://192.168.10.1.
4. Enter SSID and password of your Wi-Fi network.
5. For static IP: enter IP, Gateway, Subnet in xxx.xxx.xxx.xxx notation.
6. For DHCP: leave IP, Gateway, Subnet blank.
7. Save and verify "Settings Saved" message.
8. Power off, remove the GPIO 5 ground connection, power on again.

### Serial (USB) Reset Loop

Serial (USB) connections to ESP32 may cause a miscommunication loop due to a power-on reset message from the ESP32 internal OS. To suppress it, **GPIO 15** may need to be tied to GND via a 47kΩ resistor. This workaround applies only to Serial (USB) connections, not Wi-Fi.

## Power-On Device Configurations

Interfaces can store the currently enabled Device Elements in non-volatile memory so they automatically start on power-on or reset, independent of BruControl.

:::warning Write Cycles
EEPROM and Flash have limited write cycles (~100,000 for EEPROM, ~10,000 for Flash). Use power-on configuration only occasionally to define startup state. Frequent storage will wear out the memory.
:::

- **Permanent memory interfaces** — Power-on config survives new firmware installs.
- **"Until New FW" interfaces** — Power-on config must be stored after each firmware upload.

To store: Use Interface Control Code `%5&10;` via the Termite terminal. To disable stored devices: disable all Device Elements, then store.

## Data Storage Considerations

BruControl supports multiple database backends. See the application Settings and documentation for:

- SQLite (default for new installations)
- PostgreSQL
- MongoDB
- MSSQL (LocalDB)

Database provider and connection strings are configured in `settings.yaml`. Data is not automatically migrated between database types.
