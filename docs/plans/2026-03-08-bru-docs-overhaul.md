# Bru-Docs Overhaul Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform bru-docs from outdated, alpha-era content into accurate end-user documentation that reflects BruControl's current capabilities: element templates, scripting, plugins, edit element templates, release repo, and core application features.

**Architecture:** Phase-based overhaul. Fix foundation (links, config, versioning) first. Then fill Application, Elements, and Scripting from app/docs and old_docs. Add new sections for Element Templates, Plugins, and Release/Updates. Adapt engineer-focused app docs into end-user prose. Preserve hardware docs (already solid). Use Docusaurus build as verification.

**Tech Stack:** Docusaurus, Markdown/MDX, bru-docs repo (c:\repo\bru-docs), app docs (c:\repo\app\docs), plugin-library (c:\repo\plugin-library), brucontrol-releases (c:\repo\brucontrol-releases)

---

## Source Reference

| Source | Use For |
|--------|---------|
| `c:\repo\app\docs\scripting-system\04-End-User-Language-Guide.md` | Scripting end-user content (already end-user oriented) |
| `c:\repo\app\docs\scripting-system\05-Language-Syntax-Reference.md` | Script syntax reference |
| `c:\repo\app\docs\scripting-system\06-Valid-Examples-Cookbook.md` | Script examples |
| `c:\repo\app\docs\element-template-system\*.md` | Element template concepts (adapt for end users) |
| `c:\repo\app\docs\element-template-system\03-Element-Template-Editor-System.md` | Edit element templates / Element Template Editor |
| `c:\repo\app\docs\element-template-system\04-Plugin-Library-and-Registry.md` | Plugin store, install flow |
| `c:\repo\app\docs\core-frontend\*.md` | Dashboard, Solution Explorer, UI concepts |
| `c:\repo\bru-docs\old_docs\docs_as_md.md` | Legacy content (fix encoding; extract missing topics) |
| `c:\repo\plugin-library\element-templates\*\element-template.yaml` | Element template plugin examples (element-template.yaml is plugin manifest format) |

---

## Phase 1: Foundation and Config

### Task 1: Fix Version and BETA References

**Files:**
- Modify: `c:\repo\bru-docs\docs\intro.md`
- Modify: `c:\repo\bru-docs\docs\requirements.md`

**Step 1: Update intro.md**

Remove or replace "Version 1.3 BETA", "Firmware v46F+", "Updated 1/24/2026" with current/neutral wording. Use placeholders like "current release" or obtain actual version from `c:\repo\brucontrol-releases\version.json` if available.

**Step 2: Update requirements.md .NET version**

Verify correct .NET runtime for Windows 7 (likely .NET 6 or 8, not .NET 10). Check `c:\repo\app` project files for target framework.

**Step 3: Verify changes**

Run: `cd c:\repo\bru-docs && npm run build`
Expected: Build succeeds.

**Step 4: Commit**

```bash
cd c:\repo\bru-docs
git add docs/intro.md docs/requirements.md
git commit -m "docs: fix version and .NET references"
```

---

### Task 2: Fix editUrl and Broken Link Config

**Files:**
- Modify: `c:\repo\bru-docs\docusaurus.config.ts`
- Modify: `c:\repo\bru-docs\sidebars.ts` (if needed)

**Step 1: Update editUrl**

Set `editUrl` to the actual bru-docs repo URL (e.g. `https://github.com/brucontrol/bru-docs/tree/main/` or whatever the real repo is). Confirm repo name from `.github/workflows/deploy.yml` or git remote.

**Step 2: Enable strict broken link checking**

Ensure `onBrokenLinks: 'warn'` or `'throw'` so broken links are caught during build.

**Step 3: Build**

Run: `cd c:\repo\bru-docs && npm run build`
Expected: No new broken link warnings from config changes.

**Step 4: Commit**

```bash
git add docusaurus.config.ts
git commit -m "docs: fix editUrl and link config"
```

---

### Task 3: Create Stub Pages for Broken Links

