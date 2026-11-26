import type { CategoryData } from '@/lib/creators-data';
import { UI_DICTIONARIES } from '@/lib/i18n/dictionaries-ui';
import { PAGE_DICTIONARIES } from '@/lib/i18n/dictionaries-pages';
import { interpolateTemplate, type LanguageCode } from '@/lib/i18n/types';

export interface CategoryFaqItem {
  question: string;
  answer: string;
}

export interface LocalizedCategoryBundle {
  name: string;
  description: string;
  metaTitle: string;
  metaDesc: string;
  faqs: CategoryFaqItem[];
}

export const CATEGORY_NICHE_KEY_MAP: Record<
  string,
  { nameKey: string; descKey: string }
> = {
  comedy: { nameKey: 'niches.c1', descKey: 'niches.c1Desc' },
  'food-cooking': { nameKey: 'niches.c2', descKey: 'niches.c2Desc' },
  'tech-ai': { nameKey: 'niches.c3', descKey: 'niches.c3Desc' },
  gaming: { nameKey: 'niches.c4', descKey: 'niches.c4Desc' },
  'fitness-sports': { nameKey: 'niches.c5', descKey: 'niches.c5Desc' },
  'dance-music': { nameKey: 'niches.c6', descKey: 'niches.c6Desc' },
  'beauty-fashion': { nameKey: 'niches.c7', descKey: 'niches.c7Desc' },
  'education-science': { nameKey: 'niches.c8', descKey: 'niches.c8Desc' },
  'travel-adventure': { nameKey: 'niches.c9', descKey: 'niches.c9Desc' },
  'pets-animals': { nameKey: 'niches.c10', descKey: 'niches.c10Desc' },
};

type CategorySlug =
  | 'comedy'
  | 'food-cooking'
  | 'tech-ai'
  | 'gaming'
  | 'fitness-sports'
  | 'dance-music'
  | 'beauty-fashion'
  | 'education-science'
  | 'travel-adventure'
  | 'pets-animals';

interface CategoryFaqTemplatePack {
  qDownload: (name: string) => string;
  aDownload: (name: string) => string;
  qAnonymous: (name: string) => string;
  aAnonymous: (name: string) => string;
  qAudio: (name: string) => string;
  aAudio: (name: string) => string;
}

const CATEGORY_TOP_CREATORS_BY_SLUG: Record<CategorySlug, string> = {
  comedy: '@khaby.lame, @zachking, @mrbeast',
  'food-cooking': '@cznburak, @gordonramsayofficial, @bayashi.tiktok',
  'tech-ai': '@mkbhd, @mrwhosetheboss, @supersaf',
  gaming: '@ninja, @pokimane, @sypherpk',
  'fitness-sports': '@demibagby, @leanbeefpatty, @chris_heria',
  'dance-music': '@charlidamelio, @bellapoarch, @addisonre',
  'beauty-fashion': '@mikaylanogueira, @jamescharles, @hyram',
  'education-science': '@hankgreen, @markrober, @nilered',
  'travel-adventure': '@nasdaily, @drewbinsky, @samkolder',
  'pets-animals': '@thatlittlepuff, @tuckerbudzyn, @jiffpom',
};

const LOCALIZED_CATEGORY_FAQ_PACKS: Record<
  Exclude<LanguageCode, 'en'>,
  CategoryFaqTemplatePack
