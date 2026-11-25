import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CaptionGeneratorView from '@/components/CaptionGeneratorView';
import { buildLocalizedMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildLocalizedMetadata({
    path: '/tiktok-caption-generator',
    titleKey: 'page.captionGen.title',
    descriptionKey: 'page.captionGen.subtitle',
    fallbackTitle: 'TikTok Caption & Hashtag Generator',
    fallbackDescription:
      'Build clear video hooks, short captions, and focused hashtags to help more viewers watch and share your posts.',
  });
}

export default function CaptionGeneratorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-canvas)] text-[var(--ink-primary)]">
      <Navbar />
      <CaptionGeneratorView />
      <Footer />
    </div>
  );
}