import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { I18nProvider } from '@/lib/i18n/context';
import {
  DEFAULT_LANGUAGE,
  LanguageCode,
  getLanguageInfo,
  isSupportedLanguage,
} from '@/lib/i18n/types';
import { getBaseUrl } from '@/lib/seo/sitemap';
import { getServerSettings } from '@/lib/server-settings';
import CustomHeadScripts from '@/components/CustomHeadScripts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: 'Tik Profiles Viewer - Free TikTok Profile Viewer & HD Downloader',
  description:
    'View any TikTok profile anonymously, watch videos, and download watermark-free HD videos and MP3 audio for free on TikProfilesViewer.com.',
  referrer: 'no-referrer',
  openGraph: {
    title: 'Tik Profiles Viewer - Free TikTok Profile Viewer & HD Downloader',
    description:
      'View any TikTok profile anonymously, watch videos, and download watermark-free HD videos and MP3 audio for free on TikProfilesViewer.com.',
    url: 'https://tikprofilesviewer.com',
    siteName: 'Tik Profiles Viewer',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tik Profiles Viewer - Free TikTok Profile Viewer & HD Downloader',
    description:
      'View any TikTok profile anonymously, watch videos, and download watermark-free HD videos and MP3 audio for free on TikProfilesViewer.com.',
  },
  icons: {
    icon: '/assets/aistudio/tik-profiles-viewer-logo_c4487561.png',
    shortcut: '/assets/aistudio/tik-profiles-viewer-logo_c4487561.png',
    apple: '/assets/aistudio/tik-profiles-viewer-logo_c4487561.png',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const reqHeaders = await headers();
  const headerLang = reqHeaders.get('x-tpv-lang') || DEFAULT_LANGUAGE;
  const lang: LanguageCode = isSupportedLanguage(headerLang)
    ? headerLang
    : DEFAULT_LANGUAGE;
  const langInfo = getLanguageInfo(lang);

  let customHeadCode = '';
  try {
    const { settings } = await getServerSettings();
    customHeadCode = settings.customHeadCode || '';
  } catch {
    customHeadCode = '';
  }

  return (
    <html
      lang={langInfo.code}
      dir={langInfo.dir}
      suppressHydrationWarning
    >
      <head>
        <meta name="referrer" content="no-referrer" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400..800&family=JetBrains+Mono:wght@400;500;600;700&family=Rubik:ital,wght@0,400..800;1,400..800&display=swap"
        />
        <link
          rel="icon"
          type="image/png"
          href="/assets/aistudio/tik-profiles-viewer-logo_c4487561.png"
        />
        <link
          rel="apple-touch-icon"
          href="/assets/aistudio/tik-profiles-viewer-logo_c4487561.png"
        />
      </head>
      <body className="min-h-screen bg-[var(--surface-canvas)] text-[var(--ink-primary)] font-sans antialiased overflow-x-hidden selection:bg-[var(--accent-soft)] selection:text-[var(--accent-primary-text)]">
        <I18nProvider initialLang={lang}>
          <CustomHeadScripts initialCode={customHeadCode} />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}