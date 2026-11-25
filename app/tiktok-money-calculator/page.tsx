import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MoneyCalculatorView from '@/components/MoneyCalculatorView';
import { buildLocalizedMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildLocalizedMetadata({
    path: '/tiktok-money-calculator',
    titleKey: 'page.moneyCalc.title',
    descriptionKey: 'page.moneyCalc.subtitle',
    fallbackTitle: 'TikTok Money & Creator Earnings Calculator',
    fallbackDescription:
      'Estimate your monthly creator earnings from brand sponsorships, the Creator Rewards Program, and TikTok Shop affiliate commissions.',
  });
}

export default function MoneyCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-canvas)] text-[var(--ink-primary)]">
      <Navbar />
      <MoneyCalculatorView />
      <Footer />
    </div>
  );
}