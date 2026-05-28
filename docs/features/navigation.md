# Navigation

## Status

Implemented.

## Overview

The navigation feature provides desktop, tablet, and mobile navigation variants. It uses local category data and localized labels from `next-intl`.

## Primary Files

- `src/features/navigation/components/DesktopNav.tsx`
- `src/features/navigation/components/TabletNav.tsx`
- `src/features/navigation/components/MobileNav.tsx`
- `src/features/navigation/hooks/useTabletMenu.ts`
- `src/features/layout/components/Header.tsx`
- `src/services/catalog/categories.ts`
- `src/ui/LanguageSelector/LanguageSelector.tsx`

## Navigation Variants

### Desktop

`DesktopNav` renders:

- Home link.
- Hover-based categories menu with smooth fade and slide animations.
- Nested subcategory menu with translateX animations.
- Offers link.
- Contact link.

Animation details:
- Dropdowns use opacity + visibility + transform transitions (0.3s ease)
- First-level menus slide down with `translateY(10px → 0)`
- Nested menus slide in from right with `translateX(10px → 0)`
- Chevron icons rotate on hover for visual feedback

### Tablet

`TabletNav` renders the same top-level structure as desktop, but delegates click-driven submenu behavior to `useTabletMenu`.

`useTabletMenu`:

- Only applies behavior between 768px and 1199px.
- Opens and closes first-level and nested menus.
- Closes menus on outside click.
- Closes active menus when resizing outside the tablet range.

### Mobile

`MobileNav` renders:

- Dark overlay backdrop with opacity fade transition.
- Slide-out menu panel from left (animate with `-translate-x-full` to `translate-x-0`).
- Accordion-style categories with toggles.
- Nested subcategory toggles.
- Home, offers, and contact links.
- Inline language selector.

Animation details:
- Menu panel has 300ms ease-in-out slide-in/out transition
- Backdrop has opacity transition (0.3s)
- Body scroll is locked when menu is open via `document.body.style.overflow`
- Panel width: 280px on mobile, 320px on tablet
- Nested menus expand/collapse smoothly

## Data Sources

- Category links come from `src/services/catalog/categories.ts`.
- Category and navigation labels come from translation namespaces.
- Locale-aware links use wrappers from `src/i18n/routing.ts`.

## Header Integration

`Header` chooses the active navigation variant based on viewport width:

- `< 768px`: mobile.
- `768px` to `< 1200px`: tablet.
- `>= 1200px`: desktop.

Navigation is hidden when search is active on non-mobile viewports.

## Current Limitations

- Viewport mode is client-derived.
- Menu state is not persisted across navigation.
