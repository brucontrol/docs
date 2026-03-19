---
id: troubleshooting-network
title: Troubleshooting Interface Network Connectivity
sidebar_position: 6
---

# Troubleshooting Interface Network Connectivity

This guide provides detailed diagnostic procedures for resolving network connectivity problems between BruControl and your microcontroller interfaces. It covers Ethernet, Wi-Fi, and common network configuration issues.

## Quick Checklist

Before diving into detailed diagnostics, verify these basics:

1. **IP address match** — Ensure the interface's IP matches the configuration in BruControl (check the interface under **Interfaces** in the Solution Explorer)
2. **Firewall** — Windows Firewall or antivirus may block the connection
3. **Ping test** — From Command Prompt, run `ping <interface-ip>` to verify the interface is reachable
4. **Same subnet** — Interface and PC must be on the same subnet (e.g. both in `192.168.1.x` with mask `255.255.255.0`)
5. **Interface Setup** — Re-run Interface Setup (see [Firmware Installation](../hardware/firmware-installation)) if settings were lost

## Step-by-Step Network Diagnostics

### Step 1: Verify PC Network Configuration

Open a command prompt and run:

```
ipconfig
```

Note your PC's IP address, subnet mask, and default gateway. For the interface and PC to communicate directly, they must share the same subnet.

**Example valid configuration:**

| Device | IP Address | Subnet Mask | Gateway |
|--------|-----------|-------------|---------|
| PC | 192.168.1.50 | 255.255.255.0 | 192.168.1.1 |
| Interface | 192.168.1.100 | 255.255.255.0 | 192.168.1.1 |

:::warning Subnet Mismatch
If the PC is on `192.168.1.x` and the interface is on `192.168.0.x`, they cannot communicate without a router. Reconfigure one to match the other's subnet.
:::

### Step 2: Ping the Interface

Close BruControl (it may hold the TCP port), then ping:

```
ping 192.168.1.100
```

**Interpreting results:**

| Result | Meaning | Action |
|--------|---------|--------|
| `Reply from 192.168.1.100` | Interface is reachable | Proceed to Step 4 |
| `Request timed out` | Interface is not responding | Check power, cables, IP config (Step 3) |
| `Destination host unreachable` | Network routing issue | Verify subnet match, check cables |

### Step 3: Verify Interface IP (via USB Debug)

If ping fails, connect the interface via USB and use the Termite terminal:

1. Open Termite (included with the firmware tools)
2. Select the correct COM port and baud rate (115200)
3. Send `%1&14;` to enable debug reporting level 1
4. The interface will print its IP address to the terminal
5. If the IP is `0.0.0.0` or `255.255.255.255`, the interface has no valid network configuration

**If IP is invalid:**

- For DHCP: ensure a DHCP server (router) is on the same network, and restart the interface
- For static IP: re-run network setup via `%0&15;` and reconfigure
- After fixing, send `%2&17;` to reduce debug level back to 0

### Step 4: Test TCP Communication

If ping succeeds but BruControl still cannot connect:

1. Close BruControl completely
2. Use a TCP test tool (e.g. Packet Sender, PuTTY in raw mode, or `telnet`)
3. Connect to the interface IP on port **5000** (default TCP port)
4. Send: `!13,4,50,1000;`
5. You should receive a response and pin 13 on the interface will flash briefly

If this works but BruControl doesn't connect, the issue is in BruControl's interface configuration (IP address or port mismatch).

### Step 5: Check for Port Conflicts

Ensure no other application is using the interface's TCP port:

```
netstat -ano | findstr :5000
```

If another process is using port 5000, close it or reconfigure the interface to use a different port.

### Step 6: ARP Table Verification

If you recently changed the interface's IP address, the PC may have a stale ARP cache entry:

```
arp -a
```

Look for the interface's MAC address mapped to the old IP. Clear the ARP cache:

```
arp -d *
```

Or simply **reboot the host computer** to clear all cached mappings.

## Wi-Fi Specific Troubleshooting

### WINC1500-Based Interfaces (MEGA with Wi-Fi shield, Feather M0)

1. **Signal strength** — Move the interface closer to the Wi-Fi router during initial testing
2. **SSID and password** — Re-run network setup to verify credentials (SSID is case-sensitive)
3. **Encryption** — BruControl firmware supports WPA and WPA2; WEP and open networks are not recommended
4. **WINC1500 firmware** — Ensure the module firmware is version 19.5.2, 19.5.4, or 19.6.1 (see [WINC1500 Wi-Fi Considerations](./winc1500-wifi))
5. **Channel congestion** — Use a Wi-Fi analyzer app to check for congested channels; switch your router to a less crowded channel

### ESP32 Built-in Wi-Fi

1. **Access Point mode** — If you can't determine the current IP, use AP mode (ground GPIO 5 before power-up) to reconfigure
2. **Connect to AP** — Join the "BruControl_######" network (password: "BruControl"), browse to `http://192.168.10.1`
3. **DHCP vs. static** — For DHCP, leave IP/Gateway/Subnet blank in the AP configuration page
4. **Reset loop** — If the ESP32 enters a serial reset loop, tie GPIO 15 to GND via a 47kΩ resistor (see [Interface-Specific](./interface-specific#serial-usb-reset-loop))

### General Wi-Fi Tips

- **Prefer 2.4 GHz** — Most microcontroller Wi-Fi modules only support 2.4 GHz, not 5 GHz
- **Reduce interference** — Keep the interface away from microwave ovens, Bluetooth devices, and other 2.4 GHz sources
- **Antenna orientation** — If the board has an external antenna connector, use an external antenna for better range
- **Static IP recommended** — DHCP IP changes can break the BruControl configuration; use DHCP reservations or static IPs for production

## Common Network Issues

### Interface Works on USB but Not Network

- Firmware is installed but network settings are not configured — re-run setup
- Ethernet shield is not properly seated on the interface board — reseat it
- Ethernet cable is faulty — try a different cable

### Intermittent Disconnections

- **Power supply** — An underpowered interface may drop network connections; ensure adequate power via VIN or a stable USB supply
- **Wi-Fi signal** — Weak signal causes dropped connections; consider Ethernet instead
- **DHCP lease expiry** — The router may reassign the IP; use DHCP reservations
- **Cable quality** — Replace ethernet cable; damaged cables cause intermittent issues

### Multiple Interfaces on Same Network

- Each interface must have a **unique IP address**
- Each interface must use the same TCP port (default 5000) unless reconfigured
- If using DHCP, consider reservations to prevent IP conflicts
- BruControl can manage multiple interfaces simultaneously — add each one in the Solution Explorer

:::tip Testing Order
When troubleshooting multiple interfaces, test one at a time. Disable all interfaces in BruControl, then enable and test each one individually.
:::

## Getting More Help

If these steps don't resolve the issue:

- Check the [general Troubleshooting guide](./troubleshooting) for additional steps
- Gather logs from the [Log Viewer](../appendix/troubleshooting#log-viewer) and contact [Technical Assistance](./technical-assistance)
- Visit the [BruControl Community Forums](https://brucontrol.com/community) for community support
