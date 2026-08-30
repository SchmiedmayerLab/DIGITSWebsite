// SPDX-FileCopyrightText: 2026 Schmiedmayer Lab and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

import type { APIRoute } from 'astro';
import { siteConfig } from '../../site.config.mjs';
import { absoluteUrl } from '../lib/paths';

export const GET: APIRoute = () => {
  const body = siteConfig.discovery.indexing
    ? `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap-index.xml')}\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
