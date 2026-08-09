import { Metadata } from 'next';
import HeroCarousel from '@/features/home/components/HeroCarousel';
import ProductCarouselSectionWithActions from './_components/ProductCarouselSectionWithActions';
import AboutUs from '@/features/home/components/AboutUs';
import CategoryBannersSection from '@/features/home/components/CategoryBannersSection';
import { products } from '@/services/catalog/products';
import { getTranslations, getLocale } from 'next-intl/server';
import { fetchCategories, fetchOffers, type ApiLang } from '@/lib/api-client';

const featuredIds = [
    'televisor_samsung_75_pulgadas',
    'nevera_lg',
    'ventilador_daiwa',
    'sofa_cama_blanco',
    'carne_de_res_para_hamburguesas',
    'pollo_entero_don_pollo',
    'atun_dimar',
]

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
    // F5.4: ofertas reales para el carrusel "Ofertas" (featured sigue con contenido mock → deuda F5-post).
    const locale = (await getLocale()) as ApiLang;
    const offerProducts = await fetchOffers(locale);
    const featuredProducts = products.filter((p) => featuredIds.includes(p.id))

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

            <ProductCarouselSectionWithActions 
                title={t('sections.featured')}
                products={featuredProducts}
                id="productos-destacados"
                idPrefix="featured"
                className="mt-6 md:mt-8"
            />

            <CategoryBannersSection categories={categories} />

            <AboutUs />
        </>
    )
}
