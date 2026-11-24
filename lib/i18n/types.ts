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