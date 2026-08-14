import { test, expect, type Page } from '@playwright/test'
import {
  adminLogin,
  findInventory,
  getInventoryMovements,
  getAuditLogs,
  assertAdminOrderState,
  type OrderEvidence,
} from './helpers/admin-api'

/**
 * E2E — Checkout/Orders (E3-N) del consumidor Next.js contra el backend E3
 * real (localhost:3000, `maria@email.com` / `123456` seed).
 *
 * Flujo validado:
 *   login → limpiar carrito → agregar producto (server cart)
 *   → checkout (crear dirección única si falta) → confirmar pedido (pending)
 *   → pay (paid) → cancelar (cancelled + refunded)
 *   → historial (una sola orden, sin duplicados) → detalle.
 *
 * Incluye E3-Integration: los mismos endpoints admin que renderiza el
 * dashboard (orden, stock/reserva, movimientos, audit logs).
 */

const EMAIL = 'maria@email.com'
const PASSWORD = '123456'
const PRODUCT_ID = 'tablet_tcl'
const PRODUCT_NAME = 'Tablet TCL'

async function clearCart(page: Page): Promise<void> {
  const cartLoaded = page.waitForResponse(
    (r) => r.url().endsWith('/api/cart') && r.request().method() === 'GET',
    { timeout: 15_000 },
  )
  await page.goto('/es/cart')
  await cartLoaded
  await page.waitForTimeout(500)
  const remove = page.getByLabel(/Eliminar/)
  for (let i = 0; i < 20; i++) {
    const n = await remove.count()
    if (n === 0) break
    await remove.first().click()
    await expect.poll(() => remove.count(), { timeout: 10_000 }).toBe(n - 1)
  }
}

async function loginCustomer(page: Page): Promise<void> {
  await page.goto('/es/login')
  await page.getByLabel('Correo electrónico').fill(EMAIL)
  await page.getByLabel('Contraseña').fill(PASSWORD)
  await page.getByRole('button', { name: 'Iniciar sesión' }).click()
  await page.waitForURL('**/es**')
  await page.waitForSelector('header')
}

async function ensureAddress(page: Page, label: string): Promise<void> {
  await page.goto('/es/addresses')
  if ((await page.getByText(label).count()) > 0) return
  const addAddressBtn = page.getByRole('button', { name: 'Agregar dirección' })
  if (!(await addAddressBtn.isVisible().catch(() => false))) return
  await addAddressBtn.click()
  await page.getByLabel('Etiqueta').fill(label)
  await page.getByLabel('Calle').fill('Calle Principal 123')
  await page.getByLabel('Ciudad').fill('Santo Domingo')
  await page.getByLabel('Provincia / Estado').fill('Distrito Nacional')
  await page.getByLabel('Código postal').fill('10101')
  await page.getByLabel('País').fill('República Dominicana')
  await page.getByRole('button', { name: 'Guardar dirección' }).click()
  await expect(page.getByText(label)).toBeVisible({ timeout: 15_000 })
}

