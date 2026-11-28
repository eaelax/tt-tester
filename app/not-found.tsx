'use client';

import Link from 'next/link';
import { Home, Users, LayoutGrid, Film, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useI18n } from '@/lib/i18n/context';
import type { LanguageCode } from '@/lib/i18n/types';

interface NotFoundCopy {
  codeLabel: string;
  heading: string;
  description: string;
  backHome: string;
  browseCreators: string;
  browseCategories: string;
  videoDownloader: string;
}

const NOT_FOUND_COPY: Record<LanguageCode, NotFoundCopy> = {
  en: {
    codeLabel: 'Error 404',
    heading: 'This page could not be found',
    description:
      'The link may be broken or the page may have moved. Use the links below to continue exploring public TikTok profiles and tools.',
    backHome: 'Back to Home',
    browseCreators: 'Top Creators',
    browseCategories: 'Categories',
    videoDownloader: 'HD Video Downloader',
  },
  ar: {
    codeLabel: 'خطأ 404',
    heading: 'تعذر العثور على هذه الصفحة',
    description:
      'قد يكون الرابط غير صحيح أو تم نقل الصفحة. استخدم الروابط أدناه للعودة إلى تصفح الحسابات العامة والأدوات.',
    backHome: 'العودة إلى الرئيسية',
    browseCreators: 'أشهر المبدعين',
    browseCategories: 'التصنيفات',
    videoDownloader: 'تنزيل فيديو HD',
  },
  fr: {
    codeLabel: 'Erreur 404',
    heading: 'Page introuvable',
    description:
      'Ce lien est peut-être incorrect ou la page a été déplacée. Utilisez les liens ci-dessous pour explorer les profils publics et outils.',
    backHome: 'Retour à l’accueil',
    browseCreators: 'Top Créateurs',
    browseCategories: 'Catégories',
    videoDownloader: 'Téléchargeur Vidéo HD',
  },
  es: {
    codeLabel: 'Error 404',
    heading: 'No se pudo encontrar esta página',
    description:
      'El enlace puede estar roto o la página se movió. Usa los enlaces de abajo para seguir explorando perfiles y herramientas.',
    backHome: 'Volver al Inicio',
    browseCreators: 'Top Creadores',
    browseCategories: 'Categorías',
    videoDownloader: 'Descargador Video HD',
  },
  de: {
    codeLabel: 'Fehler 404',
    heading: 'Diese Seite wurde nicht gefunden',
    description:
      'Der Link ist möglicherweise fehlerhaft oder die Seite wurde verschoben. Nutzen Sie die Links unten, um weiter zu stöbern.',
    backHome: 'Zur Startseite',
    browseCreators: 'Top Creator',
    browseCategories: 'Kategorien',
    videoDownloader: 'HD Video Downloader',
  },
  ru: {
    codeLabel: 'Ошибка 404',
    heading: 'Страница не найдена',
    description:
      'Ссылка может быть устаревшей или страница была перенесена. Воспользуйтесь ссылками ниже, чтобы перейти к профилям и инструментам.',
    backHome: 'На главную',
    browseCreators: 'Топ авторы',
    browseCategories: 'Категории',
    videoDownloader: 'Загрузчик видео HD',
  },
  zh: {
    codeLabel: '404 错误',
    heading: '未找到该页面',
    description:
      '链接可能已失效或页面已移动。请使用下方链接继续浏览公开创作者主页和免费工具。',
    backHome: '返回首页',
    browseCreators: '热门创作者',
    browseCategories: '分类目录',
    videoDownloader: '高清视频下载器',
  },
  pt: {
    codeLabel: 'Erro 404',
    heading: 'Esta página não foi encontrada',
    description:
      'O link pode estar quebrado ou a página foi movida. Use os links abaixo para continuar explorando perfis e ferramentas.',
    backHome: 'Voltar ao Início',
    browseCreators: 'Top Criadores',
    browseCategories: 'Categorias',
    videoDownloader: 'Baixador Vídeo HD',
  },
  he: {
    codeLabel: 'שגיאה 404',
    heading: 'העמוד המבוקש לא נמצא',
    description:
      'ייתכן שהקישור שבור או שהעמוד הועבר. השתמש בקישורים למטה כדי להמשיך לגלוש בפרופילים ובכלים.',
    backHome: 'חזרה לדף הבית',
    browseCreators: 'יוצרים מובילים',
    browseCategories: 'קטגוריות',
    videoDownloader: 'מוריד וידאו HD',
  },
  hi: {
    codeLabel: 'त्रुटि 404',
    heading: 'यह पेज नहीं मिला',
    description:
      'लिंक गलत हो सकता है या पेज हटाया जा चुका है। पब्लिक प्रोफाइल और टूल्स देखने के लिए नीचे दिए गए लिंक चुनें।',
    backHome: 'होम पर वापस जाएं',
    browseCreators: 'टॉप क्रिएटर्स',
    browseCategories: 'श्रेणियां',
    videoDownloader: 'HD वीडियो डाउनलोडर',
  },
};

