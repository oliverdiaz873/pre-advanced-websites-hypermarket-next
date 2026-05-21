'use client'

import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Breadcrumb from '@/ui/Breadcrumb/Breadcrumb'
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
    const { t } = useTranslation(['categories', 'common', 'header'])

    // Construir breadcrumb items con traducciones
    const breadcrumbItems = useMemo(() => {
        const items = [
            { label: t('common:breadcrumb.home'), to: '/' },
            { label: t(`categories:${category.id}`) },
        ]
        return items
    }, [category.id, t])

    return (
        <>
            <Breadcrumb variant="category" items={breadcrumbItems} />

            <div className="category-page-content">
                {sections.map((section, index) => (
                    <ProductCarouselSectionWithActions
                        key={section.slug}
                        title={t(`categories:sub.${section.slug}`, { defaultValue: section.title })}
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
