export interface AuthUser {
  id: string
  name: string
  email: string
  role: string
}

export type SessionStatus = 'loading' | 'anonymous' | 'authenticated'