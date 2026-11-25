import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryDetailView from '@/components/CategoryDetailView';
import {
  getCategoryBySlug,
  getCreatorsByCategory,
} from '@/lib/creators-data';
import { UI_DICTIONARIES } from '@/lib/i18n/dictionaries-ui';
import {
  DEFAULT_LANGUAGE,
  LanguageCode,
  SUPPORTED_LANGUAGES,
  isSupportedLanguage,
  localizeHref,
} from '@/lib/i18n/types';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'Category Not Found - Tik Profiles Viewer',
    };
  }

  const reqHeaders = await headers();
  const headerLang = reqHeaders.get('x-tpv-lang') || DEFAULT_LANGUAGE;
  const lang: LanguageCode = isSupportedLanguage(headerLang)
    ? headerLang
    : DEFAULT_LANGUAGE;
  const uiDict = UI_DICTIONARIES[lang] || UI_DICTIONARIES.en;

  const title = `${category.title} - ${uiDict['brand.name']}`;
  const description = category.seoDescription;
  const canonicalUrl = `https://tikprofilesviewer.com${localizeHref(`/category/${slug}`, lang)}`;

  const languages: Record<string, string> = {};
  for (const item of SUPPORTED_LANGUAGES) {
    languages[item.code] = `https://tikprofilesviewer.com${localizeHref(
      `/category/${slug}`,
      item.code
    )}`;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
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

export default async function CategoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const creatorsInNiche = getCreatorsByCategory(category.slug);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-canvas)] text-[var(--ink-primary)]">
      <Navbar />
      <CategoryDetailView category={category} creators={creatorsInNiche} />
      <Footer />
    </div>
  );
}