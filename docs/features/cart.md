# Cart

## Status

Implemented.

## Overview

The cart is a client-side feature implemented with React Context and persisted to browser `localStorage`. `CartProvider` wraps the shop route group in `src/app/[locale]/(shop)/layout.tsx`, so cart state is available to the header, product actions, and cart page.

## Primary Files

- `src/features/cart/CartContext.tsx`
- `src/features/cart/hooks/useCart.ts`
- `src/features/cart/components/AddToCartButton.tsx`
- `src/features/cart/components/CartPageClient.tsx`
- `src/features/cart/components/CartItemsList.tsx`
- `src/features/cart/components/CartItem.tsx`
- `src/features/cart/components/QuantityControls.tsx`
- `src/features/cart/components/CartSummary.tsx`
- `src/features/cart/components/EmptyCart.tsx`
- `src/app/[locale]/(shop)/cart/page.tsx`
- `src/app/[locale]/(shop)/cart/loading.tsx`

## State Model

`CartItem` is defined in `src/features/cart/CartContext.tsx`.

Fields:

- `id`
- `nombre`
- `precio`
- `precioTexto`
- `img`
- `unidad`
- `cantidad`
- `isOffer`
- `oldPrice`
- `discountPercentage`

`unidad`, `precioTexto`, `isOffer`, `oldPrice`, and `discountPercentage` are optional.

Derived values:

- `totalItems`: Sum of item quantities.
- `totalPrice`: Sum of `precio * cantidad`.

## Persistence

The cart persists under the `localStorage` key `carrito`.

Hydration flow:

1. The provider initializes with an empty cart.
2. After client hydration, it reads `localStorage`.
3. Saved cart data is parsed into React state when available.
4. After initialization, cart changes are written back to `localStorage`.

Storage errors are caught and logged to the console.

## Actions

The cart context exposes:

- `addToCart(product)`: Adds a product with quantity `1`, or increments quantity when the product already exists.
- `removeFromCart(id)`: Removes one item by id.
- `updateQuantity(id, delta)`: Adds `delta` to the item quantity and removes the item when the resulting quantity is `0` or lower.
- `clearCart()`: Empties the cart.

## User Flow

1. Product listings and product detail pages render `AddToCartButton`.
2. When the product is not in the cart, the button adds it.
3. When the product is already in the cart, the button renders increment/decrement controls.
4. The cart page reads context state through `useCart()`.
5. Empty carts render `EmptyCart`.
6. Non-empty carts render `CartItemsList` and `CartSummary`.

## Offer Metadata

The cart item type and provider can store offer metadata when `oldPrice` or `isOffer` is passed into `addToCart`.

Current product action usage does not pass `oldPrice` or `isOffer` into `AddToCartButton`. As a result, cart items added through the current UI are stored as standard product entries even when they come from an offer listing.

## Current Limitations

- Checkout is not implemented.
- The payment button in `CartSummary` is presentational.
- Cart persistence is local to the browser.
- Cart state is not synchronized with a user account or backend.
