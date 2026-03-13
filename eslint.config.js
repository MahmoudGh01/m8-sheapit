import config from '@christopherjbaker/eslint-config/base-strict';

export default [
  {
    ignores: [
      'eslint.config.js',
      'postcss.config.js',
      'vitest.config.ts',
      'dist/**/*',
      'src/components/ui/**/*',
      'src/lib/utils.ts',
    ],
  },
  ...config,
  {
    rules: {
      // Allow absolute paths for Vite public folder assets
      'import/no-absolute-path': 'off',
      // Allow unresolved paths for Vite public folder assets
      'import/no-unresolved': [
        'error',
        {
          ignore: ['^/'],
        },
      ],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-empty-function': 'off',
    },
  },
];
