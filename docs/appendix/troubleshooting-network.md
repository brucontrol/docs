---
id: troubleshooting-network
title: Troubleshooting Interface Network Connectivity
sidebar_position: 6
---

# Troubleshooting Interface Network Connectivity

If your network-connected interface is not found by BruControl:

1. **Verify IP address (or hostname)** — Ensure the interface's IP matches the connection configuration for that interface in BruControl (check the interface under **Interfaces** in the Solution Explorer)
2. **Check firewall** — Windows Firewall or antivirus may block the connection
3. **Ping test** — From Command Prompt, run `ping <interface-ip>` to verify the interface is reachable
4. **Subnet** — Interface and PC must be on the same subnet
5. **Interface Setup** — Re-run Interface Setup (see [Firmware Installation](../hardware/firmware-installation)) if settings were lost

For general troubleshooting, see [Troubleshooting](./troubleshooting).
