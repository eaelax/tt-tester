import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_COOKIE_NAME,
  createAdminSessionCookieValue,
  getAdminCookieOptions,
  isAdminConfigured,
  verifyAdminPassword,
} from '@/lib/admin-auth';
import {
  API_SECURITY_HEADERS,
  checkRateLimit,
  getClientIp,
  isValidSameOrigin,
} from '@/lib/security';

const MAX_LOGIN_ATTEMPTS = 6;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

export async function POST(req: NextRequest) {
  const baseHeaders = {
    ...API_SECURITY_HEADERS,
    'Cache-Control': 'no-store',
  };

  if (!isValidSameOrigin(req)) {
    return NextResponse.json(
      { authenticated: false, error: 'Cross-origin request rejected.' },
      { status: 403, headers: baseHeaders }
    );
  }

  const clientIp = getClientIp(req.headers);
  const limit = checkRateLimit(
    `admin_login:${clientIp}`,
    MAX_LOGIN_ATTEMPTS,
    LOGIN_WINDOW_MS
  );

  if (!limit.allowed) {
    return NextResponse.json(
      {
        authenticated: false,
        error: 'Too many login attempts. Please wait and try again later.',
      },
      {
        status: 429,
        headers: {
          ...baseHeaders,
          'Retry-After': String(limit.retryAfterSeconds),
        },
      }
    );
  }

  if (!isAdminConfigured()) {
    return NextResponse.json(
      {
        authenticated: false,
        error: 'Server admin authentication is not configured.',
      },
      {
        status: 503,
        headers: baseHeaders,
      }
    );
  }

  let password = '';
  try {
    const body = (await req.json()) as { password?: unknown };
    password = typeof body?.password === 'string' ? body.password : '';
  } catch {
    return NextResponse.json(
      { authenticated: false, error: 'Invalid JSON payload.' },
      {
        status: 400,
        headers: baseHeaders,
      }
    );
  }

  if (!password || !verifyAdminPassword(password)) {
    return NextResponse.json(
      {
        authenticated: false,
        error: 'Wrong admin password. Please check and try again.',
      },
      {
        status: 401,
        headers: baseHeaders,
      }
    );
  }

  const token = createAdminSessionCookieValue();
  const res = NextResponse.json(
    { authenticated: true },
    {
      status: 200,
      headers: baseHeaders,
    }
  );

  res.cookies.set(ADMIN_COOKIE_NAME, token, getAdminCookieOptions());

  return res;
}