**Files:**
- Create: `c:\repo\bru-docs\docs\application\setup.md`
- Create: `c:\repo\bru-docs\docs\application\workspaces.md`
- Create: `c:\repo\bru-docs\docs\application\settings.md`
- Create: `c:\repo\bru-docs\docs\elements\device-elements.md`
- Create: `c:\repo\bru-docs\docs\elements\control-elements.md`
- Create: `c:\repo\bru-docs\docs\elements\timer-elements.md`
- Create: `c:\repo\bru-docs\docs\elements\alarm-elements.md`
- Create: `c:\repo\bru-docs\docs\elements\graph-elements.md`
- Create: `c:\repo\bru-docs\docs\appendix\troubleshooting.md`
- Create: `c:\repo\bru-docs\docs\appendix\technical-assistance.md`
- Create: `c:\repo\bru-docs\docs\scripting\element-properties.md`
- Create: `c:\repo\bru-docs\docs\scripting\conditionals.md`
- Create: `c:\repo\bru-docs\docs\scripting\examples.md`

**Step 1: Create stub for application/setup.md**

```markdown
---
id: setup
title: Application Setup
sidebar_position: 1
---

# Application Setup

*This page will be expanded in a later task. See [Quick Start](../quick-start) for initial setup steps.*
```

**Step 2: Create similar stubs for all listed files**

Each stub: Docusaurus frontmatter (`id`, `title`, `sidebar_position`), H1, one sentence pointing to related content or "Coming soon."

**Step 3: Create appendix stubs**

For `troubleshooting.md` and `technical-assistance.md`, include brief placeholder text. For hardware links like `../appendix/interface-overview`, create `c:\repo\bru-docs\docs\appendix\interface-overview.md` and `interface-specific.md` if referenced.

**Step 4: Build**

Run: `cd c:\repo\bru-docs && npm run build`
Expected: No broken links to these paths.

**Step 5: Commit**

```bash
git add docs/
git commit -m "docs: add stub pages for broken links"
```

---

## Phase 2: Application Section

### Task 4: Application Setup

**Files:**
- Modify: `c:\repo\bru-docs\docs\application\setup.md`
- Reference: `c:\repo\bru-docs\old_docs\docs_as_md.md` (Application Setup, Files sections)

**Step 1: Extract and adapt content**

From old_docs and app architecture, write end-user content covering:
- Download and install (Docker vs Windows zip)
- License (evaluation, purchase, activation)
- First run, config location
- Backup/restore of workspace files

**Step 2: Write setup.md**

Full page with clear headings. End-user tone. No internal architecture.

**Step 3: Build**

Run: `cd c:\repo\bru-docs && npm run build`

**Step 4: Commit**

```bash
git add docs/application/setup.md
git commit -m "docs: add application setup guide"
```

---

### Task 5: Workspaces

**Files:**
- Modify: `c:\repo\bru-docs\docs\application\workspaces.md`
- Reference: `c:\repo\app\docs\core-frontend\04-Dashboard-and-Canvas.md`

**Step 1: Extract workspace concepts**

From app docs: workspaces, canvas, background images, layout. Adapt for end users.

**Step 2: Write workspaces.md**

- Creating workspaces
- Adding elements to workspace
- Background images
- Workspace tab bar
- Saving and switching

**Step 3: Build and commit**

```bash
cd c:\repo\bru-docs && npm run build
git add docs/application/workspaces.md && git commit -m "docs: add workspaces guide"
```

---

### Task 6: Settings

**Files:**
- Modify: `c:\repo\bru-docs\docs\application\settings.md`
- Reference: `c:\repo\bru-docs\old_docs\docs_as_md.md`, app Settings UI

**Step 1: Document settings tabs**

Interfaces, general settings, data storage, etc. End-user descriptions of each tab.

**Step 2: Write settings.md**

**Step 3: Build and commit**

---

## Phase 3: Elements Section

### Task 7: Device Elements

**Files:**
- Modify: `c:\repo\bru-docs\docs\elements\device-elements.md`
- Reference: `c:\repo\bru-docs\docs\hardware\device-types.md`, `c:\repo\app` element types

**Step 1: Align with device-types.md**

Device types: Digital Output/Input, Analog, PWM, Duty Cycle, Counter, RTD (1-Wire Temp), SPI Sensor, Hydrometer, Hysteresis, PID, Deadband.

**Step 2: Write device-elements.md**

- What each type does
- How to add and configure
- Calibrations (linear, RTD, thermistor, lookup table) — reference from old_docs
- Port selection

