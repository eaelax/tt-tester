import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import TikTokProfileViewer from '@/components/TikTokProfileViewer';
import ProfileFaqBand from '@/components/ProfileFaqBand';
import { getCreatorByUsername } from '@/lib/creators-data';
import { UI_DICTIONARIES } from '@/lib/i18n/dictionaries-ui';
import { PAGE_DICTIONARIES } from '@/lib/i18n/dictionaries-pages';
import {
  DEFAULT_LANGUAGE,
  LanguageCode,
  SUPPORTED_LANGUAGES,
  isSupportedLanguage,
  localizeHref,
} from '@/lib/i18n/types';

interface Props {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username).replace(/^@/, '');
  const creator = getCreatorByUsername(decodedUsername);

  const reqHeaders = await headers();
  const headerLang = reqHeaders.get('x-tpv-lang') || DEFAULT_LANGUAGE;
  const lang: LanguageCode = isSupportedLanguage(headerLang)
    ? headerLang
    : DEFAULT_LANGUAGE;

  const uiDict = UI_DICTIONARIES[lang] || UI_DICTIONARIES.en;
  const pageDict = PAGE_DICTIONARIES[lang] || PAGE_DICTIONARIES.en;

  const title = creator
    ? `${creator.displayName} (@${creator.username}) TikTok Profile - ${uiDict['brand.name']}`
    : `@${decodedUsername} TikTok Profile & Videos - ${uiDict['brand.name']}`;

  const description = creator
    ? `Watch and download @${creator.username} TikTok videos in HD MP4 without watermarks. View ${creator.followers} followers and MP3 audio tracks on TikProfilesViewer.com.`
    : pageDict['page.profile.heroSubtitleFallback']?.replace(
        /\{username\}/g,
        decodedUsername
      ) || `Watch and download @${decodedUsername} public TikTok videos.`;

  const canonicalUrl = `https://tikprofilesviewer.com${localizeHref(
    `/profile/${decodedUsername}`,
    lang
  )}`;

  const languages: Record<string, string> = {};
  for (const item of SUPPORTED_LANGUAGES) {
    languages[item.code] = `https://tikprofilesviewer.com${localizeHref(
      `/profile/${decodedUsername}`,
      item.code
    )}`;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      url: canonicalUrl,
      siteName: uiDict['brand.name'],
      images: creator?.avatar ? [{ url: creator.avatar, alt: creator.displayName }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
  };
}

export default async function CreatorProfilePage({ params }: Props) {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username).replace(/^@/, '');
  const creator = getCreatorByUsername(decodedUsername);

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: creator ? creator.displayName : decodedUsername,
      alternateName: `@${decodedUsername}`,
      identifier: decodedUsername,
      description: creator?.bio || `TikTok creator @${decodedUsername}`,
      interactionStatistic: [
        {
          '@type': 'InteractionCounter',
          interactionType: 'https://schema.org/FollowAction',
          userInteractionCount: creator?.followerCount || 0,
        },
      ],
    },
  };

  const heroTitle = creator
    ? `${creator.displayName} (@${creator.username})`
    : undefined;

  const heroSubtitle = creator?.bio ? creator.bio : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-canvas)] text-[var(--ink-primary)]">
      <Navbar />

      <div className="w-full bg-[var(--surface-canvas)] border-b border-[var(--border-subtle)]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 pt-3 pb-0.5">
          <Breadcrumbs
            items={[
              { label: 'Creators', href: '/creators', translationKey: 'breadcrumb.creators' },
              { label: `@${decodedUsername}` },
            ]}
          />
        </div>
      </div>

      <main className="flex-1 w-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
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
        />

        <ProfileFaqBand username={decodedUsername} />
      </main>

      <Footer />
    </div>
  );
}