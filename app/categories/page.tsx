import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoriesPageView from '@/components/CategoriesPageView';
import { buildLocalizedMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildLocalizedMetadata({
    path: '/categories',
    titleKey: 'page.categories.title',
    descriptionKey: 'page.categories.subtitle',
    fallbackTitle: 'Explore TikTok Creators by Category',
    fallbackDescription:
      'Browse public TikTok creators and HD videos by topic including comedy, cooking, tech, gaming, fitness, dance, beauty, science, travel, and pets.',
    type: 'website',
  });
}

export default function CategoriesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-canvas)] text-[var(--ink-primary)]">
      <Navbar />
      <CategoriesPageView />
      <Footer />
    </div>
  );
}