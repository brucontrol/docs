---
id: variables
title: Variables
sidebar_position: 2
---

# Variables

The scripting interpreter provides support for the following types of variables.

## Variable Types

| Type | Description | Example |
|------|-------------|---------|
| **value** | A numeric value, which can be an integer or decimal | `23`, `45.67`, `-10.5` |
| **time** | A time value, which represents a span of time | `hh:mm:ss` format |
| **datetime** | A date and time value, which represents a point in time | Full date and time |
| **bool** | A boolean value, which can be either true or false | `true`, `false` |
| **string** | A character string, which can be any text, marked in quotes | `"Hello World"` |

## Declaring Variables

Before a variable can be used, it must be declared using the `new` statement.

### Syntax

```
new type name
```

Where:
- `type` is the variable type (value, time, datetime, bool, string)
- `name` is the name of the variable

### Example

```
new value x
new time t
new datetime dt
new bool b
new string s
```

## Variable Naming Rules

:::info Case Insensitive
Variables do not follow capitalization. For example, 'Variable', 'variable', and 'VARIABLE' will refer to the same variable in the interpreter.
:::

**Rules:**
- Variable names must contain only letters and numbers
- No spaces or special characters
- Case insensitive

## Assigning Values

Assignments require an equals sign, separated by spaces on each side.

### Syntax

```
name = value
```

### Examples

```
new value x
new time t
new datetime dt
new bool b
new string s

x = 23
t = 00:00:10
dt = "03-18-2018 09:00:00 PM"
b = true
s = "Hello World"
```

## Deleting Variables

### Delete a Specific Variable

```
delete name
```

Where `name` is the variable to be removed from interpreter memory.

### Clear All Variables

```
clear
```

Removes all variables from the interpreter memory.

## Numeric Operations

Numeric variables can be manipulated using simple arithmetic math functions.

### Basic Operations

```
new value x
x = 7          // the value of x is now 7
x = x + 3      // the value of x is now 10
x = x * 2      // the value of x is now 20
x = x - 5      // the value of x is now 15
x = x / 3      // the value of x is now 5
```

### Concise Operations

```
new value x
x = 7          // the value of x is now 7
x += 3         // the value of x is now 10... equivalent of x = x + 3
x *= 2         // the value of x is now 20... equivalent of x = x * 2
x -= 5         // the value of x is now 15... equivalent of x = x - 5
x /= 3         // the value of x is now 5... equivalent of x = x / 3
```

## Using Element Values

Variables can be assigned to Element values. Single inline mathematics are available (one operator only per line).

### Syntax

```
variable = "ElementName" Property
variable = "ElementName" Property + value
variable = value + "ElementName" Property
```

### Examples

```
new value x
new value y
new value z

x = "Sensor" Value                    // x is now the value of element Sensor
y = x + 5                             // y is now 5 more than x
z = 10 + "Level" Value                // z is now 10 more than the value of Level
```

:::note Inline Mathematics
Inline mathematics applies to element properties, but will be ignored for 'if' or 'wait' statement evaluations.
:::

## String Operations

### String Concatenation

Mathematic concatenation of strings is available. Note that numeric values will be converted to text if used inline.

```
new string str
str = "Temp: " + "Vessel Temp" Value
```

### Multi-line Strings

Strings can use newline codes (`\n`) to induce a line return.

```
new string str
str = "First Line\nSecond Line"
```

This will cause text to span multiple lines once displayed via an Inspector.

## Date/Time Operations

### Current Date/Time

The `now` date/time variable is intrinsic to BruControl and can be used to reflect the date & time at that moment.

```
new datetime dt
dt = now                              // store current time & date from intrinsic 'now' variable
```

### Date/Time Arithmetic

Time variable values can be added or subtracted from Date/time values to create different moments in time.

```
new datetime dt
dt = now                              // store current time
dt = dt + "00:10:00"                  // add 10 minutes to the variable's time
```

### Date/Time Comparison

Date/time values can be used for comparison.

```
new datetime dt

[timecheck]
dt = now
print dt

if dt > "09:00:00 PM"
    goto "nextstep"
endif

sleep 5000
goto "timecheck"

[nextstep]
// Continue with next steps
```

## Common Variable Patterns

### Counter

```
new value counter
counter = 0

[loop]
counter += 1
print counter
sleep 1000
goto "loop"
```

### Accumulator

```
new value total
new value reading
total = 0

[accumulate]
reading = "Sensor" Value
total += reading
print "Total: " + total
sleep 5000
goto "accumulate"
```

### Timer

```
new datetime startTime
new datetime currentTime
new time elapsed

startTime = now

[checkTime]
currentTime = now
elapsed = currentTime - startTime
print "Elapsed: " + elapsed

if elapsed > "00:05:00"              // 5 minutes
    goto "timeout"
endif

sleep 1000
goto "checkTime"

[timeout]
print "Timer expired!"
```

## Best Practices

1. **Use descriptive names** - `temperatureReading` is better than `x`
2. **Initialize variables** - Always set an initial value
3. **Clean up** - Delete variables when no longer needed to free memory
4. **Comment your code** - Explain what variables are used for
5. **Group related variables** - Declare related variables together
6. **Use appropriate types** - Choose the right variable type for your data

## Next Steps

- [Element Properties](./element-properties) - Learn how to interact with elements
- [Conditional Logic](./conditionals) - Make decisions based on variable values
- [Script Examples](./examples) - See variables in action
