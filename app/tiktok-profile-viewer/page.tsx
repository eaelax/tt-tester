import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { EyeOff, UserCheck, BarChart2 } from 'lucide-react';
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

  const pageTitle = `${pageDict['page.viewer.title']} - ${uiDict['brand.name']}`;
  const pageDesc = pageDict['page.viewer.subtitle'];
  const canonicalUrl = `https://tikprofilesviewer.com${localizeHref(
    '/tiktok-profile-viewer',
    lang
  )}`;

  const languages: Record<string, string> = {};
  for (const item of SUPPORTED_LANGUAGES) {
    languages[item.code] = `https://tikprofilesviewer.com${localizeHref(
      '/tiktok-profile-viewer',
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

export default function ProfileViewerPage() {
  const features = [
    {
      titleKey: 'page.viewer.f1Title',
      descKey: 'page.viewer.f1Desc',
      icon: EyeOff,
      iconBgClass: 'bg-[var(--pastel-blue)]',
      iconTextClass: 'text-[var(--accent-cyan-text)]',
      iconBorderClass: 'border-[var(--pastel-blue-border)]',
    },
    {
      titleKey: 'page.viewer.f2Title',
      descKey: 'page.viewer.f2Desc',
      icon: UserCheck,
      iconBgClass: 'bg-[var(--pastel-pink)]',
      iconTextClass: 'text-[var(--accent-primary-text)]',
      iconBorderClass: 'border-[var(--pastel-pink-border)]',
    },
    {
      titleKey: 'page.viewer.f3Title',
      descKey: 'page.viewer.f3Desc',
      icon: BarChart2,
      iconBgClass: 'bg-[var(--accent-dark)]',
      iconTextClass: 'text-[var(--accent-contrast)]',
    },
  ] as const;

  const faqs = [
    { qKey: 'page.viewer.q1', aKey: 'page.viewer.a1' },
    { qKey: 'page.viewer.q2', aKey: 'page.viewer.a2' },
    { qKey: 'page.viewer.q3', aKey: 'page.viewer.a3' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-canvas)] text-[var(--ink-primary)]">
      <Navbar />
      <LocalizedToolView toolKey="viewer" features={features} faqs={faqs} />
      <Footer />
    </div>
  );
}