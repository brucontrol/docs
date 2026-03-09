---
id: flow-control
title: Flow Control
sidebar_position: 6
---

# Flow Control

Flow control lets you repeat actions, jump between sections, and pause execution. This page covers loops, subroutines, and timing.

## Loops: while / endwhile

A **loop** runs a block of code over and over until a condition becomes false.

### Example: Count from 1 to 5

```
[main]
new value count
count = 1
while count <= 5
  print count
  count = count + 1
endwhile
```

- `while count <= 5` — Keep looping while `count` is 5 or less
- `count = count + 1` — Add 1 to `count` each time (otherwise the loop never ends!)

:::warning Infinite loops
Make sure the condition eventually becomes false, or the script will run forever. Always change the variable the `while` condition checks.
:::

### Countdown loop

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

## goto — Jump to a section

`goto` jumps execution to a named section. It does **not** return.

```
[main]
print "Starting"
goto heating

[heating]
print "Heating phase"
goto done

[done]
print "All done"
```

See [Sections](./sections) for more on `goto`.

## call and return — Subroutines

Use `call` to run a section and then come back. Use `return` inside that section to go back.

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

- **call** — "Do this section, then come back"
- **goto** — "Jump there and don't come back"

## sleep — Pause for a fixed time

Pause for a given number of milliseconds:

```
sleep 1000
```

Pauses for **1000 milliseconds** (1 second). Use this for delays between steps.

### Examples

```
sleep 1000    // 1 second
sleep 5000    // 5 seconds
sleep 100     // 100 milliseconds
```

### Why use delays?

- Allow physical devices time to respond
- Allow processes time to complete
- Prevent the CPU from racing in loops
- Control loop execution rates

:::tip Best practice
Always include delays in loops to prevent CPU overload.
:::

## wait — Pause until a condition is true

Pause until a condition is true. The condition can compare an element's property (e.g. Value, State) or a variable:

```
wait "Temp Probe" Value >= 150
wait v == 0
```

Execution continues when the condition is met.

### Optional timeout

If the condition isn't met within the timeout (in milliseconds), execution continues anyway:

```
wait "Temp Probe" Value >= 150 5000
```

Waits up to 5 seconds. If the temperature never reaches 150, the script continues after 5 seconds.

### Wait operators

`==`, `!=`, `>`, `<`, `>=`, `<=`

### Example

```
[main]
print "Waiting for temperature..."
wait "Boil Temp" Value >= 210
print "Boil temperature reached!"
```

## Starting and stopping timers and scripts

### Timers

```
start "Timer 1"      // Start the timer
stop "Timer 1"       // Stop it
reset "Timer 1"      // Reset to 0
restart "Timer 1"    // Reset and start
```

### Scripts (other processes)

```
start "Script 2"     // Load and run the script
stop "Script 2"      // Stop it
load "Script 2"      // Load without starting (prepare for later)
restart "Script 2"   // Reset and run again
pause "Script 2"     // Pause (for debugging)
resume "Script 2"    // Resume
```

Use `start` when you want another script to run. Use `load` when you want to prepare it first and start it later.

## When to use sleep vs wait

- **sleep** — You just need to wait a fixed amount of time
- **wait** — You need to wait for a condition (element property or variable) to become true

## Common patterns

### Polling loop with delay

```
[main]
if "Temp Probe" Value > 150
  "Heater" State = off
endif
sleep 1000
goto "main"
```

### Wait for condition, then act

```
[main]
wait "StartButton" State == on
"Pump" State = on
sleep 30000
"Pump" State = off
```

### Infinite loop with delay (avoid CPU overload)

```
[loop]
// Do something
sleep 100
goto "loop"
```

## Next Steps

- [Examples](./examples) — Complete scripts using flow control
- [Syntax Reference](./syntax-reference) — Full command reference
