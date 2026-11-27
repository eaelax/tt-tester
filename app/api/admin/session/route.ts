import { NextRequest, NextResponse } from 'next/server';
import { isAdminConfigured, isRequestAuthenticated } from '@/lib/admin-auth';
import { getConfiguredSettingsBackend } from '@/lib/server-settings';

export async function GET(req: NextRequest) {
  const configured = isAdminConfigured();
  const authenticated = configured ? isRequestAuthenticated(req) : false;
  const backend = getConfiguredSettingsBackend();

  return NextResponse.json(
    {
      configured,
      authenticated,
      backend,
    },
    {
      status: 200,
      headers: { 'Cache-Control': 'no-store' },
    }
  );
}