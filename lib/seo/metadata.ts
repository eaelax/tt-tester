import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { UI_DICTIONARIES } from '@/lib/i18n/dictionaries-ui';
import { PAGE_DICTIONARIES } from '@/lib/i18n/dictionaries-pages';
import {
  DEFAULT_LANGUAGE,
  LanguageCode,
  SUPPORTED_LANGUAGES,
  isSupportedLanguage,
  localizeHref,
} from '@/lib/i18n/types';
import { getBaseUrl } from '@/lib/seo/sitemap';

interface BuildLocalizedMetadataOptions {
  path: string;
  titleKey: string;
  descriptionKey: string;
  fallbackTitle?: string;
  fallbackDescription?: string;
  type?: 'website' | 'article';
}

export async function getRequestLanguage(): Promise<LanguageCode> {
  const reqHeaders = await headers();
  const headerLang = reqHeaders.get('x-tpv-lang') || DEFAULT_LANGUAGE;
  return isSupportedLanguage(headerLang) ? headerLang : DEFAULT_LANGUAGE;
}

export async function buildLocalizedMetadata({
  path,
  titleKey,
  descriptionKey,
  fallbackTitle,
  fallbackDescription,
  type = 'website',
}: BuildLocalizedMetadataOptions): Promise<Metadata> {
  const lang = await getRequestLanguage();
  const uiDict = UI_DICTIONARIES[lang] || UI_DICTIONARIES.en;
  const pageDict = PAGE_DICTIONARIES[lang] || PAGE_DICTIONARIES.en;
  const baseUrl = getBaseUrl();

  const rawTitle = pageDict[titleKey] || fallbackTitle || uiDict['brand.name'];
  const pageTitle = `${rawTitle} - ${uiDict['brand.name']}`;
  const pageDesc =
    pageDict[descriptionKey] || fallbackDescription || uiDict['hero.homeSubtitle'];

  const canonicalUrl = `${baseUrl}${localizeHref(path, lang)}`;

  const languages: Record<string, string> = {};
  for (const item of SUPPORTED_LANGUAGES) {
    languages[item.code] = `${baseUrl}${localizeHref(path, item.code)}`;
  }
  languages['x-default'] = `${baseUrl}${localizeHref(path, DEFAULT_LANGUAGE)}`;

  return {
    title: pageTitle,
    description: pageDesc,
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: canonicalUrl,
      siteName: uiDict['brand.name'],
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDesc,
    },
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
  };
}