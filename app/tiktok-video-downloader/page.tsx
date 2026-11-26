import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LocalizedToolView from '@/components/LocalizedToolView';
import { buildLocalizedMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildLocalizedMetadata({
    path: '/tiktok-video-downloader',
    titleKey: 'page.videoDl.title',
    descriptionKey: 'page.videoDl.subtitle',
    fallbackTitle: 'Free TikTok Video Downloader Without Watermark (HD MP4)',
    fallbackDescription:
      'Download public TikTok videos in free HD MP4 format without watermark and with no login required on any phone or computer.',
  });
}

export default function VideoDownloaderPage() {
  const features = [
    {
      titleKey: 'page.videoDl.f1Title',
      descKey: 'page.videoDl.f1Desc',
      iconName: 'film',
      iconBgClass: 'bg-[var(--pastel-blue)]',
      iconTextClass: 'text-[var(--accent-cyan-text)]',
      iconBorderClass: 'border-[var(--pastel-blue-border)]',
    },
    {
      titleKey: 'page.videoDl.f2Title',
      descKey: 'page.videoDl.f2Desc',
      iconName: 'zap',
      iconBgClass: 'bg-[var(--pastel-pink)]',
      iconTextClass: 'text-[var(--accent-primary-text)]',
      iconBorderClass: 'border-[var(--pastel-pink-border)]',
    },
    {
      titleKey: 'page.videoDl.f3Title',
      descKey: 'page.videoDl.f3Desc',
      iconName: 'download',
      iconBgClass: 'bg-[var(--accent-dark)]',
      iconTextClass: 'text-[var(--accent-contrast)]',
    },
  ] as const;

  const faqs = [
    { qKey: 'page.videoDl.q1', aKey: 'page.videoDl.a1' },
    { qKey: 'page.videoDl.q2', aKey: 'page.videoDl.a2' },
    { qKey: 'page.videoDl.q3', aKey: 'page.videoDl.a3' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-canvas)] text-[var(--ink-primary)]">
      <Navbar />
      <LocalizedToolView toolKey="videoDl" features={features} faqs={faqs} />
      <Footer />
    </div>
  );
}