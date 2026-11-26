import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TikTokProfileViewer from '@/components/TikTokProfileViewer';
import HomeLowerSections from '@/components/HomeLowerSections';
import { UI_DICTIONARIES } from '@/lib/i18n/dictionaries-ui';
import { SUPPORTED_LANGUAGES, localizeHref } from '@/lib/i18n/types';
import { buildAlternates, getRequestLanguage } from '@/lib/seo/metadata';
import { getBaseUrl } from '@/lib/seo/sitemap';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLanguage();
  const dict = UI_DICTIONARIES[lang] || UI_DICTIONARIES.en;
  const pageTitle = `${dict['brand.name']} - ${dict['hero.homeTitle']}`;
  const pageDesc = dict['hero.homeSubtitle'];
  const alternates = buildAlternates('/', lang);

  return {
    title: pageTitle,
    description: pageDesc,
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: alternates.canonical,
      siteName: dict['brand.name'],
      locale: lang,
      alternateLocale: SUPPORTED_LANGUAGES.filter((item) => item.code !== lang).map(
        (item) => item.code
      ),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDesc,
    },
    alternates,
  };
}

export default async function HomePage() {
  const lang = await getRequestLanguage();
  const dict = UI_DICTIONARIES[lang] || UI_DICTIONARIES.en;
  const baseUrl = getBaseUrl();
  const localizedHomeUrl = `${baseUrl}${localizeHref('/', lang)}`;

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: dict['brand.name'],
    url: localizedHomeUrl,
    inLanguage: lang,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'All',
    description: dict['schema.webAppDesc'],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    mainEntity: [
      {
        '@type': 'Question',
        name: dict['schema.faq1Q'],
        acceptedAnswer: {
          '@type': 'Answer',
          text: dict['schema.faq1A'],
        },
      },
      {
        '@type': 'Question',
        name: dict['schema.faq2Q'],
        acceptedAnswer: {
          '@type': 'Answer',
          text: dict['schema.faq2A'],
        },
      },
      {
        '@type': 'Question',
        name: dict['schema.faq3Q'],
        acceptedAnswer: {
          '@type': 'Answer',
          text: dict['schema.faq3A'],
        },
      },
      {
        '@type': 'Question',
        name: dict['schema.faq4Q'],
        acceptedAnswer: {
          '@type': 'Answer',
          text: dict['schema.faq4A'],
        },
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-canvas)] text-[var(--ink-primary)]">
      <Navbar />

      <main className="flex-1 w-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <TikTokProfileViewer
          initialUsername=""
          autoSearch={false}
          heroVariant="workbench"
          titleKey="hero.homeTitle"
          subtitleKey="hero.homeSubtitle"
          title={dict['hero.homeTitle']}
          subtitle={dict['hero.homeSubtitle']}
        >
          <HomeLowerSections />
        </TikTokProfileViewer>
      </main>

      <Footer />
    </div>
  );
}