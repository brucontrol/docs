---
id: profile
title: Profile
sidebar_position: 10
---

# Profile

A **Profile** element implements ramp or step control for automation. It continuously reads a **source** signal (for example, elapsed time from a timer or a temperature) and writes a **destination** property (often a PID **Target** or another setpoint) according to a configurable table of thresholds. Optional **directional** behavior lets the profile apply different destination values when the source is rising versus falling, which is useful for asymmetric mash schedules and staged ramps.

## What It Is

The Profile binds three conceptual pieces: a **source** element and property to observe, a **destination** element and property to update, and a **table** that maps source thresholds to output values. At runtime, BruControl evaluates the current source value, selects the appropriate row (according to your table rules and directional mode), and writes the computed value to the destination. The Dashboard template surfaces **Source**, **Destination**, and **Direction** regions so operators can see what is driving the profile and how it is configured, while still keeping the detailed table editing in the element designer.

## Why It Exists

Profiles excel when the process schedule is easier to express as thresholds than as imperative script logic. **Step mashing** and **multi-rest** brewing workflows are classic examples: as a mash timer advances, the setpoint steps through rest temperatures without a long chain of `if` statements. **Ramp-like** behavior can be approximated by fine-grained table rows or by pairing the profile with a source that moves smoothly (for example, a calculated or simulated ramp). Because the destination is an ordinary element property, downstream control (PID, hysteresis, and so on) reacts automatically when the profile updates the setpoint.

## How to Add

1. In Solution Explorer, right-click a **Workspace** or **Folder**.
2. Choose **Profile**.
3. Configure **Source** (element ID and property name to read) and **Destination** (element ID and property to write).
4. Build the **table** with threshold columns and values; enable **directional** if increasing and decreasing source motion should select different outputs.
5. Optionally attach the **profile** element template and tune **Custom Properties** below so the tile matches your dashboard layout.

## Native Properties

| Property | Type | Description |
|----------|------|-------------|
| `displayName` | string | Name shown in the UI. |
| `name` | string | Internal name (fallback identifier). |
| `sourceId` | string | Element ID for the source. |
| `sourceProperty` | string | Property to read (for example, **Value** on a timer or analog input). |
| `destinationId` | string | Element ID for the destination. |
| `destinationProperty` | string | Property to write (for example, **Target** on a PID). |
| `directional` | boolean | When true, use separate values when the source increases versus decreases. |
| `table` | array | Rows defining thresholds and values; structure matches the designer (including directional columns when enabled). |
| `userControl` | boolean | Allow operator interaction from the Dashboard where applicable. |
| `visibility` | Default \| Visible \| Hidden \| HiddenLocked | When the element appears on the Dashboard. |

## Custom Properties

All names below match the **profile** entry in `ui-controls.json`. Styling uses **color-alpha** fields where noted; empty defaults inherit the theme.

### Layout

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showHeader` | boolean | true | Show the header region. |
| `showBackground` | boolean | true | Show template background and border. |
| `showLabel` | boolean | true | Show the title label in the header. |

### Label (header title)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `labelFontFamily` | text | — | Font family for the header label. |
| `labelFontSize` | number | 12 | Label size (8–48). |
| `labelFontWeight` | text | — | Font weight. |
| `labelFontStyle` | text | — | Font style. |
| `labelColor` | text | — | Label color (theme default: **textPrimary**). |

### Source section

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showSource` | boolean | true | Show the source summary block. |
| `sourceColor` | text | — | Primary source text color (theme default: **accentGreen**). |
| `sourceLabelColor` | text | — | Source label color (theme default: **textSecondary**). |
| `sourceFont` | text | — | Font family for source text. |
| `sourceSize` | number | null | Font size (8–120); omit for default sizing. |
| `sourceWeight` | text | — | Font weight (`font-weight`). |
| `sourceStyle` | text | — | Font style (`font-style`). |

