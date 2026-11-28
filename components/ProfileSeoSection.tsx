// File: components/ProfileSeoSection.tsx
'use client';

import Link from 'next/link';
import { ChevronRight, Globe, Film, Music, BarChart3, Users } from 'lucide-react';
import type { CreatorData } from '@/lib/creators-data';
import { useI18n } from '@/lib/i18n/context';
import type { LanguageCode } from '@/lib/i18n/types';

const CATEGORY_TRANSLATION_MAP: Record<string, string> = {
  comedy: 'niches.c1',
  'food-cooking': 'niches.c2',
  'tech-ai': 'niches.c3',
  gaming: 'niches.c4',
  'fitness-sports': 'niches.c5',
  'dance-music': 'niches.c6',
  'beauty-fashion': 'niches.c7',
  'education-science': 'niches.c8',
  'travel-adventure': 'niches.c9',
  'pets-animals': 'niches.c10',
};

const PROFILE_UPDATED_ISO = '2026-11-28T00:00:00.000Z';

interface ProfileGeoCopy {
  overviewHeading: (handle: string) => string;
  answerKnown: (p: {
    name: string;
    handle: string;
    category: string;
    followers: string;
    likes: string;
    country: string;
  }) => string;
  answerUnknown: (handle: string) => string;
  lastUpdatedLabel: string;
  colField: string;
  colValue: string;
  rowHandle: string;
  rowCategory: string;
  rowFollowers: string;
  rowLikes: string;
  rowCountry: string;
  rowAccess: string;
  rowStatus: string;
  accessValue: string;
  relatedHeading: string;
  relatedSubtitle: string;
  browseCategories: string;
}

