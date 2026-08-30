// SPDX-FileCopyrightText: 2026 Schmiedmayer Lab and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

export default {
  config: {
    MD013: false,
    MD024: { siblings_only: true },
    MD033: false,
    MD041: false,
  },
  globs: [
    '**/*.md',
    '!node_modules/**',
    '!dist/**',
    '!.astro/**',
    '!coverage/**',
    '!playwright-report/**',
    '!test-results/**',
  ],
};
