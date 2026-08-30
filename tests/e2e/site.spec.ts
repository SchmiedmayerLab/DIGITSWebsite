// SPDX-FileCopyrightText: 2026 Schmiedmayer Lab and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { siteConfig } from '../../site.config.mjs';

const base = siteConfig.base ? `/${siteConfig.base.replace(/^\/+|\/+$/g, '')}` : '';
const route = (path: string) => `${base}${path}`.replace(/\/{2,}/g, '/');

for (const path of ['/', '/participate/', '/404.html']) {
  test(`${path} renders without browser or layout regressions`, async ({ page }) => {
    await page.route('https://schmiedmayer-lab.notion.site/**', async (route) => {
      await route.fulfill({
        contentType: 'text/html',
        body: '<!doctype html><html lang="en"><body><main><h1>Interest form</h1></main></body></html>',
      });
    });
    const errors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));

    const response = await page.goto(route(path), { waitUntil: 'networkidle' });
    expect(response?.ok()).toBe(true);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('main')).toHaveCount(1);
    expect(errors).toEqual([]);

    const overflow = await page.locator('body').evaluate(() =>
      [...document.querySelectorAll<HTMLElement>('body *')]
        .filter((element) => {
          if (element.closest('.support-rail')) return false;
          const box = element.getBoundingClientRect();
          return box.right > document.documentElement.clientWidth + 1 || box.left < -1;
        })
        .map((element) => `${element.tagName.toLowerCase()}.${element.className}`),
    );
    expect(overflow).toEqual([]);
    const documentOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(documentOverflow).toBeLessThanOrEqual(1);
  });
}

test('public pages have no automated WCAG A/AA violations in either appearance', async ({
  page,
}) => {
  await page.route('https://schmiedmayer-lab.notion.site/**', async (route) => {
    await route.fulfill({
      contentType: 'text/html',
      body: '<!doctype html><title>Interest form</title>',
    });
  });
  for (const path of ['/', '/participate/']) {
    for (const theme of ['light', 'dark'] as const) {
      await page.emulateMedia({ colorScheme: theme });
      await page.goto(route(path), { waitUntil: 'networkidle' });
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect(results.violations, `${path} in ${theme} appearance`).toEqual([]);
    }
  }
});

test('primary navigation reaches each landing-page section', async ({ page }) => {
  await page.goto(route('/'));
  for (const target of ['approach', 'consortium', 'team']) {
    await expect(page.locator(`#${target}`)).toHaveCount(1);
    await expect(page.locator(`nav a[href="${route(`/#${target}`)}"]`)).toHaveCount(1);
  }
  await expect(page.locator(`nav a[href="${route(siteConfig.participation.path)}"]`)).toHaveText(
    'Participate',
  );
});

test('participation calls to action lead to the embedded interest form', async ({ page }) => {
  await page.route('https://schmiedmayer-lab.notion.site/**', async (route) => {
    await route.fulfill({
      contentType: 'text/html',
      body: '<!doctype html><title>Interest form</title>',
    });
  });
  await page.goto(route('/'));
  const participationPath = route(siteConfig.participation.path);
  await expect(page.getByRole('link', { name: 'Join the consortium' })).toHaveAttribute(
    'href',
    participationPath,
  );
  await expect(page.getByRole('link', { name: /Join the founding consortium/ })).toHaveAttribute(
    'href',
    participationPath,
  );

  await page.goto(participationPath, { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Help shape what comes next.');
  await expect(page.locator('iframe[title="DIGITS consortium interest form"]')).toHaveAttribute(
    'src',
    siteConfig.participation.formUrl,
  );
  await expect(page.getByRole('link', { name: /open it in a new window/ })).toHaveAttribute(
    'href',
    siteConfig.participation.formUrl,
  );
});

test('the embedded form uses a narrow responsive canvas with full-form heights', async ({
  page,
}, testInfo) => {
  await page.route('https://schmiedmayer-lab.notion.site/**', async (route) => {
    await route.fulfill({
      contentType: 'text/html',
      body: '<!doctype html><title>Interest form</title>',
    });
  });
  await page.goto(route(siteConfig.participation.path));

  const shell = await page.locator('.form-shell').boundingBox();
  const frame = await page.locator('.notion-form').boundingBox();
  expect(shell).not.toBeNull();
  expect(frame).not.toBeNull();
  expect(shell!.width).toBeLessThanOrEqual(800);
  expect(frame!.width).toBeLessThanOrEqual(shell!.width);

  const isPhone = ['compact-phone-chromium', 'phone-webkit'].includes(testInfo.project.name);
  expect(frame!.height).toBeGreaterThanOrEqual(isPhone ? 2100 : 1300);
});

test('appearance and browser chrome follow the system color scheme', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto(route('/'));
  expect(
    await page.locator('html').evaluate((element) => getComputedStyle(element).colorScheme),
  ).toBe('dark');
  await expect(page.locator('meta[name="theme-color"][media*="dark"]')).toHaveAttribute(
    'content',
    siteConfig.themeColors.dark,
  );
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', /favicon\.svg$/);
  await expect(page.locator('[data-theme-toggle]')).toHaveCount(0);
  expect(
    await page.locator('.open-core').evaluate((element) => getComputedStyle(element).color),
  ).toBe('rgb(255, 255, 255)');

  await page.emulateMedia({ colorScheme: 'light' });
  expect(
    await page.locator('html').evaluate((element) => getComputedStyle(element).colorScheme),
  ).toBe('light');
  expect(
    await page.locator('.open-core').evaluate((element) => getComputedStyle(element).color),
  ).toBe('rgb(23, 37, 51)');
});

test('social previews use the generated large-format DIGITS card', async ({ page }) => {
  await page.goto(route('/'));
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    /\/brand\/digits-social-card\.png$/,
  );
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute('content', '1200');
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute('content', '630');
});

test('the footer links to the official DIGITS social profiles', async ({ page }) => {
  await page.goto(route('/'));
  const footer = page.locator('footer');

  for (const profile of siteConfig.social) {
    await expect(footer.getByRole('link', { name: new RegExp(profile.name) })).toHaveAttribute(
      'href',
      profile.url,
    );
  }
});

test('inline links preserve natural whitespace in prose', async ({ page }) => {
  await page.goto(route('/'));
  await expect(page.locator('#goals .body-large')).toContainText(
    'NIH initiative Standardizing Data and Metadata',
  );

  await page.goto(route('/participate/'));
  await expect(page.locator('.form-fallback')).toContainText(
    'If the form does not appear, you can open it in a new window',
  );
});

test('the full hero call to action is visible on a compact phone', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'compact-phone-chromium');
  await page.goto(route('/'));
  await expect(page.getByRole('link', { name: 'Join the consortium' })).toBeVisible();
});
