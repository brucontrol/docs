---
id: conditionals
title: Conditionals
sidebar_position: 5
---

# Conditionals (if / elseif / else / endif)

Sometimes you want to do something only when a condition is true. Conditionals let you make decisions in your script — checking sensor readings, comparing values, and branching your logic accordingly.

## Simple if / endif

Check a condition and run code only when it's true:

```
[main]
new value temp
temp = 155
if temp > 150
  print "Temperature is high!"
endif
```

- `if temp > 150` — Check: Is `temp` greater than 150?
- If **yes**, run the line(s) before `endif`
- If **no**, skip to `endif`

## if / else — "Otherwise"

Use `else` when you want to do one thing when the condition is true and something else when it's false:

```
if temp > 150
  print "Too hot"
else
  print "Temperature OK"
endif
```

## if / elseif / else — Multiple conditions

Use `elseif` to check several conditions in order. Only the **first** condition that is true runs; the rest are skipped:

```
if temp > 180
  print "Danger"
elseif temp > 150
  print "Hot"
elseif temp > 100
  print "Warm"
else
  print "Cool"
endif
```

## Comparison Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| `==` | Equal | `if x == 10` |
| `!=` | Not equal | `if x != 0` |
| `>` | Greater than | `if temp > 150` |
| `<` | Less than | `if temp < 32` |
| `>=` | Greater than or equal | `if level >= 50` |
| `<=` | Less than or equal | `if count <= 5` |

:::warning Double equals
For "equal to," use **two** equals signs: `==`. A single `=` is for assignment.
:::

## Boolean Operators (and / or)

Combine conditions with `and` or `or`:

```
if temp > 100 and temp < 200
  print "In range"
endif

if "Pump" State == on or "Valve" State == on
  print "Something is running"
endif
```

You can also use `&&` for `and` and `||` for `or`.

### Parenthesized grouping

When combining `and` and `or` in the same condition, use parentheses to make the grouping explicit:

```
if (temp > 100 or temp < 0) and "Pump" State == off
  print "Out of range and pump is off"
endif
```

Without parentheses, the behavior may not match your intent. Always group sub-expressions when mixing `and` with `or`.

:::danger Mixing AND and OR
Mixing `and` and `or` in the same condition **without parentheses** is a **hard runtime error** — the interpreter will reject the expression, not silently pick an evaluation order. Always use parentheses to make the grouping explicit.
:::

## Comparing Different Types

### Numbers

```
new value x
x = 42
if x > 10
  print "Big number"
endif
```

### Strings

String comparisons work with `==` and `!=`:

```
new string mode
mode = "auto"
if mode == "auto"
  print "Running in auto mode"
endif
```

:::info String comparisons are case-insensitive
Both sides of a string comparison are lowercased before comparison. `if mode == "Auto"` and `if mode == "auto"` produce the same result.
:::

### Booleans

```
if "Pump" State == on
  print "Pump is running"
endif

if "Alarm" Active == true
  print "Alarm triggered!"
endif
```

### Time values

Time comparisons work with all operators:

```
if "Timer 1" Value > 00:05:00
  print "Timer exceeded 5 minutes"
endif

if "Timer 1" Value >= 01:00:00
  stop "Timer 1"
endif
```

### Element properties in conditions

```
if "Temp Probe" Value > 150
  "Heater" State = off
endif

if "Alarm" Active == true
  print "Alarm triggered!"
endif

if "Script 2" state == "Running"
  print "Script 2 is active"
endif
```

## Nested Conditionals

You can put an `if` inside another `if`:

```
[main]
new value v
new value inner
new value result
v = 2
inner = 1
result = 0

if v == 1
  result = 10
elseif v == 2
  if inner == 1
    result = 21
  elseif inner == 2
    result = 22
  else
    result = 23
  endif
else
  result = 99
endif
print result
```

## Indentation

Indent the code inside `if` blocks for readability. The interpreter doesn't require it, but it makes your script easier to follow:

```
if temp > 150
  print "Hot"
  "Heater" State = off
  sleep 1000
endif
```

The editor auto-indents after `if`, `else`, `elseif`, and `while` lines, and auto-outdents after `endif` and `endwhile`.

:::warning elseif not allowed in while blocks
`elseif` cannot be used inside a `while` block. The interpreter throws: **`'elseif' not allowed after 'while'`**. Use separate `if`/`endif` blocks inside `while` loops instead.
:::

## Common Mistakes

### Unclosed blocks

Every `if` needs an `endif`. If you forget it, the validator will report an error at the end of the script.

❌ **Wrong:**
```
if x > 10
  print "big"
// Forgot endif!
```

✅ **Right:**
```
if x > 10
  print "big"
endif
```

:::warning Validator catches unclosed blocks
The validator detects unclosed `if`/`endif` blocks and reports: `Missing 1 "endif" statement(s)` at the end of the script. It also catches unmatched `endif` without a corresponding `if`.
:::

### Single equals instead of double

❌ **Wrong:**
```
if x = 10    // This is assignment, not comparison!
```

✅ **Right:**
```
if x == 10
```

### Complex conditions without parentheses

❌ **Ambiguous:**
```
if temp > 100 or temp < 0 and "Pump" State == off
```

✅ **Clear:**
```
if (temp > 100 or temp < 0) and "Pump" State == off
```

## Next Steps

- [Flow Control](./flow-control) — Loops (while/endwhile) and timing
- [Examples](./examples) — See conditionals in real scripts
