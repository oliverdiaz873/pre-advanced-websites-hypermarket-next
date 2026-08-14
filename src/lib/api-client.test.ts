import { describe, expect, it, beforeEach, afterEach, jest } from '@jest/globals'
import { sendContactMessage, ApiRequestError } from './api-client'

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
