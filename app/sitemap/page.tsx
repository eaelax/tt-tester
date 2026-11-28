// File: app/sitemap/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { CATEGORIES, CREATORS } from '@/lib/creators-data';
import { UI_DICTIONARIES } from '@/lib/i18n/dictionaries-ui';
import { PAGE_DICTIONARIES } from '@/lib/i18n/dictionaries-pages';
import { CATEGORY_NICHE_KEY_MAP } from '@/lib/i18n/category-faqs';
import {
  SUPPORTED_LANGUAGES,
  localizeHref,
  type LanguageCode,
} from '@/lib/i18n/types';
import {
  SITE_LAST_UPDATED_ISO,
  buildLocalizedMetadata,
  getRequestLanguage,
} from '@/lib/seo/metadata';
import { getBaseUrl } from '@/lib/seo/sitemap';

interface SitemapLabels {
  pageTitle: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  lastUpdated: string;
  coreHeading: string;
  toolsHeading: string;
  categoriesHeading: string;
  creatorsHeading: string;
  legalHeading: string;
  languagesHeading: string;
  xmlSitemapLabel: string;
}

const SITEMAP_COPY: Record<LanguageCode, SitemapLabels> = {
  en: {
    pageTitle: 'HTML Sitemap',
    metaTitle: 'HTML Sitemap',
    metaDescription:
      'Browse every public tool, category, creator profile, and policy page on Tik Profiles Viewer.',
    intro:
      'Complete directory of free TikTok viewer tools, creator categories, curated public profiles, and legal policies available on TikProfilesViewer.com.',
    lastUpdated: 'Last Updated',
    coreHeading: 'Core Pages',
    toolsHeading: 'Free Downloader & Creator Tools',
    categoriesHeading: 'Creator Categories',
    creatorsHeading: 'Curated Public Creators',
    legalHeading: 'Legal & Policy Documents',
    languagesHeading: 'Available Languages',
    xmlSitemapLabel: 'XML Sitemap Index',
  },
  ar: {
    pageTitle: 'خريطة الموقع',
    metaTitle: 'خريطة الموقع',
    metaDescription:
      'تصفح جميع الأدوات المجانية والتصنيفات وحسابات المبدعين والوثائق القانونية على عارض حسابات تيك توك.',
    intro:
      'دليل شامل لجميع أدوات عرض وتنزيل تيك توك المجانية، وتصنيفات المبدعين، والحسابات العامة، وصفحات السياسات على TikProfilesViewer.com.',
    lastUpdated: 'آخر تحديث',
    coreHeading: 'الصفحات الرئيسية',
    toolsHeading: 'أدوات التنزيل والمبدعين المجانية',
    categoriesHeading: 'تصنيفات المبدعين',
    creatorsHeading: 'حسابات المبدعين العامة',
    legalHeading: 'الوثائق القانونية والسياسات',
    languagesHeading: 'اللغات المتاحة',
    xmlSitemapLabel: 'فهرس خريطة XML',
  },
  fr: {
    pageTitle: 'Plan du Site HTML',
    metaTitle: 'Plan du Site HTML',
    metaDescription:
      'Parcourez tous les outils gratuits, catégories, profils de créateurs et pages légales sur Tik Profiles Viewer.',
    intro:
      'Répertoire complet des outils TikTok gratuits, catégories de créateurs, profils publics sélectionnés et documents légaux sur TikProfilesViewer.com.',
    lastUpdated: 'Dernière mise à jour',
    coreHeading: 'Pages Principales',
    toolsHeading: 'Outils Gratuits de Téléchargement & Créateurs',
    categoriesHeading: 'Catégories de Créateurs',
    creatorsHeading: 'Créateurs Publics Sélectionnés',
    legalHeading: 'Documents Légaux & Politiques',
    languagesHeading: 'Langues Disponibles',
    xmlSitemapLabel: 'Index Sitemap XML',
  },
  es: {
    pageTitle: 'Mapa del Sitio HTML',
    metaTitle: 'Mapa del Sitio HTML',
    metaDescription:
      'Explora todas las herramientas gratuitas, categorías, perfiles de creadores y páginas legales en Tik Profiles Viewer.',
    intro:
      'Directorio completo de herramientas gratuitas para TikTok, categorías de creadores, perfiles públicos seleccionados y políticas legales en TikProfilesViewer.com.',
    lastUpdated: 'Última actualización',
    coreHeading: 'Páginas Principales',
    toolsHeading: 'Herramientas Gratuitas de Descarga y Creadores',
    categoriesHeading: 'Categorías de Creadores',
    creatorsHeading: 'Creadores Públicos Destacados',
    legalHeading: 'Documentos Legales y Políticas',
    languagesHeading: 'Idiomas Disponibles',
    xmlSitemapLabel: 'Índice Sitemap XML',
  },
  de: {
    pageTitle: 'HTML-Sitemap',
    metaTitle: 'HTML-Sitemap',
    metaDescription:
      'Durchsuchen Sie alle kostenlosen Tools, Kategorien, Creator-Profile und Rechtstexte auf Tik Profiles Viewer.',
    intro:
      'Vollständiges Verzeichnis aller kostenlosen TikTok-Tools, Creator-Kategorien, öffentlichen Profile und Richtlinien auf TikProfilesViewer.com.',
    lastUpdated: 'Zuletzt aktualisiert',
    coreHeading: 'Hauptseiten',
    toolsHeading: 'Kostenlose Downloader- & Creator-Tools',
    categoriesHeading: 'Creator-Kategorien',
    creatorsHeading: 'Ausgewählte Öffentliche Creator',
    legalHeading: 'Rechtliche Dokumente & Richtlinien',
    languagesHeading: 'Verfügbare Sprachen',
    xmlSitemapLabel: 'XML-Sitemap-Index',
  },
  ru: {
    pageTitle: 'HTML-карта сайта',
    metaTitle: 'HTML-карта сайта',
    metaDescription:
      'Полный список бесплатных инструментов, категорий, профилей авторов и правовых страниц на Tik Profiles Viewer.',
    intro:
      'Полный каталог бесплатных инструментов TikTok, категорий авторов, публичных профилей и правовых документов на TikProfilesViewer.com.',
    lastUpdated: 'Последнее обновление',
    coreHeading: 'Основные страницы',
    toolsHeading: 'Бесплатные инструменты загрузки и аналитики',
    categoriesHeading: 'Категории авторов',
    creatorsHeading: 'Популярные публичные авторы',
    legalHeading: 'Правовые документы и правила',
    languagesHeading: 'Доступные языки',
    xmlSitemapLabel: 'Индекс XML Sitemap',
  },
  zh: {
    pageTitle: 'HTML 网站地图',
    metaTitle: 'HTML 网站地图',
    metaDescription:
      '浏览 Tik Profiles Viewer 上的所有免费工具、分类目录、创作者主页和法律政策页面。',
    intro:
      '完整列出 TikProfilesViewer.com 上的免费 TikTok 工具、创作者分类、精选公开主页及法律条款页面。',
    lastUpdated: '最近更新',
    coreHeading: '核心页面',
    toolsHeading: '免费下载与创作者工具',
    categoriesHeading: '创作者分类',
    creatorsHeading: '精选公开创作者',
    legalHeading: '法律与政策文件',
    languagesHeading: '支持语言',
    xmlSitemapLabel: 'XML 网站地图索引',
  },
  pt: {
    pageTitle: 'Mapa do Site HTML',
    metaTitle: 'Mapa do Site HTML',
    metaDescription:
      'Navegue por todas as ferramentas gratuitas, categorias, perfis de criadores e páginas legais no Tik Profiles Viewer.',
    intro:
      'Diretório completo de ferramentas gratuitas do TikTok, categorias de criadores, perfis públicos selecionados e políticas legais em TikProfilesViewer.com.',
    lastUpdated: 'Última atualização',
    coreHeading: 'Páginas Principais',
    toolsHeading: 'Ferramentas Gratuitas de Download e Criadores',
    categoriesHeading: 'Categorias de Criadores',
    creatorsHeading: 'Criadores Públicos em Destaque',
    legalHeading: 'Documentos Legais e Políticas',
    languagesHeading: 'Idiomas Disponíveis',
    xmlSitemapLabel: 'Índice Sitemap XML',
  },
  he: {
    pageTitle: 'מפת אתר HTML',
    metaTitle: 'מפת אתר HTML',
    metaDescription:
      'עיין בכל הכלים החינמיים, הקטגוריות, פרופילי היוצרים ודפי המדיניות באתר Tik Profiles Viewer.',
    intro:
      'מדריך מלא של כל כלי ההורדה והצפייה החינמיים, קטגוריות היוצרים, הפרופילים הציבוריים והמסמכים המשפטיים ב-TikProfilesViewer.com.',
    lastUpdated: 'עודכן לאחרונה',
    coreHeading: 'דפים מרכזיים',
    toolsHeading: 'כלי הורדה ויוצרים חינמיים',
    categoriesHeading: 'קטגוריות יוצרים',
    creatorsHeading: 'יוצרים ציבוריים נבחרים',
    legalHeading: 'מסמכים משפטיים ומדיניות',
    languagesHeading: 'שפות זמינות',
    xmlSitemapLabel: 'אינדקס Sitemap XML',
  },
  hi: {
    pageTitle: 'HTML साइटमैप',
    metaTitle: 'HTML साइटमैप',
    metaDescription:
      'Tik Profiles Viewer पर सभी मुफ्त टूल्स, श्रेणियां, क्रिएटर प्रोफाइल और कानूनी नीतियां देखें।',
    intro:
      'TikProfilesViewer.com पर उपलब्ध सभी मुफ्त TikTok टूल्स, क्रिएटर श्रेणियों, पब्लिक प्रोफाइल और कानूनी दस्तावेज़ों की पूरी सूची।',
    lastUpdated: 'अंतिम अपडेट',
    coreHeading: 'मुख्य पेज',
    toolsHeading: 'मुफ्त डाउनलोडर और क्रिएटर टूल्स',
    categoriesHeading: 'क्रिएटर श्रेणियां',
    creatorsHeading: 'प्रमुख पब्लिक क्रिएटर्स',
    legalHeading: 'कानूनी और नीति दस्तावेज़',
    languagesHeading: 'उपलब्ध भाषाएं',
    xmlSitemapLabel: 'XML साइटमैप इंडेक्स',
  },
};

