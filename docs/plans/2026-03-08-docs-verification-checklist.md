# Bru-Docs Verification Checklist (2026-03-08)

> One subagent per document. Verify each doc against c:\repo\app codebase. Find proof, fix inaccuracies, add missing content.

**Method:** Dispatch one mcp_task subagent per row. Subagent must: (1) read the doc, (2) search codebase for proof, (3) apply edits, (4) return summary.

---

## Status Legend

| Status | Meaning |
|--------|---------|
| ⬜ | Not yet verified (one subagent per doc) |
| 🔄 | Subagent dispatched, awaiting result |
| ✅ | Verified by dedicated subagent |
| ⚠️ | Was batch-verified (needs re-verify with dedicated subagent) |

---

## 1. Intro & Core (4 docs)

| # | Doc | Status | Subagent ID | Notes |
|---|-----|--------|-------------|-------|
| 1 | docs/intro.md | ✅ | aed2041d | Dedicated subagent 2026-03-08 |
| 2 | docs/features.md | ✅ | 6b701dd3 | Dedicated subagent |
| 3 | docs/requirements.md | ✅ | b95f483c | Dedicated subagent |
| 4 | docs/quick-start.md | ✅ | b5dc8133 | Dedicated subagent |

---

## 2. Application (12 docs)

| # | Doc | Status | Subagent ID | Notes |
|---|-----|--------|-------------|-------|
| 5 | docs/application/setup.md | ✅ | cf9dcb07 | Dedicated subagent |
| 6 | docs/application/overview.md | ✅ | 64df9d19 | Dedicated subagent |
| 7 | docs/application/workspaces.md | ✅ | 59729790 | Dedicated subagent |
| 8 | docs/application/settings.md | ✅ | 0fa5da94 | Dedicated subagent |
| 9 | docs/application/file-manager.md | ✅ | d74b3a9c | Dedicated subagent |
| 10 | docs/application/log-viewer.md | ✅ | 0de19ffa | Dedicated subagent |
| 11 | docs/application/data-views.md | ✅ | 0a2fed99 | Dedicated subagent |
| 12 | docs/application/updates-releases.md | ✅ | 7fb1d2dd | Dedicated subagent |

---

## 3. API (7 docs)

| # | Doc | Status | Subagent ID | Notes |
|---|-----|--------|-------------|-------|
| 13 | docs/api/overview.md | ✅ | bd86ef04 | Dedicated subagent |
| 14 | docs/api/device-api.md | ✅ | a9e06ac9 | Dedicated subagent |
| 15 | docs/api/element-apis.md | ✅ | 5efadc74 | Dedicated subagent |
| 16 | docs/api/settings-api.md | ✅ | fab8469c | Dedicated subagent |
| 17 | docs/api/process-api.md | ✅ | 310c6464 | Dedicated subagent |
| 18 | docs/api/workspace-api.md | ✅ | 580b8332 | Dedicated subagent |
| 19 | docs/api/misc-apis.md | ✅ | 6fbfdb6a | Dedicated subagent |

---

## 4. Dashboard (5 docs)

| # | Doc | Status | Subagent ID | Notes |
|---|-----|--------|-------------|-------|
| 20 | docs/dashboard/overview.md | ✅ | 802a2438 | Dedicated subagent |
| 21 | docs/dashboard/element-appearance.md | ✅ | f6795d8f | Dedicated subagent |
| 22 | docs/dashboard/tool-mode.md | ✅ | 98145295 | Dedicated subagent |
| 23 | docs/dashboard/zoom-pan.md | ✅ | 10dedf69 | Dedicated subagent |
| 24 | docs/dashboard/canvas-layout.md | ✅ | 840ac920 | Dedicated subagent |

---

## 5. Elements (25 docs)

| # | Doc | Status | Subagent ID | Notes |
|---|-----|--------|-------------|-------|
| 25 | docs/elements/overview.md | ✅ | 10d80ecb | Dedicated subagent |
| 26 | docs/elements/device-elements-overview.md | ✅ | 37b1a309 | Dedicated subagent |
| 27 | docs/elements/button.md | ✅ | da114edb | Dedicated subagent |
| 28 | docs/elements/toggle-switch.md | ✅ | 27c04ec7 | Dedicated subagent |
| 29 | docs/elements/timer.md | ✅ | 111e1d39 | Dedicated subagent |
| 30 | docs/elements/alarm.md | ✅ | 95ea7ddd | Dedicated subagent |
| 31 | docs/elements/chart.md | ✅ | 4eda6ba2 | Dedicated subagent |
| 32 | docs/elements/generic.md | ✅ | 2401d178 | Dedicated subagent |
| 33 | docs/elements/script.md | ✅ | 2c379a52 | Dedicated subagent |
| 34 | docs/elements/global-variable.md | ✅ | 9a41e4b7 | Dedicated subagent |
| 35 | docs/elements/digital-output.md | ✅ | b4c72218 | Dedicated subagent |
| 36 | docs/elements/digital-input.md | ✅ | 941fa4e8 | Dedicated subagent |
| 37 | docs/elements/duty-cycle.md | ✅ | 97dc4018 | Dedicated subagent |
| 38 | docs/elements/pwm-output.md | ✅ | 3c8c2485 | Dedicated subagent |
| 39 | docs/elements/analog-input.md | ✅ | 82a6317d | Dedicated subagent |
| 40 | docs/elements/counter.md | ✅ | ef19fd15 | Dedicated subagent |
| 41 | docs/elements/ow-temp.md | ✅ | 4ba7545c | Dedicated subagent |
| 42 | docs/elements/spi-sensor.md | ✅ | 54472afd | Dedicated subagent |
| 43 | docs/elements/hydrometer.md | ✅ | 027b7bae | Dedicated subagent |
| 44 | docs/elements/hysteresis.md | ✅ | 3cbd36c2 | Dedicated subagent |
| 45 | docs/elements/pid.md | ✅ | 32623f31 | Dedicated subagent |
| 46 | docs/elements/deadband.md | ✅ | 853f3205 | Dedicated subagent |
| 47 | docs/elements/profile.md | ✅ | 3b32323c | Dedicated subagent |
| 48 | docs/elements/calibrations-overview.md | ✅ | a8c386df | Dedicated subagent |
| 49 | docs/elements/calibration-types.md | ✅ | 50bad67e | Dedicated subagent |

