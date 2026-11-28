// File: app/page.tsx
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TikTokProfileViewer from '@/components/TikTokProfileViewer';
import HomeLowerSections from '@/components/HomeLowerSections';
import { UI_DICTIONARIES } from '@/lib/i18n/dictionaries-ui';
import {
  SUPPORTED_LANGUAGES,
  localizeHref,
  type LanguageCode,
} from '@/lib/i18n/types';
import {
  SITE_LAST_UPDATED_ISO,
  buildAlternates,
  buildOgImageUrl,
  formatSeoDescription,
  getRequestLanguage,
} from '@/lib/seo/metadata';
import { getBaseUrl } from '@/lib/seo/sitemap';

const HOME_SERP_TITLES: Record<LanguageCode, string> = {
  en: 'Tik Profiles Viewer: Free HD Video & Profile Viewer',
  ar: 'عارض حسابات تيك توك مجاني وتنزيل فيديو HD بدون علامة',
  fr: 'Tik Profiles Viewer : Visionneuse & Vidéos HD Gratuites',
  es: 'Tik Profiles Viewer: Visor Anónimo y Videos HD Gratis',
  de: 'Tik Profiles Viewer: Profil-Viewer & HD-Downloader',
  ru: 'Tik Profiles Viewer: просмотр профилей и HD видео',
  zh: 'Tik Profiles Viewer：免费主页查看与无水印高清下载',
  pt: 'Tik Profiles Viewer: Visualizador e Vídeos HD Grátis',
  he: 'צפייה בפרופילי טיקטוק והורדת וידאו HD בחינם',
  hi: 'Tik Profiles Viewer: मुफ्त प्रोफाइल व्यूअर और HD वीडियो',
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLanguage();
  const dict = UI_DICTIONARIES[lang] || UI_DICTIONARIES.en;
  const pageTitle = HOME_SERP_TITLES[lang] || HOME_SERP_TITLES.en;
  const pageDesc = formatSeoDescription(dict['hero.homeSubtitle'], 160);
  const alternates = buildAlternates('/', lang);
  const ogImageUrl = buildOgImageUrl({
    title: pageTitle,
    subtitle: pageDesc,
    badge: dict['brand.name'],
    lang,
  });

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
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDesc,
      images: [ogImageUrl],
    },
    alternates,
    robots: {
      index: true,
      follow: true,
    },
    other: {
      'og:updated_time': SITE_LAST_UPDATED_ISO,
    },
  };
}

export default async function HomePage() {
  const lang = await getRequestLanguage();
  const dict = UI_DICTIONARIES[lang] || UI_DICTIONARIES.en;
  const baseUrl = getBaseUrl();
  const localizedHomeUrl = `${baseUrl}${localizeHref('/', lang)}`;

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: dict['brand.name'],
    url: localizedHomeUrl,
    inLanguage: lang,
    dateModified: SITE_LAST_UPDATED_ISO,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}${localizeHref('/profile/', lang)}{search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: dict['brand.name'],
    url: baseUrl,
    logo: `${baseUrl}/assets/aistudio/tik-profiles-viewer-logo_c4487561.png`,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        email: 'support@tikprofilesviewer.com',
        contactType: 'customer support',
      },
    ],
  };

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: dict['brand.name'],
    url: localizedHomeUrl,
    inLanguage: lang,
    dateModified: SITE_LAST_UPDATED_ISO,
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
    dateModified: SITE_LAST_UPDATED_ISO,
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

      <main id="main-content" className="flex-1 w-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
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