**Step 3: Build and commit**

---

### Task 8: Control, Timer, Alarm, Graph Elements

**Files:**
- Modify: `c:\repo\bru-docs\docs\elements\control-elements.md`
- Modify: `c:\repo\bru-docs\docs\elements\timer-elements.md`
- Modify: `c:\repo\bru-docs\docs\elements\alarm-elements.md`
- Modify: `c:\repo\bru-docs\docs\elements\graph-elements.md`
- Reference: `c:\repo\bru-docs\old_docs\docs_as_md.md`

**Step 1: Write each element page**

Control: Duty Cycle, Hysteresis, PID, Deadband (how they work, when to use).
Timer: Count-up/count-down, script integration.
Alarm: Thresholds, notifications.
Graph: Data display, history.

**Step 2: Add Script, Button, ToggleSwitch, GlobalVariable, Profile**

Create `docs/elements/script-elements.md`, `button-switch-elements.md`, `global-variable.md`, `profile-elements.md` if needed. Update sidebars.

**Step 3: Build and commit**

---

## Phase 4: Element Templates Section (NEW)

### Task 9: Element Templates Overview

**Files:**
- Create: `c:\repo\bru-docs\docs\element-templates\overview.md`
- Reference: `c:\repo\app\docs\element-template-system\00-Overview-and-Quick-Reference.md`

**Step 1: Add element-templates category to sidebars.ts**

```ts
{
  type: 'category',
  label: 'Element Templates',
  items: [
    'element-templates/overview',
    'element-templates/editing',
    'element-templates/plugin-store',
  ],
},
```

**Step 2: Write element-templates/overview.md**

End-user explanation:
- What element templates are (visual representation of elements on the dashboard)
- Element + template = rendered element
- Built-in vs custom vs plugin element templates
- How to change the template for an element (template picker in edit drawer)

**Step 3: Build and commit**

---

### Task 10: Edit Element Templates / Element Template Editor

**Files:**
- Create: `c:\repo\bru-docs\docs\element-templates\editing.md`
- Reference: `c:\repo\app\docs\element-template-system\03-Element-Template-Editor-System.md`

**Step 1: Write editing.md**

- Opening the Element Template Editor (route `/element-templates/:id`)
- Sandpack-based editor (HTML, CSS, JS)
- Live preview
- Saving and applying to elements
- When to use: customizing appearance, creating new looks

**Step 2: Build and commit**

---

### Task 11: Plugin Store and Plugins

**Files:**
- Create: `c:\repo\bru-docs\docs\element-templates\plugin-store.md`
- Reference: `c:\repo\app\docs\element-template-system\04-Plugin-Library-and-Registry.md`

**Step 1: Write plugin-store.md**

- What plugins are (element templates from the community/official library)
- Opening Plugin Store (`/plugin-store`)
- Browsing, installing, updating
- Official vs community plugins
- After install: template appears in element edit picker

**Step 2: Build and commit**

---

## Phase 5: Scripting Section

### Task 12: Expand Scripting from App Docs

**Files:**
- Modify: `c:\repo\bru-docs\docs\scripting\introduction.md`
- Modify: `c:\repo\bru-docs\docs\scripting\sections.md`
- Modify: `c:\repo\bru-docs\docs\scripting\variables.md`
- Create: `c:\repo\bru-docs\docs\scripting\element-properties.md` (replace stub)
- Create: `c:\repo\bru-docs\docs\scripting\conditionals.md` (replace stub)
- Create: `c:\repo\bru-docs\docs\scripting\examples.md` (replace stub)
- Reference: `c:\repo\app\docs\scripting-system\04-End-User-Language-Guide.md`, `05-Language-Syntax-Reference.md`, `06-Valid-Examples-Cookbook.md`

**Step 1: Adapt End-User Language Guide**

Copy/adapt content from `app/docs/scripting-system/04-End-User-Language-Guide.md` into bru-docs scripting section. Split across introduction, sections, variables, element-properties, conditionals as appropriate.

**Step 2: Add element-properties.md**

How to read/write element properties in scripts: `"Element Name" Property`, e.g. `"Temp Probe" Value`, `"Pump" State`.

**Step 3: Add conditionals.md**

`if`/`elseif`/`else`/`endif`, `while`/`endwhile`, `goto`, `call`, `return`.

