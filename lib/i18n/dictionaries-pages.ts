import type { LanguageDictionaries } from './types';
import { EN_PAGES } from './pages-en';
import { AR_PAGES, FR_PAGES, ES_PAGES } from './pages-ar-fr-es';
import { DE_PAGES, RU_PAGES, ZH_PAGES } from './pages-de-ru-zh';
import { PT_PAGES, HE_PAGES, HI_PAGES } from './pages-pt-he-hi';

export const PAGE_DICTIONARIES: LanguageDictionaries = {
  en: EN_PAGES,
  ar: AR_PAGES,
  fr: FR_PAGES,
  es: ES_PAGES,
  de: DE_PAGES,
  ru: RU_PAGES,
  zh: ZH_PAGES,
  pt: PT_PAGES,
  he: HE_PAGES,
  hi: HI_PAGES,
};

export const PHRASE_TRANSLATIONS: LanguageDictionaries = {
  en: {},
  ar: {},
  fr: {},
  es: {},
  de: {},
  ru: {},
  zh: {},
  pt: {},
  he: {},
  hi: {},
};