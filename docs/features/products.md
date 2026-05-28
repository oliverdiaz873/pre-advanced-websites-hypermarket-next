# Products

## Status

Implemented.

## Overview

Products are implemented as local static catalog data rendered through Next.js App Router pages and feature components. There is no remote product API, database, or route handler.

## Primary Files

- `src/services/catalog/products.ts`
- `src/services/catalog/productPageData.ts`
- `src/services/catalog/categories.ts`
- `src/services/catalog/categorySectionMap.ts`
- `src/types/product.ts`
- `src/features/products/components/ProductCard.tsx`
- `src/features/products/components/ProductGrid.tsx`
- `src/features/products/components/ProductCarousel.tsx`
- `src/features/products/components/ProductCarouselSection.tsx`
- `src/features/products/components/ProductDetailSection.tsx`
- `src/features/products/hooks/useProductTranslation.ts`
- `src/app/[locale]/(shop)/product/[id]/page.tsx`
- `src/app/[locale]/(shop)/category/[id]/page.tsx`

## Product Type

`Product` is defined in `src/types/product.ts`.

Fields:

- `id`: Product id.
- `nombre`: Source product name.
- `url`: Legacy/source URL field kept in catalog data.
- `categoria`: Product category key used for filtering.
- `precio`: Numeric price used by cart calculations.
- `precioTexto`: Source display price text.
- `imagen`: Asset path.
- `unidad`: Optional unit label.

## Catalog Data

The product catalog is stored in `src/services/catalog/products.ts`.

Extended product detail content is stored in `src/services/catalog/productPageData.ts` and keyed by product id. Product detail pages use this for descriptions and specifications when available.

Categories and subcategories are stored in `src/services/catalog/categories.ts`. Category pages map subcategory URL fragments to product category keys through `src/services/catalog/categorySectionMap.ts`.

## Listing Usage

Products appear in:

- Home featured carousel.
- Home offers carousel.
- Category carousel sections.
- Offers grid.
- Search results grid.
- Product detail related-products carousel.

`ProductCard` renders reusable product cards. `ProductGrid` renders grid listings. `ProductCarousel` and `ProductCarouselSection` render carousel listings.

Cart actions are injected through wrapper components and render props, including `ProductCarouselSectionWithActions` and `ProductDetailSectionWithActions` under the shop route group.

## Product Detail Flow

Route file: `src/app/[locale]/(shop)/product/[id]/page.tsx`.

Flow:

1. The route reads `id` from `params`.
2. The server page looks up the product in the local `products` array.
3. Missing products call `notFound()`.
4. Metadata is generated from the product and optional `productPageData`.
5. Product JSON-LD structured data is rendered.
6. Related products are selected from the same product category.
7. `ProductPageClient` renders breadcrumbs, product details, and related products.

## Category Flow

Route file: `src/app/[locale]/(shop)/category/[id]/page.tsx`.

Flow:

1. The route reads `id` from `params`.
2. The server page finds the category in local category data.
3. Missing categories call `notFound()`.
4. Subcategory href fragments are converted into product category keys.
5. Products are grouped into carousel sections.
6. `CategoryPageClient` renders translated breadcrumbs and product sections.

## Translations

`useProductTranslation` overlays translations from the `products` namespace and falls back to source catalog fields when translation keys are missing.

It also resolves translated unit labels through the `common` namespace and formats product prices through `src/lib/priceUtils.ts`.

## Fetching And Caching

Products are not fetched over the network.

There are no custom cache policies, revalidation intervals, or tag-based cache invalidation for product data. Product data is imported from local TypeScript modules and bundled by the application.
