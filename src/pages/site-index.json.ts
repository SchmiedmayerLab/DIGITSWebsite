// SPDX-FileCopyrightText: 2026 Schmiedmayer Lab and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

import type { APIRoute } from 'astro';
import { siteConfig } from '../../site.config.mjs';
import { foundations, goals, leaders, timeline } from '../data/site';
import { absoluteUrl } from '../lib/paths';

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify(
      {
        schemaVersion: 1,
        name: siteConfig.name,
        expandedName: 'DIGital health Interoperability Technology Standards',
        canonical: absoluteUrl('/'),
        description: siteConfig.description,
        records: [
          {
            id: absoluteUrl('/'),
            type: 'ResearchProject',
            title: 'DIGITS consortium for interoperable sensor data, research, and AI',
            description: siteConfig.description,
            positioning:
              'DIGITS builds on and connects existing standards rather than creating an isolated competing standard.',
            foundations,
            goals,
            leadership: leaders,
            timeline,
            participation:
              'Device and platform teams are invited to build and validate adapters; researchers, clinicians, standards experts, regulators, ethics experts, and people with lived experience are invited to shape the consortium from the beginning.',
            participationUrl: absoluteUrl(siteConfig.participation.path),
          },
          {
            id: absoluteUrl(siteConfig.participation.path),
            type: 'WebPage',
            title: 'Participate in DIGITS',
            description:
              'Connect with DIGITS and help shape practical interoperability for wearable and sensor data in research and AI.',
            isPartOf: absoluteUrl('/'),
          },
        ],
      },
      null,
      2,
    ),
    { headers: { 'Content-Type': 'application/json; charset=utf-8' } },
  );
