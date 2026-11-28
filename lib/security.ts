export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  retryAfterSeconds: number;
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();
const MAX_RATE_LIMIT_ENTRIES = 2500;
const MAX_REDIRECT_HOPS = 3;

export const API_SECURITY_HEADERS: Record<string, string> = {
  'X-Robots-Tag': 'noindex, nofollow',
  'X-Content-Type-Options': 'nosniff',
};

function normalizeHost(rawHost: string): string {
  return rawHost.trim().toLowerCase().replace(/:\d+$/, '');
}

export function getClientIp(headers: Headers): string {
  const cfIp = headers.get('cf-connecting-ip');
  if (cfIp && cfIp.trim()) {
    return cfIp.trim().slice(0, 64);
  }

  const realIp = headers.get('x-real-ip');
  if (realIp && realIp.trim()) {
    return realIp.trim().slice(0, 64);
  }

  const forwarded = headers.get('x-forwarded-for');
  if (forwarded && forwarded.trim()) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first.slice(0, 64);
  }

  return 'unknown';
}

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();

  if (rateLimitStore.size > MAX_RATE_LIMIT_ENTRIES) {
    rateLimitStore.forEach((entry, storedKey) => {
      if (entry.resetAt <= now) {
        rateLimitStore.delete(storedKey);
      }
    });
    if (rateLimitStore.size > MAX_RATE_LIMIT_ENTRIES) {
      rateLimitStore.clear();
    }
  }

  const existing = rateLimitStore.get(key);
  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    rateLimitStore.set(key, { count: 1, resetAt });
    return {
      allowed: true,
      remaining: Math.max(0, maxRequests - 1),
      resetAt,
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (existing.count >= maxRequests) {
    const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
    return {
      allowed: false,
      remaining: 0,
      resetAt: existing.resetAt,
      retryAfterSeconds,
    };
  }

  existing.count += 1;
  rateLimitStore.set(key, existing);

  return {
    allowed: true,
    remaining: Math.max(0, maxRequests - existing.count),
    resetAt: existing.resetAt,
    retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}

export function isValidSameOrigin(req: Request): boolean {
  const secFetchSite = req.headers.get('sec-fetch-site')?.toLowerCase();
  if (secFetchSite === 'cross-site') {
    return false;
  }

  const allowedHosts = new Set<string>();
  const hostHeader = req.headers.get('x-forwarded-host') || req.headers.get('host');
  if (hostHeader) {
    allowedHosts.add(normalizeHost(hostHeader));
  }

  try {
    const reqUrl = new URL(req.url);
    if (reqUrl.host) {
      allowedHosts.add(normalizeHost(reqUrl.host));
    }
  } catch {
    // Ignore malformed request URL
  }

  const appUrl = (process.env.APP_URL || '').trim();
  if (appUrl) {
    try {
      allowedHosts.add(normalizeHost(new URL(appUrl).host));
    } catch {
      // Ignore invalid APP_URL
    }
  }

  if (allowedHosts.size === 0) {
    return false;
  }

  const origin = req.headers.get('origin');
  if (origin) {
    try {
      const originHost = normalizeHost(new URL(origin).host);
      return allowedHosts.has(originHost);
    } catch {
      return false;
    }
  }

  const referer = req.headers.get('referer');
  if (referer) {
    try {
      const refererHost = normalizeHost(new URL(referer).host);
      return allowedHosts.has(refererHost);
    } catch {
      return false;
    }
  }

  return secFetchSite === 'same-origin';
}

export function isAllowedTikTokUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'https:') return false;
    if (parsed.username || parsed.password) return false;
    const host = parsed.hostname.toLowerCase();
    return host === 'tiktok.com' || host.endsWith('.tiktok.com');
  } catch {
    return false;
  }
}

export async function safeFetchTikTokWithRedirects(
  initialUrl: string,
  headers: Record<string, string>,
  timeoutMs = 3800
): Promise<Response | null> {
  let currentUrl = initialUrl;

  for (let hop = 0; hop <= MAX_REDIRECT_HOPS; hop++) {
    if (!isAllowedTikTokUrl(currentUrl)) {
      return null;
    }

    const res = await fetch(currentUrl, {
      headers,
      redirect: 'manual',
      cache: 'no-store',
      signal: AbortSignal.timeout(timeoutMs),
    });

    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get('location');
      if (!location) {
        return null;
      }

      try {
        currentUrl = new URL(location, currentUrl).toString();
      } catch {
        return null;
      }
      continue;
    }

    return res;
  }

  return null;
}

export function buildCspHeader(isProduction: boolean): string {
  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "object-src 'none'",
    "script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "img-src 'self' data: blob: https:",
    "media-src 'self' blob: https:",
    "connect-src 'self' https://www.tikwm.com https://pagead2.googlesyndication.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https:",
    "frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com",
  ];

  if (isProduction) {
    directives.push('upgrade-insecure-requests');
  }

  return directives.join('; ');
}

export function getPageSecurityHeaders(isProduction: boolean): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Security-Policy': buildCspHeader(isProduction),
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Referrer-Policy': 'no-referrer',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  };

  if (isProduction) {
    headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains';
  }

  return headers;
}