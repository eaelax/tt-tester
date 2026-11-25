import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Eraser, Film, Zap } from 'lucide-react';
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

  const pageTitle = `${pageDict['page.watermark.title']} - ${uiDict['brand.name']}`;
  const pageDesc = pageDict['page.watermark.subtitle'];
  const canonicalUrl = `https://tikprofilesviewer.com${localizeHref(
    '/tiktok-watermark-remover',
    lang
  )}`;

  const languages: Record<string, string> = {};
  for (const item of SUPPORTED_LANGUAGES) {
    languages[item.code] = `https://tikprofilesviewer.com${localizeHref(
      '/tiktok-watermark-remover',
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

export default function WatermarkRemoverPage() {
  const features = [
    {
      titleKey: 'page.watermark.f1Title',
      descKey: 'page.watermark.f1Desc',
      icon: Eraser,
      iconBgClass: 'bg-[var(--accent-soft)]',
      iconTextClass: 'text-[var(--accent-primary-text)]',
      iconBorderClass: 'border-[var(--accent-primary)]/40',
    },
    {
      titleKey: 'page.watermark.f2Title',
      descKey: 'page.watermark.f2Desc',
      icon: Film,
      iconBgClass: 'bg-[var(--accent-cyan-soft)]',
      iconTextClass: 'text-[var(--accent-cyan-text)]',
      iconBorderClass: 'border-[var(--accent-cyan)]',
    },
    {
      titleKey: 'page.watermark.f3Title',
      descKey: 'page.watermark.f3Desc',
      icon: Zap,
      iconBgClass: 'bg-[var(--accent-dark)]',
      iconTextClass: 'text-[var(--accent-contrast)]',
    },
  ] as const;

  const faqs = [
    { qKey: 'page.watermark.q1', aKey: 'page.watermark.a1' },
    { qKey: 'page.watermark.q2', aKey: 'page.watermark.a2' },
    { qKey: 'page.watermark.q3', aKey: 'page.watermark.a3' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-canvas)] text-[var(--ink-primary)]">
      <Navbar />
      <LocalizedToolView toolKey="watermark" features={features} faqs={faqs} showAdSlot />
      <Footer />
    </div>
  );
}