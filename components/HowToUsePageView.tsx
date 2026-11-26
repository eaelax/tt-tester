'use client';

import Link from 'next/link';
import {
  Search,
  Eye,
  Play,
  Download,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import HowToUseSteps from '@/components/HowToUseSteps';
import { useI18n } from '@/lib/i18n/context';

export default function HowToUsePageView() {
  const { t, localizeHref } = useI18n();

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: t('page.howto.title'),
    description: t('page.howto.subtitle'),
    step: [
      {
        '@type': 'HowToStep',
        name: t('page.howto.s1Title'),
        text: t('page.howto.s1Desc'),
        url: `https://tikprofilesviewer.com${localizeHref('/how-to-use-tiktok-profile-viewer')}#step-1`,
      },
      {
        '@type': 'HowToStep',
        name: t('page.howto.s2Title'),
        text: t('page.howto.s2Desc'),
        url: `https://tikprofilesviewer.com${localizeHref('/how-to-use-tiktok-profile-viewer')}#step-2`,
      },
      {
        '@type': 'HowToStep',
        name: t('page.howto.s3Title'),
        text: t('page.howto.s3Desc'),
        url: `https://tikprofilesviewer.com${localizeHref('/how-to-use-tiktok-profile-viewer')}#step-3`,
      },
      {
        '@type': 'HowToStep',
        name: t('page.howto.s4Title'),
        text: t('page.howto.s4Desc'),
        url: `https://tikprofilesviewer.com${localizeHref('/how-to-use-tiktok-profile-viewer')}#step-4`,
      },
      {
        '@type': 'HowToStep',
        name: t('page.howto.s5Title'),
        text: t('page.howto.s5Desc'),
        url: `https://tikprofilesviewer.com${localizeHref('/how-to-use-tiktok-profile-viewer')}#step-5`,
      },
    ],
  };

  return (
    <main className="flex-1 w-full flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Unified Gradient Header Band */}
      <section className="w-full hero-studio-backdrop border-b border-[var(--border-subtle)] -mt-16 pt-22 pb-8 sm:pt-26 sm:pb-10">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6">
          <Breadcrumbs items={[{ label: t('page.howto.crumb') }]} />

          <div className="text-center max-w-2xl mx-auto mt-3">
            <h1 className="text-[length:var(--h1-size)] font-bold text-[var(--ink-primary)] tracking-tight leading-tight">
              {t('page.howto.title')}
            </h1>
            <p className="text-xs sm:text-sm text-[var(--ink-secondary)] mt-2.5 leading-relaxed">
              {t('page.howto.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[980px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* 3-Step Visual Mockup Cards */}
        <div className="mb-6">
          <HowToUseSteps />
        </div>

        {/* In-depth Steps Guide */}
        <div className="space-y-3.5 my-7">
          {/* Step 1 */}
          <div
            id="step-1"
            className="p-4 sm:p-5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] flex flex-col sm:flex-row gap-4 items-start"
          >
            <div className="w-10 h-10 rounded-lg bg-[var(--accent-dark)] text-[var(--accent-contrast)] font-bold text-sm flex items-center justify-center shrink-0">
              1
            </div>
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[var(--accent-primary-text)]" />
                <h2 className="text-sm sm:text-base font-bold text-[var(--ink-primary)]">
                  {t('page.howto.s1Title')}
                </h2>
              </div>
              <p className="text-xs sm:text-[13px] text-[var(--ink-secondary)] leading-relaxed">
                {t('page.howto.s1Desc')}
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div
            id="step-2"
            className="p-4 sm:p-5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] flex flex-col sm:flex-row gap-4 items-start"
          >
            <div className="w-10 h-10 rounded-lg bg-[var(--accent-dark)] text-[var(--accent-contrast)] font-bold text-sm flex items-center justify-center shrink-0">
              2
            </div>
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[var(--accent-cyan-text)]" />
                <h2 className="text-sm sm:text-base font-bold text-[var(--ink-primary)]">
                  {t('page.howto.s2Title')}
                </h2>
              </div>
              <p className="text-xs sm:text-[13px] text-[var(--ink-secondary)] leading-relaxed">
                {t('page.howto.s2Desc')}
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div
            id="step-3"
            className="p-4 sm:p-5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] flex flex-col sm:flex-row gap-4 items-start"
          >
            <div className="w-10 h-10 rounded-lg bg-[var(--accent-dark)] text-[var(--accent-contrast)] font-bold text-sm flex items-center justify-center shrink-0">
              3
            </div>
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-[var(--accent-primary-text)]" />
                <h2 className="text-sm sm:text-base font-bold text-[var(--ink-primary)]">
                  {t('page.howto.s3Title')}
                </h2>
              </div>
              <p className="text-xs sm:text-[13px] text-[var(--ink-secondary)] leading-relaxed">
                {t('page.howto.s3Desc')}
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div
            id="step-4"
            className="p-4 sm:p-5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] flex flex-col sm:flex-row gap-4 items-start"
          >
            <div className="w-10 h-10 rounded-lg bg-[var(--accent-dark)] text-[var(--accent-contrast)] font-bold text-sm flex items-center justify-center shrink-0">
              4
            </div>
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center gap-2">
                <ChevronDown className="w-4 h-4 text-[var(--accent-cyan-text)]" />
                <h2 className="text-sm sm:text-base font-bold text-[var(--ink-primary)]">
                  {t('page.howto.s4Title')}
                </h2>
              </div>
              <p className="text-xs sm:text-[13px] text-[var(--ink-secondary)] leading-relaxed">
                {t('page.howto.s4Desc')}
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div
            id="step-5"
            className="p-4 sm:p-5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] flex flex-col sm:flex-row gap-4 items-start"
          >
            <div className="w-10 h-10 rounded-lg bg-[var(--accent-dark)] text-[var(--accent-contrast)] font-bold text-sm flex items-center justify-center shrink-0">
              5
            </div>
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-[var(--accent-cyan-text)]" />
                <h2 className="text-sm sm:text-base font-bold text-[var(--ink-primary)]">
                  {t('page.howto.s5Title')}
                </h2>
              </div>
              <p className="text-xs sm:text-[13px] text-[var(--ink-secondary)] leading-relaxed">
                {t('page.howto.s5Desc')}
              </p>
            </div>
          </div>
        </div>

        {/* Helpful Tips Section */}
        <section className="bg-[var(--surface-elevated)] rounded-xl border border-[var(--border-subtle)] p-5 sm:p-6 my-6">
          <div className="flex items-center gap-2 mb-3.5">
            <HelpCircle className="w-4 h-4 text-[var(--accent-primary-text)]" />
            <h2 className="text-sm sm:text-base font-bold text-[var(--ink-primary)]">
              {t('page.howto.tipsTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[var(--ink-secondary)]">
            <div className="p-3.5 rounded-lg bg-[var(--surface-canvas)] border border-[var(--border-subtle)] flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--accent-cyan-text)] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[var(--ink-primary)] me-1">
                  {t('page.howto.t1Label')}
                </strong>
                {t('page.howto.t1Desc')}
              </span>
            </div>
            <div className="p-3.5 rounded-lg bg-[var(--surface-canvas)] border border-[var(--border-subtle)] flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--accent-cyan-text)] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[var(--ink-primary)] me-1">
                  {t('page.howto.t2Label')}
                </strong>
                {t('page.howto.t2Desc')}
              </span>
            </div>
            <div className="p-3.5 rounded-lg bg-[var(--surface-canvas)] border border-[var(--border-subtle)] flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--accent-cyan-text)] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[var(--ink-primary)] me-1">
                  {t('page.howto.t3Label')}
                </strong>
                {t('page.howto.t3Desc')}
              </span>
            </div>
            <div className="p-3.5 rounded-lg bg-[var(--surface-canvas)] border border-[var(--border-subtle)] flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--accent-cyan-text)] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[var(--ink-primary)] me-1">
                  {t('page.howto.t4Label')}
                </strong>
                {t('page.howto.t4Desc')}
              </span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="p-6 sm:p-7 rounded-xl bg-[var(--accent-dark)] text-[var(--accent-contrast)] text-center flex flex-col items-center gap-3 my-6 border border-[var(--accent-dark)]">
          <h2 className="text-lg sm:text-xl font-bold">
            {t('page.howto.ctaTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--accent-contrast)]/85 max-w-lg">
            {t('page.howto.ctaSubtitle')}
          </p>
          <Link
            href={localizeHref('/')}
            className="h-9 px-5 rounded-lg bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--accent-contrast)] font-bold text-xs inline-flex items-center justify-center transition-all"
          >
            {t('page.howto.ctaPrimary')}
          </Link>
        </div>
      </div>
    </main>
  );
}