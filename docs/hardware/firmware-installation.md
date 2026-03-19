---
id: firmware-installation
title: Firmware Installation and Setup
sidebar_position: 5
---

# Interface Firmware Installation and Setup

Before a BruControl interface can communicate with the application, it must have the correct firmware installed. Firmware is the embedded software that runs on the microcontroller and handles all low-level I/O, sensor reading, and communication protocols. This page walks through downloading, installing, and configuring the firmware for any supported interface.

:::info Before You Begin
Ensure the hardware is fully assembled (shields, boards, screw terminals) and that the interface is appropriately powered before starting installation. You will also need a USB cable compatible with your board (typically USB-A to USB-B for MEGA, USB-A to micro-USB or USB-C for ESP32).
:::

## Installation Steps

### 1. Connect the Interface

Plug the interface microcontroller into the computer via USB. Use the USB port directly on the computer rather than a hub if possible — some hubs do not supply adequate power for firmware flashing.

### 2. Verify USB Connection

1. Open **Device Manager** (search "Device Manager" in the Windows Start menu)
2. Expand **Ports (COM & LPT)** and check that the board appears by name (e.g., "Arduino Mega 2560", "Silicon Labs CP210x", "CH340")
3. Note the **COM port number** assigned (e.g., COM3, COM4) — you will need this for the setup tool

