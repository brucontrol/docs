---
id: wiring-maps
title: Interface Wiring Maps
sidebar_position: 3
---

# Interface Wiring Maps

Once an interface is selected, it will need to be integrated into the control system. Each of the interface's pins can support specific Device Types. Therefore, each physical device must be wired to a suitable input or output type.

## Pin Type Codes

The types and corresponding letter codes are:

| Code | Device Type | Description |
|------|-------------|-------------|
| **D** | Digital Input/Output | Binary on/off devices and switches |
| **P** | PWM Output/Analog Output | Variable power/proportional control |
| **A** | Analog Input | Variable voltage sensors |
| **C** | Counter Input | High-speed pulse sensors |
| **R** | RTD (SPI Sensor) | Resistive Temperature Device sensors via SPI board |
| **O** | 1-Wire | DS18B20 and similar temperature sensors |
| **H** | Hydrometer | Tilt and similar Bluetooth hydrometers (ESP32 only, virtual ports 220–224) |

## Firmware Variations

There is a different Interface Wiring Map for each interface and each firmware that is installed. The variations in firmware include:

- **Connection Types**
  - Serial (USB)
  - Ethernet Network
  - Wi-Fi Network
- **Special Features**
  - RTD board capability (for use with RTD sensors)
  - LCD display support
  - Extended I/O configurations

## Using the Wiring Maps

Once the appropriate interface/firmware combination is selected, the interface should be wired according to that configuration. Each interface pin will show the letter codes which reflect the types of devices that can be wired to it.

### Example Pin Configuration

```
Pin 2:  D     - Digital Input/Output only
Pin 3:  D,P   - Digital or PWM Output
Pin 4:  D     - Digital Input/Output only
Pin A0: A     - Analog Input only
Pin 5:  D,C   - Digital or Counter Input
```

## Common Interface Types

### Arduino MEGA 2560

**Capabilities:**
- ~45 Digital I/O pins
- 12 PWM/Analog outputs
- 16 Analog inputs
- Up to 4 high frequency counters
- 10+ 1-wire sensors
- 4+ RTD sensors (with SPI board)

**Connection Options:**
- USB Serial (native)
- Ethernet (with shield)
- Wi-Fi (with shield or module)

### Arduino UNO

**Capabilities:**
- ~14 Digital I/O pins
- 6 PWM outputs
- 6 Analog inputs
- Limited counter inputs
- 1-wire sensor support

**Connection Options:**
- USB Serial (native) only — no network firmware variants in BruControl

### ESP32-Based Interfaces

**Capabilities:**
- Multiple Digital I/O pins
- PWM outputs
- Analog inputs
- Built-in Wi-Fi and Bluetooth

**Connection Options:**
- USB Serial (native)
- Wi-Fi (native)

## Wiring Best Practices

### Pin Selection

1. **Plan your layout** - Map out all devices before wiring
2. **Group similar devices** - Keep digital outputs together, analog inputs together, etc.
3. **Reserve special pins** - Some pins have specific capabilities (PWM, counters)
4. **Document everything** - Label wires and maintain a wiring diagram

### Physical Wiring

1. **Use appropriate wire gauge** - Match current requirements
2. **Keep wires organized** - Use cable management and labels
3. **Separate signal types** - Keep high-power lines away from sensor wires
4. **Use shielded cable** - For analog signals in noisy environments
5. **Proper termination** - Secure all connections, use appropriate terminals

### Testing

1. **Test low voltage first** - Verify logic before applying high power
2. **One device at a time** - Add and test devices incrementally
3. **Check polarity** - Verify correct positive/negative connections
4. **Measure voltages** - Confirm expected voltages at each point
5. **Document results** - Keep notes on what works and what doesn't

## Detailed Wiring Maps

Per-pin wiring maps for each interface and firmware combination are available from [brucontrol.com/download/firmware/](https://brucontrol.com/download/firmware/) (download the Interface Wiring Map for your interface). For related reference:

- [Interface Overview (Appendix)](../appendix/interface-overview) - Interface specifications and I/O capabilities
- [Interface Specific Considerations (Appendix)](../appendix/interface-specific) - Special notes for specific interface models

## Next Steps

- [Control System Considerations](./control-system) - Design and safety guidelines
- [Firmware Installation](./firmware-installation) - Install firmware on your interface
- [Device Elements](../elements/device-elements-overview) - Configure devices in BruControl
