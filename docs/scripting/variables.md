---
id: variables
title: Variables
sidebar_position: 3
---

# Variables

A **variable** is a place to store a value so you can use it later. Variables let you hold sensor readings, count things, and remember numbers or text between steps.

## Creating Variables (new)

Before you can use a variable, you must create it with the `new` statement.

### Syntax

```
new type name
```

Where `type` is the variable type and `name` is the variable name.

## Variable Types

BruControl supports five variable types. You must declare the type when you create a variable.

| Type | What it holds | Example |
|------|----------------|---------|
| **bool** | True or false | `new bool pumpOn` then `pumpOn = true` |
| **value** | Numbers (integers or decimals) | `new value temp` then `temp = 98.6` |
| **time** | Time spans (hh:mm:ss) | `new time duration` then `duration = 01:30:00` |
| **datetime** | Date and time | `new datetime when` then `when = now` |
| **string** | Text | `new string msg` then `msg = "Hello"` |

### Examples

```
new bool flag
flag = true

new value count
count = 0

new time elapsed
elapsed = 00:05:30

new datetime startTime
startTime = now

new string message
message = "Mash complete"
```

:::tip The `now` constant
`now` is a special value that means "the current date and time."
:::

## Assigning Values

Use the equals sign to assign a value to a variable. Spaces on each side are required.

```
new value temperature
temperature = 72
print temperature
```

## Numeric Operations

Numeric variables support arithmetic:

```
new value x
x = 7
x = x + 3    // x is now 10
x = x * 2    // x is now 20
x = x - 5    // x is now 15
x = x / 3    // x is now 5
```

### Shorthand operators

```
x += 3    // Same as x = x + 3
x -= 2    // Same as x = x - 2
x *= 2    // Same as x = x * 2
x /= 2    // Same as x = x / 2
x ^= 2    // Same as x = x ^ 2 (power)
```

## Boolean Constants

Use `true`/`false` or `on`/`off` for boolean values:

```
new bool pumpOn
pumpOn = true
pumpOn = on
```

## Time Literals

Format: `hh:mm:ss` or `hh:mm:ss.fff`

Examples: `00:00:00`, `01:30:00`, `00:05:30`

```
new time duration
duration = 01:30:00
```

## String Operations

### Concatenation

Strings can be combined. Numeric values are converted to text when used inline:

```
new string str
str = "Temp: " + "Temp Probe" Value
```

## Deleting Variables

### delete — Remove one variable

```
delete name
```

Removes the variable from memory.

### clear — Remove all variables

```
clear
```

Removes all variables from memory.

## Using Element Values

Variables can be assigned from element properties:

```
new value sensorReading
sensorReading = "Temp Probe" Value
```

Inline math is supported (one operator per line):

```
new value y
y = "Sensor" Value + 5
```

## Date/Time Operations

### Current date/time

```
new datetime dt
dt = now
```

### Date/time arithmetic

Time values can be added or subtracted from datetime values:

```
new datetime dt
dt = now
dt = dt + 00:10:00
```

## Common Patterns

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

## Best Practices

1. **Use descriptive names** — `temperatureReading` is better than `x`
2. **Initialize variables** — Always set an initial value before use
3. **Clean up when done** — Use `delete` or `clear` to free memory
4. **Choose the right type** — Use the appropriate variable type for your data

## Next Steps

- [Element Properties](./element-properties) — Read and write element values
- [Conditionals](./conditionals) — Make decisions based on variable values
- [Examples](./examples) — See variables in action
