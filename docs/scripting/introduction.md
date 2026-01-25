---
id: introduction
title: Introduction to Scripting
sidebar_position: 1
---

# BruControl Script Language

## Introduction

This section provides information about the scripting language used in BruControl. Scripts are sections of specific syntax text, and are editable like a simple text editor. Each Script is executed in sequential line order by the BruControl interpreter.

:::tip Keyboard Recommended
It is recommended to edit Scripts using a keyboard-based computer for ease of writing, speed, and manipulation.
:::

## Text Editor Features

The text editor supports basic editing control commands:

| Command | Function |
|---------|----------|
| `CTRL+C` | Copy |
| `CTRL+X` | Cut |
| `CTRL+V` | Paste |
| `CTRL+Z` | Undo |
| `CTRL+F` | Find |
| `CTRL+H` | Find & Replace |

## Name Convention and Syntax

### Element Naming

Elements must not have duplicate names, otherwise the interpreter may confuse one element with another. Elements may be named with text, spaces, numbers, etc. to differentiate.

:::tip Device Element Naming
Since Device Elements can address the same device, it is recommended that the type of control be included in the name for clarity. For example, use "Boil Kettle PID" rather than "Boil Kettle".
:::

### Syntax Rules

#### Spaces Matter

Unlike structured or compiled languages, **spaces are not ignored** by the interpreter. Therefore, the syntax of the statements often require a single space to separate their properties, as demonstrated in the examples below.

#### Capitalization

- **Element names** - Capitalization is followed with respect to Element names only
  - "DigitalOut" is NOT the same as "digitalout"
- **Statements, properties, and variables** - Do not require or follow capitalization
  - 'stop', 'Stop', or 'STOP' are all evaluated equally

#### Quotes

When quotes are required for appropriate syntax in scripts, they must be **double apostrophe format**, not quotation mark formats.

- ✅ Correct: `"element"`
- ❌ Incorrect: `"element"` (curly quotes)

:::warning Third-Party Editors
If using a third-party word processor or editor to write scripts, note it may default to quotation marks rather than double apostrophe formats, in which case they will need to be converted.
:::

## Basic Script Structure

Scripts are organized into sections and use simple control flow statements. Here's a basic example:

```
[main]
// This is a comment
"Pump" State = on
sleep 5000
"Pump" State = off
goto "main"
```

## What You Can Do With Scripts

BruControl scripts allow you to:

- **Control devices** - Turn on/off, set values, adjust parameters
- **Monitor conditions** - Read sensor values, check states
- **Automate processes** - Create sequential operations
- **Make decisions** - Use if/then/else logic
- **Handle timing** - Delays, waits, timers
- **Manage data** - Variables, calculations, data storage
- **Coordinate systems** - Multiple concurrent scripts
- **Respond to events** - Alarms, buttons, conditions

## Script Execution

Scripts can be:

- **Run** - Execute from the beginning or current position
- **Paused** - Temporarily stop execution
- **Stepped** - Execute one line at a time for debugging
- **Started at different positions** - Jump to specific sections

## Next Steps

Learn about the specific features of the scripting language:

- [Sections and Flow Control](./sections) - Organize and control script execution
- [Variables](./variables) - Store and manipulate data
- [Element Properties](./element-properties) - Interact with devices and elements
- [Conditional Logic](./conditionals) - Make decisions in your scripts
- [Script Examples](./examples) - Real-world automation examples
