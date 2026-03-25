---
id: syntax-reference
title: Syntax Reference
sidebar_position: 8
---

# BruControl Language Syntax Reference

Formal reference for all commands, types, operators, and syntax.

## Comments

```
// This is a line comment. Everything after // on a line is ignored.
```

## Sections

```
[section_name]
```

- Section headers use square brackets
- Execution starts at the first section (by file order); `[main]` is the conventional entry point
- Sections are targets for `goto` and `call`
- Section names can include spaces: `[heating phase]`
- Section names are **case-sensitive**. `goto "Main"` will NOT find a section declared as `[main]`.

## Variable Types

| Type | Declaration | Description | Example value |
|------|-------------|-------------|---------------|
| bool | `new bool name` | Boolean (true/false, on/off) | `true`, `off` |
| value | `new value name` | Numeric (integer or decimal) | `42`, `98.6` |
| time | `new time name` | Time span (hh:mm:ss) | `01:30:00` |
| datetime | `new datetime name` | Date and time | `now`, `"2024-03-18T21:00:00"` |
| string | `new string name` | Text string | `"Hello World"` |

## Commands

### Variable management

| Command | Syntax | Description |
|---------|--------|-------------|
| new | `new type name` | Declare a new variable |
| delete | `delete name` | Remove a variable from memory |
| clear | `clear` | Remove all variables |

### Flow control

| Command | Syntax | Description |
|---------|--------|-------------|
| goto | `goto "section"` or `goto section` | Jump to section (no return) |
| call | `call "section"` or `call section` | Call subroutine (returns after return) |
| return | `return` | Return from subroutine |

### Conditionals and loops

| Command | Syntax | Description |
|---------|--------|-------------|
| if | `if condition` | Start conditional block |
| elseif | `elseif condition` | Alternative branch |
| else | `else` | Default branch |
| endif | `endif` | End if block |
| while | `while condition` | Loop while true |
| endwhile | `endwhile` | End while block |

### Timing

| Command | Syntax | Description |
|---------|--------|-------------|
| sleep | `sleep milliseconds` | Pause for fixed time |
| wait | `wait "Element" Property op value [timeout]` | Pause until condition or timeout (element form) |
| wait | `wait variable op value [timeout]` | Pause until condition or timeout (variable form) |

**Wait operators:** `==`, `!=`, `>`, `<`, `>=`, `<=`

### Script/Timer control

| Command | Syntax | Supported elements |
|---------|--------|--------------------|
| start | `start "Element"` | Timer, Process |
| stop | `stop "Element"` | Timer, Process |
| pause | `pause "Script"` | Process |
| resume | `resume "Script"` | Process |
| reset | `reset "Element"` | Timer, Process |
| restart | `restart "Element"` | Timer, Process |
| load | `load "Script"` | Process |

### Output

| Command | Syntax | Description |
|---------|--------|-------------|
| print | `print value` | Output value to script output panel |
| display | `display "Interface" line text` | Send to LCD: interface name, line number, optional text or element value. Text cannot contain: `/!?$,;` |

**Display examples:**
```
display "MEGA" 1 "Hello"
display "MEGA" 1 "Temp Probe" Value
display "MEGA" 2 myVariable
```

### Device sync

| Command | Syntax | Description |
|---------|--------|-------------|
| sync | `sync "Element"` | Force device sync (must be a device element) |
| autosync | `autosync on` or `autosync off` | Enable/disable automatic sync |
| estop | `estop` | Disable all enabled ports on all connected devices |

### Workspace

| Command | Syntax | Description |
|---------|--------|-------------|
| show | `show workspace "Name"` or `show workspace index` | Show workspace |
| hide | `hide workspace "Name"` or `hide workspace index` | Hide workspace |
| reveal | `reveal workspace "Name"` or `reveal workspace index` | Reveal workspace |

:::info Workspace indices are 1-indexed
When using numeric indices, they start at **1**, not 0. `show workspace 1` shows the first workspace.
:::

### Webhooks

