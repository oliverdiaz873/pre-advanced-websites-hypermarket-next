# Home

## Status

Implemented.

## Overview

The home feature renders the storefront landing experience for the shop route group. It combines a hero carousel, offer carousel, featured product carousel, category banners, and an about section.

## Primary Files

- `src/app/[locale]/(shop)/page.tsx`
- `src/app/[locale]/(shop)/loading.tsx`
- `src/features/home/components/HeroCarousel.tsx`
- `src/features/home/components/CategoryBannersSection.tsx`
- `src/features/home/components/CategoryBanner.tsx`
- `src/features/home/components/AboutUs.tsx`
- `src/features/home/components/animations.ts`
- `src/features/home/hooks/useScrollScale.ts`
- `src/app/[locale]/(shop)/_components/ProductCarouselSectionWithActions.tsx`

## Page Flow

1. The home page generates metadata from the `home` translation namespace.
2. Featured products are selected by hardcoded product ids from the local catalog.
3. Offer products are built by joining `offersData` with `products` and calculating discount percentages.
4. The page renders website and organization JSON-LD.
5. The UI renders `HeroCarousel`, offer products, featured products, `CategoryBannersSection`, and `AboutUs`.

## Hero Carousel

`HeroCarousel` is a Client Component.

It uses:

- Three configured banner assets.
- Mobile and desktop image variants.
- `next/image`.
- A 5-second auto-advance interval.
- Previous/next controls on larger viewports.
- Dot indicators.
- Touch swipe handling.
- `next-intl` labels for alt text and controls.

## Category Banners

`CategoryBannersSection` defines eight category banner entries with:

- Category ids.
- Translation keys.
- Category route targets.
- Image assets.
- Gradient and accent colors.

`CategoryBanner` component features:

- Responsive layout: horizontal on mobile (280px+ breakpoint), with optimized spacing and sizing
- Mobile-first design with breakpoints at 480px, 768px, and 1200px
- Alternating left/right image positioning using `--reversed` variant
- Compact mobile layout (140-220px images) expanding to full desktop (340px+)
- Line-clamped descriptions on mobile (3-4 lines), unlimited on desktop
- Smooth all-property transitions (0.3s cubic-bezier)
- Uses `framer-motion` and `useInView` for section reveal behavior

## About Section

`AboutUs` is a Client Component that renders localized content and the project logo image. It uses `framer-motion` scroll progress to animate scale and opacity, with mobile-specific behavior.

## Data Sources

- Product catalog: `src/services/catalog/products.ts`.
- Offer data: `src/services/catalog/offers.ts`.
- Translations: `messages/es.json` and `messages/en.json`.
- Assets: `public/assets/images/`.

## Current Limitations

- Featured product ids are hardcoded in the home page.
- Hero banners are hardcoded inside `HeroCarousel`.
- Home content is not fetched from a CMS or backend.
