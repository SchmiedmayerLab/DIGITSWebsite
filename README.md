<!--

This source file is part of the DIGITS Website open-source project

SPDX-FileCopyrightText: 2026 Schmiedmayer Lab and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

# DIGITS Website

[![Build and Test](https://github.com/SchmiedmayerLab/DIGITSWebsite/actions/workflows/check.yml/badge.svg)](https://github.com/SchmiedmayerLab/DIGITSWebsite/actions/workflows/check.yml)
[![Deployment](https://github.com/SchmiedmayerLab/DIGITSWebsite/actions/workflows/pages.yml/badge.svg)](https://github.com/SchmiedmayerLab/DIGITSWebsite/actions/workflows/pages.yml)
[![CodeQL](https://github.com/SchmiedmayerLab/DIGITSWebsite/actions/workflows/codeql.yml/badge.svg)](https://github.com/SchmiedmayerLab/DIGITSWebsite/actions/workflows/codeql.yml)
[![REUSE status](https://api.reuse.software/badge/github.com/SchmiedmayerLab/DIGITSWebsite)](https://api.reuse.software/info/github.com/SchmiedmayerLab/DIGITSWebsite)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.md)

![DIGITS — Wearable data that works together.](public/brand/digits-bluesky-banner.png)

DIGITS is an NIH-funded consortium making smartphone, wearable, and sensor data interoperable across devices, platforms, and studies for research and responsible AI.

## Tooling

- Astro 7 and strict TypeScript for a static, low-JavaScript website.
- Modern CSS with centralized light and dark design tokens.
- Vitest, Playwright, and Axe for unit, responsive, and accessibility checks.
- ESLint, Stylelint, Markdownlint, Prettier, and deterministic site/link audits.
- GitHub Pages deployment with a safe no-deployment path when Pages is unavailable.
- REUSE-compliant licensing and organization-wide repository standards.

## Develop locally

Requires Node.js 24 and npm 11.

```sh
npm ci
npm run dev
```

Run the deterministic local quality gate before committing:

```sh
npm run validate
reuse lint
```

For responsive browser and accessibility coverage:

```sh
npx playwright install chromium webkit
npm run build
npm run test:e2e
```

## Deployment

GitHub Pages builds automatically from `main`. The workflow reads the active Pages origin and base path at runtime, so the same source supports both the default `/DIGITSWebsite/` project URL and a root-level custom domain. Configure a custom domain and HTTPS in the repository's Pages settings; no source or workflow change is required.

## Project map

| Path                 | Purpose                                                              |
| -------------------- | -------------------------------------------------------------------- |
| `site.config.mjs`    | Identity, URLs, social profiles, participation, and discovery policy |
| `src/data/site.ts`   | Goals, governance, leadership, supporters, and timeline              |
| `src/pages/`         | Landing, participation, discovery, and error routes                  |
| `src/styles/`        | Central design tokens and responsive component styling               |
| `public/brand/`      | Committed SVG and PNG identity assets                                |
| `BRAND.md`           | Verbal identity, asset selection, and usage guidance                 |
| `.github/workflows/` | CI, standards, security, link audit, and Pages deployment            |

Regenerate the committed brand kit after changing its source or copy:

```sh
npm run brand:generate
```

## Contributing

Contributions to this project are welcome. Please make sure to read the [contribution guidelines](https://github.com/SchmiedmayerLab/.github/blob/main/CONTRIBUTING.md) and the [contributor covenant code of conduct](https://github.com/SchmiedmayerLab/.github/blob/main/CODE_OF_CONDUCT.md) first. You can find a list of contributors in the [CONTRIBUTORS.md](CONTRIBUTORS.md) file.

## License

This project is licensed under the MIT License. See [LICENSE.md](LICENSE.md) for more information.

## Citation

If you use this software, please cite it using the metadata in [CITATION.cff](CITATION.cff), which GitHub surfaces through the [*Cite this repository*](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-citation-files) button.

## Our Research

For more information, visit the [Schmiedmayer Lab GitHub organization](https://github.com/SchmiedmayerLab).

![Schmiedmayer Lab](https://raw.githubusercontent.com/SchmiedmayerLab/.github/main/assets/footer-light.png#gh-light-mode-only)
![Schmiedmayer Lab](https://raw.githubusercontent.com/SchmiedmayerLab/.github/main/assets/footer-dark.png#gh-dark-mode-only)
