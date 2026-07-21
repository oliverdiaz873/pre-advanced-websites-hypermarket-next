import { useTranslations } from 'next-intl'
import { Product } from '@/types/product'
import { ProductPageData } from '@/services/catalog/productPageData'
import { formatProductPrice, unitLabel } from '@/lib/priceUtils'

/**
 * useProductTranslation - Hook para gestionar la internacionalizacion de productos.
 *
 * Este hook implementa un sistema de "Overlay & Fallback":
 * 1. Intenta buscar la traduccion en el namespace 'products'.
 * 2. Si no existe, usa el contenido original del objeto product o pageData.
 */
export const useProductTranslation = (product?: Product, pageData?: ProductPageData) => {
    const tProducts = useTranslations('products');
    const tCommon = useTranslations('common');
    const productId = product?.id
    const fallbackName = product?.name ?? tCommon('product.not_found')

    const nameKey = `${productId}.name`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finalName = productId && tProducts.has(nameKey as any)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ? tProducts(nameKey as any)
        : fallbackName

    const descKey = `${productId}.description`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finalDescription = productId && tProducts.has(descKey as any)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ? tProducts(descKey as any)
        : (pageData?.description ?? `Disfruta de la mejor calidad con nuestro ${fallbackName}.`)

    const specsKey = `${productId}.specs`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finalSpecs = productId && tProducts.has(specsKey as any)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ? (tProducts.raw(specsKey as any) as string[])
        : (pageData?.detalles ?? [])

    const rawUnit = product ? unitLabel(product) : 'unidad'
    const unitKey = `units.${rawUnit}`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const translatedUnit = tCommon.has(unitKey as any) ? tCommon(unitKey as any) : rawUnit

    return {
        name: finalName,
        description: finalDescription,
        specs: finalSpecs,
        priceText: product
            ? formatProductPrice(product, {
                pricePrefix: tCommon('product.price_prefix'),
                translatedUnit,
            })
            : '',
        labels: {
            viewDetails: tCommon('product.view_details', { name: finalName }),
            addToCart: tCommon('product.add_to_cart'),
            pricePrefix: tCommon('product.price_prefix'),
            unit: translatedUnit,
            similarProducts: tCommon('product.similar_products'),
            notFound: tCommon('product.not_found'),
            clickToEnlarge: tCommon('product.click_to_enlarge'),
            closeModal: tCommon('product.close_modal'),
            expandedImage: tCommon('product.expanded_image', { name: finalName }),
        },
    }
}