| Command | Syntax | Description |
|---------|--------|-------------|
| webhook | `webhook "Name" [key=value ...]` | Call a named webhook defined in Settings → Webhooks |

The `webhook` command looks up a webhook definition by name, substitutes any `key=value` parameters into the body template's `{{placeholder}}` fields, and enqueues the HTTP request for background delivery.

**Webhook examples:**
```
webhook "SlackAlert" message="Temp is high"
webhook "NtfyAlert" title="Alert" message="Fermenter hit 78°F" priority=4
webhook "DiscordHook"
```

Parameter values must be simple literals or single-token variable names:

```
webhook "TempLog" temperature=72.5
webhook "TempLog" temperature=myVar
```

:::warning Element references as parameter values
Multi-token element references like `"Boil Temp" Value` cannot be used directly as webhook parameter values — the tokenizer cannot parse them in that position. Read the element value into a variable first, then pass the variable:

```
new value temp
temp = "Boil Temp" Value
webhook "TempLog" temperature=temp
```
:::

:::info Webhook setup
Webhooks must be defined in **Settings → Webhooks** before calling them from a script. Only HTTPS URLs are allowed. See [Webhook API](../api/misc-apis#webhooks-webhookcontroller) for REST management.
:::

### Direct commands

| Command | Syntax | Description |
|---------|--------|-------------|
| tx | `tx "Interface" command` | Transmit raw command to interface |
| exec | `exec "command"` | Reserved — not yet implemented in the current interpreter |

:::warning exec command
The `exec` command is **reserved** and is **not yet implemented** in the current interpreter. It appears in the keyword list for forward-compatibility but will produce no effect or an error if used. Do not rely on it in scripts.
:::

## Arithmetic Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| `+` | Addition | `x = x + 3` |
| `-` | Subtraction | `x = x - 2` |
| `*` | Multiplication | `x = x * 2` |
| `/` | Division | `x = x / 3` |
| `^` | Power (exponentiation) | `x = x ^ 2` |

## Assignment Operators

| Operator | Example | Effect |
|----------|---------|--------|
| `=` | `x = 5` | Assign |
| `+=` | `x += 3` | Add and assign |
| `-=` | `x -= 2` | Subtract and assign |
| `*=` | `x *= 2` | Multiply and assign |
| `/=` | `x /= 2` | Divide and assign |
| `^=` | `x ^= 2` | Power and assign |

## Comparison Operators

| Operator | Meaning |
|----------|---------|
| `==` | Equal |
| `!=` | Not equal |
| `>` | Greater than |
| `<` | Less than |
| `>=` | Greater than or equal |
| `<=` | Less than or equal |

## Boolean Operators

| Operator | Meaning |
|----------|---------|
| `and`, `&&` | Logical AND |
| `or`, `\|\|` | Logical OR |

:::danger Mixing AND and OR
Mixing `and` and `or` in the same expression **without parentheses** is a **hard runtime error**, not merely ambiguous. The interpreter will reject the expression. Always use parentheses to group sub-expressions when combining `and` with `or`.
:::

## Parenthesized Expressions

Parentheses group sub-expressions in both arithmetic and boolean contexts:

```
// Arithmetic
y = (x + 3) * 2
y = (a ^ 2) + (b ^ 2)

// Boolean (conditionals)
if (temp > 100 or temp < 0) and "Pump" State == off
```

:::info One operator per line
Without parentheses, each line supports one arithmetic operation. Use parentheses to combine multiple operations on a single line.
:::

## Constants

| Constant | Type | Meaning |
|----------|------|---------|
| `true`, `on` | bool | Boolean true |
| `false`, `off` | bool | Boolean false |
| `now` | datetime | Current date/time |

## Element Reference Syntax

### Read

```
"ElementName" Property
```

Example: `"Temp Probe" Value`

### Write

```
"ElementName" Property = value
```

Example: `"Pump" State = on`

### In expressions

```
new value temp
temp = "Temp Probe" Value
if "Alarm" Active == true
  ...
endif
```

## Visibility Values

The `Visibility` property accepts these values:

| Value | Meaning |
|-------|---------|
| `default` | Use the element's default visibility |
| `visible` | Element is always visible |
| `hidden` | Element is hidden (can be shown by script) |
| `hiddenlocked` | Element is hidden and locked (cannot be shown by user) |

```
"Element" Visibility = hidden
"Element" Visibility = visible
```

## Time Literals

Format: `hh:mm:ss` or `hh:mm:ss.fff`

Examples: `00:00:00`, `01:30:00`, `00:05:30`

## DateTime Literals

Canonical format (ISO 8601): `"yyyy-MM-ddTHH:mm:ss"`

Example: `"2024-03-18T21:00:00"`

Or use the `now` keyword for the current date and time.

:::info Legacy format
The legacy format `"MM-DD-YYYY hh:mm:ss AM/PM"` (e.g., `"03-18-2024 09:00:00 PM"`) may still parse on US-locale systems, but ISO 8601 is the canonical format and should be preferred for portability.
:::

## String Literals

Use double quotes: `"Hello World"`

### The @ prefix

For literal strings that might match element names, use `@` prefix to prevent element resolution:

```
new string name
name = @Hello        // literal string, not element reference
```

## Boolean Variable from Expression

```
new bool flag
flag = x > 5 and y < 10
```

The right side is evaluated as a boolean expression; the result is assigned to the variable.

## Validation Rules

The built-in validator checks for these errors as you type:

| Rule | Error message |
|------|---------------|
| Unknown command | `Unknown command "xyz"` |
| Unclosed if/endif | `Missing N "endif" statement(s)` |
| Unmatched endif | `Unexpected "endif" without matching "if"` |
| Unclosed while/endwhile | `Missing N "endwhile" statement(s)` |
| Unmatched endwhile | `Unexpected "endwhile" without matching "while"` |
| goto/call without section | `"goto" requires a section name` |
| Element command without quotes | `"start" requires an element name in quotes` |
| Unclosed string | `Unclosed string: missing closing quote` |
| Type mismatch | `Type mismatch: cannot assign "..." to type variable "name"` |
| Invalid new syntax | `Invalid "new" syntax. Expected: new <type> <varname>` |

## Getting Help

### IntelliSense (Ctrl+Space)

Press **Ctrl+Space** in the editor to see suggestions:

- After `new ` — Variable types (bool, value, time, datetime, string)
- After `goto ` or `call ` — Section names from the current script
- After `start `, `stop `, etc. — Timer and script element names
- After `"ElementName" ` — Properties for that element type
- Inside quotes — Element names (filtered by command context)
- After `"Element" Property = ` — Value suggestions appropriate for the property type

### Hover tooltips

Hover the mouse over a keyword, element name, or property to see a short description with syntax and examples.

## Complete Keyword List

All keywords recognized by the BruControl scripting language:

| Category | Keywords |
|----------|----------|
| Variable management | `new`, `delete`, `clear` |
| Variable types | `bool`, `value`, `time`, `datetime`, `string` |
| Flow control | `goto`, `call`, `return` |
| Conditionals | `if`, `else`, `elseif`, `endif`, `while`, `endwhile` |
| Timing | `wait`, `sleep` |
| Script/Timer control | `start`, `stop`, `pause`, `resume`, `reset`, `restart`, `load` |
| Output | `print`, `display` |
| Device sync | `sync`, `autosync`, `estop` |
| Webhooks | `webhook` |
| Workspace | `show`, `hide`, `reveal` |
| Direct | `tx`, `exec` |
| Boolean constants | `true`, `false`, `on`, `off` |
| Special | `now`, `workspace` |

## Related Pages

- [Introduction](./introduction) — Script basics
- [Sections](./sections) — Sections, goto, call
- [Variables](./variables) — Variable types and operations
- [Element Properties](./element-properties) — Reading and writing elements
- [Conditionals](./conditionals) — if/elseif/else/endif
- [Flow Control](./flow-control) — Loops, timing, subroutines
- [Examples](./examples) — Copy-paste examples
