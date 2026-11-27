import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      error: 'Media proxying is disabled. Media loads directly in the browser.',
    },
    {
      status: 410,
      headers: {
        'Cache-Control': 'no-store',
      },
    }
  );
}