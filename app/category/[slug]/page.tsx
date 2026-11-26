import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryDetailView from '@/components/CategoryDetailView';
import {
  getCategoryBySlug,
  getCreatorsByCategory,
} from '@/lib/creators-data';
import { UI_DICTIONARIES } from '@/lib/i18n/dictionaries-ui';
import { getLocalizedCategoryBundle } from '@/lib/i18n/category-faqs';
import { SUPPORTED_LANGUAGES, localizeHref } from '@/lib/i18n/types';
import { buildAlternates, getRequestLanguage } from '@/lib/seo/metadata';
import { getBaseUrl } from '@/lib/seo/sitemap';

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

  const lang = await getRequestLanguage();
  const uiDict = UI_DICTIONARIES[lang] || UI_DICTIONARIES.en;
  const bundle = getLocalizedCategoryBundle(category, lang);

  const title = `${bundle.metaTitle} - ${uiDict['brand.name']}`;
  const description = bundle.metaDesc;
  const routePath = `/category/${encodeURIComponent(slug)}`;
  const alternates = buildAlternates(routePath, lang);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      siteName: uiDict['brand.name'],
      locale: lang,
      alternateLocale: SUPPORTED_LANGUAGES.filter((item) => item.code !== lang).map(
        (item) => item.code
      ),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates,
  };
}

export default async function CategoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const lang = await getRequestLanguage();
  const bundle = getLocalizedCategoryBundle(category, lang);
  const creatorsInNiche = getCreatorsByCategory(category.slug);
  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}${localizeHref(
    `/category/${encodeURIComponent(slug)}`,
    lang
  )}`;

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: bundle.name,
    description: bundle.metaDesc,
    url: canonicalUrl,
    inLanguage: lang,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    mainEntity: bundle.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-canvas)] text-[var(--ink-primary)]">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CategoryDetailView category={category} creators={creatorsInNiche} />
      <Footer />
    </div>
  );
}