---
id: interface-specific
title: Interface-Specific
sidebar_position: 5
---

# Interface-Specific Considerations

Different interface boards and peripherals have unique requirements that go beyond standard firmware installation and wiring. This page collects per-board notes, Wi-Fi module firmware, SPI sensor details, hydrometer integration, ESP32-specific behavior, power-on device configurations, and data storage options — all in one reference.

## WINC1500 Wi-Fi Considerations

Wi-Fi shields and boards using the Atmel WINC1500 module (commonly paired with Arduino MEGA) have their own firmware that is separate from the BruControl interface firmware and may need updating.

### Firmware Version

The WINC1500 module ships with its own firmware version, and boards from resellers often have outdated versions. BruControl interface firmware is compatible with WINC1500 firmware versions **19.5.2**, **19.5.4**, or **19.6.1**.

If the shield was purchased via BruControl, the firmware is typically updated before shipment. If purchased from a reseller or a different source, you may need to update it yourself.

### Updating WINC1500 Firmware

:::info Board Compatibility
As of this writing, Arduino MEGA and Arduino UNO may not successfully serve as the host board for WINC1500 firmware updates. An Adafruit Metro M4 or similar SAMD-based board may be required as the update host.
:::

**Steps:**

1. Download the [Arduino IDE](https://www.arduino.cc/en/Main/Software) (ZIP version for portable install is fine).
2. Unzip and run `arduino.exe`.
3. Connect the interface board (with WINC1500 shield attached) via USB.
4. Under **Tools**, select the appropriate board type and COM port.
5. Under **File → Examples → WiFi101**, select **FirmwareUpdater**.
6. Upload the sketch via **Sketch → Upload**.
7. After upload completes, select **Tools → WiFi101 / WiFiNINA Firmware Updater**.
8. Select the COM port and the target firmware version, then click **Update Firmware**.
9. Once the update succeeds, install the BruControl interface firmware per [Firmware Installation](../hardware/firmware-installation).

### Power Draw

WINC1500 modules draw approximately **200 mA at 5V**. When powered through an Arduino MEGA 2560's onboard 5V regulator, this consumes roughly half of the regulator's available current capacity. If you are also powering other accessories (RTD amplifier boards, sensors, relay modules) from the 5V pin, you may exceed the regulator's limit.

:::warning Power Budget
If your total 5V current draw exceeds the regulator capacity (~450 mA for a MEGA 2560), power additional accessories from a separate external 5V supply. Tie all power supply grounds together in a star pattern at a common ground point to prevent ground loops.
:::

## SPI Sensor Considerations

### Port Pull-Up Behavior (Firmware 44N+)

In firmware versions prior to 44N, RTD-capable (SPI) ports were actively pulled high on interface startup. This restricted RTD sensors to a fixed set of designated pins. Starting with firmware version **44N**, ports are **not** pulled up at startup, allowing any digital I/O port to be used as an RTD chip-select pin.

### Pull-Up Resistors

Certain RTD amplifier boards (e.g., Adafruit MAX31865) contain built-in pull-up resistors on the chip-select line to prevent unintended communication until the interface firmware takes control. If your amplifier board does **not** have built-in pull-ups, add external pull-up resistors (10–47 kΩ is typically adequate) between the chip-select pin and VCC to keep the line high during startup.

:::tip Verify Your Board
Check the schematic or documentation of your RTD amplifier board to determine whether pull-up resistors are already present. Adding duplicate pull-ups will not cause harm but is unnecessary.
:::

## iSpindel Hydrometer Considerations

Electronic hydrometers such as iSpindel and Tilt connect to BruControl via Bluetooth (ESP32 only) or Wi-Fi. These devices appear as virtual hydrometer ports (220–224) rather than physical pins.

- **iSpindel** — Connects via Wi-Fi; configure the iSpindel to send data to the BruControl interface IP address.
- **Tilt Hydrometer** — Connects via Bluetooth; requires an ESP32-based interface. Supported colors: Red, Green, Black, Purple, Orange, Blue, Yellow, Pink.

Consult the device manufacturer's documentation for pairing instructions. BruControl's hydrometer device element will display specific gravity, temperature, battery level, and tilt angle once connected.

:::info ESP32 Required for Bluetooth
Bluetooth hydrometer support (Tilt) is only available on ESP32-based interfaces. Arduino MEGA and UNO do not support Bluetooth hydrometers.
:::

## ESP32 Specific

### Access Point Mode (Wi-Fi Setup)

BruControl firmware **v45O+** for ESP32 includes an Access Point (AP) mode that provides a browser-based Wi-Fi configuration interface, eliminating the need for a serial terminal.

**Triggering AP Mode:**
- Pull **GPIO 5** to ground (use a resistor strong enough to override the internal pull-up) **before** powering on the ESP32.
- AP mode lasts **3 minutes**, then the board reverts to normal operation.

:::warning GPIO 5 Caveat
If your ESP32 board has GPIO 5 hardwired to ground (some development boards do), the board will enter AP mode for 3 minutes after every power-on, delaying BruControl communication. Verify your board's GPIO 5 wiring before deploying.
:::

**Configuration steps:**

1. Power on the ESP32 with GPIO 5 grounded.
2. On a phone or laptop, connect to the Wi-Fi network named **"BruControl_######"** (password: `BruControl`).
3. Open a browser and navigate to **http://192.168.10.1**.
4. Enter your Wi-Fi network's **SSID** and **password**.
5. For **static IP**: enter IP, Gateway, and Subnet in `xxx.xxx.xxx.xxx` notation.
6. For **DHCP**: leave the IP, Gateway, and Subnet fields blank.
7. Click **Save** and verify the "Settings Saved" confirmation message.
8. Power off the ESP32, remove the GPIO 5 ground connection, and power on again.

The ESP32 will now connect to your Wi-Fi network on boot using the saved credentials.

### Serial (USB) Reset Loop

When using a Serial (USB) connection to an ESP32, the board may enter a miscommunication loop caused by a power-on reset message from the ESP32's internal OS (boot ROM output on UART0). To suppress this behavior, tie **GPIO 15** to GND via a **47 kΩ resistor**. This silences the boot ROM output and allows clean serial communication.

:::info Wi-Fi Not Affected
This workaround applies only to Serial (USB) connections. Wi-Fi connections are not affected by the ESP32 boot ROM output.
:::

## Power-On Device Configurations

Interfaces can store the currently enabled Device Elements in non-volatile memory (EEPROM or Flash). On power-up or reset, the interface automatically starts those device elements **independent of BruControl** — useful for fail-safe configurations where the interface must begin operating even if the BruControl host computer has not yet started.

:::warning Write Cycle Limits
EEPROM has approximately **100,000** write cycles; Flash has approximately **10,000** write cycles. Use power-on configuration storage only occasionally to define the startup state. Do not write on every configuration change — doing so will wear out the memory.
:::

**Memory persistence varies by board:**
- **Permanent memory interfaces** — Power-on config survives new firmware installations.
- **"Until New FW" interfaces** — Power-on config must be stored again after each firmware upload.

**To store the current configuration:** Use Interface Control Code `%5&10;` via the Termite serial terminal.

**To clear stored devices:** Disable all Device Elements in BruControl, then store the (now-empty) configuration with the same control code.

## Data Storage Considerations

BruControl supports multiple database backends for storing historical data, configurations, and logs. The database provider is configured in `settings.yaml`.

| Backend | Notes |
|---------|-------|
| **SQLite** | Default for new installations. Zero configuration — data stored in a local file. Good for single-user and small systems. |
| **PostgreSQL** | Recommended for multi-user, larger deployments, or Docker-based setups. Requires a separate PostgreSQL server. |
| **MongoDB** | Alternative NoSQL backend. Requires a separate MongoDB server. |

:::warning No Auto-Migration
Data is **not** automatically migrated between database types. If you switch backends, you start with a fresh database. Export any data you need before switching.
:::

## Next Steps

- [Interface Overview](./interface-overview) — Supported interfaces, I/O capabilities, and specifications
- [Troubleshooting](./troubleshooting) — General troubleshooting procedures
- [Troubleshooting Network](./troubleshooting-network) — Network-specific diagnostic steps
- [Firmware Installation](../hardware/firmware-installation) — Install or update interface firmware
- [Wiring Maps](../hardware/wiring-maps) — Pin assignments for your board
