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
  images?: { url: string; alt?: string }[];
  appendBrand?: boolean;
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
}: BuildLocalizedMetadataOptions): Promise<Metadata> {
  const lang = await getRequestLanguage();
  const uiDict = UI_DICTIONARIES[lang] || UI_DICTIONARIES.en;
  const pageDict = PAGE_DICTIONARIES[lang] || PAGE_DICTIONARIES.en;

  const titleTemplate =
    rawTitle ??
    (titleKey ? pageDict[titleKey] || uiDict[titleKey] : undefined) ??
    fallbackTitle ??
    uiDict['brand.name'];

  const resolvedTitle = interpolateTemplate(titleTemplate, vars);
  const pageTitle = appendBrand
    ? `${resolvedTitle} - ${uiDict['brand.name']}`
    : resolvedTitle;

  const descTemplate =
    rawDescription ??
    (descriptionKey ? pageDict[descriptionKey] || uiDict[descriptionKey] : undefined) ??
    fallbackDescription ??
    uiDict['hero.homeSubtitle'];

  const pageDesc = interpolateTemplate(descTemplate, vars);
  const alternates = buildAlternates(path, lang);

  return {
    title: pageTitle,
    description: pageDesc,
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: alternates.canonical,
      siteName: uiDict['brand.name'],
      locale: lang,
      alternateLocale: SUPPORTED_LANGUAGES.filter((item) => item.code !== lang).map(
        (item) => item.code
      ),
      type,
      ...(images && images.length > 0 ? { images } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDesc,
    },
    alternates,
  };
}