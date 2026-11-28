import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, getAdminCookieOptions } from '@/lib/admin-auth';
import { API_SECURITY_HEADERS, isValidSameOrigin } from '@/lib/security';

export async function POST(req: NextRequest) {
  const baseHeaders = {
    ...API_SECURITY_HEADERS,
    'Cache-Control': 'no-store',
  };

  if (!isValidSameOrigin(req)) {
    return NextResponse.json(
      { ok: false, error: 'Cross-origin request rejected.' },
      { status: 403, headers: baseHeaders }
    );
  }

  const res = NextResponse.json(
    { ok: true, authenticated: false },
    {
      status: 200,
      headers: baseHeaders,
    }
  );

  res.cookies.set(ADMIN_COOKIE_NAME, '', getAdminCookieOptions(0));

  return res;
}