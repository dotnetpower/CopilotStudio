/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    'intro',
    'sharepoint-document-search',
    'sharepoint-list-query',
    'azure-ai-search',
    'monitoring-application-insights',
    {
      type: 'category',
      label: 'Go-Live 고려 사항',
      link: {
        type: 'doc',
        id: 'go-live-considerations',
      },
      items: [
        'go-live/goal-definition',
        'go-live/quality-management',
        'go-live/security-compliance',
        'go-live/performance-scalability',
        'go-live/monitoring-maintenance',
        'go-live/knowledge-management',
        'go-live/testing-plan',
        'go-live/deployment-checklist',
        'go-live/rollback-plan',
        'go-live/documentation',
      ],
    },
    'application-insights-queries',
  ],
};

export default sidebars;
