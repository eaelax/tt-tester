import { NextRequest, NextResponse } from 'next/server';
import {
  DEFAULT_LANGUAGE,
  extractLangFromPathname,
  stripLangPrefix,
} from '@/lib/i18n/types';

const ROUTE_ALIASES: Record<string, string> = {
  '/about-us': '/about-tiktok-profile-viewer',
};

const BYPASS_PREFIXES = ['/api', '/_next', '/assets', '/admintiktok'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    BYPASS_PREFIXES.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
    ) ||
    pathname === '/favicon.ico' ||
    pathname === '/icon.png' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    /\/[^/]+\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const detectedLang = extractLangFromPathname(pathname);
  const activeLang = detectedLang ?? DEFAULT_LANGUAGE;
  const unprefixedPath = detectedLang ? stripLangPrefix(pathname) : pathname;
  const normalizedPath =
    unprefixedPath === '/' ? '/' : unprefixedPath.replace(/\/+$/, '') || '/';
  const internalTarget = ROUTE_ALIASES[normalizedPath] ?? normalizedPath;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-tpv-lang', activeLang);
  requestHeaders.set('x-tpv-pathname', normalizedPath);

  if (detectedLang || internalTarget !== pathname) {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = internalTarget;
    return NextResponse.rewrite(rewriteUrl, {
      request: { headers: requestHeaders },
    });
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|admintiktok|favicon\\.ico|icon\\.png|robots\\.txt|sitemap\\.xml).*)',
  ],
};