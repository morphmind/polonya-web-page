import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // as-needed ile prefix'siz path'leri de yakala: /, /about, /en/about
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
