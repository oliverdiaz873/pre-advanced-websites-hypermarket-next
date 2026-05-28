# Skeleton Loading Components

## Overview

The project includes reusable skeleton loading components for App Router loading states and Suspense fallbacks. These components live in `src/ui/Skeleton/` and use Tailwind CSS utility classes, including `animate-pulse`, for lightweight loading placeholders.

## Components

### `BaseSkeleton`

Base primitive for custom skeleton placeholders.

```tsx
import { BaseSkeleton } from '@/ui/Skeleton'

<BaseSkeleton className="w-full h-10" />
<BaseSkeleton className="w-32 h-32" shape="circle" />
```

Props:

- `className`: Tailwind sizing and layout classes.
- `shape`: `rectangle` by default, or `circle`.

### `HeroBannerSkeleton`

Placeholder for the home hero carousel.

```tsx
import { HeroBannerSkeleton } from '@/ui/Skeleton'

<HeroBannerSkeleton />
```

### `CategoriesSkeleton`

Placeholder for category banner content.

```tsx
import { CategoriesSkeleton } from '@/ui/Skeleton'

<CategoriesSkeleton />
```

### `ProductCardSkeleton`

Placeholder for a single product card.

```tsx
import { ProductCardSkeleton } from '@/ui/Skeleton'

<ProductCardSkeleton />
```

### `ProductsGridSkeleton`

Placeholder for a product listing section.

```tsx
import { ProductsGridSkeleton } from '@/ui/Skeleton'

<ProductsGridSkeleton count={8} />
```

Props:

- `count`: Number of placeholders to render. Defaults to `8`.

### `OfferCardSkeleton`

Placeholder for an offer card with discount badge space.

```tsx
import { OfferCardSkeleton } from '@/ui/Skeleton'

<OfferCardSkeleton />
```

### `OffersGridSkeleton`

Placeholder for an offers listing section.

```tsx
import { OffersGridSkeleton } from '@/ui/Skeleton'

<OffersGridSkeleton count={8} />
```

Props:

- `count`: Number of placeholders to render. Defaults to `8`.

## App Router Loading Files

The project uses Next.js App Router `loading.tsx` files for route-level loading states.

Implemented loading files:

- `src/app/[locale]/(shop)/loading.tsx`
- `src/app/[locale]/(shop)/category/[slug]/loading.tsx`
- `src/app/[locale]/(shop)/product/[id]/loading.tsx`
- `src/app/[locale]/(shop)/offers/loading.tsx`
- `src/app/[locale]/(shop)/search/loading.tsx`
- `src/app/[locale]/(shop)/cart/loading.tsx`

The shared header is provided by the shop layout, so loading files focus on route content rather than duplicating global layout chrome.

Note: the category page route uses `category/[id]/page.tsx`, while the current loading file is located at `category/[slug]/loading.tsx`. This documentation reflects the existing file layout.

## Suspense Usage

Skeleton components can also be used as Suspense fallbacks.

```tsx
import { Suspense } from 'react'
import { ProductsGridSkeleton } from '@/ui/Skeleton'

export default function Page() {
  return (
    <Suspense fallback={<ProductsGridSkeleton count={8} />}>
      <AsyncContent />
    </Suspense>
  )
}
```

## Implementation Notes

- Skeletons are responsive and intended to match the dimensions of the real components they represent.
- `BaseSkeleton` includes `role="status"` and `aria-label="Loading"`.
- Animations are CSS-only through Tailwind utilities.
- Components are exported from `src/ui/Skeleton/index.ts`.

## Maintenance Guidelines

- Keep skeleton dimensions aligned with the corresponding production component.
- Update route-level loading files when route layout structure changes.
- Prefer reusing `BaseSkeleton` for new placeholders before adding a new specialized skeleton component.
- Keep loading UI presentational; do not introduce data fetching or application state into skeleton components.