> = {
  ar: {
    qDownload: (name) => `كيف يمكنني تنزيل فيديوهات ${name} بدون علامة مائية؟`,
    aDownload: (name) =>
      `افتح أي حساب في تصنيف ${name}، ثم اختر الفيديو واضغط على تنزيل فيديو HD لحفظ ملف MP4 نقي على جهازك بدون شعار تيك توك.`,
    qAnonymous: (name) => `هل يمكنني تصفح مبدعي ${name} بدون تسجيل الدخول؟`,
    aAnonymous: (name) =>
      `نعم. يمكنك استكشاف حسابات ${name} ومشاهدة المقاطع العامة بسرية تامة وبدون الحاجة إلى حساب تيك توك.`,
    qAudio: (name) => `هل تتوفر المقاطع الصوتية لفيديوهات ${name} بصيغة MP3؟`,
    aAudio: (name) =>
      `نعم. عند فتح أي فيديو في قسم ${name}، اضغط على زر تنزيل الصوت (MP3) لحفظ الصوت الأصلي مباشرة.`,
  },
  fr: {
    qDownload: (name) => `Comment télécharger des vidéos ${name} sans filigrane ?`,
    aDownload: (name) =>
      `Ouvrez un profil dans la catégorie ${name}, cliquez sur la vidéo voulue puis sur Télécharger Vidéo HD pour enregistrer un fichier MP4 propre sans logo.`,
    qAnonymous: (name) => `Puis-je consulter les créateurs ${name} sans compte TikTok ?`,
    aAnonymous: (name) =>
      `Oui. Tous les profils publics de la rubrique ${name} se consultent anonymement et sans connexion.`,
    qAudio: (name) => `Puis-je extraire le son MP3 des vidéos ${name} ?`,
    aAudio: (name) =>
      `Oui. Ouvrez n’importe quelle vidéo ${name} dans le lecteur et cliquez sur Télécharger Audio (MP3).`,
  },
  es: {
    qDownload: (name) => `¿Cómo descargar videos de ${name} sin marca de agua?`,
    aDownload: (name) =>
      `Abre cualquier perfil de ${name}, elige un video y pulsa Descargar Video HD para guardar el archivo MP4 limpio sin logotipo.`,
    qAnonymous: (name) => `¿Puedo ver creadores de ${name} sin tener cuenta?`,
    aAnonymous: (name) =>
      `Sí. Puedes navegar por los perfiles públicos de ${name} de forma anónima y sin iniciar sesión.`,
    qAudio: (name) => `¿Se puede guardar el audio en MP3 de los videos de ${name}?`,
    aAudio: (name) =>
      `Sí. Abre cualquier video de ${name} en el reproductor y pulsa Descargar Audio (MP3).`,
  },
  de: {
    qDownload: (name) => `Wie lade ich ${name}-Videos ohne Wasserzeichen herunter?`,
    aDownload: (name) =>
      `Öffne ein Profil in ${name}, klicke auf ein Video und wähle HD-Video herunterladen, um die saubere MP4-Datei ohne Logo zu sichern.`,
    qAnonymous: (name) => `Kann ich ${name}-Creator ohne TikTok-Konto ansehen?`,
    aAnonymous: (name) =>
      `Ja. Alle öffentlichen Konten im Bereich ${name} lassen sich anonym und ohne Anmeldung ansehen.`,
    qAudio: (name) => `Kann ich den Ton aus ${name}-Videos als MP3 speichern?`,
    aAudio: (name) =>
      `Ja. Öffne ein Video im Bereich ${name} und klicke auf Audio laden (MP3).`,
  },
  ru: {
    qDownload: (name) => `Как скачать видео из раздела «${name}» без водяного знака?`,
    aDownload: (name) =>
      `Откройте любой профиль в категории «${name}», выберите ролик и нажмите «Скачать HD видео», чтобы сохранить чистый MP4 без логотипа.`,
    qAnonymous: (name) => `Можно ли смотреть авторов в теме «${name}» без входа в аккаунт?`,
    aAnonymous: (name) =>
      `Да. Публичные профили категории «${name}» доступны анонимно и без регистрации в TikTok.`,
    qAudio: (name) => `Можно ли сохранить звук из роликов «${name}» в MP3?`,
    aAudio: (name) =>
      `Да. Откройте любое видео в разделе «${name}» и нажмите «Скачать аудио (MP3)».`,
  },
  zh: {
    qDownload: (name) => `如何下载无水印的${name}视频？`,
    aDownload: (name) =>
      `打开${name}分类中的任意创作者主页，点击想看的视频并选择“下载高清视频”，即可保存无标志的纯净 MP4 文件。`,
    qAnonymous: (name) => `没有账号可以浏览${name}创作者吗？`,
    aAnonymous: (name) =>
      `可以。您可以免登录匿名查看${name}分类中的所有公开主页与视频。`,
    qAudio: (name) => `可以把${name}视频里的声音保存为 MP3 吗？`,
    aAudio: (name) =>
      `可以。打开任意${name}视频后点击“下载音频 (MP3)”即可保存。`,
  },
  pt: {
    qDownload: (name) => `Como baixar vídeos de ${name} sem marca d’água?`,
    aDownload: (name) =>
      `Abra qualquer perfil de ${name}, toque no vídeo desejado e clique em Baixar Vídeo HD para salvar o MP4 limpo sem logotipo.`,
    qAnonymous: (name) => `Posso ver criadores de ${name} sem ter conta?`,
    aAnonymous: (name) =>
      `Sim. Todos os perfis públicos de ${name} podem ser vistos anonimamente e sem login.`,
    qAudio: (name) => `Posso salvar o áudio em MP3 dos vídeos de ${name}?`,
    aAudio: (name) =>
      `Sim. Abra qualquer vídeo em ${name} e clique em Baixar Áudio (MP3).`,
  },
  he: {
    qDownload: (name) => `איך מורידים סרטוני ${name} ללא סימן מים?`,
    aDownload: (name) =>
      `פתח כל פרופיל בקטגוריית ${name}, בחר סרטון ולחץ על הורד וידאו HD כדי לשמור קובץ MP4 נקי ללא לוגו.`,
    qAnonymous: (name) => `אפשר לצפות ביוצרי ${name} בלי חשבון טיקטוק?`,
    aAnonymous: (name) =>
      `כן. ניתן לגלוש בפרופילים ציבוריים בקטגוריית ${name} באנונימיות מלאה וללא התחברות.`,
    qAudio: (name) => `האם אפשר לשמור את השמע של סרטוני ${name} כ-MP3?`,
    aAudio: (name) =>
      `כן. פתח כל סרטון בקטגוריית ${name} ולחץ על הורד אודיו (MP3).`,
  },
  hi: {
    qDownload: (name) => `बिना वॉटरमार्क के ${name} वीडियो कैसे डाउनलोड करें?`,
    aDownload: (name) =>
      `${name} श्रेणी में कोई भी प्रोफाइल खोलें, वीडियो चुनें और साफ MP4 फ़ाइल सेव करने के लिए HD वीडियो डाउनलोड करें दबाएं।`,
    qAnonymous: (name) => `क्या मैं बिना अकाउंट के ${name} क्रिएटर्स देख सकता हूँ?`,
    aAnonymous: (name) =>
      `हाँ। आप बिना लॉगिन के ${name} श्रेणी की सभी पब्लिक प्रोफाइल गुमनाम रूप से देख सकते हैं।`,
    qAudio: (name) => `क्या ${name} वीडियो का ऑडियो MP3 में सेव किया जा सकता है?`,
    aAudio: (name) =>
      `हाँ। ${name} का कोई भी वीडियो खोलें और ऑडियो डाउनलोड करें (MP3) पर क्लिक करें।`,
  },
};

