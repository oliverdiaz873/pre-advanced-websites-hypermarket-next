# Offers

## Status

Implemented.

## Overview

The offers feature renders discounted products from local static offer data. Offers are not fetched from a backend and are not managed by an admin interface.

## Primary Files

- `src/app/[locale]/(shop)/offers/page.tsx`
- `src/app/[locale]/(shop)/offers/loading.tsx`
- `src/features/offers/components/OffersPageClient.tsx`
- `src/features/offers/components/OfferFilters.tsx`
- `src/features/offers/components/OfferBadge.tsx`
- `src/features/offers/components/EmptyOffers.tsx`
- `src/features/offers/hooks/useOfferFilters.ts`
- `src/services/catalog/offers.ts`
- `src/services/catalog/products.ts`
- `src/services/catalog/categories.ts`

## Route Flow

1. `offers/page.tsx` generates metadata from the `offers` translation namespace.
2. The route renders `OffersPageClient`.
3. `OffersPageClient` gets offer state from `useOfferFilters`.
4. Desktop filters render in a sidebar.
5. Mobile filters render inside `Drawer`.
6. Results render through `ProductGrid` with `OfferBadge` and `AddToCartButton`.
7. Empty filtered results render `EmptyOffers`.

## Offer Data

`src/services/catalog/offers.ts` defines:

- `offersData`: product ids and old prices.
- `calculateDiscountPercentage(currentPrice, oldPrice)`: discount calculation.

`useOfferFilters` joins `offersData` with `products` by id. Offer entries without a matching product are ignored.

## Filtering And Sorting

`useOfferFilters` stores `selectedCategory`.

Derived values:

- `offerProducts`: all valid offer products.
- `filteredProducts`: offers matching the selected top-level category.
- `sortedProducts`: filtered offers sorted by discount percentage descending.

Category filtering maps top-level categories to subcategory ids from `categories.ts`.

## Cart Interaction

Offer cards render `AddToCartButton`, but the current button only passes base product fields into cart state. Offer metadata is displayed in the offer UI, but is not currently preserved in cart items added through the standard button.

## Current Limitations

- Offers are static code data.
- There is no schedule, inventory check, or remote pricing source.
- Offer metadata is not persisted into cart items by the current add-to-cart path.
