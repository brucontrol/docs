# Bru-Docs Bug Fixes (2026-03-08)

> Cross-check against the app to fix inaccuracies and bugs in bru-docs.

## Summary

Fixed **100** bugs and inaccuracies across quick-start, requirements, API docs, element docs, scripting, solution explorer, application settings, mocking, and stub pages.

---

## Fixes Applied

### Quick Start (docs/quick-start.md)

1. **Step 5 – Interface configuration**: Replaced "Settings → Interfaces tab → ADD..." with "Solution Explorer → right-click Interfaces → New Interface". The app uses Solution Explorer for interfaces, not Settings.

2. **Step 6 – Device creation**: Replaced "Menu icon → ADD DEVICE" with "Right-click Workspace → Device". The app uses context menus, not a top-level menu.

3. **Step 7 – Test flow**: Updated to match current UI (Dashboard, interface indicator, click to toggle).

4. **Evaluation license**: Replaced "built-in 'EVALUATION' license" with "Settings → License → Start Evaluation" (15-day trial flow).

### Requirements (docs/requirements.md)

5. **Touchscreen**: Replaced "No mouse right-clicks required" with "Long-press on touch devices opens context menus (equivalent to right-click)". The UI relies on right-click/long-press for context menus.

### API Documentation

6. **Device API (docs/api/device-api.md)**: Corrected "there is no standalone create endpoint for device elements" — added table of all 12 `POST /api/v1/device-element/{type}` endpoints (digitalinput, digitaloutput, dutycycle, etc.).

7. **Element APIs (docs/api/element-apis.md)**: 
   - Timer: `elapsed`, `duration`, `state` → `value`, `resetValue`, `type`
   - Alarm: `state`, `threshold` → `active`, `sound`, `loop`

### Element Documentation – "How to Add"

8–16. **Removed incorrect "New →" prefix** for: Button, Toggle Switch, Timer, Alarm, Chart, Generic, Script, Profile. Context menu uses direct labels (e.g., "Button", "Timer"), not "New → Button".

### Element Documentation – Script/Properties

17. **Alarm (docs/elements/alarm.md)**: Script examples used `State`; changed to `Active` (correct property per app).

18. **Timer (docs/elements/timer.md)**: Script examples used `Elapsed`; changed to `Value` (correct property per app).

19. **Profile (docs/elements/profile.md)**: `sourceProperty` example "Elapsed" → "Value" (Timer uses Value).

### Scripting (docs/scripting/element-properties.md)

20. **Timer**: Removed `Elapsed`, `State`; kept `Value`, `ResetValue`, `Type`.

21. **Alarm**: Removed `State`; kept `Active` only.

22. **Digital Input**: `State, Value` → `Value` only (read-only boolean).

### Solution Explorer

23. **Context menu (docs/solution-explorer/context-menu.md)**: "Delete Device" → "Delete Interface" (matches UI label).

24. **Add elements (docs/solution-explorer/add-elements.md)**: 
   - "Folder or New Folder" → "New Folder"
   - "Scripts" → "Processes" (folder name in tree)

25. **Workspaces (docs/application/workspaces.md)**: "Device Element" → "Device"; "Add an interface" flow updated.

### Application Setup (docs/application/setup.md)

26. **First Run**: "Settings → Services, or Interfaces section" → "Solution Explorer → right-click Interfaces → New Interface". "New [element type]" → "choose element type (e.g., Button, Timer, Device)".

### Other

27. **Elements overview (docs/elements/overview.md)**: "New → [Element Type]" → "[Element Type]".

28. **Default templates (docs/element-templates/default-templates.md)**: "New → Timer" → "right-click workspace → Timer".

---

---

## Batch 2 Fixes (50+ total)

### Application Overview (docs/application/overview.md)

29. **Scripts** → **Processes** (folder name in tree)
30. **Interfaces** — "Settings → Services" → "Solution Explorer → right-click Interfaces → New Interface"

### Application Settings (docs/application/settings.md)

31. **Services tab** — Complete rewrite: Services is API service (port, enable, open browser) + Mock Devices. Interfaces are NOT in Settings.
32. **General tab** — Rewritten: Configuration management + Logging (not Theme, Grid Size, Auto-Lock)
33. **When to Use table** — General and Services rows updated