const TOOL_LINKS = [
  { href: '/tiktok-video-downloader', labelKey: 'nav.tool.video.label' },
  { href: '/tiktok-mp3-downloader', labelKey: 'nav.tool.mp3.label' },
  { href: '/tiktok-profile-viewer', labelKey: 'nav.tool.viewer.label' },
  { href: '/tiktok-story-downloader', labelKey: 'nav.tool.story.label' },
  { href: '/tiktok-photo-downloader', labelKey: 'nav.tool.photo.label' },
  { href: '/tiktok-watermark-remover', labelKey: 'nav.tool.watermark.label' },
  { href: '/tiktok-analytics', labelKey: 'nav.tool.analytics.label' },
  { href: '/tiktok-money-calculator', labelKey: 'nav.tool.money.label' },
  { href: '/tiktok-engagement-calculator', labelKey: 'nav.tool.engage.label' },
  { href: '/tiktok-caption-generator', labelKey: 'nav.tool.caption.label' },
] as const;

const LEGAL_LINKS = [
  { href: '/terms-of-service', labelKey: 'legal.nav.terms' },
  { href: '/privacy-policy', labelKey: 'legal.nav.privacy' },
  { href: '/cookie-policy', labelKey: 'legal.nav.cookies' },
  { href: '/disclaimer', labelKey: 'legal.nav.disclaimer' },
  { href: '/legal-notice', labelKey: 'legal.nav.notice' },
  { href: '/copyright-policy', labelKey: 'legal.nav.copyright' },
  { href: '/tiktok-independence-disclaimer', labelKey: 'legal.nav.independence' },
  { href: '/public-content-policy', labelKey: 'legal.nav.publicContent' },
  { href: '/content-removal-policy', labelKey: 'legal.nav.removal' },
  { href: '/acceptable-use-policy', labelKey: 'legal.nav.acceptableUse' },
  { href: '/security-policy', labelKey: 'legal.nav.security' },
  { href: '/service-availability-policy', labelKey: 'legal.nav.availability' },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLanguage();
  const copy = SITEMAP_COPY[lang] || SITEMAP_COPY.en;

  return buildLocalizedMetadata({
    path: '/sitemap',
    rawTitle: copy.metaTitle,
    rawDescription: copy.metaDescription,
    type: 'website',
  });
}

