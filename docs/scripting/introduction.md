---
id: introduction
title: Introduction to Scripting
sidebar_position: 1
---

# BruControl Scripting Language — Introduction

Welcome! This guide teaches you the BruControl scripting language from scratch. No prior programming experience needed.

## What Is a Script?

A **script** is a list of instructions your system follows automatically. Think of it like a **recipe** or **checklist**:

1. Turn on the pump
2. Wait until the temperature reaches 150°F
3. Turn off the pump
4. Start a 30-minute timer

You write the steps once; BruControl runs them for you. Scripts can control pumps, valves, heaters, timers, and other elements in your setup.

## Your First Script

Let's run the simplest possible script.

**Type this in your script editor:**

```
[main]
print "Hello, BruControl!"
```

**What it does:**

- `[main]` — Labels this section "main." Every script needs at least one section; execution starts at the first section with statements (by convention, use `[main]` as your entry point)
- `print "Hello, BruControl!"` — Sends that text to the script output

**To run it:** Click **Start** (or **Run**). You should see "Hello, BruControl!" in the output panel.

:::tip Text in quotes
Text in quotes is a **string** — a sequence of characters. The quotes tell BruControl where the text starts and ends.
:::

## Basic Script Structure

Scripts are organized into **sections** — blocks of code with names in brackets. Execution begins at the first section with statements; by convention, use `[main]` as your entry point. Here's a slightly more complete example:

```
[main]
// This is a comment
"Pump" State = on
sleep 5000
"Pump" State = off
goto "main"
```

- `//` — Everything after `//` on a line is ignored (a comment)
- `"Pump" State = on` — Turns the pump on
- `sleep 5000` — Pauses for 5000 milliseconds (5 seconds)
- `goto "main"` — Jumps back to the start of `[main]`

## Syntax Rules

### Spaces Matter

Unlike some languages, **spaces are not ignored** by the interpreter. Statements often require a single space to separate their parts. For example, `goto "main"` needs spaces between the command, the quotes, and the section name.

### Quotes

When quotes are required, use **double quotes** (straight apostrophes), not curly quotation marks.

- ✅ Correct: `"element"`
- ❌ Incorrect: `"element"` (curly quotes)

:::warning Third-party editors
If using a word processor or external editor, it may default to curly quotes. Convert them to straight double quotes before pasting into BruControl.
:::

### Element Names

Element names are **case-sensitive**. `"DigitalOut"` is not the same as `"digitalout"`. Use the editor's IntelliSense (Ctrl+Space) to pick the correct name and avoid typos.

:::tip Device element naming
Since device elements can address the same physical device, include the control type in the name for clarity. For example, use "Boil Kettle PID" rather than "Boil Kettle".
:::

## What You Can Do With Scripts

BruControl scripts allow you to:

- **Control devices** — Turn on/off, set values, adjust parameters
- **Monitor conditions** — Read sensor values, check states
- **Automate processes** — Create sequential operations
- **Make decisions** — Use if/then/else logic
- **Handle timing** — Delays, waits, timers
- **Manage data** — Variables, calculations, data storage
- **Coordinate systems** — Multiple concurrent scripts
- **Respond to events** — Alarms, buttons, conditions

## Script Execution

Scripts can be:

- **Run** — Execute from the beginning or current position
- **Paused** — Temporarily stop execution
- **Stepped** — Execute one line at a time for debugging
- **Started at different positions** — Jump to specific sections

## Editor Features

The script editor supports basic editing commands:

| Command | Function |
|---------|----------|
| Ctrl+C | Copy |
| Ctrl+X | Cut |
| Ctrl+V | Paste |
| Ctrl+Z | Undo |
| Ctrl+F | Find |
| Ctrl+H | Find & Replace |
| Ctrl+Space | IntelliSense (suggestions) |

:::tip Keyboard recommended
It is recommended to edit scripts using a keyboard-based computer for ease of writing, speed, and manipulation.
:::

## Next Steps

Learn about the specific features of the scripting language:

- [Sections](./sections) — Organize code with sections, goto, and call
- [Variables](./variables) — Store and manipulate data
- [Element Properties](./element-properties) — Interact with devices and elements
- [Conditionals](./conditionals) — Make decisions in your scripts
- [Flow Control](./flow-control) — Loops, subroutines, and timing
- [Examples](./examples) — Real-world automation examples
- [Syntax Reference](./syntax-reference) — Complete language reference