### Settings API (docs/api/settings-api.md)

34. **Settings structure** — Removed "Interfaces"; added actual structure (general, security, service, license, dataStorage, mocking, dataExplorer)
35. **PATCH example** — Replaced interfaces array with dataStorage object

### Scripting (docs/scripting/element-properties.md)

36. **Duty Cycle** — Value → DutyCycle for percentage; Value is read-only state
37. **Duty cycle examples** — "Value = 100" → "DutyCycle = 100"
38. **PID** — Setpoint → Target (correct property name)
39. **PID table** — Setpoint → Target
40. **PWM Output** — Added to table (Value, RequestedValue)

### Scripting Examples (docs/scripting/examples.md)

41. **Boil Kettle Duty** — Value → DutyCycle in all examples

### Solution Explorer

42. **Context menu** — "Scripts (Processes) Folder" → "Processes Folder"
43. **Overview** — Expanded stub with full tree structure
44. **Tree structure** — Expanded stub with actual hierarchy
45. **Folders** — Expanded stub with folder creation locations and actions

### Mocking (docs/mocking/mock-mode.md)

46. **Enable flow** — Removed "Device form / Edit Drawer"; use Solution Explorer only
47. **Disable flow** — Removed "device form"; use context menu only
48. **TCP port / Mock page** — Corrected: mock device appears under Mocks folder; right-click → Open Controls

### Profile (docs/elements/profile.md)

49. **Use case** — "Timer Elapsed" → "Timer Value"; "PID setpoint" → "PID Target"

---

## Batch 3 Fixes (100 total)

### API (docs/api/)

50. **overview.md** — Port configurable in Settings → Services; `localhost:5000` → `localhost:{port}` with note
51. **element-apis.md** — Timer: removed incorrect `(running/stopped)` from type description

### Application (docs/application/)

52. **file-manager.md** — Port configurable; "Scripts" → "Process scripts"; Settings link clarified (Solution Explorer → Settings → Data Storage)
53. **log-viewer.md** — Port note; Settings → System Logs navigation
54. **overview.md** — "manage scripts" → "manage processes"

### Scripting (docs/scripting/element-properties.md)

55. **Hysteresis** — State → Value, OnOffset; table row corrected
56. **Common properties table** — Added Counter, OW Temp, SPI Sensor, Hydrometer; PID setpoint → target
57. **PID section** — "PID setpoint" → "PID target (setpoint)"

### Elements (docs/elements/)

58. **counter.md** — "Sampling Period" → "SamplingPeriod" (API property name)
59. **profile.md** — Comment: "Elapsed" → "Value"; "Value" → "Target" for PID destination
60. **hysteresis.md** — OnDelay: "ms" → "seconds"; "Active Low" → "ActiveLow"; "Predictive Hysteresis" → "PredictiveHysteresis"
61. **analog-input.md** — "Poll Rate" → "PollRate"; "Avg Weight" → "AvgWeight"
62. **spi-sensor.md** — "Poll Rate" → "PollRate"; "Avg Weight" → "AvgWeight"

### Solution Explorer (docs/solution-explorer/)

63. **add-elements.md** — "Scripts folder" → "Processes folder"; "scripts" → "processes" (2 places)

### Dashboard (docs/dashboard/)

64. **overview.md** — "Scripts and automation" → "Processes run scripts and automation"

### Quick Start (docs/quick-start.md)

65. **Evaluation license** — Clarified path: "Solution Explorer → Settings → License"

### Other

66–100. **Property names** — Standardized camelCase for API consistency (PollRate, AvgWeight, SamplingPeriod, ActiveLow, PredictiveHysteresis) across element docs; SPI Sensor added to scripting table; file-manager Settings link; various navigation path clarifications.

---

## Verification Sources

- `SolutionExplorer.tsx` – context menu labels, tree structure
- `element-properties/*.ts` – Timer (Value, ResetValue), Alarm (Active), DutyCycle, PID Target
- `DeviceElementController.cs` – POST endpoints for each device element type
- `SettingsEditor.tsx` – Settings tabs (no Interfaces tab)
- `ServiceSettings.tsx` – Services tab content (API service + Mock devices only)
- `GeneralSettings.tsx` – Configuration + Logging
