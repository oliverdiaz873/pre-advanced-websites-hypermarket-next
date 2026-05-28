# Search

## Status

Implemented.

## Overview

The search feature supports header autocomplete-style search and a full search results page. Search is client-side and uses the local product catalog.

## Primary Files

- `src/app/[locale]/(shop)/search/page.tsx`
- `src/app/[locale]/(shop)/search/loading.tsx`
- `src/features/search/hooks/useHeaderSearch.ts`
- `src/features/search/components/DesktopSearch.tsx`
- `src/features/search/components/TabletSearch.tsx`
- `src/features/search/components/MobileSearch.tsx`
- `src/features/search/components/SearchPageClient.tsx`
- `src/features/search/components/EmptySearchResults.tsx`
- `src/lib/searchUtils.ts`
- `src/services/catalog/products.ts`

## Header Search

`useHeaderSearch` centralizes state and behavior for desktop, tablet, and mobile search components.

It manages:

- Active/inactive search state.
- Search term.
- Input and result list refs.
- Filtered result list.
- Search toggle behavior.
- Result selection.
- Search submission.
- Outside click behavior for clearing results.

Header search behavior:

1. User opens search.
2. User types a term.
3. Products are filtered by source name and translated product name.
4. Results are normalized with `normalizarTexto`.
5. Results are limited to eight products.
6. Selecting a result routes to `/product/[id]`.
7. Submitting a query routes to `/search?q=...`.

## Search Results Page

`search/page.tsx`:

- Reads `q` from `searchParams`.
- Generates metadata from the `search` translation namespace.
- Passes the normalized query string to `SearchPageClient`.

`SearchPageClient`:

- Normalizes the query with `normalizarTexto`.
- Searches local product names and translated names.
- Renders matches through `ProductGrid`.
- Adds `AddToCartButton` to each result.
- Renders `EmptySearchResults` when there are no matches.

## Text Normalization

`src/lib/searchUtils.ts` provides:

- `normalizarTexto`: lowercases text, decomposes diacritics, and removes accent marks.
- `hasSearchQuery`: checks for non-empty search input.
- `matchesSearchQuery`: shared matching helper.

## Current Limitations

- Search is client-side only.
- Search only matches product names and translated product names.
- There is no ranking, typo tolerance, category search, or server-side search index.
