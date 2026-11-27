import { NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME } from '@/lib/admin-auth';

export async function POST() {
  const res = NextResponse.json(
    { ok: true, authenticated: false },
    {
      status: 200,
      headers: { 'Cache-Control': 'no-store' },
    }
  );

  res.cookies.set(ADMIN_COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });

  return res;
}