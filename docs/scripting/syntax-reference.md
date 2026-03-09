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
- Execution starts at `[main]` (or the first section if none named main)
- Sections are targets for `goto` and `call`
- Section names can include spaces: `[heating phase]`

## Variable Types

| Type | Declaration | Description |
|------|-------------|-------------|
| bool | `new bool name` | Boolean (true/false, on/off) |
| value | `new value name` | Numeric (integer or decimal) |
| time | `new time name` | Time span (hh:mm:ss) |
| datetime | `new datetime name` | Date and time |
| string | `new string name` | Text string |

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
| wait | `wait "Element" Property op value [timeout]` | Pause until condition or timeout |

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
| print | `print value` | Output value to script output |
| display | `display "Device" line [variable or element]` | Send to device LCD: device name, line number; optional variable or element (omit to clear line). Display text cannot contain: `/!?$,;` |

### Device sync

| Command | Syntax | Description |
|---------|--------|-------------|
| sync | `sync "Element"` | Force device sync (Element must be a device element) |
| autosync | `autosync on` or `autosync off` | Enable/disable auto sync |

### Workspace

| Command | Syntax | Description |
|---------|--------|-------------|
| show | `show workspace "Name"` or `show workspace index` | Show workspace |
| hide | `hide workspace "Name"` or `hide workspace index` | Hide workspace |
| reveal | `reveal workspace "Name"` or `reveal workspace index` | Reveal workspace |

### Direct

| Command | Syntax | Description |
|---------|--------|-------------|
| tx | `tx "Interface" command` | Transmit raw command to interface |

## Assignment Operators

| Operator | Example | Effect |
|----------|---------|--------|
| = | `x = 5` | Assign |
| += | `x += 3` | Add and assign |
| -= | `x -= 2` | Subtract and assign |
| *= | `x *= 2` | Multiply and assign |
| /= | `x /= 2` | Divide and assign |
| ^= | `x ^= 2` | Power and assign |

## Comparison Operators

| Operator | Meaning |
|----------|---------|
| == | Equal |
| != | Not equal |
| &gt; | Greater than |
| &lt; | Less than |
| &gt;= | Greater than or equal |
| &lt;= | Less than or equal |

## Boolean Operators

| Operator | Meaning |
|----------|---------|
| and, && | Logical AND |
| or, \|\| | Logical OR |

## Constants

| Constant | Type | Meaning |
|----------|------|---------|
| true, on | bool | Boolean true |
| false, off | bool | Boolean false |
| now | datetime | Current date/time |

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

## Time Literals

Format: `hh:mm:ss` or `hh:mm:ss.fff`

Examples: `00:00:00`, `01:30:00`, `00:05:30`

## String Literals

Use double quotes. For literal strings that might match element names, use `@` prefix (e.g. `@Hello`).

Example: `"Hello World"`

## Boolean Variable from Expression

```
new bool flag
flag = x > 5 and y < 10
```

The right side is evaluated as a boolean expression; the result is assigned to the variable.

## Getting Help

### IntelliSense (Ctrl+Space)

Press **Ctrl+Space** in the editor to see suggestions:

- After `new ` — Variable types
- After `start ` — Timer and script names
- After `"ElementName" ` — Properties for that element
- Inside quotes — Element names

### Hover tooltips

Hover the mouse over a keyword, element name, or property to see a short description.

## Related Pages

- [Introduction](./introduction) — Script basics
- [Sections](./sections) — Sections, goto, call
- [Variables](./variables) — Variable types and operations
- [Element Properties](./element-properties) — Reading and writing elements
- [Conditionals](./conditionals) — if/elseif/else/endif
- [Flow Control](./flow-control) — Loops, timing, subroutines
- [Examples](./examples) — Copy-paste examples
