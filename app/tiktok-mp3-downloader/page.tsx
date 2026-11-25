import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Music, Volume2, Download } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LocalizedToolView from '@/components/LocalizedToolView';
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

  const pageTitle = `${pageDict['page.mp3Dl.title']} - ${uiDict['brand.name']}`;
  const pageDesc = pageDict['page.mp3Dl.subtitle'];
  const canonicalUrl = `https://tikprofilesviewer.com${localizeHref(
    '/tiktok-mp3-downloader',
    lang
  )}`;

  const languages: Record<string, string> = {};
  for (const item of SUPPORTED_LANGUAGES) {
    languages[item.code] = `https://tikprofilesviewer.com${localizeHref(
      '/tiktok-mp3-downloader',
      item.code
    )}`;
  }

  return {
    title: pageTitle,
    description: pageDesc,
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: canonicalUrl,
      siteName: uiDict['brand.name'],
      type: 'website',
    },
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
  };
}

export default function AudioDownloaderPage() {
  const features = [
    {
      titleKey: 'page.mp3Dl.f1Title',
      descKey: 'page.mp3Dl.f1Desc',
      icon: Volume2,
      iconBgClass: 'bg-[var(--pastel-blue)]',
      iconTextClass: 'text-[var(--accent-cyan-text)]',
      iconBorderClass: 'border-[var(--pastel-blue-border)]',
    },
    {
      titleKey: 'page.mp3Dl.f2Title',
      descKey: 'page.mp3Dl.f2Desc',
      icon: Music,
      iconBgClass: 'bg-[var(--pastel-pink)]',
      iconTextClass: 'text-[var(--accent-primary-text)]',
      iconBorderClass: 'border-[var(--pastel-pink-border)]',
    },
    {
      titleKey: 'page.mp3Dl.f3Title',
      descKey: 'page.mp3Dl.f3Desc',
      icon: Download,
      iconBgClass: 'bg-[var(--accent-dark)]',
      iconTextClass: 'text-[var(--accent-contrast)]',
    },
  ] as const;

  const faqs = [
    { qKey: 'page.mp3Dl.q1', aKey: 'page.mp3Dl.a1' },
    { qKey: 'page.mp3Dl.q2', aKey: 'page.mp3Dl.a2' },
    { qKey: 'page.mp3Dl.q3', aKey: 'page.mp3Dl.a3' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-canvas)] text-[var(--ink-primary)]">
      <Navbar />
      <LocalizedToolView toolKey="mp3Dl" features={features} faqs={faqs} />
      <Footer />
    </div>
  );
}