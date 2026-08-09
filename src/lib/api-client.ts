// ─────────────────────────────────────────────────────────────────────────────
// Tipos del contrato de la API (backend real, ver docs/F5-CONTRACT.md)
// ─────────────────────────────────────────────────────────────────────────────

import type { Product } from '@/types/product'

export type ApiLang = 'es' | 'en'

export interface ApiProduct {
  id: string
  sku: string
  name: string
  description: string
  price: number
  image: string | null
  categoryId: string
  category: { name: string; slug: string }
  brandId?: string
  brand?: { name: string; slug: string }
  unit?: string
  unitQuantity?: number
  status: 'active' | 'inactive'
  isAvailable: boolean
  createdAt: string
  updatedAt: string
  translations?: Record<'es' | 'en', { name?: string; description?: string }>
}

export interface ApiCategory {
  id: string
  name: string
  slug: string
  subcategories: {
    id: string
    name: string
    slug: string
  }[]
}

export interface ApiOffer {
  id: string
  productId: string
  title: string
  description: string | null
  originalPrice: number
  discountPrice: number
  discountPercent: number
  currency: string
  startDate: string
  endDate: string
  active: boolean
}

export interface ApiPagination {
  page: number
  limit: number
  total: number
  pages: number
}

export interface ApiCollection<T> {
  success?: boolean
  data: T[]
  pagination: ApiPagination
}

export interface ApiEnvelope<T> {
  success?: boolean
  data: T
}

export interface ApiPaginationParams {
  page?: number
  limit?: number
  q?: string
  category?: string
  brand?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// ─────────────────────────────────────────────────────────────────────────────
// Configuración
// ─────────────────────────────────────────────────────────────────────────────

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? 'http://localhost:3000/api'

export const STORAGE_PUBLIC_URL =
  process.env.NEXT_PUBLIC_STORAGE_PUBLIC_URL?.replace(/\/$/, '') ?? 'http://localhost:3000'

// ─────────────────────────────────────────────────────────────────────────────
// Imágenes (decisión F5.0: resolver en el frontend, nunca tocar el backend)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Resuelve la URL pública de una imagen de producto.
 * - URL absoluta (http/https/data:) → se usa tal cual.
 * - Key relativa legacy de la seed (ej. `products/bebidas/coca-cola.avif` sin
 *   imageKey) → `${STORAGE_PUBLIC_URL}/uploads/<key>`.
 * - `?v=` se conserva si viene en la respuesta; jamás se versiona en el cliente.
 */
export function resolveApiImageUrl(image?: string | null): string | null {
  if (!image) return null
  if (/^(https?:)?\/\//.test(image) || image.startsWith('data:')) {
    return image
  }
  const raw = image.startsWith('/') ? image.slice(1) : image
  return `${STORAGE_PUBLIC_URL}/uploads/${raw}`
}

/**
 * Mapper F5.2: ApiProduct (backend Express+MongoDB) → modelo Product del storefront Next.
 *
 * Decisiones F5.0:
 * - `price` → `precio`, `unit` → `unidad`, `unitQuantity` → `quantity`.
 * - `category.slug` → `categoria` (la identidad navegable es el slug).
 * - `url` y `precioTexto` se generan en el frontend (no vienen del backend).
 * - `image` se resuelve con el resolver de imágenes (nunca se toca el backend).
 * - `description` viene localizada del backend (`?lang=`).
 */
export function mapApiProductToProduct(api: ApiProduct): Product {
  const imagen = resolveApiImageUrl(api.image) ?? ''
  const unit = api.unit ?? ''
  const quantity = api.unitQuantity

  const hasUnitBlock = Boolean(unit || (quantity != null && quantity > 1))
  const precioTexto = hasUnitBlock
    ? `Precio: $${api.price.toLocaleString('en-US')} / ${quantity ?? 1} ${unit}`.trim()
    : `Precio: $${api.price.toLocaleString('en-US')}`

  return {
    id: api.id,
    name: api.name,
    description: api.description,
    url: `/product/${encodeURIComponent(api.id)}`,
    categoria: api.category.slug,
    precio: api.price,
    precioTexto,
    imagen,
    unidad: unit || undefined,
    quantity,
  }
}

export function mapApiProductsToProducts(apiProducts: ApiProduct[]): Product[] {
  return apiProducts
    .filter((p) => p.status === 'active' && p.isAvailable)
    .map(mapApiProductToProduct)
}

// ─────────────────────────────────────────────────────────────────────────────
// Client HTTP (fetch nativo; sirve tanto en Server Components como en el cliente)
// ─────────────────────────────────────────────────────────────────────────────

async function apiRequest<T>(path: string, params?: object): Promise<T> {
  const url = new URL(`${API_BASE_URL}${path}`)
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value))
      }
    }
  }

  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`API ${res.status}: ${res.url}`)
  }

  return (await res.json()) as T
}

export function getProducts(query: ApiPaginationParams = {}): Promise<ApiCollection<ApiProduct>> {
  const params: ApiPaginationParams = {
    page: query.page,
    limit: query.limit,
    q: query.q,
    category: query.category,
    brand: query.brand,
    sortBy: query.sortBy,
    sortOrder: query.sortOrder,
  }
  return apiRequest<ApiCollection<ApiProduct>>('/products', params)
}

export function getProduct(id: string): Promise<ApiEnvelope<ApiProduct>> {
  return apiRequest<ApiEnvelope<ApiProduct>>(`/products/${encodeURIComponent(id)}`)
}

export function getOffers(lang?: ApiLang): Promise<ApiEnvelope<ApiOffer[]>> {
  return apiRequest<ApiEnvelope<ApiOffer[]>>('/offers', { lang })
}

export function search(query: Pick<ApiPaginationParams, 'q' | 'category'>): Promise<ApiEnvelope<ApiProduct[]>> {
  return apiRequest<ApiEnvelope<ApiProduct[]>>('/search', { q: query.q, category: query.category })
}

export function getCategories(): Promise<ApiEnvelope<ApiCategory[]>> {
  return apiRequest<ApiEnvelope<ApiCategory[]>>('/categories')
}