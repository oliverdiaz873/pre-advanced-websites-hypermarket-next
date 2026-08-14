import { Metadata } from 'next';
import HeroCarousel from '@/features/home/components/HeroCarousel';
import ProductCarouselSectionWithActions from './_components/ProductCarouselSectionWithActions';
import AboutUs from '@/features/home/components/AboutUs';
import CategoryBannersSection from '@/features/home/components/CategoryBannersSection';
import { getTranslations, getLocale } from 'next-intl/server';
import { fetchCategories, fetchOffers, fetchFeaturedProducts, type ApiLang } from '@/lib/api-client';

// Server-side Metadata generation using next-intl
export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('home');
    return {
        title: t('seo.title'),
        description: t('seo.description'),
        keywords: t('seo.keywords'),
    };
}

export default async function Home() {
    const t = await getTranslations('home');
    // F5.3: slugs válidos desde el backend para validar los banners de autoría local
    const categories = await fetchCategories();
    // F5.4: ofertas reales para el carrusel "Ofertas".
    const locale = (await getLocale()) as ApiLang;
    const offerProducts = await fetchOffers(locale);
    // E4.6: destacados reales desde GET /products?featured=true (sin IDs hardcodeados).
    const featuredProducts = await fetchFeaturedProducts(locale);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Hipermercado Superior',
        url: 'https://www.hipermercadosuperior.com',
        potentialAction: {
            '@type': 'SearchAction',
            target: 'https://www.hipermercadosuperior.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
        },
    };

    const orgJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Hipermercado Superior',
        url: 'https://www.hipermercadosuperior.com',
        logo: 'https://www.hipermercadosuperior.com/assets/images/logo/logo.png',
        sameAs: [
            'https://www.facebook.com/hipermercadosuperior',
            'https://www.instagram.com/hipermercadosuperior',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+1-809-555-0199',
            contactType: 'customer service',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
            />
            <HeroCarousel />
            
            <ProductCarouselSectionWithActions 
                title={t('sections.offers')}
                products={offerProducts}
                id="ofertas"
                idPrefix="offers"
                isOffer={true}
            />

            {featuredProducts.length > 0 ? (
                <ProductCarouselSectionWithActions
                    title={t('sections.featured')}
                    products={featuredProducts}
                    id="productos-destacados"
                    idPrefix="featured"
                    className="mt-6 md:mt-8"
                />
            ) : (
                <section id="productos-destacados" className="mt-6 md:mt-8 px-2 md:px-8 py-2 md:py-6 w-full border-t border-gray-200">
                    <h2 className="mb-4 md:mb-6">{t('sections.featured')}</h2>
                    <p className="text-gray-600">{t('sections.featured_empty')}</p>
                </section>
            )}

            <CategoryBannersSection categories={categories} />

            <AboutUs />
        </>
    )
}
