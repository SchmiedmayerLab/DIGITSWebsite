// SPDX-FileCopyrightText: 2026 Schmiedmayer Lab and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

export default {
  extends: ['stylelint-config-standard'],
  ignoreFiles: ['dist/**', 'node_modules/**'],
  rules: {
    'custom-property-empty-line-before': null,
    'declaration-empty-line-before': null,
    'no-descending-specificity': null,
    'selector-class-pattern': null,
  },
};
