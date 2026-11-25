'use client';

import Link from 'next/link';
import {
  Zap,
  Download,
  ShieldCheck,
  CheckCircle2,
  Users,
  Film,
  Music,
  ArrowRight,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useI18n } from '@/lib/i18n/context';

export default function AboutPageView() {
  const { t, localizeHref } = useI18n();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: t('page.about.title'),
    description: t('page.about.subtitle'),
    url: 'https://tikprofilesviewer.com/about-us',
  };

  return (
    <main className="flex-1 max-w-[980px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Breadcrumbs items={[{ label: t('page.about.crumb') }]} />

      {/* Hero Section */}
      <div className="text-center max-w-2xl mx-auto my-5">
        <h1 className="text-[length:var(--h1-size)] font-bold text-[var(--ink-primary)] tracking-tight leading-tight">
          {t('page.about.title')}
        </h1>
        <p className="text-xs sm:text-sm text-[var(--ink-secondary)] mt-2.5 leading-relaxed">
          {t('page.about.subtitle')}
        </p>
      </div>

      {/* Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div className="p-4 sm:p-5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)] flex flex-col gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[var(--accent-cyan-soft)] text-[var(--accent-cyan-text)] border border-[var(--accent-cyan)] flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-[var(--ink-primary)]">
            {t('page.about.p1Title')}
          </h2>
          <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
            {t('page.about.p1Desc')}
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)] flex flex-col gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[var(--accent-soft)] text-[var(--accent-primary-text)] border border-[var(--pastel-pink-border)] flex items-center justify-center">
            <Download className="w-4 h-4" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-[var(--ink-primary)]">
            {t('page.about.p2Title')}
          </h2>
          <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
            {t('page.about.p2Desc')}
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)] flex flex-col gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[var(--surface-canvas)] text-[var(--ink-primary)] border border-[var(--border-strong)] flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-[var(--ink-primary)]">
            {t('page.about.p3Title')}
          </h2>
          <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
            {t('page.about.p3Desc')}
          </p>
        </div>
      </div>

      {/* Detailed Mission and Capabilities */}
      <section className="bg-[var(--surface-elevated)] rounded-xl border border-[var(--border-subtle)] shadow-[var(--shadow-card)] p-5 sm:p-7 space-y-6 my-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[var(--ink-primary)] mb-2">
            {t('page.about.missionTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
            {t('page.about.missionBody')}
          </p>
        </div>

        <div className="border-t border-[var(--border-subtle)] pt-5">
          <h3 className="text-sm sm:text-base font-bold text-[var(--ink-primary)] mb-3">
            {t('page.about.canDoTitle')}
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <li className="flex items-start gap-2 text-xs text-[var(--ink-secondary)]">
              <CheckCircle2 className="w-4 h-4 text-[var(--accent-cyan-text)] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[var(--ink-primary)] me-1">
                  {t('page.about.c1Label')}
                </strong>
                {t('page.about.c1Desc')}
              </span>
            </li>
            <li className="flex items-start gap-2 text-xs text-[var(--ink-secondary)]">
              <CheckCircle2 className="w-4 h-4 text-[var(--accent-cyan-text)] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[var(--ink-primary)] me-1">
                  {t('page.about.c2Label')}
                </strong>
                {t('page.about.c2Desc')}
              </span>
            </li>
            <li className="flex items-start gap-2 text-xs text-[var(--ink-secondary)]">
              <CheckCircle2 className="w-4 h-4 text-[var(--accent-cyan-text)] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[var(--ink-primary)] me-1">
                  {t('page.about.c3Label')}
                </strong>
                {t('page.about.c3Desc')}
              </span>
            </li>
            <li className="flex items-start gap-2 text-xs text-[var(--ink-secondary)]">
              <CheckCircle2 className="w-4 h-4 text-[var(--accent-cyan-text)] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[var(--ink-primary)] me-1">
                  {t('page.about.c4Label')}
                </strong>
                {t('page.about.c4Desc')}
              </span>
            </li>
            <li className="flex items-start gap-2 text-xs text-[var(--ink-secondary)]">
              <CheckCircle2 className="w-4 h-4 text-[var(--accent-cyan-text)] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[var(--ink-primary)] me-1">
                  {t('page.about.c5Label')}
                </strong>
                {t('page.about.c5Desc')}
              </span>
            </li>
            <li className="flex items-start gap-2 text-xs text-[var(--ink-secondary)]">
              <CheckCircle2 className="w-4 h-4 text-[var(--accent-cyan-text)] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[var(--ink-primary)] me-1">
                  {t('page.about.c6Label')}
                </strong>
                {t('page.about.c6Desc')}
              </span>
            </li>
          </ul>
        </div>

        <div className="border-t border-[var(--border-subtle)] pt-5">
          <h3 className="text-sm sm:text-base font-bold text-[var(--ink-primary)] mb-2">
            {t('page.about.safetyTitle')}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
            {t('page.about.safetyBody')}
          </p>
        </div>
      </section>

      {/* Quick Links to Other Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
        <Link
          href={localizeHref('/tiktok-video-downloader')}
          className="p-4 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] shadow-[var(--shadow-card)] flex items-center justify-between group transition-colors duration-150"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-soft)] text-[var(--accent-primary-text)] border border-[var(--pastel-pink-border)] flex items-center justify-center">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs text-[var(--ink-primary)] group-hover:text-[var(--accent-cyan-text)] transition-colors">
                {t('page.about.link1Title')}
              </div>
              <div className="text-[11px] text-[var(--ink-muted)]">
                {t('page.about.link1Desc')}
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[var(--ink-muted)] group-hover:text-[var(--accent-cyan-text)] transition-colors rtl:rotate-180" />
        </Link>

        <Link
          href={localizeHref('/tiktok-mp3-downloader')}
          className="p-4 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] shadow-[var(--shadow-card)] flex items-center justify-between group transition-colors duration-150"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-cyan-soft)] text-[var(--accent-cyan-text)] border border-[var(--accent-cyan)] flex items-center justify-center">
              <Music className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs text-[var(--ink-primary)] group-hover:text-[var(--accent-cyan-text)] transition-colors">
                {t('page.about.link2Title')}
              </div>
              <div className="text-[11px] text-[var(--ink-muted)]">
                {t('page.about.link2Desc')}
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[var(--ink-muted)] group-hover:text-[var(--accent-cyan-text)] transition-colors rtl:rotate-180" />
        </Link>

        <Link
          href={localizeHref('/creators')}
          className="p-4 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] shadow-[var(--shadow-card)] flex items-center justify-between group transition-colors duration-150"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--surface-canvas)] text-[var(--ink-primary)] border border-[var(--border-strong)] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs text-[var(--ink-primary)] group-hover:text-[var(--accent-cyan-text)] transition-colors">
                {t('page.about.link3Title')}
              </div>
              <div className="text-[11px] text-[var(--ink-muted)]">
                {t('page.about.link3Desc')}
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[var(--ink-muted)] group-hover:text-[var(--accent-cyan-text)] transition-colors rtl:rotate-180" />
        </Link>
      </div>

      {/* CTA Section */}
      <div className="p-6 sm:p-7 rounded-xl bg-[var(--surface-elevated)] text-[var(--ink-primary)] text-center flex flex-col items-center gap-3 my-6 border border-[var(--border-subtle)] shadow-[var(--shadow-card)]">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight">
          {t('page.about.ctaTitle')}
        </h2>
        <p className="text-xs sm:text-sm text-[var(--ink-secondary)] max-w-lg leading-relaxed">
          {t('page.about.ctaSubtitle')}
        </p>
        <Link
          href={localizeHref('/')}
          className="h-9 px-5 rounded-lg bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--accent-contrast)] font-bold text-xs inline-flex items-center justify-center transition-colors shadow-xs"
        >
          {t('page.about.ctaPrimary')}
        </Link>
      </div>
    </main>
  );
}