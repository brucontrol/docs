---
id: intro
title: Introduction to BruControl
sidebar_position: 1
---

# BruControl

**Process Automation Made Personal**

BruControl requires the application and compatible interface firmware.

## Welcome

BruControl is a powerful software application that serves as a host/front-end and programming interface for process control systems such as small-scale breweries, but can be adapted for many other automation or process control systems. It runs as a web server on Windows or Linux (including Docker) and is accessed via a web browser. BruControl communicates via serial (USB) and/or TCP network (Ethernet/Wi-Fi), sending and receiving instructions to one or more microcontrollers.

## What Makes BruControl Special?

BruControl is graphically driven, user friendly, intuitive, and highly flexible, providing an HMI (Human-Machine Interface) as part of its main structure. It requires:

- **No complicated setup**
- **No knowledge of protocols**
- **No microcontroller programming or advanced skills**

Yet it allows a user to configure anything from a single output control to a physically distributed, multiple input/output, highly integrated automated system. Built-in scripting enables automation without microcontroller programming, and multiple workspaces let you organize different machines or subsystems. For technical integrators, BruControl exposes a full [REST API](./api/overview) with OpenAPI/Swagger documentation and a [SignalR real-time hub](./api/overview#real-time-updates-signalr) for push-based updates — enabling integration with dashboards, Node-RED, Home Assistant, and custom applications.

## Key Advantages

### Distributed Network Controller Topology

1. **Multiple Separate Systems** - Control automated brewery, fermentation, serving, etc., which can be in the same machine, same facility, or remote location across the country, as long as they are on the same network

2. **Fault Tolerance** - Independent hardware interfaces continue static operation uninterrupted should the BruControl application host computer crash, or the communication network fail

3. **Flexibility for Growth** - System can grow as needed without modifying existing hardware

4. **Affordable Hardware** - Interface hardware is inexpensive and readily available. For example, an Arduino MEGA 2560 has about 45 digital I/O, 12 PWM/Analog outputs, 16 analog inputs, up to 4 high frequency counters, 10+ 1-wire sensors, 4+ RTD sensors, and is available for about $15 from common online retailers

## Getting Started

Ready to dive in? Check out these sections:

- [Features and Highlights](./features) - Comprehensive list of capabilities
- [System Requirements](./requirements) - What you need to get started
- [Quick Start Guide](./quick-start) - Get up and running quickly
- [Hardware Overview](./hardware/overview) - Understanding BruControl hardware

## Safety Warning

:::danger Important Safety Information
The user must take precautions building any circuitry, whether it be high voltage or not – fires and injury or death by electrocution are very real risks! In addition, automation systems are complex and require hardware safeties to be incorporated to prevent injury. BruControl will not be liable for damage to persons or property due to any person or persons using an electrical control system associated with BruControl.
:::
