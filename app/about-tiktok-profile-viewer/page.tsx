import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutPageView from '@/components/AboutPageView';
import { buildLocalizedMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildLocalizedMetadata({
    path: '/about-us',
    titleKey: 'page.about.title',
    descriptionKey: 'page.about.subtitle',
    fallbackTitle: 'About Tik Profiles Viewer',
    fallbackDescription:
      'Tik Profiles Viewer is a free web service built to inspect public TikTok profiles anonymously with no login and download HD MP4 videos without watermark.',
    type: 'article',
  });
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-canvas)] text-[var(--ink-primary)]">
      <Navbar />
      <AboutPageView />
      <Footer />
    </div>
  );
}