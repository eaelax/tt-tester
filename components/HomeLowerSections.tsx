// File: components/HomeLowerSections.tsx
'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import HowToUseSteps from '@/components/HowToUseSteps';
import ExploreNichesSection from '@/components/ExploreNichesSection';
import CreatorToolsSection from '@/components/CreatorToolsSection';
import FaqSection from '@/components/FaqSection';
import AdSlot from '@/components/AdSlot';
import { MotionFadeIn } from '@/components/MotionPrimitives';
import { CREATORS } from '@/lib/creators-data';
import { useI18n } from '@/lib/i18n/context';
import type { LanguageCode } from '@/lib/i18n/types';

const CATEGORY_KEY_MAP: Record<string, string> = {
  comedy: 'niches.c1',
  'food-cooking': 'niches.c2',
  'tech-ai': 'niches.c3',
  gaming: 'niches.c4',
  'fitness-sports': 'niches.c5',
  'dance-music': 'niches.c6',
};

const HOME_UPDATED_ISO = '2026-11-28T00:00:00.000Z';

interface HomeGeoCopy {
  summaryHeading: string;
  summaryText: string;
  lastUpdatedLabel: string;
  colFeature: string;
  colSupported: string;
  colFormat: string;
  colLogin: string;
  noLogin: string;
  rows: {
    feature: string;
    supported: string;
    format: string;
  }[];
}

