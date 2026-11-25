'use client';

import Link from 'next/link';
import { Play, ChevronRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { CATEGORIES } from '@/lib/creators-data';
import { useI18n } from '@/lib/i18n/context';

const CATEGORY_NAMES_MAP: Record<string, { nameKey: string; descKey: string }> = {
  comedy: { nameKey: 'niches.c1', descKey: 'niches.c1Desc' },
  'food-cooking': { nameKey: 'niches.c2', descKey: 'niches.c2Desc' },
  'tech-ai': { nameKey: 'niches.c3', descKey: 'niches.c3Desc' },
  gaming: { nameKey: 'niches.c4', descKey: 'niches.c4Desc' },
  'fitness-sports': { nameKey: 'niches.c5', descKey: 'niches.c5Desc' },
  'dance-music': { nameKey: 'niches.c6', descKey: 'niches.c6Desc' },
};

export default function CategoriesPageView() {
  const { t, localizeHref } = useI18n();

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('page.categories.title'),
    description: t('page.categories.subtitle'),
    url: 'https://tikprofilesviewer.com/categories',
  };

  return (
    <main className="flex-1 max-w-[980px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <Breadcrumbs items={[{ label: t('breadcrumb.categories') }]} />

      {/* Hero Section */}
      <div className="text-center max-w-2xl mx-auto mb-7">
        <h1 className="text-[length:var(--h1-size)] font-bold text-[var(--ink-primary)] tracking-tight leading-tight">
          {t('page.categories.title')}
        </h1>
        <p className="text-xs sm:text-sm text-[var(--ink-secondary)] mt-1.5 leading-relaxed">
          {t('page.categories.subtitle')}
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {CATEGORIES.map((cat) => {
          const mapped = CATEGORY_NAMES_MAP[cat.slug];
          const name = mapped ? t(mapped.nameKey) : cat.name;
          const description = mapped ? t(mapped.descKey) : cat.shortDescription;

          return (
            <Link
              key={cat.slug}
              href={localizeHref(`/category/${cat.slug}`)}
              className="group p-4 sm:p-5 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] shadow-[var(--shadow-card)] transition-colors duration-150 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--pastel-blue)] text-[var(--accent-cyan-text)] border border-[var(--pastel-blue-border)] flex items-center justify-center group-hover:bg-[var(--surface-elevated)] group-hover:border-[var(--accent-cyan)] transition-colors">
                    <Play className="w-4 h-4 fill-current" />
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-[var(--accent-cyan-soft)] border border-[var(--accent-cyan)] text-[var(--accent-cyan-text)] tabular-nums">
                    {t('page.categories.creatorsBadge', {
                      count: cat.creatorUsernames.length,
                    })}
                  </span>
                </div>

                <h2 className="text-sm sm:text-base font-bold text-[var(--ink-primary)] group-hover:text-[var(--accent-cyan-text)] transition-colors">
                  {name}
                </h2>
                <p className="text-xs text-[var(--ink-secondary)] mt-1.5 line-clamp-2 leading-relaxed">
                  {description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--ink-primary)] group-hover:text-[var(--accent-cyan-text)] font-bold transition-colors">
                <span>{t('page.categories.browse', { name })}</span>
                <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}