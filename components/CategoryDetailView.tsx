'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import TikTokProfileViewer from '@/components/TikTokProfileViewer';
import {
  CategoryData,
  CreatorData,
  CATEGORIES,
} from '@/lib/creators-data';
import { useI18n } from '@/lib/i18n/context';
import {
  CATEGORY_NICHE_KEY_MAP,
  getLocalizedCategoryBundle,
} from '@/lib/i18n/category-faqs';

interface CategoryDetailViewProps {
  category: CategoryData;
  creators: CreatorData[];
}

export default function CategoryDetailView({
  category,
  creators,
}: CategoryDetailViewProps) {
  const { lang, t, localizeHref } = useI18n();

  const bundle = getLocalizedCategoryBundle(category, lang);
  const localizedCategoryName = bundle.name;
  const localizedSubtitle = bundle.description;
  const localizedFaqs = bundle.faqs;
  const otherCategories = CATEGORIES.filter((c) => c.slug !== category.slug).slice(0, 4);

  return (
    <main className="flex-1 w-full flex flex-col">
      <TikTokProfileViewer
        initialUsername=""
        autoSearch={false}
        heroVariant="workbench"
        title={localizedCategoryName}
        subtitle={localizedSubtitle}
        breadcrumbs={
          <Breadcrumbs
            items={[
              {
                label: t('breadcrumb.categories'),
                href: '/categories',
                translationKey: 'breadcrumb.categories',
              },
              { label: localizedCategoryName },
            ]}
          />
        }
      >
        <div className="w-full flex flex-col">
          {/* Band 1: Featured Creators in this Niche */}
          <section className="w-full bg-[var(--surface-sunken)] border-b border-[var(--border-subtle)] py-10 sm:py-12">
            <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-5">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink-primary)] tracking-tight">
                    {t('page.category.topHeading', { name: localizedCategoryName })}
                  </h2>
                  <p className="text-sm text-[var(--ink-secondary)] mt-1">
                    {t('page.category.topSubtitle')}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {category.trendingTags.map((tag) => (
                    <span
                      key={tag}
                      dir="ltr"
                      className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-[var(--surface-elevated)] text-[var(--accent-cyan-text)] border border-[var(--accent-cyan)] shadow-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {creators.map((creator) => (
                  <Link
                    key={creator.username}
                    href={localizeHref(`/profile/${creator.username}`)}
                    className="p-4 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] shadow-[var(--shadow-card)] transition-colors duration-150 flex items-center gap-3.5 group"
                  >
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[var(--surface-sunken)] shrink-0 border border-[var(--border-subtle)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={
                          creator.avatar ||
                          `/api/avatar?username=${encodeURIComponent(creator.username)}`
                        }
                        alt={creator.displayName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3
                        data-no-translate="true"
                        className="text-sm font-bold text-[var(--ink-primary)] group-hover:text-[var(--accent-cyan-text)] transition-colors truncate"
                      >
                        {creator.displayName}
                      </h3>
                      <p
                        dir="ltr"
                        data-no-translate="true"
                        className="text-xs font-mono font-semibold text-[var(--ink-muted)] truncate w-fit"
                      >
                        @{creator.username}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-[var(--ink-secondary)] font-medium mt-1 tabular-nums">
                        <span className="font-bold text-[var(--ink-primary)]">
                          {t('page.category.followersLabel', {
                            count: creator.followers,
                          })}
                        </span>
                        <span>•</span>
                        <span>
                          {t('page.category.likesLabel', {
                            count: creator.likes,
                          })}
                        </span>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-[var(--ink-muted)] group-hover:text-[var(--accent-cyan-text)] transition-colors shrink-0 rtl:rotate-180" />
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Band 2: Localized Category FAQs */}
          {localizedFaqs.length > 0 && (
            <section className="w-full bg-[var(--surface-elevated)] border-b border-[var(--border-subtle)] py-10 sm:py-12">
              <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
                <div className="text-center max-w-xl mx-auto mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink-primary)] tracking-tight">
                    {t('page.category.faqHeading', {
                      name: localizedCategoryName,
                    })}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {localizedFaqs.map((faq, index) => (
                    <div
                      key={index}
                      className="p-5 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)] flex flex-col gap-1.5"
                    >
                      <h3 className="text-sm font-bold text-[var(--ink-primary)]">
                        {faq.question}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-[var(--ink-secondary)] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Band 3: Explore Other Categories */}
          <section className="w-full bg-[var(--surface-canvas)] py-10 sm:py-12">
            <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-[var(--ink-primary)] tracking-tight">
                  {t('page.category.otherHeading')}
                </h2>
                <Link
                  href={localizeHref('/categories')}
                  className="text-xs font-bold text-[var(--accent-cyan-text)] hover:underline"
                >
                  {t('page.category.viewAll')}
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {otherCategories.map((c) => {
                  const cMap = CATEGORY_NICHE_KEY_MAP[c.slug];
                  const cName = cMap ? t(cMap.nameKey) : c.name;
                  return (
                    <Link
                      key={c.slug}
                      href={localizeHref(`/category/${c.slug}`)}
                      className="p-4 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] shadow-[var(--shadow-card)] text-xs sm:text-sm text-[var(--ink-primary)] hover:text-[var(--accent-cyan-text)] transition-colors duration-150 flex items-center justify-between"
                    >
                      <span className="truncate font-bold">{cName}</span>
                      <ChevronRight className="w-4 h-4 text-[var(--ink-muted)] shrink-0 rtl:rotate-180" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </TikTokProfileViewer>
    </main>
  );
}