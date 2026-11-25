'use client';

import { useI18n } from '@/lib/i18n/context';

interface ProfileFaqBandProps {
  username: string;
}

export default function ProfileFaqBand({ username }: ProfileFaqBandProps) {
  const { t } = useI18n();

  const faqs = [
    {
      q: t('page.profile.q1', { username }),
      a: t('page.profile.a1', { username }),
    },
    {
      q: t('page.profile.q2', { username }),
      a: t('page.profile.a2', { username }),
    },
    {
      q: t('page.profile.q3', { username }),
      a: t('page.profile.a3', { username }),
    },
  ];

  return (
    <section className="w-full bg-[var(--surface-sunken)] border-t border-[var(--border-subtle)] py-10 sm:py-12 mt-auto">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink-primary)] tracking-tight">
            {t('page.profile.faqHeading')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)] flex flex-col gap-1.5"
            >
              <h3 className="text-sm font-bold text-[var(--ink-primary)]">{faq.q}</h3>
              <p className="text-xs sm:text-[13px] text-[var(--ink-secondary)] leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}