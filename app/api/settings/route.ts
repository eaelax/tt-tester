import { NextRequest, NextResponse } from 'next/server';
import { isRequestAuthenticated } from '@/lib/admin-auth';
import { getServerSettings, saveServerSettings } from '@/lib/server-settings';

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
        'Cache-Control': 'no-store',
      },
    }
  );
}

export async function PUT(req: NextRequest) {
  if (!isRequestAuthenticated(req)) {
    return NextResponse.json(
      { error: 'Unauthorized. Please sign in to save settings.' },
      {
        status: 401,
        headers: {
          'Cache-Control': 'no-store',
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
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  }

  try {
    const result = await saveServerSettings(body);
    return NextResponse.json(result, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Failed to save global settings.';
    return NextResponse.json(
      { error: message },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  }
}