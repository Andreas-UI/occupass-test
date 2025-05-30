//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  ...tanstackConfig,
  {
    rules: {
      '@typescript-eslint/method-signature-style': 'warn',
      '@typescript-eslint/array-type': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
    },
  },
]
