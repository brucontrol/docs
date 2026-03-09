---
id: troubleshooting
title: Troubleshooting
sidebar_position: 2
---

# Troubleshooting

This guide covers common issues and solutions when using BruControl.

## Interface Not Found

If BruControl cannot communicate with an interface (shown as disconnected in the **Interfaces** folder in the Solution Explorer), try the following steps.

### 1. Verify Network Access

Ensure the computer hosting BruControl has functional access to the network. Open Command Prompt and run `ipconfig` to verify status and IP address.

### 2. Check License

- Open **Settings** → **License** to check if the license is active
- Ensure the license is **Advanced** or **Professional** — Basic does not support network interfaces

### 3. Power Down and Isolate

1. Close BruControl and ensure it is fully shut down
2. Power down the interface and disconnect all devices wired to it
3. Incorrectly wired devices can induce voltage, current, or noise that prevents communication
4. Once the interface communicates consistently, re-add devices one at a time

### 4. Verify Power and Wiring

Ensure power wiring is correct per the specific interface. Power up the interface and verify it is operational.

### 5. Ethernet Checklist

- Plug the RJ-45 cable in (standard, not crossover)
- Ensure the other end is in a compatible router or switch on the active network
- Check for orange and green blinking lights on the interface's Ethernet port — indicates network traffic

### 6. Verify Interface IP Address

The interface must be correctly set up on the network and reporting an IP address.

**If accessible via USB:**

- Connect the interface via USB to the BruControl host computer
- Use the Setup/Debug function of the Interface Firmware Tool
- Enter Debug Reporting level 1 (see [Interface Control Codes](#interface-control-codes))
- If the IP is incorrect (e.g. 0.0.0.0 or 255.255.255.255), reset the interface and re-enter debug
- If static IP is not working, try DHCP and check if the router assigns an IP

**If using Wi-Fi (ESP32):**

- Force the interface into Access Point mode (e.g. ground GPIO 5 prior to power-up)
- Connect to the "BruControl_######" Wi-Fi network (password: "BruControl")
- Open a browser at http://192.168.10.1 to configure Wi-Fi settings
- Complete within 3 minutes of power-up

### 7. Ping the Interface

With BruControl closed, open Command Prompt and run:

```
ping 192.168.1.100
```

Replace with your interface's IP address. Successful replies indicate connectivity. Timeouts indicate a network or configuration problem.

### 8. Verify BruControl Interface Configuration

Open BruControl and ensure the interface (under **Interfaces** in the Solution Explorer) is configured with the correct connection details. For network interfaces, the IP address and port must match what the interface reports. Check the interface's edit/diagnostics for connection settings.

### 9. Test TCP Communication

1. Close BruControl
2. Download and run a TCP packet tool (e.g. Packet Sender)
3. Send a TCP packet to the interface's IP address on port 5000
4. ASCII contents: `!13,4,50,1000;` (without quotes)
5. The tool should report the packet was sent and a response received
6. This packet causes pin 13 to flash — some interfaces have an LED on this pin

## Firmware Upload

### Interface Not Recognized

- **Device Manager:** Check under COM Ports that the board is identified by name
- **Drivers:** Download USB drivers from [brucontrol.com/build/resources/](https://brucontrol.com/build/resources/) or the manufacturer's website
- **Install:** Right-click the device in Device Manager → Update Driver → Browse → select the driver folder

### Upload Fails

- Ensure no other application is using the COM port (close serial monitors, other tools)
- Try a different USB cable (some cables are power-only)
- Try a different USB port
- For network interfaces: firmware must be installed via USB first; network setup comes after

## Common Errors

### Duplicate IP Address

If using a static IP, ensure:

- The address is not duplicated elsewhere on the network
- The address is outside the DHCP assignment scope (or use DHCP reservations)

### MAC Address Cache

When an IP address is changed, the host computer's network card may cache the old mapping. **Rebooting the host computer** resolves this.

### Debug Mode Conflict

BruControl cannot communicate with an interface via serial (USB) when debug reporting is enabled. Disable debug (Level 0) before connecting BruControl.

## Log Viewer

The Log Viewer (route: `/logs`) provides search and filter capabilities for application logs. Use it to:

- Diagnose connection failures
- Trace script execution
- Identify configuration errors
- Gather information for technical support

Log files are stored in the BruControl data directory (e.g. `Documents\BruControl\Logs`). When contacting support, include relevant log excerpts or attach log files.

## Interface Control Codes

Special control codes can be sent to interfaces via the Termite terminal (included in the firmware installation) when connected via serial (USB):

| Code | Purpose |
|------|---------|
| `%0&15;` | Enter Network Setup |
| `%1&14;` | Increase debug reporting level |
| `%2&17;` | Decrease debug reporting level |
| `%3&16;` | Re-initialize 1-wire sensor network |
| `%4&11;` | Initialize LCD display |
| `%5&10;` | Store power-on device configuration |
| `%6&13;` | Restore power-on device configuration (debug only) |
| `%7&12;` | Report installed firmware version |

Debug levels: 0 = none (default), 1 = basic, 2 = detailed. Set to 0 before using BruControl.