function buildPopularCreatorQuestion(
  lang: Exclude<LanguageCode, 'en'>,
  name: string,
  handles: string
): CategoryFaqItem {
  switch (lang) {
    case 'ar':
      return {
        question: `من هم أشهر مبدعي ${name} على تيك توك؟`,
        answer: `من أبرز الحسابات العامة في مجال ${name}: ${handles}. يمكنك تصفح فيديوهاتهم وتنزيل المقاطع بجودة HD مباشرة.`,
      };
    case 'fr':
      return {
        question: `Qui sont les créateurs populaires dans ${name} sur TikTok ?`,
        answer: `Parmi les profils publics connus dans ${name}, on retrouve ${handles}. Vous pouvez consulter leurs vidéos directement ici.`,
      };
    case 'es':
      return {
        question: `¿Quiénes son algunos creadores populares de ${name} en TikTok?`,
        answer: `Entre los perfiles públicos más conocidos de ${name} están ${handles}. Puedes explorar sus videos y descargarlos en HD.`,
      };
    case 'de':
      return {
        question: `Welche bekannten Creator gibt es im Bereich ${name} auf TikTok?`,
        answer: `Bekannte öffentliche Konten in ${name} sind unter anderem ${handles}. Du kannst ihre Videos direkt hier ansehen und speichern.`,
      };
    case 'ru':
      return {
        question: `Какие известные авторы представлены в категории «${name}»?`,
        answer: `Среди популярных публичных профилей категории «${name}»: ${handles}. Вы можете сразу открыть их ролики и скачать видео в HD.`,
      };
    case 'zh':
      return {
        question: `${name}分类中有哪些热门 TikTok 创作者？`,
        answer: `${name}领域的知名公开账号包括 ${handles}，您可以直接查看他们的主页与高清视频。`,
      };
    case 'pt':
      return {
        question: `Quais são alguns criadores populares de ${name} no TikTok?`,
        answer: `Contas públicas conhecidas em ${name} incluem ${handles}. Você pode ver seus perfis e baixar vídeos em HD diretamente.`,
      };
    case 'he':
      return {
        question: `מי הם יוצרים מוכרים בתחום ${name} בטיקטוק?`,
        answer: `בין החשבונות הציבוריים המובילים בקטגוריית ${name} נמצאים ${handles}. ניתן לצפות בסרטונים שלהם ולהוריד באיכות HD.`,
      };
    case 'hi':
      return {
        question: `${name} श्रेणी में लोकप्रिय TikTok क्रिएटर्स कौन हैं?`,
        answer: `${name} के प्रमुख पब्लिक क्रिएटर्स में ${handles} शामिल हैं। आप उनके प्रोफाइल और वीडियो सीधे यहाँ देख सकते हैं।`,
      };
  }
}

