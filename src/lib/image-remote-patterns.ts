/**
 * @fileoverview Patrones remotos de next/image para imágenes de productos.
 *
 * E9.3 P0.4 — Defecto E231 corregido: las URLs reales que genera el backend
 * para imágenes subidas llevan cache-bust `?v=<updatedAt>`. La forma
 * `new URL(...)` que se usaba en next.config normaliza `search: ''` y
 * next/image lo interpreta como "solo query vacía", rechazando esas URLs
 * (E231) y tirando la página de producto al error boundary.
 *
 * Regla segura (F5.0): se declaran como OBJETO sin clave `search` (undefined →
 * cualquier query matchea), scoped a localhost/127.0.0.1:3000 `/uploads/**`.
 * No se abre ningún host de producción hasta que la base de storage (CDN o
 * bucket) quede fijada.
 */

export interface ImageRemotePattern {
  protocol?: 'http' | 'https'
  hostname: string
  port?: string
  pathname?: string
  search?: string
}

export const IMAGE_REMOTE_PATTERNS: ImageRemotePattern[] = [
  { protocol: 'http', hostname: 'localhost', port: '3000', pathname: '/uploads/**' },
  { protocol: 'http', hostname: '127.0.0.1', port: '3000', pathname: '/uploads/**' },
]
