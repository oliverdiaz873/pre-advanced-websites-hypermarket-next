# Architecture

## Overview

This project is a Next.js `16.2.6` App Router storefront for a localized hypermarket experience. It uses React `19.2.4`, TypeScript, `next-intl`, Tailwind CSS through PostCSS, component-level CSS files, and local TypeScript catalog data.

The application does not currently use a backend API, database, route handlers, or remote product service. Catalog, category, offer, and product-detail data are imported from local modules under `src/services/catalog/`.

## Route Model

Routes are defined under `src/app/[locale]/`. The `[locale]` segment is handled by `next-intl`, and `(shop)` is a route group that shares storefront layout without adding a URL segment.

| Route area | Route file |
| --- | --- |
| Locale layout | `src/app/[locale]/layout.tsx` |
| Shop layout | `src/app/[locale]/(shop)/layout.tsx` |
| Home | `src/app/[locale]/(shop)/page.tsx` |
| Cart | `src/app/[locale]/(shop)/cart/page.tsx` |
| Category detail | `src/app/[locale]/(shop)/category/[id]/page.tsx` |
| Contact | `src/app/[locale]/(shop)/contact/page.tsx` |
| Privacy policy | `src/app/[locale]/(shop)/legal/privacy/page.tsx` |
| Terms | `src/app/[locale]/(shop)/legal/terms/page.tsx` |
| Offers | `src/app/[locale]/(shop)/offers/page.tsx` |
| Product detail | `src/app/[locale]/(shop)/product/[id]/page.tsx` |
| Search | `src/app/[locale]/(shop)/search/page.tsx` |
| Robots metadata | `src/app/robots.ts` |
| Sitemap metadata | `src/app/sitemap.ts` |

Route-level loading files exist for home, cart, category, offers, product detail, and search. The category page uses `[id]`, while the current category loading file is located at `category/[slug]/loading.tsx`.

## Internationalization

Internationalization is implemented with `next-intl`.

- Supported locales: `es`, `en`.
- Default locale: `es`.
- Routing configuration: `src/i18n/routing.ts`.
- Request configuration: `src/i18n/request.ts`.
- Messages: `messages/es.json` and `messages/en.json`.
- Middleware/proxy: `src/proxy.ts`.

The locale layout validates the URL locale, calls `setRequestLocale(locale)`, loads messages with `getMessages()`, and wraps the application with `NextIntlClientProvider`.

## Layout Composition

`src/app/[locale]/(shop)/layout.tsx` wraps storefront pages with:

- `CartProvider` from `src/features/cart/CartContext.tsx`.
- `ScrollToTop`.
- Shared SVG icon sprite through `Icons`.
- Global `Header`.
- Fixed-header spacer.
- Main content wrapper.
- Global `Footer`.

This makes cart state, navigation, search, language selection, global icons, and footer links available across the shop route group.

## Rendering Strategy

The project follows the App Router default of Server Components unless a file is marked with `"use client"`.

Server-side responsibilities include:

- Route metadata through `generateMetadata`.
- Locale message loading in the root locale layout.
- Local catalog lookup in product and category route pages.
- Sitemap and robots metadata generation.
- JSON-LD generation on home, product, and category pages.

Client-side responsibilities include:

- Cart context, persistence, and controls.
- Header viewport state and search interactions.
- Mobile and tablet navigation behavior.
- Product detail image lightbox.
- Product cards, grids, and carousel interactivity.
- Offer filtering and mobile filter drawer.
- Search result filtering.
- Contact form state and validation.
- Legal/contact page body theme toggles.

## Data Flow

Catalog data is local and static:

- `src/services/catalog/products.ts`: product catalog.
- `src/services/catalog/categories.ts`: category and subcategory navigation data.
- `src/services/catalog/productPageData.ts`: extended product details.
- `src/services/catalog/offers.ts`: offer product ids and old prices.
- `src/services/catalog/categorySectionMap.ts`: section slug normalization for category pages.

Product detail flow:

1. The route receives `id` from `params`.
2. The server page finds the product in `products`.
3. Missing products call `notFound()`.
4. Related products are selected from the same product category.
5. Metadata and JSON-LD are generated on the server.
6. Product data is passed to `ProductPageClient` for translated, interactive rendering.

Category flow:

1. The route receives `id` from `params`.
2. The server page finds the category in `categories`.
3. Missing categories call `notFound()`.
4. Subcategory URL fragments are mapped to product category keys.
5. Section products are selected from the local product catalog.
6. `CategoryPageClient` renders translated breadcrumbs and product carousel sections.

## State Management

The project uses local React state and React Context. It does not use Redux, Zustand, MobX, or another global state library.

- Cart state is stored in React Context and persisted to `localStorage`.
- Header search state is shared by desktop, tablet, and mobile search variants through `useHeaderSearch`.
- Offer filters use `useState` and memoized derived data in `useOfferFilters`.
- Search page results are derived on the client from the query string and local product data.
- Contact form state and validation live in `useFormValidation`.
- Navigation and visual components manage local interaction state as needed.

## API Communication

No API communication is currently implemented.

- There are no App Router route handlers.
- There are no remote `fetch` calls in application source.
- Contact form submission is simulated unless a caller provides an `onSubmit` callback.
- Checkout/payment is not implemented.

## Caching

There is no custom application caching layer.

Because catalog data is imported locally, the application does not define request cache policies, revalidation intervals, or tag-based invalidation for catalog data. Next.js handles framework-level rendering and bundling behavior.

## Styling And Assets

- Global styles live in `src/app/globals.css`.
- Feature and UI component styles live next to components as `.css` files.
- Tailwind CSS is configured through `@tailwindcss/postcss` in `postcss.config.mjs`.
- Static assets live under `public/assets/`.
- `next/image` is used for product, cart, hero, category, and logo imagery.
