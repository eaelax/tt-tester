'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

const ALL_TOOLS = [
  { href: '/tiktok-video-downloader', key: 't1', index: '01' },
  { href: '/tiktok-mp3-downloader', key: 't2', index: '02' },
  { href: '/tiktok-profile-viewer', key: 't3', index: '03' },
  { href: '/tiktok-analytics', key: 't4', index: '04' },
  { href: '/tiktok-story-downloader', key: 't5', index: '05' },
  { href: '/tiktok-photo-downloader', key: 't6', index: '06' },
  { href: '/tiktok-money-calculator', key: 't7', index: '07' },
  { href: '/tiktok-engagement-calculator', key: 't8', index: '08' },
  { href: '/tiktok-caption-generator', key: 't9', index: '09' },
  { href: '/tiktok-watermark-remover', key: 't10', index: '10' },
] as const;

export default function CreatorToolsSection() {
  const { t, localizeHref } = useI18n();

  return (
    <div id="tools" className="w-full scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink-primary)] tracking-tight">
          {t('tools.title')}
        </h2>
        <p className="text-sm text-[var(--ink-secondary)] mt-2 leading-relaxed">
          {t('tools.subtitle')}
        </p>
      </div>

      {/* 10-Tool Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {ALL_TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={localizeHref(tool.href)}
            className="group p-4 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] shadow-[var(--shadow-card)] transition-colors duration-150 flex flex-col justify-between min-h-[148px]"
          >
            <div>
              <span className="inline-block text-[11px] font-mono font-bold text-[var(--ink-muted)] group-hover:text-[var(--accent-cyan-text)] tabular-nums mb-2 transition-colors duration-150">
                {tool.index}
              </span>
              <h3 className="text-sm font-bold text-[var(--ink-primary)] group-hover:text-[var(--accent-cyan-text)] transition-colors duration-150 line-clamp-1">
                {t(`tools.${tool.key}Title`)}
              </h3>
              <p className="text-xs text-[var(--ink-secondary)] leading-snug line-clamp-2 mt-1.5">
                {t(`tools.${tool.key}Desc`)}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 mt-3 border-t border-[var(--border-subtle)] text-xs font-semibold text-[var(--ink-primary)] group-hover:text-[var(--accent-cyan-text)] transition-colors duration-150">
              <span>{t('tools.openTool')}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[var(--ink-muted)] group-hover:text-[var(--accent-cyan-text)] transition-colors duration-150 rtl:rotate-180" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}