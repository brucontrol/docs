---
id: control-system
title: Control System Considerations
sidebar_position: 4
---

# Control System Considerations

Building a control system around a BruControl interface means integrating microcontroller boards with relays, sensors, power supplies, and enclosures to create a complete, safe automation solution. This page covers electrical safety, two-stage power design, panel layout, testing methodology, and ongoing maintenance — everything you need to design a reliable system before you power it on.

:::danger Safety Critical
Wiring incorrectly can pose danger to persons or property, potentially causing injury or death! A proper schematic should always be followed when wiring a control system. If you are not experienced with electrical work, consult a qualified electrician.
:::

## Electrical Safety Requirements

### Wire and Component Selection

- **Appropriate wire size** — Match wire gauge to current requirements. Under-rated wire is a fire hazard.
- **Proper termination** — Use correct terminals, ferrules, and connectors for each connection.
- **Quality components** — Use components rated for the voltage and current of the task. Avoid unrated or counterfeit parts.
- **Proper wiring techniques** — Follow electrical standards and codes applicable to your region (NEC, IEC, local building codes).

### Protective Circuitry

:::warning Required Protection
Upstream protective circuitry must be incorporated and meet building code specifications. Never omit protective devices to save cost or simplify wiring.
:::

**Required protective devices include:**

1. **Circuit Breakers** — Placed at each branch circuit to protect against overcurrent.
2. **Fuses** — Appropriate rating for each circuit; provide a secondary protection layer.
3. **GFI/GFCI** — Should be included for any control system involving:
   - Liquids or wet processes
   - Any possibility for alternate ground paths
   - Wet or damp locations
   - Areas where electrical shock hazard exists

:::tip Flyback Diodes
When switching inductive loads (relays, solenoids, motors), always include flyback diodes across the coil to suppress voltage spikes. This protects the interface and relay driver circuitry.
:::

## Two-Stage Power System

In systems where high voltage, high power, high energy, or high strength devices (HV) are used — or where downstream devices potentially interface with human contact — a two-stage interrupt system is recommended.

### Stage 1: Control Power

**First stage switch:**
- Powers the control main power (either directly or via contactor)
- Powers low voltage devices only:
  - BruControl interface's DC power supply
  - Control logic circuits
  - Indicators and displays
- Does **NOT** enable HV electronic components or devices
- Ensures the control system is properly running and prepared before allowing high voltage devices to become activated

### Stage 2: High Voltage Enable

**Second stage switch (Interlock or E-Stop):**
- Activated only after Stage 1 is stable and the control system is communicating
- Allows high voltage devices to be powered
- Should be manually controlled (not via interface software control)
- May be automated in certain circumstances with proper safety analysis and redundant safety measures

:::tip Safety First
This two-stage approach ensures the control system is operational before high-power devices can be activated, reducing the risk of unexpected behavior during startup.
:::

## Design and Integration

### Using Interface Wiring Maps

When designing and wiring a BruControl Interface:

1. Select the appropriate [Interface Wiring Map](./wiring-maps) for your board and firmware
2. Follow the map for your specific interface and firmware variant
3. Maps indicate which device types can be wired to which interface pins
4. Each map depends on:
   - The type of downstream hardware being implemented
   - The firmware installed on the interface
   - The connection method (serial, Ethernet, or Wi-Fi)

### Testing and Debugging

:::caution Testing Protocol
When testing and debugging a new BruControl system, always perform low voltage testing first with the HV side interlocked or de-powered. Never combine initial debugging with live high-voltage loads.
:::

**Stepwise testing methodology:**

1. **Low voltage testing first**
   - Test control logic and communication
   - Verify all sensors and inputs read correctly
   - Verify outputs toggle as expected (without high power loads)
   - Confirm the interface connects to BruControl and all device elements appear

2. **Incremental high voltage testing**
   - Add one HV device at a time
   - Test each device individually under controlled conditions
   - Verify safety interlocks function correctly
   - Test emergency stop at each stage

