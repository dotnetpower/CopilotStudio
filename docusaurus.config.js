// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Copilot Studio 가이드',
  tagline: 'Copilot Studio 구축 및 운영 가이드',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'dotnetpower', // Usually your GitHub org/user name.
  projectName: 'CopilotStudio', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/dotnetpower/CopilotStudio/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Copilot Studio',
        logo: {
          alt: 'Copilot Studio Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '가이드',
          },
          {
            href: 'https://github.com/dotnetpower/CopilotStudio',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '문서',
            items: [
              {
                label: '가이드',
                to: '/docs/sharepoint-document-search',
              },
              {
                label: 'Go-Live 체크리스트',
                to: '/docs/go-live-considerations',
              },
            ],
          },
          {
            title: '참고 자료',
            items: [
              {
                label: 'Copilot Studio',
                href: 'https://copilotstudio.microsoft.com',
              },
              {
                label: 'Microsoft Learn',
                href: 'https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/',
              },
            ],
          },
          {
            title: '더 보기',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/dotnetpower/CopilotStudio',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Copilot Studio 가이드. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['kusto', 'powershell', 'yaml'],
      },
    }),
};

export default config;
