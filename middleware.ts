import { NextRequest, NextResponse } from 'next/server';
import {
  DEFAULT_LANGUAGE,
  extractLangFromPathname,
  localizeHref,
  stripLangPrefix,
} from '@/lib/i18n/types';

const ROUTE_ALIASES: Record<string, string> = {
  '/about-us': '/about-tiktok-profile-viewer',
};

const CANONICAL_REDIRECTS: Record<string, string> = {
  '/about-tiktok-profile-viewer': '/about-us',
};

const BYPASS_PREFIXES = ['/_next', '/assets', '/sitemaps'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/api' || pathname.startsWith('/api/')) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

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

  if (
    normalizedPath === '/admintiktok' ||
    normalizedPath.startsWith('/admintiktok/')
  ) {
    if (detectedLang) {
      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.pathname = normalizedPath;
      const response = NextResponse.rewrite(rewriteUrl);
      response.headers.set('X-Robots-Tag', 'noindex, nofollow');
      return response;
    }

    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  const canonicalTarget = CANONICAL_REDIRECTS[normalizedPath];
  if (canonicalTarget) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = localizeHref(canonicalTarget, activeLang);
    return NextResponse.redirect(redirectUrl, 301);
  }

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
    '/((?!_next/static|_next/image|assets|sitemaps|favicon\\.ico|icon\\.png|robots\\.txt|sitemap\\.xml).*)',
  ],
};