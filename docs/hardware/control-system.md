---
id: control-system
title: Control System Considerations
sidebar_position: 4
---

# Control System Considerations

Ancillary electronic hardware are the components the interface is integrated into to create the complete control system. The wiring of the ancillary electronic hardware is a critical portion of the control system.

:::danger Safety Critical
Wiring incorrectly can pose danger to persons or property, potentially causing injury or death! A proper schematic should always be followed when wiring a control system.
:::

## Electrical Safety Requirements

### Wire and Component Selection

- **Appropriate wire size** - Match wire gauge to current requirements
- **Proper termination** - Use correct terminals and connectors
- **Quality components** - Use components rated for the task
- **Proper wiring techniques** - Follow electrical standards and codes

### Protective Circuitry

:::warning Required Protection
Upstream protective circuitry must be incorporated and meet building code specifications.
:::

**Required protective devices include:**

1. **Circuit Breakers** - Placed at each branch circuit
2. **Fuses** - Appropriate rating for each circuit
3. **GFI/GFCI** - Should be included for any control system involving:
   - Liquids
   - Any possibility for alternate ground paths
   - Wet locations
   - Areas where electrical shock hazard exists

## Two-Stage Power System

In systems where high voltage, high power, high energy, or high strength devices (HV) are used, or where downstream devices potentially interface with human contact, a two-stage interrupt system is recommended.

### Stage 1: Control Power

**First stage switch:**
- Powers the control main power (either directly or via contactor)
- Powers low voltage devices only:
  - BruControl interface's DC power supply
  - Control logic
  - Indicators and displays
- Does NOT enable HV electronic components or devices
- Ensures the control system is properly running and prepared before allowing high voltage devices to become activated

### Stage 2: High Voltage Enable

**Second stage switch (Interlock or E-Stop):**
- Activated after Stage 1 is stable
- Allows high voltage devices to be powered
- Should be manually controlled (not via interface software control)
- May be automated in certain circumstances with proper safety analysis

:::tip Safety First
This two-stage approach ensures the control system is operational before high-power devices can be activated, reducing the risk of unexpected behavior.
:::

## Design and Integration

### Using Interface Wiring Maps

When designing and wiring a BruControl Interface:

1. Select the appropriate [Interface Wiring Map](./wiring-maps)
2. Follow the map for your specific interface and firmware
3. Maps indicate which device types can be wired to which interface pins
4. Each map depends on:
   - Type of downstream hardware being implemented
   - Firmware installed on the interface

### Testing and Debugging

:::caution Testing Protocol
When testing and debugging a new BruControl system, it should be performed with the low voltage circuitry first, and the HV side interlocked or de-powered.
:::

**Stepwise testing methodology:**

1. **Low voltage testing first**
   - Test control logic
   - Verify communication
   - Check all sensors and inputs
   - Verify outputs (without high power loads)

2. **Incremental high voltage testing**
   - Add one HV device at a time
   - Test each device individually
   - Verify safety interlocks
   - Test emergency stop functions

3. **Simulated runs**
   - Perform complete process simulations
   - Use substitute materials (e.g., water instead of wort)
   - Test all automation scripts
   - Verify timing and sequencing

:::warning No Production Without Testing
Automated machinery can be very unpredictable. Do not perform "production runs" without conducting simulated runs prior.
:::

### Script Testing

Automation scripts will have bugs and/or perform in unexpected or unanticipated ways. It is critical that the builder test with source materials that can afford to be wasted prior to using real materials in a production environment.

**Example: Brewery Testing**
- Perform water runs before actual brew
- Test all temperature controls
- Verify valve sequencing
- Check pump operations
- Test all safety interlocks

## Control Panel Design

### Enclosure Selection

- **NEMA rating** - Appropriate for environment (indoor/outdoor, wet/dry)
- **Size** - Adequate space for components and heat dissipation
- **Ventilation** - Cooling for heat-generating components
- **Access** - Easy access for maintenance and troubleshooting

### Component Layout

1. **Separation of voltage levels**
   - High voltage section
   - Low voltage section
   - Clear physical separation

2. **Heat management**
   - Space around heat-generating components
   - Ventilation paths
   - Heat sinks where needed

3. **Wire routing**
   - Organized wire paths
   - Cable management
   - Separation of power and signal wires

4. **Accessibility**
   - Easy access to terminals
   - Clear labeling
   - Service space

### Labeling and Documentation

- **Wire labels** - Both ends of every wire
- **Terminal labels** - Clear identification
- **Component labels** - Part numbers and ratings
- **Schematic** - Keep updated copy in panel
- **Wiring diagram** - As-built documentation

## Safety Features

### Required Safety Devices

1. **Emergency Stop (E-Stop)**
   - Accessible location
   - Immediately cuts power to hazardous devices
   - Latching type (must be manually reset)

2. **Interlocks**
   - Door/access interlocks
   - Process interlocks
   - Safety guard interlocks

3. **Indicators**
   - Power on indicators
   - Fault indicators
   - Status lights

4. **Alarms**
   - Audible alarms for critical faults
   - Visual alarms
   - Remote notification capability

### Grounding

- **Proper grounding** - All metal components
- **Ground continuity** - Verify with meter
- **Isolated grounds** - For sensitive electronics if needed
- **Lightning protection** - For outdoor installations

## Maintenance Considerations

### Accessibility

- Easy access to components
- Service clearances
- Test point access
- Removable panels where appropriate

### Serviceability

- Modular design where possible
- Replaceable components
- Spare parts identification
- Maintenance documentation

### Monitoring

- Ability to monitor system health
- Diagnostic capabilities
- Log critical events
- Trend analysis

## Next Steps

- [Firmware Installation](./firmware-installation) - Install firmware on your interface
- [Interface Setup](./interface-setup) - Configure your interface
- [Application Setup](../application/setup) - Install and configure BruControl
