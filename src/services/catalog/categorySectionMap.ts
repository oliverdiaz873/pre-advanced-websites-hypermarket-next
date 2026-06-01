/**
 * Los enlaces del menú usan slugs en URL (#...) que deben coincidir con el id de cada sección.
 * Algunos valores de `producto.categoria` en productos.ts usan caracteres distintos.
 * Mapeo solo para las categorías que tienen diferencias:
 */
const SECTION_SLUG_TO_PRODUCT_CATEGORIA: Record<string, string> = {
    // Conversión de guiones a guiones bajos para estas categorías
    'juguetes-para-ninos': 'juguetes_para_ninos',
    'pantalones-para-ninos': 'pantalones_para_ninos',
    // El resto de categorías coinciden exactamente entre slug y categoría
}

export function sectionSlugToProductCategoria(slug: string): string {
    return SECTION_SLUG_TO_PRODUCT_CATEGORIA[slug] ?? slug
}

/** Extrae el fragmento #seccion de un href como "/category/foo#bar" -> "bar" */
export function subcategorySlugFromHref(href: string): string {
    const hash = href.split('#')[1]
    return hash ?? ''
}
