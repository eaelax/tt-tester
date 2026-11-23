'use client';

import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

const NICHES = [
  {
    key: 'c1',
    href: '/category/comedy',
    count: 6,
  },
  {
    key: 'c2',
    href: '/category/food-cooking',
    count: 5,
  },
  {
    key: 'c3',
    href: '/category/tech-ai',
    count: 5,
  },
  {
    key: 'c4',
    href: '/category/gaming',
    count: 5,
  },
  {
    key: 'c5',
    href: '/category/fitness-sports',
    count: 5,
  },
  {
    key: 'c6',
    href: '/category/dance-music',
    count: 5,
  },
] as const;

export default function ExploreNichesSection() {
  const { t } = useI18n();

  const scrollToSearch = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const input = document.querySelector(
      '#tiktok-username-search'
    ) as HTMLInputElement | null;
    input?.focus();
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink-primary)] tracking-tight leading-tight">
            {t('niches.title')}
          </h2>
          <p className="text-sm text-[var(--ink-secondary)] mt-2 leading-relaxed">
            {t('niches.subtitle')}
          </p>
        </div>

        <Link
          href="/categories"
          className="h-9 px-4 rounded-lg bg-[var(--surface-canvas)] border border-[var(--border-strong)] hover:bg-[var(--pastel-blue)]/75 hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan-text)] hover:-translate-y-0.5 hover:shadow-xs text-xs font-semibold text-[var(--ink-primary)] inline-flex items-center gap-1.5 transition-all duration-200 shrink-0 w-fit"
        >
          <span>{t('niches.allCategories')}</span>
          <ChevronRight className="w-3.5 h-3.5 text-current rtl:rotate-180" />
        </Link>
      </div>

      {/* 6-Niche Directory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {NICHES.map((niche) => (
          <Link
            key={niche.href}
            href={niche.href}
            className="group p-4 sm:p-5 rounded-xl bg-[var(--surface-canvas)] hover:bg-[var(--pastel-blue)]/35 border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/75 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)] transition-all duration-200 flex flex-col justify-between gap-2"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-[var(--ink-primary)] group-hover:text-[var(--accent-cyan-text)] transition-colors truncate">
                {t(`niches.${niche.key}`)}
              </h3>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[var(--surface-elevated)] border border-[var(--border-subtle)] group-hover:border-[var(--pastel-blue-border)] text-[var(--ink-secondary)] shrink-0 tabular-nums transition-colors">
                {t('niches.creatorsCount', { count: niche.count })}
              </span>
            </div>
            <p className="text-xs text-[var(--ink-secondary)] line-clamp-2 leading-relaxed">
              {t(`niches.${niche.key}Desc`)}
            </p>
          </Link>
        ))}
      </div>

      {/* Three Value Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <div className="p-5 rounded-xl bg-[var(--pastel-blue)]/55 border border-[var(--pastel-blue-border)] text-start flex flex-col gap-1.5">
          <span className="text-sm font-bold text-[var(--ink-primary)] block">
            {t('niches.p1Title')}
          </span>
          <p className="text-xs sm:text-[13px] text-[var(--ink-secondary)] leading-relaxed">
            {t('niches.p1Desc')}
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[var(--pastel-pink)]/55 border border-[var(--pastel-pink-border)] text-start flex flex-col gap-1.5">
          <span className="text-sm font-bold text-[var(--ink-primary)] block">
            {t('niches.p2Title')}
          </span>
          <p className="text-xs sm:text-[13px] text-[var(--ink-secondary)] leading-relaxed">
            {t('niches.p2Desc')}
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[var(--pastel-lavender)]/55 border border-[var(--pastel-lavender-border)] text-start flex flex-col gap-1.5">
          <span className="text-sm font-bold text-[var(--ink-primary)] block">
            {t('niches.p3Title')}
          </span>
          <p className="text-xs sm:text-[13px] text-[var(--ink-secondary)] leading-relaxed">
            {t('niches.p3Desc')}
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-7 flex justify-center">
        <button
          type="button"
          onClick={scrollToSearch}
          className="h-10 inline-flex items-center gap-2 px-6 rounded-lg bg-[var(--accent-primary)] hover:bg-[#F43F5E] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-6px_rgba(225,29,72,0.4)] active:translate-y-0 text-[var(--accent-contrast)] text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer"
        >
          <span>{t('niches.cta')}</span>
          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        </button>
      </div>
    </div>
  );
}