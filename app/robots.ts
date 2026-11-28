import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/seo/sitemap';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: [
      {
        userAgent: 'Mediapartners-Google',
        allow: '/',
      },
      {
        userAgent: 'Google-Display-Ads-Bot',
        allow: '/',
      },
      {
        userAgent: ['Googlebot', 'Bingbot', 'Applebot', 'DuckDuckBot'],
        allow: ['/', '/_next/static/', '/_next/image/', '/assets/', '/sitemaps/', '/api/og'],
        disallow: ['/api/', '/admintiktok', '/*/admintiktok', '/*?*'],
      },
      {
        userAgent: '*',
        allow: ['/', '/_next/static/', '/_next/image/', '/assets/', '/sitemaps/', '/api/og'],
        disallow: ['/api/', '/admintiktok', '/*/admintiktok', '/*?*'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}