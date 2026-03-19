---
id: flow-control
title: Flow Control
sidebar_position: 6
---

# Flow Control

Flow control lets you repeat actions, jump between sections, pause execution, and coordinate multiple scripts. This page covers loops, subroutines, timing, and the `exec` command.

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
Make sure the condition eventually becomes false, or the script will run forever. Always change the variable the `while` condition checks, or include a `sleep` in the loop body.
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

### Polling loop

```
[main]
while "Temp Probe" Value < 150
  sleep 1000
endwhile
print "Temperature reached 150!"
```

:::warning Validator catches unclosed loops
The validator detects unclosed `while`/`endwhile` blocks and reports: `Missing 1 "endwhile" statement(s)` at the end of the script. It also catches unmatched `endwhile` without a corresponding `while`.
:::

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
sleep 60000   // 1 minute
```

### Why use delays?

- Allow physical devices time to respond
- Allow processes time to complete
- Prevent the CPU from racing in loops
- Control loop execution rates

:::tip Best practice
Always include delays in loops to prevent CPU overload. Even `sleep 100` (0.1s) is enough.
:::

## wait — Pause until a condition is true

Pause until a condition is true. The `wait` command supports two forms:

### Form 1: Element property condition

```
wait "Temp Probe" Value >= 150
```

### Form 2: Variable condition

```
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

### Examples

```
[main]
print "Waiting for temperature..."
wait "Boil Temp" Value >= 210
print "Boil temperature reached!"
```

```
[main]
wait "StartButton" State == on
print "Button pressed!"
```

```
[main]
new value x
x = 10
// Wait for x to be changed by another script or element
wait x == 0 10000
print "x reached zero or timed out"
```

:::info wait during disconnect
If the element's interface disconnects while `wait` is active, the condition may not be evaluable. The `wait` will continue waiting (or time out if a timeout is specified). Use `Connected` checks before long waits if disconnection is a concern.
:::

## Starting and Stopping Timers and Scripts

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

| Command | Syntax | Supported Elements |
|---------|--------|-------------------|
| `start` | `start "Element"` | Timer, Process |
| `stop` | `stop "Element"` | Timer, Process |
| `pause` | `pause "Script"` | Process only |
| `resume` | `resume "Script"` | Process only |
| `reset` | `reset "Element"` | Timer, Process |
| `restart` | `restart "Element"` | Timer, Process |
| `load` | `load "Script"` | Process only |

:::tip IntelliSense filtering
After typing `start `, `stop `, etc., IntelliSense only suggests elements of the correct type (Timers and Processes for `start`/`stop`, only Processes for `pause`/`resume`/`load`).
:::

## exec — Execute a System Command

The `exec` command executes a system-level command or external program. This is an advanced feature for direct system integration.

```
exec "command"
```

:::warning Advanced use
`exec` runs commands at the system level. Use it carefully and only when you need to interact with external programs or the operating system.
:::

## When to use sleep vs wait

- **sleep** — You just need to wait a fixed amount of time
- **wait** — You need to wait for a condition (element property or variable) to become true

| Scenario | Use |
|----------|-----|
| Delay between steps | `sleep 1000` |
| Wait for temperature | `wait "Sensor" Value >= 150` |
| Wait for button press | `wait "Button" State == on` |
| Wait with timeout | `wait "Sensor" Value >= 150 5000` |
| Fixed delay in loop | `sleep 100` |

## Common Patterns

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

### Multi-script coordination

```
// Script 1: Main controller
[main]
start "Script 2"
wait "Script 2" state == "Stopped" 60000
print "Script 2 finished"
```

```
// Script 2: Worker
[main]
print "Working..."
sleep 5000
print "Done"
```

### Timed sequence

```
[main]
"Pump" State = on
start "Timer 1"
wait "Timer 1" Value >= 00:30:00
"Pump" State = off
stop "Timer 1"
reset "Timer 1"
print "30-minute pump cycle complete"
```

## Next Steps

- [Examples](./examples) — Complete scripts using flow control
- [Syntax Reference](./syntax-reference) — Full command reference
