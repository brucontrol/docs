# Docusaurus VS Code Dark+ Theme Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the stock Docusaurus look with a custom VS Code Dark+-inspired theme that matches the BruControl application's visual identity, making the docs site feel like a natural extension of the product.

**Architecture:** We override Infima CSS variables with the app's VS Code Dark+ palette (`src/BruControl.Web/ClientApp/src/index.css`), import the same Google Fonts (Inter + JetBrains Mono), swizzle key Docusaurus theme components (Navbar, Footer, TOC) for deeper customization, and redesign the homepage to be product-focused instead of generic Docusaurus.

**Tech Stack:** Docusaurus 3.9.2, CSS custom properties (Infima overrides), React component swizzling, Google Fonts, `prism-react-renderer` custom theme

---

## Reference: BruControl App Color Palette

These are the source-of-truth colors from `src/BruControl.Web/ClientApp/src/index.css`:

```
--bg-primary: #1e1e1e        --text-primary: #d4d4d4
--bg-secondary: #252526       --text-secondary: #858585
--bg-tertiary: #2d2d2d        --text-muted: #5a5a5a
--bg-hover: #2a2d2e           --border-color: #3c3c3c
--bg-active: #37373d          --border-subtle: #2d2d2d
--bg-selection: #264f78       --border-focus: #007acc
--accent-primary: #0e639c     --accent-blue: #569cd6
--accent-hover: #1177bb       --accent-green: #4ec9b0
--accent-yellow: #dcdcaa      --accent-orange: #ce9178
--accent-purple: #c586c0      --accent-red: #f14c4c
--font-ui: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
--font-mono: 'JetBrains Mono', 'Cascadia Code', 'Fira Code', Consolas, monospace
```

---

### Task 1: Import Google Fonts and Override Infima Color Variables

**Files:**
- Modify: `docs/src/css/custom.css`

**Step 1: Replace the entire `custom.css` with VS Code Dark+ Infima overrides**

Replace the contents of `docs/src/css/custom.css` with:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  /* Light mode: slightly softened VS Code Light palette */
  --ifm-color-primary: #0e639c;
  --ifm-color-primary-dark: #0b5689;
  --ifm-color-primary-darker: #0a5181;
  --ifm-color-primary-darkest: #08426a;
  --ifm-color-primary-light: #1177bb;
  --ifm-color-primary-lighter: #1a7ec2;
  --ifm-color-primary-lightest: #2e8fd0;

  --ifm-background-color: #ffffff;
  --ifm-background-surface-color: #f3f3f3;
  --ifm-font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --ifm-font-family-monospace: 'JetBrains Mono', 'Cascadia Code', 'Fira Code', Consolas, monospace;
  --ifm-code-font-size: 90%;
  --ifm-heading-font-weight: 600;
  --ifm-font-weight-bold: 600;
  --ifm-border-radius: 5px;
  --ifm-global-shadow-lw: 0 1px 3px rgba(0, 0, 0, 0.08);
  --ifm-global-shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
  --ifm-global-shadow-tl: 0 8px 24px rgba(0, 0, 0, 0.12);

  --docusaurus-highlighted-code-line-bg: rgba(14, 99, 156, 0.1);
}

