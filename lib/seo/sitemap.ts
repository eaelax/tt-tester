import { CATEGORIES, CREATORS } from '@/lib/creators-data';
import {
  DEFAULT_LANGUAGE,
  LanguageCode,
  SUPPORTED_LANGUAGES,
  localizeHref,
} from '@/lib/i18n/types';

export type SitemapChangeFreq =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

export interface SitemapRouteConfig {
  path: string;
  changefreq: SitemapChangeFreq;
  priority: number;
}

export interface SitemapAlternate {
  hreflang: string;
  href: string;
}

export interface SitemapUrlEntry {
  loc: string;
  lastmod: string;
  changefreq: SitemapChangeFreq;
  priority: number;
  alternates: SitemapAlternate[];
}

export interface SitemapIndexEntry {
  loc: string;
  lastmod: string;
}

export const CREATORS_PER_SITEMAP = 1000;

const CORE_AND_TOOL_ROUTES: SitemapRouteConfig[] = [
  { path: '/', changefreq: 'daily', priority: 1.0 },
  { path: '/tiktok-video-downloader', changefreq: 'daily', priority: 0.95 },
  { path: '/tiktok-mp3-downloader', changefreq: 'daily', priority: 0.9 },
  { path: '/tiktok-profile-viewer', changefreq: 'daily', priority: 0.9 },
  { path: '/tiktok-story-downloader', changefreq: 'daily', priority: 0.9 },
  { path: '/tiktok-photo-downloader', changefreq: 'daily', priority: 0.9 },
  { path: '/tiktok-watermark-remover', changefreq: 'daily', priority: 0.9 },
  { path: '/tiktok-analytics', changefreq: 'weekly', priority: 0.85 },
  { path: '/tiktok-money-calculator', changefreq: 'weekly', priority: 0.85 },
  { path: '/tiktok-engagement-calculator', changefreq: 'weekly', priority: 0.85 },
  { path: '/tiktok-caption-generator', changefreq: 'weekly', priority: 0.85 },
  { path: '/creators', changefreq: 'daily', priority: 0.9 },
  { path: '/categories', changefreq: 'weekly', priority: 0.85 },
  { path: '/about-us', changefreq: 'monthly', priority: 0.8 },
  { path: '/how-to-use-tiktok-profile-viewer', changefreq: 'monthly', priority: 0.8 },
];

const LEGAL_ROUTES: SitemapRouteConfig[] = [
  { path: '/terms-of-service', changefreq: 'monthly', priority: 0.6 },
  { path: '/privacy-policy', changefreq: 'monthly', priority: 0.6 },
  { path: '/cookie-policy', changefreq: 'monthly', priority: 0.6 },
  { path: '/disclaimer', changefreq: 'monthly', priority: 0.6 },
  { path: '/legal-notice', changefreq: 'monthly', priority: 0.6 },
  { path: '/copyright-policy', changefreq: 'monthly', priority: 0.6 },
  { path: '/tiktok-independence-disclaimer', changefreq: 'monthly', priority: 0.6 },
  { path: '/public-content-policy', changefreq: 'monthly', priority: 0.6 },
  { path: '/content-removal-policy', changefreq: 'monthly', priority: 0.6 },
  { path: '/acceptable-use-policy', changefreq: 'monthly', priority: 0.6 },
  { path: '/security-policy', changefreq: 'monthly', priority: 0.6 },
  { path: '/service-availability-policy', changefreq: 'monthly', priority: 0.6 },
];

