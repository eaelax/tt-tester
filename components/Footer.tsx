// File: components/Footer.tsx
'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import type { LanguageCode } from '@/lib/i18n/types';

const SITEMAP_LABELS: Record<LanguageCode, string> = {
  en: 'HTML Sitemap',
  ar: 'خريطة الموقع',
  fr: 'Plan du site',
  es: 'Mapa del sitio',
  de: 'HTML-Sitemap',
  ru: 'Карта сайта',
  zh: '网站地图',
  pt: 'Mapa do site',
  he: 'מפת אתר',
  hi: 'साइटमैप',
};

export default function Footer() {
  const { lang, t, localizeHref } = useI18n();
  const sitemapLabel = SITEMAP_LABELS[lang] || SITEMAP_LABELS.en;

  const handleGoHome = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('tpv:reset-home'));
    }
  };

  return (
    <footer className="w-full border-t border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-[var(--ink-secondary)] text-xs mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
        {/* Col 1: Brand & Overview */}
        <div className="lg:col-span-3 flex flex-col gap-3.5">
          <Link
            href={localizeHref('/')}
            onClick={handleGoHome}
            className="flex items-center gap-2.5 text-[var(--ink-primary)] hover:text-[var(--accent-cyan-text)] transition-colors duration-150 font-bold text-sm select-none w-fit rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/aistudio/tik-profiles-viewer-logo_c4487561.png"
              alt={t('brand.name')}
              width={32}
              height={32}
              className="w-8 h-8 object-contain shrink-0"
            />
            <span>{t('brand.name')}</span>
          </Link>

          <p className="text-[var(--ink-secondary)] leading-relaxed text-xs max-w-xs">
            {t('footer.tagline')}
          </p>

          <div className="flex flex-wrap items-center gap-2 text-xs pt-1 text-[var(--ink-primary)]">
            <Link
              href={localizeHref('/about-us')}
              className="px-3 py-1 rounded-lg bg-[var(--surface-canvas)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan-text)] font-semibold transition-colors duration-150"
            >
              {t('footer.aboutUs')}
            </Link>
            <Link
              href={localizeHref('/how-to-use-tiktok-profile-viewer')}
              className="px-3 py-1 rounded-lg bg-[var(--surface-canvas)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan-text)] font-semibold transition-colors duration-150"
            >
              {t('footer.howToUse')}
            </Link>
            <Link
              href={localizeHref('/creators')}
              className="px-3 py-1 rounded-lg bg-[var(--surface-canvas)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan-text)] font-semibold transition-colors duration-150"
            >
              {t('footer.topCreators')}
            </Link>
            <Link
              href={localizeHref('/sitemap')}
              className="px-3 py-1 rounded-lg bg-[var(--surface-canvas)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan-text)] font-semibold transition-colors duration-150"
            >
              {sitemapLabel}
            </Link>
          </div>
        </div>

        {/* Col 2: Free Downloader Tools */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-primary)]">
            {t('footer.freeTools')}
          </h4>
          <ul className="flex flex-col gap-2 text-xs text-[var(--ink-secondary)]">
            <li>
              <Link
                href={localizeHref('/tiktok-video-downloader')}
                className="hover:text-[var(--accent-cyan-text)] transition-colors duration-150"
              >
                {t('nav.tool.video.label')}
              </Link>
            </li>
            <li>
              <Link
                href={localizeHref('/tiktok-mp3-downloader')}
                className="hover:text-[var(--accent-cyan-text)] transition-colors duration-150"
              >
                {t('nav.tool.mp3.label')}
              </Link>
            </li>
            <li>
              <Link
                href={localizeHref('/tiktok-profile-viewer')}
                className="hover:text-[var(--accent-cyan-text)] transition-colors duration-150"
              >
                {t('nav.tool.viewer.label')}
              </Link>
            </li>
            <li>
              <Link
                href={localizeHref('/tiktok-story-downloader')}
                className="hover:text-[var(--accent-cyan-text)] transition-colors duration-150"
              >
                {t('nav.tool.story.label')}
              </Link>
            </li>
            <li>
              <Link
                href={localizeHref('/tiktok-photo-downloader')}
                className="hover:text-[var(--accent-cyan-text)] transition-colors duration-150"
              >
                {t('nav.tool.photo.label')}
              </Link>
            </li>
            <li>
              <Link
                href={localizeHref('/tiktok-watermark-remover')}
                className="hover:text-[var(--accent-cyan-text)] transition-colors duration-150"
              >
                {t('nav.tool.watermark.label')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Creator Analytics & Explore */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-primary)]">
            {t('footer.creatorTools')}
          </h4>
          <ul className="flex flex-col gap-2 text-xs text-[var(--ink-secondary)]">
            <li>
              <Link
                href={localizeHref('/tiktok-analytics')}
                className="hover:text-[var(--accent-cyan-text)] transition-colors duration-150"
              >
                {t('nav.tool.analytics.label')}
              </Link>
            </li>
            <li>
              <Link
                href={localizeHref('/tiktok-money-calculator')}
                className="hover:text-[var(--accent-cyan-text)] transition-colors duration-150"
              >
                {t('nav.tool.money.label')}
              </Link>
            </li>
            <li>
              <Link
                href={localizeHref('/tiktok-engagement-calculator')}
                className="hover:text-[var(--accent-cyan-text)] transition-colors duration-150"
              >
                {t('nav.tool.engage.label')}
              </Link>
            </li>
            <li>
              <Link
                href={localizeHref('/tiktok-caption-generator')}
                className="hover:text-[var(--accent-cyan-text)] transition-colors duration-150"
              >
                {t('nav.tool.caption.label')}
              </Link>
            </li>
            <li>
              <Link
                href={localizeHref('/creators')}
                className="hover:text-[var(--accent-cyan-text)] transition-colors duration-150"
              >
                {t('nav.creators')}
              </Link>
            </li>
            <li>
              <Link
                href={localizeHref('/categories')}
                className="hover:text-[var(--accent-cyan-text)] transition-colors duration-150"
              >
                {t('nav.categories')}
              </Link>
            </li>
            <li>
              <Link
                href={localizeHref('/sitemap')}
                className="hover:text-[var(--accent-cyan-text)] transition-colors duration-150"
              >
                {sitemapLabel}
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Legal & Policies */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-primary)]">
            {t('footer.legalHeading')}
          </h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-[var(--ink-secondary)]">
            <Link
              href={localizeHref('/terms-of-service')}
              className="hover:text-[var(--accent-cyan-text)] transition-colors duration-150 truncate"
            >
              {t('legal.nav.terms')}
            </Link>
            <Link
              href={localizeHref('/privacy-policy')}
              className="hover:text-[var(--accent-cyan-text)] transition-colors duration-150 truncate"
            >
              {t('legal.nav.privacy')}
            </Link>
            <Link
              href={localizeHref('/cookie-policy')}
              className="hover:text-[var(--accent-cyan-text)] transition-colors duration-150 truncate"
            >
              {t('legal.nav.cookies')}
            </Link>
            <Link
              href={localizeHref('/disclaimer')}
              className="hover:text-[var(--accent-cyan-text)] transition-colors duration-150 truncate"
            >
              {t('legal.nav.disclaimer')}
            </Link>
            <Link
              href={localizeHref('/legal-notice')}
              className="hover:text-[var(--accent-cyan-text)] transition-colors duration-150 truncate"
            >
              {t('legal.nav.notice')}
            </Link>
            <Link
              href={localizeHref('/copyright-policy')}
              className="hover:text-[var(--accent-cyan-text)] transition-colors duration-150 truncate"
            >
              {t('legal.nav.copyright')}
            </Link>
            <Link
              href={localizeHref('/tiktok-independence-disclaimer')}
              className="hover:text-[var(--accent-cyan-text)] transition-colors duration-150 truncate"
            >
              {t('legal.nav.independence')}
            </Link>
            <Link
              href={localizeHref('/public-content-policy')}
              className="hover:text-[var(--accent-cyan-text)] transition-colors duration-150 truncate"
            >
              {t('legal.nav.publicContent')}
            </Link>
            <Link
              href={localizeHref('/content-removal-policy')}
              className="hover:text-[var(--accent-cyan-text)] transition-colors duration-150 truncate"
            >
              {t('legal.nav.removal')}
            </Link>
            <Link
              href={localizeHref('/acceptable-use-policy')}
              className="hover:text-[var(--accent-cyan-text)] transition-colors duration-150 truncate"
            >
              {t('legal.nav.acceptableUse')}
            </Link>
            <Link
              href={localizeHref('/security-policy')}
              className="hover:text-[var(--accent-cyan-text)] transition-colors duration-150 truncate"
            >
              {t('legal.nav.security')}
            </Link>
            <Link
              href={localizeHref('/service-availability-policy')}
              className="hover:text-[var(--accent-cyan-text)] transition-colors duration-150 truncate"
            >
              {t('legal.nav.availability')}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Legal Strip */}
      <div className="border-t border-[var(--border-subtle)] bg-[var(--surface-canvas)] py-4 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] text-[var(--ink-muted)]">
          <p className="text-[var(--ink-primary)] font-semibold">
            © {new Date().getFullYear()} {t('footer.copyright')}
          </p>
          <p className="text-center md:text-end max-w-xl">
            {t('footer.disclaimer')}
          </p>
        </div>
      </div>
    </footer>
  );
}