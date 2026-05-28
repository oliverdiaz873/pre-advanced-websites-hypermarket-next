# Legal

## Status

Implemented.

## Overview

The legal feature renders localized privacy policy and terms pages using translation content. It does not fetch legal content from a CMS or remote service.

## Primary Files

- `src/app/[locale]/(shop)/legal/privacy/page.tsx`
- `src/app/[locale]/(shop)/legal/terms/page.tsx`
- `src/features/legal/components/LegalPageClient.tsx`
- `src/features/layout/components/LegalLayout.tsx`
- `messages/es.json`
- `messages/en.json`

## Routes

- `/legal/privacy`
- `/legal/terms`

Locale-aware URLs are handled by `next-intl` routing.

## Page Flow

1. Each route generates metadata from the `legal` translation namespace.
2. Each route renders `LegalPageClient` with `type="privacy"` or `type="terms"`.
3. `LegalPageClient` selects the expected section keys.
4. `LegalLayout` renders the title, last-updated date, intro, and translated sections.
5. Optional email values are rendered as `mailto:` links when present in messages.

## Content Model

Legal content is stored in translation files under the `legal` namespace.

The privacy page renders six sections.

The terms page renders eight sections.

## Current Limitations

- Legal content is static translation content.
- There is no CMS integration.
- There is no version history beyond the date exposed in translation messages.
