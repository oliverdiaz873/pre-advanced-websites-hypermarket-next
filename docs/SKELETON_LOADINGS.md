# Skeleton Loadings - Guía de Uso

## Overview

Sistema completo de skeleton loadings modernos y responsive para el proyecto Hipermercado Superior. Utiliza Tailwind CSS `animate-pulse` para animaciones suaves y naturales.

## Estructura de Componentes

### 1. **BaseSkeleton** - Componente Base
El componente más simple para crear skeletons personalizados.

```tsx
import { BaseSkeleton } from '@/ui/Skeleton'

// Uso básico
<BaseSkeleton className="w-full h-10" />
<BaseSkeleton className="w-32 h-32" shape="circle" />
```

**Props:**
- `className`: Estilos de tamaño (Tailwind)
- `shape`: `'rectangle'` (default) o `'circle'`

### 2. **HeroBannerSkeleton** - Carrusel de Banners
Placeholder para el hero carousel/banner principal.

```tsx
import { HeroBannerSkeleton } from '@/ui/Skeleton'

<HeroBannerSkeleton />
```

Mantiene el aspect ratio 3:1 como el banner real.

### 3. **CategoriesSkeleton** - Grid de Categorías
Muestra placeholders para las categorías principales.

```tsx
import { CategoriesSkeleton } from '@/ui/Skeleton'

<CategoriesSkeleton />
```

Grid responsive (2-6 columnas según viewport).

### 5. **ProductCardSkeleton** - Tarjeta Individual
Skeleton de una sola tarjeta de producto.

```tsx
import { ProductCardSkeleton } from '@/ui/Skeleton'

<ProductCardSkeleton />
```

### 6. **ProductsGridSkeleton** - Grid de Productos
Grilla completa de productos con título.

```tsx
import { ProductsGridSkeleton } from '@/ui/Skeleton'

<ProductsGridSkeleton count={8} />
```

**Props:**
- `count`: Número de placeholders a mostrar (default: 8)

### 7. **OfferCardSkeleton** - Tarjeta de Oferta
Skeleton individual para ofertas con badge.

```tsx
import { OfferCardSkeleton } from '@/ui/Skeleton'

<OfferCardSkeleton />
```

### 8. **OffersGridSkeleton** - Grid de Ofertas
Grilla completa de ofertas.

```tsx
import { OffersGridSkeleton } from '@/ui/Skeleton'

<OffersGridSkeleton count={8} />
```

## Archivos `loading.tsx` Creados

Next.js App Router automáticamente muestra estos skeleton loadings durante Suspense:

### Rutas Implementadas:

1. **`/[locale]/(shop)/loading.tsx`** - Página de inicio
   - Hero Banner + Categorías + Productos + Ofertas
   - **Nota**: Header no incluido (ya está en el layout global)

2. **`/[locale]/(shop)/category/[slug]/loading.tsx`** - Página de categoría
   - Breadcrumb + Filtros + Grid de productos
   - **Nota**: Header no incluido (ya está en el layout global)

3. **`/[locale]/(shop)/product/[id]/loading.tsx`** - Detalle de producto
   - Breadcrumb + Galería + Info + Productos relacionados
   - **Nota**: Header no incluido (ya está en el layout global)

4. **`/[locale]/(shop)/offers/loading.tsx`** - Página de ofertas
   - Filtros + Grid de ofertas
   - **Nota**: Header no incluido (ya está en el layout global)

5. **`/[locale]/(shop)/search/loading.tsx`** - Resultados de búsqueda
   - Info de búsqueda + Filtros + Resultados
   - **Nota**: Header no incluido (ya está en el layout global)

6. **`/[locale]/(shop)/cart/loading.tsx`** - Página del carrito
   - Items del carrito + Resumen de orden
   - **Nota**: Header no incluido (ya está en el layout global)

## Uso en Componentes

### Con Suspense API
```tsx
import { Suspense } from 'react'
import { ProductsGridSkeleton } from '@/ui/Skeleton'
import MyAsyncComponent from '@/components/MyAsyncComponent'

export default function Page() {
    return (
        <Suspense fallback={<ProductsGridSkeleton count={8} />}>
            <MyAsyncComponent />
        </Suspense>
    )
}
```

### Ejemplo Completo
```tsx
import { Suspense } from 'react'
import { ProductsGridSkeleton } from '@/ui/Skeleton'
import ProductsList from '@/features/products/components/ProductsList'

export default function CatalogPage() {
    return (
        <Suspense fallback={<ProductsGridSkeleton count={12} />}>
            <ProductsList />
        </Suspense>
    )
}
```

## Características

✅ **Responsive**: Adapta tamaños a mobile, tablet y desktop
✅ **Accesible**: Incluye `role="status"` y `aria-label`
✅ **Rendimiento**: Usa solo CSS animations (sin JS)
✅ **Consistencia**: Colores y estilos match con el diseño actual
✅ **Reutilizable**: Componentes modular y composables
✅ **TypeScript**: Tipado completo
✅ **Tailwind**: Sin CSS adicional, todo es Tailwind

## Colores Usados

- `bg-gray-200`: Elementos principales
- `bg-gray-300`: Precios/información destacada
- `bg-gray-400`: Detalles secundarios
- `bg-red-300`: Badge de ofertas
- `bg-gradient-to-r from-gray-800 to-gray-700`: Header

## Animación

Todos usan Tailwind's `animate-pulse` que:
- Anima entre `opacity-100` y `opacity-50`
- Duración de 2s (por defecto)
- Loop infinito suave

## Best Practices

1. **Usa `loading.tsx`** para rutas principales (App Router)
2. **Combina con `Suspense`** para componentes async
3. **Mantén el mismo layout** del contenido real
4. **Altura consistente** con el contenido real
5. **Incluye espacios** para gutters y gaps

## Ejemplo: Crear tu propio Skeleton

```tsx
import { BaseSkeleton } from '@/ui/Skeleton'

export const CustomSkeleton = () => {
    return (
        <div className="space-y-4">
            <BaseSkeleton className="h-10 w-3/4" />
            <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                    <BaseSkeleton key={i} className="h-32" />
                ))}
            </div>
        </div>
    )
}
```

## Mejoras Futuras

- [ ] Skeleton para cart items con cantidad
- [ ] Skeleton para comments/reviews
- [ ] Skeleton para formularios
- [ ] Temas claros/oscuros
- [ ] Animaciones personalizadas

---

**Creado para:** Hipermercado Superior - Next.js + TypeScript + Tailwind CSS
