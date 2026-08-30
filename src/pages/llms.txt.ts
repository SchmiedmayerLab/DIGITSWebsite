// SPDX-FileCopyrightText: 2026 Schmiedmayer Lab and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

import type { APIRoute } from 'astro';
import { siteConfig } from '../../site.config.mjs';
import { absoluteUrl } from '../lib/paths';

export const GET: APIRoute = () => {
  const body = `# DIGITS

> ${siteConfig.description}

## Name

DIGITS stands for DIGital health Interoperability Technology Standards. OpenDIGITS is the initiative's account name.

## Overview

DIGITS is an NIMH/NIH-supported consortium building practical interoperability for smartphone, wearable, and sensor data in research. It connects and extends established foundations such as HL7 FHIR, Open mHealth, IEEE, OMOP, and clinical terminologies rather than creating another competing standard. The work combines cross-sector governance, mappings, adapters, validation tools, multi-device research evaluation, adoption support, and long-term stewardship. This shared data layer enables larger longitudinal datasets and reproducible multimodal AI and agentic health applications.

## Participation

DIGITS invites device and platform teams to build and validate adapters, and welcomes researchers, clinicians, standards experts, regulators, ethics experts, and people with lived experience to shape the consortium and its working groups from the beginning.

- [DIGITS initiative](${absoluteUrl('/')})
- [Participate in DIGITS](${absoluteUrl(siteConfig.participation.path)})
- [NIH funding opportunity PAR-24-250](https://grants.nih.gov/grants/guide/pa-files/PAR-24-250.html)
- [Structured site index](${absoluteUrl('/site-index.json')})
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