### Destination section

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showDestination` | boolean | true | Show the destination summary block. |
| `destinationColor` | text | — | Primary destination text color (theme default: **accentGreen**). |
| `destinationLabelColor` | text | — | Destination label color (theme default: **textSecondary**). |
| `destinationFont` | text | — | Font family for destination text. |
| `destinationSize` | number | null | Font size (8–120). |
| `destinationWeight` | text | — | Font weight. |
| `destinationStyle` | text | — | Font style. |

### Direction section

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showDirection` | boolean | true | Show directional mode indicators when relevant. |
| `directionColor` | text | — | Primary direction text color (theme default: **accentGreen**). |
| `directionLabelColor` | text | — | Direction label color (theme default: **textSecondary**). |
| `directionFont` | text | — | Font family for direction text. |
| `directionSize` | number | null | Font size (8–120). |
| `directionWeight` | text | — | Font weight. |
| `directionStyle` | text | — | Font style. |

### Background and border

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `backgroundColor` | text | — | Element body background (theme default: **bgSecondary**). |
| `headerColor` | text | — | Header strip background (theme default: **bgTertiary**). |
| `borderColor` | text | — | Border color (theme default: **borderColor**). |
| `image` | text | — | Background image (**file-upload**). |

:::info No `valueFont*` or `hiddenRowKeys` on Profile

The **profile** template does not define **`valueFontFamily`**, **`valueFontSize`**, **`valueColor`**, **`hiddenRowKeys`**, **`rowLabelColor`**, or **`rowValueColor`**. Use the **source***, **destination***, and **direction*** typography fields above, plus **label***, for all text styling.

:::

## Script Integration

Profile is a **non-device** element. It does not expose **Enabled**, **Connected**, **PortID**, or other device script fields. Scripts interact with the **source** and **destination** elements directly (starting timers, reading process variables, or overriding setpoints), while the profile element itself follows the same **common script properties** as every other element.

**Common script properties** (every element): **`ID`** (string, read-only), **`DisplayName`** (string, read/write), **`Visibility`** (string, read/write), **`EnableHistoricalLogging`** (boolean, read/write), **`LoggingIntervalSeconds`** (number, read/write), **`MaxSilenceSeconds`** (number, read/write).

```
// Example: rename the tile for the current step
"Mash Profile" DisplayName = "Mash: Rest Schedule"

// Hide when not brewing
if BrewState = idle
  "Mash Profile" Visibility = "hidden"
else
  "Mash Profile" Visibility = "visible"
endif

// Optional history for auditing setpoint program activity
"Mash Profile" EnableHistoricalLogging = true
"Mash Profile" LoggingIntervalSeconds = 60
"Mash Profile" MaxSilenceSeconds = 600
```

Typical automation leaves the profile table static and drives **source** (for example, **Value** on a timer). The PID or other controller reads the **destination** property the profile writes.

```
// Start the timer that the Profile uses as its source
"MashTimer" start
// Profile updates "Mash PID" Target automatically from its table
```

:::warning `Visibility` values

Use **`"default"`**, **`"visible"`**, **`"hidden"`**, or **`"hiddenlocked"`** for **`Visibility`**. See [Elements Overview](./overview).

:::

## Theming, `headerColor`, and `image`

Set **`headerColor`** to separate the title strip from the body. **`image`** adds a background texture or branding; pair it with **`backgroundColor`** and sufficient contrast on **`labelColor`** and section colors so source, destination, and direction text stay readable in both light and dark themes.

## Troubleshooting

| Symptom | Things to check |
|---------|------------------|
| Destination never changes | Confirm **sourceId** / **sourceProperty** read a live value; verify the **table** thresholds cover the current source range; check **directional** columns if enabled. |
| Wrong step or “stuck” row | Inspect threshold ordering and overlaps; directional mode uses different columns—ensure both directions are populated when **directional** is on. |
| Dashboard looks crowded | Use **`showSource`**, **`showDestination`**, or **`showDirection`** to hide sections; toggle **`showHeader`** / **`showLabel`** for compact layouts. |
| Text hard to read on background | Adjust **`sourceLabelColor`** / **`destinationLabelColor`** / **`directionLabelColor`**; reduce **`image`** opacity or change **`backgroundColor`**. |
| Script cannot set device fields on Profile | Expected: Profile is not a device. Script **Target** on the PID (or other destination element), not on the Profile. |
| History gaps in charts | Enable **`EnableHistoricalLogging`** and tune **`LoggingIntervalSeconds`** with **`MaxSilenceSeconds`** for slow-changing metadata. |

## Related Topics

- [PID](./pid) — Common destination for profile-driven setpoints
- [Timer](./timer) — Common profile source
- [Elements Overview](./overview) — Common properties and logging behavior
