'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, Check, Globe } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { stripLangPrefix } from '@/lib/i18n/types';
import { MotionDropdownPanel } from './MotionPrimitives';

const TOOL_ITEMS = [
  { href: '/tiktok-video-downloader', key: 'video' },
  { href: '/tiktok-mp3-downloader', key: 'mp3' },
  { href: '/tiktok-profile-viewer', key: 'viewer' },
  { href: '/tiktok-story-downloader', key: 'story' },
  { href: '/tiktok-photo-downloader', key: 'photo' },
  { href: '/tiktok-watermark-remover', key: 'watermark' },
] as const;

const SHORT_CODE_FALLBACK: Record<string, string> = {
  en: 'EN',
  ar: 'AR',
  fr: 'FR',
  es: 'SP',
  de: 'DE',
  ru: 'RU',
  zh: 'CH',
  pt: 'PT',
  he: 'HE',
  hi: 'HI',
};

export default function Navbar() {
  const { lang, languageInfo, languages, setLanguage, localizeHref, t } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const rawPathname = usePathname();
  const cleanPathname = stripLangPrefix(rawPathname || '/');

  const headerRef = useRef<HTMLElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const currentShortCode =
    ('shortCode' in languageInfo && typeof languageInfo.shortCode === 'string'
      ? languageInfo.shortCode
      : SHORT_CODE_FALLBACK[languageInfo.code]) ||
    languageInfo.code.toUpperCase();

  const closeAllDrawers = () => {
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
    setLangDropdownOpen(false);
  };

  const handleGoHome = () => {
    closeAllDrawers();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('tpv:reset-home'));
    }
  };

  useEffect(() => {
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
    setLangDropdownOpen(false);
  }, [rawPathname]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (toolsRef.current && !toolsRef.current.contains(target)) {
        setToolsDropdownOpen(false);
      }
      if (langRef.current && !langRef.current.contains(target)) {
        setLangDropdownOpen(false);
      }
      if (headerRef.current && !headerRef.current.contains(target)) {
        setMobileMenuOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setToolsDropdownOpen(false);
        setLangDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const navLinkClass = (active: boolean) =>
    `h-9 px-3.5 rounded-xl inline-flex items-center justify-center text-[13px] font-semibold transition-colors duration-150 cursor-pointer outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/15 ${
      active
        ? 'bg-slate-900/[0.08] text-[var(--ink-primary)]'
        : 'text-[var(--ink-primary)]/80 hover:bg-[var(--accent-primary)]/12 hover:text-[var(--accent-primary-text)]'
    }`;

  const isAboutActive =
    cleanPathname === '/about-us' ||
    cleanPathname === '/about-tiktok-profile-viewer';

  const hasMobileOverlay = mobileMenuOpen || langDropdownOpen;

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        isScrolled
          ? 'bg-[var(--surface-canvas)]/85 backdrop-blur-md border-b border-[var(--border-subtle)]/70 shadow-xs'
          : hasMobileOverlay
          ? 'bg-[var(--surface-elevated)]/95 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none border-b border-[var(--border-subtle)]/80 lg:border-transparent'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Mark */}
        <Link
          href={localizeHref('/')}
          onClick={handleGoHome}
          className="flex items-center gap-2.5 text-[var(--ink-primary)] select-none shrink-0 rounded-xl outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/15 group"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/aistudio/tik-profiles-viewer-logo_c4487561.png"
            alt={t('brand.name')}
            className="w-8 h-8 object-contain shrink-0"
          />
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-[var(--ink-primary)] leading-none">
              {t('brand.name')}
            </span>
            <span
              data-no-translate="true"
              className="text-[11px] text-[var(--ink-muted)] font-medium mt-1 leading-none"
            >
              TikProfilesViewer.com
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1.5 shrink-0">
          <Link
            href={localizeHref('/')}
            onClick={handleGoHome}
            className={navLinkClass(cleanPathname === '/')}
          >
            {t('nav.home')}
          </Link>

          <Link
            href={localizeHref('/about-us')}
            className={navLinkClass(isAboutActive)}
          >
            {t('nav.about')}
          </Link>

          <Link
            href={localizeHref('/how-to-use-tiktok-profile-viewer')}
            className={navLinkClass(cleanPathname === '/how-to-use-tiktok-profile-viewer')}
          >
            {t('nav.howToUse')}
          </Link>

          {/* Tools Dropdown */}
          <div className="relative" ref={toolsRef}>
            <button
              type="button"
              aria-expanded={toolsDropdownOpen}
              onClick={() => {
                setToolsDropdownOpen(!toolsDropdownOpen);
                setLangDropdownOpen(false);
              }}
              className={`h-9 px-3.5 rounded-xl inline-flex items-center justify-center gap-1.5 text-[13px] font-semibold transition-colors duration-150 cursor-pointer outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/15 ${
                toolsDropdownOpen
                  ? 'bg-[var(--accent-primary)]/12 text-[var(--accent-primary-text)]'
                  : 'text-[var(--ink-primary)]/80 hover:bg-[var(--accent-primary)]/12 hover:text-[var(--accent-primary-text)]'
              }`}
            >
              <span>{t('nav.tools')}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${
                  toolsDropdownOpen
                    ? 'rotate-180 text-[var(--accent-primary-text)]'
                    : 'text-[var(--ink-muted)]'
                }`}
              />
            </button>

            <MotionDropdownPanel
              isOpen={toolsDropdownOpen}
              className="absolute top-full end-0 mt-2 w-72 max-h-[420px] overflow-y-auto rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] shadow-[var(--shadow-workbench)] p-2 z-50 flex flex-col gap-0.5"
            >
              {TOOL_ITEMS.map((tool) => (
                <Link
                  key={tool.href}
                  href={localizeHref(tool.href)}
                  onClick={() => setToolsDropdownOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-[var(--pastel-blue)]/40 text-[var(--ink-primary)] transition-colors group"
                >
                  <div className="font-semibold text-xs group-hover:text-[var(--accent-primary-text)] transition-colors">
                    {t(`nav.tool.${tool.key}.label`)}
                  </div>
                  <div className="text-[11px] text-[var(--ink-muted)] mt-0.5">
                    {t(`nav.tool.${tool.key}.desc`)}
                  </div>
                </Link>
              ))}
            </MotionDropdownPanel>
          </div>

          <div className="w-px h-5 bg-[var(--border-strong)]/40 mx-1" />

          {/* Languages Button */}
          <div className="relative" ref={langRef}>
            <button
              type="button"
              aria-expanded={langDropdownOpen}
              aria-label={t('nav.selectLanguage')}
              onClick={() => {
                setLangDropdownOpen(!langDropdownOpen);
                setToolsDropdownOpen(false);
              }}
              className={`h-9 px-3.5 rounded-xl text-[13px] font-semibold border transition-colors duration-150 cursor-pointer inline-flex items-center justify-center gap-1.5 shadow-xs outline-none focus:outline-none focus-visible:outline-none ${
                langDropdownOpen
                  ? 'bg-slate-50 border-[var(--border-strong)] text-[var(--ink-primary)]'
                  : 'bg-white hover:bg-slate-50 border-[var(--border-subtle)] text-[var(--ink-primary)]'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-[var(--accent-cyan-text)] shrink-0" />
              <span className="font-semibold tracking-wide leading-none">
                {currentShortCode}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[var(--ink-muted)] transition-transform duration-150 ${
                  langDropdownOpen ? 'rotate-180 text-[var(--ink-primary)]' : ''
                }`}
              />
            </button>

            <MotionDropdownPanel
              isOpen={langDropdownOpen}
              className="absolute top-full end-0 mt-2 w-56 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] shadow-[var(--shadow-workbench)] p-2 z-50 flex flex-col gap-0.5"
            >
              {languages.map((item) => {
                const isSelected = lang === item.code;
                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      setLanguage(item.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 rounded-lg text-xs flex items-center justify-between text-start transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[var(--pastel-blue)] text-[var(--accent-cyan-text)] font-semibold'
                        : 'text-[var(--ink-secondary)] hover:bg-[var(--pastel-blue)]/35 hover:text-[var(--ink-primary)]'
                    }`}
                  >
                    <span>
                      {item.name}{' '}
                      <span className="text-[var(--ink-muted)] font-normal">
                        ({item.native})
                      </span>
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[var(--accent-cyan-text)]" />}
                  </button>
                );
              })}
            </MotionDropdownPanel>
          </div>
        </nav>

        {/* Mobile Actions */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            aria-label={t('nav.selectLanguage')}
            aria-expanded={langDropdownOpen}
            onClick={() => {
              setLangDropdownOpen(!langDropdownOpen);
              setMobileMenuOpen(false);
            }}
            className={`h-9 px-3 rounded-xl border text-[13px] font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-xs outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] ${
              langDropdownOpen
                ? 'bg-[var(--pastel-blue)] border-[var(--pastel-blue-border)] text-[var(--accent-cyan-text)]'
                : 'bg-white hover:bg-slate-50 border-[var(--border-subtle)] text-[var(--ink-primary)]'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-[var(--accent-cyan-text)] shrink-0" />
            <span className="leading-none">{currentShortCode}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[var(--ink-muted)] transition-transform duration-150 ${
                langDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              setLangDropdownOpen(false);
            }}
            className={`w-10 h-10 rounded-xl border transition-colors cursor-pointer flex items-center justify-center outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] ${
              mobileMenuOpen
                ? 'bg-[var(--accent-soft)] border-[var(--pastel-pink-border)] text-[var(--accent-primary-text)]'
                : 'bg-white/80 hover:bg-white border-[var(--border-subtle)] text-[var(--ink-primary)]'
            }`}
            aria-label={t('nav.toggleMenu')}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Overlay Backdrop */}
      {hasMobileOverlay && (
        <div
          aria-hidden="true"
          onClick={closeAllDrawers}
          className="lg:hidden fixed inset-0 top-16 z-40 bg-slate-950/25 backdrop-blur-[1px]"
        />
      )}

      {/* Floating Mobile Language Drawer */}
      <div className="lg:hidden absolute top-full inset-x-0 z-50 px-4 sm:px-6 pt-2 pointer-events-none">
        <MotionDropdownPanel
          isOpen={langDropdownOpen}
          className="pointer-events-auto max-w-lg mx-auto rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] shadow-[var(--shadow-workbench)] p-3.5 max-h-[calc(100dvh-5.5rem)] overflow-y-auto"
        >
          <p className="text-[11px] font-bold text-[var(--ink-muted)] uppercase tracking-wider px-1 mb-2.5">
            {t('nav.selectLanguage')}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((item) => {
              const isSelected = lang === item.code;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setLanguage(item.code);
                    setLangDropdownOpen(false);
                  }}
                  className={`min-h-[40px] px-3 py-2 rounded-xl text-xs text-start flex items-center justify-between gap-2 border cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[var(--pastel-blue)] border-[var(--pastel-blue-border)] text-[var(--accent-cyan-text)] font-semibold'
                      : 'bg-[var(--surface-canvas)] border-[var(--border-subtle)] text-[var(--ink-primary)] hover:bg-[var(--pastel-blue)]/30'
                  }`}
                >
                  <span className="truncate">
                    {item.name}{' '}
                    <span className="text-[var(--ink-muted)] font-normal">
                      ({item.native})
                    </span>
                  </span>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-[var(--accent-cyan-text)] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </MotionDropdownPanel>
      </div>

      {/* Floating Mobile Navigation Drawer */}
      <div className="lg:hidden absolute top-full inset-x-0 z-50 px-4 sm:px-6 pt-2 pointer-events-none">
        <MotionDropdownPanel
          isOpen={mobileMenuOpen}
          className="pointer-events-auto max-w-lg mx-auto rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] shadow-[var(--shadow-workbench)] p-3 flex flex-col gap-1 max-h-[calc(100dvh-5.5rem)] overflow-y-auto"
        >
          <Link
            href={localizeHref('/')}
            onClick={handleGoHome}
            className={`min-h-[42px] px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
              cleanPathname === '/'
                ? 'bg-[var(--accent-soft)] text-[var(--accent-primary-text)]'
                : 'text-[var(--ink-primary)] hover:bg-[var(--surface-canvas)]'
            }`}
          >
            <span>{t('nav.home')}</span>
          </Link>

          <Link
            href={localizeHref('/about-us')}
            onClick={() => setMobileMenuOpen(false)}
            className={`min-h-[42px] px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
              isAboutActive
                ? 'bg-[var(--accent-soft)] text-[var(--accent-primary-text)]'
                : 'text-[var(--ink-primary)] hover:bg-[var(--surface-canvas)]'
            }`}
          >
            <span>{t('nav.about')}</span>
          </Link>

          <Link
            href={localizeHref('/how-to-use-tiktok-profile-viewer')}
            onClick={() => setMobileMenuOpen(false)}
            className={`min-h-[42px] px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
              cleanPathname === '/how-to-use-tiktok-profile-viewer'
                ? 'bg-[var(--accent-soft)] text-[var(--accent-primary-text)]'
                : 'text-[var(--ink-primary)] hover:bg-[var(--surface-canvas)]'
            }`}
          >
            <span>{t('nav.howToUse')}</span>
          </Link>

          <div className="pt-2.5 mt-1.5 border-t border-[var(--border-subtle)]">
            <span className="text-[11px] font-bold text-[var(--ink-muted)] uppercase tracking-wider block px-3.5 mb-1.5">
              {t('nav.tools')}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {TOOL_ITEMS.map((tool) => {
                const isToolActive = cleanPathname === tool.href;
                return (
                  <Link
                    key={tool.href}
                    href={localizeHref(tool.href)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3.5 py-2.5 rounded-xl transition-colors flex flex-col gap-0.5 ${
                      isToolActive
                        ? 'bg-[var(--pastel-blue)] text-[var(--accent-cyan-text)]'
                        : 'text-[var(--ink-primary)] hover:bg-[var(--surface-canvas)]'
                    }`}
                  >
                    <span className="text-[13px] font-semibold leading-snug">
                      {t(`nav.tool.${tool.key}.label`)}
                    </span>
                    <span className="text-[11px] font-normal text-[var(--ink-muted)] leading-snug">
                      {t(`nav.tool.${tool.key}.desc`)}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </MotionDropdownPanel>
      </div>
    </header>
  );
}