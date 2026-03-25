---
id: features
title: Features and Highlights
sidebar_position: 2
---

# Features and Highlights

## Overview

- Software which monitors, controls, automates process equipment such as breweries
- Web-based application with cross-platform host (Windows, Linux, or Docker); accessed via browser
- Touchscreen friendly, customizable graphical interface for setup and operation
- Communicates with one or more local or networked microcontroller interfaces
- Microcontroller interfaces serve as hardware I/O for physical electronic controls
- Simple & flexible script language supports complete automation and multitasking
- Broad set of I/O & algorithms: digital, analog, PWM, counters, PID, duty cycle, hysteresis, temperature, specific gravity, etc.
- Bi-directional data exchange with third-party applications via network

## Hardware Features

### Microcontroller Interfaces

- User provided, readily available boards (Arduino, etc.)
- Requires no programming – interface firmware and upload utility are provided
- Functions offloaded to interfaces for speed and communication failure tolerance
- Flexible, on-demand pin declarations for integration with different devices

### Supported Inputs

- **Digital Outputs** - Control relays, SSRs, and other binary devices
- **Digital Inputs** - Read switches, sensors, and contacts
- **PWM / Analog Outputs** - Variable control of motors, lights, heaters
- **Analog Inputs** - Read pressure, temperature, weight sensors
- **High Frequency Counter Inputs** - Total and rate measurements
- **Various Temperature Sensors** - Thermistor, RTD, 1-wire (DS18B20)
- **Local LCD Display Output** - Show information locally
- **Hydrometer Input** - Specific gravity measurements

### Device Control Functions

- **Duty Cycle Output** - Time-based on/off cycling
- **Hysteresis Output** - Temperature control with deadband
- **PID Output** - Precise proportional-integral-derivative control
- **Deadband Output** - Prevent oscillation in control loops

### Multiple Device Type Integrations

- **Relays** (SSR / mechanical) for power devices such as heaters, motors, etc.
- **Contacts, switches, or sensors** like buttons, proximity, float, flow, etc.
- **Analog sensor reading** such as pressure, temperature, weight, etc.
- **PWM (Pulse Width Modulation)** control of motors, lights, heaters, etc.
- **Analog output** for control of proportional valves, pumps, actuators, etc.
- **Temperature measurement** via thermistor/analog, RTD, or 1-wire (DS18B20)
- **Hall effect/pulse sensors** such as encoders, flowmeters, proximity, etc.
- **Local LCD displays** for information presentation separate from user interface

## Software Features

### User Interface

- Web application serving as one unified setup and control environment, accessed via browser
- Modern intuitive touch-panel interface with selectable themes
- Cross-platform host (Windows, Linux, Docker) with modest CPU/memory footprint
- Multi-page "Workspaces" for display and control of different machines & systems
- Customizable graphical representation and control of physical devices
- Real-time display, control, and configuration of devices, timers, alarms, buttons
- **Solution Explorer** – Tree-based navigation for interfaces, workspaces, processes, settings, and data views
- **Plugin Store** – Browse, install, and update element templates and color themes from the registry
- **Element templates** – Customizable appearance per element type; install from Plugin Store or create your own

### Data Management

- Continuous device data collection, providing immediate access to historical data
- Flexible graphing of selectable values for historical data presentation/analysis
- **Data Views** – Customizable views for historical data presentation alongside the Dashboard
- Multiple, fully customizable layouts with user selectable images and formatting
- Supports multiple control types per physical device (e.g. Duty Cycle and PID)
- **File management** — Upload, organize, rename, and move files via the built-in file manager or API

### Communication & Integration

- Communicates with multiple local or remote interfaces for unlimited I/O
- Local interfaces connect via USB & remote interfaces via standard TCP network
- Requires no programming for setup or user interface configuration
- **REST API** (OpenAPI/Swagger) — Full programmatic access to workspaces, elements, devices, processes, and settings
- **Data Exchange Legacy Protocol** — Read and write global variables from third-party systems (Node-RED, Home Assistant, custom scripts) via simple HTTP GET/PUT endpoints
- **SignalR real-time hub** — Push-based WebSocket updates for elements, processes, devices, and charts without polling
- **Outbound webhooks** — Define HTTPS webhooks with templated bodies; call from scripts to push data to Slack, Discord, ntfy, or any external service
- **Media slug system** — Map friendly names to uploaded files for script image references

### Automation & Scripting

- Flexible & simple scripting language for process automation / autonomy
- Scripting includes flow control, variable handling, device control, and properties
- **Processes** – Run concurrent scripts to manage different machine systems and perform multi-tasking
- Scripts can be run, paused, stepped-through, or started in different places
- **Emergency stop (`estop`)** – Instantly disable all enabled ports on all connected devices from script, equivalent to the toolbar stop-all action
- **Webhooks** – Call external HTTP endpoints from scripts with `webhook "Name" key=value` syntax; define webhooks in Settings with body templates supporting `{{placeholder}}` substitution

### Configuration & Calibration

- Parameters and calibrations independently configurable for each device
- Layered calibrations including Thermistor, RTD, offset, Multiplier, Lookup, etc.
- Security system to limit unauthorized changes to environment or device states
- **Mock mode** – Redirect device communication to a software simulator for testing without hardware
- **Configurations** – Save and switch between named configurations for different setups

### Alarms & Timers

- Multiple configurable alarms with hardware activations
- Multiple count-up or count-down timers with direct-acting alarm capabilities
- Multiple variables for handling and monitoring data or operation performance
- Multiple buttons and toggle switches for user interaction with automated processes

## Integration Capabilities

For an automated brewery, essentially any function can be integrated:

- Variable speed pump control
- Flow meters
- Vessel liquid level monitoring
- Proportional motorized ball valves
- Variable SSRs
- Motors/augers
- Temperature control (electric or gas heating, or refrigeration)
- Temperature measurement via thermistor, analog, 1-wire (e.g. DS18B20)
- 2/3/4 wire PT100/1000 RTD probes (via third-party SPI interface boards)
