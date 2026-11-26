import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LocalizedToolView from '@/components/LocalizedToolView';
import { buildLocalizedMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildLocalizedMetadata({
    path: '/tiktok-mp3-downloader',
    titleKey: 'page.mp3Dl.title',
    descriptionKey: 'page.mp3Dl.subtitle',
    fallbackTitle: 'Free TikTok MP3 Audio Extractor & Sound Downloader',
    fallbackDescription:
      'Extract and download clean MP3 music tracks and original voice audio from any public TikTok video for free with no login.',
  });
}

export default function AudioDownloaderPage() {
  const features = [
    {
      titleKey: 'page.mp3Dl.f1Title',
      descKey: 'page.mp3Dl.f1Desc',
      iconName: 'volume2',
      iconBgClass: 'bg-[var(--pastel-blue)]',
      iconTextClass: 'text-[var(--accent-cyan-text)]',
      iconBorderClass: 'border-[var(--pastel-blue-border)]',
    },
    {
      titleKey: 'page.mp3Dl.f2Title',
      descKey: 'page.mp3Dl.f2Desc',
      iconName: 'music',
      iconBgClass: 'bg-[var(--pastel-pink)]',
      iconTextClass: 'text-[var(--accent-primary-text)]',
      iconBorderClass: 'border-[var(--pastel-pink-border)]',
    },
    {
      titleKey: 'page.mp3Dl.f3Title',
      descKey: 'page.mp3Dl.f3Desc',
      iconName: 'download',
      iconBgClass: 'bg-[var(--accent-dark)]',
      iconTextClass: 'text-[var(--accent-contrast)]',
    },
  ] as const;

  const faqs = [
    { qKey: 'page.mp3Dl.q1', aKey: 'page.mp3Dl.a1' },
    { qKey: 'page.mp3Dl.q2', aKey: 'page.mp3Dl.a2' },
    { qKey: 'page.mp3Dl.q3', aKey: 'page.mp3Dl.a3' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-canvas)] text-[var(--ink-primary)]">
      <Navbar />
      <LocalizedToolView toolKey="mp3Dl" features={features} faqs={faqs} />
      <Footer />
    </div>
  );
}