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

The application reads backend configuration from environment variables (see
`.env.example`). Copy it to `.env.local` for local development; the defaults
target the local backend (`http://localhost:3000`).

- `NEXT_PUBLIC_API_URL` — base URL of the REST API for **client-side** calls (public catalog).
- `API_URL` — base URL of the REST API for **server-side** calls (RSC, Server Actions, Route Handlers, auth flows). Must not start with `NEXT_PUBLIC_` (not exposed to the client).
- `NEXT_PUBLIC_STORAGE_PUBLIC_URL` — public base URL for resolving image/storage keys.

For production, set these to the deployed backend URL. Do not commit real
secrets or real production URLs in tracked files.

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
