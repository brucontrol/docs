---
id: overview
title: Mocking Overview
sidebar_position: 1
---

# Mocking Overview

**Mocking** lets you simulate a BruControl device without physical hardware. When mock mode is enabled, BruControl redirects communication to a software simulator instead of the real interface.

## What Mocking Is

- A **mock device** runs as a simulator that mimics the protocol and behavior of a real device.
- BruControl connects to it over TCP instead of the actual serial or network interface.
- You can read and write port values, inspect communication logs, and test scripts and dashboards as if hardware were connected.

## Why Use Mocking

| Use case | Benefit |
|----------|---------|
| **Development** | Build and test workspaces without hardware |
| **Testing** | Verify scripts, alarms, and automation logic |
| **Demos** | Show BruControl in action without physical setup |
| **Debugging** | Inspect port state and message traffic in real time |

## Professional License Required

Mock mode requires a **Professional** license. If you attempt to enable mock mode without one, BruControl will display: *"Mock device service requires a Professional license."*

## Related Topics

- [Mock Mode](mock-mode.md) — Enable/disable, TCP port, redirect behavior
- [Mock Page](mock-page.md) — Inspect port state and message log at `/mock/:tcpPort`
