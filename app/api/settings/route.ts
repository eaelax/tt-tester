import { NextRequest, NextResponse } from 'next/server';
import { isRequestAuthenticated } from '@/lib/admin-auth';
import { getServerSettings, saveServerSettings } from '@/lib/server-settings';
import {
  API_SECURITY_HEADERS,
  checkRateLimit,
  getClientIp,
  isValidSameOrigin,
} from '@/lib/security';

const MAX_SETTINGS_UPDATES_PER_MINUTE = 30;
const SETTINGS_WINDOW_MS = 60 * 1000;

export async function GET() {
  const { settings, backend } = await getServerSettings();
  return NextResponse.json(
    {
      settings,
      backend,
    },
    {
      status: 200,
      headers: {
        ...API_SECURITY_HEADERS,
        'Cache-Control': 'no-store',
      },
    }
  );
}

export async function PUT(req: NextRequest) {
  const baseHeaders = {
    ...API_SECURITY_HEADERS,
    'Cache-Control': 'no-store',
  };

  if (!isValidSameOrigin(req)) {
    return NextResponse.json(
      { error: 'Cross-origin request rejected.' },
      {
        status: 403,
        headers: baseHeaders,
      }
    );
  }

  if (!isRequestAuthenticated(req)) {
    return NextResponse.json(
      { error: 'Unauthorized. Please sign in to save settings.' },
      {
        status: 401,
        headers: baseHeaders,
      }
    );
  }

  const clientIp = getClientIp(req.headers);
  const limit = checkRateLimit(
    `admin_settings:${clientIp}`,
    MAX_SETTINGS_UPDATES_PER_MINUTE,
    SETTINGS_WINDOW_MS
  );

  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many settings updates. Please wait a moment.' },
      {
        status: 429,
        headers: {
          ...baseHeaders,
          'Retry-After': String(limit.retryAfterSeconds),
        },
      }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON settings payload.' },
      {
        status: 400,
        headers: baseHeaders,
      }
    );
  }

  try {
    const result = await saveServerSettings(body);
    return NextResponse.json(result, {
      status: 200,
      headers: baseHeaders,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to save global settings.' },
      {
        status: 500,
        headers: baseHeaders,
      }
    );
  }
}