---
id: element-properties
title: Element Properties
sidebar_position: 4
---

# Element Properties

Elements are things in your setup: sensors, outputs, PID controllers, timers, pumps, valves, and more. You reference them by **name in quotes** and read or write their **properties**.

## Syntax Overview

### Reading a value

```
"ElementName" Property
```

### Writing a value

```
"ElementName" Property = value
```

Element names must match exactly. Names are case-sensitive. Use IntelliSense (Ctrl+Space) in the editor to see available elements and properties.

## Reading Element Values

Copy an element's property into a variable:

```
new value sensorReading
sensorReading = "Temp Probe" Value
```

Use the value directly in expressions:

```
if "Alarm" Active == true
  print "Alarm is active!"
endif
```

## Writing Element Values

### Digital outputs (on/off)

```
"Pump 1" State = on
"Pump 1" State = off
```

Use `on`/`off` or `true`/`false` interchangeably.

### Duty cycle (percentage)

```
"Boil Kettle Duty" DutyCycle = 100
"Boil Kettle Duty" DutyCycle = 35
```

### PID target (setpoint)

```
"PID 1" Target = 150
```

### Timer reset value

```
"Timer 1" ResetValue = 00:05:00
```

### Hysteresis target

```
"Fridge" Target = 68
```

## Common Properties by Element Type

| Element type | Common properties | Notes |
|--------------|-------------------|-------|
| Digital Output | State | on/off |
| Digital Input | Value | Read-only (boolean) |
| Duty Cycle | DutyCycle, Value, Interval, Enabled | DutyCycle 0–100; Value is read-only state |
| Analog Input | Value, RawValue | Read-only |
| PWM Output | Value, RawValue, RequestedValue | Value and RawValue read-only; RequestedValue 0–255 |
| PID | Target, Value, Kp, Ki, Kd, Enabled | Target = setpoint |
| Hysteresis | Target, Value, OnOffset, Enabled | Value = output state (read-only) |
| Timer | Value, ResetValue, Type | start, stop, reset, restart |
| Alarm | Active | Read-only |
| Global Variable | Value | Read/write |
| Toggle Switch | State | on/off |
| Button | State | Momentary |
| Script Element (Process) | — | Use process name: `start`, `stop`, `pause`, `resume`, `load`, `reset`, `restart` |
| Counter | Total, Rate, RawValue, RawRate, SamplingPeriod | Total/Rate/RawValue/RawRate read-only |
| OW Temp (OneWire) | Value, RawValue, SensorIndex, Unit | Read-only |
| SPI Sensor | Value, RawValue | Read-only |
| Hydrometer | Temp, SG | Read-only |

## Enabling and Disabling Elements

Some elements have an `Enabled` property:

```
"Boil Kettle Duty" Enabled = true
"Cooler" Enabled = false
```

## Device connection status

Device elements expose a `Connected` property to check if the interface is connected:

```
if "Cooler Temp" Connected == false
  print "Interface disconnected!"
endif
```

## Examples

### Read sensor and react

```
[main]
new value temp
temp = "Temp Probe" Value
if temp > 150
  "Heater" State = off
  print "Temperature limit reached"
endif
sleep 1000
goto "main"
```

### Set output for a duration

```
[main]
"Pump 1" State = on
sleep 5000
"Pump 1" State = off
```

### Follow a global variable

```
new value targetTemp
targetTemp = "Set Temp" Value
"PID 1" Target = targetTemp
```

## Tips

1. **Use IntelliSense** — Press Ctrl+Space after typing `"ElementName" ` to see available properties
2. **Match names exactly** — `"Temp Proobe"` won't match `"Temp Probe"`
3. **Check property names** — Property lookup is case-insensitive (e.g., `Value` and `value` both work)
4. **Read the element docs** — Each element type has its own properties; see the Elements section for details

## Next Steps

- [Conditionals](./conditionals) — Make decisions based on element values
- [Flow Control](./flow-control) — Wait for conditions, control timing
- [Examples](./examples) — Complete scripts using element properties