[data-theme='dark'] {
  --ifm-color-primary: #569cd6;
  --ifm-color-primary-dark: #3d8dce;
  --ifm-color-primary-darker: #3186ca;
  --ifm-color-primary-darkest: #266da6;
  --ifm-color-primary-light: #6facde;
  --ifm-color-primary-lighter: #7bb3e1;
  --ifm-color-primary-lightest: #a1cbed;

  --ifm-background-color: #1e1e1e;
  --ifm-background-surface-color: #252526;
  --ifm-color-emphasis-0: #1e1e1e;
  --ifm-color-emphasis-100: #252526;
  --ifm-color-emphasis-200: #2d2d2d;
  --ifm-color-emphasis-300: #3c3c3c;
  --ifm-color-emphasis-400: #5a5a5a;
  --ifm-color-emphasis-500: #858585;
  --ifm-color-emphasis-600: #a0a0a0;
  --ifm-color-emphasis-700: #cccccc;
  --ifm-color-emphasis-800: #d4d4d4;
  --ifm-color-emphasis-900: #e8e8e8;
  --ifm-color-emphasis-1000: #ffffff;

  --ifm-font-color-base: #d4d4d4;
  --ifm-font-color-secondary: #858585;
  --ifm-heading-color: #e8e8e8;

  --ifm-navbar-background-color: #252526;
  --ifm-navbar-shadow: 0 1px 0 0 #3c3c3c;
  --ifm-footer-background-color: #1e1e1e;

  --ifm-toc-border-color: #3c3c3c;
  --ifm-color-content-secondary: #858585;

  --ifm-hr-border-color: #3c3c3c;
  --ifm-table-border-color: #3c3c3c;
  --ifm-table-stripe-background: #252526;
  --ifm-code-background: #2d2d2d;

  --ifm-global-shadow-lw: 0 1px 3px rgba(0, 0, 0, 0.24);
  --ifm-global-shadow-md: 0 4px 12px rgba(0, 0, 0, 0.28);
  --ifm-global-shadow-tl: 0 8px 24px rgba(0, 0, 0, 0.32);

  --docusaurus-highlighted-code-line-bg: rgba(86, 156, 214, 0.15);
}

/* =========================================================
   GLOBAL TYPOGRAPHY
   ========================================================= */
html {
  font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  letter-spacing: -0.01em;
}

/* =========================================================
   NAVBAR — VS Code title bar feel
   ========================================================= */
[data-theme='dark'] .navbar {
  border-bottom: 1px solid #3c3c3c;
  box-shadow: none;
}

.navbar__title {
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.02em;
}

.navbar__link {
  font-weight: 500;
  font-size: 0.85rem;
}

.navbar__link:hover,
.navbar__link--active {
  text-decoration: none;
}

[data-theme='dark'] .navbar__link--active {
  color: #569cd6;
}

/* =========================================================
   SIDEBAR — VS Code Explorer panel
   ========================================================= */
[data-theme='dark'] .menu {
  background: #252526;
}

.menu__link {
  font-size: 0.85rem;
  font-weight: 400;
  border-radius: 3px;
  padding: 0.3rem 0.75rem;
  transition: background-color 0.1s cubic-bezier(0.4, 0, 0.2, 1);
}

[data-theme='dark'] .menu__link:hover:not(.menu__link--active) {
  background-color: #2a2d2e;
}

[data-theme='dark'] .menu__link--active:not(.menu__link--sublist-caret) {
  background-color: #37373d;
  color: #ffffff;
  border-left: 2px solid #569cd6;
  padding-left: calc(0.75rem - 2px);
}

[data-theme='dark'] .menu__link--sublist-caret:hover {
  background-color: #2a2d2e;
}

.menu__caret::before {
  background: var(--ifm-menu-link-sublist-icon) 50% / 1.5em 1.5em;
  filter: var(--ifm-menu-link-sublist-icon-filter);
  height: 1.15em;
  width: 1.15em;
}

/* Category labels */
.menu__list-item-collapsible .menu__link {
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  color: var(--ifm-color-content-secondary);
}

/* =========================================================
   SIDEBAR WRAPPER — border / panel feel
   ========================================================= */
[data-theme='dark'] aside.theme-doc-sidebar-container {
  border-right: 1px solid #3c3c3c;
}

/* =========================================================
   TABLE OF CONTENTS — right sidebar
   ========================================================= */
.table-of-contents__link {
  font-size: 0.8rem;
}

[data-theme='dark'] .table-of-contents__link--active {
  color: #569cd6;
  font-weight: 500;
}

/* =========================================================
   SCROLLBARS — VS Code style (Webkit)
   ========================================================= */
[data-theme='dark'] ::-webkit-scrollbar {
  width: 14px;
  height: 14px;
}

[data-theme='dark'] ::-webkit-scrollbar-track {
  background: transparent;
}

[data-theme='dark'] ::-webkit-scrollbar-thumb {
  background: #424242;
  border: 3px solid transparent;
  background-clip: padding-box;
  border-radius: 7px;
}

