import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LocalizedToolView from '@/components/LocalizedToolView';
import { buildLocalizedMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildLocalizedMetadata({
    path: '/tiktok-profile-viewer',
    titleKey: 'page.viewer.title',
    descriptionKey: 'page.viewer.subtitle',
    fallbackTitle: 'Anonymous TikTok Profile Viewer - No Login, Free HD Stream',
    fallbackDescription:
      'Search any public TikTok creator anonymously with no login, view live follower stats, and watch or save free HD MP4 videos without watermark.',
  });
}

export default function ProfileViewerPage() {
  const features = [
    {
      titleKey: 'page.viewer.f1Title',
      descKey: 'page.viewer.f1Desc',
      iconName: 'eyeOff',
      iconBgClass: 'bg-[var(--pastel-blue)]',
      iconTextClass: 'text-[var(--accent-cyan-text)]',
      iconBorderClass: 'border-[var(--pastel-blue-border)]',
    },
    {
      titleKey: 'page.viewer.f2Title',
      descKey: 'page.viewer.f2Desc',
      iconName: 'userCheck',
      iconBgClass: 'bg-[var(--pastel-pink)]',
      iconTextClass: 'text-[var(--accent-primary-text)]',
      iconBorderClass: 'border-[var(--pastel-pink-border)]',
    },
    {
      titleKey: 'page.viewer.f3Title',
      descKey: 'page.viewer.f3Desc',
      iconName: 'barChart2',
      iconBgClass: 'bg-[var(--accent-dark)]',
      iconTextClass: 'text-[var(--accent-contrast)]',
    },
  ] as const;

  const faqs = [
    { qKey: 'page.viewer.q1', aKey: 'page.viewer.a1' },
    { qKey: 'page.viewer.q2', aKey: 'page.viewer.a2' },
    { qKey: 'page.viewer.q3', aKey: 'page.viewer.a3' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-canvas)] text-[var(--ink-primary)]">
      <Navbar />
      <LocalizedToolView toolKey="viewer" features={features} faqs={faqs} />
      <Footer />
    </div>
  );
}