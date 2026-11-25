import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Rubik, Cairo, JetBrains_Mono } from 'next/font/google';
import { I18nProvider } from '@/lib/i18n/context';
import {
  DEFAULT_LANGUAGE,
  getLanguageInfo,
  isSupportedLanguage,
} from '@/lib/i18n/types';
import './globals.css';

const rubik = Rubik({
  subsets: ['latin', 'cyrillic', 'hebrew'],
  style: ['normal', 'italic'],
  variable: '--font-rubik',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
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
  const headerStore = await headers();
  const headerLang = (headerStore.get('x-tpv-lang') || '').toLowerCase();
  const lang = isSupportedLanguage(headerLang) ? headerLang : DEFAULT_LANGUAGE;
  const langInfo = getLanguageInfo(lang);

  return (
    <html
      lang={langInfo.code}
      dir={langInfo.dir}
      suppressHydrationWarning
      className={`${rubik.variable} ${cairo.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="referrer" content="no-referrer" />
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
        <I18nProvider initialLang={langInfo.code}>{children}</I18nProvider>
      </body>
    </html>
  );
}