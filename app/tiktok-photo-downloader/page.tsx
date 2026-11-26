import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LocalizedToolView from '@/components/LocalizedToolView';
import { buildLocalizedMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildLocalizedMetadata({
    path: '/tiktok-photo-downloader',
    titleKey: 'page.photoDl.title',
    descriptionKey: 'page.photoDl.subtitle',
    fallbackTitle: 'Free TikTok Photo & Slideshow Downloader Without Watermark',
    fallbackDescription:
      'Extract and download clean individual images from any public TikTok photo slideshow in original HD quality without watermark and no login.',
  });
}

export default function PhotoDownloaderPage() {
  const features = [
    {
      titleKey: 'page.photoDl.f1Title',
      descKey: 'page.photoDl.f1Desc',
      iconName: 'layers',
      iconBgClass: 'bg-[var(--pastel-blue)]',
      iconTextClass: 'text-[var(--accent-cyan-text)]',
      iconBorderClass: 'border-[var(--pastel-blue-border)]',
    },
    {
      titleKey: 'page.photoDl.f2Title',
      descKey: 'page.photoDl.f2Desc',
      iconName: 'shieldCheck',
      iconBgClass: 'bg-[var(--pastel-pink)]',
      iconTextClass: 'text-[var(--accent-primary-text)]',
      iconBorderClass: 'border-[var(--pastel-pink-border)]',
    },
    {
      titleKey: 'page.photoDl.f3Title',
      descKey: 'page.photoDl.f3Desc',
      iconName: 'image',
      iconBgClass: 'bg-[var(--accent-dark)]',
      iconTextClass: 'text-[var(--accent-contrast)]',
    },
  ] as const;

  const faqs = [
    { qKey: 'page.photoDl.q1', aKey: 'page.photoDl.a1' },
    { qKey: 'page.photoDl.q2', aKey: 'page.photoDl.a2' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-canvas)] text-[var(--ink-primary)]">
      <Navbar />
      <LocalizedToolView toolKey="photoDl" features={features} faqs={faqs} showAdSlot />
      <Footer />
    </div>
  );
}