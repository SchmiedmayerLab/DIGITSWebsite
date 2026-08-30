// SPDX-FileCopyrightText: 2026 Schmiedmayer Lab and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

import { describe, expect, it } from 'vitest';
import {
  aiPipeline,
  foundations,
  goals,
  governanceGroups,
  leaders,
  participation,
  supportOrganizations,
  timeline,
} from '../../src/data/site';
import { absoluteUrl, withBase } from '../../src/lib/paths';
import { siteConfig } from '../../site.config.mjs';

describe('DIGITS landing-page content', () => {
  it('represents all five funded goals in a stable order', () => {
    expect(goals).toHaveLength(5);
    expect(goals.map((goal) => goal.number)).toEqual(['01', '02', '03', '04', '05']);
    expect(new Set(goals.map((goal) => goal.verb)).size).toBe(5);
  });

  it('keeps leadership and participation perspectives multidisciplinary', () => {
    expect(leaders.map((leader) => leader.role)).toEqual([
      'Clinical co-chair',
      'Informatics & AI Co-Chair',
      'Industry technology co-chair',
    ]);
    expect(participation).toHaveLength(4);
    expect(governanceGroups).toHaveLength(4);
    expect(supportOrganizations.length).toBeGreaterThanOrEqual(8);
  });

  it('frames existing standards as foundations for AI-ready interoperability', () => {
    expect(foundations).toContain('HL7 FHIR');
    expect(foundations).toContain('Open mHealth');
    expect(aiPipeline.at(-1)?.label).toBe('Learn');
    expect(timeline.map((phase) => phase.period)).toEqual(['Year 1', 'Year 2', 'Year 3', 'Year 4']);
  });
});

describe('deployment paths', () => {
  it('keeps root paths portable', () => {
    expect(withBase('/')).toBe('/');
    expect(withBase('favicon.svg')).toBe('/favicon.svg');
    expect(absoluteUrl('/')).toBe('https://opendigits.dev/');
  });

  it('defines browser chrome colors for both supported appearances', () => {
    expect(siteConfig.themeColors).toEqual({ light: '#fcfbf8', dark: '#0f171e' });
    expect(siteConfig.discovery.favicon).toBe('/favicon.svg');
  });

  it('keeps participation routing and the external form centrally configured', () => {
    expect(withBase(siteConfig.participation.path)).toBe('/participate/');
    expect(new URL(siteConfig.participation.formUrl).hostname).toBe('schmiedmayer-lab.notion.site');
  });

  it('defines a concise reusable verbal identity', () => {
    expect(siteConfig.brand.tagline).toBe('Wearable data that works together.');
    expect(siteConfig.brand.descriptor).toBe(
      'Practical interoperability for sensor data, research, and AI.',
    );
    expect(siteConfig.brand.socialBio.length).toBeLessThanOrEqual(160);
    expect(siteConfig.brand.socialImage).toBe('/brand/digits-social-card.png');
  });

  it('keeps official social profiles centrally configured', () => {
    expect(siteConfig.social.map(({ name }) => name)).toEqual(['LinkedIn', 'Bluesky']);
    expect(siteConfig.social.map(({ url }) => new URL(url).hostname)).toEqual([
      'www.linkedin.com',
      'bsky.app',
    ]);
  });
});
