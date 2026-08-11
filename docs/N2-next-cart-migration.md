# N2 — Next.js Cart Server Migration

> Documento de trabajo. Título de trazabilidad: **N2 - Next.js Cart Server Migration**.
> Estado: implementado; regresión global pendiente (checkpoint E2).

## Objetivo

Convertir el carrito de Next de **anónimo + localStorage** a:

> anónimo → localStorage / autenticado → `/api/cart` server-side,

manteniendo la API pública del `CartContext` y evitando mezclar carritos entre
usuarios. El backend quedó preparado en B1 (`CartItem` enriquecido, snapshot
server-side de precio/oferta, `POST /api/cart/merge` acumulativo/server-wins,
ghost/unavailable descartados en el merge).

## Arquitectura

```
localStorage['carrito']  (anónimo)
   │ merge (UNA llamada POST /api/cart/merge)   │
   ▼                                             ▼
CartContext  ── server actions ──►  backend /api/cart*  (:3000)
   ▲                          (cookie hypermarket_auth
   │   CartResponse canónico    reenviada server-side)
   │   └─ cart-mapper Backend→UI
   │   (precios/ofertas NUNCA del cliente)
```

- **`src/app/api/cart/route.ts`** — Route Handler `GET`, patrón de
  `session/route.ts`: lee la cookie, reenvía al backend, devuelve el cart
  canónico; sin cookie/401/caído → `{ user:false, cart:null }` (anónimo
  silencioso). JWT nunca al navegador.
- **`src/features/cart/server/cart-backend.ts`** — cliente backend con
  reenvío de cookie (`fetcher` inyectable para tests).
- **`src/features/cart/server/get-server-cart.ts`** — `fetchServerCart` /
  `resolveCartPayload` (decisión del Route Handler).
- **`src/features/cart/actions.ts`** (`'use server'`) — `addItem`,
  `updateQuantity` (absoluta PATCH), `removeItem`, `clear`, `mergeLocal`
  (una sola llamada a `POST /api/cart/merge`).
- **`src/features/cart/cart-mapper.ts`** — Backend→UI y
  `localItemsToMergePayload` (solo `{productId,quantity}`).
- **`src/features/cart/mutation-queue.ts`** — cola serializada A→B→C por item.
- **`src/features/cart/cart-reducer.ts`** — máquina de estados pura
  (merge/pendingMerge/logout/fallback anónimo/rollback).
- **`src/features/cart/CartContext.tsx`** — rewrite con API pública intacta;
  `CartProvider` ahora dentro de `SessionProvider`
  (`src/app/[locale]/_components/CartLayout.tsx`).
- **Puerto** `package.json`: `dev`/`start` → `-p 3001` (evita colisión con el
  backend :3000; CORS ya incluye `http://localhost:3001`).

## Invariantes

1. Merge automático en `CartProvider` al pasar `anonymous → authenticated`.
2. `POST /api/cart/merge` es la ÚNICA operación de merge (nunca N POST).
3. Snapshot de precio/oferta del backend = fuente de verdad (el cliente solo
   mapea `CartResponse`).
4. `+/-` optimista, cola serializada, rollback al último `CartResponse`.
5. Logout limpia solo el espejo local (`localStorage['carrito']`); el carrito
   server-side permanece.
6. JWT/cookie no se gestionan en el cliente.
7. `pendingMerge`: merge fallido conserva el carrito local y se reintenta al
   recuperar conexión (`online`).

## Criterios de aceptación (estado)

| Criterio | Estado |
|---|---|
| Anónimo: carrito funciona igual con localStorage | Implementado (rama anónima del reducer) |
| Login: local → server vía un único `/api/cart/merge` | Implementado (`mergeLocal` + efecto CartProvider) |
| No se pierden cantidades | Acumulativo server-wins |
| Server-wins: el carrito server existente no se reemplaza | Backend (`mergeItems`) |
| Precio/oferta: Next muestra el snapshot del backend | `cart-mapper` (precio = `unitPrice`) |
| Reload autenticado: recupera el carrito server | Route Handler GET en hidratación |
| Ghost/unavailable: desaparecen en el merge | Backend + fixture de tests |
| Backend caído: el carrito anónimo local continúa | Fallback anónimo (`SESSION_RESOLVED anonymous`) |
| Logout: limpia el espejo local, conserva el server | `LOGOUT` en reducer |
| JWT nunca en localStorage/HTML/cliente | Solo server-side (cookie httpOnly) |
| Cart/Orders existentes: sin regresión | Pendiente regresión global (checkpoint E2) |
| lint, check:i18n, build verdes | Verificación |
| Tests específicos N2 verdes | `npx jest src/features/cart` (50) |
| Smoke real Next :3001 → backend :3000 | Verificación |

## Tests

`src/features/cart/**/*.test.ts` (node env, estilo puro de auth):
`cart-mapper` (mapper + server-authoritative), `mutation-queue` (cola A→B→C),
`cart-backend` (cookie forwarding, PATCH absoluto, merge sin precios),
`get-server-cart` (Route Handler con cookies mockeadas: anónimo/401/caído/200),
`actions` (merge resolver, server-wins, ghost/unavailable, offline,
pendingMerge→`{ok:false}`), `cart-reducer` (pendingMerge, limpieza post-merge,
logout limpia espejo, fallback anónimo, rollback).

## Fuera de N2

addresses · checkout completo · `idempotencyKey` · payments · historial de
órdenes · cancelación · refresh tokens · CSRF · admin orders.