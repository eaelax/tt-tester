import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CreatorsDirectoryView from '@/components/CreatorsDirectoryView';
import { buildLocalizedMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildLocalizedMetadata({
    path: '/creators',
    titleKey: 'page.creators.title',
    descriptionKey: 'page.creators.subtitle',
    fallbackTitle: 'Top TikTok Creators',
    fallbackDescription:
      'Browse the most followed TikTok creators. View their profiles and download videos without watermarks.',
  });
}

export default function CreatorsDirectoryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-canvas)] text-[var(--ink-primary)]">
      <Navbar />
      <CreatorsDirectoryView />
      <Footer />
    </div>
  );
}