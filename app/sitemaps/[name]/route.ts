import { NextRequest } from 'next/server';
import { getSubSitemapXml } from '@/lib/seo/sitemap';

export const revalidate = 3600;

interface RouteContext {
  params: Promise<{
    name: string;
  }>;
}

export async function GET(_req: NextRequest, context: RouteContext) {
  const { name } = await context.params;
  const xml = getSubSitemapXml(name);

  if (!xml) {
    return new Response('Sitemap not found', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}