import { Metadata } from 'next';
import HeroCarousel from '@/src/features/home/components/HeroCarousel';
import ProductCarouselSection from '@/src/features/products/components/ProductCarouselSection';
import AboutUs from '@/src/features/home/components/AboutUs';
import { products } from '@/src/data/products';
import { calculateDiscountPercentage, offersData } from '@/src/data/offers';
import homeTranslationsEs from '@/public/locales/es/home.json';
import { Product } from '@/src/shared/types/product';

type OfferProduct = Product & {
    oldPrice: string
    discountPercentage: number
}

const featuredIds = [
    'televisor_samsung_75_pulgadas',
    'nevera_lg',
    'ventilador_daiwa',
    'sofa_cama_blanco',
    'carne_de_res_para_hamburguesas',
    'pollo_entero_don_pollo',
    'atun_dimar',
]

// Server-side Metadata generation using default language (es)
export const metadata: Metadata = {
    title: homeTranslationsEs.seo.title,
    description: homeTranslationsEs.seo.description,
    keywords: homeTranslationsEs.seo.keywords,
};

export default function Home() {
    const featuredProducts = products.filter((p) => featuredIds.includes(p.id))

    const offerProducts: OfferProduct[] = offersData
        .map((off) => {
            const product = products.find((p) => p.id === off.id)
            return product
                ? {
                    ...product,
                    oldPrice: off.oldPrice,
                    discountPercentage: calculateDiscountPercentage(product.precio, off.oldPrice) ?? 0,
                }
                : null
        })
        .filter((product): product is OfferProduct => product !== null)

    return (
        <>
            <HeroCarousel />
            
            <ProductCarouselSection 
                titleKey="home:sections.offers"
                title={homeTranslationsEs.sections.offers}
                products={offerProducts}
                id="ofertas"
                idPrefix="offers"
                isOffer={true}
            />

            <ProductCarouselSection 
                titleKey="home:sections.featured"
                title={homeTranslationsEs.sections.featured}
                products={featuredProducts}
                id="productos-destacados"
                idPrefix="featured"
                className="mt-6 md:mt-8"
            />

            <AboutUs />
        </>
    )
}
