---
id: examples
title: Script Examples
sidebar_position: 7
---

# Script Examples

Copy-paste examples that work. These scripts demonstrate common process automation sequences. Replace element names with the actual names from your workspace.

## Hello World

The simplest script:

```
[main]
print "Hello, BruControl!"
```

## Variables and Arithmetic

```
[main]
new value x
new value y
x = 10
y = 5
x = x + y
print x
```

## Boil Kettle Ramp-Up

In this brewing example, a boil kettle is slowly ramped up to "ease" into boiling temperature and prevent a boil-over from rapid protein and foam formation.

**Process:**
1. Apply full heating power until temperature reaches 210°F
2. Reduce to 35% for 5 minutes
3. Set to 50% for the remaining boil

**Setup:** A Duty Cycle element named "Boil Kettle Duty" controls heating. A Timer named "Boil Timer" is set to countdown mode with a 60-minute reset value.

```
[boil_ramp]
"Boil Kettle Duty" Enabled = true
"Boil Kettle Duty" DutyCycle = 100
wait "Boil Temp" Value >= 210
"Boil Kettle Duty" DutyCycle = 35
restart "Boil Timer"
wait "Boil Timer" Value < 00:55:00
reset "Boil Timer"
"Boil Kettle Duty" DutyCycle = 50
```

## Fermenter Temperature Control

Two Hysteresis elements control heating and cooling, both following a Global Variable "Set Temp". They are offset by 1 degree so they don't overlap: the cooling hysteresis targets the high edge, the heating hysteresis targets the low edge.

**Setup:**
- "Beer_Temp" — fermenter temperature sensor
- "Fridge" — cooling hysteresis device
- "Heat" — heating hysteresis device
- "Set Temp" — Global Variable for the target temperature

```
[start]
"Beer_Temp" Enabled = true
"Fridge" Enabled = true
"Heat" Enabled = true
new value High_Temp
new value Low_Temp
new value Old_Temp
Old_Temp = "Set Temp" Value

[loop]
wait Old_Temp != "Set Temp" Value
High_Temp = "Set Temp" Value + 1
Low_Temp = "Set Temp" Value - 1
"Fridge" Target = High_Temp
"Heat" Target = Low_Temp
Old_Temp = "Set Temp" Value
goto "loop"
```

When you change the "Set Temp" Global, both hysteresis devices update. The cooling one reduces temp down to High_Temp and turns off; the heating one increases temp up to Low_Temp and turns off. They operate in parallel without overlapping.

## Interface Disconnect Alarm

Interfaces remain steady-state during a disconnect from the BruControl application. This script issues an alarm and increments a counter when an interface disconnects.

**Setup:** A Device element (e.g., "Cooler Temp") where the disconnect is assessed. The element's `Connected` property becomes `false` when the interface disconnects.

```
[start]
new value errorCount
errorCount = 0

[loop]
wait "Cooler Temp" Connected == false
errorCount += 1
print "Interface disconnected! Count: "
print errorCount
wait "Cooler Temp" Connected == true
sleep 1000
goto "loop"
```

## Simple Conditionals

### if / else

```
[main]
new value x
x = 7
if x > 10
  print "Big"
else
  print "Small"
endif
```

### if / elseif / else

```
[main]
new value v
new value result
v = 2
result = 0
if v == 1
  result = 10
elseif v == 2
  result = 20
elseif v == 3
  result = 30
else
  result = 99
endif
print result
```

## Loops

### while / endwhile

```
[main]
new value count
count = 5
while count > 0
  print count
  count = count - 1
endwhile
print "Done"
```

## Subroutines: call and return

```
[main]
new value v
v = 1
call addOne
print v
goto end

[addOne]
v = v + 1
return

[end]
```

## sleep and wait

### sleep (fixed delay)

```
[main]
print "Starting"
sleep 1000
print "1 second later"
sleep 500
print "0.5 seconds later"
```

### wait (condition with optional timeout)

```
[main]
wait "Sensor" Value >= 50 5000
print "Condition met or timeout"
```

## Read Sensor and Set Output

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

## Run Pump for a Duration

```
[main]
"Pump 1" State = on
sleep 5000
"Pump 1" State = off
```

## Next Steps

- [Syntax Reference](./syntax-reference) — Complete language reference
- [Introduction](./introduction) — Script basics
- [Element Properties](./element-properties) — Interact with your elements
