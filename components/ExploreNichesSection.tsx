'use client';

import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/creators-data';
import { useI18n } from '@/lib/i18n/context';

const CATEGORY_KEY_MAP: Record<string, string> = {
  comedy: 'c1',
  'food-cooking': 'c2',
  'tech-ai': 'c3',
  gaming: 'c4',
  'fitness-sports': 'c5',
  'dance-music': 'c6',
  'beauty-fashion': 'c7',
  'education-science': 'c8',
  'travel-adventure': 'c9',
  'pets-animals': 'c10',
};

export default function ExploreNichesSection() {
  const { t, localizeHref } = useI18n();

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
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink-primary)] tracking-tight leading-tight">
            {t('niches.title')}
          </h2>
          <p className="text-sm text-[var(--ink-secondary)] mt-2 leading-relaxed">
            {t('niches.subtitle')}
          </p>
        </div>

        <Link
          href={localizeHref('/categories')}
          className="h-9 px-4 rounded-lg bg-[var(--surface-canvas)] border border-[var(--border-strong)] hover:bg-[var(--pastel-blue)] hover:border-[var(--accent-cyan)] text-xs font-semibold text-[var(--ink-primary)] hover:text-[var(--accent-cyan-text)] inline-flex items-center gap-1.5 transition-colors duration-150 shrink-0 w-fit"
        >
          <span>{t('niches.allCategories')}</span>
          <ChevronRight className="w-3.5 h-3.5 text-current rtl:rotate-180" />
        </Link>
      </div>

      {/* 10-Niche Directory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-8">
        {CATEGORIES.map((category) => {
          const nicheKey = CATEGORY_KEY_MAP[category.slug];
          const title = nicheKey ? t(`niches.${nicheKey}`) : category.name;
          const desc = nicheKey
            ? t(`niches.${nicheKey}Desc`)
            : category.shortDescription;

          return (
            <Link
              key={category.slug}
              href={localizeHref(`/category/${category.slug}`)}
              className="group p-4 rounded-xl bg-[var(--surface-canvas)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] transition-colors duration-150 flex flex-col justify-between gap-2.5"
            >
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--ink-secondary)] w-fit tabular-nums">
                  {t('niches.creatorsCount', {
                    count: category.creatorUsernames.length,
                  })}
                </span>
                <h3 className="text-sm font-bold text-[var(--ink-primary)] group-hover:text-[var(--accent-cyan-text)] transition-colors duration-150 line-clamp-1">
                  {title}
                </h3>
              </div>
              <p className="text-xs text-[var(--ink-secondary)] line-clamp-2 leading-relaxed">
                {desc}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Three Value Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <div className="p-5 rounded-xl bg-[var(--pastel-blue)] border border-[var(--pastel-blue-border)] text-start flex flex-col gap-1.5">
          <span className="text-sm font-bold text-[var(--ink-primary)] block">
            {t('niches.p1Title')}
          </span>
          <p className="text-xs sm:text-[13px] text-[var(--ink-secondary)] leading-relaxed">
            {t('niches.p1Desc')}
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[var(--pastel-pink)] border border-[var(--pastel-pink-border)] text-start flex flex-col gap-1.5">
          <span className="text-sm font-bold text-[var(--ink-primary)] block">
            {t('niches.p2Title')}
          </span>
          <p className="text-xs sm:text-[13px] text-[var(--ink-secondary)] leading-relaxed">
            {t('niches.p2Desc')}
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[var(--pastel-lavender)] border border-[var(--pastel-lavender-border)] text-start flex flex-col gap-1.5">
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
          className="h-10 inline-flex items-center gap-2 px-6 rounded-lg bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--accent-contrast)] text-xs sm:text-sm font-bold transition-colors duration-150 cursor-pointer"
        >
          <span>{t('niches.cta')}</span>
          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        </button>
      </div>
    </div>
  );
}