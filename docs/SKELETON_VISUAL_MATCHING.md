# Skeleton Visual Matching

## Purpose

This document records the visual intent for the project skeleton loading states. Skeletons are designed to closely match the final layout so route transitions and loading states feel stable.

## Updated Scope

The skeleton system covers:

- Product cards.
- Product grid sections.
- Offer cards.
- Offer grid sections.
- Hero banner.
- Category content.
- Route-level loading files for home, category, product detail, offers, search, and cart pages.

## Visual Requirements

Skeletons should preserve:

- Responsive dimensions across mobile, tablet, and desktop breakpoints.
- Spacing and padding that match the real components.
- Border radius values that match the corresponding UI.
- Approximate visual hierarchy for images, titles, prices, badges, and buttons.
- Grid and carousel structure where the final content uses those layouts.

## Component Mapping

### `ProductCardSkeleton`

Represents the structure of `ProductCard`.

Expected placeholders:

- Product image area.
- Price block.
- Unit price line.
- Product title lines.
- Action button area.

### `ProductsGridSkeleton`

Represents product listing sections used by search and product collections.

Expected placeholders:

- Section title area where applicable.
- Repeated `ProductCardSkeleton` placeholders.
- Responsive grid behavior.

### `HeroBannerSkeleton`

Represents the home hero carousel.

Expected placeholders:

- Large banner region.
- Approximate carousel controls or indicators.
- Responsive banner height and aspect ratio.

### `CategoriesSkeleton`

Represents category content.

Expected placeholders:

- Repeated category blocks.
- Icon or image placeholder area.
- Text placeholder area.
- Responsive grid behavior.

### `OfferCardSkeleton`

Represents an offer card.

Expected placeholders:

- Product card structure.
- Discount badge area.
- New and old price areas.

### `OffersGridSkeleton`

Represents the offers page/listing section.

Expected placeholders:

- Offers header area.
- Repeated `OfferCardSkeleton` placeholders.
- Responsive grid behavior.

## Route Loading Coverage

Implemented route-level loading states:

| Route file | Intended content |
| --- | --- |
| `src/app/[locale]/(shop)/loading.tsx` | Home page skeleton content |
| `src/app/[locale]/(shop)/category/[slug]/loading.tsx` | Category page skeleton content; the category page itself is `category/[id]/page.tsx` |
| `src/app/[locale]/(shop)/product/[id]/loading.tsx` | Product detail and related products skeleton content |
| `src/app/[locale]/(shop)/offers/loading.tsx` | Offers filter and listing skeleton content |
| `src/app/[locale]/(shop)/search/loading.tsx` | Search results skeleton content |
| `src/app/[locale]/(shop)/cart/loading.tsx` | Cart items and summary skeleton content |

## Accessibility

Skeleton components should:

- Expose a loading status where appropriate.
- Avoid interactive controls that do not perform actions during loading.
- Preserve layout without trapping focus.
- Keep loading indicators visually clear without relying only on color.

## Maintenance Guidelines

- Update skeletons when the production component structure changes.
- Keep skeleton files small and presentational.
- Avoid adding business logic, data fetching, or translations to skeleton components.
- Prefer visual stability over decorative detail.
