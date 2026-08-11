# Integración con la API — Next.js Store

- **Estado**: Borrador (F0.0)
- **Fase de ejecución**: F4-B
- **Contrato oficial**: `backend-advanced-websites-hypermarket-express-mongodb/docs/API-CONTRACT.md` (el backend define la API; este documento solo describe cómo la consume este storefront).
- **Atención Next.js 16**: este proyecto usa Next.js 16 con breaking changes
  (ver `AGENTS.md`). Validar patrones de data fetching/cache contra
  `node_modules/next/dist/docs/` antes de implementar.

## 1. Consumo de productos

`GET {NEXT_PUBLIC_API_URL}/products?lang=es|en`

- Parámetros: `page`, `limit`, `q`, `category`, `status`, `lang`, `sortBy`, `sortOrder`.
- El contenido (`name`, `description`) llega **localizado** según el locale
  de `next-intl` (`es`/`en`).
- `image` es una **URL pública** (R2/CDN); este storefront no construye keys de storage.

## 2. Mapping API → modelo local

```ts
// src/types/product.ts (modelo local actual)
interface ProductLocal {
  id: string; name: string; url: string;
  categoria: string; precio: number; precioTexto: string;
  imagen: string; unidad?: string; quantity?: number;
}
```

El `ProductMapper` (F4-B) deriva client-side los campos de presentación:

| Campo local | Origen en la API |
| --- | --- |
| `id` | `id` |
| `name` | `name` (resuelto por `?lang=`) |
| `url` | `/product/{id}` (se genera, no viene del backend) |
| `categoria` | `category.slug` |
| `precio` | `price` |
| `precioTexto` | formateado desde `price` + `unit`/`unitQuantity` |
| `imagen` | `image` |
| `unidad` / `quantity` | `unit` / `unitQuantity` |

## 3. Otras fuentes

- **Categorías**: `GET /categories`.
- **Ofertas**: `GET /offers`.
- **Búsqueda**: `GET /search?q=&lang=` (server-side).

## 4. Modo mock (transición)

Durante la transición el storefront puede operar con `useMockData=true`
(datos estáticos actuales) y alternar a `false` para consumir la API real.
`useProductTranslation` priorizará el contenido del backend
(`translations[locale]`) y caerá a las claves `messages/` solo en modo mock.

## 5. Imágenes (next/image)

- Se añadirá `remotePatterns` en `next.config.ts` para el host CDN de R2
  (p. ej. `cdn.hipermercadosuperior.com`).
- `getAssetUrl` (`src/lib/assetUtils.ts`) ya acepta URLs absolutas.

## 6. SSR / cache

- Las páginas de producto/categoría/home pasarán a **server components con
  `fetch`** a la API pasando `lang`.
- Definir la estrategia de revalidación/cache según los patrones de Next.js 16
  (validar en `node_modules/next/dist/docs/`). No se usará ISR agresivo mientras
  no exista CDN configurado.

## 7. Pendiente en F4-B

- `.env.local` con `NEXT_PUBLIC_API_URL`.
- `src/lib/api-client.ts` + `ProductMapper`.
- Adaptar `ProductPageClient`, `CategoryPageClient`, `SearchPageClient`, carouseles.
- Ofertas y búsqueda desde la API.
- Tests (no existe suite: crear al menos mappers/sources).
