import { CartProvider } from "@/features/cart/CartContext";
import Header from "@/features/layout/components/Header";
import Footer from "@/features/layout/components/Footer";
import ScrollToTop from "@/ui/ScrollToTop/ScrollToTop";


export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
      <CartProvider>
        <ScrollToTop />
        <Header />
        {/* Spacer for fixed header */}
        <div className="h-[60px] xl:h-[85px]"></div>
        <main className="flex-1 pt-0 pb-4 md:pt-0 md:pb-8">
          {children}
        </main>
        <Footer />
      </CartProvider>
  );
}
