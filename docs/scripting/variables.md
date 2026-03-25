---
id: variables
title: Variables
sidebar_position: 3
---

# Variables

A **variable** is a place to store a value so you can use it later. Variables let you hold sensor readings, count things, remember numbers or text between steps, and build complex logic.

## Creating Variables (new)

Before you can use a variable, you must create it with the `new` statement.

### Syntax

```
new type name
```

Where `type` is the variable type and `name` is the variable name.

:::info Variable names are case-insensitive
Variable names are **silently lowercased** on creation. `new value MyTemp` and `new value mytemp` create the same variable. This is different from element names, which are case-sensitive.
:::

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

## Variable Scope

Variables are **global to the script** they're declared in. Once created, a variable is available in every section of that script — it persists across `goto` and `call` jumps. Variables are **not** shared between scripts; each Process element has its own variable space.

:::info Redeclaration
If you execute `new value x` when a variable named `x` already exists, the existing variable is replaced with a fresh one of the new type. Avoid redeclaring variables unintentionally.
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
x = x ^ 2    // x is now 25 (power)
```

### Arithmetic operators

| Operator | Meaning | Example |
|----------|---------|---------|
| `+` | Addition | `x = x + 3` |
| `-` | Subtraction | `x = x - 2` |
| `*` | Multiplication | `x = x * 2` |
| `/` | Division | `x = x / 3` |
| `^` | Power (exponentiation) | `x = x ^ 2` |

### Shorthand operators

```
x += 3    // Same as x = x + 3
x -= 2    // Same as x = x - 2
x *= 2    // Same as x = x * 2
x /= 2    // Same as x = x / 2
x ^= 2    // Same as x = x ^ 2 (power)
```

### Parenthesized expressions

You can use parentheses to group sub-expressions:

```
new value y
y = (2 + 3) * 4       // y is 20
y = (x + 3) * 2       // groups addition before multiplication
y = (x ^ 2) + 1       // power first, then add
```

:::info One operator per line (without parentheses)
Without parentheses, each line supports one arithmetic operation. Use parenthesized expressions or intermediate variables for complex calculations:

```
// Using parentheses
y = (x + 3) * 2

// Using intermediate variables
new value temp
temp = x + 3
y = temp * 2
```
:::

## Boolean Constants

Use `true`/`false` or `on`/`off` for boolean values:

```
new bool pumpOn
pumpOn = true
pumpOn = on      // same as true
pumpOn = false
pumpOn = off     // same as false
```

### Boolean from expression

You can assign a boolean expression to a bool variable:

```
new bool isHot
new value temp
temp = 155
isHot = temp > 150              // isHot is true
isHot = temp > 100 and temp < 200  // compound expression
```

The right side is evaluated as a boolean expression; the result is assigned to the variable. See [Conditionals](./conditionals) for more on boolean operators.

## Time Literals

Format: `hh:mm:ss` or `hh:mm:ss.fff`

Examples: `00:00:00`, `01:30:00`, `00:05:30`

```
new time duration
duration = 01:30:00
```

## DateTime Literals

DateTime values can be assigned from `now` or from a string literal in ISO 8601 format (`"yyyy-MM-ddTHH:mm:ss"`):

```
new datetime dt
dt = now
dt = "2024-03-18T21:00:00"
```

:::info Legacy format
The legacy format `"MM-DD-YYYY hh:mm:ss AM/PM"` (e.g., `"03-18-2024 09:00:00 PM"`) may still parse on US-locale systems, but ISO 8601 is the canonical format and should be preferred.
:::

## String Operations

### Concatenation

Strings can be combined with `+`. Numeric values are converted to text when concatenated:

```
new string str
str = "Temp: " + "Temp Probe" Value
print str
```

### The @ prefix

If a string value might match an element name, use the `@` prefix to tell BruControl to treat it as a literal string, not an element reference:

```
new string name
name = @Hello        // literal string "Hello", even if an element named "Hello" exists
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

Inline math with element values is supported:

```
new value y
y = "Sensor" Value + 5
y = "Sensor" Value * 2
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
dt = dt + 00:10:00    // add 10 minutes
```

### Time arithmetic

```
new time t
t = 01:00:00
t = t + 00:30:00     // t is now 01:30:00
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

### Temperature conversion

```
new value celsius
new value fahrenheit
celsius = "Temp Probe" Value
fahrenheit = (celsius * 9 / 5) + 32
print "Temp: " + fahrenheit + "°F"
```

### Elapsed time tracking

```
new datetime startTime
new datetime currentTime
startTime = now

[loop]
currentTime = now
print "Started at: " + startTime
sleep 5000
goto "loop"
```

## Best Practices

1. **Use descriptive names** — `temperatureReading` is better than `x`
2. **Initialize variables** — Always set an initial value before use
3. **Clean up when done** — Use `delete` or `clear` to free memory
4. **Choose the right type** — Use the appropriate variable type for your data
5. **Avoid redeclaration** — Don't `new` a variable that already exists unless you intend to reset it

## Display Formatting Sub-Properties

Numeric variables have sub-properties that control how their values are displayed:

| Sub-property | Description |
|--------------|-------------|
| `precision` | Number of decimal places shown when the variable is displayed |
| `format` | Display format string used for rendering the value |

These are accessible for display formatting purposes and behave similarly to the `Precision` property on Global Variable elements.

## Tips and Gotchas

:::warning Type mismatch
The validator will flag assignments where the value doesn't match the variable type. For example, assigning a time literal to a `value` variable produces: `Type mismatch: cannot assign "01:00:00" to value variable "x". Expected: a number or expression`.
:::

:::tip IntelliSense for variables
After declaring a variable, the editor's IntelliSense will suggest it when you start typing its name. Variable suggestions show the type and declaration line.
:::

## Next Steps

- [Element Properties](./element-properties) — Read and write element values
- [Conditionals](./conditionals) — Make decisions based on variable values
- [Examples](./examples) — See variables in action
