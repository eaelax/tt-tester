// File: components/CategoryDetailView.tsx
'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import TikTokProfileViewer from '@/components/TikTokProfileViewer';
import {
  CategoryData,
  CreatorData,
  CATEGORIES,
} from '@/lib/creators-data';
import { useI18n } from '@/lib/i18n/context';
import type { LanguageCode } from '@/lib/i18n/types';
import {
  CATEGORY_NICHE_KEY_MAP,
  getLocalizedCategoryBundle,
} from '@/lib/i18n/category-faqs';

const CATEGORY_UPDATED_ISO = '2026-11-28T00:00:00.000Z';

interface CategoryGeoCopy {
  overviewHeading: (name: string) => string;
  answerText: (name: string, count: number, topCreator: string) => string;
  lastUpdatedLabel: string;
  colCreator: string;
  colHandle: string;
  colFollowers: string;
  colLikes: string;
  colCountry: string;
  colAction: string;
  viewProfile: string;
}

const CATEGORY_GEO_COPY: Record<LanguageCode, CategoryGeoCopy> = {
  en: {
    overviewHeading: (name) => `About ${name} Creators on TikTok`,
    answerText: (name, count, topCreator) =>
      `This ${name} directory lists ${count} active public TikTok creators, including ${topCreator}. You can open any creator profile below with no login to view live follower numbers, watch recent videos smoothly in your browser, and download clean HD MP4 clips or MP3 audio files without watermarks.`,
    lastUpdatedLabel: 'Last Updated',
    colCreator: 'Creator',
    colHandle: 'Handle',
    colFollowers: 'Followers',
    colLikes: 'Total Likes',
    colCountry: 'Country',
    colAction: 'Profile',
    viewProfile: 'Open',
  },
  ar: {
    overviewHeading: (name) => `نبذة عن مبدعي ${name} على تيك توك`,
    answerText: (name, count, topCreator) =>
      `يضم دليل ${name} عدد ${count} من صناع المحتوى العامين على تيك توك، ومن أبرزهم ${topCreator}. يمكنك فتح أي حساب أدناه بدون تسجيل دخول لمشاهدة عدد المتابعين مباشرة، وتشغيل الفيديوهات بسلاسة، وتنزيل مقاطع MP4 عالية الدقة أو ملفات MP3 بدون علامة مائية.`,
    lastUpdatedLabel: 'آخر تحديث',
    colCreator: 'المبدع',
    colHandle: 'المعرف',
    colFollowers: 'المتابعون',
    colLikes: 'الإعجابات',
    colCountry: 'الدولة',
    colAction: 'الملف',
    viewProfile: 'فتح',
  },
  fr: {
    overviewHeading: (name) => `À propos des créateurs ${name} sur TikTok`,
    answerText: (name, count, topCreator) =>
      `Cette rubrique ${name} regroupe ${count} créateurs TikTok publics actifs, dont ${topCreator}. Ouvrez n’importe quel profil ci-dessous sans connexion pour voir les abonnés en direct, lire les vidéos avec fluidité et télécharger des fichiers MP4 HD ou MP3 sans filigrane.`,
    lastUpdatedLabel: 'Dernière mise à jour',
    colCreator: 'Créateur',
    colHandle: 'Pseudo',
    colFollowers: 'Abonnés',
    colLikes: 'J’aime',
    colCountry: 'Pays',
    colAction: 'Profil',
    viewProfile: 'Ouvrir',
  },
  es: {
    overviewHeading: (name) => `Acerca de los creadores de ${name} en TikTok`,
    answerText: (name, count, topCreator) =>
      `Esta sección de ${name} reúne ${count} creadores públicos activos en TikTok, incluido ${topCreator}. Abre cualquier perfil abajo sin iniciar sesión para ver seguidores en vivo, reproducir videos sin cortes y descargar archivos MP4 HD o MP3 sin marca de agua.`,
    lastUpdatedLabel: 'Última actualización',
    colCreator: 'Creador',
    colHandle: 'Usuario',
    colFollowers: 'Seguidores',
    colLikes: 'Me gusta',
    colCountry: 'País',
    colAction: 'Perfil',
    viewProfile: 'Abrir',
  },
  de: {
    overviewHeading: (name) => `Über ${name}-Creator auf TikTok`,
    answerText: (name, count, topCreator) =>
      `Dieses Verzeichnis für ${name} listet ${count} aktive öffentliche TikTok-Creator auf, darunter ${topCreator}. Öffne unten jedes Profil ohne Login, um aktuelle Follower-Zahlen zu prüfen, Videos direkt im Browser abzuspielen und saubere HD-MP4s oder MP3s ohne Wasserzeichen zu speichern.`,
    lastUpdatedLabel: 'Zuletzt aktualisiert',
    colCreator: 'Creator',
    colHandle: 'Name',
    colFollowers: 'Follower',
    colLikes: 'Likes',
    colCountry: 'Land',
    colAction: 'Profil',
    viewProfile: 'Öffnen',
  },
  ru: {
    overviewHeading: (name) => `Об авторах категории «${name}» в TikTok`,
    answerText: (name, count, topCreator) =>
      `В разделе «${name}» собрано ${count} активных публичных авторов TikTok, включая ${topCreator}. Откройте любой профиль ниже без входа в аккаунт, чтобы проверить число подписчиков, посмотреть ролики в браузере и скачать чистые HD MP4 или MP3 без водяных знаков.`,
    lastUpdatedLabel: 'Последнее обновление',
    colCreator: 'Автор',
    colHandle: 'Ник',
    colFollowers: 'Подписчики',
    colLikes: 'Лайки',
    colCountry: 'Страна',
    colAction: 'Профиль',
    viewProfile: 'Открыть',
  },
  zh: {
    overviewHeading: (name) => `关于 ${name} 领域的 TikTok 创作者`,
    answerText: (name, count, topCreator) =>
      `本 ${name} 分类共收录 ${count} 位活跃的公开 TikTok 创作者，包括 ${topCreator}。您可以无需登录直接打开下方任意主页，查看实时粉丝数、流畅观看视频，并免费下载无水印高清 MP4 视频或 MP3 音频。`,
    lastUpdatedLabel: '最近更新',
    colCreator: '创作者',
    colHandle: '账号',
    colFollowers: '粉丝数',
    colLikes: '获赞数',
    colCountry: '国家',
    colAction: '主页',
    viewProfile: '打开',
  },
  pt: {
    overviewHeading: (name) => `Sobre criadores de ${name} no TikTok`,
    answerText: (name, count, topCreator) =>
      `Esta página de ${name} reúne ${count} criadores públicos ativos no TikTok, incluindo ${topCreator}. Abra qualquer perfil abaixo sem fazer login para conferir seguidores ao vivo, assistir aos vídeos com fluidez e baixar MP4 HD ou MP3 sem marca d’água.`,
    lastUpdatedLabel: 'Última atualização',
    colCreator: 'Criador',
    colHandle: 'Usuário',
    colFollowers: 'Seguidores',
    colLikes: 'Curtidas',
    colCountry: 'País',
    colAction: 'Perfil',
    viewProfile: 'Abrir',
  },
  he: {
    overviewHeading: (name) => `אודות יוצרי ${name} בטיקטוק`,
    answerText: (name, count, topCreator) =>
      `קטגוריית ${name} מציגה ${count} יוצרים ציבוריים פעילים בטיקטוק, כולל ${topCreator}. ניתן לפתוח כל פרופיל למטה ללא התחברות כדי לראות מספר עוקבים חי, לצפות בסרטונים בדפדפן ולהוריד קובצי MP4 HD או MP3 ללא סימן מים.`,
    lastUpdatedLabel: 'עודכן לאחרונה',
    colCreator: 'יוצר',
    colHandle: 'כינוי',
    colFollowers: 'עוקבים',
    colLikes: 'לייקים',
    colCountry: 'מדינה',
    colAction: 'פרופיל',
    viewProfile: 'פתח',
  },
  hi: {
    overviewHeading: (name) => `TikTok पर ${name} क्रिएटर्स के बारे में`,
    answerText: (name, count, topCreator) =>
      `${name} की इस सूची में ${count} सक्रिय पब्लिक TikTok क्रिएटर्स शामिल हैं, जिनमें ${topCreator} भी हैं। आप बिना लॉगिन नीचे किसी भी प्रोफाइल को खोलकर लाइव फॉलोअर्स देख सकते हैं, वीडियो चला सकते हैं और बिना वॉटरमार्क HD MP4 या MP3 फ़ाइलें सेव कर सकते हैं।`,
    lastUpdatedLabel: 'अंतिम अपडेट',
    colCreator: 'क्रिएटर',
    colHandle: 'हैंडल',
    colFollowers: 'फॉलोअर्स',
    colLikes: 'लाइक्स',
    colCountry: 'देश',
    colAction: 'प्रोफाइल',
    viewProfile: 'खोलें',
  },
};

