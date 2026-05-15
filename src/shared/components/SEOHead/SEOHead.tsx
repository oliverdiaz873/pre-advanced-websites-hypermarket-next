import type { Metadata } from 'next'

const BASE_URL = 'https://www.hipermercadosuperior.com'
const DEFAULT_IMAGE = `${BASE_URL}/assets/images/logo/logo.png`
const SITE_NAME = 'Hipermercado Superior'
const AUTHOR = 'Oliver Antonio Diaz'
const TWITTER_SITE = '@hipermercadosuperior'

export interface SEOImage {
    url: string
    alt?: string
    width?: number
    height?: number
}

export interface SEOHeadProps {
    title: string
    description: string
    url?: string
    image?: SEOImage | string
    type?: 'website' | 'article' | 'profile'
    noIndex?: boolean
    keywords?: string | string[]
}

export function createMetadata({
    title,
    description,
    url = '',
    image,
    type = 'website',
    noIndex = false,
    keywords,
}: SEOHeadProps): Metadata {
    const imageData: SEOImage =
        typeof image === 'string'
            ? { url: image }
            : image ?? { url: DEFAULT_IMAGE }

    const canonicalUrl = new URL(url, BASE_URL).toString()
    const imageUrl = new URL(imageData.url, BASE_URL).toString()
    const fullTitle = `${title} | ${SITE_NAME}`

    return {
        title: fullTitle,
        description,
        keywords,
        authors: [{ name: AUTHOR }],
        robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: fullTitle,
            description,
            type,
            url: canonicalUrl,
            siteName: SITE_NAME,
            locale: 'es_ES',
            images: [
                {
                    url: imageUrl,
                    alt: imageData.alt ?? SITE_NAME,
                    width: imageData.width ?? 1200,
                    height: imageData.height ?? 630,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            site: TWITTER_SITE,
            title: fullTitle,
            description,
            images: [imageUrl],
        },
    }
}

export default function SEOHead() {
    return null
}
