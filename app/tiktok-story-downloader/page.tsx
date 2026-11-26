import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LocalizedToolView from '@/components/LocalizedToolView';
import { buildLocalizedMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildLocalizedMetadata({
    path: '/tiktok-story-downloader',
    titleKey: 'page.storyDl.title',
    descriptionKey: 'page.storyDl.subtitle',
    fallbackTitle: 'Free TikTok Story Downloader Without Watermark - Anonymous & HD',
    fallbackDescription:
      'Download public TikTok stories anonymously in free HD MP4 quality without watermark before they expire, with no login required.',
  });
}

export default function StoryDownloaderPage() {
  const features = [
    {
      titleKey: 'page.storyDl.f1Title',
      descKey: 'page.storyDl.f1Desc',
      iconName: 'clock',
      iconBgClass: 'bg-[var(--pastel-pink)]',
      iconTextClass: 'text-[var(--accent-primary-text)]',
      iconBorderClass: 'border-[var(--pastel-pink-border)]',
    },
    {
      titleKey: 'page.storyDl.f2Title',
      descKey: 'page.storyDl.f2Desc',
      iconName: 'eyeOff',
      iconBgClass: 'bg-[var(--pastel-blue)]',
      iconTextClass: 'text-[var(--accent-cyan-text)]',
      iconBorderClass: 'border-[var(--pastel-blue-border)]',
    },
    {
      titleKey: 'page.storyDl.f3Title',
      descKey: 'page.storyDl.f3Desc',
      iconName: 'film',
      iconBgClass: 'bg-[var(--accent-dark)]',
      iconTextClass: 'text-[var(--accent-contrast)]',
    },
  ] as const;

  const faqs = [
    { qKey: 'page.storyDl.q1', aKey: 'page.storyDl.a1' },
    { qKey: 'page.storyDl.q2', aKey: 'page.storyDl.a2' },
    { qKey: 'page.storyDl.q3', aKey: 'page.storyDl.a3' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-canvas)] text-[var(--ink-primary)]">
      <Navbar />
      <LocalizedToolView toolKey="storyDl" features={features} faqs={faqs} showAdSlot />
      <Footer />
    </div>
  );
}