// eslint.config.mjs
// @ts-check
import { fileURLToPath } from 'node:url';
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import unicorn from 'eslint-plugin-unicorn';
import checkFile from 'eslint-plugin-check-file';
import boundaries from 'eslint-plugin-boundaries';
import perfectionist from 'eslint-plugin-perfectionist';
import rxjsAngularX from 'eslint-plugin-rxjs-angular-x';
import globals from 'globals';
import noSecrets from 'eslint-plugin-no-secrets';
import json from '@eslint/json';

// __dirname doesn't exist in ESM — reconstruct it
const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig([
  {
    ignores: [
      'dist/**', 'coverage/**', '.angular/**', 'node_modules/**',
      'package-lock.json',
    ]
  },
  {
    files: ['**/*.json'],
    plugins: {
      json,
      'no-secrets': noSecrets
    },
    language: 'json/json',
    rules: {
      // No secrets
      'no-secrets/no-secrets': 'error',
    },
  },
  {
    files: ['**/*.ts'],
    plugins: {
      unicorn,
      'check-file': checkFile,
      boundaries,
      perfectionist,
      'rxjs-angular-x': rxjsAngularX,
      'no-secrets': noSecrets,
    },
    extends: [
      eslint.configs.recommended,
      angular.configs.tsRecommended,
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    processor: angular.processInlineTemplates,
    settings: {
      'boundaries/elements': [
        { type: 'shared', pattern: 'src/app/shared/**' },
        { type: 'core', pattern: 'src/app/core/**' },
        { type: 'layout', pattern: 'src/app/layout/**' },
        { type: 'features', pattern: 'src/app/features/**' },
      ],
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      // Fix for base no-shadow doesn't understand TS constructs, so this slips through
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      // No-unsafe-* family
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      // No console & no debigger
      'no-console': 'error',
      'no-debugger': 'error',
      // No secrets
      'no-secrets/no-secrets': [
        'error',
        {
          tolerance: 4.2,
          ignoreIdentifiers: [
            'HttpHeaders',
          ],
        },
      ],
      // Complexity/maintainability limits
      complexity: ['error', 10],
      'max-lines-per-function': ['warn', 80],
      'max-depth': ['error', 4],
      'no-nested-ternary': 'error',
      // Unused / dead code
      '@typescript-eslint/consistent-type-imports': ['error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports'
        }
      ],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { "accessibility": "no-public" },
      ],
      // RxJS + Angular (subscription lifecycle)
      'rxjs-angular-x/prefer-async-pipe': 'error',
      'rxjs-angular-x/prefer-takeuntil': [
        'error',
        {
          checkComplete: true,
          checkDecorators: ["Component", "Directive", "Injectable"],
          alias: ["takeUntilDestroyed"],
          checkDestroy: false,
        },
      ],
      // File naming
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
      // Set dependency boundaries for clean architecture
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          policies: [
            {
              from: { element: { type: 'shared' } },
              allow: [],
            },
            {
              from: { element: { type: 'core' } },
              allow: [],
            },
            {
              from: { element: { type: 'layout' } },
              allow: [
                { to: { element: { type: 'shared' } } },
                { to: { element: { type: 'core' } } },
              ],
            },
            {
              from: { element: { type: 'features' } },
              allow: [
                { to: { element: { type: 'shared' } } },
                { to: { element: { type: 'core' } } },
                { to: { element: { type: 'layout' } } },
              ],
            },
          ],
        },
      ],
      // Sorting various data, such as objects, imports, TypeScript types, enums, JSX props, Svelte attributes, etc. alphabetically, naturally, or by line length.
      'perfectionist/sort-array-includes': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-enums': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-export-attributes': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-exports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-heritage-clauses': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-import-attributes': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-interfaces': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-intersection-types': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-jsx-props': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-maps': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-modules': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-named-exports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-named-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-object-types': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-objects': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-sets': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-switch-case': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-union-types': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-variable-declarations': [
        'error',
        {
          type: 'natural',
          order: 'asc',
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
      '@angular-eslint/no-input-rename': ['error'],
      '@angular-eslint/no-output-rename': ['error'],
      '@angular-eslint/no-output-native': ['error'],
      '@angular-eslint/no-output-on-prefix': ['error'],
      '@angular-eslint/use-lifecycle-interface': ['error'],
      '@angular-eslint/no-empty-lifecycle-method': ['error'],
      '@angular-eslint/prefer-on-push-component-change-detection': ['error'],
      '@angular-eslint/prefer-standalone': ['error'],
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
  {
    files: ['**/*.spec.ts'],
    languageOptions: { globals: globals.jasmine },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'max-lines-per-function': 'off',
    },
  },
]);