[data-theme='dark'] ::-webkit-scrollbar-thumb:hover {
  background: #4f4f4f;
  border: 3px solid transparent;
  background-clip: padding-box;
}

/* =========================================================
   CODE BLOCKS
   ========================================================= */
[data-theme='dark'] .prism-code {
  background-color: #1e1e1e !important;
  border: 1px solid #3c3c3c;
}

code {
  border-radius: 3px;
  padding: 0.1em 0.35em;
}

[data-theme='dark'] code {
  background-color: #2d2d2d;
  border: 1px solid #3c3c3c;
  color: #ce9178;
}

/* =========================================================
   ADMONITIONS — VS Code notification colors
   ========================================================= */
[data-theme='dark'] .alert--info {
  --ifm-alert-background-color: rgba(86, 156, 214, 0.08);
  --ifm-alert-border-color: #569cd6;
}

[data-theme='dark'] .alert--warning {
  --ifm-alert-background-color: rgba(220, 220, 170, 0.08);
  --ifm-alert-border-color: #dcdcaa;
}

[data-theme='dark'] .alert--danger {
  --ifm-alert-background-color: rgba(241, 76, 76, 0.08);
  --ifm-alert-border-color: #f14c4c;
}

[data-theme='dark'] .alert--success {
  --ifm-alert-background-color: rgba(78, 201, 176, 0.08);
  --ifm-alert-border-color: #4ec9b0;
}

/* =========================================================
   LINKS
   ========================================================= */
[data-theme='dark'] a {
  color: #569cd6;
}

[data-theme='dark'] a:hover {
  color: #9cdcfe;
  text-decoration: none;
}

/* =========================================================
   TABLES
   ========================================================= */
[data-theme='dark'] table {
  border-collapse: collapse;
}

[data-theme='dark'] th {
  background-color: #252526;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
}

/* =========================================================
   FOOTER
   ========================================================= */
[data-theme='dark'] .footer {
  background-color: #1e1e1e;
  border-top: 1px solid #3c3c3c;
}

