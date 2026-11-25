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
  const firstSegment = pathname.split('/').filter(Boolean)[0]?.toLowerCase() || '';
  return isSupportedLanguage(firstSegment) ? firstSegment : null;
}

export function stripLangPrefix(pathname: string): string {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const segments = normalized.split('/').filter(Boolean);
  if (segments.length === 0) return '/';
  const first = segments[0].toLowerCase();
  if (isSupportedLanguage(first)) {
    const rest = segments.slice(1);
    return rest.length > 0 ? `/${rest.join('/')}` : '/';
  }
  return normalized;
}

const UNLOCALIZED_PREFIXES = ['/api', '/assets', '/admintiktok', '/_next'];

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

  const hashIndex = href.indexOf('#');
  const hashPart = hashIndex >= 0 ? href.slice(hashIndex) : '';
  const withoutHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href;

  const queryIndex = withoutHash.indexOf('?');
  const searchPart = queryIndex >= 0 ? withoutHash.slice(queryIndex) : '';
  const pathOnly = queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash;

  const basePath = stripLangPrefix(pathOnly || '/');

  if (UNLOCALIZED_PREFIXES.some((prefix) => basePath === prefix || basePath.startsWith(`${prefix}/`))) {
    return href;
  }

  const targetPath =
    lang === DEFAULT_LANGUAGE
      ? basePath
      : basePath === '/'
      ? `/${lang}`
      : `/${lang}${basePath}`;

  return `${targetPath}${searchPart}${hashPart}`;
}