**Step 4: Add examples.md**

From cookbook: Boil Kettle Ramp-Up, Fermenter Temperature Control, Interface Disconnect Alarm, etc.

**Step 5: Update sidebars**

Ensure scripting section includes all new pages.

**Step 6: Build and commit**

```bash
cd c:\repo\bru-docs && npm run build
git add docs/scripting/ && git commit -m "docs: expand scripting from app end-user guide"
```

---

## Phase 6: Release Repo and Updates

### Task 13: Release Repo and Updates

**Files:**
- Create: `c:\repo\bru-docs\docs\application\updates-and-releases.md`
- Reference: `c:\repo\app\docs\architecture\05-External-Repositories-and-Entry-Points.md`, `VersionCheckService`

**Step 1: Write updates-and-releases.md**

End-user focus:
- How BruControl checks for updates (version.json, version-beta.json from brucontrol-releases)
- Where to download (brucontrol.com, GitHub releases, or app prompt)
- Docker vs Windows zip
- Beta vs stable channel (if applicable)

**Step 2: Add to Application sidebar**

**Step 3: Build and commit**

---

## Phase 7: Appendix and Cleanup

### Task 14: Appendix Pages

**Files:**
- Modify: `c:\repo\bru-docs\docs\appendix\overview.md`
- Modify: `c:\repo\bru-docs\docs\appendix\troubleshooting.md`
- Modify: `c:\repo\bru-docs\docs\appendix\technical-assistance.md`
- Create: `c:\repo\bru-docs\docs\appendix\interface-overview.md` (if linked)
- Reference: `c:\repo\bru-docs\old_docs\docs_as_md.md`

**Step 1: Fix appendix overview**

Replace `#` placeholders with real doc links. Remove or update placeholder Quick Links.

**Step 2: Write troubleshooting.md**

- Network connectivity (interface not found)
- Firmware upload issues
- Common errors
- Log viewer usage

**Step 3: Write technical-assistance.md**

- brucontrol.com support
- Community forums
- Log files for support

**Step 4: Build and commit**

---

### Task 15: Remove "Coming Soon" and Final Pass

**Files:**
- Modify: `c:\repo\bru-docs\docs\application\overview.md`
- Modify: `c:\repo\bru-docs\docs\elements\overview.md`
- Modify: `c:\repo\bru-docs\docs\intro.md`
- Modify: `c:\repo\bru-docs\docs\quick-start.md`

**Step 1: Update application/overview.md**

Remove "Coming Soon" for setup, workspaces, settings. Add links to new pages.

**Step 2: Update elements/overview.md**

Remove "Coming Soon" for device/control/timer/alarm/graph. Add links to new pages.

**Step 3: Update intro and quick-start**

Fix any remaining broken links. Ensure quick-start Next Steps point to real pages.

**Step 4: Full build**

Run: `cd c:\repo\bru-docs && npm run build`
Expected: No broken links, no warnings.

**Step 5: Commit**

```bash
git add docs/
git commit -m "docs: remove Coming Soon, fix overview links"
```

---

## Phase 8: Verification

### Task 16: Verification and Deploy Check

**Files:**
- None (verification only)

**Step 1: Run full build**

```bash
cd c:\repo\bru-docs
npm run build
```

Expected: Build succeeds, no broken links.

**Step 2: Serve locally**

```bash
npm run start
```

Manually click through: Intro → Quick Start → Hardware → Application → Elements → Element Templates → Scripting → Appendix. Verify all links resolve and content is coherent.

**Step 3: Check deploy**

If using GitHub Actions, ensure `npm run build` passes in CI. Reference: `c:\repo\bru-docs\.github\workflows\deploy.yml`.

**Step 4: Final commit if any fixes**

---

## Execution Handoff

Plan complete and saved to `docs/plans/2026-03-08-bru-docs-overhaul.md`.

**Two execution options:**

**1. Subagent-Driven (this session)** — Dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Parallel Session (separate)** — Open a new session with executing-plans, batch execution with checkpoints.

**Which approach?**

- **If Subagent-Driven chosen:** Use superpowers:subagent-driven-development. Stay in this session. Fresh subagent per task + code review.
- **If Parallel Session chosen:** Open new session in bru-docs worktree. New session uses superpowers:executing-plans.
