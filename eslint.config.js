import config from '@christopherjbaker/eslint-config/base-strict';

export default [
  {
    ignores: ['eslint.config.js'],
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
    },
  },
];
