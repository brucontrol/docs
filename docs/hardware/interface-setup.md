---
id: interface-setup
title: Interface Setup in BruControl
sidebar_position: 6
---

# Interface Setup in BruControl

After installing firmware on your interface, add it to BruControl:

1. In the **Solution Explorer**, locate the **Interfaces** folder
2. **Right-click** Interfaces → **New Interface**
3. In the dialog:
   - Enter a **Name**
   - Select **Device Type** (e.g., Arduino MEGA, ESP32)
   - Select **Connection Type** (Network TCP for Ethernet/Wi‑Fi, Serial Port for USB)
   - Select **Wiring Map** for your firmware/connection
4. Click **Create Interface**

The interface appears under Interfaces. Select it in the tree to configure connection details (IP address and port for Network TCP, or COM port for Serial) and enable it.

See [Quick Start](../quick-start) for the full setup flow, and [Firmware Installation](./firmware-installation) for firmware installation steps.
