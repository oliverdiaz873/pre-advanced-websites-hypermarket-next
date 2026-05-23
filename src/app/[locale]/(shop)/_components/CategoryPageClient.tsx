'use client'

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import Breadcrumb, { BreadcrumbItem } from '@/ui/Breadcrumb/Breadcrumb'
import type { Category } from '@/types/category'
import { Product } from '@/types/product'
import ProductCarouselSectionWithActions from './ProductCarouselSectionWithActions'

interface CategoryPageClientProps {
    category: Category
    sections: Array<{
        slug: string
        title: string
        products: Product[]
    }>
}

/**
 * Cliente component para la página de categoría.
 * Maneja:
 * - Breadcrumb navigation con traducciones
 * - Renderizado de secciones de carrusel
 * - Internacionalización (i18n)
 */
export default function CategoryPageClient({ category, sections }: CategoryPageClientProps) {
    const tCommon = useTranslations('common');
    const tCategories = useTranslations('categories');

    // Construir breadcrumb items con traducciones
    const breadcrumbItems = useMemo(() => {
        const items: BreadcrumbItem[] = [
            { label: tCommon('breadcrumb.home'), to: '/' },
            { label: tCategories(category.id) },
        ]
        return items
    }, [category.id, tCommon, tCategories])

    return (
        <>
            <Breadcrumb variant="category" items={breadcrumbItems} />

            <div className="category-page-content">
                {sections.map((section, index) => (
                    <ProductCarouselSectionWithActions
                        key={section.slug}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        title={tCategories.has(`sub.${section.slug}` as any) ? tCategories(`sub.${section.slug}` as any) : section.title}
                        products={section.products}
                        id={section.slug}
                        idPrefix={`${category.id}-${section.slug}`}
                        className={index === 0 ? 'category-page-first-carousel' : undefined}
                    />
                ))}
            </div>
        </>
    )
}
