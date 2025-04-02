import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import tanstackQuery from '@tanstack/eslint-plugin-query'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import boundaries from 'eslint-plugin-boundaries'
import _import from 'eslint-plugin-import'
import jsxA11Y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: [
      '**/node_modules/',
      '**/build/',
      '**/dist/',
      '**/.next/',
      '**/tailwind.config.ts',
      'scripts/createComponents.js',
      'eslint.config.mjs',
      'next.config.ts',
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      'next/core-web-vitals', // Правила Next.js и Core Web Vitals
      'next/typescript', // Поддержка TypeScript для Next.js
      'plugin:storybook/recommended', // Рекомендации для Storybook
      'eslint:recommended', // Базовые правила ESLint
      'plugin:react/recommended', // Рекомендации для React
      'plugin:react-hooks/recommended', // Рекомендации для хуков React
      'plugin:jsx-a11y/recommended', // Правила доступности JSX
      'plugin:import/recommended', // Рекомендации для импортов
      'plugin:import/typescript', // Поддержка импортов для TypeScript
      'plugin:@typescript-eslint/recommended', // Рекомендации для TypeScript
      '@feature-sliced', // Конфигурация FSD
      '@feature-sliced/eslint-config/rules/import-order', // Сортировка импортов для FSD
      '@feature-sliced/eslint-config/rules/public-api', // Проверка публичного API
      '@feature-sliced/eslint-config/rules/layers-slices', // Проверка правил слоёв и срезов
      'plugin:prettier/recommended', // Интеграция с Prettier
    ),
  ),
  {
    plugins: {
      react: fixupPluginRules(react), // Плагин для React
      'react-hooks': fixupPluginRules(reactHooks), // Плагин для хуков React
      'jsx-a11y': fixupPluginRules(jsxA11Y), // Плагин для доступности JSX
      import: fixupPluginRules(_import), // Плагин для управления импортами
      'simple-import-sort': simpleImportSort, // Плагин для сортировки импортов
      '@typescript-eslint': fixupPluginRules(typescriptEslint), // Плагин для TypeScript
      boundaries: fixupPluginRules(boundaries), // Плагин для проверки границ модулей
      '@tanstack/query': fixupPluginRules(tanstackQuery), // Плагин для Tanstack Query
    },

    languageOptions: {
      parser: tsParser, // Парсер для TypeScript
      ecmaVersion: 'latest', // Использование последней версии ECMAScript
      sourceType: 'module', // Модульный формат (ESM)
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Поддержка JSX
        },
      },
    },

    settings: {
      react: {
        version: 'detect', // Автоматическое определение версии React
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true, // Поддержка типов TypeScript в импортах
          project: './tsconfig.json',
        },
      },
      'boundaries/elements': [
        { type: 'pages', pattern: 'src/pages/**/*' },
        { type: 'features', pattern: 'src/features/**/*' },
        { type: 'entities', pattern: 'src/entities/**/*' },
        { type: 'widgets', pattern: 'src/widgets/**/*' },
        { type: 'shared', pattern: 'src/shared/**/*' },
      ],
    },

    rules: {
      // Базовые правила
      'no-unused-vars': 'warn', // Предупреждение о неиспользуемых переменных
      'no-console': 'warn', // Предупреждение о console.log
      'no-debugger': 'error', // Ошибка при использовании debugger// TypeScript
      '@typescript-eslint/no-unused-vars': 'warn', // Неиспользуемые переменные (TypeScript)
      '@typescript-eslint/no-explicit-any': 'warn', // Предупреждение о типе any
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Не проверять типы на границах модулей

      // React
      'react/react-in-jsx-scope': 'off', // React в области видимости не обязателен (Next.js)
      'react/prop-types': 'off', // Отключено для TypeScript

      // React Hooks
      'react-hooks/rules-of-hooks': 'error', // Ошибка при нарушении правил хуков
      'react-hooks/exhaustive-deps': 'warn', // Предупреждение о неверных зависимостях хуков

      // Доступность
      'jsx-a11y/alt-text': 'warn', // Проверка атрибута alt для изображений
      'jsx-a11y/anchor-is-valid': 'warn', // Проверка валидности ссылок
      "@typescript-eslint/ban-ts-comment": "off",

      // Импорты
      'import/order': 'off',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Группа React
            ['builtin'], // Встроенные модули (например, path, fs)
            ['external', '^next'], // Сторонние библиотеки и Next.js
            ['builtin', '^node:|^path'], // Встроенные модули Node.js, такие как path
            ['external', '^react'], // React и связанные библиотеки
            ['internal'], // Внутренние модули проекта
            ['external', '^@?\\w'], // Сторонние библиотеки из node_modules
            ['parent'], // Родительские модули (например, ../module)
            ['sibling'], // Соседние модули (например, ./module)
            ['index'], // Импорт из текущей директории
            ['object'], // Специфические экспорты (например, namespace)
            ['type'], // Типы (если используется TypeScript)
            ['style'], // Импорты файлов стилей (CSS, SCSS)
            ['unknown'], // Импорты с побочными эффектами (например, \u0000)
            ['^(@|pageLayer)(/.*|$)'],
            ['^(@|entities)(/.*|$)'],
            ['^(@|features)(/.*|$)'],
            ['^(@|widgets)(/.*|$)'],
            ['^(@|shared)(/.*|$)'],
            ['^(@|public)(/.*|$)'],
            ['^(@|hooks)(/.*|$)'],
            ['^(@|utils)(/.*|$)'],
            ['^\\u0000'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.?(css|scss)$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'warn',

      'import/no-internal-modules': [
        'off',
        { allow: ['**/layouts/**', '**/widgets/**'] },
      ],

      // FSD rules
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'features', allow: ['shared', 'entities'] },
            {
              from: 'widgets',
              allow: ['features', 'entities', 'shared', 'widgets'],
            },
            { from: 'entities', allow: ['shared'] },
            { from: 'shared', allow: [] },
          ],
        },
      ],

      // Prettier
      'prettier/prettier': 'error', // Ошибка форматирования

      // Tanstack Query
      '@tanstack/query/exhaustive-deps': 'warn',
      '@tanstack/query/no-rest-destructuring': 'error',
      '@tanstack/query/stable-query-client': 'error',
      '@tanstack/query/no-unstable-deps': 'error',
      '@tanstack/query/infinite-query-property-order': 'error',
    },
  },
]