import { NextRequest, NextResponse } from 'next/server';
import {
  DEFAULT_LANGUAGE,
  extractLangFromPathname,
  localizeHref,
  stripLangPrefix,
} from '@/lib/i18n/types';
import { API_SECURITY_HEADERS, getPageSecurityHeaders } from '@/lib/security';

const ROUTE_ALIASES: Record<string, string> = {
  '/about-us': '/about-tiktok-profile-viewer',
};

const CANONICAL_REDIRECTS: Record<string, string> = {
  '/about-tiktok-profile-viewer': '/about-us',
};

const BYPASS_PREFIXES = ['/_next', '/assets', '/sitemaps'];

function applyHeaders(
  response: NextResponse,
  headersMap: Record<string, string>
): NextResponse {
  Object.entries(headersMap).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isProd = process.env.NODE_ENV === 'production';
  const pageSecurityHeaders = getPageSecurityHeaders(isProd);

  if (pathname === '/api' || pathname.startsWith('/api/')) {
    const response = NextResponse.next();
    return applyHeaders(response, API_SECURITY_HEADERS);
  }

  if (
    pathname === '/index.html' ||
    /^\/[a-z]{2}\/index\.html$/i.test(pathname)
  ) {
    const langFromIndex = extractLangFromPathname(pathname) ?? DEFAULT_LANGUAGE;
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = localizeHref('/', langFromIndex);
    return NextResponse.redirect(redirectUrl, 301);
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

  if (pathname.length > 1 && pathname.endsWith('/')) {
    const trimmedUrl = request.nextUrl.clone();
    trimmedUrl.pathname = pathname.replace(/\/+$/, '') || '/';
    return NextResponse.redirect(trimmedUrl, 301);
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
      applyHeaders(response, pageSecurityHeaders);
      response.headers.set('X-Robots-Tag', 'noindex, nofollow');
      response.headers.set('Cache-Control', 'no-store');
      return response;
    }

    const response = NextResponse.next();
    applyHeaders(response, pageSecurityHeaders);
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    response.headers.set('Cache-Control', 'no-store');
    return response;
  }

  const canonicalTarget = CANONICAL_REDIRECTS[normalizedPath];
  if (canonicalTarget) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = localizeHref(canonicalTarget, activeLang);
    return NextResponse.redirect(redirectUrl, 301);
  }

  if (detectedLang === DEFAULT_LANGUAGE) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = normalizedPath;
    return NextResponse.redirect(redirectUrl, 301);
  }

  const internalTarget = ROUTE_ALIASES[normalizedPath] ?? normalizedPath;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-tpv-lang', activeLang);
  requestHeaders.set('x-tpv-pathname', normalizedPath);

  const response =
    detectedLang || internalTarget !== pathname
      ? NextResponse.rewrite(
          (() => {
            const rewriteUrl = request.nextUrl.clone();
            rewriteUrl.pathname = internalTarget;
            return rewriteUrl;
          })(),
          { request: { headers: requestHeaders } }
        )
      : NextResponse.next({
          request: { headers: requestHeaders },
        });

  applyHeaders(response, pageSecurityHeaders);

  if (search && search.length > 1) {
    response.headers.set('X-Robots-Tag', 'noindex, follow');
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|assets|sitemaps|favicon\\.ico|icon\\.png|robots\\.txt|sitemap\\.xml).*)',
  ],
};