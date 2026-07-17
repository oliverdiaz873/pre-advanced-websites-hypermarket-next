/**
 * Next.js 16 Proxy Configuration
 *
 * IMPORTANT:
 * This file intentionally uses the name `proxy.ts` instead of `middleware.ts`.
 *
 * Starting with Next.js 16, Proxy replaces Middleware as the recommended
 * convention for request interception in the App Router.
 *
 * This file handles:
 * - Locale detection and redirection
 * - next-intl request handling
 * - Route interception before rendering
 *
 * Do not rename this file to `middleware.ts`.
 * This project targets Next.js 16+ where proxy.ts is the correct convention.
 *
 * Documentation:
 * https://nextjs.org/docs/app/getting-started/proxy
 */

import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(es|en)/:path*']
};
