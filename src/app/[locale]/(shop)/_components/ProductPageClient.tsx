'use client'

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import Breadcrumb, { BreadcrumbItem } from '@/ui/Breadcrumb/Breadcrumb'
import { Product } from '@/types/product'
import type { Category } from '@/types/category'
import ProductDetailSectionWithActions from './ProductDetailSectionWithActions'
import ProductCarouselSectionWithActions from './ProductCarouselSectionWithActions'
import { useProductTranslation } from '@/features/products/hooks/useProductTranslation'
import { productPageData } from '@/services/catalog/productPageData'

interface ProductPageClientProps {
    product: Product
    relatedProducts: Product[]
    categories: Category[]
}

/**
 * ProductPageClient - Componente de Cliente para la página de Detalles del Producto
 *
 * ¿Por qué es necesario este componente?
 * En Next.js (App Router), la página principal (`page.tsx`) se renderiza como un "Server Component"
 * para poder exportar `generateMetadata` y generar el SEO dinámico (títulos, descripciones y JSON-LD)
 * antes de enviar la página al cliente.
 * 
 * Sin embargo, para utilizar herramientas de internacionalización que dependen de React Context 
 * (como los hooks `useTranslation` y `useProductTranslation`) y para renderizar la interfaz dinámica 
 * correctamente con sus estados, es obligatorio que el componente se ejecute en el cliente (marcado con `'use client'`).
 * 
 * Este patrón (Client Boundary) nos permite tener lo mejor de ambos mundos: 
 * Excelente SEO en el servidor (`page.tsx`) y traducciones/interactividad en el cliente (`ProductPageClient`).
 */
export default function ProductPageClient({ product, relatedProducts, categories }: ProductPageClientProps) {
    const tCommon = useTranslations('common');
    const tCategories = useTranslations('categories');
    
    const pageData = productPageData[product.id]
    const { name, labels } = useProductTranslation(product, pageData)

    const breadcrumbItems = useMemo(() => {
        const parentCategory = categories.find((cat) => cat.id === product.categoria)
        const subcategory = parentCategory?.subcategories.find((sub) => {
            const slug = sub.href.split('#')[1] ?? sub.href.split('/').filter(Boolean).pop()
            return slug === product.subcategoryId
        })

        const items: BreadcrumbItem[] = [
            { label: tCommon('breadcrumb.home'), to: '/' },
        ]

        if (parentCategory) {
            items.push({
                label: tCategories(parentCategory.id),
                to: parentCategory.href
            })
        }

        if (subcategory) {
            items.push({
                label: subcategory.name,
                to: subcategory.href
            })
        }

        items.push({ label: name })
        return items
    }, [product.categoria, product.subcategoryId, name, tCommon, tCategories, categories])

    return (
        <>
            <Breadcrumb variant="category" items={breadcrumbItems} />

            <main className="min-h-screen box-border">
                <div className="px-5 max-w-[1280px] mx-auto">
                    <ProductDetailSectionWithActions product={product} pageData={pageData} />
                </div>

                {relatedProducts.length > 0 && (
                    <ProductCarouselSectionWithActions
                        title={labels.similarProducts}
                        products={relatedProducts}
                        id="productos-similares"
                        idPrefix="similares"
                        className="mt-6 md:mt-8"
                    />
                )}
            </main>
        </>
    )
}
