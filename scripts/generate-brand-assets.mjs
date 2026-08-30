// SPDX-FileCopyrightText: 2026 Schmiedmayer Lab and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import { siteConfig } from '../site.config.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = join(root, 'public', 'brand');
const svgOnly = process.argv.includes('--svg-only');
const fontPath = join(
  root,
  'node_modules',
  '@fontsource-variable',
  'source-sans-3',
  'files',
  'source-sans-3-latin-wght-normal.woff2',
);
const embeddedFont = (await readFile(fontPath)).toString('base64');

const colors = {
  crimson: '#a51c30',
  crimsonSoft: '#f5e4e6',
  dark: '#172533',
  darkRaised: '#222b38',
  muted: '#52616d',
  paper: '#fcfbf8',
  teal: '#087c82',
  tealBright: '#48c7c0',
};

const typeStyle = `<style>
  @font-face {
    font-family: 'Source Sans 3';
    src: url(data:font/woff2;base64,${embeddedFont}) format('woff2');
    font-style: normal;
    font-weight: 200 900;
  }
  text { font-family: 'Source Sans 3', 'Helvetica Neue', Arial, sans-serif; }
</style>`;

const mark = ({ x, y, size, cells, plus }) => {
  const scale = size / 48;
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <g fill="${cells}">
      <rect x="4" y="4" width="10" height="10" rx="3"/>
      <rect x="19" y="4" width="10" height="10" rx="3"/>
      <rect x="34" y="4" width="10" height="10" rx="3"/>
      <rect x="4" y="19" width="10" height="10" rx="3"/>
      <rect x="19" y="19" width="10" height="10" rx="3"/>
      <rect x="34" y="19" width="10" height="10" rx="3"/>
      <rect x="4" y="34" width="10" height="10" rx="3"/>
      <rect x="19" y="34" width="10" height="10" rx="3"/>
    </g>
    <path d="M36 39h8M40 35v8" fill="none" stroke="${plus}" stroke-width="3" stroke-linecap="round"/>
  </g>`;
};

const svgDocument = ({ width, height, body, background = '' }) =>
  `<?xml version="1.0" encoding="UTF-8"?>
<!--
SPDX-FileCopyrightText: 2026 Schmiedmayer Lab and the project authors (see CONTRIBUTORS.md)
SPDX-License-Identifier: LicenseRef-DIGITS-Brand
-->
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title description">
  <title id="title">DIGITS</title>
  <desc id="description">DIGITS — ${siteConfig.brand.tagline}</desc>
  ${typeStyle}
  ${background ? `${background}\n  ` : ''}${body}
</svg>
`;

const lockup = ({ foreground, secondary, plus }) =>
  svgDocument({
    width: 1600,
    height: 320,
    body: `${mark({ x: 58, y: 42, size: 236, cells: foreground, plus })}
      <text x="350" y="157" fill="${foreground}" font-size="104" font-weight="720" letter-spacing="24">DIGITS</text>
      <text x="356" y="220" fill="${secondary}" font-size="30" font-weight="650" letter-spacing="2.2" textLength="1120" lengthAdjust="spacingAndGlyphs">DIGital health Interoperability Technology Standards</text>`,
  });

const avatar = ({ background, cells, plus, halo }) =>
  svgDocument({
    width: 1024,
    height: 1024,
    background: `<defs><radialGradient id="halo" cx="78%" cy="18%" r="76%"><stop offset="0" stop-color="${halo}" stop-opacity="0.3"/><stop offset="1" stop-color="${background}" stop-opacity="0"/></radialGradient></defs>
      <rect width="1024" height="1024" fill="${background}"/>
      <rect width="1024" height="1024" fill="url(#halo)"/>`,
    body: mark({ x: 192, y: 192, size: 640, cells, plus }),
  });

const assets = [
  {
    name: 'digits-avatar-dark',
    width: 1024,
    height: 1024,
    svg: avatar({
      background: colors.dark,
      cells: colors.paper,
      plus: colors.tealBright,
      halo: colors.crimson,
    }),
  },
  {
    name: 'digits-avatar-light',
    width: 1024,
    height: 1024,
    svg: avatar({
      background: colors.paper,
      cells: colors.dark,
      plus: colors.crimson,
      halo: colors.tealBright,
    }),
  },
  {
    name: 'digits-lockup-on-light',
    width: 1600,
    height: 320,
    transparent: true,
    svg: lockup({ foreground: colors.dark, secondary: colors.muted, plus: colors.crimson }),
  },
  {
    name: 'digits-lockup-on-dark',
    width: 1600,
    height: 320,
    transparent: true,
    svg: lockup({ foreground: colors.paper, secondary: '#c5cdcd', plus: colors.tealBright }),
  },
  {
    name: 'digits-social-card',
    width: 1200,
    height: 630,
    svg: svgDocument({
      width: 1200,
      height: 630,
      background: `<defs>
          <radialGradient id="warm" cx="4%" cy="92%" r="78%"><stop offset="0" stop-color="${colors.crimsonSoft}"/><stop offset="1" stop-color="${colors.paper}" stop-opacity="0"/></radialGradient>
          <radialGradient id="cool" cx="96%" cy="6%" r="72%"><stop offset="0" stop-color="${colors.tealBright}" stop-opacity="0.22"/><stop offset="1" stop-color="${colors.paper}" stop-opacity="0"/></radialGradient>
        </defs>
        <rect width="1200" height="630" fill="${colors.paper}"/>
        <rect width="1200" height="630" fill="url(#warm)"/>
        <rect width="1200" height="630" fill="url(#cool)"/>`,
      body: `${mark({ x: 74, y: 60, size: 76, cells: colors.dark, plus: colors.crimson })}
        <text x="176" y="109" fill="${colors.dark}" font-size="42" font-weight="740" letter-spacing="9">DIGITS</text>
        <text x="78" y="288" fill="${colors.dark}" font-size="78" font-weight="690" letter-spacing="-2">Wearable data</text>
        <text x="78" y="370" fill="${colors.dark}" font-size="78" font-weight="690" letter-spacing="-2">that works together.</text>
        <text x="82" y="460" fill="${colors.muted}" font-size="31" font-weight="520">${siteConfig.brand.descriptor}</text>
        <path d="M82 510h520" stroke="${colors.crimson}" stroke-width="6" stroke-linecap="round"/>
        <g opacity="0.14">${mark({ x: 835, y: 165, size: 300, cells: colors.dark, plus: colors.teal })}</g>`,
    }),
  },
  {
    name: 'digits-bluesky-banner',
    width: 1500,
    height: 500,
    svg: svgDocument({
      width: 1500,
      height: 500,
      background: `<defs><radialGradient id="glow" cx="84%" cy="8%" r="80%"><stop offset="0" stop-color="${colors.teal}" stop-opacity="0.35"/><stop offset="0.55" stop-color="${colors.crimson}" stop-opacity="0.18"/><stop offset="1" stop-color="${colors.dark}" stop-opacity="0"/></radialGradient></defs>
        <rect width="1500" height="500" fill="${colors.dark}"/>
        <rect width="1500" height="500" fill="url(#glow)"/>`,
      body: `${mark({ x: 315, y: 136, size: 220, cells: colors.paper, plus: colors.tealBright })}
        <text x="590" y="236" fill="${colors.paper}" font-size="102" font-weight="730" letter-spacing="22">DIGITS</text>
        <text x="596" y="315" fill="#c5cdcd" font-size="41" font-weight="540">${siteConfig.brand.tagline}</text>
        <text x="598" y="370" fill="${colors.tealBright}" font-size="25" font-weight="650" letter-spacing="2.5">RESEARCH · STANDARDS · AI</text>`,
    }),
  },
  {
    name: 'digits-linkedin-cover',
    width: 1128,
    height: 191,
    svg: svgDocument({
      width: 1128,
      height: 191,
      background: `<defs><linearGradient id="cover" x1="0" x2="1"><stop offset="0" stop-color="${colors.dark}"/><stop offset="0.7" stop-color="${colors.darkRaised}"/><stop offset="1" stop-color="${colors.teal}" stop-opacity="0.76"/></linearGradient></defs><rect width="1128" height="191" fill="url(#cover)"/>`,
      body: `${mark({ x: 348, y: 46, size: 99, cells: colors.paper, plus: colors.tealBright })}
        <text x="480" y="91" fill="${colors.paper}" font-size="50" font-weight="730" letter-spacing="11">DIGITS</text>
        <text x="482" y="136" fill="#d5dcdb" font-size="27" font-weight="520">${siteConfig.brand.tagline}</text>`,
    }),
  },
];

await mkdir(outputDirectory, { recursive: true });
for (const asset of assets) {
  await writeFile(join(outputDirectory, `${asset.name}.svg`), asset.svg, 'utf8');
}

if (!svgOnly) {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const asset of assets) {
      const page = await browser.newPage({
        viewport: { width: asset.width, height: asset.height },
        deviceScaleFactor: 1,
      });
      await page.goto(pathToFileURL(join(outputDirectory, `${asset.name}.svg`)).href);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: join(outputDirectory, `${asset.name}.png`),
        omitBackground: Boolean(asset.transparent),
      });
      await page.close();
    }
  } finally {
    await browser.close();
  }
}

process.stdout.write(
  `Generated ${assets.length} SVG${svgOnly ? '' : ' and PNG'} DIGITS brand assets in public/brand.\n`,
);
