# Layout

## Status

Implemented.

## Overview

The layout feature provides shared storefront chrome and supporting layout components. It includes the global header, footer, and the legal page shell.

## Primary Files

- `src/app/[locale]/layout.tsx`
- `src/app/[locale]/(shop)/layout.tsx`
- `src/features/layout/components/Header.tsx`
- `src/features/layout/components/Footer.tsx`
- `src/features/layout/components/LegalLayout.tsx`
- `src/ui/Icons/Icons.tsx`
- `src/ui/ScrollToTop/ScrollToTop.tsx`

## Locale Layout

`src/app/[locale]/layout.tsx`:

- Imports global CSS.
- Defines global metadata.
- Validates the `locale` route param.
- Calls `setRequestLocale(locale)`.
- Loads messages with `getMessages()`.
- Wraps children with `NextIntlClientProvider`.
- Sets `<html lang={locale}>`.

## Shop Layout

`src/app/[locale]/(shop)/layout.tsx`:

- Wraps children with `CartProvider`.
- Renders `ScrollToTop`.
- Renders global SVG icons through `Icons`.
- Renders `Header`.
- Adds a fixed-header spacer.
- Renders page content inside `<main>`.
- Renders `Footer`.

## Header

`Header` is a Client Component.

Responsibilities:

- Detects mobile, tablet, and desktop viewport modes.
- Renders the corresponding navigation and search variant.
- Displays brand/logo.
- Shows cart item count through `useCart`.
- Routes search submissions to `/search?q=...`.
- Routes selected search results to `/product/[id]`.
- Renders the language selector on non-mobile viewports.
- Opens and closes `MobileNav` on mobile.

Mobile menu button:

- Animated 3-line hamburger that transforms to X on click.
- Uses inline SVG `<span>` elements with rotating/opacity transitions.
- Smooth 300ms ease-in-out animations for each line:
  - Top line rotates 45° and translates down
  - Middle line fades out (opacity 0)
  - Bottom line rotates -45° and translates up

## Footer

`Footer` is an async Server Component.

Responsibilities:

- Loads translations from the `footer` namespace.
- Displays the current year.
- Renders social links.
- Links to privacy and terms pages.

## Legal Layout

`LegalLayout` is a Client Component used by legal pages.

Responsibilities:

- Applies `dark-theme-body` while mounted.
- Renders legal page title, last-updated date, and children.

## Current Limitations

- Social links in `Footer` point to placeholder `tuweb` URLs.
- Header viewport mode is determined on the client after mount.