const PROFILE_GEO_COPY: Record<LanguageCode, ProfileGeoCopy> = {
  en: {
    overviewHeading: (handle) => `Profile Summary for @${handle}`,
    answerKnown: ({ name, handle, category, followers, likes, country }) =>
      `${name} (@${handle}) is a verified public TikTok creator based in ${country} in the ${category} category, with ${followers} followers and ${likes} total likes. You can inspect this public profile above without logging in, watch uploaded videos smoothly in your browser, and download clean HD MP4 clips or MP3 audio files for free.`,
    answerUnknown: (handle) =>
      `The public viewer above looks up @${handle} directly from open TikTok web feeds with no login required. If @${handle} is a public account, you can inspect live follower counts, view recent videos in your browser, and save clean HD MP4 videos or MP3 audio tracks without watermarks.`,
    lastUpdatedLabel: 'Last Updated',
    colField: 'Profile Field',
    colValue: 'Verified Public Value',
    rowHandle: 'TikTok Handle',
    rowCategory: 'Primary Category',
    rowFollowers: 'Followers',
    rowLikes: 'Total Likes',
    rowCountry: 'Country / Region',
    rowAccess: 'Viewer Access',
    rowStatus: 'Verification Status',
    accessValue: 'Public, no login required',
    relatedHeading: 'Related Creators in This Category',
    relatedSubtitle: 'Explore similar public accounts and compare creator profiles.',
    browseCategories: 'All Categories',
  },
  ar: {
    overviewHeading: (handle) => `ملخص حساب @${handle}`,
    answerKnown: ({ name, handle, category, followers, likes, country }) =>
      `يُعد ${name} (@${handle}) صانع محتوى عام موثق على تيك توك من ${country} ضمن تصنيف ${category}، ولديه ${followers} متابع وإجمالي ${likes} إعجاب. يمكنك فحص هذا الحساب أعلاه بدون تسجيل دخول، ومشاهدة الفيديوهات بسلاسة في المتصفح، وتنزيل مقاطع MP4 بجودة HD أو ملفات صوت MP3 مجاناً.`,
    answerUnknown: (handle) =>
      `يبحث العارض العام أعلاه عن حساب @${handle} مباشرة من بيانات تيك توك المفتوحة بدون تسجيل دخول. إذا كان @${handle} حساباً عاماً، يمكنك رؤية عدد المتابعين ومشاهدة المقاطع الأخيرة وحفظ فيديوهات MP4 عالية الدقة أو الصوت بصيغة MP3 بدون علامة مائية.`,
    lastUpdatedLabel: 'آخر تحديث',
    colField: 'بيانات الحساب',
    colValue: 'القيمة العامة',
    rowHandle: 'معرف تيك توك',
    rowCategory: 'التصنيف الرئيسي',
    rowFollowers: 'المتابعون',
    rowLikes: 'إجمالي الإعجابات',
    rowCountry: 'الدولة / المنطقة',
    rowAccess: 'طريقة الوصول',
    rowStatus: 'حالة التوثيق',
    accessValue: 'حساب عام بدون تسجيل دخول',
    relatedHeading: 'مبدعون مرتبطون في هذا التصنيف',
    relatedSubtitle: 'تصفح حسابات عامة مشابهة وقارن بين ملفات المبدعين.',
    browseCategories: 'كل التصنيفات',
  },
  fr: {
    overviewHeading: (handle) => `Résumé du profil @${handle}`,
    answerKnown: ({ name, handle, category, followers, likes, country }) =>
      `${name} (@${handle}) est un créateur TikTok public vérifié basé en ${country} dans la catégorie ${category}, avec ${followers} abonnés et ${likes} mentions j’aime. Vous pouvez consulter ce profil ci-dessus sans connexion, regarder ses vidéos avec fluidité et télécharger des fichiers MP4 HD ou MP3 gratuitement.`,
    answerUnknown: (handle) =>
      `La visionneuse publique ci-dessus recherche @${handle} directement depuis les flux publics TikTok sans connexion requise. Si @${handle} est un compte public, vous pouvez consulter ses abonnés en direct, lire ses vidéos récentes et enregistrer des MP4 HD ou pistes MP3 sans filigrane.`,
    lastUpdatedLabel: 'Dernière mise à jour',
    colField: 'Champ du profil',
    colValue: 'Valeur publique',
    rowHandle: 'Identifiant TikTok',
    rowCategory: 'Catégorie principale',
    rowFollowers: 'Abonnés',
    rowLikes: 'J’aime totaux',
    rowCountry: 'Pays / Région',
    rowAccess: 'Accès lecteur',
    rowStatus: 'Statut de vérification',
    accessValue: 'Public, sans connexion',
    relatedHeading: 'Créateurs similaires dans cette catégorie',
    relatedSubtitle: 'Découvrez d’autres profils publics proches et explorez leurs vidéos.',
    browseCategories: 'Toutes les catégories',
  },
  es: {
    overviewHeading: (handle) => `Resumen del perfil @${handle}`,
    answerKnown: ({ name, handle, category, followers, likes, country }) =>
      `${name} (@${handle}) es un creador público verificado de TikTok en ${country} dentro de la categoría ${category}, con ${followers} seguidores y ${likes} me gusta totales. Puedes revisar este perfil arriba sin iniciar sesión, ver sus videos sin cortes y descargar MP4 HD o audio MP3 gratis.`,
    answerUnknown: (handle) =>
      `El visor público superior busca a @${handle} directamente desde fuentes abiertas de TikTok sin necesidad de cuenta. Si @${handle} es una cuenta pública, puedes consultar sus seguidores en vivo, ver videos recientes en tu navegador y guardar MP4 HD o MP3 sin marca de agua.`,
    lastUpdatedLabel: 'Última actualización',
    colField: 'Campo del perfil',
    colValue: 'Valor público',
    rowHandle: 'Usuario de TikTok',
    rowCategory: 'Categoría principal',
    rowFollowers: 'Seguidores',
    rowLikes: 'Me gusta totales',
    rowCountry: 'País / Región',
    rowAccess: 'Acceso al visor',
    rowStatus: 'Estado de verificación',
    accessValue: 'Público, sin registro',
    relatedHeading: 'Creadores relacionados en esta categoría',
    relatedSubtitle: 'Explora cuentas públicas similares y compara perfiles.',
    browseCategories: 'Todas las categorías',
  },
  de: {
    overviewHeading: (handle) => `Profilübersicht für @${handle}`,
    answerKnown: ({ name, handle, category, followers, likes, country }) =>
      `${name} (@${handle}) ist ein verifizierter öffentlicher TikTok-Creator aus ${country} in der Kategorie ${category} mit ${followers} Followern und ${likes} Likes insgesamt. Du kannst dieses Profil oben ohne Login ansehen, Videos flüssig abspielen und saubere HD-MP4- oder MP3-Dateien kostenlos laden.`,
    answerUnknown: (handle) =>
      `Der öffentliche Viewer oben sucht @${handle} direkt über offene TikTok-Feeds ohne Anmeldung. Wenn @${handle} ein öffentliches Konto ist, siehst du aktuelle Follower-Zahlen, kannst neue Videos im Browser abspielen und HD-MP4 oder MP3 ohne Wasserzeichen speichern.`,
    lastUpdatedLabel: 'Zuletzt aktualisiert',
    colField: 'Profilfeld',
    colValue: 'Öffentlicher Wert',
    rowHandle: 'TikTok-Name',
    rowCategory: 'Hauptkategorie',
    rowFollowers: 'Follower',
    rowLikes: 'Likes gesamt',
    rowCountry: 'Land / Region',
    rowAccess: 'Zugriff',
    rowStatus: 'Verifizierungsstatus',
    accessValue: 'Öffentlich, ohne Login',
    relatedHeading: 'Ähnliche Creator in dieser Kategorie',
    relatedSubtitle: 'Entdecke weitere öffentliche Konten aus demselben Themenbereich.',
    browseCategories: 'Alle Kategorien',
  },
  ru: {
    overviewHeading: (handle) => `Обзор профиля @${handle}`,
    answerKnown: ({ name, handle, category, followers, likes, country }) =>
      `${name} (@${handle}) является подтвержденным публичным автором TikTok (${country}) в категории «${category}» с аудиторией ${followers} подписчиков и ${likes} лайков. Вы можете изучить профиль выше без входа в аккаунт, смотреть видео в браузере и бесплатно скачивать чистые HD MP4 и MP3.`,
    answerUnknown: (handle) =>
      `Публичный просмотрщик выше ищет @${handle} напрямую через открытые данные TikTok без регистрации. Если @${handle} является открытым профилем, вы сможете увидеть статистику подписчиков, смотреть ролики и сохранять HD MP4 или MP3 без водяного знака.`,
    lastUpdatedLabel: 'Последнее обновление',
    colField: 'Параметр профиля',
    colValue: 'Публичные данные',
    rowHandle: 'Ник в TikTok',
    rowCategory: 'Основная категория',
    rowFollowers: 'Подписчики',
    rowLikes: 'Всего лайков',
    rowCountry: 'Страна / регион',
    rowAccess: 'Доступ',
    rowStatus: 'Статус проверки',
    accessValue: 'Открытый профиль, без входа',
    relatedHeading: 'Похожие авторы в этой категории',
    relatedSubtitle: 'Откройте другие публичные профили близкой тематики.',
    browseCategories: 'Все категории',
  },
  zh: {
    overviewHeading: (handle) => `@${handle} 主页概览`,
    answerKnown: ({ name, handle, category, followers, likes, country }) =>
      `${name} (@${handle}) 是来自 ${country} 的已认证公开 TikTok 创作者，属于 ${category} 分类，拥有 ${followers} 粉丝和 ${likes} 总获赞。您可以无需登录直接在上方查看其公开主页、流畅播放视频并免费下载无水印高清 MP4 或 MP3 音频。`,
    answerUnknown: (handle) =>
      `上方的公开主页查看器会免登录直接查询 @${handle} 的公开数据。如果 @${handle} 为公开账号，您可以查看实时粉丝数、在浏览器中观看近期视频，并保存无水印高清 MP4 视频或 MP3 音轨。`,
    lastUpdatedLabel: '最近更新',
    colField: '主页项目',
    colValue: '公开数据',
    rowHandle: 'TikTok 账号',
    rowCategory: '所属分类',
    rowFollowers: '粉丝数',
    rowLikes: '总获赞数',
    rowCountry: '国家 / 地区',
    rowAccess: '访问方式',
    rowStatus: '认证状态',
    accessValue: '公开主页，无需登录',
    relatedHeading: '同分类相关创作者',
    relatedSubtitle: '探索更多同领域公开创作者并对比主页数据。',
    browseCategories: '全部分类',
  },
  pt: {
    overviewHeading: (handle) => `Resumo do perfil @${handle}`,
    answerKnown: ({ name, handle, category, followers, likes, country }) =>
      `${name} (@${handle}) é um criador público verificado no TikTok em ${country}, na categoria ${category}, com ${followers} seguidores e ${likes} curtidas no total. Você pode ver este perfil acima sem login, assistir aos vídeos com fluidez e baixar MP4 HD ou MP3 grátis.`,
    answerUnknown: (handle) =>
      `O visualizador público acima busca @${handle} diretamente nos feeds abertos do TikTok sem exigir login. Se @${handle} for uma conta pública, você pode ver seguidores ao vivo, assistir aos vídeos no navegador e salvar MP4 HD ou MP3 sem marca d’água.`,
    lastUpdatedLabel: 'Última atualização',
    colField: 'Campo do perfil',
    colValue: 'Valor público',
    rowHandle: 'Usuário do TikTok',
    rowCategory: 'Categoria principal',
    rowFollowers: 'Seguidores',
    rowLikes: 'Curtidas totais',
    rowCountry: 'País / Região',
    rowAccess: 'Acesso ao leitor',
    rowStatus: 'Verificação',
    accessValue: 'Público, sem login',
    relatedHeading: 'Criadores relacionados nesta categoria',
    relatedSubtitle: 'Explore contas públicas parecidas e compare perfis.',
    browseCategories: 'Todas as categorias',
  },
  he: {
    overviewHeading: (handle) => `סקירת פרופיל עבור @${handle}`,
    answerKnown: ({ name, handle, category, followers, likes, country }) =>
      `${name} (@${handle}) הוא יוצר ציבורי מאומת בטיקטוק מ-${country} בקטגוריית ${category}, עם ${followers} עוקבים ו-${likes} לייקים בסך הכול. ניתן לבדוק את הפרופיל למעלה ללא התחברות, לצפות בסרטונים בדפדפן ולהוריד קובצי MP4 HD או MP3 בחינם.`,
    answerUnknown: (handle) =>
      `המציג הציבורי למעלה מאתר את @${handle} ישירות מהמידע הפתוח בטיקטוק ללא התחברות. אם @${handle} הוא חשבון ציבורי, אפשר לראות עוקבים, לצפות בסרטונים ולשמור קובצי MP4 HD או MP3 ללא סימן מים.`,
    lastUpdatedLabel: 'עודכן לאחרונה',
    colField: 'שדה פרופיל',
    colValue: 'ערך ציבורי',
    rowHandle: 'כינוי טיקטוק',
    rowCategory: 'קטגוריה ראשית',
    rowFollowers: 'עוקבים',
    rowLikes: 'סה״כ לייקים',
    rowCountry: 'מדינה / אזור',
    rowAccess: 'גישה לצפייה',
    rowStatus: 'סטטוס אימות',
    accessValue: 'ציבורי, ללא התחברות',
    relatedHeading: 'יוצרים קשורים בקטגוריה זו',
    relatedSubtitle: 'גלה חשבונות ציבוריים דומים מאותו תחום.',
    browseCategories: 'כל הקטגוריות',
  },
  hi: {
    overviewHeading: (handle) => `@${handle} प्रोफाइल सारांश`,
    answerKnown: ({ name, handle, category, followers, likes, country }) =>
      `${name} (@${handle}) ${country} के एक सत्यापित पब्लिक TikTok क्रिएटर हैं और ${category} श्रेणी में ${followers} फॉलोअर्स व ${likes} कुल लाइक्स रखते हैं। आप ऊपर बिना लॉगिन इस प्रोफाइल को देख सकते हैं, वीडियो चला सकते हैं और मुफ्त में साफ HD MP4 या MP3 ऑडियो सेव कर सकते हैं।`,
    answerUnknown: (handle) =>
      `ऊपर दिया गया पब्लिक व्यूअर बिना लॉगिन सीधे खुले TikTok फ़ीड से @${handle} को खोजता है। यदि @${handle} एक पब्लिक अकाउंट है, तो आप लाइव फॉलोअर्स देख सकते हैं, ब्राउज़र में वीडियो चला सकते हैं और बिना वॉटरमार्क HD MP4 या MP3 सेव कर सकते हैं।`,
    lastUpdatedLabel: 'अंतिम अपडेट',
    colField: 'प्रोफाइल विवरण',
    colValue: 'पब्लिक मान',
    rowHandle: 'TikTok हैंडल',
    rowCategory: 'मुख्य श्रेणी',
    rowFollowers: 'फॉलोअर्स',
    rowLikes: 'कुल लाइक्स',
    rowCountry: 'देश / क्षेत्र',
    rowAccess: 'व्यूअर एक्सेस',
    rowStatus: 'सत्यापन स्थिति',
    accessValue: 'पब्लिक, बिना लॉगिन',
    relatedHeading: 'इस श्रेणी में संबंधित क्रिएटर्स',
    relatedSubtitle: 'इसी विषय के अन्य पब्लिक क्रिएटर प्रोफाइल देखें।',
    browseCategories: 'सभी श्रेणियां',
  },
};

