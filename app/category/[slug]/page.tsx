// File: app/category/[slug]/page.tsx
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
import {
  SITE_LAST_UPDATED_ISO,
  buildAlternates,
  buildOgImageUrl,
  formatSeoDescription,
  formatSeoTitle,
  getRequestLanguage,
} from '@/lib/seo/metadata';
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
      robots: { index: false, follow: false },
    };
  }

  const lang = await getRequestLanguage();
  const uiDict = UI_DICTIONARIES[lang] || UI_DICTIONARIES.en;
  const bundle = getLocalizedCategoryBundle(category, lang);
  const brandName = uiDict['brand.name'] || 'Tik Profiles Viewer';

  const title = formatSeoTitle(bundle.metaTitle, brandName, true, 65);
  const description = formatSeoDescription(bundle.metaDesc, 160);
  const routePath = `/category/${encodeURIComponent(slug)}`;
  const alternates = buildAlternates(routePath, lang);

  const ogImageUrl = buildOgImageUrl({
    title: bundle.name,
    subtitle: description,
    badge: brandName,
    lang,
  });

  return {
    title,
    description,
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      siteName: brandName,
      locale: lang,
      alternateLocale: SUPPORTED_LANGUAGES.filter((item) => item.code !== lang).map(
        (item) => item.code
      ),
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
    alternates,
    other: {
      'og:updated_time': SITE_LAST_UPDATED_ISO,
    },
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

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: bundle.name,
    inLanguage: lang,
    numberOfItems: creatorsInNiche.length,
    itemListElement: creatorsInNiche.map((creator, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: `${creator.displayName} (@${creator.username})`,
      url: `${baseUrl}${localizeHref(`/profile/${creator.username}`, lang)}`,
    })),
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: bundle.name,
    description: bundle.metaDesc,
    url: canonicalUrl,
    inLanguage: lang,
    dateModified: SITE_LAST_UPDATED_ISO,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    dateModified: SITE_LAST_UPDATED_ISO,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
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