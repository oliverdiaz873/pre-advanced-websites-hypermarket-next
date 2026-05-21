import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Hipermercado Superior | Calidad y Variedad",
    template: "%s | Hipermercado Superior",
  },
  description: "Tu hipermercado de confianza con la mejor selección de alimentos, tecnología, electrodomésticos y más.",
  keywords: ["hipermercado", "compras online", "ofertas", "supermercado", "tecnologia", "alimentos"],
  authors: [{ name: "Hipermercado Superior" }],
  creator: "Hipermercado Superior",
  publisher: "Hipermercado Superior",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.hipermercadosuperior.com"),
  alternates: {
    canonical: "/",
    languages: {
      "es-ES": "/es",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_DO",
    url: "https://www.hipermercadosuperior.com",
    siteName: "Hipermercado Superior",
    title: "Hipermercado Superior | Calidad y Variedad",
    description: "Tu hipermercado de confianza con la mejor selección de alimentos, tecnología, electrodomésticos y más.",
    images: [
      {
        url: "/assets/images/logo/logo_with_background.jpeg",
        width: 1200,
        height: 630,
        alt: "Hipermercado Superior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hipermercado Superior | Calidad y Variedad",
    description: "Tu hipermercado de confianza con la mejor selección de alimentos, tecnología, electrodomésticos y más.",
    images: ["/assets/images/logo/logo_with_background.jpeg"],
  },
  icons: {
    icon: [
      { url: "/assets/images/icons/favicons/icon-16x16.jpg", sizes: "16x16", type: "image/jpeg" },
      { url: "/assets/images/icons/favicons/icon-32x32.jpg", sizes: "32x32", type: "image/jpeg" },
      { url: "/assets/images/icons/favicons/icon-48x48.jpg", sizes: "48x48", type: "image/jpeg" },
    ],
    apple: [
      { url: "/assets/images/logo/logo.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
