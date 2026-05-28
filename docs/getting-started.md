# Getting Started

This project is a Next.js App Router application for a localized hypermarket storefront. The codebase uses TypeScript, React, `next-intl`, Tailwind CSS through PostCSS, and local catalog data stored in TypeScript modules.

## Prerequisites

- Node.js compatible with Next.js `16.2.6`
- npm, using the committed `package-lock.json`

## Installation

Install dependencies from the project root:

```bash
npm install
```

## Environment Variables

No environment variables are currently required by the application.

The codebase does not read from `process.env`, and there are no tracked `.env` files in the project. If future integrations require secrets or deployment-specific configuration, add them through standard Next.js environment files such as `.env.local` and document them here.

## Available Commands

```bash
npm run dev
```

Starts the Next.js development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Starts the production server after a successful build.

```bash
npm run lint
```

Runs ESLint using the Next.js Core Web Vitals and TypeScript configurations.

```bash
npm run validate
```

Runs `scripts/validate-products.js` to validate product catalog data.

```bash
npm run check:i18n
```

Runs `scripts/check-i18n.js` to validate internationalization coverage.

## Main Dependencies

- `next`: App Router framework, currently pinned to `16.2.6`
- `react` and `react-dom`: UI runtime, currently pinned to `19.2.4`
- `next-intl`: locale-aware routing, request configuration, translations, and navigation wrappers
- `framer-motion`: animation support
- `tailwindcss` and `@tailwindcss/postcss`: styling pipeline
- `typescript`: static typing
- `eslint` and `eslint-config-next`: linting and framework rules

## Development Notes

- Application source lives under `src/`.
- Static assets live under `public/assets/`.
- Translations live under `messages/en.json` and `messages/es.json`.
- Catalog data is local and imported from `src/services/catalog/`.
- The App Router is locale-scoped under `src/app/[locale]/`.
