import { useEffect, useRef, useState } from 'react'
import { useLocale } from 'next-intl'
import { search, mapApiProductsToProducts, type ApiLang } from '@/lib/api-client'
import { hasSearchQuery } from '@/lib/searchUtils'

/**
 * Interfaz que representa un producto en los resultados de búsqueda del header.
 * 
 * @interface HeaderSearchProduct
 * @property {string} id - Identificador único del producto (ej: 'manzana_verde')
 * @property {string} name - Nombre del producto (localizado por `?lang=`)
 * @property {string} imagen - URL pública de la imagen del producto
 */
export interface HeaderSearchProduct {
    id: string
    name: string
    imagen: string
}

/**
 * Hook personalizado para gestionar la lógica de búsqueda del header.
 * 
 * Comparte estado, filtrado y handlers para que los componentes DesktopSearch,
 * TabletSearch y MobileSearch reutilicen la misma lógica sin duplicar código.
 * 
 * F5.3.2: los resultados vienen de la API real (GET /search a través de
 * `api-client.search`) en lugar del catálogo mock. `?lang=` se deriva del
 * locale activo (`useLocale`) para que el backend localice los nombres.
 * 
 * CARACTERÍSTICAS:
 * - Debounce de 300ms antes de llamar al API mientras se escribe
 * - Token anti-carrera (AbortController): descarta respuestas fuera de orden
 * - Query vacía: nunca se llama al backend (responde 400)
 * - Re-evaluación al cambiar de idioma (efecto dependiente del locale)
 * - Límite de resultados: máximo 8 productos por búsqueda
 * - Cierre automático: detecta clicks fuera del dropdown
 * 
 * FLUJO DE USO:
 * 1. Usuario escribe en input → setSearchTerm actualiza searchTerm
 * 2. useEffect (debounce) consulta la API con el término y el locale
 * 3. Click en resultado → handleResultClick navega a producto
 * 4. Enter o botón submit → handleSearchSubmit navega a página de resultados
 * 
 * @hook
 * @param {Function} onResultSelect - Callback cuando usuario selecciona un producto individual
 * @param {Function} onSearchSubmit - Callback cuando usuario ejecuta búsqueda general
 * @returns {Object} Estado y handlers del buscador
 */
export const useHeaderSearch = (
    onResultSelect: (id: string) => void,
    onSearchSubmit: (term: string) => void
) => {
    const locale = useLocale() as ApiLang;
    const [isSearchActive, setIsSearchActive] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState<HeaderSearchProduct[]>([])
    const searchInputRef = useRef<HTMLInputElement>(null)
    const resultsRef = useRef<HTMLUListElement>(null)

    // Debounce 300ms + AbortController como token anti-carrera: el cleanup del
    // effect aborta la búsqueda anterior, por lo que solo la última escrita se
    // aplica al estado. Query vacía limpia resultados sin tocar el backend.
    // (El clear vive dentro del callback del timeout para no llamar setState
    // síncronamente en el cuerpo del effect — react-hooks/set-state-in-effect.)
    useEffect(() => {
        const term = searchTerm.trim()
        const controller = new AbortController()

        const timeout = setTimeout(async () => {
            if (controller.signal.aborted) return

            if (!hasSearchQuery(term)) {
                setSearchResults([])
                return
            }

            try {
                const { data } = await search({ q: term }, locale)
                if (controller.signal.aborted) return
                const productResults = mapApiProductsToProducts(data)
                    .slice(0, 8)
                    .map((product) => ({
                        id: product.id,
                        name: product.name,
                        imagen: product.imagen,
                    }))
                setSearchResults(productResults)
            } catch {
                if (controller.signal.aborted) return
                setSearchResults([])
            }
        }, 300)

        return () => {
            controller.abort()
            clearTimeout(timeout)
        }
    }, [searchTerm, locale])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
                setSearchTerm('')
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSearchToggle = () => {
        setIsSearchActive((current) => {
            const next = !current

            if (next) {
                setTimeout(() => searchInputRef.current?.focus(), 100)
            } else {
                setSearchTerm('')
            }

            return next
        })
    }

    const handleResultClick = (id: string) => {
        setSearchTerm('')
        setIsSearchActive(false)
        onResultSelect(id)
    }

    const handleSearchSubmit = () => {
        if (!isSearchActive) {
            setIsSearchActive(true)
            setTimeout(() => searchInputRef.current?.focus(), 100)
            return
        }

        if (!hasSearchQuery(searchTerm)) {
            setIsSearchActive(false)
            setSearchTerm('')
            return
        }

        const nextTerm = searchTerm.trim()
        setSearchTerm('')
        setIsSearchActive(false)
        onSearchSubmit(nextTerm)
    }

    return {
        isSearchActive,
        searchInputRef,
        resultsRef,
        searchResults,
        searchTerm,
        setSearchTerm,
        handleResultClick,
        handleSearchSubmit,
        handleSearchToggle,
    }
}