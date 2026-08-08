import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // dev: storage local del backend (uploads servidos por Express)
      { protocol: 'http', hostname: 'localhost', port: '3000', pathname: '/uploads/**' },
      { protocol: 'http', hostname: '127.0.0.1', port: '3000', pathname: '/uploads/**' },
      // prod: CDN/R2 de imágenes. F5.0 — no se añade un hostname de producción
      // hasta que la base de storage (CDN o bucket) quede fijada, para no
      // permitir hosts arbitrarios.
    ],
  },
};

export default withNextIntl(nextConfig);
