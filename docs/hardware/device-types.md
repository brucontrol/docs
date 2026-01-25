---
id: device-types
title: Device Types
sidebar_position: 2
---

# Device Types

BruControl can address many different device types. In most cases, supporting hardware will be required to integrate them into the system. For example, a motor will need to be powered through a relay circuit to convert the low power signal from the interface into a high-power switch.

:::info Input/Output Direction
The "input" or "output" direction refers to the interface's perspective.
:::

## Supported Device Types

### 1. Digital Outputs

These are commanded on/off devices such as:

- Motors
- Heaters
- Refrigeration compressors
- Motorized valves
- Solenoids
- Relays
- LEDs and indicators

**Typical Use Cases:**
- Controlling SSRs (Solid State Relays)
- Switching mechanical relays
- Activating solenoid valves
- Turning on/off pumps and motors

---

### 2. Digital Inputs

These are the read states of on/off switches, sensors, contacts, etc.

**Examples:**
- Push buttons
- Toggle switches
- Float switches (liquid level detection)
- Proximity sensors
- Door/lid contacts
- Emergency stop buttons
- Limit switches

**Typical Use Cases:**
- Manual control inputs
- Safety interlocks
- Level detection
- Position sensing

---

### 3. PWM Outputs (Analog Outputs)

These are commanded variable or proportional devices which respond to different command levels for a range of performance.

**Devices Controlled:**
- Proportional valves
- Variable speed pumps
- Actuators
- Motors (speed control)
- Lights (dimming)
- Heaters (power modulation)

**How It Works:**
- PWM (Pulse Width Modulation) reduces the net power to devices
- PWM can be converted into an Analog output via additional circuitry such as an RC low-pass filter
- Provides smooth, variable control from 0-100%

**Typical Use Cases:**
- Variable speed pump control
- Proportional valve positioning
- Heater power modulation
- Motor speed control

---

### 4. Analog Inputs

These are the read voltages of variable or proportional sensors.

**Sensor Types:**
- Pressure sensors (transducers)
- Temperature sensors (analog or thermistor)
- Flow sensors
- Weight/load cells
- pH sensors
- Liquid level sensors (analog)

**Characteristics:**
- Typically provide 0-5V or 0-10V output
- Continuous variable readings
- Require calibration for accurate measurements

**Typical Use Cases:**
- Pressure monitoring
- Temperature measurement
- Flow rate monitoring
- Weight measurement

---

### 5. Counter Inputs

These are read high-speed pulsed proportional sensors.

**Sensor Types:**
- Encoders
- Hall effect sensors
- Flow meters (pulse output)
- Proximity sensors (pulse counting)
- Tachometers

**Measurement Modes:**
- **Total Count** - Cumulative pulses
- **Rate** - Pulses per time period (frequency)

**Typical Use Cases:**
- Flow totalizing (gallons/liters)
- Flow rate measurement (GPM/LPM)
- Rotational speed (RPM)
- Position tracking

---

### 6. Special Temperature Sensors

These are read variable sensors for measuring temperature with high accuracy.

#### RTD (Resistive Temperature Devices)

- PT100 and PT1000 sensors
- 2-wire, 3-wire, or 4-wire configurations
- High accuracy and stability
- Requires SPI interface boards (third-party)

#### 1-Wire Temperature Sensors

- DS18B20 and similar
- Digital output
- Multiple sensors on single wire
- Good accuracy
- Easy to implement

**Typical Use Cases:**
- Fermentation temperature control
- Mash temperature monitoring
- Boil kettle temperature
- Hot liquor tank monitoring
- Refrigeration monitoring

---

### 7. Special Device Sensors

These sensors provide data from particular devices used in processing applications.

#### Electronic Hydrometers

- iSpindel
- Tilt hydrometer
- Other Bluetooth/Wi-Fi hydrometers

**Data Provided:**
- Specific gravity
- Temperature
- Battery level
- Tilt angle

**Typical Use Cases:**
- Real-time fermentation monitoring
- Specific gravity tracking
- Fermentation completion detection
- Automatic temperature adjustment based on fermentation activity

---

## Integration Requirements

### Supporting Hardware

Most devices require supporting hardware for integration:

- **Relays** - SSR or mechanical relays for switching high-power devices
- **Signal conditioning** - Amplifiers, filters, or converters
- **Power supplies** - Appropriate voltage/current for sensors and actuators
- **Protection circuits** - Fuses, diodes, transient suppression
- **Interface boards** - SPI boards for RTD sensors, etc.

### Wiring Considerations

- Proper wire gauge for current requirements
- Shielded cables for analog signals in noisy environments
- Proper grounding to prevent noise and interference
- Appropriate connectors for reliability
- Cable routing away from high-voltage/high-current lines

## Next Steps

- [Interface Wiring Maps](./wiring-maps) - Pin assignments for your interface
- [Control System Considerations](./control-system) - Design your control system
- [Device Elements](../elements/device-elements) - Configure devices in BruControl
