'use client';

import type { LucideIcon } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import TikTokProfileViewer from '@/components/TikTokProfileViewer';
import AdSlot from '@/components/AdSlot';
import { useI18n } from '@/lib/i18n/context';

interface FeatureCardConfig {
  titleKey: string;
  descKey: string;
  icon: LucideIcon;
  iconBgClass: string;
  iconTextClass: string;
  iconBorderClass?: string;
}

interface FaqConfig {
  qKey: string;
  aKey: string;
}

interface LocalizedToolViewProps {
  toolKey: 'videoDl' | 'mp3Dl' | 'viewer' | 'storyDl' | 'photoDl' | 'watermark';
  features: readonly [FeatureCardConfig, FeatureCardConfig, FeatureCardConfig];
  faqs: readonly FaqConfig[];
  showAdSlot?: boolean;
}

export default function LocalizedToolView({
  toolKey,
  features,
  faqs,
  showAdSlot = false,
}: LocalizedToolViewProps) {
  const { t } = useI18n();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: t(f.qKey),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(f.aKey),
      },
    })),
  };

  return (
    <main className="flex-1 w-full flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <TikTokProfileViewer
        initialUsername=""
        autoSearch={false}
        heroVariant="workbench"
        breadcrumbs={
          <Breadcrumbs items={[{ label: t(`page.${toolKey}.crumb`) }]} />
        }
        titleKey={`page.${toolKey}.title`}
        subtitleKey={`page.${toolKey}.subtitle`}
      >
        <div className="w-full flex flex-col">
          {/* Feature Highlights Band */}
          <section className="w-full bg-[var(--surface-canvas)] border-b border-[var(--border-subtle)] py-10 sm:py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="text-center max-w-xl mx-auto mb-7">
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink-primary)] tracking-tight">
                  {t(`page.${toolKey}.bandTitle`)}
                </h2>
                <p className="text-sm text-[var(--ink-secondary)] mt-1.5">
                  {t(`page.${toolKey}.bandSubtitle`)}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {features.map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)] flex flex-col gap-2.5"
                    >
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center border ${card.iconBgClass} ${card.iconTextClass} ${card.iconBorderClass || 'border-transparent'}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-bold text-[var(--ink-primary)]">
                        {t(card.titleKey)}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-[var(--ink-secondary)] leading-relaxed">
                        {t(card.descKey)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* FAQs Band */}
          <section className="w-full bg-[var(--surface-elevated)] py-10 sm:py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
              {showAdSlot && <AdSlot placement="header" />}

              <div>
                <div className="text-center max-w-xl mx-auto mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink-primary)] tracking-tight">
                    {t(`page.${toolKey}.faqHeading`)}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-[var(--surface-canvas)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)] flex flex-col gap-1.5"
                    >
                      <h3 className="text-sm font-bold text-[var(--ink-primary)]">
                        {t(faq.qKey)}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-[var(--ink-secondary)] leading-relaxed">
                        {t(faq.aKey)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </TikTokProfileViewer>
    </main>
  );
}