.footer__title {
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.footer__link-item {
  font-size: 0.85rem;
}

/* =========================================================
   BREADCRUMBS
   ========================================================= */
.breadcrumbs__link {
  font-size: 0.8rem;
}

[data-theme='dark'] .breadcrumbs__item--active .breadcrumbs__link {
  background-color: #37373d;
  color: #d4d4d4;
}

/* =========================================================
   SEARCH & MISC INPUTS
   ========================================================= */
[data-theme='dark'] .navbar__search-input {
  background-color: #3c3c3c;
  border: 1px solid #3c3c3c;
  color: #d4d4d4;
}

[data-theme='dark'] .navbar__search-input::placeholder {
  color: #858585;
}

/* =========================================================
   PAGINATION
   ========================================================= */
[data-theme='dark'] .pagination-nav__link {
  border-color: #3c3c3c;
  background-color: #252526;
  transition: border-color 0.18s ease;
}

[data-theme='dark'] .pagination-nav__link:hover {
  border-color: #569cd6;
}

/* =========================================================
   DOC CONTENT AREA
   ========================================================= */
[data-theme='dark'] .theme-doc-markdown h1 {
  color: #e8e8e8;
  border-bottom: 1px solid #3c3c3c;
  padding-bottom: 0.4em;
}

[data-theme='dark'] .theme-doc-markdown h2 {
  color: #e8e8e8;
  border-bottom: 1px solid #2d2d2d;
  padding-bottom: 0.3em;
}

[data-theme='dark'] .theme-doc-markdown h3,
[data-theme='dark'] .theme-doc-markdown h4 {
  color: #d4d4d4;
}

/* =========================================================
   SELECTION
   ========================================================= */
[data-theme='dark'] ::selection {
  background-color: #264f78;
  color: #d4d4d4;
}
```

**Step 2: Verify the build works**

Run: `cd docs && npm run build`
Expected: Build succeeds with no CSS errors

**Step 3: Commit**

```bash
git add docs/src/css/custom.css
git commit -m "feat(docs): replace default Infima theme with VS Code Dark+ palette"
```

---

### Task 2: Set Dark Mode as Default and Update Prism Theme

**Files:**
- Modify: `docs/docusaurus.config.ts`

**Step 1: Update `docusaurus.config.ts` themeConfig**

In `docusaurus.config.ts`, make these changes:

1. Change the `colorMode` block to default to dark:

```ts
colorMode: {
  defaultMode: 'dark',
  respectPrefersColorScheme: true,
},
```

2. Change the Prism themes to VS Code-aligned ones. At the top of the file, the import already exists: `import {themes as prismThemes} from 'prism-react-renderer';`

Update the prism config:

```ts
prism: {
  theme: prismThemes.vsLight,
  darkTheme: prismThemes.vsDark,
  additionalLanguages: ['bash', 'json', 'csharp'],
},
```

**Step 2: Verify the build**

Run: `cd docs && npm run build`
Expected: Build succeeds, dark mode is now default

**Step 3: Commit**

```bash
git add docs/docusaurus.config.ts
git commit -m "feat(docs): default to dark mode, use VS Code prism themes"
```

---

### Task 3: Redesign the Homepage

The current homepage is a stock Docusaurus hero. Replace it with a clean, product-focused landing that matches the VS Code dark aesthetic.

**Files:**
- Modify: `docs/src/pages/index.tsx`
- Modify: `docs/src/pages/index.module.css`

**Step 1: Rewrite `index.module.css`**

Replace contents of `docs/src/pages/index.module.css`:

```css
.hero {
  padding: 4rem 2rem;
  background: linear-gradient(180deg, #252526 0%, #1e1e1e 100%);
  border-bottom: 1px solid #3c3c3c;
}

.heroTitle {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 3rem;
  letter-spacing: -0.03em;
  color: #e8e8e8;
  margin-bottom: 1rem;
}

.heroTitle span {
  color: #569cd6;
}

.heroSubtitle {
  font-size: 1.2rem;
  color: #858585;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.7;
}

.heroButtons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.primaryBtn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.5rem;
  background-color: #0e639c;
  color: #ffffff;
  border: none;
  border-radius: 3px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.18s ease;
}

.primaryBtn:hover {
  background-color: #1177bb;
  color: #ffffff;
  text-decoration: none;
}

.secondaryBtn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.5rem;
  background-color: transparent;
  color: #d4d4d4;
  border: 1px solid #3c3c3c;
  border-radius: 3px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.18s ease;
}

.secondaryBtn:hover {
  border-color: #569cd6;
  color: #569cd6;
  text-decoration: none;
}

.features {
  padding: 4rem 2rem;
  max-width: 1100px;
  margin: 0 auto;
}

.featureGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.featureCard {
  background-color: #252526;
  border: 1px solid #3c3c3c;
  border-radius: 5px;
  padding: 1.5rem;
  transition: border-color 0.18s ease;
}

.featureCard:hover {
  border-color: #569cd6;
}

.featureIcon {
  font-size: 1.6rem;
  margin-bottom: 0.75rem;
}

.featureTitle {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  color: #e8e8e8;
  margin-bottom: 0.5rem;
}

.featureDesc {
  font-size: 0.85rem;
  color: #858585;
  line-height: 1.6;
}

@media screen and (max-width: 768px) {
  .heroTitle {
    font-size: 2rem;
  }
  .heroSubtitle {
    font-size: 1rem;
  }
  .featureGrid {
    grid-template-columns: 1fr;
  }
}
```

**Step 2: Rewrite `index.tsx`**

Replace contents of `docs/src/pages/index.tsx`:

```tsx
import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const features = [
  {
    icon: '🔧',
    title: 'Hardware Integration',
    description: 'Connect and manage Arduino, ESP32, and other microcontrollers with plug-and-play wiring maps.',
  },
  {
    icon: '📊',
    title: 'Real-Time Dashboard',
    description: 'Drag-and-drop canvas with live data widgets, charts, and custom element templates.',
  },
  {
    icon: '📝',
    title: 'Scripting Engine',
    description: 'Control your process with a simple scripting language built for automation and process control.',
  },
  {
    icon: '🔌',
    title: 'REST API',
    description: 'Full API access to workspaces, elements, devices, and processes for external integrations.',
  },
  {
    icon: '🧩',
    title: 'Plugin Ecosystem',
    description: 'Extend functionality with element templates from the community plugin store.',
  },
  {
    icon: '🖥️',
    title: 'Cross-Platform',
    description: 'Runs on Windows and Docker. Access your control system from any browser on any device.',
  },
];

