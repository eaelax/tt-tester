import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnalyticsPageView from '@/components/AnalyticsPageView';
import { buildLocalizedMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildLocalizedMetadata({
    path: '/tiktok-analytics',
    titleKey: 'page.analytics.title',
    descriptionKey: 'page.analytics.subtitle',
    fallbackTitle: 'TikTok Profile Analytics',
    fallbackDescription:
      'Check any public creator account. See live engagement rates, average video views, and estimated sponsorship value.',
  });
}

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-canvas)] text-[var(--ink-primary)]">
      <Navbar />
      <AnalyticsPageView />
      <Footer />
    </div>
  );
}