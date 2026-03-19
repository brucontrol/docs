---
id: sections
title: Sections, goto, and call
sidebar_position: 2
---

# Sections, goto, and call

Scripts are divided into **sections** — blocks of code with names in brackets. Sections let you organize your script and jump between different parts of it.

## Section Syntax

```
[section_name]
```

Section headers use square brackets. The section name can include spaces: `[heating phase]` is valid. Section names are case-insensitive when used with `goto` and `call`.

## The [main] Section

Execution starts at the **first section** in the script (by file order). If you put code before any section header, BruControl creates an implicit `[main]` section for it. By convention, many scripts use `[main]` as the name of the first section.

```
[main]
print "Starting..."
goto heating

[heating]
print "Heating phase"
goto done

[done]
print "All done"
```

## goto — Jump to a Section

Use `goto` to jump execution to another section. The jump does **not** return — execution continues from the target section.

### Syntax

```
goto section_name
goto "section name"
```

If the section name contains spaces, use quotes.

### Example

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

## call — Call a Subroutine

Use `call` when you want to run a section and **come back** to where you called from. The section acts like a subroutine.

### call vs goto

- **call** — "Do this section, then come back"
- **goto** — "Jump there and don't come back"

### Example

```
[main]
new value x
x = 1
call addOne
print x
goto end

[addOne]
x = x + 1
return

[end]
```

- `call addOne` — Jump to `[addOne]`, run it, then return to the line after `call`
- `return` — Go back to where you were called from
- `goto end` — Jump to `[end]` (does **not** return)

### Nested calls

You can call a subroutine from within another subroutine. BruControl maintains a call stack so each `return` goes back to the correct `call` site:

```
[main]
call setupDevices
print "Ready"
goto loop

[setupDevices]
call enablePump
call enableHeater
return

[enablePump]
"Pump" Enabled = true
return

[enableHeater]
"Heater" Enabled = true
return

[loop]
sleep 1000
goto loop
```

:::warning return without call
If you execute `return` without a matching `call`, the script may behave unexpectedly. Always pair `return` with `call`.
:::

## Section Names with Spaces

If your section name contains spaces, use quotes in the `goto` or `call` statement:

```
[sub 1]
// Your code here

[main]
goto "sub 1"
call "sub 1"
```

:::tip IntelliSense for sections
After typing `goto ` or `call `, IntelliSense automatically suggests section names from the current script. Press **Ctrl+Space** to see the list.
:::

## Organizing Your Script

### Main loop pattern

```
[initialize]
"Pump" State = off
"Heater" State = off

[main]
// Main process logic
sleep 1000
goto "main"
```

### State machine pattern

```
[idle]
if "StartButton" State == on
  goto "running"
endif
sleep 500
goto "idle"

[running]
"Pump" State = on
if "StopButton" State == on
  goto "stopping"
endif
sleep 500
goto "running"

[stopping]
"Pump" State = off
sleep 2000
goto "idle"
```

### Subroutine pattern

```
[main]
call "doTask1"
call "doTask2"
goto "main"

[doTask1]
// Perform task 1
return

[doTask2]
// Perform task 2
return
```

### Initialization + loop pattern

```
[init]
new value cycleCount
cycleCount = 0
"Pump" State = off
"Heater" State = off

[main]
cycleCount += 1
print "Cycle: " + cycleCount
call "checkTemp"
sleep 1000
goto "main"

[checkTemp]
if "Temp Probe" Value > 150
  "Heater" State = off
endif
return
```

## Best Practices

1. **Use descriptive section names** — `[fillVessel]` is better than `[sec1]`
2. **Keep sections focused** — Each section should have a clear purpose
3. **Add comments** — Explain what each section does
4. **Include delays in loops** — Use `sleep` to prevent CPU overload
5. **Plan your flow** — Sketch out the logic before coding
6. **Prefer call/return for reusable code** — Subroutines reduce duplication

## Common Pitfalls

### Infinite loop without delay

❌ **Bad:**
```
[loop]
// Do something
goto "loop"
```

✅ **Good:**
```
[loop]
// Do something
sleep 100
goto "loop"
```

### Missing section

❌ **Bad:**
```
[main]
goto "nextStep"
// nextStep section doesn't exist!
```

✅ **Good:**
```
[main]
goto "nextStep"

[nextStep]
// Section exists
```

:::warning Validator catches this
The validator will flag `goto` or `call` with an empty section name as an error. It displays: `"goto" requires a section name`.
:::

### goto/call with empty argument

❌ **Bad:**
```
goto
call
```

✅ **Good:**
```
goto "main"
call "setup"
```

## Next Steps

- [Variables](./variables) — Store and manipulate data
- [Element Properties](./element-properties) — Interact with devices
- [Conditionals](./conditionals) — Make decisions
- [Flow Control](./flow-control) — Loops and timing
