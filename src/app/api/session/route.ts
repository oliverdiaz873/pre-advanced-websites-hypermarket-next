import { NextResponse } from 'next/server'
import { getSession } from '@/features/auth/session'

/**
 * Punto de entrada del SessionProvider en el cliente. Lee la cookie
 * `hypermarket_auth` en el servidor, la reenvía al backend `/auth/me` y
 * devuelve SOLO los campos whitelisted del usuario (el JWT nunca lo ve el
 * navegador).
 */
export async function GET() {
  const user = await getSession()
  return NextResponse.json({ user })
}