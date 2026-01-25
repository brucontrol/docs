---
id: overview
title: Hardware Overview
sidebar_position: 1
---

# BruControl Hardware

## Interface Considerations

BruControl uses commonly available, inexpensive, off-the-shelf microcontrollers such as Arduino boards to serve as the "interface" between the software and physical hardware devices. These boards are open source, very reliable, come in multiple different mixes of I/O and features, and are available from many online retailers.

:::info Terminology
From here forward, and in the application itself, these microcontrollers are referred to as **interfaces**.
:::

## Sourcing Interfaces

The system builder can source their own interface or purchase a pre-built interface assembly. BruControl does not supply interface hardware. It is up to the system builder to determine which interface to use for the application.

:::warning Hardware Compatibility
Note that interface boards are typically open source, which means the manufacturer of the actual board may duplicate an official reference design, or make changes to reduce cost or facilitate manufacture. This means the board may have different specifications than the official reference design, which might introduce unexpected incompatibilities. It is recommended to source interface boards from reputable vendors who offer unmodified hardware.
:::

## Connection Methods

Several considerations must be made when selecting the interface to use in a control system.

### Serial (USB) Connection

- Connected through a standard USB cable
- Used when the computer running BruControl is located in close proximity to the interface
- Distance is determined by the length of the USB cable (typically less than 6 feet)
- Simple and reliable for local installations

### Network Connection

In circumstances where USB proximity is not practical, a Network connection may be used. The interface will then need network hardware, such as:

- One built onboard
- Via a shield (plug-in board)
- Via a discrete module

#### Ethernet (Recommended)

- **Recommended method** of network connection due to speed and reliability
- Can be connected to the BruControl host PC via:
  - Router
  - Switch
  - Bridge
  - Directly via an appropriate crossover cable

#### Wi-Fi

- Provides wireless convenience but comes with caveats
- Reliability of wireless networks is lower than hardwired solutions
- Can be successful with:
  - Appropriate network layout
  - Adequate signal between the Wi-Fi radio and the router
  - Minimal radio competition
  - Low bandwidth utilization from other devices on the network
  - Non-time-critical applications

:::tip Fault Tolerance
Since algorithms run on the interface, should the network connectivity fail, the interface will continue to run its current state uninterrupted.
:::

## Voltage Requirements

A major consideration when integrating an interface into the control system is the interface's voltage requirements. Both the power supply voltage and the input/output (I/O) voltage must meet the interface's and ancillary hardware specifications.

:::danger Critical
It is critical that the appropriate voltages are implemented when designing and building a system, otherwise component failures will occur.
:::

### Common Voltage Standards

- **5VDC** - Common standard for power and logic, widely supported by ancillary hardware
- **3.3VDC** - Some models use 3.3VDC logic
- **5VDC Tolerant** - Some 3.3VDC logic interfaces are 5VDC tolerant

### Voltage Considerations

- Relay boards typically exist in 5V versions, though most will switch with a 3.3V input signal
- Analog sensors typically range 0-5V, so these should be evaluated carefully
- The interface should generally be powered via the VIN pin or DC jack so that the internal regulator is used as a layer of filtering
- Can be powered via the USB port
- In either circumstance, it is important a clean, regulated supply voltage is used

## Current Requirements

Ancillary hardware requirements and current needs must be considered. The pins from the interfaces can source (provide positive voltage) or sink (provide a path to ground), but have limited voltages and currents they can accommodate.

### Example: Arduino MEGA

- **Per-pin limit**: 15mA
- **Recommended**: Devices which only use 5mA or less
- A solid-state relay (SSR) should be selected which only requires 5mA or less at 5VDC to be triggered

:::warning Current Limitations
All interfaces have per pin and maximum total current limitations – the manufacturer's specification sheet should be consulted.
:::

## Memory Storage

Certain interfaces have memory in them which allows for settings to be stored permanently, whereas others only have temporary storage.

- BruControl uses this memory to store settings for interfaces connecting via Network
- **Permanent memory** - Interfaces will retain their network settings each time the firmware is installed or updated
- **Temporary storage** - Interfaces will require their settings to be re-entered each time their firmware is installed or updated (identified by "Until new FW" in interface tables)

:::info Power Cycling
In both circumstances, the interface can be powered off and on without losing its network settings.
:::

## Screw Shields

A Screw Shield is recommended for mounting and ease/reliability of wiring termination.

:::warning Shield Compatibility
Note that some screw shields do not allow for an additional shield to be attached, which would prevent a Network or other I/O shield from being used. BruControl support or the BruControl website can help system builders source appropriate shields and combinations.
:::

## Next Steps

- [Device Types](./device-types) - Learn about supported device types
- [Interface Wiring Maps](./wiring-maps) - Pin configuration for different interfaces
- [Firmware Installation](./firmware-installation) - Install firmware on your interface
- [Interface Overview (Appendix)](../appendix/interface-overview) - Detailed specifications and limitations
