'use client';

import { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Sparkles,
  PieChart,
  HelpCircle,
  Award,
  Video,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import { useI18n } from '@/lib/i18n/context';

export default function MoneyCalculatorView() {
  const { t } = useI18n();
  const [followers, setFollowers] = useState<number>(50000);
  const [avgViews, setAvgViews] = useState<number>(25000);
  const [nicheCpm, setNicheCpm] = useState<number>(2.5);
  const [monthlyPosts, setMonthlyPosts] = useState<number>(12);

  // Creator Rewards Program Estimate (Qualified Views: 60%, RPM: nicheCpm)
  const qualifiedViewsPerPost = avgViews * 0.6;
  const rewardsMonthly = Math.round(
    ((qualifiedViewsPerPost * monthlyPosts) / 1000) * (nicheCpm * 0.35)
  );

  // Sponsored Post Deal Estimate (per post)
  const sponsorPerPostLow = Math.max(
    25,
    Math.round((followers / 1000) * 1.5 + (avgViews / 1000) * 2)
  );
  const sponsorPerPostHigh = Math.max(
    50,
    Math.round((followers / 1000) * 4.0 + (avgViews / 1000) * 5)
  );

  // Live Gifts & Affiliate Estimate
  const liveAffiliateMonthly = Math.round((followers / 1000) * 8 + (avgViews / 1000) * 3);

  // Total Estimated Monthly Earnings
  const totalMonthlyLow = rewardsMonthly + sponsorPerPostLow * 2 + liveAffiliateMonthly;
  const totalMonthlyHigh = rewardsMonthly + sponsorPerPostHigh * 4 + liveAffiliateMonthly * 2;

  return (
    <main className="flex-1 max-w-[980px] w-full mx-auto px-4 sm:px-6 py-5 sm:py-7">
      <Breadcrumbs items={[{ label: t('page.moneyCalc.crumb') }]} />
      <AdSlot placement="header" />

      {/* Compact Hero Header */}
      <div className="text-center max-w-xl mx-auto mb-5">
        <h1 className="text-[length:var(--h1-size)] font-bold text-[var(--ink-primary)] tracking-tight leading-tight">
          {t('page.moneyCalc.title')}
        </h1>
        <p className="text-xs sm:text-sm text-[var(--ink-secondary)] mt-1.5 leading-relaxed">
          {t('page.moneyCalc.subtitle')}
        </p>
      </div>

      {/* Interactive Calculator Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 p-4 sm:p-5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-4">
          <h2 className="text-sm font-bold text-[var(--ink-primary)] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--accent-cyan-text)]" />
            <span>{t('page.moneyCalc.inputHeading')}</span>
          </h2>

          {/* Followers Slider */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-[var(--ink-primary)]">{t('page.moneyCalc.totalFollowers')}</span>
              <span dir="ltr" className="font-mono text-[var(--accent-cyan-text)] tabular-nums">
                {followers.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="2000000"
              step="5000"
              aria-label={t('page.moneyCalc.totalFollowers')}
              value={followers}
              onChange={(e) => setFollowers(Number(e.target.value))}
              className="w-full h-2 bg-[var(--surface-sunken)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-cyan)]"
            />
            <div className="flex justify-between text-[10px] text-[var(--ink-muted)] mt-1 tabular-nums">
              <span>1K</span>
              <span>500K</span>
              <span>1M</span>
              <span>2M+</span>
            </div>
          </div>

          {/* Average Views Slider */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-[var(--ink-primary)]">{t('page.moneyCalc.avgViews')}</span>
              <span dir="ltr" className="font-mono text-[var(--accent-primary-text)] tabular-nums">
                {avgViews.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="1000000"
              step="2500"
              aria-label={t('page.moneyCalc.avgViews')}
              value={avgViews}
              onChange={(e) => setAvgViews(Number(e.target.value))}
              className="w-full h-2 bg-[var(--surface-sunken)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-primary)]"
            />
            <div className="flex justify-between text-[10px] text-[var(--ink-muted)] mt-1 tabular-nums">
              <span>500</span>
              <span>100K</span>
              <span>500K</span>
              <span>1M+</span>
            </div>
          </div>

          {/* Monthly Posts Slider */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-[var(--ink-primary)]">{t('page.moneyCalc.monthlyUploads')}</span>
              <span dir="ltr" className="font-mono text-[var(--ink-primary)] tabular-nums">
                {t('page.moneyCalc.videosUnit', { count: monthlyPosts })}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="60"
              step="1"
              aria-label={t('page.moneyCalc.monthlyUploads')}
              value={monthlyPosts}
              onChange={(e) => setMonthlyPosts(Number(e.target.value))}
              className="w-full h-2 bg-[var(--surface-sunken)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-dark)]"
            />
          </div>

          {/* Content Category Niche */}
          <div>
            <label
              htmlFor="niche-selector"
              className="block text-xs font-bold text-[var(--ink-primary)] mb-1"
            >
              {t('page.moneyCalc.nicheLabel')}
            </label>
            <select
              id="niche-selector"
              value={nicheCpm}
              onChange={(e) => setNicheCpm(Number(e.target.value))}
              className="w-full h-9 px-3 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-canvas)] text-xs font-medium text-[var(--ink-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
            >
              <option value={4.5}>{t('page.moneyCalc.niche1')}</option>
              <option value={3.5}>{t('page.moneyCalc.niche2')}</option>
              <option value={2.8}>{t('page.moneyCalc.niche3')}</option>
              <option value={2.2}>{t('page.moneyCalc.niche4')}</option>
              <option value={1.5}>{t('page.moneyCalc.niche5')}</option>
            </select>
          </div>
        </div>

        {/* Results Summary Column (5 cols) */}
        <div className="lg:col-span-5 p-4 sm:p-5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-muted)] mb-1">
              {t('page.moneyCalc.projectedTitle')}
            </div>
            <div
              dir="ltr"
              className="text-2xl sm:text-3xl font-bold text-[var(--ink-primary)] tracking-tight tabular-nums"
            >
              ${totalMonthlyLow.toLocaleString()} - ${totalMonthlyHigh.toLocaleString()}
            </div>
            <p className="text-xs text-[var(--ink-secondary)] mt-1">
              {t('page.moneyCalc.projectedSub')}
            </p>

            {/* Breakdown List */}
            <div className="mt-4 pt-3.5 border-t border-[var(--border-subtle)] space-y-2.5 text-xs tabular-nums">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[var(--ink-secondary)]">
                  <Award className="w-3.5 h-3.5 text-[var(--accent-cyan-text)]" />
                  <span>{t('page.moneyCalc.sponsorPerPost')}</span>
                </span>
                <span dir="ltr" className="font-bold text-[var(--ink-primary)]">
                  ${sponsorPerPostLow.toLocaleString()} - ${sponsorPerPostHigh.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[var(--ink-secondary)]">
                  <Video className="w-3.5 h-3.5 text-[var(--accent-primary-text)]" />
                  <span>{t('page.moneyCalc.creatorRewards')}</span>
                </span>
                <span dir="ltr" className="font-bold text-[var(--ink-primary)]">
                  ~${rewardsMonthly.toLocaleString()}{t('page.moneyCalc.perMonth')}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[var(--ink-secondary)]">
                  <DollarSign className="w-3.5 h-3.5 text-[var(--accent-cyan-text)]" />
                  <span>{t('page.moneyCalc.liveAffiliate')}</span>
                </span>
                <span dir="ltr" className="font-bold text-[var(--ink-primary)]">
                  ~${liveAffiliateMonthly.toLocaleString()}{t('page.moneyCalc.perMonth')}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-[11px] text-[var(--ink-muted)] leading-relaxed">
            {t('page.moneyCalc.disclaimer')}
          </div>
        </div>
      </div>

      {/* Informational Guidance */}
      <section className="mt-7 pt-7 border-t border-[var(--border-subtle)] grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
          <TrendingUp className="w-4 h-4 text-[var(--accent-cyan-text)] mb-1.5" />
          <h3 className="text-sm font-bold text-[var(--ink-primary)] mb-1">{t('page.moneyCalc.card1Title')}</h3>
          <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
            {t('page.moneyCalc.card1Desc')}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
          <PieChart className="w-4 h-4 text-[var(--accent-primary-text)] mb-1.5" />
          <h3 className="text-sm font-bold text-[var(--ink-primary)] mb-1">{t('page.moneyCalc.card2Title')}</h3>
          <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
            {t('page.moneyCalc.card2Desc')}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)]">
          <HelpCircle className="w-4 h-4 text-[var(--accent-cyan-text)] mb-1.5" />
          <h3 className="text-sm font-bold text-[var(--ink-primary)] mb-1">{t('page.moneyCalc.card3Title')}</h3>
          <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
            {t('page.moneyCalc.card3Desc')}
          </p>
        </div>
      </section>
    </main>
  );
}