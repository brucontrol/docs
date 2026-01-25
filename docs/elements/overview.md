---
id: overview
title: Elements Overview
sidebar_position: 1
---

# Elements Overview

Elements are the building blocks of your BruControl system. They represent the virtual objects that interact with your physical hardware and provide the interface for monitoring and control.

## What are Elements?

Elements in BruControl are virtual representations of:

- **Physical devices** (sensors, actuators, relays)
- **Control algorithms** (PID, hysteresis, duty cycle)
- **User interface components** (buttons, displays, graphs)
- **Data storage** (variables, logs)
- **System functions** (timers, alarms)

## Element Categories

### Device Elements

Device Elements connect to physical hardware through interface pins:

- **Digital Input** - Read on/off states from switches and sensors
- **Digital Output** - Control on/off devices like relays and valves
- **Analog Input** - Read variable voltage from sensors
- **PWM Output** - Control variable devices with pulse width modulation
- **Counter Input** - Read high-speed pulses from flow meters and encoders
- **Temperature Sensors** - RTD and 1-wire temperature measurement
- **Hydrometer Input** - Specific gravity measurement from electronic hydrometers

### Control Elements

Control Elements implement algorithms for automated control:

- **Duty Cycle Output** - Time-based on/off cycling
- **Hysteresis Output** - Temperature control with deadband
- **PID Output** - Proportional-Integral-Derivative control
- **Deadband Output** - Prevent oscillation in control loops

### Interface Elements

Interface Elements provide user interaction and visualization:

- **Button Elements** - User-triggered actions
- **Switch Elements** - Toggle states
- **Graph Elements** - Historical data visualization
- **Inspector Elements** - Display values and status

### System Elements

System Elements manage timing and notifications:

- **Timer Elements** - Count up or count down timers
- **Alarm Elements** - Configurable alerts and notifications
- **Global Elements** - Shared variables across scripts

## Element Properties

All elements have properties that can be:

- **Read** - Get current values and states
- **Written** - Set values and control behavior
- **Monitored** - Track changes over time
- **Logged** - Store historical data

Common properties include:

- **Value** - Current reading or setting
- **State** - On/off or enabled/disabled status
- **Name** - Element identifier
- **Enabled** - Whether the element is active

## Element Configuration

Elements are configured through the BruControl interface:

1. **Add Element** - Create a new element
2. **Configure Properties** - Set parameters and options
3. **Assign Hardware** - Link to interface pins (for device elements)
4. **Apply Calibrations** - Adjust readings for accuracy
5. **Test** - Verify operation

## Element Naming

:::tip Naming Best Practices
- Use descriptive names: "Mash Tun Temperature" instead of "Temp1"
- Include control type for device elements: "HLT PID" instead of "HLT"
- Avoid duplicate names
- Use consistent naming conventions
:::

## Element Interaction

Elements can interact with:

- **Scripts** - Read and write properties programmatically
- **Other Elements** - Link elements together
- **Workspaces** - Display and control through the UI
- **Data Exchange** - Share data with external systems

## Next Steps

Learn about specific element types:

- [Device Elements](./device-elements) - Physical hardware interfaces
- [Control Elements](./control-elements) - Automated control algorithms
- [Timer Elements](./timer-elements) - Timing and scheduling
- [Alarm Elements](./alarm-elements) - Alerts and notifications
- [Graph Elements](./graph-elements) - Data visualization

:::info Coming Soon
Detailed documentation for each element type is being developed. Check back for comprehensive guides and examples.
:::
