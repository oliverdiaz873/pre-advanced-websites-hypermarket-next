# Offers

## Status

Implemented.

## Overview

The offers feature renders discounted products fetched from the real backend `GET /offers` (F5.4). The backend is the single source of truth for which products are on offer and their discount data; discount percentages are never derived from local mock data.

## Primary Files

- `src/app/[locale]/(shop)/offers/page.tsx`
- `src/app/[locale]/(shop)/offers/loading.tsx`
- `src/features/offers/components/OffersPageClient.tsx`
- `src/features/offers/components/OfferFilters.tsx`
- `src/features/offers/components/OfferBadge.tsx`
- `src/features/offers/components/EmptyOffers.tsx`
- `src/features/offers/hooks/useOfferFilters.ts`
- `src/lib/api-client.ts` (`fetchOffers`, `mapApiOfferToOfferProduct`, `OfferProduct`)

## Route Flow

1. `offers/page.tsx` generates metadata from the `offers` translation namespace and fetches categories plus offers server-side (`fetchCategories` + `getOffers` → mapped to `OfferProduct[]`). On failure it passes `error` to the client instead of tumbling the SSR.
2. The route renders `OffersPageClient` with `{ categories, offers, error }`.
3. `OffersPageClient` gets offer state from `useOfferFilters(offers, categories)`.
4. Desktop filters render in a sidebar.
5. Mobile filters render inside `Drawer`.
6. Results render through `ProductGrid` with `OfferBadge` and `AddToCartButton`.
7. Empty filtered results render `EmptyOffers`; the error branch renders `EmptyState` with `offers.error_state.*`.
8. If the backend is unreachable, `fetchOffers` degrades to an empty list so the UI shows "no offers" instead of breaking.

## Offer Data

- Backend `GET /offers?lang=` is the single source of truth (F5.4).
- `mapApiOfferToOfferProduct` maps `ApiOffer` → `OfferProduct` (extends `Product` with `oldPrice?: string` and `discountPercentage?: number`), backing `discountPrice` into `precio`/`precioTexto` and `originalPrice` into `oldPrice`.
- `useOfferFilters` filters/sorts the passed `offers` by category and discount percentage; it holds no data of its own.

## Filtering And Sorting

`useOfferFilters` stores `selectedCategory`.

Derived values:

- `offerProducts`: all valid offer products.
- `filteredProducts`: offers matching the selected top-level category.
- `sortedProducts`: filtered offers sorted by discount percentage descending.

Category filtering maps top-level categories to their slugs (the same `categoryId` the backend returns).

## Badge Integration (F5.4)

Server pages joining offers with catalog data call `mapApiOfferToOfferProduct` and enrich by product id:

- Offers page (`/offers`), search results (`/search`), category products (`/category/[id]`), product detail + related (`/product/[id]`), home offer carousel.
- `ProductCarouselSectionWithActions` renders the `OfferBadge` when the section is an offer section or the product already carries a `discountPercentage`.
- The offer carousel on both home pages (`[locale]/page.tsx` and `[locale]/(shop)/page.tsx`) uses `fetchOffers`; the featured carousel remains on local catalog data (debt F5-post).

## Cart Interaction

`AddToCartButton` forwards the enriched offer fields (`isOffer`, `oldPrice`, `discountPercentage`) into the cart item. `CartContext` preserves the backend `discountPercentage` with precedence, falling back to a local pure `discountFromPrices` helper only when the product arrived without offer data. `CartItemsList` reads those fields from the item (no mock lookup).

## Current Limitations

- The featured carousel on the home pages is still backed by the local catalog (debt F5-post).
- There is no schedule, inventory check, or remote pricing source beyond `GET /offers`.