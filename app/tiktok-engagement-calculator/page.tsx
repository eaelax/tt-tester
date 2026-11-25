import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EngagementCalculatorView from '@/components/EngagementCalculatorView';
import { buildLocalizedMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildLocalizedMetadata({
    path: '/tiktok-engagement-calculator',
    titleKey: 'page.engageCalc.title',
    descriptionKey: 'page.engageCalc.subtitle',
    fallbackTitle: 'TikTok Engagement Rate Calculator',
    fallbackDescription:
      'Calculate your exact TikTok engagement rate by views or followers. Compare your creator metrics against verified industry benchmarks.',
  });
}

export default function EngagementCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-canvas)] text-[var(--ink-primary)]">
      <Navbar />
      <EngagementCalculatorView />
      <Footer />
    </div>
  );
}