---

## 6. Hardware (6 docs)

| # | Doc | Status | Subagent ID | Notes |
|---|-----|--------|-------------|-------|
| 50 | docs/hardware/overview.md | ✅ | 23fa5599 | Dedicated subagent |
| 51 | docs/hardware/interface-setup.md | ✅ | 05a9f4be | Dedicated subagent |
| 52 | docs/hardware/wiring-maps.md | ✅ | e7b20b69 | Dedicated subagent |
| 53 | docs/hardware/device-types.md | ✅ | 11b4e258 | Dedicated subagent |
| 54 | docs/hardware/control-system.md | ✅ | aa0dbb39 | Dedicated subagent |
| 55 | docs/hardware/firmware-installation.md | ✅ | f74f7b9e | Dedicated subagent |

---

## 7. Mocking (3 docs)

| # | Doc | Status | Subagent ID | Notes |
|---|-----|--------|-------------|-------|
| 56 | docs/mocking/overview.md | ✅ | c6565c97 | Dedicated subagent |
| 57 | docs/mocking/mock-mode.md | ✅ | dbcb8c50 | Dedicated subagent |
| 58 | docs/mocking/mock-page.md | ✅ | 61d43343 | Dedicated subagent |

---

## 8. Scripting (8 docs)

| # | Doc | Status | Subagent ID | Notes |
|---|-----|--------|-------------|-------|
| 59 | docs/scripting/introduction.md | ✅ | f08a09fc | Dedicated subagent |
| 60 | docs/scripting/variables.md | ✅ | 87eaf492 | Dedicated subagent |
| 61 | docs/scripting/sections.md | ✅ | 34850209 | Dedicated subagent |
| 62 | docs/scripting/conditionals.md | ✅ | 11c3b9d8 | Dedicated subagent |
| 63 | docs/scripting/flow-control.md | ✅ | ee0b4a3d | Dedicated subagent |
| 64 | docs/scripting/syntax-reference.md | ✅ | 3021230f | Dedicated subagent |
| 65 | docs/scripting/examples.md | ✅ | c1895ec1 | Dedicated subagent |
| 66 | docs/scripting/element-properties.md | ✅ | 6d02e8cf | Dedicated subagent |

---

## 9. Solution Explorer (5 docs)

| # | Doc | Status | Subagent ID | Notes |
|---|-----|--------|-------------|-------|
| 67 | docs/solution-explorer/overview.md | ✅ | 1a0d817c | Dedicated subagent |
| 68 | docs/solution-explorer/add-elements.md | ✅ | bff70d4c | Dedicated subagent |
| 69 | docs/solution-explorer/context-menu.md | ✅ | 0f53c846 | Dedicated subagent |
| 70 | docs/solution-explorer/folders.md | ✅ | 3cf8381d | Dedicated subagent |
| 71 | docs/solution-explorer/tree-structure.md | ✅ | 50032135 | Dedicated subagent |

---

## 10. Element Templates (6 docs)

| # | Doc | Status | Subagent ID | Notes |
|---|-----|--------|-------------|-------|
| 72 | docs/element-templates/overview.md | ✅ | 5e5c2299 | Dedicated subagent |
| 73 | docs/element-templates/templates.md | ✅ | 080cbc50 | Dedicated subagent |
| 74 | docs/element-templates/default-templates.md | ✅ | 98949ddb | Dedicated subagent |
| 75 | docs/element-templates/element-template-editor.md | ✅ | 4b9e3494 | Dedicated subagent |
| 76 | docs/element-templates/custom-properties.md | ✅ | b6fe715c | Dedicated subagent |
| 77 | docs/element-templates/plugin-store.md | ✅ | a379606a | Dedicated subagent |

---

## 11. Appendix (7 docs)

| # | Doc | Status | Subagent ID | Notes |
|---|-----|--------|-------------|-------|
| 78 | docs/appendix/overview.md | ✅ | 0aeb13a7 | Dedicated subagent |
| 79 | docs/appendix/troubleshooting.md | ✅ | e64f85b7 | Dedicated subagent |
| 80 | docs/appendix/troubleshooting-network.md | ✅ | 4622f598 | Dedicated subagent |
| 81 | docs/appendix/interface-overview.md | ✅ | 9ede60e0 | Dedicated subagent |
| 82 | docs/appendix/interface-specific.md | ✅ | 38e93393 | Dedicated subagent |
| 83 | docs/appendix/winc1500-wifi.md | ✅ | bc591db0 | Dedicated subagent |
| 84 | docs/appendix/technical-assistance.md | ✅ | 4621e459 | Dedicated subagent |

---

## Summary

- **Total docs:** 84
- **Dedicated subagent per doc:** 84 ✅ (all complete)
- **Method:** One mcp_task subagent per document; each verified against c:\repo\app, found proof, fixed inaccuracies, returned summary/edits/evidence
