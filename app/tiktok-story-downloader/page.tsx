import type { Metadata } from 'next';
import { headers } from 'next/headers';
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

  const pageTitle = `${pageDict['page.storyDl.title']} - ${uiDict['brand.name']}`;
  const pageDesc = pageDict['page.storyDl.subtitle'];
  const canonicalUrl = `https://tikprofilesviewer.com${localizeHref(
    '/tiktok-story-downloader',
    lang
  )}`;

  const languages: Record<string, string> = {};
  for (const item of SUPPORTED_LANGUAGES) {
    languages[item.code] = `https://tikprofilesviewer.com${localizeHref(
      '/tiktok-story-downloader',
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

export default function StoryDownloaderPage() {
  const features = [
    {
      titleKey: 'page.storyDl.f1Title',
      descKey: 'page.storyDl.f1Desc',
      iconName: 'clock',
      iconBgClass: 'bg-[var(--pastel-pink)]',
      iconTextClass: 'text-[var(--accent-primary-text)]',
      iconBorderClass: 'border-[var(--pastel-pink-border)]',
    },
    {
      titleKey: 'page.storyDl.f2Title',
      descKey: 'page.storyDl.f2Desc',
      iconName: 'eyeOff',
      iconBgClass: 'bg-[var(--pastel-blue)]',
      iconTextClass: 'text-[var(--accent-cyan-text)]',
      iconBorderClass: 'border-[var(--pastel-blue-border)]',
    },
    {
      titleKey: 'page.storyDl.f3Title',
      descKey: 'page.storyDl.f3Desc',
      iconName: 'film',
      iconBgClass: 'bg-[var(--accent-dark)]',
      iconTextClass: 'text-[var(--accent-contrast)]',
    },
  ] as const;

  const faqs = [
    { qKey: 'page.storyDl.q1', aKey: 'page.storyDl.a1' },
    { qKey: 'page.storyDl.q2', aKey: 'page.storyDl.a2' },
    { qKey: 'page.storyDl.q3', aKey: 'page.storyDl.a3' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-canvas)] text-[var(--ink-primary)]">
      <Navbar />
      <LocalizedToolView toolKey="storyDl" features={features} faqs={faqs} showAdSlot />
      <Footer />
    </div>
  );
}