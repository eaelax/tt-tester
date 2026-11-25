import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutPageView from '@/components/AboutPageView';
import { UI_DICTIONARIES } from '@/lib/i18n/dictionaries-ui';
import { PAGE_DICTIONARIES } from '@/lib/i18n/dictionaries-pages';
import {
  DEFAULT_LANGUAGE,
  LanguageCode,
  SUPPORTED_LANGUAGES,
  isSupportedLanguage,
  localizeHref,
} from '@/lib/i18n/types';

export async function generateMetadata(): Promise<Metadata> {
  const reqHeaders = await headers();
  const headerLang = reqHeaders.get('x-tpv-lang') || DEFAULT_LANGUAGE;
  const lang: LanguageCode = isSupportedLanguage(headerLang)
    ? headerLang
    : DEFAULT_LANGUAGE;

  const uiDict = UI_DICTIONARIES[lang] || UI_DICTIONARIES.en;
  const pageDict = PAGE_DICTIONARIES[lang] || PAGE_DICTIONARIES.en;

  const pageTitle = `${pageDict['page.about.title']} - ${uiDict['brand.name']}`;
  const pageDesc = pageDict['page.about.subtitle'];
  const canonicalUrl = `https://tikprofilesviewer.com${localizeHref('/about-us', lang)}`;

  const languages: Record<string, string> = {};
  for (const item of SUPPORTED_LANGUAGES) {
    languages[item.code] = `https://tikprofilesviewer.com${localizeHref('/about-us', item.code)}`;
  }

  return {
    title: pageTitle,
    description: pageDesc,
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: canonicalUrl,
      siteName: uiDict['brand.name'],
      type: 'article',
    },
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
  };
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-canvas)] text-[var(--ink-primary)]">
      <Navbar />
      <AboutPageView />
      <Footer />
    </div>
  );
}