3. **Simulated runs**
   - Perform complete process simulations using substitute materials (e.g., water instead of wort)
   - Test all automation scripts end-to-end
   - Verify timing, sequencing, and alarm behavior
   - Use [Mock Mode](../mocking/overview) to test scripts before connecting real hardware

:::warning No Production Without Testing
Automated machinery can be very unpredictable. Do not perform "production runs" without conducting simulated runs first. Scripts will have bugs or perform in unexpected ways.
:::

### Script Testing

Automation scripts will have bugs and may perform in unexpected or unanticipated ways. It is critical that you test with source materials that can afford to be wasted before using real materials in production.

**Example — Brewery Testing:**
- Perform water runs before actual brew day
- Test all temperature controls through full temperature profiles
- Verify valve sequencing opens and closes in the correct order
- Check pump operations under various flow conditions
- Test all safety interlocks, alarms, and E-Stop behavior

## Control Panel Design

### Enclosure Selection

- **NEMA rating** — Select the appropriate rating for your environment (indoor/outdoor, wet/dry). NEMA 4X for wet or washdown environments.
- **Size** — Adequate space for all components plus room for heat dissipation and future expansion.
- **Ventilation** — Include fans or vents for heat-generating components. Consider thermostatically controlled ventilation.
- **Access** — Easy access for maintenance, troubleshooting, and emergency shutoff.

### Component Layout

1. **Separation of voltage levels** — Physically separate high voltage and low voltage sections. Use barriers or DIN rail spacing.
2. **Heat management** — Leave space around heat-generating components (SSRs, power supplies). Ensure ventilation paths are not blocked.
3. **Wire routing** — Organize wires with cable trays, ducts, or ties. Separate power and signal wires to prevent noise interference.
4. **Accessibility** — Leave service space for test probes and component replacement. Route wires so they can be traced easily.

### Labeling and Documentation

- **Wire labels** — Label both ends of every wire with its signal name or circuit number
- **Terminal labels** — Clear identification on every terminal block
- **Component labels** — Part numbers, ratings, and function
- **Schematic** — Keep an updated copy inside the panel door
- **Wiring diagram** — Maintain as-built documentation that reflects any changes

## Safety Features

### Required Safety Devices

1. **Emergency Stop (E-Stop)** — Accessible location, immediately cuts power to hazardous devices, latching type that must be manually reset.
2. **Interlocks** — Door/access interlocks, process interlocks, safety guard interlocks.
3. **Indicators** — Power-on indicators, fault indicators, status lights visible from operating position.
4. **Alarms** — Audible alarms for critical faults, visual indicators, and remote notification capability. BruControl [Alarm elements](../elements/device-elements-overview) can trigger digital outputs wired to audible or visual alarm devices.

### Grounding

- **Proper grounding** — Bond all metal components to a common ground bus
- **Ground continuity** — Verify with a meter during installation and periodically
- **Isolated grounds** — Use isolated ground circuits for sensitive electronics if needed
- **Lightning protection** — Consider surge protection for outdoor installations or long cable runs

## Maintenance Considerations

### Accessibility

- Easy physical access to all components for inspection and replacement
- Adequate service clearances per NEC or local codes
- Test point access for diagnostic measurements
- Removable panels where appropriate for periodic cleaning

### Serviceability

- Modular design where possible — use DIN rail mounted components for easy swap-out
- Document replacement part numbers and suppliers
- Identify spare parts and keep critical spares on hand
- Maintain maintenance logs and schedules

### Monitoring

- Use BruControl's [Log Viewer](../appendix/technical-assistance#log-files-for-support) and [Alarm elements](../elements/device-elements-overview) to monitor system health
- Review diagnostic logs periodically for communication errors or anomalies
- Track trends in sensor readings to identify drift or degradation
- Set up alarms for out-of-range conditions so problems are caught early

## Next Steps

- [Firmware Installation](./firmware-installation) — Install firmware on your interface
- [Interface Setup](./interface-setup) — Configure your interface in BruControl
- [Wiring Maps](./wiring-maps) — Pin assignments for your specific board
- [Mocking Overview](../mocking/overview) — Test scripts without hardware using mock mode