export default function NotFound() {
  const { lang, localizeHref } = useI18n();
  const copy = NOT_FOUND_COPY[lang] || NOT_FOUND_COPY.en;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-canvas)] text-[var(--ink-primary)]">
      <meta name="robots" content="noindex, follow" />
      <Navbar />

      <main className="flex-1 w-full flex items-center justify-center px-4 sm:px-6 py-16">
        <div className="max-w-xl w-full bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-2xl shadow-[var(--shadow-workbench)] p-6 sm:p-8 text-center">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-primary-text)] mb-2">
            {copy.codeLabel}
          </p>

          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--ink-primary)] tracking-tight leading-tight">
            {copy.heading}
          </h1>

          <p className="text-xs sm:text-sm text-[var(--ink-secondary)] mt-3 leading-relaxed max-w-md mx-auto">
            {copy.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={localizeHref('/')}
              className="h-10 px-5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--accent-contrast)] text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <Home className="w-4 h-4 shrink-0" />
              <span>{copy.backHome}</span>
            </Link>
          </div>

          <div className="mt-7 pt-6 border-t border-[var(--border-subtle)] grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-start">
            <Link
              href={localizeHref('/creators')}
              className="p-3 rounded-xl bg-[var(--surface-canvas)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] flex items-center justify-between gap-2 text-xs font-semibold text-[var(--ink-primary)] transition-colors"
            >
              <span className="inline-flex items-center gap-2 truncate">
                <Users className="w-3.5 h-3.5 text-[var(--accent-cyan-text)] shrink-0" />
                <span className="truncate">{copy.browseCreators}</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[var(--ink-muted)] shrink-0 rtl:rotate-180" />
            </Link>

            <Link
              href={localizeHref('/categories')}
              className="p-3 rounded-xl bg-[var(--surface-canvas)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] flex items-center justify-between gap-2 text-xs font-semibold text-[var(--ink-primary)] transition-colors"
            >
              <span className="inline-flex items-center gap-2 truncate">
                <LayoutGrid className="w-3.5 h-3.5 text-[var(--accent-cyan-text)] shrink-0" />
                <span className="truncate">{copy.browseCategories}</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[var(--ink-muted)] shrink-0 rtl:rotate-180" />
            </Link>

            <Link
              href={localizeHref('/tiktok-video-downloader')}
              className="p-3 rounded-xl bg-[var(--surface-canvas)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] flex items-center justify-between gap-2 text-xs font-semibold text-[var(--ink-primary)] transition-colors"
            >
              <span className="inline-flex items-center gap-2 truncate">
                <Film className="w-3.5 h-3.5 text-[var(--accent-primary-text)] shrink-0" />
                <span className="truncate">{copy.videoDownloader}</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[var(--ink-muted)] shrink-0 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}