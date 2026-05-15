import { CartProvider } from "@/src/features/cart/CartContext";
import Header from "@/src/features/layout/components/Header";
import Footer from "@/src/features/layout/components/Footer";
import Icons from "@/src/shared/components/Icons/Icons";
import ScrollToTop from "@/src/shared/components/ScrollToTop/ScrollToTop";
import I18nProvider from "@/src/shared/i18n/I18nProvider";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <CartProvider>
        <ScrollToTop />
        <Icons />
        <Header />
        {/* Spacer for fixed header */}
        <div className="h-[60px] xl:h-[85px]"></div>
        <main className="flex-1 pt-0 pb-4 md:pt-0 md:pb-8">
          {children}
        </main>
        <Footer />
      </CartProvider>
    </I18nProvider>
  );
}
