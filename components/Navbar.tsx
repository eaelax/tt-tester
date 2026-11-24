'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, Check, Globe } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { MotionDropdownPanel, MotionCollapse } from './MotionPrimitives';

const TOOL_ITEMS = [
  { href: '/tiktok-video-downloader', key: 'video' },
  { href: '/tiktok-mp3-downloader', key: 'mp3' },
  { href: '/tiktok-profile-viewer', key: 'viewer' },
  { href: '/tiktok-story-downloader', key: 'story' },
  { href: '/tiktok-photo-downloader', key: 'photo' },
  { href: '/tiktok-watermark-remover', key: 'watermark' },
] as const;

export default function Navbar() {
  const { lang, languageInfo, languages, setLanguage, t } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();

  const toolsRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const handleGoHome = () => {
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
    setLangDropdownOpen(false);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('tpv:reset-home'));
    }
  };

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
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
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
    `relative h-9 px-3 inline-flex items-center text-[13px] font-semibold transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] rounded-md after:content-[''] after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:rounded-full after:bg-[var(--accent-primary)] after:transition-transform after:duration-200 after:origin-center ${
      active
        ? 'text-[var(--accent-primary-text)] after:scale-x-100'
        : 'text-[var(--ink-primary)]/85 hover:text-[var(--accent-primary-text)] after:scale-x-0 hover:after:scale-x-100'
    }`;

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-[var(--surface-elevated)]/95 backdrop-blur-md border-b border-[var(--border-subtle)] shadow-[0_8px_24px_-8px_rgba(15,23,42,0.12)]'
          : 'bg-gradient-to-b from-white/75 via-white/50 to-white/20 backdrop-blur-md border-b border-slate-900/[0.05] shadow-[0_8px_24px_-8px_rgba(15,23,42,0.09)]'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Mark */}
        <Link
          href="/"
          onClick={handleGoHome}
          className="flex items-center gap-2.5 text-[var(--ink-primary)] select-none shrink-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] group"
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
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-2 shrink-0">
          <Link href="/" onClick={handleGoHome} className={navLinkClass(pathname === '/')}>
            {t('nav.home')}
          </Link>

          <Link
            href="/about-tiktok-profile-viewer"
            className={navLinkClass(pathname === '/about-tiktok-profile-viewer')}
          >
            {t('nav.about')}
          </Link>

          <Link
            href="/how-to-use-tiktok-profile-viewer"
            className={navLinkClass(pathname === '/how-to-use-tiktok-profile-viewer')}
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
              className={`relative h-9 text-[13px] font-semibold px-3 rounded-md flex items-center gap-1.5 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] after:content-[''] after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:rounded-full after:bg-[var(--accent-primary)] after:transition-transform after:duration-200 after:origin-center ${
                toolsDropdownOpen
                  ? 'text-[var(--accent-primary-text)] after:scale-x-100'
                  : 'text-[var(--ink-primary)]/85 hover:text-[var(--accent-primary-text)] after:scale-x-0 hover:after:scale-x-100'
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
                  href={tool.href}
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

          {/* Languages Button - Dark Container */}
          <div className="relative" ref={langRef}>
            <button
              type="button"
              aria-expanded={langDropdownOpen}
              aria-label={t('nav.selectLanguage')}
              onClick={() => {
                setLangDropdownOpen(!langDropdownOpen);
                setToolsDropdownOpen(false);
              }}
              className={`h-9 text-xs font-semibold px-3.5 rounded-full border transition-all cursor-pointer flex items-center gap-2 shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] ${
                langDropdownOpen
                  ? 'bg-[var(--accent-dark-hover)] border-slate-700 text-[var(--accent-contrast)] ring-2 ring-slate-900/15'
                  : 'bg-[var(--accent-dark)] hover:bg-[var(--accent-dark-hover)] border-slate-800 text-[var(--accent-contrast)]'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/15 text-sky-300 flex items-center justify-center shrink-0">
                <Globe className="w-3 h-3" />
              </span>
              <span className="font-semibold tracking-tight">{languageInfo.native}</span>
              <ChevronDown
                className={`w-3 h-3 text-white/75 transition-transform duration-150 ${
                  langDropdownOpen ? 'rotate-180 text-white' : ''
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
            onClick={() => {
              setLangDropdownOpen(!langDropdownOpen);
              setMobileMenuOpen(false);
            }}
            className="h-9 px-3 rounded-full bg-[var(--accent-dark)] hover:bg-[var(--accent-dark-hover)] border border-slate-800 text-xs font-semibold text-[var(--accent-contrast)] flex items-center gap-1.5 cursor-pointer transition-all shadow-xs"
          >
            <Globe className="w-3.5 h-3.5 text-sky-300" />
            <span>{languageInfo.native}</span>
            <ChevronDown className="w-3 h-3 text-white/75" />
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              setLangDropdownOpen(false);
            }}
            className="w-9 h-9 rounded-lg bg-transparent text-[var(--ink-primary)] hover:text-[var(--accent-primary-text)] transition-colors cursor-pointer flex items-center justify-center"
            aria-label={t('nav.toggleMenu')}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Language Drawer */}
      <MotionCollapse
        isOpen={langDropdownOpen}
        className="lg:hidden max-w-6xl mx-auto px-4 sm:px-6 pb-2"
      >
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] shadow-[var(--shadow-workbench)] px-4 py-3.5">
          <p className="text-[11px] font-semibold text-[var(--ink-muted)] uppercase tracking-wider mb-2.5">
            {t('nav.selectLanguage')}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => {
                  setLanguage(item.code);
                  setLangDropdownOpen(false);
                }}
                className={`h-9 px-3 rounded-lg text-xs text-start flex items-center justify-between border cursor-pointer transition-colors ${
                  lang === item.code
                    ? 'bg-[var(--pastel-blue)] border-[var(--pastel-blue-border)] text-[var(--accent-cyan-text)] font-semibold'
                    : 'bg-[var(--surface-canvas)] border-[var(--border-subtle)] text-[var(--ink-primary)] hover:bg-[var(--pastel-blue)]/30'
                }`}
              >
                <span className="truncate">{item.native}</span>
                {lang === item.code && (
                  <Check className="w-3.5 h-3.5 text-[var(--accent-cyan-text)] shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      </MotionCollapse>

      {/* Mobile Navigation Drawer */}
      <MotionCollapse
        isOpen={mobileMenuOpen}
        className="lg:hidden max-w-6xl mx-auto px-4 sm:px-6 pb-2"
      >
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] shadow-[var(--shadow-workbench)] px-4 py-3.5 flex flex-col gap-1 max-h-[75vh] overflow-y-auto">
          <Link
            href="/"
            onClick={handleGoHome}
            className="px-3.5 py-2.5 rounded-lg text-sm font-semibold text-[var(--ink-primary)] hover:bg-[var(--pastel-blue)]/40 transition-colors"
          >
            {t('nav.home')}
          </Link>
          <Link
            href="/about-tiktok-profile-viewer"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3.5 py-2.5 rounded-lg text-sm font-semibold text-[var(--ink-primary)] hover:bg-[var(--pastel-blue)]/40 transition-colors"
          >
            {t('nav.about')}
          </Link>
          <Link
            href="/how-to-use-tiktok-profile-viewer"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3.5 py-2.5 rounded-lg text-sm font-semibold text-[var(--ink-primary)] hover:bg-[var(--pastel-blue)]/40 transition-colors"
          >
            {t('nav.howToUse')}
          </Link>

          <div className="pt-2.5 mt-1 border-t border-[var(--border-subtle)]">
            <span className="text-[11px] font-semibold text-[var(--ink-muted)] uppercase tracking-wider block px-3.5 mb-1.5">
              {t('nav.tools')}
            </span>
            <div className="flex flex-col gap-0.5">
              {TOOL_ITEMS.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-2 rounded-lg text-xs font-medium text-[var(--ink-primary)] hover:bg-[var(--pastel-blue)]/40 transition-colors flex items-center justify-between gap-2"
                >
                  <span>{t(`nav.tool.${tool.key}.label`)}</span>
                  <span className="text-[11px] font-normal text-[var(--ink-muted)] truncate">
                    {t(`nav.tool.${tool.key}.desc`)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </MotionCollapse>
    </header>
  );
}