"use client";

import { CartProvider } from "@/features/cart/CartContext";
import { SessionProvider } from "@/features/auth/SessionContext";
import Header from "@/features/layout/components/Header";
import ScrollToTop from "@/ui/ScrollToTop/ScrollToTop";
import type { Category } from "@/types/category";

export default function CartLayout({ children, categories }: { children: React.ReactNode; categories: Category[] }) {
  return (
    <SessionProvider>
      <CartProvider>
        <ScrollToTop />
        <Header categories={categories} />
        {/* Spacer for fixed header */}
        <div className="h-[60px] xl:h-[85px]"></div>
        <main className="flex-1 pt-0 pb-4 md:pt-0 md:pb-8">
          {children}
        </main>
      </CartProvider>
    </SessionProvider>
  );
}
