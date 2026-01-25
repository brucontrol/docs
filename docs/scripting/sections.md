---
id: sections
title: Sections and Flow Control
sidebar_position: 3
---

# Sections and Flow Control

## Sections

Code is grouped into named sections. A section heading is declared using square braces. A 'goto' statement is used to jump execution to a specific section.

### Syntax

```
[sectionname]
```

Where `sectionname` is the name of the section.

```
goto "sectionname"
```

Where `sectionname` is the name of the section to jump to.

### Example

```
[main]
// Your code here
"Pump" State = on
sleep 5000
goto "nextStep"

[nextStep]
"Pump" State = off
goto "main"
```

### Section Names with Spaces

If your section name contains spaces, you must use quotes in the goto statement:

```
[sub 1]
// Your code here

[main]
goto "sub 1"
```

## Execution Delays

The `sleep` statement tells the interpreter to pause for a given period of time, in milliseconds.

### Why Use Delays?

Delays often need to be added to Script code to:

- Allow physical devices time to respond
- Allow associated processes time to complete
- Allow human interaction time
- Prevent the host computer's CPU from racing and using bandwidth needlessly
- Control loop execution rates

:::tip Best Practice
It is good practice to include execution delays whenever a script does not need to run at a faster speed. Always include delays in loops to prevent CPU overload.
:::

### Syntax

```
sleep time
```

Where `time` is a number in milliseconds.

### Examples

```
// Delay for 1 second
sleep 1000

// Delay for 5 seconds
sleep 5000

// Delay for 100 milliseconds
sleep 100
```

### Common Delay Patterns

#### Simple Loop with Delay

```
[main]
// Your code here
sleep 1000                    // delay 1000 milliseconds (1 second)
goto "main"                   // go back to main
```

#### Sequential Operations

```
[start]
"Valve1" State = on
sleep 2000                    // Wait 2 seconds for valve to open

"Pump" State = on
sleep 30000                   // Run pump for 30 seconds

"Pump" State = off
sleep 1000                    // Wait 1 second

"Valve1" State = off
```

## Comments and Formatting

Comments can be used to annotate Scripts, so a description or note can be placed for documentation.

### Syntax

```
// comment
```

Where `comment` is text which is ignored by the interpreter.

### Example

```
[main]                        // section named main
// Your code here
goto "main"                   // go to section named main

[sub 1]                       // next section
// Your code here
goto "sub 1"                  // go to section named sub 1
```

### Formatting Best Practices

#### Use Blank Lines

Blank lines can be implemented to separate Script areas for readability:

```
[initialization]
"Pump" State = off
"Heater" State = off
"Valve" State = closed

[main]
// Main process loop
"Pump" State = on
sleep 5000
goto "main"
```

#### Use Indentation

Text may be indented to indicate something conditional or to improve readability:

```
[loop]
if "Temperature" Value > 170
    "Heater" State = off
    sleep 1000
endif

sleep 500
goto "loop"
```

#### Use Descriptive Comments

```
// This script section handles fluid filling of the first vessel
[fillVessel]
"FillValve" State = open      // Open the fill valve
sleep 1000                    // Wait for valve to fully open

// Monitor level while filling
[monitorFill]
if "LevelSensor" Value > 50   // Check if vessel is 50% full
    goto "stopFilling"
endif
sleep 500
goto "monitorFill"

[stopFilling]
"FillValve" State = closed    // Close the fill valve
```

## Script Organization

### Main Loop Pattern

```
[initialize]
// Set initial states
"Pump" State = off
"Heater" State = off

[main]
// Main process logic
// Your code here
sleep 1000
goto "main"
```

### State Machine Pattern

```
[idle]
// Wait for start condition
if "StartButton" State = on
    goto "running"
endif
sleep 500
goto "idle"

[running]
// Process is running
"Pump" State = on
if "StopButton" State = on
    goto "stopping"
endif
sleep 500
goto "running"

[stopping]
// Shutdown sequence
"Pump" State = off
sleep 2000
goto "idle"
```

### Subroutine Pattern

```
[main]
// Do something
goto "subroutine1"

[afterSub1]
// Do something else
goto "subroutine2"

[afterSub2]
// Continue
goto "main"

[subroutine1]
// Perform task 1
goto "afterSub1"

[subroutine2]
// Perform task 2
goto "afterSub2"
```

## Flow Control Best Practices

1. **Use descriptive section names** - `[fillVessel]` is better than `[sec1]`
2. **Keep sections focused** - Each section should have a clear purpose
3. **Add comments** - Explain what each section does
4. **Use consistent naming** - Choose a naming convention and stick to it
5. **Avoid deep nesting** - Keep logic simple and readable
6. **Include delays in loops** - Prevent CPU overload
7. **Plan your flow** - Sketch out the logic before coding

## Common Pitfalls

### Infinite Loop Without Delay

❌ **Bad:**
```
[loop]
// Do something
goto "loop"                   // No delay - will consume CPU!
```

✅ **Good:**
```
[loop]
// Do something
sleep 100                     // Always include a delay in loops
goto "loop"
```

### Missing Section

❌ **Bad:**
```
[main]
goto "nextStep"               // nextStep section doesn't exist!
```

✅ **Good:**
```
[main]
goto "nextStep"

[nextStep]
// Section exists
```

## Next Steps

- [Variables](./variables) - Store and manipulate data
- [Conditional Logic](./conditionals) - Make decisions in your scripts
- [Element Properties](./element-properties) - Interact with devices
- [Script Examples](./examples) - See complete working examples
