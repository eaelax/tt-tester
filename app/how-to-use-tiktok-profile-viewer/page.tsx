import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HowToUsePageView from '@/components/HowToUsePageView';
import { buildLocalizedMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildLocalizedMetadata({
    path: '/how-to-use-tiktok-profile-viewer',
    titleKey: 'page.howto.title',
    descriptionKey: 'page.howto.subtitle',
    fallbackTitle: 'How to Use Tik Profiles Viewer',
    fallbackDescription:
      'Follow this step-by-step guide to search any public TikTok profile anonymously with no login, stream videos smoothly, and download free HD MP4 and MP3 files.',
    type: 'article',
  });
}

export default function HowToUsePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-canvas)] text-[var(--ink-primary)]">
      <Navbar />
      <HowToUsePageView />
      <Footer />
    </div>
  );
}