export function getLocalizedCategoryBundle(
  category: CategoryData,
  lang: LanguageCode
): LocalizedCategoryBundle {
  const uiDict = UI_DICTIONARIES[lang] || UI_DICTIONARIES.en;
  const pageDict = PAGE_DICTIONARIES[lang] || PAGE_DICTIONARIES.en;
  const keyMap = CATEGORY_NICHE_KEY_MAP[category.slug];

  const localizedName = keyMap ? uiDict[keyMap.nameKey] || category.name : category.name;
  const localizedDesc = keyMap
    ? uiDict[keyMap.descKey] || category.shortDescription
    : category.shortDescription;

  const metaTitle =
    lang === 'en'
      ? category.title
      : interpolateTemplate(
          pageDict['page.category.metaTitle'] ||
            '{name} TikTok Creators & Free HD Videos Without Watermark',
          { name: localizedName }
        );

  const metaDesc =
    lang === 'en'
      ? category.seoDescription
      : interpolateTemplate(
          pageDict['page.category.metaDesc'] ||
            'Browse top {name} TikTok creators anonymously with no login.',
          { name: localizedName }
        );

  if (lang === 'en') {
    return {
      name: localizedName,
      description: localizedDesc,
      metaTitle,
      metaDesc,
      faqs: category.faqs,
    };
  }

  const pack = LOCALIZED_CATEGORY_FAQ_PACKS[lang];
  const handles =
    CATEGORY_TOP_CREATORS_BY_SLUG[category.slug as CategorySlug] ||
    category.creatorUsernames
      .slice(0, 3)
      .map((u) => `@${u}`)
      .join(', ');

  return {
    name: localizedName,
    description: localizedDesc,
    metaTitle,
    metaDesc,
    faqs: [
      buildPopularCreatorQuestion(lang, localizedName, handles),
      {
        question: pack.qDownload(localizedName),
        answer: pack.aDownload(localizedName),
      },
      {
        question: pack.qAnonymous(localizedName),
        answer: pack.aAnonymous(localizedName),
      },
      {
        question: pack.qAudio(localizedName),
        answer: pack.aAudio(localizedName),
      },
    ],
  };
}