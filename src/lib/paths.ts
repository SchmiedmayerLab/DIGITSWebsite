// SPDX-FileCopyrightText: 2026 Schmiedmayer Lab and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

import { siteConfig } from '../../site.config.mjs';

const base = siteConfig.base ? `/${siteConfig.base.replace(/^\/+|\/+$/g, '')}` : '';

export function withBase(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`.replace(/\/{2,}/g, '/');
}

export function absoluteUrl(path: string): string {
  return new URL(withBase(path), siteConfig.url).toString();
}