:::tip Driver Installation
If the device appears as "Unknown Device" or is not listed:
1. Download USB drivers from [brucontrol.com/build/resources/](https://brucontrol.com/build/resources/) or the board manufacturer's website
2. Unzip the driver files into a temporary folder (use Windows Explorer's built-in Extract function)
3. Right-click the unknown device in Device Manager → **Update Driver**
4. Select **Browse my computer for drivers** and point to the unzipped folder
5. After installation, the board should appear under Ports with a COM number
:::

### 3. Download Firmware

1. Go to [brucontrol.com/download/firmware/](https://brucontrol.com/download/firmware/)
2. Download the **Interface Wiring Map** for your board — this tells you which firmware variant to use and which pins support which device types
3. Select the appropriate **Firmware** package for your board and connection method (Serial, Ethernet, or Wi-Fi)
4. Download the universal firmware package and unzip its contents into a dedicated folder

:::info Firmware Naming
Firmware files are named with a version code that encodes the board type, connection method, and optional features. For example, `44N` indicates version 44 with network support. Consult the wiring map for the correct variant.
:::

### 4. Run Interface Setup

1. Navigate to the folder where you unzipped the firmware files
2. Run the **"InterfaceSetup"** executable
3. Follow the on-screen prompts — the tool will detect your board and COM port

**Setup options:**

| Option | When to Use |
|--------|-------------|
| **Firmware Installation** | Required for all interfaces before they can communicate with BruControl |
| **Setup/Debug** | Required for Ethernet or Wi-Fi interfaces to configure network parameters |

After firmware installation completes, the interface will reset automatically. For USB/Serial-only interfaces, you are ready to [configure the interface in BruControl](./interface-setup). For network interfaces, continue to the network configuration section below.

## Network Configuration (Ethernet/Wi-Fi Only)

Interfaces using Ethernet or Wi-Fi connections require additional setup after firmware installation to configure their IP address and network parameters.

### Entering Setup Mode

1. Open the **"Termite"** serial terminal application (included in the firmware download or available separately)
2. Connect to the interface's COM port at the correct baud rate
3. Enter Interface Control Code: `%0&15;` (type this exactly, without quotes)
4. Setup mode must be initiated within **10 seconds** — a countdown timer indicates the window
5. If not initiated in time, the interface reverts to normal operation. Power cycle and try again.

:::info Network Settings Persistence
How network settings survive firmware updates depends on your board:
- **Permanent settings** — Persist through new firmware installations (boards with separate network config storage)
- **"Until New FW"** — Must be reconfigured after any new firmware installation or update
:::

### Default Network Parameters

Before running the Network Setup step, these are the factory defaults:

| Parameter | Default Value |
|-----------|---------------|
| IP Address | 192.168.1.100 |
| Gateway | 192.168.1.1 |
| Subnet | 255.255.255.0 |
| DHCP | No (static) |
| SSID (Wi-Fi) | default |
| Password (Wi-Fi) | default |

## Network Configuration Options

Choose either DHCP or Static IP based on your network setup.

### Option 1: DHCP (Recommended for Most Users)

DHCP lets your router assign an IP address automatically.

**Advantages:**
- No risk of duplicate IP addresses
- No need to know gateway or subnet details
- IP is typically visible in your router's DHCP client list

**Disadvantages:**
- Requires a DHCP server on the network
- IP may change if the interface is offline for an extended period, breaking the BruControl configuration

**Mitigation:** Use DHCP reservations in your router to always assign the same IP to your interface's MAC address. This gives you the simplicity of DHCP with the consistency of static addressing.

**Setup:** Select "Yes" when prompted for DHCP during setup. Note the assigned IP from your router's DHCP client list.

### Option 2: Static IP Address

Static IP means you manually specify the address.

**Advantages:**
- IP never changes — predictable and consistent
- No dependency on a DHCP server

**Disadvantages:**
- You must ensure the IP is not used by another device on the network
- Requires knowledge of gateway address and subnet mask

**Example Configuration:**

```
IP Address: 192.168.1.200  (outside your router's DHCP range)
Gateway:    192.168.1.1     (typically the router's address)
Subnet:     255.255.255.0   (standard for most home/small networks)
```

**Setup:** Select "No" when prompted for DHCP and enter the IP, gateway, and subnet when requested.

## Wi-Fi Specific Setup

During Wi-Fi setup, enter your wireless network credentials:

| Parameter | Value |
|-----------|-------|
| SSID | Your Wi-Fi network name (case-sensitive) |
| Password | Your Wi-Fi network password |

:::info Encryption Support
WPA and WPA2 encryption are supported. Open networks and WEP are not recommended for security reasons.
:::

:::tip ESP32 Alternative
ESP32 boards support an Access Point mode for Wi-Fi configuration that does not require a serial terminal. See [ESP32 Access Point Mode](../appendix/interface-specific#esp32-specific) for details.
:::

## Troubleshooting

### USB Not Detected

- Try a different USB cable (some cables are charge-only with no data lines)
- Try a different USB port directly on the computer (not through a hub)
- Install the correct USB driver for your board's chipset (CH340, CP2102, FTDI)
- On Windows, check Device Manager for "Unknown Device" entries with a yellow warning icon

### Firmware Upload Fails

- Ensure no other application (Arduino IDE, serial terminal) has the COM port open
- Verify the correct COM port is selected in InterfaceSetup
- Try pressing the reset button on the board immediately before starting the upload
- Some boards require holding a BOOT button during initial connection

### Network Connectivity Issues

Debug network connectivity using the interface's debug control code. See [Troubleshooting Interface Network Connectivity](../appendix/troubleshooting-network) for detailed diagnostic steps.

:::warning MAC Address Cache
Anytime an IP address is changed, the host computer's network card may cache the old MAC-to-IP mapping, preventing communication. **Rebooting the host computer resolves this.** Alternatively, flush the ARP cache: `arp -d *` (Windows, run as Administrator).
:::

### Switching from Static to DHCP

When switching from static IP to DHCP mode, the interface should be reset (power cycled) after the network configuration is completed so it can request a new IP from the DHCP server.

### DHCP First-Time Setup

When DHCP is enabled for the first time, the interface must be reset (restarted) after the settings are first saved. The DHCP lease request only occurs during the boot sequence.

## Verification

After installation and setup, verify that everything is working:

1. **For USB (Serial) interfaces:**
   - Confirm the interface appears in Device Manager under Ports
   - Note the COM port number for BruControl [interface setup](./interface-setup)

2. **For Network interfaces:**
   - Verify the interface responds to a ping at its assigned IP address
   - Check your router's client list or ARP table to confirm the MAC address is registered
   - Note the IP address for BruControl [interface setup](./interface-setup)

:::tip Quick Verification
Once you configure the interface in BruControl, the interface status indicator in the Solution Explorer will show a green connected state if communication is working correctly.
:::

## Next Steps

- [Interface Setup in BruControl](./interface-setup) — Configure the interface connection in the BruControl application
- [Interface Wiring Maps](./wiring-maps) — Pin assignments for your board and firmware variant
- [Interface-Specific Considerations](../appendix/interface-specific) — WINC1500 firmware, ESP32 AP mode, SPI pull-ups
- [Troubleshooting Network](../appendix/troubleshooting-network) — Detailed network diagnostic procedures
