'use client';

import { useState } from 'react';
import {
  CheckCircle2,
  HelpCircle,
  BarChart,
  Activity,
  Heart,
  MessageCircle,
  Share2,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import { useI18n } from '@/lib/i18n/context';

export default function EngagementCalculatorView() {
  const { t } = useI18n();
  const [likes, setLikes] = useState<number>(4500);
  const [comments, setComments] = useState<number>(320);
  const [shares, setShares] = useState<number>(180);
  const [views, setViews] = useState<number>(50000);
  const [followers, setFollowers] = useState<number>(30000);
  const [calcMode, setCalcMode] = useState<'views' | 'followers'>('views');

  const totalInteractions = likes + comments + shares;

  const engagementRate =
    calcMode === 'views'
      ? views > 0
        ? ((totalInteractions / views) * 100).toFixed(2)
        : '0.00'
      : followers > 0
      ? ((totalInteractions / followers) * 100).toFixed(2)
      : '0.00';

  const rateNum = Number(engagementRate);

  const getRating = (rate: number) => {
    if (rate >= 9) {
      return {
        label: t('page.engageCalc.ratingViral'),
        color: 'text-[var(--accent-primary-text)]',
        bg: 'bg-[var(--accent-soft)]',
        border: 'border-[var(--accent-primary)]',
      };
    }
    if (rate >= 5) {
      return {
        label: t('page.engageCalc.ratingStrong'),
        color: 'text-[var(--accent-cyan-text)]',
        bg: 'bg-[var(--accent-cyan-soft)]',
        border: 'border-[var(--accent-cyan)]',
      };
    }
    if (rate >= 3) {
      return {
        label: t('page.engageCalc.ratingHealthy'),
        color: 'text-[var(--ink-primary)]',
        bg: 'bg-[var(--surface-sunken)]',
        border: 'border-[var(--border-strong)]',
      };
    }
    return {
      label: t('page.engageCalc.ratingLow'),
      color: 'text-[var(--ink-secondary)]',
      bg: 'bg-[var(--surface-sunken)]',
      border: 'border-[var(--border-subtle)]',
    };
  };

  const rating = getRating(rateNum);

  return (
    <main className="flex-1 max-w-[980px] w-full mx-auto px-4 sm:px-6 py-5 sm:py-7">
      <Breadcrumbs items={[{ label: t('page.engageCalc.crumb') }]} />
      <AdSlot placement="header" />

      {/* Compact Hero Header */}
      <div className="text-center max-w-xl mx-auto mb-5">
        <h1 className="text-[length:var(--h1-size)] font-bold text-[var(--ink-primary)] tracking-tight leading-tight">
          {t('page.engageCalc.title')}
        </h1>
        <p className="text-xs sm:text-sm text-[var(--ink-secondary)] mt-1.5 leading-relaxed">
          {t('page.engageCalc.subtitle')}
        </p>
      </div>

      {/* Interactive Calculator Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 p-4 sm:p-5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[var(--ink-primary)] flex items-center gap-2">
              <Activity className="w-4 h-4 text-[var(--accent-primary-text)]" />
              <span>{t('page.engageCalc.inputHeading')}</span>
            </h2>

            {/* Mode Toggle */}
            <div className="flex rounded-lg border border-[var(--border-strong)] bg-[var(--surface-canvas)] p-0.5 text-xs font-bold">
              <button
                type="button"
                onClick={() => setCalcMode('views')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  calcMode === 'views'
                    ? 'bg-[var(--accent-dark)] text-[var(--accent-contrast)]'
                    : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
                }`}
              >
                {t('page.engageCalc.byViews')}
              </button>
              <button
                type="button"
                onClick={() => setCalcMode('followers')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  calcMode === 'followers'
                    ? 'bg-[var(--accent-dark)] text-[var(--accent-contrast)]'
                    : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
                }`}
              >
                {t('page.engageCalc.byFollowers')}
              </button>
            </div>
          </div>

          {/* Input Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label
                htmlFor="likes-input"
                className="text-xs font-bold text-[var(--ink-primary)] mb-1 flex items-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 text-[var(--accent-primary-text)]" />
                <span>{t('page.engageCalc.likesLabel')}</span>
              </label>
              <input
                id="likes-input"
                type="number"
                min="0"
                value={likes}
                onChange={(e) => setLikes(Math.max(0, Number(e.target.value)))}
                className="w-full h-9 px-3 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-canvas)] text-xs font-medium text-[var(--ink-primary)] tabular-nums focus:outline-none focus:border-[var(--accent-primary)]"
              />
            </div>

            <div>
              <label
                htmlFor="comments-input"
                className="text-xs font-bold text-[var(--ink-primary)] mb-1 flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[var(--accent-cyan-text)]" />
                <span>{t('page.engageCalc.commentsLabel')}</span>
              </label>
              <input
                id="comments-input"
                type="number"
                min="0"
                value={comments}
                onChange={(e) => setComments(Math.max(0, Number(e.target.value)))}
                className="w-full h-9 px-3 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-canvas)] text-xs font-medium text-[var(--ink-primary)] tabular-nums focus:outline-none focus:border-[var(--accent-primary)]"
              />
            </div>

            <div>
              <label
                htmlFor="shares-input"
                className="text-xs font-bold text-[var(--ink-primary)] mb-1 flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5 text-[var(--ink-muted)]" />
                <span>{t('page.engageCalc.sharesLabel')}</span>
              </label>
              <input
                id="shares-input"
                type="number"
                min="0"
                value={shares}
                onChange={(e) => setShares(Math.max(0, Number(e.target.value)))}
                className="w-full h-9 px-3 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-canvas)] text-xs font-medium text-[var(--ink-primary)] tabular-nums focus:outline-none focus:border-[var(--accent-primary)]"
              />
            </div>

            <div>
              <label
                htmlFor="benchmark-base-input"
                className="block text-xs font-bold text-[var(--ink-primary)] mb-1"
              >
                {calcMode === 'views' ? t('page.engageCalc.viewsLabel') : t('page.engageCalc.followersLabel')}
              </label>
              <input
                id="benchmark-base-input"
                type="number"
                min="1"
                value={calcMode === 'views' ? views : followers}
                onChange={(e) =>
                  calcMode === 'views'
                    ? setViews(Math.max(1, Number(e.target.value)))
                    : setFollowers(Math.max(1, Number(e.target.value)))
                }
                className="w-full h-9 px-3 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-canvas)] text-xs font-medium text-[var(--ink-primary)] tabular-nums focus:outline-none focus:border-[var(--accent-primary)]"
              />
            </div>
          </div>

          <p className="text-[11px] text-[var(--ink-muted)] leading-relaxed">
            {calcMode === 'views'
              ? t('page.engageCalc.formulaViews')
              : t('page.engageCalc.formulaFollowers')}
          </p>
        </div>

        {/* Results Summary Column (5 cols) */}
        <div className="lg:col-span-5 p-4 sm:p-5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-muted)] mb-1">
              {t('page.engageCalc.resultHeading')}
            </div>
            <div
              dir="ltr"
              className="text-3xl sm:text-4xl font-bold text-[var(--ink-primary)] tracking-tight tabular-nums"
            >
              {engagementRate}%
            </div>

            <div
              className={`mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${rating.bg} ${rating.color} ${rating.border}`}
            >
              <span>{rating.label}</span>
            </div>

            {/* Interaction Breakdown */}
            <div className="mt-4 pt-3.5 border-t border-[var(--border-subtle)] space-y-2 text-xs tabular-nums">
              <div className="flex justify-between text-[var(--ink-secondary)]">
                <span>{t('page.engageCalc.totalInteractions')}</span>
                <span dir="ltr" className="font-bold text-[var(--ink-primary)]">
                  {totalInteractions.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-[var(--ink-secondary)]">
                <span>{t('page.engageCalc.calcBasis')}</span>
                <span dir="ltr" className="font-bold text-[var(--ink-primary)]">
                  {calcMode === 'views'
                    ? t('page.engageCalc.basisViews', { count: views.toLocaleString() })
                    : t('page.engageCalc.basisFollowers', { count: followers.toLocaleString() })}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Benchmark Reference */}
          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] space-y-1.5 text-[11px] tabular-nums">
            <div className="font-bold text-[var(--ink-primary)] mb-1">{t('page.engageCalc.scaleHeading')}</div>
            <div className="flex justify-between text-[var(--ink-secondary)]">
              <span>&lt; 3%</span>
              <span>{t('page.engageCalc.scaleLow')}</span>
            </div>
            <div className="flex justify-between text-[var(--ink-secondary)]">
              <span>3% - 6%</span>
              <span className="text-[var(--accent-cyan-text)] font-semibold">
                {t('page.engageCalc.scaleHealthy')}
              </span>
            </div>
            <div className="flex justify-between text-[var(--ink-secondary)]">
              <span>&gt; 8%</span>
              <span className="text-[var(--accent-primary-text)] font-semibold">
                {t('page.engageCalc.scaleHigh')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Informational Guidance */}
      <section className="mt-7 pt-7 border-t border-[var(--border-subtle)] grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
          <BarChart className="w-4 h-4 text-[var(--accent-primary-text)] mb-1.5" />
          <h3 className="text-sm font-bold text-[var(--ink-primary)] mb-1">{t('page.engageCalc.card1Title')}</h3>
          <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
            {t('page.engageCalc.card1Desc')}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
          <CheckCircle2 className="w-4 h-4 text-[var(--accent-cyan-text)] mb-1.5" />
          <h3 className="text-sm font-bold text-[var(--ink-primary)] mb-1">{t('page.engageCalc.card2Title')}</h3>
          <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
            {t('page.engageCalc.card2Desc')}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
          <HelpCircle className="w-4 h-4 text-[var(--accent-primary-text)] mb-1.5" />
          <h3 className="text-sm font-bold text-[var(--ink-primary)] mb-1">{t('page.engageCalc.card3Title')}</h3>
          <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
            {t('page.engageCalc.card3Desc')}
          </p>
        </div>
      </section>
    </main>
  );
}