import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright E2E — Consumidor Next.js (E3-N).
 *
 * Valida el flujo real del consumidor contra el backend E3 (localhost:3000):
 *   login → agregar producto → carrito → checkout (dirección + idempotencia)
 *   → confirmar pedido (pending) → pay (paid) → cancelar (cancelled/refunded)
 *   → historial refleja el estado.
 *
 * Requiere el backend corriendo en :3000 (ver `reuseExistingServer`).
 * El `webServer` lanza `next dev` en :3001 y lo reutiliza si ya está vivo.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['html', { open: 'never' }], ['list']] : 'list',
  timeout: 150_000,
  use: {
    baseURL: process.env.NEXT_PUBLIC_E2E_BASE_URL ?? 'http://localhost:3001',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3001',
    reuseExistingServer: true,
    timeout: 120_000,
    env: {
      PORT: '3001',
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api',
      API_URL: process.env.API_URL ?? 'http://localhost:3000/api',
    },
  },
})
