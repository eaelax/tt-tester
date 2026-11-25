export type LanguageCode =
  | 'en'
  | 'ar'
  | 'fr'
  | 'es'
  | 'de'
  | 'ru'
  | 'zh'
  | 'pt'
  | 'he'
  | 'hi';

export interface LanguageInfo {
  code: LanguageCode;
  shortCode: string;
  name: string;
  native: string;
  dir: 'ltr' | 'rtl';
  isDefault?: boolean;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', shortCode: 'EN', name: 'English', native: 'English', dir: 'ltr', isDefault: true },
  { code: 'ar', shortCode: 'AR', name: 'Arabic', native: 'العربية', dir: 'rtl' },
  { code: 'fr', shortCode: 'FR', name: 'French', native: 'Français', dir: 'ltr' },
  { code: 'es', shortCode: 'SP', name: 'Spanish', native: 'Español', dir: 'ltr' },
  { code: 'de', shortCode: 'DE', name: 'German', native: 'Deutsch', dir: 'ltr' },
  { code: 'ru', shortCode: 'RU', name: 'Russian', native: 'Русский', dir: 'ltr' },
  { code: 'zh', shortCode: 'CH', name: 'Chinese', native: '中文', dir: 'ltr' },
  { code: 'pt', shortCode: 'PT', name: 'Portuguese', native: 'Português', dir: 'ltr' },
  { code: 'he', shortCode: 'HE', name: 'Hebrew', native: 'עברית', dir: 'rtl' },
  { code: 'hi', shortCode: 'HI', name: 'Hindi', native: 'हिन्दी', dir: 'ltr' },
];

export const DEFAULT_LANGUAGE: LanguageCode = 'en';

export type TranslationMap = Record<string, string>;

export type LanguageDictionaries = Record<LanguageCode, TranslationMap>;

const NON_LOCALIZED_PREFIXES = ['/api', '/_next', '/assets', '/admintiktok'];

export function isSupportedLanguage(code: string): code is LanguageCode {
  return SUPPORTED_LANGUAGES.some((lang) => lang.code === code);
}

export function getLanguageInfo(code: LanguageCode): LanguageInfo {
  return (
    SUPPORTED_LANGUAGES.find((lang) => lang.code === code) ||
    SUPPORTED_LANGUAGES[0]
  );
}

export function extractLangFromPathname(pathname: string): LanguageCode | null {
  if (!pathname) return null;
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const firstSegment = normalized.split('/')[1]?.toLowerCase() || '';
  if (isSupportedLanguage(firstSegment)) {
    return firstSegment;
  }
  return null;
}

export function stripLangPrefix(pathname: string): string {
  if (!pathname) return '/';
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const segments = normalized.split('/');
  const firstSegment = segments[1]?.toLowerCase() || '';
  if (isSupportedLanguage(firstSegment)) {
    const rest = `/${segments.slice(2).join('/')}`;
    return rest === '/' ? '/' : rest.replace(/\/+$/, '') || '/';
  }
  return normalized === '/' ? '/' : normalized.replace(/\/+$/, '') || '/';
}

export function localizeHref(href: string, lang: LanguageCode): string {
  if (!href) return lang === DEFAULT_LANGUAGE ? '/' : `/${lang}`;
  if (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#')
  ) {
    return href;
  }

  const match = href.match(/^([^?#]*)(.*)$/);
  const rawPath = match?.[1] || '/';
  const suffix = match?.[2] || '';
  const cleanPath = stripLangPrefix(rawPath);

  if (
    NON_LOCALIZED_PREFIXES.some(
      (prefix) => cleanPath === prefix || cleanPath.startsWith(`${prefix}/`)
    )
  ) {
    return `${cleanPath}${suffix}`;
  }

  if (lang === DEFAULT_LANGUAGE) {
    return `${cleanPath}${suffix}`;
  }

  const prefixedPath = cleanPath === '/' ? `/${lang}` : `/${lang}${cleanPath}`;
  return `${prefixedPath}${suffix}`;
}