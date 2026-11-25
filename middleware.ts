import { NextRequest, NextResponse } from 'next/server';
import {
  DEFAULT_LANGUAGE,
  extractLangFromPathname,
  stripLangPrefix,
} from '@/lib/i18n/types';

const STATIC_EXT_RE = /\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|mjs|map|woff2?|ttf|eot|txt|xml|json)$/i;

const PATH_ALIASES: Record<string, string> = {
  '/about-us': '/about-tiktok-profile-viewer',
};

function resolveInternalPath(pathWithoutLang: string): string {
  const normalized = pathWithoutLang === '/' ? '/' : pathWithoutLang.replace(/\/+$/, '');
  return PATH_ALIASES[normalized] || pathWithoutLang;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/admintiktok') ||
    STATIC_EXT_RE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const pathLang = extractLangFromPathname(pathname);
  const activeLang = pathLang || DEFAULT_LANGUAGE;
  const pathWithoutLang = pathLang ? stripLangPrefix(pathname) : pathname;
  const internalPath = resolveInternalPath(pathWithoutLang);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-tpv-lang', activeLang);
  requestHeaders.set('x-tpv-path', pathWithoutLang);

  if (pathLang || internalPath !== pathname) {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = internalPath;
    return NextResponse.rewrite(rewriteUrl, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icon.png|robots.txt|sitemap.xml|api/|assets/|admintiktok).*)',
  ],
};