export function getBaseUrl(): string {
  return (process.env.APP_URL || 'https://tikprofilesviewer.com').replace(/\/+$/, '');
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildLocalizedAlternates(
  baseUrl: string,
  canonicalPath: string
): SitemapAlternate[] {
  const alternates: SitemapAlternate[] = SUPPORTED_LANGUAGES.map((lang) => ({
    hreflang: lang.code,
    href: `${baseUrl}${localizeHref(canonicalPath, lang.code)}`,
  }));

  alternates.push({
    hreflang: 'x-default',
    href: `${baseUrl}${localizeHref(canonicalPath, DEFAULT_LANGUAGE)}`,
  });

  return alternates;
}

function expandLocalizedRoutes(
  routes: SitemapRouteConfig[],
  baseUrl: string,
  lastmod: string
): SitemapUrlEntry[] {
  const entries: SitemapUrlEntry[] = [];

  for (const route of routes) {
    const alternates = buildLocalizedAlternates(baseUrl, route.path);
    for (const lang of SUPPORTED_LANGUAGES) {
      const localizedPath = localizeHref(route.path, lang.code as LanguageCode);
      entries.push({
        loc: `${baseUrl}${localizedPath}`,
        lastmod,
        changefreq: route.changefreq,
        priority: route.priority,
        alternates,
      });
    }
  }

  return entries;
}

export function getCreatorChunkCount(): number {
  return Math.max(1, Math.ceil(CREATORS.length / CREATORS_PER_SITEMAP));
}

export function getSitemapIndexEntries(): SitemapIndexEntry[] {
  const baseUrl = getBaseUrl();
  const lastmod = new Date().toISOString();
  const entries: SitemapIndexEntry[] = [
    { loc: `${baseUrl}/sitemaps/pages.xml`, lastmod },
    { loc: `${baseUrl}/sitemaps/categories.xml`, lastmod },
  ];

  const chunkCount = getCreatorChunkCount();
  for (let chunk = 1; chunk <= chunkCount; chunk++) {
    entries.push({
      loc: `${baseUrl}/sitemaps/creators-${chunk}.xml`,
      lastmod,
    });
  }

  return entries;
}

export function buildSitemapIndexXml(): string {
  const entries = getSitemapIndexEntries();
  const items = entries
    .map(
      (entry) =>
        `  <sitemap>\n    <loc>${escapeXml(entry.loc)}</loc>\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>\n  </sitemap>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>\n`;
}

export function buildUrlSetXml(entries: SitemapUrlEntry[]): string {
  const items = entries
    .map((entry) => {
      const alternateLines = entry.alternates
        .map(
          (alt) =>
            `    <xhtml:link rel="alternate" hreflang="${escapeXml(alt.hreflang)}" href="${escapeXml(alt.href)}" />`
        )
        .join('\n');

      return [
        '  <url>',
        `    <loc>${escapeXml(entry.loc)}</loc>`,
        alternateLines,
        `    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`,
        `    <changefreq>${entry.changefreq}</changefreq>`,
        `    <priority>${entry.priority.toFixed(2)}</priority>`,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${items}\n</urlset>\n`;
}

export function getSubSitemapXml(name: string): string | null {
  const baseUrl = getBaseUrl();
  const lastmod = new Date().toISOString();

  if (name === 'pages.xml') {
    const entries = expandLocalizedRoutes(
      [...CORE_AND_TOOL_ROUTES, ...LEGAL_ROUTES],
      baseUrl,
      lastmod
    );
    return buildUrlSetXml(entries);
  }

  if (name === 'categories.xml') {
    const categoryRoutes: SitemapRouteConfig[] = CATEGORIES.map((cat) => ({
      path: `/category/${encodeURIComponent(cat.slug)}`,
      changefreq: 'daily',
      priority: 0.8,
    }));
    const entries = expandLocalizedRoutes(categoryRoutes, baseUrl, lastmod);
    return buildUrlSetXml(entries);
  }

  const creatorMatch = name.match(/^creators-(\d+)\.xml$/);
  if (creatorMatch) {
    const chunkNumber = Number(creatorMatch[1]);
    const totalChunks = getCreatorChunkCount();
    if (!Number.isInteger(chunkNumber) || chunkNumber < 1 || chunkNumber > totalChunks) {
      return null;
    }

    const start = (chunkNumber - 1) * CREATORS_PER_SITEMAP;
    const slice = CREATORS.slice(start, start + CREATORS_PER_SITEMAP);

    const creatorRoutes: SitemapRouteConfig[] = slice.map((creator) => ({
      path: `/profile/${encodeURIComponent(creator.username)}`,
      changefreq: 'daily',
      priority: 0.85,
    }));

    const entries = expandLocalizedRoutes(creatorRoutes, baseUrl, lastmod);
    return buildUrlSetXml(entries);
  }

  return null;
}