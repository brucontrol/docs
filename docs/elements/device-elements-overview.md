---
id: device-elements-overview
title: Device Elements Overview
sidebar_position: 1
---

# Device Elements Overview

Device elements are BruControl elements that connect to physical hardware through an **interface** (microcontroller). Each device element represents a specific port on that interface and a specific **port type** that determines what the element can do.

## What Is a Device?

A **device** in BruControl is defined by three things:

1. **Interface** — The microcontroller board (e.g., Arduino MEGA) that connects to your PC via USB or network
2. **Port** — A specific pin or channel on that interface
3. **Element Type** — The kind of device (Digital Output, Analog Input, PID, etc.)

When you add a device element, you choose the interface, the port number, and the element type. The interface wiring map for your board shows which pins support which types.

If you run multiple interfaces in one solution, **PortID** helps distinguish otherwise similar elements (for example, two “Analog Input” elements on different boards). **Connected** then tells you whether each interface link is healthy, which is often the first thing to check when a reading freezes or an output refuses to change.

## Enable and Disable

Every device element has an **Enabled** property. When disabled:

- The element is not communicated with
- Scripts cannot read or write its values
- The element may show as "DISABLED" or inactive in the UI

Enable a device when it is wired and ready to use; disable it when troubleshooting or when the hardware is disconnected.

In scripts, **`Enabled`** is a normal boolean property: you can read it to gate logic and assign `true` / `false` when automation should take a device online or offline (subject to your solution’s safety practices).

## Port Types

Each device element uses one of these port types. The port type determines the hardware capability and the properties available.

| Port Type | Description | Typical Use |
|-----------|-------------|-------------|
| **DigitalOutput** | On/off output | Relays, pumps, heaters, LEDs |
| **DigitalInput** | On/off input | Switches, sensors, contacts |
| **DutyCycle** | Cycled on/off output | Proportional control via time ratio |
| **PWMOutput** | Pulse-width modulated output | Variable speed motors, dimming, proportional valves |
| **AnalogInput** | Variable voltage input | Pressure, temperature (analog), flow, weight |
| **Counter** | High-speed pulse counting | Flow meters, encoders, hall-effect sensors |
| **OWTemp** | 1-Wire temperature sensor | DS18B20 and compatible probes |
| **SPISensor** | SPI-connected sensor | RTD boards, specialized sensors |
| **Hydrometer** | Electronic hydrometer | iSpindel and compatible devices |
| **Hysteresis** | On/off control from an input | Simple temperature control (e.g., refrigeration) |
| **PID** | Proportional–Integral–Derivative control | Precise temperature, pressure, or flow control |
| **Deadband** | Band-based control from an input | Multi-zone heating/cooling, stepped control |

## Adding a Device Element

1. In the Solution Explorer, right-click a workspace
2. Choose **Device** from the context menu
3. In the Add Device Element modal, select the **Interface** (microcontroller)
4. Select the **Element Type** (Digital Output, Analog Input, etc.)
5. Select the **Port** (pin number from the wiring map)

The port must support the chosen element type per your interface's wiring map.

## Communication and refresh

The interface firmware exchanges data with BruControl on a periodic schedule. **Refresh Multiple** scales how often a given device element participates relative to that base interval: a value of `1` is the default cadence, and higher numbers poll or update less frequently. This is useful when you have many channels and want to prioritize fast updates for critical loops while sampling slow sensors less often.

Reducing traffic can lower USB or network load and CPU use on the microcontroller, but setting **Refresh Multiple** too high on a fast process may make control feel sluggish. Treat it as a tuning knob: start at `1` for anything safety-critical or closed-loop, then increase only where latency is acceptable.

:::tip Pair refresh tuning with `Connected`

Before interpreting a stale value, check **`Connected`**. A disconnected element may show the last known state; combining **`Enabled`**, **`Connected`**, and appropriate **`RefreshMultiple`** values keeps both scripts and operators aligned with what the hardware is actually doing.

:::

## Common Properties

All device elements share some properties in the editor and on the Dashboard:

- **Display Name** — Shown in the UI and Solution Explorer
- **Name** — Internal name (fallback if Display Name is empty)
- **Enabled** — Whether the device is active and participates in communication
- **Visibility** — Whether the element appears on the Dashboard
- **User Control** — Whether users can manually change values from the Dashboard
- **Refresh Multiple** — Multiplier for the interface refresh interval (1–60)
- **Data Logging** — Enable historical logging and set logging interval (see [Elements Overview](./overview) for shared logging fields)

### Connection and display (read-only in scripts)

