---
id: interface-setup
title: Interface Setup in BruControl
sidebar_position: 6
---

# Interface Setup in BruControl

After installing firmware on your interface, you need to add and configure it in BruControl so the application can communicate with it. This page walks through the full setup process.

## Prerequisites

Before configuring an interface in BruControl, ensure:

- The interface firmware is installed (see [Firmware Installation](./firmware-installation))
- For network interfaces: the interface has a known IP address (DHCP or static)
- For serial interfaces: the interface is connected via USB and the COM port is identified in Device Manager
- BruControl is running and you can access the web UI at `http://localhost:5005`

## Adding a New Interface

1. In the **Solution Explorer** (left panel), locate the **Interfaces** folder.
2. **Right-click** Interfaces → **New Interface**.
3. In the dialog, configure:
   - **Name** — A friendly name for this interface (e.g. "Brew Panel MEGA", "Fermenter ESP32")
   - **Device Type** — Select the board type (e.g. Arduino MEGA, ESP32, Adafruit Feather M0). This determines the wiring map options available.
   - **Connection Type** — Choose how BruControl will communicate with the interface:
     - **Network TCP** — For Ethernet or Wi-Fi connected interfaces
     - **Serial Port** — For USB-connected interfaces
   - **Wiring Map** — Select the wiring map that matches the firmware installed on the interface. The wiring map determines which pins support which device types.
4. Click **Create Interface**.

The interface now appears under the **Interfaces** folder in the Solution Explorer.

## Configuring Connection Details

After creating the interface, select it in the Solution Explorer tree to open its settings panel.

### Network TCP Configuration

| Setting | Description | Example |
|---------|-------------|---------|
| **IP Address** | The IP address of the interface on your network | `192.168.1.100` |
| **Port** | The TCP port the interface listens on (default: `5000`) | `5000` |

:::tip Finding the IP Address
If using DHCP, check your router's client list for the interface's assigned IP. If using static IP, use the address you configured during [firmware setup](./firmware-installation#network-configuration-ethernetwi-fi-only). You can also connect via USB and use the debug control code to query the IP.
:::

### Serial Port Configuration

| Setting | Description | Example |
|---------|-------------|---------|
| **COM Port** | The serial port assigned by Windows Device Manager | `COM3` |
| **Baud Rate** | Communication speed (default: `115200`) | `115200` |

:::info Identifying the COM Port
Open **Device Manager** → **Ports (COM & LPT)** to find the COM port assigned to your interface. If you don't see it, install the USB drivers (see [Firmware Installation](./firmware-installation)).
:::

## Enabling the Interface

After configuring connection details, **enable** the interface using the toggle in the settings panel. When enabled, BruControl attempts to establish communication with the interface.

### Connection Status Indicators

| Indicator | Meaning |
|-----------|---------|
| **Green** | Connected — BruControl is communicating with the interface |
| **Red / Disconnected** | Not connected — check configuration, power, and network |
| **Mock** | Mock mode is active — communicating with the software simulator |

## Disabling an Interface

To temporarily stop communication without removing the interface, disable it using the toggle in the settings panel. The interface configuration is preserved.

## Troubleshooting Connection Issues

If the interface shows as disconnected after enabling:

1. **Verify the interface is powered** — Check for power LEDs on the board
2. **Check connection settings** — Ensure IP/port (TCP) or COM port (serial) match the interface's actual configuration
3. **Ping the interface** (TCP only) — Open a command prompt and run `ping <ip-address>` to verify network connectivity
4. **Check for port conflicts** — Ensure no other application is using the same COM port or TCP port
5. **Restart the interface** — Power-cycle the microcontroller board
6. **Try refreshing** — Use the device context menu or [Device API](../api/device-api) `POST /api/v1/device/{id}/refresh` to reinitialize the connection
7. **Check logs** — Use the Log Viewer (route: `/logs`) to look for connection errors

:::warning Firewall
Windows Firewall or security software may block BruControl's network connections. Ensure the BruControl port (default 5005) and the interface TCP port (default 5000) are allowed through the firewall.
:::

For more detailed troubleshooting, see:

- [Troubleshooting](../appendix/troubleshooting) — Common issues and solutions
- [Troubleshooting Network Connectivity](../appendix/troubleshooting-network) — Network-specific diagnostics

## Next Steps

- [Quick Start](../quick-start) — Full setup flow from start to finish
- [Device Types](./device-types) — Understand supported device types
- [Firmware Installation](./firmware-installation) — Firmware installation and network setup
