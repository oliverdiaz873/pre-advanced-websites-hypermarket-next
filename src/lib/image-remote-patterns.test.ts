import { describe, expect, it } from '@jest/globals'
import { matchRemotePattern } from 'next/dist/shared/lib/match-remote-pattern'
import { IMAGE_REMOTE_PATTERNS } from './image-remote-patterns'

/**
 * E9.3 P0.4 — Regresión del defecto E231 de next/image.
 *
 * La forma `new URL('http://localhost:3000/uploads/**')` en remotePatterns
 * normaliza `search: ''` (string vacío, no `undefined`); matchRemotePattern
 * entonces exige `pattern.search === url.search`, y las URLs reales del
 * backend llevan cache-bust `?v=<updatedAt>` → no matchean → E231 → página de
 * producto en error boundary. Este test verifica que los patrones exportados
 * (forma OBJETO, sin `search`) aceptan esas URLs y siguen rechazando hosts
 * ajenos.
 */

const uploadedUrl = (query: string): URL =>
  new URL(`http://localhost:3000/uploads/products/abc/uuid.png${query}`)

describe('IMAGE_REMOTE_PATTERNS (E231 next/image)', () => {
  it('no fija `search` (undefined) para que cualquier query matchee', () => {
    for (const p of IMAGE_REMOTE_PATTERNS) {
      expect(p.search).toBeUndefined()
    }
  })

  it('acepta imagen subida con cache-bust ?v=<updatedAt> (caso E231)', () => {
    const url = uploadedUrl('?v=2026-08-18T21%3A07%3A22.786Z')
    expect(IMAGE_REMOTE_PATTERNS.some((p) => matchRemotePattern(p, url))).toBe(true)
  })

  it('acepta imagen subida sin query', () => {
    expect(IMAGE_REMOTE_PATTERNS.some((p) => matchRemotePattern(p, uploadedUrl('')))).toBe(true)
  })

  it('acepta imágenes seed relativas (sin query)', () => {
    const seed = new URL('http://localhost:3000/uploads/products/bebidas/coca-cola.avif')
    expect(IMAGE_REMOTE_PATTERNS.some((p) => matchRemotePattern(p, seed))).toBe(true)
  })

  it('rechaza hosts no configurados (no se abre el patrón)', () => {
    const evil = new URL('https://evil.example.com/uploads/x.png')
    expect(IMAGE_REMOTE_PATTERNS.some((p) => matchRemotePattern(p, evil))).toBe(false)
  })

  it('rechaza puertos distintos del backend', () => {
    const other = new URL('http://localhost:9999/uploads/x.png')
    expect(IMAGE_REMOTE_PATTERNS.some((p) => matchRemotePattern(p, other))).toBe(false)
  })

  it('rechaza rutas fuera de /uploads/**', () => {
    const outside = new URL('http://localhost:3000/assets/x.png')
    expect(IMAGE_REMOTE_PATTERNS.some((p) => matchRemotePattern(p, outside))).toBe(false)
  })
})
