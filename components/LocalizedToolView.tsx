'use client';

import {
  Film,
  Zap,
  Download,
  Volume2,
  Music,
  EyeOff,
  UserCheck,
  BarChart2,
  Clock,
  Layers,
  ShieldCheck,
  Image as ImageIcon,
  Eraser,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import TikTokProfileViewer from '@/components/TikTokProfileViewer';
import CreatorToolsSection from '@/components/CreatorToolsSection';
import AdSlot from '@/components/AdSlot';
import { useI18n } from '@/lib/i18n/context';

export type ToolKey =
  | 'videoDl'
  | 'mp3Dl'
  | 'viewer'
  | 'storyDl'
  | 'photoDl'
  | 'watermark';

export type ToolIconName =
  | 'film'
  | 'zap'
  | 'download'
  | 'volume2'
  | 'music'
  | 'eyeOff'
  | 'userCheck'
  | 'barChart2'
  | 'clock'
  | 'layers'
  | 'shieldCheck'
  | 'image'
  | 'eraser';

export interface ToolFeatureItem {
  readonly titleKey: string;
  readonly descKey: string;
  readonly iconName: ToolIconName;
  readonly iconBgClass: string;
  readonly iconTextClass: string;
  readonly iconBorderClass?: string;
}

export interface ToolFaqItem {
  readonly qKey: string;
  readonly aKey: string;
}

interface LocalizedToolViewProps {
  toolKey: ToolKey;
  features: readonly ToolFeatureItem[];
  faqs: readonly ToolFaqItem[];
  showAdSlot?: boolean;
}

function renderFeatureIcon(iconName: ToolIconName) {
  switch (iconName) {
    case 'film':
      return <Film className="w-4 h-4" aria-hidden="true" />;
    case 'zap':
      return <Zap className="w-4 h-4" aria-hidden="true" />;
    case 'download':
      return <Download className="w-4 h-4" aria-hidden="true" />;
    case 'volume2':
      return <Volume2 className="w-4 h-4" aria-hidden="true" />;
    case 'music':
      return <Music className="w-4 h-4" aria-hidden="true" />;
    case 'eyeOff':
      return <EyeOff className="w-4 h-4" aria-hidden="true" />;
    case 'userCheck':
      return <UserCheck className="w-4 h-4" aria-hidden="true" />;
    case 'barChart2':
      return <BarChart2 className="w-4 h-4" aria-hidden="true" />;
    case 'clock':
      return <Clock className="w-4 h-4" aria-hidden="true" />;
    case 'layers':
      return <Layers className="w-4 h-4" aria-hidden="true" />;
    case 'shieldCheck':
      return <ShieldCheck className="w-4 h-4" aria-hidden="true" />;
    case 'image':
      return <ImageIcon className="w-4 h-4" aria-hidden="true" />;
    case 'eraser':
      return <Eraser className="w-4 h-4" aria-hidden="true" />;
  }
}

export default function LocalizedToolView({
  toolKey,
  features,
  faqs,
  showAdSlot = false,
}: LocalizedToolViewProps) {
  const { lang, t } = useI18n();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: t(faq.qKey),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(faq.aKey),
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
        titleKey={`page.${toolKey}.title`}
        subtitleKey={`page.${toolKey}.subtitle`}
        title={t(`page.${toolKey}.title`)}
        subtitle={t(`page.${toolKey}.subtitle`)}
        breadcrumbs={
          <Breadcrumbs items={[{ label: t(`page.${toolKey}.crumb`) }]} />
        }
      >
        <div className="w-full flex flex-col">
          {/* Band 1: Key Features */}
          <section className="w-full bg-[var(--surface-sunken)] border-b border-[var(--border-subtle)] py-10 sm:py-12">
            <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
              <div className="text-center max-w-2xl mx-auto mb-7">
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink-primary)] tracking-tight">
                  {t(`page.${toolKey}.bandTitle`)}
                </h2>
                <p className="text-sm text-[var(--ink-secondary)] mt-1.5 leading-relaxed">
                  {t(`page.${toolKey}.bandSubtitle`)}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {features.map((feature) => (
                  <div
                    key={feature.titleKey}
                    className="p-5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)] flex flex-col gap-2.5"
                  >
                    <div
                      className={`w-9 h-9 rounded-lg border flex items-center justify-center ${
                        feature.iconBgClass
                      } ${feature.iconTextClass} ${
                        feature.iconBorderClass || 'border-transparent'
                      }`}
                    >
                      {renderFeatureIcon(feature.iconName)}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[var(--ink-primary)]">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[var(--ink-secondary)] leading-relaxed">
                      {t(feature.descKey)}
                    </p>
                  </div>
                ))}
              </div>

              {showAdSlot && (
                <div className="mt-6">
                  <AdSlot placement="footer" />
                </div>
              )}
            </div>
          </section>

          {/* Band 2: Localized FAQs */}
          {faqs.length > 0 && (
            <section className="w-full bg-[var(--surface-elevated)] border-b border-[var(--border-subtle)] py-10 sm:py-12">
              <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
                <div className="text-center max-w-xl mx-auto mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink-primary)] tracking-tight">
                    {t(`page.${toolKey}.faqHeading`)}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {faqs.map((faq) => (
                    <div
                      key={faq.qKey}
                      className="p-5 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)] flex flex-col gap-1.5"
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
            </section>
          )}

          {/* Band 3: Internal Linking to All Creator Tools */}
          <section className="w-full bg-[var(--surface-canvas)] py-10 sm:py-12">
            <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
              <CreatorToolsSection />
            </div>
          </section>
        </div>
      </TikTokProfileViewer>
    </main>
  );
}