---
id: conditionals
title: Conditionals
sidebar_position: 5
---

# Conditionals (if / elseif / else / endif)

Sometimes you want to do something only when a condition is true. Conditionals let you make decisions in your script.

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

## Comparison operators

| Operator | Meaning |
|----------|---------|
| == | Equal |
| != | Not equal |
| &gt; | Greater than |
| &lt; | Less than |
| &gt;= | Greater than or equal |
| &lt;= | Less than or equal |

:::warning Double equals
For "equal to," use **two** equals signs: `==`. A single `=` is for assignment.
:::

## Boolean operators (and / or)

Combine conditions with `and` or `or`:

```
if temp > 100 and temp < 200
  print "In range"
endif

if "Pump" State == on or "Valve" State == on
  print "Something is running"
endif
```

You can also use `&&` for and and `||` for or.

:::warning Mixing AND and OR
When combining `and` and `or` in the same condition, use parentheses to group sub-expressions. For example: `if (temp > 100 or temp < 0) and "Pump" State == off`
:::

## Using element properties in conditions

```
if "Temp Probe" Value > 150
  "Heater" State = off
endif

if "Alarm" Active == true
  print "Alarm triggered!"
endif
```

## Nested conditionals

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

## Common mistake: Unclosed blocks

Every `if` needs an `endif`. If you forget it, the script will fail.

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

## Next Steps

- [Flow Control](./flow-control) — Loops (while/endwhile) and timing
- [Examples](./examples) — See conditionals in real scripts