function FeatureCard({icon, title, description}: {icon: string; title: string; description: string}) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>{icon}</div>
      <div className={styles.featureTitle}>{title}</div>
      <div className={styles.featureDesc}>{description}</div>
    </div>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout title="Welcome" description="Complete control and automation for your brewing system">
      <header className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>
            <span>Bru</span>Control
          </h1>
          <p className={styles.heroSubtitle}>
            Complete control and automation for your brewing system. 
            Hardware integration, real-time dashboards, and a powerful scripting engine — all in your browser.
          </p>
          <div className={styles.heroButtons}>
            <Link className={styles.primaryBtn} to="/intro">
              Get Started
            </Link>
            <Link className={styles.secondaryBtn} to="/quick-start">
              Quick Start Guide
            </Link>
          </div>
        </div>
      </header>
      <section className={styles.features}>
        <div className={styles.featureGrid}>
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
```

**Step 3: Verify the build**

Run: `cd docs && npm run build`
Expected: Build succeeds, homepage renders the new design

**Step 4: Visual check**

Run: `cd docs && npm start`
Open `http://localhost:3000/docs/` in browser. Verify:
- Dark background (#1e1e1e)
- Hero section with gradient
- "Bru" highlighted in blue (#569cd6)
- Feature cards with hover border effect
- Buttons match VS Code style

**Step 5: Commit**

```bash
git add docs/src/pages/index.tsx docs/src/pages/index.module.css
git commit -m "feat(docs): redesign homepage with VS Code Dark+ styling"
```

---

### Task 4: Swizzle the Navbar for VS Code Title Bar Feel

**Files:**
- Create: `docs/src/theme/Navbar/Layout/index.tsx`
- Create: `docs/src/theme/Navbar/Layout/styles.module.css`

**Step 1: Swizzle the Navbar Layout (wrapping, not ejecting)**

Create `docs/src/theme/Navbar/Layout/index.tsx`:

```tsx
import React from 'react';
import NavbarLayout from '@theme-original/Navbar/Layout';
import type NavbarLayoutType from '@theme/Navbar/Layout';
import type {WrapperProps} from '@docusaurus/types';
import styles from './styles.module.css';

type Props = WrapperProps<typeof NavbarLayoutType>;

export default function NavbarLayoutWrapper(props: Props): React.JSX.Element {
  return (
    <div className={styles.navbarWrapper}>
      <NavbarLayout {...props} />
    </div>
  );
}
```

Create `docs/src/theme/Navbar/Layout/styles.module.css`:

```css
.navbarWrapper :global(.navbar) {
  padding: 0 1rem;
  min-height: 40px;
  font-size: 0.85rem;
}

[data-theme='dark'] .navbarWrapper :global(.navbar) {
  background-color: #252526;
  border-bottom: 1px solid #3c3c3c;
  box-shadow: none;
}

.navbarWrapper :global(.navbar__logo) {
  height: 24px;
  margin-right: 0.5rem;
}

.navbarWrapper :global(.navbar__title) {
  font-weight: 600;
  font-size: 0.85rem;
}
```

**Step 2: Verify the build**

Run: `cd docs && npm run build`
Expected: Build succeeds, navbar is slimmer with VS Code title bar dimensions

**Step 3: Commit**

```bash
git add docs/src/theme/Navbar/Layout/
git commit -m "feat(docs): swizzle navbar for VS Code title bar style"
```

---

### Task 5: Clean Up Static Assets (Remove Docusaurus Stock Images)

**Files:**
- Delete: `docs/static/img/undraw_docusaurus_mountain.svg`
- Delete: `docs/static/img/undraw_docusaurus_react.svg`
- Delete: `docs/static/img/undraw_docusaurus_tree.svg`
- Delete: `docs/static/img/docusaurus.png`
- Delete: `docs/static/img/docusaurus-social-card.jpg`

**Step 1: Remove the stock Docusaurus illustrations and branding**

These are the default template images that are not used by the new homepage. Delete them.

**Step 2: Update the social card reference in config**

In `docs/docusaurus.config.ts`, change:
```ts
image: 'img/docusaurus-social-card.jpg',
```
to:
```ts
image: 'img/logo.svg',
```

**Step 3: Verify the build**

Run: `cd docs && npm run build`
Expected: No broken image references, build clean

**Step 4: Commit**

```bash
git add -A docs/static/img/ docs/docusaurus.config.ts
git commit -m "chore(docs): remove stock Docusaurus assets, update social card"
```

---

### Task 6: Update Footer in Config

**Files:**
- Modify: `docs/docusaurus.config.ts`

**Step 1: Update footer config for a cleaner, branded footer**

In `docs/docusaurus.config.ts`, update the footer section:

```ts
footer: {
  style: 'dark',
  links: [
    {
      title: 'Docs',
      items: [
        { label: 'Getting Started', to: '/intro' },
        { label: 'Quick Start', to: '/quick-start' },
        { label: 'API Reference', to: '/api/overview' },
      ],
    },
    {
      title: 'Resources',
      items: [
        { label: 'Hardware Setup', to: '/hardware/overview' },
        { label: 'Scripting Guide', to: '/scripting/introduction' },
        { label: 'Element Templates', to: '/element-templates/overview' },
      ],
    },
    {
      title: 'Links',
      items: [
        { label: 'BruControl.com', href: 'https://brucontrol.com' },
        { label: 'GitHub', href: 'https://github.com/brucontrol/docs' },
      ],
    },
  ],
  copyright: `Copyright © ${new Date().getFullYear()} BruControl`,
},
```

**Step 2: Verify the build**

Run: `cd docs && npm run build`
Expected: Footer renders with updated links

**Step 3: Commit**

```bash
git add docs/docusaurus.config.ts
git commit -m "feat(docs): update footer with product-relevant doc links"
```

---

### Task 7: Final Visual Verification

**Step 1: Start the dev server**

Run: `cd docs && npm start`
Open `http://localhost:3000/docs/`

**Step 2: Visual checklist**

Verify each item:

| Area | Expected |
|------|----------|
| **Homepage** | Dark gradient hero, "Bru" in blue, 6 feature cards, VS Code-style buttons |
| **Navbar** | Slim (40px), `#252526` bg, subtle bottom border, logo + title left-aligned |
| **Sidebar** | `#252526` bg, uppercase category labels, blue left-border on active item |
| **Doc content** | `#1e1e1e` bg, `#d4d4d4` text, headings in `#e8e8e8`, blue links |
| **Code blocks** | `#1e1e1e` bg with `#3c3c3c` border, VS Code syntax colors |
| **Inline code** | `#2d2d2d` bg with `#3c3c3c` border, orange text (`#ce9178`) |
| **Admonitions** | Tinted backgrounds matching VS Code notification colors |
| **Tables** | `#252526` header bg, `#3c3c3c` borders |
| **Scrollbar** | VS Code-style thin thumb on dark track |
| **Footer** | `#1e1e1e` bg with `#3c3c3c` top border, 3 link columns |
| **Light mode** | Blue primary, clean white bg, still feels cohesive (secondary mode) |
| **Pagination** | Dark cards with blue hover border |
| **Selection** | `#264f78` blue selection color |

**Step 3: Check light mode too**

Toggle theme switcher. Verify light mode is clean with the blue `#0e639c` primary.

**Step 4: Final commit if any tweaks needed**

```bash
git add -A docs/
git commit -m "feat(docs): finalize VS Code Dark+ themed docs site"
```

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | CSS variables + fonts | `custom.css` |
| 2 | Dark default + Prism | `docusaurus.config.ts` |
| 3 | Homepage redesign | `index.tsx`, `index.module.css` |
| 4 | Navbar swizzle | `src/theme/Navbar/Layout/*` |
| 5 | Remove stock assets | `static/img/`, config |
| 6 | Footer update | `docusaurus.config.ts` |
| 7 | Visual verification | all |