interface ProfileSeoSectionProps {
  username: string;
  creator?: CreatorData;
  relatedCreators: CreatorData[];
}

export default function ProfileSeoSection({
  username,
  creator,
  relatedCreators,
}: ProfileSeoSectionProps) {
  const { lang, t, localizeHref } = useI18n();
  const geoCopy = PROFILE_GEO_COPY[lang] || PROFILE_GEO_COPY.en;

  const categoryLabel = creator
    ? CATEGORY_TRANSLATION_MAP[creator.categorySlug]
      ? t(CATEGORY_TRANSLATION_MAP[creator.categorySlug])
      : creator.category
    : null;

  const formattedUpdatedDate = new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(PROFILE_UPDATED_ISO));

  const answerParagraph =
    creator && categoryLabel
      ? geoCopy.answerKnown({
          name: creator.displayName,
          handle: creator.username,
          category: categoryLabel,
          followers: creator.followers,
          likes: creator.likes,
          country: creator.country,
        })
      : geoCopy.answerUnknown(username);

  return (
    <div className="w-full flex flex-col">
      {/* Band 1: Server-Rendered Creator Overview, Metrics Table & Intra-Silo Tool Links */}
      <section className="w-full bg-[var(--surface-elevated)] border-t border-[var(--border-subtle)] py-10 sm:py-12">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 space-y-6">
          <div className="p-5 sm:p-6 rounded-2xl bg-[var(--surface-canvas)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)] space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <h2
                    data-no-translate="true"
                    className="text-lg sm:text-xl font-bold text-[var(--ink-primary)] tracking-tight"
                  >
                    {geoCopy.overviewHeading(creator ? creator.username : username)}
                  </h2>
                  {creator?.verified && (
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-[var(--pastel-blue)] border border-[var(--pastel-blue-border)] text-[var(--accent-cyan-text)]">
                      {t('profile.verified')}
                    </span>
                  )}
                  {creator?.country && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--ink-secondary)]">
                      <Globe className="w-3 h-3 text-[var(--accent-cyan-text)]" />
                      <span>{creator.country}</span>
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed max-w-[75ch]">
                  {answerParagraph}
                </p>

                <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
                  {creator && categoryLabel && (
                    <Link
                      href={localizeHref(`/category/${creator.categorySlug}`)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[var(--surface-elevated)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] text-[var(--ink-primary)] font-semibold transition-colors"
                    >
                      <span>{categoryLabel}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[var(--accent-cyan-text)] rtl:rotate-180" />
                    </Link>
                  )}
                  <Link
                    href={localizeHref('/creators')}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[var(--surface-elevated)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] font-semibold transition-colors"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>{t('nav.creators')}</span>
                  </Link>
                  <Link
                    href={localizeHref('/categories')}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[var(--surface-elevated)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] font-semibold transition-colors"
                  >
                    <span>{geoCopy.browseCategories}</span>
                  </Link>
                  <span className="text-[11px] text-[var(--ink-muted)] font-medium ms-auto">
                    {geoCopy.lastUpdatedLabel}:{' '}
                    <time dateTime={PROFILE_UPDATED_ISO} className="font-semibold text-[var(--ink-primary)]">
                      {formattedUpdatedDate}
                    </time>
                  </span>
                </div>
              </div>

              {creator && (
                <div className="grid grid-cols-2 gap-3 shrink-0 tabular-nums">
                  <div className="px-4 py-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-center min-w-[110px]">
                    <div className="text-[11px] font-semibold text-[var(--ink-muted)] uppercase">
                      {t('profile.followers')}
                    </div>
                    <div className="text-base sm:text-lg font-bold text-[var(--ink-primary)] font-mono mt-0.5">
                      {creator.followers}
                    </div>
                  </div>
                  <div className="px-4 py-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-center min-w-[110px]">
                    <div className="text-[11px] font-semibold text-[var(--ink-muted)] uppercase">
                      {t('profile.totalLikes')}
                    </div>
                    <div className="text-base sm:text-lg font-bold text-[var(--accent-primary-text)] font-mono mt-0.5">
                      {creator.likes}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Structured Creator Metrics Table */}
            {creator && categoryLabel && (
              <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                <table className="w-full text-start border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-[var(--ink-primary)]">
                      <th className="py-2.5 px-4 font-bold text-start">{geoCopy.colField}</th>
                      <th className="py-2.5 px-4 font-bold text-start">{geoCopy.colValue}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--ink-secondary)]">
                    <tr>
                      <td className="py-2.5 px-4 font-semibold text-[var(--ink-primary)]">{geoCopy.rowHandle}</td>
                      <td dir="ltr" data-no-translate="true" className="py-2.5 px-4 font-mono">
                        @{creator.username}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-semibold text-[var(--ink-primary)]">{geoCopy.rowCategory}</td>
                      <td className="py-2.5 px-4">
                        <Link
                          href={localizeHref(`/category/${creator.categorySlug}`)}
                          className="text-[var(--accent-cyan-text)] font-semibold hover:underline"
                        >
                          {categoryLabel}
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-semibold text-[var(--ink-primary)]">{geoCopy.rowFollowers}</td>
                      <td className="py-2.5 px-4 font-mono font-semibold text-[var(--ink-primary)] tabular-nums">
                        {creator.followers}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-semibold text-[var(--ink-primary)]">{geoCopy.rowLikes}</td>
                      <td className="py-2.5 px-4 font-mono font-semibold text-[var(--accent-primary-text)] tabular-nums">
                        {creator.likes}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-semibold text-[var(--ink-primary)]">{geoCopy.rowCountry}</td>
                      <td className="py-2.5 px-4">{creator.country}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-semibold text-[var(--ink-primary)]">{geoCopy.rowStatus}</td>
                      <td className="py-2.5 px-4">
                        {creator.verified ? t('profile.verified') : t('profile.publicAccount')}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-semibold text-[var(--ink-primary)]">{geoCopy.rowAccess}</td>
                      <td className="py-2.5 px-4">{geoCopy.accessValue}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Direct Tool Shortcuts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href={localizeHref('/tiktok-video-downloader')}
              className="p-4 rounded-xl bg-[var(--surface-canvas)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] transition-colors flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[var(--accent-soft)] text-[var(--accent-primary-text)] border border-[var(--pastel-pink-border)] flex items-center justify-center shrink-0">
                  <Film className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[var(--ink-primary)] truncate">
                    {t('nav.tool.video.label')}
                  </div>
                  <div className="text-[11px] text-[var(--ink-muted)] truncate">
                    {t('nav.tool.video.desc')}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[var(--ink-muted)] group-hover:text-[var(--accent-cyan-text)] shrink-0 rtl:rotate-180" />
            </Link>

            <Link
              href={localizeHref('/tiktok-mp3-downloader')}
              className="p-4 rounded-xl bg-[var(--surface-canvas)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] transition-colors flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[var(--accent-cyan-soft)] text-[var(--accent-cyan-text)] border border-[var(--accent-cyan)] flex items-center justify-center shrink-0">
                  <Music className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[var(--ink-primary)] truncate">
                    {t('nav.tool.mp3.label')}
                  </div>
                  <div className="text-[11px] text-[var(--ink-muted)] truncate">
                    {t('nav.tool.mp3.desc')}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[var(--ink-muted)] group-hover:text-[var(--accent-cyan-text)] shrink-0 rtl:rotate-180" />
            </Link>

            <Link
              href={localizeHref('/tiktok-analytics')}
              className="p-4 rounded-xl bg-[var(--surface-canvas)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] transition-colors flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[var(--surface-elevated)] text-[var(--ink-primary)] border border-[var(--border-strong)] flex items-center justify-center shrink-0">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[var(--ink-primary)] truncate">
                    {t('nav.tool.analytics.label')}
                  </div>
                  <div className="text-[11px] text-[var(--ink-muted)] truncate">
                    {t('nav.tool.analytics.desc')}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[var(--ink-muted)] group-hover:text-[var(--accent-cyan-text)] shrink-0 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* Band 2: Related Creators Internal Linking (70/30 Silo) */}
      {relatedCreators.length > 0 && (
        <section className="w-full bg-[var(--surface-canvas)] border-t border-[var(--border-subtle)] py-10 sm:py-12">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink-primary)] tracking-tight">
                  {creator ? geoCopy.relatedHeading : t('home.trendingTitle')}
                </h2>
                <p className="text-xs sm:text-sm text-[var(--ink-secondary)] mt-1">
                  {creator ? geoCopy.relatedSubtitle : t('home.trendingSubtitle')}
                </p>
              </div>
              <Link
                href={localizeHref('/creators')}
                className="text-xs font-bold text-[var(--accent-cyan-text)] hover:underline shrink-0"
              >
                {t('home.viewAllCreators')}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {relatedCreators.map((item) => (
                <Link
                  key={item.username}
                  href={localizeHref(`/profile/${item.username}`)}
                  className="p-4 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--pastel-blue)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] shadow-[var(--shadow-card)] transition-colors flex items-center gap-3.5 group"
                >
                  <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-[var(--surface-sunken)] shrink-0 border border-[var(--border-subtle)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        item.avatar ||
                        `/api/avatar?username=${encodeURIComponent(item.username)}`
                      }
                      alt={item.displayName}
                      width={44}
                      height={44}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div
                      data-no-translate="true"
                      className="text-sm font-bold text-[var(--ink-primary)] group-hover:text-[var(--accent-cyan-text)] transition-colors truncate"
                    >
                      {item.displayName}
                    </div>
                    <div
                      dir="ltr"
                      data-no-translate="true"
                      className="text-[11px] font-mono font-semibold text-[var(--ink-muted)] truncate w-fit"
                    >
                      @{item.username}
                    </div>
                    <div className="text-[11px] text-[var(--ink-secondary)] font-semibold mt-0.5 tabular-nums">
                      {t('home.followersLabel', { count: item.followers })}
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-[var(--ink-muted)] group-hover:text-[var(--accent-cyan-text)] shrink-0 rtl:rotate-180" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}