const HOME_GEO_COPY: Record<LanguageCode, HomeGeoCopy> = {
  en: {
    summaryHeading: 'What Tik Profiles Viewer Supports',
    summaryText:
      'Tik Profiles Viewer lets you inspect any public TikTok account in your browser without logging in or installing an app. You can view live follower counts, stream public videos smoothly, save clean 1080p MP4 videos without watermarks, download slideshow photos, and extract MP3 audio tracks for free.',
    lastUpdatedLabel: 'Last Updated',
    colFeature: 'Tool',
    colSupported: 'Supported Public Content',
    colFormat: 'Output Format',
    colLogin: 'Login Needed',
    noLogin: 'No',
    rows: [
      {
        feature: 'Profile Viewer',
        supported: 'Public bios, follower counts, total likes, and video grids',
        format: 'Live Web View',
      },
      {
        feature: 'Video Downloader',
        supported: 'Public short videos without bouncing watermarks',
        format: 'HD MP4 (1080p)',
      },
      {
        feature: 'Audio Extractor',
        supported: 'Original soundtracks, songs, and voice clips',
        format: 'MP3 Audio',
      },
      {
        feature: 'Photos & Stories',
        supported: 'Public carousel slides and 24-hour stories',
        format: 'HD JPG / MP4',
      },
    ],
  },
  ar: {
    summaryHeading: 'ما يقدمه عارض حسابات تيك توك',
    summaryText:
      'يتيح لك عارض حسابات تيك توك فحص أي حساب عام في متصفحك بدون تسجيل دخول أو تثبيت تطبيقات. يمكنك رؤية عدد المتابعين مباشرة، ومشاهدة الفيديوهات بسلاسة، وحفظ مقاطع MP4 بدقة 1080p بدون علامة مائية، وتنزيل صور العروض، واستخراج الصوت بصيغة MP3 مجاناً.',
    lastUpdatedLabel: 'آخر تحديث',
    colFeature: 'الأداة',
    colSupported: 'المحتوى العام المدعوم',
    colFormat: 'صيغة الحفظ',
    colLogin: 'تسجيل الدخول',
    noLogin: 'لا',
    rows: [
      {
        feature: 'عارض الملفات',
        supported: 'النبذة العامة، عدد المتابعين، إجمالي الإعجابات، وشبكة الفيديوهات',
        format: 'عرض ويب مباشر',
      },
      {
        feature: 'تنزيل الفيديو',
        supported: 'مقاطع الفيديو العامة بدون شعار أو علامة مائية',
        format: 'MP4 بدقة HD',
      },
      {
        feature: 'استخراج الصوت',
        supported: 'الأغاني الأصلية، الموسيقى، والتسجيلات الصوتية',
        format: 'صوت MP3',
      },
      {
        feature: 'الصور والقصص',
        supported: 'شرائح الصور العامة وقصص الـ 24 ساعة',
        format: 'JPG / MP4',
      },
    ],
  },
  fr: {
    summaryHeading: 'Ce que propose Tik Profiles Viewer',
    summaryText:
      'Tik Profiles Viewer vous permet de consulter tout compte TikTok public dans votre navigateur sans connexion ni application. Vous pouvez voir les abonnés en direct, lire les vidéos avec fluidité, enregistrer des MP4 1080p sans filigrane, télécharger les photos et extraire l’audio MP3 gratuitement.',
    lastUpdatedLabel: 'Dernière mise à jour',
    colFeature: 'Outil',
    colSupported: 'Contenu public pris en charge',
    colFormat: 'Format de sortie',
    colLogin: 'Connexion requise',
    noLogin: 'Non',
    rows: [
      {
        feature: 'Visionneuse de profil',
        supported: 'Bios publiques, abonnés, mentions j’aime et grille vidéo',
        format: 'Page web en direct',
      },
      {
        feature: 'Téléchargeur vidéo',
        supported: 'Vidéos publiques courtes sans logo ni filigrane',
        format: 'MP4 HD (1080p)',
      },
      {
        feature: 'Extracteur audio',
        supported: 'Bandes son originales, musiques et voix',
        format: 'Audio MP3',
      },
      {
        feature: 'Photos & Stories',
        supported: 'Diaporamas carrousel publics et stories de 24h',
        format: 'JPG HD / MP4',
      },
    ],
  },
  es: {
    summaryHeading: 'Qué ofrece Tik Profiles Viewer',
    summaryText:
      'Tik Profiles Viewer te permite revisar cualquier cuenta pública de TikTok en tu navegador sin iniciar sesión ni instalar aplicaciones. Puedes ver seguidores en vivo, reproducir videos sin cortes, guardar videos MP4 1080p sin marca de agua, bajar fotos y extraer audio MP3 gratis.',
    lastUpdatedLabel: 'Última actualización',
    colFeature: 'Herramienta',
    colSupported: 'Contenido público compatible',
    colFormat: 'Formato de salida',
    colLogin: 'Requiere cuenta',
    noLogin: 'No',
    rows: [
      {
        feature: 'Visor de perfiles',
        supported: 'Biografías públicas, seguidores, me gusta y videos',
        format: 'Vista web en vivo',
      },
      {
        feature: 'Descargador de video',
        supported: 'Videos cortos públicos sin logotipo ni marca de agua',
        format: 'MP4 HD (1080p)',
      },
      {
        feature: 'Extractor de audio',
        supported: 'Pistas de sonido originales, canciones y voces',
        format: 'Audio MP3',
      },
      {
        feature: 'Fotos e Historias',
        supported: 'Carruseles públicos de fotos e historias de 24 horas',
        format: 'JPG HD / MP4',
      },
    ],
  },
  de: {
    summaryHeading: 'Was Tik Profiles Viewer unterstützt',
    summaryText:
      'Mit Tik Profiles Viewer prüfst du jedes öffentliche TikTok-Konto im Browser ohne Login oder App-Installation. Du siehst aktuelle Follower-Zahlen, spielst Videos flüssig ab, speicherst saubere 1080p-MP4-Videos ohne Wasserzeichen, lädst Diashow-Bilder und sicherst MP3-Audios kostenlos.',
    lastUpdatedLabel: 'Zuletzt aktualisiert',
    colFeature: 'Tool',
    colSupported: 'Unterstützte öffentliche Inhalte',
    colFormat: 'Ausgabeformat',
    colLogin: 'Login nötig',
    noLogin: 'Nein',
    rows: [
      {
        feature: 'Profil-Viewer',
        supported: 'Öffentliche Bios, Follower, Likes und Videolisten',
        format: 'Live-Webansicht',
      },
      {
        feature: 'Video-Downloader',
        supported: 'Öffentliche Kurzvideos ohne springendes Wasserzeichen',
        format: 'HD MP4 (1080p)',
      },
      {
        feature: 'Audio-Extraktor',
        supported: 'Originalsounds, Songs und Sprachaufnahmen',
        format: 'MP3-Audio',
      },
      {
        feature: 'Fotos & Stories',
        supported: 'Öffentliche Karussell-Bilder und 24-Stunden-Stories',
        format: 'HD JPG / MP4',
      },
    ],
  },
  ru: {
    summaryHeading: 'Возможности Tik Profiles Viewer',
    summaryText:
      'Tik Profiles Viewer позволяет просматривать любой публичный профиль TikTok в браузере без входа в аккаунт и установки приложений. Вы можете проверять подписчиков, плавно смотреть ролики, сохранять чистые MP4 1080p без водяных знаков, фото из слайд-шоу и аудио MP3 бесплатно.',
    lastUpdatedLabel: 'Последнее обновление',
    colFeature: 'Инструмент',
    colSupported: 'Поддерживаемый контент',
    colFormat: 'Формат',
    colLogin: 'Нужен вход',
    noLogin: 'Нет',
    rows: [
      {
        feature: 'Просмотр профиля',
        supported: 'Открытые описания, подписчики, лайки и лента видео',
        format: 'Веб-просмотр',
      },
      {
        feature: 'Загрузчик видео',
        supported: 'Публичные ролики без прыгающего логотипа',
        format: 'HD MP4 (1080p)',
      },
      {
        feature: 'Извлечение аудио',
        supported: 'Оригинальные звуки, музыка и озвучка',
        format: 'Аудио MP3',
      },
      {
        feature: 'Фото и сторис',
        supported: 'Публичные слайд-шоу и 24-часовые истории',
        format: 'HD JPG / MP4',
      },
    ],
  },
  zh: {
    summaryHeading: 'Tik Profiles Viewer 核心功能支持',
    summaryText:
      'Tik Profiles Viewer 让您无需登录或安装应用即可直接在浏览器查看任意公开 TikTok 主页。您可以免费查看实时粉丝数、流畅播放公开视频、保存无水印 1080p MP4 视频、下载幻灯片高清图片并提取 MP3 原声音频。',
    lastUpdatedLabel: '最近更新',
    colFeature: '工具',
    colSupported: '支持的公开内容',
    colFormat: '输出格式',
    colLogin: '需要登录',
    noLogin: '不需要',
    rows: [
      {
        feature: '主页查看器',
        supported: '公开简介、粉丝数、总点赞与视频列表',
        format: '网页实时查看',
      },
      {
        feature: '视频下载器',
        supported: '无水印干扰的公开短视频流',
        format: '高清 MP4 (1080p)',
      },
      {
        feature: '音频提取器',
        supported: '原声音轨、热门歌曲与语音片段',
        format: 'MP3 音频',
      },
      {
        feature: '图文与快拍',
        supported: '公开轮播图片与 24 小时快拍内容',
        format: '高清 JPG / MP4',
      },
    ],
  },
  pt: {
    summaryHeading: 'O que o Tik Profiles Viewer Suporta',
    summaryText:
      'O Tik Profiles Viewer permite ver qualquer conta pública do TikTok no navegador sem fazer login nem instalar aplicativos. Você pode conferir seguidores ao vivo, assistir aos vídeos sem travamentos, salvar MP4 1080p sem marca d’água, baixar fotos e extrair faixas MP3 grátis.',
    lastUpdatedLabel: 'Última atualização',
    colFeature: 'Ferramenta',
    colSupported: 'Conteúdo público suportado',
    colFormat: 'Formato de saída',
    colLogin: 'Precisa login',
    noLogin: 'Não',
    rows: [
      {
        feature: 'Visualizador de perfil',
        supported: 'Bios públicas, seguidores, curtidas e grade de vídeos',
        format: 'Visualização web',
      },
      {
        feature: 'Baixador de vídeo',
        supported: 'Vídeos curtos públicos sem logotipo de marca d’água',
        format: 'MP4 HD (1080p)',
      },
      {
        feature: 'Extrator de áudio',
        supported: 'Trilhas originais, músicas e gravações de voz',
        format: 'Áudio MP3',
      },
      {
        feature: 'Fotos e Stories',
        supported: 'Slides de fotos públicos e stories de 24 horas',
        format: 'JPG HD / MP4',
      },
    ],
  },
  he: {
    summaryHeading: 'מה כלי Tik Profiles Viewer תומך',
    summaryText:
      'Tik Profiles Viewer מאפשר לך לצפות בכל חשבון טיקטוק ציבורי בדפדפן ללא התחברות וללא התקנת אפליקציה. ניתן לראות מספר עוקבים חי, לנגן סרטונים בצורה חלקה, לשמור קובצי MP4 ב-1080p ללא סימן מים, להוריד תמונות ולחלץ MP3 בחינם.',
    lastUpdatedLabel: 'עודכן לאחרונה',
    colFeature: 'כלי',
    colSupported: 'תוכן ציבורי נתמך',
    colFormat: 'פורמט פלט',
    colLogin: 'נדרשת התחברות',
    noLogin: 'לא',
    rows: [
      {
        feature: 'מציג פרופילים',
        supported: 'ביוגרפיה ציבורית, עוקבים, לייקים ורשת סרטונים',
        format: 'תצוגת אינטרנט חיה',
      },
      {
        feature: 'מוריד וידאו',
        supported: 'סרטונים קצרים ציבוריים ללא לוגו וסימן מים',
        format: 'MP4 HD (1080p)',
      },
      {
        feature: 'מחלץ אודיו',
        supported: 'פסקולים מקוריים, שירים והקלטות קול',
        format: 'אודיו MP3',
      },
      {
        feature: 'תמונות וסטוריז',
        supported: 'מצגות תמונות ציבוריות וסטוריז ל-24 שעות',
        format: 'JPG HD / MP4',
      },
    ],
  },
  hi: {
    summaryHeading: 'Tik Profiles Viewer क्या सपोर्ट करता है',
    summaryText:
      'Tik Profiles Viewer की मदद से आप बिना लॉगिन या ऐप इंस्टॉल किए अपने ब्राउज़र में कोई भी पब्लिक TikTok अकाउंट देख सकते हैं। आप लाइव फॉलोअर्स गिनती देख सकते हैं, वीडियो चला सकते हैं, बिना वॉटरमार्क 1080p MP4 वीडियो, स्लाइडशो फोटो और MP3 ऑडियो मुफ्त सेव कर सकते हैं।',
    lastUpdatedLabel: 'अंतिम अपडेट',
    colFeature: 'टूल',
    colSupported: 'सपोर्टेड पब्लिक कंटेंट',
    colFormat: 'आउटपुट फॉर्मेट',
    colLogin: 'लॉगिन ज़रूरी',
    noLogin: 'नहीं',
    rows: [
      {
        feature: 'प्रोफाइल व्यूअर',
        supported: 'पब्लिक बायो, फॉलोअर्स, कुल लाइक्स और वीडियो ग्रिड',
        format: 'लाइव वेब व्यू',
      },
      {
        feature: 'वीडियो डाउनलोडर',
        supported: 'बिना वॉटरमार्क वाले पब्लिक शॉर्ट वीडियो',
        format: 'HD MP4 (1080p)',
      },
      {
        feature: 'ऑडियो एक्सट्रैक्टर',
        supported: 'ओरिजिनल साउंड, गाने और वॉइस क्लिप',
        format: 'MP3 ऑडियो',
      },
      {
        feature: 'फोटो और स्टोरीज़',
        supported: 'पब्लिक कैरोसेल स्लाइड और 24 घंटे की स्टोरीज़',
        format: 'HD JPG / MP4',
      },
    ],
  },
};

