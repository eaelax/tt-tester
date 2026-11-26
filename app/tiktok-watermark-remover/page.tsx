import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LocalizedToolView from '@/components/LocalizedToolView';
import { buildLocalizedMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildLocalizedMetadata({
    path: '/tiktok-watermark-remover',
    titleKey: 'page.watermark.title',
    descriptionKey: 'page.watermark.subtitle',
    fallbackTitle: 'Free TikTok Watermark Remover - Save Clean HD MP4 Videos',
    fallbackDescription:
      'Remove the bouncing TikTok logo and username watermark cleanly to save free HD MP4 videos without cropping, blurring, or login.',
  });
}

export default function WatermarkRemoverPage() {
  const features = [
    {
      titleKey: 'page.watermark.f1Title',
      descKey: 'page.watermark.f1Desc',
      iconName: 'eraser',
      iconBgClass: 'bg-[var(--accent-soft)]',
      iconTextClass: 'text-[var(--accent-primary-text)]',
      iconBorderClass: 'border-[var(--accent-primary)]/40',
    },
    {
      titleKey: 'page.watermark.f2Title',
      descKey: 'page.watermark.f2Desc',
      iconName: 'film',
      iconBgClass: 'bg-[var(--accent-cyan-soft)]',
      iconTextClass: 'text-[var(--accent-cyan-text)]',
      iconBorderClass: 'border-[var(--accent-cyan)]',
    },
    {
      titleKey: 'page.watermark.f3Title',
      descKey: 'page.watermark.f3Desc',
      iconName: 'zap',
      iconBgClass: 'bg-[var(--accent-dark)]',
      iconTextClass: 'text-[var(--accent-contrast)]',
    },
  ] as const;

  const faqs = [
    { qKey: 'page.watermark.q1', aKey: 'page.watermark.a1' },
    { qKey: 'page.watermark.q2', aKey: 'page.watermark.a2' },
    { qKey: 'page.watermark.q3', aKey: 'page.watermark.a3' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-canvas)] text-[var(--ink-primary)]">
      <Navbar />
      <LocalizedToolView toolKey="watermark" features={features} faqs={faqs} showAdSlot />
      <Footer />
    </div>
  );
}