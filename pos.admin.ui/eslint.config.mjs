// eslint.config.mjs
// @ts-check
import { fileURLToPath } from 'node:url';
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import unicorn from 'eslint-plugin-unicorn';
import checkFile from 'eslint-plugin-check-file';

// __dirname doesn't exist in ESM — reconstruct it
const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig([
  {
    rules: {
      'no-console': 'error',
    },
  },
  {
    files: ['**/*.ts'],
    plugins: {
      unicorn,
      'check-file': checkFile,
    },
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    processor: angular.processInlineTemplates,
    rules: {
      // --- File naming ---
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
        },
      ],
      'check-file/filename-blocklist': [
        'error',
        {
          '**/*.component.ts': '*.ts',
          '**/*.service.ts': '*.ts',
        },
      ],
      // --- Angular selectors ---
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      // --- Naming conventions ---
      '@typescript-eslint/naming-convention': [
        'error',
        // Default fallback for anything not explicitly matched
        {
          selector: 'default',
          format: ['camelCase'],
          leadingUnderscore: 'forbid',
          trailingUnderscore: 'forbid',
        },
        // Variables — camelCase, allow UPPER_CASE for real constants
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        // Functions — camelCase only
        {
          selector: 'function',
          format: ['camelCase'],
        },
        // Class methods — camelCase, allow leading underscore for private
        {
          selector: 'method',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        // Class properties — camelCase, allow leading underscore for private
        {
          selector: 'classProperty',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        // Classes, interfaces, enums, type aliases — PascalCase
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        // Interfaces — PascalCase, no "I" prefix
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: false,
          },
        },
        // Enum members — PascalCase
        {
          selector: 'enumMember',
          format: ['PascalCase'],
        },
        // Function parameters — camelCase, allow underscore for unused params
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        // Boolean variables — must be prefixed
        {
          selector: ['variable', 'classProperty'],
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: ['is', 'has', 'can', 'should', 'will', 'did'],
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {},
  },
]);