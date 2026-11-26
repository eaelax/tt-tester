'use client';

import { useState } from 'react';
import { Copy, Check, Sparkles, RefreshCw } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import { useI18n } from '@/lib/i18n/context';

const NICHES = ['Viral', 'Comedy', 'Food', 'Tech', 'Fitness', 'Dance'] as const;

const PRESET_TAGS: Record<string, string[]> = {
  Viral: ['#fyp', '#foryou', '#viral', '#trending', '#tiktok', '#explore', '#foryoupage'],
  Comedy: ['#funny', '#comedy', '#lol', '#humor', '#meme', '#sketch', '#relatable'],
  Food: ['#foodtiktok', '#recipe', '#easyrecipe', '#cheflife', '#foodie', '#delicious'],
  Tech: ['#techtok', '#techreview', '#gadgets', '#apple', '#ai', '#productivity'],
  Fitness: ['#gymtok', '#workout', '#fitnesstips', '#calisthenics', '#bodybuilding'],
  Dance: ['#dancetrend', '#dance', '#choreography', '#music', '#trendingdance'],
};

export default function CaptionGeneratorView() {
  const { t } = useI18n();
  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState<(typeof NICHES)[number]>('Viral');
  const [hookIndex, setHookIndex] = useState<number>(1);
  const [copied, setCopied] = useState(false);

  const generateNewHook = () => {
    setHookIndex((prev) => {
      let next = Math.floor(Math.random() * 8) + 1;
      if (next === prev) {
        next = (prev % 8) + 1;
      }
      return next;
    });
  };

  const generatedHook = t(`page.captionGen.hook${hookIndex}`);
  const currentTags = PRESET_TAGS[niche] || PRESET_TAGS.Viral;
  const trimmedTopic = topic.trim();
  const fullCaption = `${trimmedTopic ? `${trimmedTopic} - ` : ''}${generatedHook}\n\n${currentTags.join(' ')}`;

  const copyToClipboard = async () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(fullCaption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="flex-1 w-full flex flex-col">
      {/* Unified Gradient Header Band */}
      <section className="w-full hero-studio-backdrop border-b border-[var(--border-subtle)] -mt-16 pt-22 pb-8 sm:pt-26 sm:pb-10">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6">
          <Breadcrumbs items={[{ label: t('page.captionGen.crumb') }]} />

          <div className="text-center max-w-2xl mx-auto mt-3">
            <h1 className="text-[length:var(--h1-size)] font-bold text-[var(--ink-primary)] tracking-tight leading-tight">
              {t('page.captionGen.title')}
            </h1>
            <p className="text-xs sm:text-sm text-[var(--ink-secondary)] mt-2 leading-relaxed">
              {t('page.captionGen.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[980px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <AdSlot placement="header" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 my-4">
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-[var(--surface-elevated)] rounded-xl border border-[var(--border-subtle)] p-5 sm:p-6 space-y-4 shadow-[var(--shadow-card)]">
            <h2 className="text-sm sm:text-base font-bold text-[var(--ink-primary)] border-b border-[var(--border-subtle)] pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--accent-cyan-text)]" />
              <span>{t('page.captionGen.setupHeading')}</span>
            </h2>

            <div>
              <label
                htmlFor="caption-topic-input"
                className="text-xs font-bold text-[var(--ink-primary)] block mb-1.5"
              >
                {t('page.captionGen.topicLabel')}
              </label>
              <input
                id="caption-topic-input"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t('page.captionGen.topicPlaceholder')}
                className="w-full h-10 px-3.5 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-canvas)] text-xs text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)] focus:bg-[var(--surface-elevated)] focus:outline-none focus:border-[var(--accent-cyan)] focus:ring-2 focus:ring-[var(--accent-cyan)]/20 transition-colors"
              />
            </div>

            <div>
              <span className="text-xs font-bold text-[var(--ink-primary)] block mb-1.5">
                {t('page.captionGen.nicheLabel')}
              </span>
              <div className="grid grid-cols-3 gap-2">
                {NICHES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setNiche(cat)}
                    className={`h-9 px-3 rounded-lg text-xs font-bold transition-colors cursor-pointer border ${
                      niche === cat
                        ? 'bg-[var(--accent-cyan)] border-[var(--accent-cyan)] text-[var(--accent-contrast)] shadow-xs'
                        : 'bg-[var(--surface-canvas)] text-[var(--ink-primary)] border-[var(--border-subtle)] hover:bg-[var(--accent-cyan-soft)] hover:border-[var(--accent-cyan)]'
                    }`}
                  >
                    {t(`page.captionGen.niche.${cat}`)}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={generateNewHook}
              className="w-full h-10 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-canvas)] hover:bg-[var(--pastel-blue)] hover:border-[var(--accent-cyan)] text-[var(--ink-primary)] font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t('page.captionGen.newHookBtn')}</span>
            </button>
          </div>

          {/* Output Preview Column */}
          <div className="lg:col-span-6 bg-[var(--surface-elevated)] rounded-xl border border-[var(--border-subtle)] p-5 sm:p-6 flex flex-col justify-between gap-4 shadow-[var(--shadow-card)]">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)]">
                  {t('page.captionGen.outputHeading')}
                </span>
                <button
                  type="button"
                  onClick={() => void copyToClipboard()}
                  className="h-9 px-3.5 rounded-lg bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--accent-contrast)] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-current" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {copied
                      ? t('page.captionGen.copiedBtn')
                      : t('page.captionGen.copyBtn')}
                  </span>
                </button>
              </div>

              <div
                dir="ltr"
                className="p-4 rounded-xl bg-[var(--surface-canvas)] border border-[var(--border-subtle)] font-mono text-xs text-[var(--ink-primary)] whitespace-pre-wrap leading-relaxed select-all text-left"
              >
                {fullCaption}
              </div>

              {/* Hashtags list */}
              <div dir="ltr" className="mt-4 flex flex-wrap gap-1.5">
                {currentTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[var(--accent-cyan-soft)] text-[var(--accent-cyan-text)] font-bold border border-[var(--accent-cyan)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-[var(--ink-muted)] leading-relaxed">
              {t('page.captionGen.tipText')}
            </p>
          </div>
        </div>

        <AdSlot placement="footer" />
      </div>
    </main>
  );
}