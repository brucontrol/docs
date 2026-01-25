---
id: firmware-installation
title: Firmware Installation and Setup
sidebar_position: 5
---

# Interface Firmware Installation and Setup

BruControl interface firmware can be downloaded from [brucontrol.com/download/firmware/](https://brucontrol.com/download/firmware/).

:::info Before You Begin
Ensure the hardware is fully assembled (shields, boards, etc.) and that the interface is appropriately powered before initiating installation and setup.
:::

## Installation Steps

### 1. Connect the Interface

Plug the interface microcontroller into the computer via USB.

### 2. Verify USB Connection

1. Open **Device Manager** (via Control Panel or Settings)
2. Under **COM Ports**, check that the board was properly identified by its name
3. Note the COM port number assigned to the interface (e.g., COM3, COM4)

:::tip Driver Installation
If the device is not properly identified:
1. Download the USB drivers from [brucontrol.com/build/resources/](https://brucontrol.com/build/resources/) or the interface manufacturer's website
2. Unzip the files into a temporary folder (using Windows Explorer extract function)
3. Right-click the device in Device Manager and select "Update Driver"
4. Use the browse/manual function and select the folder containing the unzipped USB drivers
:::

### 3. Download Firmware

1. Download the **Interface Wiring Map** for the interface being used
2. Select the appropriate **Firmware** for the hardware being used
3. Determine the resulting firmware version
4. Download the universal firmware and unzip its contents into a unique folder

### 4. Run Interface Setup

1. Navigate to the folder where the files were unzipped
2. Run the **"InterfaceSetup"** file
3. Follow the prompts as shown

:::info Setup Options
There are two options during setup:
- **Firmware Installation** - Required for all interfaces before communicating with BruControl
- **Setup/Debug** - Required for Ethernet or Wi-Fi interfaces
:::

## Network Configuration (Ethernet/Wi-Fi Only)

Interfaces using Ethernet or Wi-Fi connections require additional setup after firmware installation.

### Entering Setup Mode

1. Firmware must be installed before the Setup step will work
2. In the **"Termite"** terminal application, enter Interface Control Code: `%0&15;` (without quotes)
3. Setup must be initiated within **10 seconds** (marked by the countdown timer)
4. If not initiated in time, the interface will revert to normal operation
5. Follow the prompts to guide the setup

:::note Network Settings Persistence
Network settings are saved according to the interface type:
- **Permanent settings** - Persist through new firmware installations
- **"Until New FW"** - Must be reconfigured following any new firmware installation or update
:::

### Default Network Parameters

Before Network Setup step, these are the default values:

| Parameter | Default Value |
|-----------|---------------|
| IP Address | 192.168.1.100 |
| Gateway | 192.168.1.1 |
| Subnet | 255.255.255.0 |
| DHCP | No |
| SSID (WiFi) | default |
| Password (WiFi) | default |

## Network Configuration Options

Network parameters should be selected according to the preferred network topology.

### Option 1: DHCP (Recommended for Most Users)

**Dynamic Host Control Protocol** - IP address is automatically assigned by your router.

**Advantages:**
- Addresses will never be duplicated
- Assigned IP address will likely be reported by the DHCP server
- Can be identified without entering debug mode on the interface
- No need to know gateway address and subnet topology

**Disadvantages:**
- Network must have a DHCP server configured and enabled
- If interface is offline for a while, the server could assign a different IP address
- Can break IP address alignment between interface and BruControl application

**Solution:** Use IP address reservations in your DHCP server to ensure a particular IP address is always assigned to your interface (identified by its MAC address).

**Setup:**
- Simply select "Yes" when prompted for DHCP during setup
- Note the assigned IP address from your router's DHCP client list

### Option 2: Static IP Address

**Manual IP assignment** - You specify the exact IP address.

**Advantages:**
- IP address never changes
- Predictable and consistent

**Disadvantages:**
- User must ensure the IP address is not duplicated on the network
- DHCP server may assign the same IP to another device (causing conflicts)
- Static IP devices may not be identified by the network server
- If IP address is forgotten, must enter interface debug mode to discover it
- Requires knowledge of gateway address and subnet topology

**Example Configuration:**

```
IP Address: 192.168.1.200  (outside the DHCP range of 192.168.1.100 to 192.168.1.199)
Gateway:    192.168.1.1     (typically the same as the router)
Subnet:     255.255.255.0   (typically this for a private local network)
```

**Setup:**
- Select "No" when prompted for DHCP during setup
- Enter the static IP parameters when requested

## Wi-Fi Specific Setup

During Wi-Fi setup, the SSID and Password need to be entered:

| Parameter | Value |
|-----------|-------|
| SSID (Wi-Fi) | Your Wi-Fi access point ID (network name) |
| Password (Wi-Fi) | Your Wi-Fi access point password |

:::info Encryption Support
WPA and WPA2 encryption are supported.
:::

:::tip Alternative Wi-Fi Setup
See [WINC1500 Wi-Fi Considerations](../appendix/winc1500-wifi) for an alternative Wi-Fi setup for ESP-32 based interfaces.
:::

## Troubleshooting

### Network Connectivity Issues

Network connectivity issues should be debugged using the interface's debug control code.

See [Troubleshooting Interface Network Connectivity](../appendix/troubleshooting-network) for detailed instructions.

### IP Address Changes

:::warning MAC Address Cache
Anytime an IP address is changed, the host BruControl computer's network card may confuse the interface's MAC address with two IP addresses, hindering communication. **Rebooting the host computer will resolve this problem.**
:::

### Switching from Static to DHCP

When switching the interface from Static IP address mode to DHCP mode, the interface should be reset after the network configuration is completed.

### DHCP First-Time Setup

When DHCP is enabled for the first time, the interface must be reset (restarted) after the settings are first saved.

## Verification

After installation and setup:

1. **For USB interfaces:**
   - Interface should appear in Device Manager
   - Note the COM port number for BruControl configuration

2. **For Network interfaces:**
   - Verify the interface appears on your network
   - Note the IP address for BruControl configuration
   - Test connectivity by pinging the IP address

## Next Steps

- [Interface Setup in BruControl](./interface-setup) - Configure the interface in BruControl
- [Application Setup](../application/setup) - Complete BruControl installation
- [Troubleshooting](../appendix/troubleshooting-network) - If you encounter issues
