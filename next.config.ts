import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // dev: storage local del backend (uploads servidos por Express)
      new URL('http://localhost:3000/uploads/**'),
      new URL('http://127.0.0.1:3000/uploads/**'),
      // prod: CDN/R2 de imágenes. F5.0 — no se añade un hostname de producción
      // hasta que la base de storage (CDN o bucket) quede fijada, para no
      // permitir hosts arbitrarios.
    ],
    // Next 16 bloquea por SSRF upstreams que resuelven a IP privada.
    // En dev el storage del backend es localhost, así que se permite solo en
    // desarrollo; en prod se exige CDN/bucket público y permanece prohibido.
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== 'production',
  },
};

export default withNextIntl(nextConfig);
