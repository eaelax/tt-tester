'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  DEFAULT_LANGUAGE,
  LanguageCode,
  LanguageInfo,
  SUPPORTED_LANGUAGES,
  extractLangFromPathname,
  getLanguageInfo,
  isSupportedLanguage,
  localizeHref as buildLocalizedHref,
  stripLangPrefix,
} from './types';
import { UI_DICTIONARIES } from './dictionaries-ui';
import { PAGE_DICTIONARIES, PHRASE_TRANSLATIONS } from './dictionaries-pages';

const STORAGE_KEY = 'tpv_selected_language';
const LANG_CHANGE_EVENT = 'tpv:language-changed';

type InterpolationVars = Record<string, string | number>;

interface I18nContextValue {
  lang: LanguageCode;
  languageInfo: LanguageInfo;
  dir: 'ltr' | 'rtl';
  languages: LanguageInfo[];
  setLanguage: (code: LanguageCode) => void;
  localizeHref: (href: string) => string;
  t: (key: string, vars?: InterpolationVars) => string;
  translateText: (text: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const EN_VALUE_TO_KEY = new Map<string, string>();
for (const [k, v] of Object.entries(UI_DICTIONARIES.en)) {
  if (!EN_VALUE_TO_KEY.has(v)) {
    EN_VALUE_TO_KEY.set(v, k);
  }
}
for (const [k, v] of Object.entries(PAGE_DICTIONARIES.en)) {
  if (!EN_VALUE_TO_KEY.has(v)) {
    EN_VALUE_TO_KEY.set(v, k);
  }
}

function interpolate(template: string, vars?: InterpolationVars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, token: string) => {
    const val = vars[token];
    return val !== undefined && val !== null ? String(val) : `{${token}}`;
  });
}

function lookupKey(lang: LanguageCode, key: string): string | undefined {
  return (
    UI_DICTIONARIES[lang]?.[key] ??
    PAGE_DICTIONARIES[lang]?.[key] ??
    UI_DICTIONARIES.en[key] ??
    PAGE_DICTIONARIES.en[key]
  );
}

function lookupPhrase(lang: LanguageCode, rawText: string): string | undefined {
  if (lang === 'en') return undefined;
  const trimmed = rawText.trim();
  if (!trimmed) return undefined;

  const phraseMap = PHRASE_TRANSLATIONS[lang];
  if (phraseMap && phraseMap[trimmed]) {
    return phraseMap[trimmed];
  }

  const matchedKey = EN_VALUE_TO_KEY.get(trimmed);
  if (matchedKey) {
    return UI_DICTIONARIES[lang]?.[matchedKey] ?? PAGE_DICTIONARIES[lang]?.[matchedKey];
  }

  return undefined;
}

const ORIGINAL_NODE_TEXT = new WeakMap<Text, string>();

function shouldSkipElement(el: Element | null): boolean {
  if (!el) return true;
  const tag = el.tagName;
  if (
    tag === 'SCRIPT' ||
    tag === 'STYLE' ||
    tag === 'CODE' ||
    tag === 'PRE' ||
    tag === 'TEXTAREA' ||
    tag === 'INPUT' ||
    tag === 'NOSCRIPT'
  ) {
    return true;
  }
  if (el.closest('[data-no-translate="true"]')) {
    return true;
  }
  return false;
}

function applyAutoTranslationPass(lang: LanguageCode): void {
  if (typeof document === 'undefined') return;
  const containers = document.querySelectorAll('[data-auto-translate="true"]');
  if (!containers.length) return;

  containers.forEach((container) => {
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      const textNode = node as Text;
      const parentEl = textNode.parentElement;
      if (!shouldSkipElement(parentEl)) {
        let original = ORIGINAL_NODE_TEXT.get(textNode);
        if (original === undefined) {
          original = textNode.nodeValue ?? '';
          ORIGINAL_NODE_TEXT.set(textNode, original);
        }

        if (lang === 'en') {
          if (textNode.nodeValue !== original) {
            textNode.nodeValue = original;
          }
        } else {
          const trimmed = original.trim();
          if (trimmed && !trimmed.startsWith('@') && !trimmed.startsWith('http')) {
            const translated = lookupPhrase(lang, trimmed);
            if (translated) {
              const leading = original.match(/^\s*/)?.[0] ?? '';
              const trailing = original.match(/\s*$/)?.[0] ?? '';
              const nextValue = `${leading}${translated}${trailing}`;
              if (textNode.nodeValue !== nextValue) {
                textNode.nodeValue = nextValue;
              }
            }
          }
        }
      }
      node = walker.nextNode();
    }
  });
}

