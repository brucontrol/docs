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

Element names must match exactly. Names are case-sensitive. Property names are case-insensitive (`Value` and `value` both work). Use IntelliSense (Ctrl+Space) in the editor to see available elements and properties.

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

### Visibility control

```
"Element" Visibility = hidden
"Element" Visibility = visible
"Element" Visibility = hiddenlocked
"Element" Visibility = default
```

---

## Common Properties (All Elements)

Every element in BruControl has these properties:

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `Visibility` | string | Read/Write | Controls element visibility. Values: `default`, `visible`, `hidden`, `hiddenlocked` |
| `DisplayName` | string | Read/Write | The display name shown on the element. Can differ from the element name |
| `ID` | string | Read-only | The unique identifier (GUID) of the element |
| `EnableHistoricalLogging` | boolean | Read/Write | Whether this element stores historical values for charting |
| `LoggingIntervalSeconds` | number | Read/Write | Minimum seconds between stored values. 0 = store every change |
| `MaxSilenceSeconds` | number | Read/Write | Force-log current value if unchanged for N seconds. 0 = disabled |

### Example: Toggle visibility from a script

```
"Temp Display" Visibility = hidden
sleep 5000
"Temp Display" Visibility = visible
```

---

## Device Common Properties

All device elements (elements connected to hardware interfaces) share these additional properties:

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `Enabled` | boolean | Read/Write | Whether the device communicates with hardware. Disabled elements are silent |
| `Connected` | boolean | Read-only | Whether the interface is currently connected |
| `RefreshMultiple` | number | Read/Write | Multiplier for refresh interval. Higher values reduce communication frequency |
| `DisplayText` | string | Read-only | Formatted display text including calibrations |
| `PortID` | string | Read-only | The port identifier for this device element |

### Example: Check connection status

```
if "Cooler Temp" Connected == false
  print "Interface disconnected!"
endif
```

---

## Properties by Element Type

### Digital Output

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `State` | boolean | Read/Write | The on/off state of the output |
| `ActiveLow` | boolean | Read/Write | When true, ON state produces low voltage |
| `OneShot` | number | Read/Write | One-shot time in milliseconds. 0 = disabled |
| `OneShotDirection` | number | Read/Write | 0 = ON→OFF, 1 = OFF→ON |
| `DualThrowPortNum` | number | Read/Write | Port number for dual-throw relay configuration |
| `DualThrowDelay` | number | Read/Write | Delay in ms for dual-throw switching |

```
"Pump 1" State = on
"Pump 1" ActiveLow = true
"Pump 1" OneShot = 5000
```

### Digital Input

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `Value` | boolean | Read-only | The current on/off state of the input |
| `ActiveLow` | boolean | Read/Write | When true, low voltage is interpreted as ON |

```
if "Door Sensor" Value == on
  print "Door is open"
endif
```

### Duty Cycle

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `DutyCycle` | number | Read/Write | Duty cycle percentage (0–100) |
| `Interval` | number | Read/Write | Cycle time in milliseconds |
| `Value` | boolean | Read-only | Current on/off state within the cycle |

```
"Boil Kettle Duty" DutyCycle = 50
"Boil Kettle Duty" Interval = 10000
```

### Analog Input

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `Value` | number | Read-only | Calibrated analog value |
| `RawValue` | number | Read-only | Uncalibrated raw ADC value |
| `PollRate` | number | Read/Write | Sampling interval in ms (250–25000) |
| `AvgWeight` | number | Read/Write | Averaging weight (1–100%). Higher = more weight to new samples |

```
new value reading
reading = "Pressure Sensor" Value
"Pressure Sensor" PollRate = 1000
```

### PWM Output

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `Value` | number | Read-only | Current output value (after calibration) |
| `RawValue` | number | Read-only | Raw output value (0–255) before calibration |
| `RequestedValue` | number | Read/Write | Target output value to set |

```
"LED Strip" RequestedValue = 128
```

### Counter

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `Total` | number | Read-only | Accumulated pulse count |
| `Rate` | number | Read-only | Calibrated pulse rate |
| `RawRate` | number | Read-only | Uncalibrated pulse rate |
| `SamplingPeriod` | number | Read/Write | Time window for rate calculation in seconds (1–10) |

```
new value flowTotal
flowTotal = "Flow Meter" Total
print "Flow rate: " + "Flow Meter" Rate
```

### 1-Wire Temperature (OneWire)

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `Value` | number | Read-only | Calibrated temperature |
| `RawValue` | number | Read-only | Uncalibrated temperature reading |
| `SensorIndex` | number | Read/Write | 1-Wire sensor index (0–99) |
| `Unit` | string | Read/Write | Temperature unit: `Fahrenheit` or `Celsius` |

```
new value fermTemp
fermTemp = "Ferm Temp" Value
```

### Hysteresis

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `Target` | number | Read/Write | Target setpoint value |
| `OnOffset` | number | Read/Write | Offset from target where output turns ON |
| `OnDelay` | number | Read/Write | Minimum seconds between output activations |
| `InputPortID` | string | Read/Write | Port ID of the input device element |
| `Value` | boolean | Read-only | Current on/off state of the output |

```
"Fridge" Target = 68
"Fridge" OnOffset = -1
```