These are especially useful for status displays and defensive script logic:

- **Connected** (read-only) — Whether the device is currently connected to the interface. If `false`, hardware reads and writes may be stale or unavailable.
- **PortID** (read-only) — The port identifier assigned to this device element (which pin or channel it uses on the interface).
- **DisplayText** (read-only) — Formatted text as shown for the port, including calibrations and formatting applied to the live value. Handy when you want script or logging to match exactly what the operator sees.

When you add **calibrations** on analog or sensor elements, the raw port value and the human-facing value can differ. Scripts that need the engineering value usually read the typed property for that element (for example, a numeric temperature), while **`DisplayText`** is ideal when you want a single string that already matches labels, units, and rounding shown in the UI—without reimplementing calibration math in the Process.

### Script-accessible device properties

In addition to the [common element properties](./overview) (`ID`, `DisplayName`, `Visibility`, logging fields, etc.), **every device element** exposes these in Process scripts:

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `Enabled` | boolean | Read/write | When `false`, the element does not communicate with hardware. |
| `Connected` | boolean | Read-only | `true` when linked to a live interface connection. |
| `RefreshMultiple` | number | Read/write | Multiplier for the refresh interval; higher values reduce traffic. |
| `DisplayText` | string | Read-only | Formatted display string including calibrations. |
| `PortID` | string | Read-only | Port identifier for this element. |
| `PrimaryDisplayChannel` | number | Read/write | Controls which channel provides the primary display value for multi-channel ports. |
| `Suspended` | boolean | Read-only | Whether the port is currently suspended. |

:::warning Disabled vs disconnected

**Disabled** is a configuration choice you (or a script) make. **Connected** reflects whether the runtime sees a working link to the interface. An element can be enabled but not connected (cable unplugged, interface offline), or connected but disabled (intentionally taken out of service).

:::

## Script integration

Scripts typically combine **common** element properties with **device** properties to implement safeties, diagnostics, and adaptive polling.

**Gate outputs on connection and enabled state** — Avoid driving hardware when the link or element is not usable:

```javascript
if (BoilerOutput.Enabled && BoilerOutput.Connected) {
  BoilerOutput.State = true;
}
```

**Surface operator-facing text in logs or Generic elements** — Reuse the same formatted value the Dashboard shows:

```javascript
Log.Info("Tank temp display: " + TankTemp.DisplayText);
```

**Reduce bus traffic for slow-changing inputs** — Increase `RefreshMultiple` when appropriate (still within allowed range):

```javascript
if (Mode.Value === "idle") {
  AmbientSensor.RefreshMultiple = 10;
} else {
  AmbientSensor.RefreshMultiple = 1;
}
```

**Diagnostics** — Include port and connection in messages when troubleshooting:

```javascript
if (!FlowMeter.Connected) {
  Log.Warn("Flow meter " + FlowMeter.PortID + " not connected");
}
```

Individual device types add properties such as `State`, `Value`, setpoints, and PID terms; see the linked pages below for each port type.

You can assign **`DisplayName`** or **`Visibility`** from scripts the same way as for non-device elements, which is convenient for temporary operator messages (“Maintenance mode”) or progressive disclosure of advanced controls. Device-specific booleans and numbers follow the same dot-syntax patterns as in the examples above; refer to each element page for the exact property names your type exposes.

## Edit Drawer Tabs

When you edit a device element, the Edit Drawer includes:

- **General** — Display name, native properties (Enabled, User Control, etc.), port-specific settings
- **Custom Properties** — Element appearance (from the selected template)
- **Appearance** — Element template choice, position, size
- **Calibration** — (Where applicable) Transform raw values (e.g., Analog Input, 1-Wire Temp, SPI Sensor)
- **Interface** — Port assignment and connection status

Work through **General** first so the element is named sensibly and **Enabled** matches your commissioning state. Use **Interface** to confirm the correct board and **PortID**, especially after cloning workspaces. **Appearance** and **Custom Properties** polish the Dashboard; **Calibration** is where raw ADC or bus readings become meaningful engineering units for both **`DisplayText`** and downstream logic.

## Related Pages

- [Digital Output](./digital-output)
- [Digital Input](./digital-input)
- [Duty Cycle](./duty-cycle)
- [PWM Output](./pwm-output)
- [Analog Input](./analog-input)
- [Counter](./counter)
- [1-Wire Temperature](./ow-temp)
- [SPI Sensor](./spi-sensor)
- [Hydrometer](./hydrometer)
- [Hysteresis](./hysteresis)
- [PID](./pid)
- [Deadband](./deadband)
