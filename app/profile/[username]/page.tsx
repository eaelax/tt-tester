import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import TikTokProfileViewer from '@/components/TikTokProfileViewer';
import ProfileSeoSection from '@/components/ProfileSeoSection';
import ProfileFaqBand from '@/components/ProfileFaqBand';
import { getCreatorByUsername, getRelatedCreators } from '@/lib/creators-data';
import { UI_DICTIONARIES } from '@/lib/i18n/dictionaries-ui';
import { PAGE_DICTIONARIES } from '@/lib/i18n/dictionaries-pages';
import { SUPPORTED_LANGUAGES, localizeHref } from '@/lib/i18n/types';
import {
  buildAlternates,
  getRequestLanguage,
  interpolateTemplate,
} from '@/lib/seo/metadata';
import { getBaseUrl } from '@/lib/seo/sitemap';

interface Props {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username).replace(/^@/, '');
  const creator = getCreatorByUsername(decodedUsername);

  const lang = await getRequestLanguage();
  const uiDict = UI_DICTIONARIES[lang] || UI_DICTIONARIES.en;
  const pageDict = PAGE_DICTIONARIES[lang] || PAGE_DICTIONARIES.en;

  const rawTitle = creator
    ? interpolateTemplate(
        pageDict['page.profile.metaTitleKnown'] ||
          '{displayName} (@{username}) TikTok Profile & HD Videos Without Watermark',
        {
          displayName: creator.displayName,
          username: creator.username,
        }
      )
    : interpolateTemplate(
        pageDict['page.profile.metaTitleFallback'] ||
          '@{username} TikTok Profile & Free HD Videos Without Watermark',
        { username: decodedUsername }
      );

  const title = `${rawTitle} - ${uiDict['brand.name']}`;

  const description = creator
    ? interpolateTemplate(
        pageDict['page.profile.metaDescKnown'] ||
          'Watch and download @{username} TikTok videos in free HD MP4 without watermark. View {followers} followers and extract MP3 audio on TikProfilesViewer.com.',
        {
          username: creator.username,
          followers: creator.followers,
        }
      )
    : interpolateTemplate(
        pageDict['page.profile.heroSubtitleFallback'] ||
          'Watch and download @{username} public TikTok videos anonymously in free HD MP4 without watermark and MP3 audio.',
        { username: decodedUsername }
      );

  const routePath = `/profile/${encodeURIComponent(decodedUsername)}`;
  const alternates = buildAlternates(routePath, lang);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      url: alternates.canonical,
      siteName: uiDict['brand.name'],
      locale: lang,
      alternateLocale: SUPPORTED_LANGUAGES.filter((item) => item.code !== lang).map(
        (item) => item.code
      ),
      images: creator?.avatar
        ? [{ url: creator.avatar, alt: creator.displayName }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates,
  };
}

export default async function CreatorProfilePage({ params }: Props) {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username).replace(/^@/, '');
  const creator = getCreatorByUsername(decodedUsername);
  const relatedCreators = getRelatedCreators(decodedUsername, creator?.categorySlug, 6);

  const lang = await getRequestLanguage();
  const pageDict = PAGE_DICTIONARIES[lang] || PAGE_DICTIONARIES.en;
  const baseUrl = getBaseUrl();
  const routePath = `/profile/${encodeURIComponent(decodedUsername)}`;
  const canonicalUrl = `${baseUrl}${localizeHref(routePath, lang)}`;

  const localizedDescription = creator
    ? interpolateTemplate(
        pageDict['page.profile.metaDescKnown'] ||
          'Watch and download @{username} TikTok videos in free HD MP4 without watermark.',
        {
          username: creator.username,
          followers: creator.followers,
        }
      )
    : interpolateTemplate(
        pageDict['page.profile.heroSubtitleFallback'] ||
          'Watch and download @{username} public TikTok videos anonymously.',
        { username: decodedUsername }
      );

  const localizedPageName = creator
    ? interpolateTemplate(
        pageDict['page.profile.metaTitleKnown'] ||
          '{displayName} (@{username}) TikTok Profile',
        {
          displayName: creator.displayName,
          username: creator.username,
        }
      )
    : interpolateTemplate(
        pageDict['page.profile.heroTitleFallback'] || '@{username} TikTok Profile',
        { username: decodedUsername }
      );

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: localizedPageName,
    url: canonicalUrl,
    inLanguage: lang,
    description: localizedDescription,
    mainEntity: {
      '@type': 'Person',
      name: creator ? creator.displayName : decodedUsername,
      alternateName: `@${decodedUsername}`,
      identifier: decodedUsername,
      url: canonicalUrl,
      description: creator?.bio || localizedDescription,
      interactionStatistic: [
        {
          '@type': 'InteractionCounter',
          interactionType: 'https://schema.org/FollowAction',
          userInteractionCount: creator?.followerCount || 0,
        },
      ],
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    mainEntity: [1, 2, 3].map((num) => ({
      '@type': 'Question',
      name: interpolateTemplate(pageDict[`page.profile.q${num}`] || '', {
        username: decodedUsername,
      }),
      acceptedAnswer: {
        '@type': 'Answer',
        text: interpolateTemplate(pageDict[`page.profile.a${num}`] || '', {
          username: decodedUsername,
        }),
      },
    })),
  };

  const heroTitle = creator
    ? `${creator.displayName} (@${creator.username})`
    : undefined;

  const heroSubtitle = creator?.bio ? creator.bio : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-canvas)] text-[var(--ink-primary)]">
      <Navbar />

      <main className="flex-1 w-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <TikTokProfileViewer
          initialUsername={decodedUsername}
          autoSearch={true}
          heroVariant="workbench"
          title={heroTitle}
          subtitle={heroSubtitle}
          titleKey={heroTitle ? undefined : 'page.profile.heroTitleFallback'}
          subtitleKey={heroSubtitle ? undefined : 'page.profile.heroSubtitleFallback'}
          titleVars={{ username: decodedUsername }}
          subtitleVars={{ username: decodedUsername }}
          breadcrumbs={
            <Breadcrumbs
              items={[
                { label: 'Creators', href: '/creators', translationKey: 'breadcrumb.creators' },
                { label: `@${decodedUsername}` },
              ]}
            />
          }
        />

        <ProfileSeoSection
          username={decodedUsername}
          creator={creator}
          relatedCreators={relatedCreators}
        />

        <ProfileFaqBand username={decodedUsername} />
      </main>

      <Footer />
    </div>
  );
}