interface CategoryDetailViewProps {
  category: CategoryData;
  creators: CreatorData[];
}

export default function CategoryDetailView({
  category,
  creators,
}: CategoryDetailViewProps) {
  const { lang, t, localizeHref } = useI18n();

  const bundle = getLocalizedCategoryBundle(category, lang);
  const localizedCategoryName = bundle.name;
  const localizedSubtitle = bundle.description;
  const localizedFaqs = bundle.faqs;
  const otherCategories = CATEGORIES.filter((c) => c.slug !== category.slug).slice(0, 4);
  const geoCopy = CATEGORY_GEO_COPY[lang] || CATEGORY_GEO_COPY.en;

  const topCreatorLabel = creators[0]
    ? `${creators[0].displayName} (@${creators[0].username})`
    : '@tiktok';

  const formattedUpdatedDate = new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(CATEGORY_UPDATED_ISO));

  return (
    <main id="main-content" className="flex-1 w-full flex flex-col">
      <TikTokProfileViewer
        initialUsername=""
        autoSearch={false}
        heroVariant="workbench"
        title={localizedCategoryName}
        subtitle={localizedSubtitle}
        breadcrumbs={
          <Breadcrumbs
            items={[
              {
                label: t('breadcrumb.categories'),
                href: '/categories',
                translationKey: 'breadcrumb.categories',
              },
              { label: localizedCategoryName },
            ]}
          />
        }
      >
        <div className="w-full flex flex-col">
          {/* Band 1: Featured Creators in this Niche */}
          <section className="w-full bg-[var(--surface-sunken)] border-b border-[var(--border-subtle)] py-10 sm:py-12">
            <div className="max-w-[1120px] mx-auto px-4 sm:px-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink-primary)] tracking-tight">
                    {t('page.category.topHeading', { name: localizedCategoryName })}
                  </h2>
                  <p className="text-sm text-[var(--ink-secondary)] mt-1">
                    {t('page.category.topSubtitle')}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {category.trendingTags.map((tag) => (
                    <span
                      key={tag}
                      dir="ltr"
                      className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-md bg-[var(--surface-elevated)] text-[var(--accent-cyan-text)] border border-[var(--accent-cyan)] shadow-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {creators.map((creator) => (
                  <Link
                    key={creator.username}
                    href={localizeHref(`/profile/${creator.username}`)}
                    className="p-4 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] shadow-[var(--shadow-card)] transition-colors duration-150 flex items-center gap-3.5 group"
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
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3
                        data-no-translate="true"
                        className="text-sm font-bold text-[var(--ink-primary)] group-hover:text-[var(--accent-cyan-text)] transition-colors truncate"
                      >
                        {creator.displayName}
                      </h3>
                      <p
                        dir="ltr"
                        data-no-translate="true"
                        className="text-xs font-mono font-semibold text-[var(--ink-muted)] truncate w-fit"
                      >
                        @{creator.username}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-[var(--ink-secondary)] font-medium mt-1 tabular-nums">
                        <span className="font-bold text-[var(--ink-primary)]">
                          {t('page.category.followersLabel', {
                            count: creator.followers,
                          })}
                        </span>
                        <span>•</span>
                        <span>
                          {t('page.category.likesLabel', {
                            count: creator.likes,
                          })}
                        </span>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-[var(--ink-muted)] group-hover:text-[var(--accent-cyan-text)] transition-colors shrink-0 rtl:rotate-180" />
                  </Link>
                ))}
              </div>

              {/* Answer-First Category Summary & Creator Comparison Table */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)] space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--ink-primary)] tracking-tight">
                    {geoCopy.overviewHeading(localizedCategoryName)}
                  </h2>
                  <div className="text-xs text-[var(--ink-muted)] font-medium">
                    {geoCopy.lastUpdatedLabel}:{' '}
                    <time dateTime={CATEGORY_UPDATED_ISO} className="font-semibold text-[var(--ink-primary)]">
                      {formattedUpdatedDate}
                    </time>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed max-w-[75ch]">
                  {geoCopy.answerText(localizedCategoryName, creators.length, topCreatorLabel)}
                </p>

                <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-canvas)]">
                  <table className="w-full text-start border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-[var(--ink-primary)]">
                        <th className="py-3 px-4 font-bold text-start">{geoCopy.colCreator}</th>
                        <th className="py-3 px-4 font-bold text-start">{geoCopy.colHandle}</th>
                        <th className="py-3 px-4 font-bold text-start">{geoCopy.colFollowers}</th>
                        <th className="py-3 px-4 font-bold text-start">{geoCopy.colLikes}</th>
                        <th className="py-3 px-4 font-bold text-start">{geoCopy.colCountry}</th>
                        <th className="py-3 px-4 font-bold text-end">{geoCopy.colAction}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--ink-secondary)]">
                      {creators.map((creator) => (
                        <tr key={creator.username} className="hover:bg-[var(--surface-elevated)] transition-colors">
                          <td data-no-translate="true" className="py-2.5 px-4 font-semibold text-[var(--ink-primary)] whitespace-nowrap">
                            {creator.displayName}
                          </td>
                          <td dir="ltr" data-no-translate="true" className="py-2.5 px-4 font-mono text-[11px]">
                            @{creator.username}
                          </td>
                          <td className="py-2.5 px-4 font-mono font-semibold text-[var(--ink-primary)] tabular-nums">
                            {creator.followers}
                          </td>
                          <td className="py-2.5 px-4 font-mono font-semibold text-[var(--accent-primary-text)] tabular-nums">
                            {creator.likes}
                          </td>
                          <td className="py-2.5 px-4 whitespace-nowrap">{creator.country}</td>
                          <td className="py-2.5 px-4 text-end">
                            <Link
                              href={localizeHref(`/profile/${creator.username}`)}
                              className="text-[var(--accent-cyan-text)] font-bold hover:underline"
                            >
                              {geoCopy.viewProfile}
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Band 2: Localized Category FAQs */}
          {localizedFaqs.length > 0 && (
            <section className="w-full bg-[var(--surface-elevated)] border-b border-[var(--border-subtle)] py-10 sm:py-12">
              <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
                <div className="text-center max-w-xl mx-auto mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink-primary)] tracking-tight">
                    {t('page.category.faqHeading', {
                      name: localizedCategoryName,
                    })}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {localizedFaqs.map((faq, index) => (
                    <div
                      key={index}
                      className="p-5 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)] flex flex-col gap-1.5"
                    >
                      <h3 className="text-sm font-bold text-[var(--ink-primary)]">
                        {faq.question}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-[var(--ink-secondary)] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Band 3: Explore Other Categories */}
          <section className="w-full bg-[var(--surface-canvas)] py-10 sm:py-12">
            <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-[var(--ink-primary)] tracking-tight">
                  {t('page.category.otherHeading')}
                </h2>
                <Link
                  href={localizeHref('/categories')}
                  className="text-xs font-bold text-[var(--accent-cyan-text)] hover:underline"
                >
                  {t('page.category.viewAll')}
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {otherCategories.map((c) => {
                  const cMap = CATEGORY_NICHE_KEY_MAP[c.slug];
                  const cName = cMap ? t(cMap.nameKey) : c.name;
                  return (
                    <Link
                      key={c.slug}
                      href={localizeHref(`/category/${c.slug}`)}
                      className="p-4 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] shadow-[var(--shadow-card)] text-xs sm:text-sm text-[var(--ink-primary)] hover:text-[var(--accent-cyan-text)] transition-colors duration-150 flex items-center justify-between"
                    >
                      <span className="truncate font-bold">{cName}</span>
                      <ChevronRight className="w-4 h-4 text-[var(--ink-muted)] shrink-0 rtl:rotate-180" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </TikTokProfileViewer>
    </main>
  );
}