export default function HomeLowerSections() {
  const { lang, t, localizeHref } = useI18n();
  const featuredCreators = CREATORS.slice(0, 6);
  const geoCopy = HOME_GEO_COPY[lang] || HOME_GEO_COPY.en;

  const formattedUpdatedDate = new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(HOME_UPDATED_ISO));

  return (
    <div className="w-full flex flex-col">
      {/* Band 1: How to Use */}
      <section
        id="how-to-use"
        className="w-full bg-[var(--surface-canvas)] border-b border-[var(--border-subtle)] py-12 sm:py-16 scroll-mt-16"
      >
        <MotionFadeIn inView className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-7">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink-primary)] tracking-tight">
                {t('steps.title')}
              </h2>
              <p className="text-sm text-[var(--ink-secondary)] mt-1.5">
                {t('steps.subtitle')}
              </p>
            </div>
            <Link
              href={localizeHref('/how-to-use-tiktok-profile-viewer')}
              className="h-9 px-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border-strong)] hover:bg-[var(--pastel-blue)] hover:border-[var(--accent-cyan)] text-xs font-semibold text-[var(--ink-primary)] inline-flex items-center gap-1.5 transition-colors shrink-0 w-fit shadow-xs"
            >
              <span>{t('steps.fullGuide')}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[var(--accent-cyan-text)] rtl:rotate-180" />
            </Link>
          </div>

          <HowToUseSteps />
        </MotionFadeIn>
      </section>

      {/* Band 2: Explore Niches */}
      <section className="w-full bg-[var(--surface-elevated)] border-b border-[var(--border-subtle)] py-12 sm:py-16">
        <MotionFadeIn inView className="max-w-6xl mx-auto px-4 sm:px-6">
          <ExploreNichesSection />
        </MotionFadeIn>
      </section>

      {/* Band 3: Trending Creators */}
      <section className="w-full bg-[var(--surface-canvas)] border-b border-[var(--border-subtle)] py-12 sm:py-16">
        <MotionFadeIn inView className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-7">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink-primary)] tracking-tight">
                {t('home.trendingTitle')}
              </h2>
              <p className="text-sm text-[var(--ink-secondary)] mt-1.5">
                {t('home.trendingSubtitle')}
              </p>
            </div>
            <Link
              href={localizeHref('/creators')}
              className="h-9 px-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border-strong)] hover:bg-[var(--pastel-blue)] hover:border-[var(--accent-cyan)] text-xs font-semibold text-[var(--ink-primary)] inline-flex items-center gap-1.5 transition-colors shrink-0 w-fit shadow-xs"
            >
              <span>{t('home.viewAllCreators')}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[var(--accent-cyan-text)] rtl:rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredCreators.map((creator) => {
              const catKey = CATEGORY_KEY_MAP[creator.categorySlug];
              const categoryLabel = catKey ? t(catKey) : creator.category;

              return (
                <Link
                  key={creator.username}
                  href={localizeHref(`/profile/${creator.username}`)}
                  className="group p-4 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] shadow-[var(--shadow-card)] transition-colors flex items-center gap-3.5"
                >
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[var(--surface-sunken)] shrink-0 border border-[var(--border-subtle)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        creator.avatar ||
                        `/api/avatar?username=${encodeURIComponent(creator.username)}`
                      }
                      alt={creator.displayName}
                      width={48}
                      height={48}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3
                      data-no-translate="true"
                      className="text-sm font-bold text-[var(--ink-primary)] group-hover:text-[var(--accent-primary-text)] transition-colors truncate"
                    >
                      {creator.displayName}
                    </h3>
                    <p
                      dir="ltr"
                      data-no-translate="true"
                      className="text-xs font-mono font-medium text-[var(--ink-muted)] truncate w-fit"
                    >
                      @{creator.username}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-[var(--ink-secondary)] mt-1">
                      <span className="font-semibold text-[var(--ink-primary)] tabular-nums shrink-0">
                        {t('home.followersLabel', { count: creator.followers })}
                      </span>
                      <span className="text-[var(--border-strong)]">•</span>
                      <span className="truncate text-[var(--ink-muted)]">
                        {categoryLabel}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-[var(--ink-muted)] group-hover:text-[var(--accent-primary-text)] transition-colors shrink-0 rtl:rotate-180" />
                </Link>
              );
            })}
          </div>
        </MotionFadeIn>
      </section>

      {/* Band 4: About, Answer-First Summary & Capabilities Comparison Table */}
      <section
        id="about"
        className="w-full bg-[var(--surface-elevated)] border-b border-[var(--border-subtle)] py-12 sm:py-16 scroll-mt-16"
      >
        <MotionFadeIn inView className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink-primary)] tracking-tight">
                {t('home.aboutTitle')}
              </h2>
              <p className="text-sm text-[var(--ink-secondary)] mt-1.5">
                {t('home.aboutSubtitle')}
              </p>
            </div>
            <Link
              href={localizeHref('/about-us')}
              className="h-9 px-4 rounded-lg bg-[var(--surface-canvas)] border border-[var(--border-strong)] hover:bg-[var(--pastel-blue)] hover:border-[var(--accent-cyan)] text-xs font-semibold text-[var(--ink-primary)] inline-flex items-center gap-1.5 transition-colors shrink-0 w-fit shadow-xs"
            >
              <span>{t('home.readMore')}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[var(--accent-cyan-text)] rtl:rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-[var(--pastel-blue)] border border-[var(--pastel-blue-border)] flex flex-col gap-2">
              <h3 className="text-base font-bold text-[var(--ink-primary)]">
                {t('home.fastPlayerTitle')}
              </h3>
              <p className="text-xs sm:text-[13px] text-[var(--ink-secondary)] leading-relaxed">
                {t('home.fastPlayerDesc')}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[var(--pastel-pink)] border border-[var(--pastel-pink-border)] flex flex-col gap-2">
              <h3 className="text-base font-bold text-[var(--ink-primary)]">
                {t('home.freeTitle')}
              </h3>
              <p className="text-xs sm:text-[13px] text-[var(--ink-secondary)] leading-relaxed">
                {t('home.freeDesc')}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[var(--pastel-lavender)] border border-[var(--pastel-lavender-border)] flex flex-col gap-2">
              <h3 className="text-base font-bold text-[var(--ink-primary)]">
                {t('home.privateTitle')}
              </h3>
              <p className="text-xs sm:text-[13px] text-[var(--ink-secondary)] leading-relaxed">
                {t('home.privateDesc')}
              </p>
            </div>
          </div>

          {/* Answer-First GEO Summary & Capabilities Table */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[var(--surface-canvas)] border border-[var(--border-subtle)] space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-[var(--ink-primary)] tracking-tight">
                {geoCopy.summaryHeading}
              </h2>
              <div className="text-xs text-[var(--ink-muted)] font-medium">
                {geoCopy.lastUpdatedLabel}:{' '}
                <time dateTime={HOME_UPDATED_ISO} className="font-semibold text-[var(--ink-primary)]">
                  {formattedUpdatedDate}
                </time>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed max-w-[75ch]">
              {geoCopy.summaryText}
            </p>

            <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
              <table className="w-full text-start border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-[var(--ink-primary)]">
                    <th className="py-3 px-4 font-bold text-start">{geoCopy.colFeature}</th>
                    <th className="py-3 px-4 font-bold text-start">{geoCopy.colSupported}</th>
                    <th className="py-3 px-4 font-bold text-start">{geoCopy.colFormat}</th>
                    <th className="py-3 px-4 font-bold text-start">{geoCopy.colLogin}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--ink-secondary)]">
                  {geoCopy.rows.map((row) => (
                    <tr key={row.feature} className="hover:bg-[var(--surface-canvas)] transition-colors">
                      <td className="py-3 px-4 font-semibold text-[var(--ink-primary)] whitespace-nowrap">
                        {row.feature}
                      </td>
                      <td className="py-3 px-4">{row.supported}</td>
                      <td className="py-3 px-4 font-mono text-[11px] text-[var(--accent-cyan-text)] font-semibold whitespace-nowrap">
                        {row.format}
                      </td>
                      <td className="py-3 px-4 font-semibold text-[var(--ink-primary)] whitespace-nowrap">
                        {geoCopy.noLogin}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </MotionFadeIn>
      </section>

      {/* Band 5: Free Creator Tools */}
      <section className="w-full bg-[var(--surface-canvas)] border-b border-[var(--border-subtle)] py-12 sm:py-16">
        <MotionFadeIn inView className="max-w-6xl mx-auto px-4 sm:px-6">
          <CreatorToolsSection />
        </MotionFadeIn>
      </section>

      {/* Band 6: AdSlot & FAQ */}
      <section className="w-full bg-[var(--surface-elevated)] py-12 sm:py-16">
        <MotionFadeIn inView className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          <AdSlot placement="footer" />
          <FaqSection />
        </MotionFadeIn>
      </section>
    </div>
  );
}