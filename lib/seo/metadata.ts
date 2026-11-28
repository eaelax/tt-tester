// File: lib/seo/metadata.ts
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { UI_DICTIONARIES } from '@/lib/i18n/dictionaries-ui';
import { PAGE_DICTIONARIES } from '@/lib/i18n/dictionaries-pages';
import {
  DEFAULT_LANGUAGE,
  LanguageCode,
  SUPPORTED_LANGUAGES,
  interpolateTemplate,
  isSupportedLanguage,
  localizeHref,
  type TemplateVars,
} from '@/lib/i18n/types';
import { getBaseUrl } from '@/lib/seo/sitemap';

export { interpolateTemplate, type TemplateVars };

export const SITE_LAST_UPDATED_ISO = '2026-11-28T00:00:00.000Z';
export const LEGAL_LAST_UPDATED_ISO = '2026-11-06T00:00:00.000Z';

interface BuildLocalizedMetadataOptions {
  path: string;
  titleKey?: string;
  descriptionKey?: string;
  fallbackTitle?: string;
  fallbackDescription?: string;
  rawTitle?: string;
  rawDescription?: string;
  vars?: TemplateVars;
  type?: 'website' | 'article' | 'profile';
  images?: { url: string; width?: number; height?: number; alt?: string }[];
  appendBrand?: boolean;
  ogBadge?: string;
  robots?: Metadata['robots'];
  datePublished?: string;
  dateModified?: string;
}

function trimAtWordBoundary(text: string, maxLength: number): string {
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (cleaned.length <= maxLength) return cleaned;

  const sliced = cleaned.slice(0, maxLength);
  const lastSpace = sliced.lastIndexOf(' ');
  const cut = lastSpace > Math.floor(maxLength * 0.55) ? sliced.slice(0, lastSpace) : sliced;
  return cut.replace(/[\s,.:;\-|/]+$/, '').trim();
}

export function formatSeoTitle(
  rawTitle: string,
  brandName: string,
  appendBrand = true,
  maxLength = 65
): string {
  const cleaned = rawTitle.replace(/\s+/g, ' ').trim();
  if (!cleaned) return brandName;

  if (
    appendBrand &&
    brandName &&
    !cleaned.toLowerCase().includes(brandName.toLowerCase())
  ) {
    const combined = `${cleaned} - ${brandName}`;
    if (combined.length <= maxLength) {
      return combined;
    }
  }

  return trimAtWordBoundary(cleaned, maxLength);
}

export function formatSeoDescription(
  rawDescription: string,
  maxLength = 160
): string {
  const cleaned = rawDescription.replace(/\s+/g, ' ').trim();
  if (!cleaned || cleaned.length <= maxLength) return cleaned;
  return `${trimAtWordBoundary(cleaned, maxLength - 3)}...`;
}

export function buildOgImageUrl(options: {
  title: string;
  subtitle?: string;
  badge?: string;
  lang?: LanguageCode;
}): string {
  const baseUrl = getBaseUrl();
  const params = new URLSearchParams();
  params.set('title', trimAtWordBoundary(options.title, 105));

  if (options.subtitle) {
    params.set('subtitle', trimAtWordBoundary(options.subtitle, 150));
  }
  if (options.badge) {
    params.set('badge', trimAtWordBoundary(options.badge, 44));
  }
  params.set('lang', options.lang || DEFAULT_LANGUAGE);

  return `${baseUrl}/api/og?${params.toString()}`;
}

export async function getRequestLanguage(): Promise<LanguageCode> {
  const reqHeaders = await headers();
  const headerLang = reqHeaders.get('x-tpv-lang') || DEFAULT_LANGUAGE;
  return isSupportedLanguage(headerLang) ? headerLang : DEFAULT_LANGUAGE;
}

export function buildAlternates(
  path: string,
  lang: LanguageCode
): {
  canonical: string;
  languages: Record<string, string>;
} {
  const baseUrl = getBaseUrl();
  const canonical = `${baseUrl}${localizeHref(path, lang)}`;

  const languages: Record<string, string> = {};
  for (const item of SUPPORTED_LANGUAGES) {
    languages[item.code] = `${baseUrl}${localizeHref(path, item.code)}`;
  }
  languages['x-default'] = `${baseUrl}${localizeHref(path, DEFAULT_LANGUAGE)}`;

  return {
    canonical,
    languages,
  };
}

export async function buildLocalizedMetadata({
  path,
  titleKey,
  descriptionKey,
  fallbackTitle,
  fallbackDescription,
  rawTitle,
  rawDescription,
  vars,
  type = 'website',
  images,
  appendBrand = true,
  ogBadge,
  robots,
  datePublished,
  dateModified,
}: BuildLocalizedMetadataOptions): Promise<Metadata> {
  const lang = await getRequestLanguage();
  const uiDict = UI_DICTIONARIES[lang] || UI_DICTIONARIES.en;
  const pageDict = PAGE_DICTIONARIES[lang] || PAGE_DICTIONARIES.en;
  const brandName = uiDict['brand.name'] || 'Tik Profiles Viewer';

  const titleTemplate =
    rawTitle ??
    (titleKey ? pageDict[titleKey] || uiDict[titleKey] : undefined) ??
    fallbackTitle ??
    brandName;

  const resolvedTitle = interpolateTemplate(titleTemplate, vars);
  const pageTitle = formatSeoTitle(resolvedTitle, brandName, appendBrand, 65);

  const descTemplate =
    rawDescription ??
    (descriptionKey ? pageDict[descriptionKey] || uiDict[descriptionKey] : undefined) ??
    fallbackDescription ??
    uiDict['hero.homeSubtitle'];

  const resolvedDesc = interpolateTemplate(descTemplate, vars);
  const pageDesc = formatSeoDescription(resolvedDesc, 160);
  const alternates = buildAlternates(path, lang);

  const defaultOgUrl = buildOgImageUrl({
    title: resolvedTitle,
    subtitle: pageDesc,
    badge: ogBadge || brandName,
    lang,
  });

  const ogImages =
    images && images.length > 0
      ? images
      : [
          {
            url: defaultOgUrl,
            width: 1200,
            height: 630,
            alt: pageTitle,
          },
        ];

  const effectivePublished = datePublished || (type === 'article' ? LEGAL_LAST_UPDATED_ISO : undefined);
  const effectiveModified =
    dateModified || (type === 'article' ? LEGAL_LAST_UPDATED_ISO : SITE_LAST_UPDATED_ISO);

  const openGraphBase = {
    title: pageTitle,
    description: pageDesc,
    url: alternates.canonical,
    siteName: brandName,
    locale: lang,
    alternateLocale: SUPPORTED_LANGUAGES.filter((item) => item.code !== lang).map(
      (item) => item.code
    ),
    images: ogImages,
  };

  return {
    title: pageTitle,
    description: pageDesc,
    openGraph:
      type === 'article'
        ? {
            ...openGraphBase,
            type: 'article',
            publishedTime: effectivePublished,
            modifiedTime: effectiveModified,
          }
        : {
            ...openGraphBase,
            type,
          },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDesc,
      images: ogImages.map((img) => img.url),
    },
    alternates,
    ...(robots ? { robots } : { robots: { index: true, follow: true } }),
    other: {
      'og:updated_time': effectiveModified,
    },
  };
}