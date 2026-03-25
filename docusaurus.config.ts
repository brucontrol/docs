import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'BruControl Documentation',
  tagline: 'Complete control and automation for your brewing system',
  favicon: 'img/favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://brucontrol.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'brucontrol', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      '@cmfcmf/docusaurus-search-local',
      {
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        indexDocSidebarParentCategories: 2,
        includeParentCategoriesInPageTitle: true,
        language: 'en',
        maxSearchResults: 10,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          exclude: ['**/plans/**'],
          showLastUpdateTime: true,
          editUrl:
            'https://github.com/brucontrol/docs/edit/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/logo.svg',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Documentation',
      logo: {
        alt: 'BruControl Logo',
        src: 'img/favicon.png',
        href: '/',
      },
      items: [
        {
          href: 'https://brucontrol.com',
          label: 'BruControl.com',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Getting Started', to: '/' },
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
    prism: {
      theme: prismThemes.vsLight,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['bash', 'json', 'csharp'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
