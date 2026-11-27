import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_TTL_SECONDS,
  createAdminSessionCookieValue,
  isAdminConfigured,
  verifyAdminPassword,
} from '@/lib/admin-auth';

export async function POST(req: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      {
        authenticated: false,
        error:
          'ADMIN_PASSWORD environment variable is not configured on the server.',
      },
      {
        status: 503,
        headers: { 'Cache-Control': 'no-store' },
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
        headers: { 'Cache-Control': 'no-store' },
      }
    );
  }

  if (!verifyAdminPassword(password)) {
    return NextResponse.json(
      { authenticated: false, error: 'Wrong admin password. Please check and try again.' },
      {
        status: 401,
        headers: { 'Cache-Control': 'no-store' },
      }
    );
  }

  const token = createAdminSessionCookieValue();
  const res = NextResponse.json(
    { authenticated: true },
    {
      status: 200,
      headers: { 'Cache-Control': 'no-store' },
    }
  );

  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: ADMIN_SESSION_TTL_SECONDS,
  });

  return res;
}