'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { AuthUser, SessionStatus } from './types'

export interface SessionState {
  status: SessionStatus
  user: AuthUser | null
  refresh: () => Promise<void>
}

const SessionContext = createContext<SessionState | null>(null)

/**
 * Proporciona el estado de sesión al cliente.
 *
 * Hidratación (lección P1 de A1): el estado inicial es SIEMPRE `loading`, tanto
 * en SSR como en el primer render del cliente, así el servidor y el navegador
 * pintan el mismo skeleton y no hay hydration mismatch. La sesión se resuelve
 * después del primer render vía `GET /api/session`.
 */
export function SessionProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<SessionStatus>('loading')
  const [user, setUser] = useState<AuthUser | null>(null)

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/session', { cache: 'no-store' })
      const data = (await res.json()) as { user: AuthUser | null }
      if (res.ok) {
        setUser(data.user ?? null)
        setStatus(data.user ? 'authenticated' : 'anonymous')
      } else {
        setUser(null)
        setStatus('anonymous')
      }
    } catch {
      setUser(null)
      setStatus('anonymous')
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    void fetch('/api/session', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : { user: null }))
      .then((data: { user: AuthUser | null }) => {
        if (cancelled) return
        setUser(data.user ?? null)
        setStatus(data.user ? 'authenticated' : 'anonymous')
      })
      .catch(() => {
        if (cancelled) return
        setUser(null)
        setStatus('anonymous')
      })
    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo(() => ({ status, user, refresh }), [status, user, refresh])

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession(): SessionState {
  const ctx = useContext(SessionContext)
  if (!ctx) {
    throw new Error('useSession debe usarse dentro de <SessionProvider>')
  }
  return ctx
}