// SPDX-FileCopyrightText: 2026 Schmiedmayer Lab and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

const deploymentUrl = process.env.SITE_URL ?? 'https://opendigits.dev';
const deploymentBase = process.env.SITE_BASE ?? '';

export const siteConfig = {
  name: 'DIGITS',
  accountName: 'OpenDIGITS',
  description:
    'An NIH-funded consortium building on existing standards to make smartphone and wearable sensor data interoperable for large-scale research and AI.',
  url: deploymentUrl,
  base: deploymentBase,
  locale: 'en-US',
  openGraphLocale: 'en_US',
  themeColors: {
    light: '#fcfbf8',
    dark: '#0f171e',
  },
  brand: {
    tagline: 'Wearable data that works together.',
    descriptor: 'Practical interoperability for sensor data, research, and AI.',
    socialBio:
      'An NIH-funded consortium making wearable and sensor data work across devices, platforms, and studies—for research and responsible AI.',
    socialImage: '/brand/digits-social-card.png',
  },
  participation: {
    path: '/participate/',
    formUrl: 'https://schmiedmayer-lab.notion.site/ebd//3cc96f063cd480f8ac40fc91b55d0000',
  },
  social: [
    {
      name: 'LinkedIn',
      handle: 'OpenDIGITS',
      url: 'https://www.linkedin.com/company/opendigitsorg',
    },
    {
      name: 'Bluesky',
      handle: '@opendigits.bsky.social',
      url: 'https://bsky.app/profile/opendigits.bsky.social',
    },
  ],
  discovery: {
    // Keep the review build private from search engines until the production
    // domain and publication are approved.
    indexing: false,
    aiSearch: true,
    aiTraining: false,
    favicon: '/favicon.svg',
  },
};
