/** Convierte una referencia de subcategoría antigua o explícita a su slug. */
export function sectionSlugToProductCategoria(slug: string): string {
    return slug
}

/** Extrae el slug final de "/category/foo/bar" y conserva compatibilidad con "/category/foo#bar". */
export function subcategorySlugFromHref(href: string): string {
    const hash = href.split('#')[1]
    if (hash) return hash
    return href.split('/').filter(Boolean).pop() ?? ''
}
