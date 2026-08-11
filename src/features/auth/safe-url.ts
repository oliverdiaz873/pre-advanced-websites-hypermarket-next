/**
 * Validación del parámetro `returnUrl` para evitar open redirects.
 * Solo se permiten rutas internas que empiecen con `/` y NO con `//` (ni `/\`)
 * (una URL `//evil.com` se interpretaría como protocol-relative).
 */
export function isSafeReturnUrl(value: string | undefined | null): value is string {
  if (typeof value !== 'string' || value.length === 0) return false
  if (!value.startsWith('/')) return false
  if (value.startsWith('//')) return false
  if (value.startsWith('/\\')) return false
  return true
}

/** Devuelve `value` solo si es un returnUrl interno seguro; si no, `fallback`. */
export function safeReturnUrl(value: string | undefined | null, fallback: string): string {
  return isSafeReturnUrl(value) ? value : fallback
}