export function I18nProvider({
  children,
  initialLang = DEFAULT_LANGUAGE,
}: {
  children: React.ReactNode;
  initialLang?: LanguageCode;
}) {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const [initialPathname] = useState(pathname);
  const [manualOverride, setManualOverride] = useState<{
    lang: LanguageCode;
    pathname: string;
  } | null>(null);

  const urlLang = extractLangFromPathname(pathname);
  const lang: LanguageCode =
    manualOverride && manualOverride.pathname === pathname
      ? manualOverride.lang
      : urlLang ?? (pathname === initialPathname ? initialLang : DEFAULT_LANGUAGE);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleCustom = (e: Event) => {
      const custom = e as CustomEvent<{ lang?: string }>;
      if (custom.detail?.lang && isSupportedLanguage(custom.detail.lang)) {
        setManualOverride({
          lang: custom.detail.lang,
          pathname: window.location.pathname || '/',
        });
      }
    };

    window.addEventListener(LANG_CHANGE_EVENT, handleCustom);
    return () => {
      window.removeEventListener(LANG_CHANGE_EVENT, handleCustom);
    };
  }, []);

  const languageInfo = useMemo(() => getLanguageInfo(lang), [lang]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = languageInfo.code;
    document.documentElement.dir = languageInfo.dir;

    applyAutoTranslationPass(lang);

    if (lang === 'en') return;

    const observer = new MutationObserver(() => {
      applyAutoTranslationPass(lang);
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [lang, languageInfo]);

  const setLanguage = useCallback(
    (code: LanguageCode) => {
      setManualOverride({ lang: code, pathname });
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, code);
          window.dispatchEvent(
            new CustomEvent(LANG_CHANGE_EVENT, { detail: { lang: code } })
          );
        } catch {
          // Ignore storage write errors in restricted browsing modes
        }
      }

      const stripped = stripLangPrefix(pathname);
      const targetPath = buildLocalizedHref(stripped, code);
      const search = typeof window !== 'undefined' ? window.location.search : '';
      const nextUrl = `${targetPath}${search}`;

      if (nextUrl !== `${pathname}${search}`) {
        router.push(nextUrl);
      }
    },
    [pathname, router]
  );

  const localizeHref = useCallback(
    (href: string) => buildLocalizedHref(href, lang),
    [lang]
  );

  const t = useCallback(
    (key: string, vars?: InterpolationVars): string => {
      const resolved = lookupKey(lang, key) ?? key;
      return interpolate(resolved, vars);
    },
    [lang]
  );

  const translateText = useCallback(
    (text: string): string => {
      if (lang === 'en' || !text) return text;
      return lookupPhrase(lang, text) ?? text;
    },
    [lang]
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      languageInfo,
      dir: languageInfo.dir,
      languages: SUPPORTED_LANGUAGES,
      setLanguage,
      localizeHref,
      t,
      translateText,
    }),
    [lang, languageInfo, setLanguage, localizeHref, t, translateText]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (ctx) return ctx;

  return {
    lang: DEFAULT_LANGUAGE,
    languageInfo: SUPPORTED_LANGUAGES[0],
    dir: 'ltr',
    languages: SUPPORTED_LANGUAGES,
    setLanguage: () => {},
    localizeHref: (href: string) => href,
    t: (key: string, vars?: InterpolationVars) => {
      const resolved = lookupKey(DEFAULT_LANGUAGE, key) ?? key;
      return interpolate(resolved, vars);
    },
    translateText: (text: string) => text,
  };
}