### PID

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `Target` | number | Read/Write | Setpoint value the PID tries to achieve |
| `Kp` | number | Read/Write | Proportional coefficient |
| `Ki` | number | Read/Write | Integral coefficient |
| `Kd` | number | Read/Write | Derivative coefficient |
| `Reversed` | boolean | Read/Write | When true, output increases as input exceeds target (cooling mode) |
| `CalcTime` | number | Read/Write | PID calculation interval in seconds |
| `OutTime` | number | Read/Write | Output period in seconds |
| `MaxIntegral` | number | Read/Write | Maximum integral component % to prevent windup |
| `MaxOutput` | number | Read/Write | Maximum output percentage limit |
| `InputPortID` | string | Read/Write | Port ID of the input device element |
| `Value` | number | Read-only | Calibrated output value |
| `RawValue` | number | Read-only | Uncalibrated output value |

```
"Mash PID" Target = 152
"Mash PID" Kp = 5.0
"Mash PID" Ki = 0.1
"Mash PID" Kd = 2.0
"Mash PID" Reversed = false
"Mash PID" MaxOutput = 100
```

### Deadband

The Deadband element provides a band-based control algorithm as an alternative to PID. It adjusts output based on zones around the target.

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `Target` | number | Read/Write | Target setpoint value |
| `DeadbandOffset` | number | Read/Write | Range around target where output stays unchanged |
| `InnerBandOffset` | number | Read/Write | Range outside deadband where inner band drive applies |
| `InnerBandDrive` | number | Read/Write | Output change per calculation cycle in inner band |
| `OuterBandDrive` | number | Read/Write | Output change per calculation cycle in outer band |
| `InitialOutput` | number | Read/Write | Starting output value when device is enabled |
| `Reversed` | boolean | Read/Write | When true, output increases as input exceeds target |
| `CalcTime` | number | Read/Write | Calculation interval in seconds |
| `OutTime` | number | Read/Write | Output cycle time in seconds |
| `InputPortID` | string | Read/Write | Port ID of the input device element |
| `Value` | number | Read-only | Calibrated output value |
| `RawValue` | number | Read-only | Uncalibrated output value |

```
"Deadband 1" Target = 150
"Deadband 1" DeadbandOffset = 2
"Deadband 1" InnerBandOffset = 5
"Deadband 1" InnerBandDrive = 10
"Deadband 1" OuterBandDrive = 25
```

### SPI Sensor

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `Value` | number | Read-only | Calibrated sensor value |
| `RawValue` | number | Read-only | Uncalibrated sensor reading |
| `PollRate` | number | Read/Write | Polling interval in ms |
| `AvgWeight` | number | Read/Write | Averaging weight (1–100%) |

### Hydrometer

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `SG` | number | Read-only | Specific gravity reading |
| `Temp` | number | Read-only | Temperature reading from the hydrometer |

```
new value gravity
gravity = "Tilt" SG
print "Gravity: " + gravity
```

### Timer

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `Value` | time | Read/Write | Current timer value (hh:mm:ss) |
| `Type` | string | Read/Write | `CountUp` or `CountDown` |
| `ResetValue` | time | Read/Write | Value the timer resets to |

```
start "Timer 1"
wait "Timer 1" Value >= 00:05:00
stop "Timer 1"
reset "Timer 1"
```

### Alarm

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `Active` | boolean | Read/Write | Whether the alarm is triggered |
| `SoundFile` | media | Read/Write | Audio file path or slug. Empty = no sound |
| `Loop` | boolean | Read/Write | Whether the alarm sound loops |

```
if "High Temp Alarm" Active == true
  print "ALARM: Temperature too high!"
endif
```

### Global Variable

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `Value` | varies | Read/Write | Current value (type depends on variable type) |
| `Precision` | number | Read/Write | Decimal places to display for numeric values |

```
new value targetTemp
targetTemp = "Set Temp" Value
"Set Temp" Precision = 1
```

### Button

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `State` | boolean | Read/Write | True when pressed; reset to false in script to detect next press |

```
wait "StartButton" State == true
"StartButton" State = false
print "Button was pressed!"
```

### Toggle Switch

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `State` | boolean | Read/Write | On/off state of the switch |

```
if "Auto Mode" State == on
  call "autoProcess"
endif
```

### Process (Script Element)

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `state` | string | Read-only | Execution state: `"Running"`, `"Paused"`, or `"Stopped"` |
| `currentline` | number | Read-only | Current line being executed by the interpreter |

```
if "Script 2" state == "Running"
  print "Script 2 is running on line " + "Script 2" currentline
endif
```

:::info Process commands
Script elements are also controlled with commands: `start`, `stop`, `pause`, `resume`, `load`, `reset`, `restart`. See [Flow Control](./flow-control).
:::

---

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

### PID tuning from script

```
[tune]
"Mash PID" Kp = 5.0
"Mash PID" Ki = 0.1
"Mash PID" Kd = 2.0
"Mash PID" Target = 152
"Mash PID" Enabled = true
```

### Monitor counter flow rate

```
[main]
new value rate
rate = "Flow Meter" Rate
if rate < 1.0
  print "Warning: Low flow rate"
endif
sleep 2000
goto "main"
```

## Tips

1. **Use IntelliSense** — Press Ctrl+Space after typing `"ElementName" ` to see available properties
2. **Match names exactly** — `"Temp Proobe"` won't match `"Temp Probe"`
3. **Check read-only properties** — Writing to a read-only property (like `Connected` or `Value` on sensors) has no effect
4. **Property lookup is case-insensitive** — `Value` and `value` both work
5. **Hover for docs** — Hover over any property name in the editor to see its type, description, and examples

## Next Steps

- [Conditionals](./conditionals) — Make decisions based on element values
- [Flow Control](./flow-control) — Wait for conditions, control timing
- [Examples](./examples) — Complete scripts using element properties
