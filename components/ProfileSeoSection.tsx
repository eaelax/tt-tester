'use client';

import Link from 'next/link';
import { ChevronRight, Globe, Film, Music, BarChart3, Users } from 'lucide-react';
import type { CreatorData } from '@/lib/creators-data';
import { useI18n } from '@/lib/i18n/context';

const CATEGORY_TRANSLATION_MAP: Record<string, string> = {
  comedy: 'niches.c1',
  'food-cooking': 'niches.c2',
  'tech-ai': 'niches.c3',
  gaming: 'niches.c4',
  'fitness-sports': 'niches.c5',
  'dance-music': 'niches.c6',
  'beauty-fashion': 'niches.c7',
  'education-science': 'niches.c8',
  'travel-adventure': 'niches.c9',
  'pets-animals': 'niches.c10',
};

interface ProfileSeoSectionProps {
  username: string;
  creator?: CreatorData;
  relatedCreators: CreatorData[];
}

export default function ProfileSeoSection({
  username,
  creator,
  relatedCreators,
}: ProfileSeoSectionProps) {
  const { t, localizeHref } = useI18n();

  const categoryLabel = creator
    ? CATEGORY_TRANSLATION_MAP[creator.categorySlug]
      ? t(CATEGORY_TRANSLATION_MAP[creator.categorySlug])
      : creator.category
    : null;

  return (
    <div className="w-full flex flex-col">
      {/* Band 1: Server-Rendered Creator Overview & Internal Tool Links */}
      <section className="w-full bg-[var(--surface-elevated)] border-t border-[var(--border-subtle)] py-10 sm:py-12">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 space-y-6">
          <div className="p-5 sm:p-6 rounded-2xl bg-[var(--surface-canvas)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)] flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <h2
                  data-no-translate="true"
                  className="text-lg sm:text-xl font-bold text-[var(--ink-primary)] tracking-tight"
                >
                  {creator ? `${creator.displayName} (@${creator.username})` : `@${username}`}
                </h2>
                {creator?.verified && (
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--pastel-blue)] border border-[var(--pastel-blue-border)] text-[var(--accent-cyan-text)]">
                    {t('profile.verified')}
                  </span>
                )}
                {creator?.country && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--ink-secondary)]">
                    <Globe className="w-3 h-3 text-[var(--accent-cyan-text)]" />
                    <span>{creator.country}</span>
                  </span>
                )}
              </div>

              {creator ? (
                <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
                  {creator.bio}
                </p>
              ) : (
                <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
                  {t('page.profile.heroSubtitleFallback', { username })}
                </p>
              )}

              {creator && categoryLabel && (
                <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
                  <Link
                    href={localizeHref(`/category/${creator.categorySlug}`)}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[var(--surface-elevated)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] text-[var(--ink-primary)] font-semibold transition-colors"
                  >
                    <span>{categoryLabel}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[var(--accent-cyan-text)] rtl:rotate-180" />
                  </Link>
                  <Link
                    href={localizeHref('/creators')}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[var(--surface-elevated)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] font-semibold transition-colors"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>{t('nav.creators')}</span>
                  </Link>
                </div>
              )}
            </div>

            {creator && (
              <div className="grid grid-cols-2 gap-3 shrink-0 tabular-nums">
                <div className="px-4 py-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-center min-w-[110px]">
                  <div className="text-[11px] font-semibold text-[var(--ink-muted)] uppercase">
                    {t('profile.followers')}
                  </div>
                  <div className="text-base sm:text-lg font-bold text-[var(--ink-primary)] font-mono mt-0.5">
                    {creator.followers}
                  </div>
                </div>
                <div className="px-4 py-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-center min-w-[110px]">
                  <div className="text-[11px] font-semibold text-[var(--ink-muted)] uppercase">
                    {t('profile.totalLikes')}
                  </div>
                  <div className="text-base sm:text-lg font-bold text-[var(--accent-primary-text)] font-mono mt-0.5">
                    {creator.likes}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Direct Tool Shortcuts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href={localizeHref('/tiktok-video-downloader')}
              className="p-4 rounded-xl bg-[var(--surface-canvas)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] transition-colors flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[var(--accent-soft)] text-[var(--accent-primary-text)] border border-[var(--pastel-pink-border)] flex items-center justify-center shrink-0">
                  <Film className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[var(--ink-primary)] truncate">
                    {t('nav.tool.video.label')}
                  </div>
                  <div className="text-[11px] text-[var(--ink-muted)] truncate">
                    {t('nav.tool.video.desc')}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[var(--ink-muted)] group-hover:text-[var(--accent-cyan-text)] shrink-0 rtl:rotate-180" />
            </Link>

            <Link
              href={localizeHref('/tiktok-mp3-downloader')}
              className="p-4 rounded-xl bg-[var(--surface-canvas)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] transition-colors flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[var(--accent-cyan-soft)] text-[var(--accent-cyan-text)] border border-[var(--accent-cyan)] flex items-center justify-center shrink-0">
                  <Music className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[var(--ink-primary)] truncate">
                    {t('nav.tool.mp3.label')}
                  </div>
                  <div className="text-[11px] text-[var(--ink-muted)] truncate">
                    {t('nav.tool.mp3.desc')}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[var(--ink-muted)] group-hover:text-[var(--accent-cyan-text)] shrink-0 rtl:rotate-180" />
            </Link>

            <Link
              href={localizeHref('/tiktok-analytics')}
              className="p-4 rounded-xl bg-[var(--surface-canvas)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] transition-colors flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[var(--surface-elevated)] text-[var(--ink-primary)] border border-[var(--border-strong)] flex items-center justify-center shrink-0">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[var(--ink-primary)] truncate">
                    {t('nav.tool.analytics.label')}
                  </div>
                  <div className="text-[11px] text-[var(--ink-muted)] truncate">
                    {t('nav.tool.analytics.desc')}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[var(--ink-muted)] group-hover:text-[var(--accent-cyan-text)] shrink-0 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* Band 2: Related Creators Internal Linking */}
      {relatedCreators.length > 0 && (
        <section className="w-full bg-[var(--surface-canvas)] border-t border-[var(--border-subtle)] py-10 sm:py-12">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink-primary)] tracking-tight">
                  {t('home.trendingTitle')}
                </h2>
                <p className="text-xs sm:text-sm text-[var(--ink-secondary)] mt-1">
                  {t('home.trendingSubtitle')}
                </p>
              </div>
              <Link
                href={localizeHref('/creators')}
                className="text-xs font-bold text-[var(--accent-cyan-text)] hover:underline shrink-0"
              >
                {t('home.viewAllCreators')}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {relatedCreators.map((item) => (
                <Link
                  key={item.username}
                  href={localizeHref(`/profile/${item.username}`)}
                  className="p-4 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] shadow-[var(--shadow-card)] transition-colors flex items-center gap-3.5 group"
                >
                  <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-[var(--surface-sunken)] shrink-0 border border-[var(--border-subtle)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        item.avatar ||
                        `/api/avatar?username=${encodeURIComponent(item.username)}`
                      }
                      alt={item.displayName}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div
                      data-no-translate="true"
                      className="text-sm font-bold text-[var(--ink-primary)] group-hover:text-[var(--accent-cyan-text)] transition-colors truncate"
                    >
                      {item.displayName}
                    </div>
                    <div
                      dir="ltr"
                      data-no-translate="true"
                      className="text-[11px] font-mono font-semibold text-[var(--ink-muted)] truncate w-fit"
                    >
                      @{item.username}
                    </div>
                    <div className="text-[11px] text-[var(--ink-secondary)] font-semibold mt-0.5 tabular-nums">
                      {t('home.followersLabel', { count: item.followers })}
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-[var(--ink-muted)] group-hover:text-[var(--accent-cyan-text)] shrink-0 rtl:rotate-180" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}