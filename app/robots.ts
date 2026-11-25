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
        userAgent: '*',
        allow: ['/', '/sitemaps/'],
        disallow: ['/api/', '/admintiktok/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}