export default async function HtmlSitemapPage() {
  const lang = await getRequestLanguage();
  const copy = SITEMAP_COPY[lang] || SITEMAP_COPY.en;
  const uiDict = UI_DICTIONARIES[lang] || UI_DICTIONARIES.en;
  const pageDict = PAGE_DICTIONARIES[lang] || PAGE_DICTIONARIES.en;
  const baseUrl = getBaseUrl();

  const formattedDate = new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(SITE_LAST_UPDATED_ISO));

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: copy.pageTitle,
    description: copy.metaDescription,
    url: `${baseUrl}${localizeHref('/sitemap', lang)}`,
    inLanguage: lang,
    dateModified: SITE_LAST_UPDATED_ISO,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-canvas)] text-[var(--ink-primary)]">
      <Navbar />

      <main id="main-content" className="flex-1 w-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
        />

        {/* Header Band */}
        <section className="w-full hero-studio-backdrop border-b border-[var(--border-subtle)] -mt-16 pt-22 pb-8 sm:pt-26 sm:pb-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <Breadcrumbs items={[{ label: copy.pageTitle }]} />

            <div className="max-w-3xl mt-3">
              <h1 className="text-[length:var(--h1-size)] font-bold text-[var(--ink-primary)] tracking-tight leading-tight">
                {copy.pageTitle}
              </h1>
              <p className="text-xs sm:text-sm text-[var(--ink-secondary)] mt-2.5 leading-relaxed">
                {copy.intro}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[var(--ink-muted)] font-medium">
                <span>
                  {copy.lastUpdated}:{' '}
                  <time dateTime={SITE_LAST_UPDATED_ISO} className="font-semibold text-[var(--ink-primary)]">
                    {formattedDate}
                  </time>
                </span>
                <span>•</span>
                <a
                  href="/sitemap.xml"
                  className="font-mono font-semibold text-[var(--accent-cyan-text)] hover:underline"
                >
                  {copy.xmlSitemapLabel}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Categorized Directory Sections */}
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Core Pages */}
            <section className="p-5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)]">
              <h2 className="text-base font-bold text-[var(--ink-primary)] pb-3 mb-3 border-b border-[var(--border-subtle)]">
                {copy.coreHeading}
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link
                    href={localizeHref('/', lang)}
                    className="text-[var(--ink-secondary)] hover:text-[var(--accent-cyan-text)] font-medium transition-colors"
                  >
                    {uiDict['nav.home']}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localizeHref('/creators', lang)}
                    className="text-[var(--ink-secondary)] hover:text-[var(--accent-cyan-text)] font-medium transition-colors"
                  >
                    {uiDict['nav.creators']}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localizeHref('/categories', lang)}
                    className="text-[var(--ink-secondary)] hover:text-[var(--accent-cyan-text)] font-medium transition-colors"
                  >
                    {uiDict['nav.categories']}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localizeHref('/about-us', lang)}
                    className="text-[var(--ink-secondary)] hover:text-[var(--accent-cyan-text)] font-medium transition-colors"
                  >
                    {uiDict['nav.about']}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localizeHref('/how-to-use-tiktok-profile-viewer', lang)}
                    className="text-[var(--ink-secondary)] hover:text-[var(--accent-cyan-text)] font-medium transition-colors"
                  >
                    {uiDict['nav.howToUse']}
                  </Link>
                </li>
              </ul>
            </section>

            {/* Free Tools */}
            <section className="p-5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)]">
              <h2 className="text-base font-bold text-[var(--ink-primary)] pb-3 mb-3 border-b border-[var(--border-subtle)]">
                {copy.toolsHeading}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 text-xs sm:text-sm">
                {TOOL_LINKS.map((tool) => (
                  <li key={tool.href}>
                    <Link
                      href={localizeHref(tool.href, lang)}
                      className="text-[var(--ink-secondary)] hover:text-[var(--accent-cyan-text)] font-medium transition-colors"
                    >
                      {uiDict[tool.labelKey]}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* Categories */}
            <section className="p-5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)]">
              <h2 className="text-base font-bold text-[var(--ink-primary)] pb-3 mb-3 border-b border-[var(--border-subtle)]">
                {copy.categoriesHeading} ({CATEGORIES.length})
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm">
                {CATEGORIES.map((cat) => {
                  const keyMap = CATEGORY_NICHE_KEY_MAP[cat.slug];
                  const name = keyMap ? uiDict[keyMap.nameKey] || cat.name : cat.name;
                  return (
                    <li key={cat.slug}>
                      <Link
                        href={localizeHref(`/category/${cat.slug}`, lang)}
                        className="text-[var(--ink-secondary)] hover:text-[var(--accent-cyan-text)] font-medium transition-colors"
                      >
                        {name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>

          {/* All 52 Curated Creators */}
          <section className="p-5 sm:p-6 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)]">
            <h2 className="text-base sm:text-lg font-bold text-[var(--ink-primary)] pb-3 mb-4 border-b border-[var(--border-subtle)]">
              {copy.creatorsHeading} ({CREATORS.length})
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2.5 text-xs">
              {CREATORS.map((creator) => (
                <li key={creator.username}>
                  <Link
                    href={localizeHref(`/profile/${creator.username}`, lang)}
                    className="flex items-center justify-between gap-2 py-1 text-[var(--ink-secondary)] hover:text-[var(--accent-cyan-text)] transition-colors"
                  >
                    <span data-no-translate="true" className="font-semibold text-[var(--ink-primary)] truncate">
                      {creator.displayName}
                    </span>
                    <span dir="ltr" data-no-translate="true" className="font-mono text-[11px] text-[var(--ink-muted)] shrink-0">
                      @{creator.username}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Legal & Policies */}
            <section className="p-5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)]">
              <h2 className="text-base font-bold text-[var(--ink-primary)] pb-3 mb-3 border-b border-[var(--border-subtle)]">
                {copy.legalHeading}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                {LEGAL_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={localizeHref(item.href, lang)}
                      className="text-[var(--ink-secondary)] hover:text-[var(--accent-cyan-text)] font-medium transition-colors"
                    >
                      {pageDict[item.labelKey] || item.labelKey}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* Languages */}
            <section className="p-5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)]">
              <h2 className="text-base font-bold text-[var(--ink-primary)] pb-3 mb-3 border-b border-[var(--border-subtle)]">
                {copy.languagesHeading} ({SUPPORTED_LANGUAGES.length})
              </h2>
              <ul className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                {SUPPORTED_LANGUAGES.map((item) => (
                  <li key={item.code}>
                    <Link
                      href={localizeHref('/sitemap', item.code)}
                      className="text-[var(--ink-secondary)] hover:text-[var(--accent-cyan-text)] font-medium transition-colors"
                    >
                      {item.name} ({item.native})
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}