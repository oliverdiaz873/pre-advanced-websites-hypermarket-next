# Folder Structure

This document describes the project structure that is relevant to development and maintenance.

## Root

```text
.
|-- docs/
|-- messages/
|-- public/
|-- scripts/
|-- src/
|-- AGENTS.md
|-- eslint.config.mjs
|-- LICENSE
|-- next-env.d.ts
|-- next.config.ts
|-- package-lock.json
|-- package.json
|-- postcss.config.mjs
|-- README.md
|-- tsconfig.json
`-- tsconfig.tsbuildinfo
```

Generated or dependency directories may also be present locally:

- `.next/`: Next.js build and development output.
- `node_modules/`: Installed npm dependencies.
- `.git/`: Git repository metadata.

## Root Directories

- `docs/`: Project documentation.
- `messages/`: Translation message files for `next-intl`.
- `public/`: Static assets served by Next.js.
- `scripts/`: Local validation scripts used by npm commands.
- `src/`: Application source code.

## Source Structure

```text
src/
|-- app/
|-- features/
|-- hooks/
|-- i18n/
|-- lib/
|-- services/
|-- types/
|-- ui/
`-- proxy.ts
```

- `app/`: Next.js App Router route tree.
- `features/`: Feature-oriented modules.
- `hooks/`: Shared hooks directory. It currently exists but has no files.
- `i18n/`: `next-intl` routing and request configuration.
- `lib/`: Shared utility functions.
- `services/`: Local data services.
- `types/`: Shared TypeScript types.
- `ui/`: Reusable UI primitives and shared visual components.
- `proxy.ts`: `next-intl` middleware/proxy configuration.

## `src/app`

```text
src/app/
|-- [locale]/
|   |-- (shop)/
|   |   |-- _components/
|   |   |-- cart/
|   |   |-- category/
|   |   |-- contact/
|   |   |-- legal/
|   |   |-- offers/
|   |   |-- product/
|   |   |-- search/
|   |   |-- layout.tsx
|   |   |-- loading.tsx
|   |   `-- page.tsx
|   `-- layout.tsx
|-- favicon.ico
|-- globals.css
|-- robots.ts
`-- sitemap.ts
```

Responsibilities:

- Defines locale-scoped routes.
- Provides route layouts, pages, loading states, metadata, robots, and sitemap generation.
- Uses `(shop)` as a route group for shared storefront layout without adding a URL segment.
- Uses `_components/` for route-local client wrappers that combine product UI with cart actions.

Implemented route areas:

- Home.
- Cart.
- Category detail.
- Contact.
- Legal privacy and terms.
- Offers.
- Product detail.
- Search.

## `src/features`

```text
src/features/
|-- cart/
|-- contact/
|-- home/
|-- layout/
|-- legal/
|-- navigation/
|-- offers/
|-- products/
`-- search/
```

Each feature has a matching document under `docs/features/`.

- `cart/`: Cart context, persistence, cart page UI, add-to-cart controls, quantity controls, and summary.
- `contact/`: Contact page client UI, form component, and validation hook.
- `home/`: Hero carousel, category banners, about section, and home animations.
- `layout/`: Shared header, footer, and legal layout shell.
- `legal/`: Legal page client renderer for terms and privacy content.
- `navigation/`: Desktop, tablet, and mobile navigation components.
- `offers/`: Offers page UI, filters, offer badges, empty state, and filtering hook.
- `products/`: Product cards, grids, carousels, detail section, and product translation hook.
- `search/`: Header search variants, search page client, empty search state, and shared search hook.

## `src/i18n`

- `routing.ts`: Supported locales, default locale, and localized navigation wrappers.
- `request.ts`: Request-time locale resolution and message loading.

## `src/lib`

- `assetUtils.ts`: Normalizes static asset paths for assets served from `public/assets/`.
- `priceUtils.ts`: Formats prices and resolves product unit labels.
- `searchUtils.ts`: Normalizes text and evaluates search matches.
- `index.ts`: Utility exports.

## `src/services`

```text
src/services/catalog/
|-- categories.ts
|-- categorySectionMap.ts
|-- index.ts
|-- offers.ts
|-- productPageData.ts
`-- products.ts
```

The catalog service is local and static. It does not call a remote API.

## `src/types`

- `category.ts`: Category and subcategory types.
- `product.ts`: Product catalog type.

## `src/ui`

```text
src/ui/
|-- Breadcrumb/
|-- Drawer/
|-- EmptyState/
|-- Icons/
|-- LanguageSelector/
|-- ScrollToTop/
|-- Skeleton/
|-- Toast/
`-- index.ts
```

These components are shared across feature modules.

## `public`

Static assets served by Next.js.

- `public/assets/images/`: Product images, banners, category images, backgrounds, and logos.
- `public/assets/icons/`: Favicons and icon assets.
- `public/assets/fonts/`: Local font files.

## `scripts`

- `validate-products.js`: Product data validation.
- `check-i18n.js`: Internationalization validation.