test('checkout → pay → cancel → historial → detalle (E3-N) + E3-Integration', async ({
  page,
  playwright,
}) => {
  const addressLabel = `E2E-${Date.now()}`

  // Sesión admin para la verificación E3-Integration
  const adminCtx = await playwright.request.newContext()
  const token = await adminLogin(adminCtx)
  const baseline = await findInventory(adminCtx, token, PRODUCT_ID)

  // 1) Login real vía UI
  await loginCustomer(page)

  // Limpiar carrito vía UI para arrancar determinista (qty exacto = 1)
  await clearCart(page)

  // 2) Catálogo → agregar producto real del backend al carrito.
  //    Esperar a que el carrito esté sincronizado con el server antes de
  //    agregar: si se hace clic antes del SYNC_OK, el item optimista se
  //    persiste en localStorage y luego se MERGEa (1+1=2) al entrar en /cart.
  const cartSynced = page.waitForResponse(
    (r) => r.url().endsWith('/api/cart') && r.request().method() === 'GET',
    { timeout: 15_000 },
  )
  await page.goto('/es/product/tablet_tcl')
  await cartSynced
  await page.getByRole('button', { name: /Agregar.*Tablet TCL/ }).click()

  // 3) Carrito → checkout
  await page.goto('/es/cart')
  await expect(page.getByText(PRODUCT_NAME).first()).toBeVisible()
  await expect(page.getByRole('link', { name: 'Pagar Ahora' })).toBeVisible()
  await page.getByRole('link', { name: 'Pagar Ahora' }).click()
  await page.waitForURL('**/es/checkout')

  // 4) Dirección única por ejecución
  await ensureAddress(page, addressLabel)

  // 5) Checkout: seleccionar dirección y confirmar pedido (pending)
  await page.goto('/es/checkout')
  await expect(page.getByText('Confirmar pedido')).toBeVisible()
  const confirmBtn = page.getByRole('button', { name: 'Confirmar pedido' })
  await expect(confirmBtn).toBeEnabled()
  await confirmBtn.click()

  await page.waitForURL('**/es/orders/**')
  const orderId = new URL(page.url()).pathname.split('/').pop() as string
  const orderNumber =
    (await page.getByText(/^HM-\d{8}-[A-F0-9]{6}$/).first().textContent())?.trim() ?? ''

  expect(orderNumber).toMatch(/^HM-\d{8}-[A-F0-9]{6}$/)
  await expect(page.getByText('Pendiente').first()).toBeVisible()
  await expect(page.getByText('Pago pendiente').first()).toBeVisible()

  // E3-Integration: orden en admin con pending + items + totales
  const ev: OrderEvidence = { orderId, orderNumber, productId: PRODUCT_ID, quantity: 1, customerEmail: EMAIL }
  const created = await assertAdminOrderState(adminCtx, token, ev, {
    status: 'pending',
    paymentStatus: 'pending',
  })
  const item = created.items.find((i) => i.productId === PRODUCT_ID)
  if (!item) throw new Error('order items missing product')
  if (item.quantity !== 1) throw new Error(`item quantity expected 1, got ${item.quantity}`)
  if (typeof created.subtotal !== 'number' || created.subtotal <= 0) {
    throw new Error(`subtotal invalid: ${created.subtotal}`)
  }

  // E3-Integration: stock reservado (+1), stock disponible intacto
  const afterCreate = await findInventory(adminCtx, token, PRODUCT_ID)
  expect(afterCreate.reservedStock).toBe(baseline.reservedStock + 1)
  expect(afterCreate.stock).toBe(baseline.stock)

  // 6) Pay → paid
  const payBtn = page.getByRole('button', { name: 'Pagar ahora' })
  await expect(payBtn).toBeVisible()
  await payBtn.click()
  await expect(page.getByText('Pagado')).toBeVisible({ timeout: 15_000 })
  await assertAdminOrderState(adminCtx, token, ev, { status: 'pending', paymentStatus: 'paid' })

  // 7) Cancel → cancelled + refunded; stock liberado
  const cancelBtn = page.getByRole('button', { name: 'Cancelar pedido' })
  await expect(cancelBtn).toBeVisible()
  await cancelBtn.click()
  await expect(page.getByText('Cancelado').first()).toBeVisible({ timeout: 15_000 })
  await expect(page.getByText('Reembolsado').first()).toBeVisible({ timeout: 15_000 })
  await assertAdminOrderState(adminCtx, token, ev, {
    status: 'cancelled',
    paymentStatus: 'refunded',
  })
  const afterCancel = await findInventory(adminCtx, token, PRODUCT_ID)
  expect(afterCancel.reservedStock).toBe(baseline.reservedStock)

  // E3-Integration: movimientos reserve + release_reservation vinculados a la orden
  const movements = await getInventoryMovements(adminCtx, token, afterCancel.id)
  if (!movements.find((m) => m.type === 'reserve' && m.orderId === orderId)) {
    throw new Error('reserve movement missing for order')
  }
  if (!movements.find((m) => m.type === 'release_reservation' && m.orderId === orderId)) {
    throw new Error('release_reservation movement missing for order')
  }

  // E3-Integration: audit logs registrados
  const logs = await getAuditLogs(adminCtx, token, orderId)
  const actions = logs.map((l) => l.action)
  for (const expected of ['CREATE_ORDER', 'PAY_ORDER', 'CANCEL_ORDER']) {
    if (!actions.includes(expected)) throw new Error(`audit log missing ${expected}`)
  }

  // 8) Historial refleja la orden cancelada, UNA sola vez (sin duplicados)
  await page.goto('/es/orders')
  await expect(page.getByText(orderNumber).first()).toBeVisible({ timeout: 15_000 })
  expect(await page.locator('a', { hasText: orderNumber }).count()).toBe(1)

  // 9) Abrir el detalle desde el historial: misma orden, mismos estados
  await page.getByRole('link', { name: orderNumber }).click()
  await page.waitForURL(`**/es/orders/${orderId}`)
  await expect(page.getByText(orderNumber).first()).toBeVisible({ timeout: 15_000 })
  await expect(page.getByText('Cancelado').first()).toBeVisible({ timeout: 15_000 })
  await expect(page.getByText('Reembolsado').first()).toBeVisible({ timeout: 15_000 })
})
