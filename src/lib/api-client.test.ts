import { describe, expect, it, beforeEach, afterEach, jest } from '@jest/globals'
import {
  getProducts,
  getProduct,
  getAllCategoryProducts,
  fetchFeaturedProducts,
  mapApiProductsToProducts,
  sendContactMessage,
  ApiRequestError,
} from './api-client'
import type { ApiProduct } from './api-client'

const makeApiProduct = (overrides: Partial<ApiProduct> = {}): ApiProduct => ({
  id: 'prod_destacado',
  sku: 'SKU-1',
  name: 'Destacado',
  description: '',
  price: 100,
  image: null,
  categoryId: 'cat_granos',
  category: { name: 'Granos', slug: 'granos' },
  status: 'active',
  isAvailable: true,
  featured: true,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  ...overrides,
})

describe('api-client · featured (E4.6)', () => {
  const originalFetch = global.fetch

  beforeEach(() => {
    global.fetch = jest.fn() as unknown as typeof fetch
  })

  afterEach(() => {
    global.fetch = originalFetch
    jest.restoreAllMocks()
  })

  it('getProducts envía ?featured=true a /products', async () => {
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValue(
      new Response(JSON.stringify({ success: true, data: [], pagination: { page: 1, limit: 100, total: 0, pages: 1 } }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    )

    await getProducts({ featured: true, limit: 100 })

    const [url] = mockFetch.mock.calls[0] as [URL]
    expect(url.href).toContain('/api/products')
    expect(url.searchParams.get('featured')).toBe('true')
    expect(url.searchParams.get('limit')).toBe('100')
  })

  it('getProducts propaga ?lang= cuando se indica', async () => {
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValue(
      new Response(JSON.stringify({ success: true, data: [], pagination: { page: 1, limit: 100, total: 0, pages: 1 } }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    )

    await getProducts({ featured: true, limit: 100, lang: 'en' })

    const [url] = mockFetch.mock.calls[0] as [URL]
    expect(url.searchParams.get('lang')).toBe('en')
  })

  it('fetchFeaturedProducts propaga ?lang= hacia /products', async () => {
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValue(
      new Response(
        JSON.stringify({
          success: true,
          data: [makeApiProduct()],
          pagination: { page: 1, limit: 100, total: 1, pages: 1 },
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    )

    await fetchFeaturedProducts('en')

    const [url] = mockFetch.mock.calls[0] as [URL]
    expect(url.href).toContain('/api/products')
    expect(url.searchParams.get('featured')).toBe('true')
    expect(url.searchParams.get('lang')).toBe('en')
  })

  it('fetchFeaturedProducts devuelve solo productos activos y disponibles mapeados', async () => {
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValue(
      new Response(
        JSON.stringify({
          success: true,
          data: [
            makeApiProduct(),
            makeApiProduct({ id: 'oculto', featured: true, status: 'inactive', isAvailable: false }),
          ],
          pagination: { page: 1, limit: 100, total: 1, pages: 1 },
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    )

    const featured = await fetchFeaturedProducts()

    expect(featured).toHaveLength(1)
    expect(featured[0].id).toBe('prod_destacado')
    expect(featured[0].categoria).toBe('granos')
  })

  it('fetchFeaturedProducts degrada a [] cuando la API falla (nunca lanza)', async () => {
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockRejectedValue(new Error('network down'))

    await expect(fetchFeaturedProducts()).resolves.toEqual([])
  })

  it('mapApiProductsToProducts respeta el gate activo/disponible', () => {
    const mapped = mapApiProductsToProducts([
      makeApiProduct(),
      makeApiProduct({ id: 'a', isAvailable: false }),
      makeApiProduct({ id: 'b', status: 'inactive' }),
    ])
    expect(mapped.map((p) => p.id)).toEqual(['prod_destacado'])
  })
})

describe('api-client · product detail & category (E6.2.1 lang)', () => {
  const originalFetch = global.fetch

  beforeEach(() => {
    global.fetch = jest.fn() as unknown as typeof fetch
  })

  afterEach(() => {
    global.fetch = originalFetch
    jest.restoreAllMocks()
  })

  it('getProduct envía ?lang=en a /products/:id cuando se indica', async () => {
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValue(
      new Response(JSON.stringify({ success: true, data: makeApiProduct() }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    )

    await getProduct('prod_destacado', 'en')

    const [url] = mockFetch.mock.calls[0] as [URL]
    expect(url.href).toContain('/api/products/prod_destacado')
    expect(url.searchParams.get('lang')).toBe('en')
  })

  it('getProduct no añade ?lang cuando no se proporciona', async () => {
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValue(
      new Response(JSON.stringify({ success: true, data: makeApiProduct() }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    )

    await getProduct('prod_destacado')

    const [url] = mockFetch.mock.calls[0] as [URL]
    expect(url.href).toContain('/api/products/prod_destacado')
    expect(url.searchParams.has('lang')).toBe(false)
  })

  it('getAllCategoryProducts propaga ?lang=en a /products', async () => {
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValue(
      new Response(
        JSON.stringify({
          success: true,
          data: [makeApiProduct()],
          pagination: { page: 1, limit: 100, total: 1, pages: 1 },
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    )

    const result = await getAllCategoryProducts('granos', 100, 'en')

    const [url] = mockFetch.mock.calls[0] as [URL]
    expect(url.href).toContain('/api/products')
    expect(url.searchParams.get('category')).toBe('granos')
    expect(url.searchParams.get('lang')).toBe('en')
    expect(result).toHaveLength(1)
  })

  it('getAllCategoryProducts no añade ?lang cuando no se proporciona', async () => {
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValue(
      new Response(
        JSON.stringify({
          success: true,
          data: [makeApiProduct()],
          pagination: { page: 1, limit: 100, total: 1, pages: 1 },
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    )

    await getAllCategoryProducts('granos')

    const [url] = mockFetch.mock.calls[0] as [URL]
    expect(url.href).toContain('/api/products')
    expect(url.searchParams.has('lang')).toBe(false)
  })
})

describe('api-client · contact (E4.5)', () => {
  const originalFetch = global.fetch

  beforeEach(() => {
    global.fetch = jest.fn() as unknown as typeof fetch
  })

  afterEach(() => {
    global.fetch = originalFetch
    jest.restoreAllMocks()
  })

  it('sendContactMessage hace POST /api/contact con el payload mapeado y devuelve el mensaje persistido', async () => {
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValue(
      new Response(
        JSON.stringify({
          success: true,
          data: {
            id: 'cm_1',
            name: 'Juan Pérez',
            email: 'juan@example.com',
            message: 'Consulta sobre un pedido',
            status: 'pending',
            createdAt: '2026-01-01T00:00:00.000Z',
            updatedAt: '2026-01-01T00:00:00.000Z',
          },
        }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      )
    )

    const result = await sendContactMessage({
      name: 'Juan Pérez',
      email: 'juan@example.com',
      message: 'Consulta sobre un pedido',
    })

    const [url, init] = mockFetch.mock.calls[0] as [string, RequestInit]
    expect(url).toContain('/api/contact')
    expect(init.method).toBe('POST')
    expect(init.body).toBe(
      JSON.stringify({ name: 'Juan Pérez', email: 'juan@example.com', message: 'Consulta sobre un pedido' })
    )
    expect(result.id).toBe('cm_1')
    expect(result.status).toBe('pending')
  })

  it('sendContactMessage lanza ApiRequestError con el mensaje del backend en 400', async () => {
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValue(
      new Response(
        JSON.stringify({ success: false, message: 'Message must be between 10 and 500 characters', statusCode: 400 }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    )

    await expect(
      sendContactMessage({ name: 'Juan', email: 'juan@example.com', message: 'corto' })
    ).rejects.toMatchObject({
      name: 'ApiRequestError',
      status: 400,
      message: 'Message must be between 10 and 500 characters',
    })
  })

  it('sendContactMessage expone status 429 para rate limit', async () => {
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValue(
      new Response(
        JSON.stringify({ success: false, message: 'Too many messages, please try again later', statusCode: 429, code: 'RATE_LIMITED' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      )
    )

    const error = await sendContactMessage({
      name: 'Juan',
      email: 'juan@example.com',
      message: 'Mensaje lo suficientemente largo',
    }).catch((e: unknown) => e)

    expect(error).toBeInstanceOf(ApiRequestError)
    expect((error as ApiRequestError).status).toBe(429)
  })

  it('sendContactMessage no lanza mensaje del backend si el cuerpo no es JSON', async () => {
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValue(
      new Response('internal error', { status: 500 })
    )

    const error = await sendContactMessage({
      name: 'Juan',
      email: 'juan@example.com',
      message: 'Mensaje lo suficientemente largo',
    }).catch((e: unknown) => e)

    expect(error).toBeInstanceOf(ApiRequestError)
    expect((error as ApiRequestError).message).toBe('')
  })
})
