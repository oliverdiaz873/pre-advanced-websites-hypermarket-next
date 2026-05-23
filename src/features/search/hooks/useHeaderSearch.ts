import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { products } from '@/services/catalog/products'
import { hasSearchQuery, normalizarTexto } from '@/lib/searchUtils'

/**
 * Interfaz que representa un producto en los resultados de búsqueda del header.
 * 
 * @interface HeaderSearchProduct
 * @property {string} id - Identificador único del producto (ej: 'manzana_verde')
 * @property {string} nombre - Nombre del producto en idioma base (español)
 * @property {string} imagen - Ruta a la imagen del producto
 */
export interface HeaderSearchProduct {
    id: string
    nombre: string
    imagen: string
}

/**
 * Hook personalizado para gestionar la lógica de búsqueda del header.
 * 
 * Comparte estado, filtrado y handlers para que los componentes DesktopSearch,
 * TabletSearch y MobileSearch reutilicen la misma lógica sin duplicar código.
 * 
 * CARACTERÍSTICAS:
 * - Búsqueda bilingüe: busca en español e inglés simultáneamente
 * - Filtrado en tiempo real: actualiza resultados mientras escribes
 * - Cierre automático: detecta clicks fuera del dropdown
 * - Normalización: ignora acentos y mayúsculas en búsquedas
 * - Límite de resultados: máximo 8 productos por búsqueda
 * 
 * FLUJO DE USO:
 * 1. Usuario escribe en input → onSearchChange actualiza searchTerm
 * 2. useEffect filtra productos en ES e EN
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
    const tProducts = useTranslations('products');
    const [isSearchActive, setIsSearchActive] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const searchInputRef = useRef<HTMLInputElement>(null)
    const resultsRef = useRef<HTMLUListElement>(null)

    const searchResults = useMemo(() => {
        if (searchTerm.trim() === '') {
            return []
        }

        const term = normalizarTexto(searchTerm)
        
        return products
            .filter((product) => {
                // 1. Obtener traducciones para comparar
                const nombreEs = normalizarTexto(product.nombre)
                
                const translationKey = `${product.id}.name`;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const translatedName = tProducts.has(translationKey as any) ? normalizarTexto(tProducts(translationKey as any)) : nombreEs;
                
                // 2. Filtrar
                return nombreEs.includes(term) || translatedName.includes(term)
            })
            .map((product) => {
                const translationKey = `${product.id}.name`;
                return {
                    id: product.id,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    nombre: tProducts.has(translationKey as any) ? tProducts(translationKey as any) : product.nombre,
                    imagen: product.imagen
                };
            })
            .slice(0, 8)
    }, [searchTerm, tProducts])

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
