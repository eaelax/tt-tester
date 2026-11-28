// File: components/LocalizedToolView.tsx
'use client';

import {
  Film,
  Zap,
  Download,
  Volume2,
  Music,
  EyeOff,
  UserCheck,
  BarChart2,
  Clock,
  Layers,
  ShieldCheck,
  Image as ImageIcon,
  Eraser,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import TikTokProfileViewer from '@/components/TikTokProfileViewer';
import CreatorToolsSection from '@/components/CreatorToolsSection';
import AdSlot from '@/components/AdSlot';
import { useI18n } from '@/lib/i18n/context';
import type { LanguageCode } from '@/lib/i18n/types';

export type ToolKey =
  | 'videoDl'
  | 'mp3Dl'
  | 'viewer'
  | 'storyDl'
  | 'photoDl'
  | 'watermark';

export type ToolIconName =
  | 'film'
  | 'zap'
  | 'download'
  | 'volume2'
  | 'music'
  | 'eyeOff'
  | 'userCheck'
  | 'barChart2'
  | 'clock'
  | 'layers'
  | 'shieldCheck'
  | 'image'
  | 'eraser';

export interface ToolFeatureItem {
  readonly titleKey: string;
  readonly descKey: string;
  readonly iconName: ToolIconName;
  readonly iconBgClass: string;
  readonly iconTextClass: string;
  readonly iconBorderClass?: string;
}

export interface ToolFaqItem {
  readonly qKey: string;
  readonly aKey: string;
}

interface LocalizedToolViewProps {
  toolKey: ToolKey;
  features: readonly ToolFeatureItem[];
  faqs: readonly ToolFaqItem[];
  showAdSlot?: boolean;
}

const TOOL_UPDATED_ISO = '2026-11-28T00:00:00.000Z';

interface ToolGeoStrings {
  lastUpdatedLabel: string;
  stepsHeading: string;
  step1: string;
  step2: string;
  step3: string;
  tableHeading: string;
  colTool: string;
  colFormat: string;
  colWatermark: string;
  colAccount: string;
  noWatermark: string;
  noAccount: string;
  summaries: Record<ToolKey, string>;
  rows: {
    key: ToolKey;
    labelKey: string;
    format: string;
  }[];
}

const TOOL_GEO_COPY: Record<LanguageCode, ToolGeoStrings> = {
  en: {
    lastUpdatedLabel: 'Last Updated',
    stepsHeading: 'Step-by-Step Guide',
    step1: 'Enter any public TikTok @username or paste a public video or photo post link into the search bar above.',
    step2: 'Select the post you want from the profile grid or wait for the direct post preview to load in your browser.',
    step3: 'Click Download HD Video, Save Slide, or Download Audio (MP3) to save the clean file directly to your device.',
    tableHeading: 'Supported Tool Formats',
    colTool: 'Tool',
    colFormat: 'Output Format',
    colWatermark: 'Watermark',
    colAccount: 'Login Required',
    noWatermark: 'Removed',
    noAccount: 'No',
    summaries: {
      videoDl:
        'Use this free TikTok video downloader to save public videos in original 1080p MP4 quality with no bouncing logo or username watermark. Everything runs directly in your browser on iPhone, Android, Mac, and Windows without logging into an account or installing extra apps.',
      mp3Dl:
        'Use this free TikTok MP3 extractor to save background songs, voiceovers, and original sound clips from any public video. You can download only the clean MP3 audio file directly to your phone or computer with no account login and no video file bloat.',
      viewer:
        'Use this anonymous TikTok profile viewer to inspect public bios, follower counts, total likes, and recent uploads without signing in. Creators never see your name in visitor logs, and every public clip plays smoothly right inside your mobile or desktop browser.',
      storyDl:
        'Use this free TikTok story downloader to watch and save public 24-hour stories as clean HD MP4 files before they expire. No TikTok login is required, and creators do not receive any view notification when you open or save public stories.',
      photoDl:
        'Use this free TikTok photo and slideshow downloader to save individual images from public multi-slide posts in original HD JPG quality. Every slide loads cleanly without overlaid corner usernames, watermarks, or compression artifacts on any device.',
      watermark:
        'Use this free TikTok watermark remover to save original HD MP4 streams without the moving TikTok logo or creator tag. Unlike screen recorders or blur tools, it fetches the clean source video directly with zero cropping or quality loss.',
    },
    rows: [
      { key: 'videoDl', labelKey: 'nav.tool.video.label', format: 'HD MP4 (1080p)' },
      { key: 'mp3Dl', labelKey: 'nav.tool.mp3.label', format: 'MP3 Audio' },
      { key: 'storyDl', labelKey: 'nav.tool.story.label', format: 'HD MP4 (24h Story)' },
      { key: 'photoDl', labelKey: 'nav.tool.photo.label', format: 'Original HD JPG' },
      { key: 'watermark', labelKey: 'nav.tool.watermark.label', format: 'Clean MP4 Stream' },
    ],
  },
  ar: {
    lastUpdatedLabel: 'آخر تحديث',
    stepsHeading: 'خطوات الاستخدام',
    step1: 'أدخل أي اسم مستخدم عام @username على تيك توك أو الصق رابط الفيديو أو عرض الصور في شريط البحث أعلاه.',
    step2: 'اختر المنشور المطلوب من شبكة الحساب أو انتظر فتح نافذة المعاينة المباشرة في المتصفح.',
    step3: 'اضغط على تنزيل فيديو HD أو حفظ الشريحة أو تنزيل الصوت (MP3) لحفظ الملف النقي مباشرة على جهازك.',
    tableHeading: 'مقارنة صيغ الأدوات المدعومة',
    colTool: 'الأداة',
    colFormat: 'صيغة الملف',
    colWatermark: 'العلامة المائية',
    colAccount: 'تسجيل الدخول',
    noWatermark: 'مزالة',
    noAccount: 'لا',
    summaries: {
      videoDl:
        'تتيح لك أداة تنزيل فيديو تيك توك المجانية حفظ المقاطع العامة بجودة 1080p MP4 الأصلية بدون شعار تيك توك أو اسم المستخدم. يعمل كل شيء مباشرة في المتصفح على iPhone وAndroid وMac وWindows بدون تسجيل دخول أو تثبيت برامج.',
      mp3Dl:
        'تساعدك أداة استخراج MP3 المجانية على حفظ الموسيقى الخلفية والتعليقات الصوتية والأصوات الأصلية من أي فيديو عام. يمكنك تنزيل ملف الصوت MP3 النقي مباشرة على هاتفك أو جهازك بدون تسجيل دخول أو تحميل الفيديو الكامل.',
      viewer:
        'يتيح لك عارض حسابات تيك توك السري فحص النبذة العامة وعدد المتابعين وإجمالي الإعجابات وآخر المنشورات بدون تسجيل دخول. لا يظهر اسمك أبداً للمبدع، وتعمل المقاطع العامة بسلاسة داخل متصفح الهاتف أو الكمبيوتر.',
      storyDl:
        'تسمح لك أداة تنزيل قصص تيك توك المجانية بمشاهدة وحفظ قصص الـ 24 ساعة العامة بصيغة MP4 عالية الدقة قبل انتهائها. لا يلزم تسجيل الدخول، ولا يتلقى صاحب الحساب أي إشعار بالمشاهدة.',
      photoDl:
        'تتيح لك أداة تنزيل صور وعروض تيك توك المجانية حفظ كل صورة بشكل منفصل من المنشورات متعددة الشرائح بجودة JPG الأصلية العالية وبدون علامة مائية أو نصوص متراكبة على أي جهاز.',
      watermark:
        'تساعدك أداة إزالة العلامة المائية المجانية على حفظ البث الأصلي بدقة HD MP4 بدون شعار تيك توك المتحرك. وعلى عكس تطبيقات القص أو التشويش، تجلب الأداة الفيديو النقي مباشرة دون تقليل الدقة.',
    },
    rows: [
      { key: 'videoDl', labelKey: 'nav.tool.video.label', format: 'MP4 بدقة HD' },
      { key: 'mp3Dl', labelKey: 'nav.tool.mp3.label', format: 'صوت MP3' },
      { key: 'storyDl', labelKey: 'nav.tool.story.label', format: 'MP4 (قصص 24 ساعة)' },
      { key: 'photoDl', labelKey: 'nav.tool.photo.label', format: 'صور JPG أصلية' },
      { key: 'watermark', labelKey: 'nav.tool.watermark.label', format: 'MP4 نقي بدون شعار' },
    ],
  },
  fr: {
    lastUpdatedLabel: 'Dernière mise à jour',
    stepsHeading: 'Guide étape par étape',
    step1: 'Saisissez un pseudo TikTok public @username ou collez le lien d’une vidéo ou d’un diaporama dans la barre de recherche.',
    step2: 'Choisissez la publication souhaitée dans la grille du profil ou attendez l’ouverture de l’aperçu dans votre navigateur.',
    step3: 'Cliquez sur Télécharger Vidéo HD, Enregistrer la diapo ou Télécharger Audio (MP3) pour sauver le fichier propre.',
    tableHeading: 'Formats pris en charge',
    colTool: 'Outil',
    colFormat: 'Format de sortie',
    colWatermark: 'Filigrane',
    colAccount: 'Connexion',
    noWatermark: 'Supprimé',
    noAccount: 'Non',
    summaries: {
      videoDl:
        'Utilisez ce téléchargeur vidéo TikTok gratuit pour enregistrer des vidéos publiques en MP4 1080p sans logo ni filigrane. Tout fonctionne directement dans votre navigateur sur iPhone, Android, Mac et Windows sans compte ni application.',
      mp3Dl:
        'Utilisez cet extracteur MP3 gratuit pour enregistrer les musiques, voix off et sons originaux de toute vidéo TikTok publique. Téléchargez uniquement la piste audio MP3 nette sur votre appareil sans vous connecter.',
      viewer:
        'Utilisez cette visionneuse anonyme de profil TikTok pour consulter les bios publiques, abonnés, mentions j’aime et vidéos récentes sans connexion. Les créateurs ne voient jamais votre visite.',
      storyDl:
        'Utilisez ce téléchargeur de stories TikTok gratuit pour regarder et archiver les stories publiques de 24 heures en MP4 HD propre avant leur suppression, sans connexion ni notification.',
      photoDl:
        'Utilisez ce téléchargeur gratuit de photos et diaporamas TikTok pour enregistrer chaque image des publications carrousel en JPG HD d’origine, sans filigrane ni texte incrusté.',
      watermark:
        'Utilisez ce suppresseur de filigrane TikTok gratuit pour obtenir les flux MP4 HD d’origine sans logo rebondissant ni tag utilisateur, avec zéro recadrage et zéro flou.',
    },
    rows: [
      { key: 'videoDl', labelKey: 'nav.tool.video.label', format: 'MP4 HD (1080p)' },
      { key: 'mp3Dl', labelKey: 'nav.tool.mp3.label', format: 'Audio MP3' },
      { key: 'storyDl', labelKey: 'nav.tool.story.label', format: 'MP4 HD (Story 24h)' },
      { key: 'photoDl', labelKey: 'nav.tool.photo.label', format: 'JPG HD Original' },
      { key: 'watermark', labelKey: 'nav.tool.watermark.label', format: 'MP4 Propre' },
    ],
  },
  es: {
    lastUpdatedLabel: 'Última actualización',
    stepsHeading: 'Guía paso a paso',
    step1: 'Escribe un usuario público @username de TikTok o pega el enlace de un video o carrusel en el buscador superior.',
    step2: 'Elige la publicación en la cuadrícula del perfil o espera a que se abra la vista previa directa en tu navegador.',
    step3: 'Pulsa Descargar Video HD, Guardar diapositiva o Descargar Audio (MP3) para guardar el archivo limpio en tu dispositivo.',
    tableHeading: 'Formatos compatibles por herramienta',
    colTool: 'Herramienta',
    colFormat: 'Formato de salida',
    colWatermark: 'Marca de agua',
    colAccount: 'Cuenta',
    noWatermark: 'Eliminada',
    noAccount: 'No',
    summaries: {
      videoDl:
        'Usa este descargador gratuito de videos de TikTok para guardar videos públicos en calidad MP4 1080p original sin logotipo ni marca de agua. Todo funciona en tu navegador en iPhone, Android, Mac y Windows sin registro.',
      mp3Dl:
        'Usa este extractor gratuito de MP3 para guardar canciones de fondo, voces y sonidos originales de cualquier video público de TikTok. Descarga solo el archivo MP3 limpio en tu dispositivo sin iniciar sesión.',
      viewer:
        'Usa este visor anónimo de perfiles de TikTok para revisar biografías públicas, seguidores, me gusta y videos recientes sin cuenta. Los creadores nunca ven tu visita.',
      storyDl:
        'Usa este descargador gratuito de historias de TikTok para ver y guardar historias públicas de 24 horas en MP4 HD antes de que desaparezcan, sin registro ni avisos.',
      photoDl:
        'Usa este descargador gratuito de fotos y carruseles de TikTok para guardar cada imagen individual en JPG HD original sin nombres superpuestos ni marcas de agua.',
      watermark:
        'Usa este eliminador gratuito de marcas de agua de TikTok para descargar el video MP4 HD original sin el logotipo rebotante, sin recortes ni desenfoques.',
    },
    rows: [
      { key: 'videoDl', labelKey: 'nav.tool.video.label', format: 'MP4 HD (1080p)' },
      { key: 'mp3Dl', labelKey: 'nav.tool.mp3.label', format: 'Audio MP3' },
      { key: 'storyDl', labelKey: 'nav.tool.story.label', format: 'MP4 HD (Historia 24h)' },
      { key: 'photoDl', labelKey: 'nav.tool.photo.label', format: 'JPG HD Original' },
      { key: 'watermark', labelKey: 'nav.tool.watermark.label', format: 'MP4 Limpio' },
    ],
  },
  de: {
    lastUpdatedLabel: 'Zuletzt aktualisiert',
    stepsHeading: 'Schritt-für-Schritt-Anleitung',
    step1: 'Gib einen öffentlichen TikTok-Benutzernamen @username ein oder füge einen Video- oder Fotolink oben in die Suche ein.',
    step2: 'Wähle den gewünschten Beitrag im Profilraster oder warte kurz auf die direkte Vorschau im Browser.',
    step3: 'Klicke auf HD-Video herunterladen, Folie speichern oder Audio laden (MP3), um die saubere Datei direkt zu sichern.',
    tableHeading: 'Unterstützte Formate',
    colTool: 'Tool',
    colFormat: 'Ausgabeformat',
    colWatermark: 'Wasserzeichen',
    colAccount: 'Login nötig',
    noWatermark: 'Entfernt',
    noAccount: 'Nein',
    summaries: {
      videoDl:
        'Nutze diesen kostenlosen TikTok-Video-Downloader, um öffentliche Videos in 1080p-MP4-Qualität ohne springendes Logo zu speichern. Alles läuft direkt im Browser auf iPhone, Android, Mac und Windows ohne Anmeldung.',
      mp3Dl:
        'Nutze diesen kostenlosen MP3-Extraktor, um Musik, Sprache und Originalsounds aus öffentlichen TikTok-Videos als saubere MP3-Datei ohne Login direkt auf dein Gerät zu laden.',
      viewer:
        'Nutze diesen anonymen TikTok-Profil-Viewer, um öffentliche Bios, Follower, Likes und neue Clips ohne Konto anzusehen. Creator erhalten keinerlei Benachrichtigung über deinen Besuch.',
      storyDl:
        'Nutze diesen kostenlosen Story-Downloader, um öffentliche 24-Stunden-Stories vor Ablauf anonym als sauberes HD-MP4-Video ohne Login zu speichern.',
      photoDl:
        'Nutze diesen kostenlosen Foto- und Diashow-Downloader, um einzelne Bilder aus öffentlichen Karussell-Beiträgen in originaler HD-JPG-Qualität ohne Wasserzeichen zu laden.',
      watermark:
        'Nutze diesen kostenlosen Wasserzeichen-Entferner, um reine HD-MP4-Streams ohne TikTok-Logo zu sichern. Anders als bei Bildschirmaufnahmen bleibt das Bild unbeschnitten und scharf.',
    },
    rows: [
      { key: 'videoDl', labelKey: 'nav.tool.video.label', format: 'HD MP4 (1080p)' },
      { key: 'mp3Dl', labelKey: 'nav.tool.mp3.label', format: 'MP3-Audio' },
      { key: 'storyDl', labelKey: 'nav.tool.story.label', format: 'HD MP4 (24h-Story)' },
      { key: 'photoDl', labelKey: 'nav.tool.photo.label', format: 'Original HD JPG' },
      { key: 'watermark', labelKey: 'nav.tool.watermark.label', format: 'Sauberes MP4' },
    ],
  },
  ru: {
    lastUpdatedLabel: 'Последнее обновление',
    stepsHeading: 'Пошаговая инструкция',
    step1: 'Введите публичный ник TikTok @username или вставьте ссылку на видео или фото-пост в строку поиска выше.',
    step2: 'Выберите нужный пост в сетке профиля или дождитесь открытия прямой карточки предпросмотра.',
    step3: 'Нажмите Скачать HD видео, Сохранить слайд или Скачать аудио (MP3), чтобы сохранить чистый файл на устройство.',
    tableHeading: 'Поддерживаемые форматы инструментов',
    colTool: 'Инструмент',
    colFormat: 'Формат файла',
    colWatermark: 'Водяной знак',
    colAccount: 'Нужен вход',
    noWatermark: 'Удален',
    noAccount: 'Нет',
    summaries: {
      videoDl:
        'Используйте бесплатный загрузчик видео TikTok для сохранения публичных роликов в оригинальном качестве MP4 1080p без логотипа. Работает в браузере на iPhone, Android, Mac и Windows без входа и установки программ.',
      mp3Dl:
        'Бесплатный экстрактор MP3 позволяет сохранить фоновую музыку, озвучку и оригинальные звуки из любого публичного ролика TikTok прямо на устройство без авторизации.',
      viewer:
        'Анонимный просмотр профилей TikTok открывает доступ к публичному описанию, числу подписчиков, лайкам и последним публикациям без аккаунта. Авторы не видят ваши просмотры.',
      storyDl:
        'Бесплатный загрузчик сторис позволяет анонимно смотреть и скачивать публичные 24-часовые истории в чистом HD MP4 до их исчезновения без входа в систему.',
      photoDl:
        'Бесплатный загрузчик фото и слайд-шоу сохраняет отдельные снимки из публичных каруселей в исходном качестве HD JPG без водяных знаков и наложенного текста.',
      watermark:
        'Бесплатное удаление водяного знака загружает чистый исходный видеопоток HD MP4 без логотипа TikTok, обрезки кадров и размытия углов.',
    },
    rows: [
      { key: 'videoDl', labelKey: 'nav.tool.video.label', format: 'HD MP4 (1080p)' },
      { key: 'mp3Dl', labelKey: 'nav.tool.mp3.label', format: 'Аудио MP3' },
      { key: 'storyDl', labelKey: 'nav.tool.story.label', format: 'HD MP4 (Сторис 24ч)' },
      { key: 'photoDl', labelKey: 'nav.tool.photo.label', format: 'Исходный HD JPG' },
      { key: 'watermark', labelKey: 'nav.tool.watermark.label', format: 'Чистый MP4' },
    ],
  },
  zh: {
    lastUpdatedLabel: '最近更新',
    stepsHeading: '操作步骤',
    step1: '在上方搜索框中输入任意公开 TikTok 用户名 @username，或粘贴公开视频或图文链接。',
    step2: '在创作者主页网格中选择需要的内容，或等待单条作品预览卡片直接打开。',
    step3: '点击下载高清视频、保存幻灯片或下载音频 (MP3)，即可将纯净文件直接保存到本地设备。',
    tableHeading: '支持的工具输出格式',
    colTool: '工具名称',
    colFormat: '输出格式',
    colWatermark: '水印处理',
    colAccount: '需要登录',
    noWatermark: '已去除',
    noAccount: '不需要',
    summaries: {
      videoDl:
        '使用这款免费的 TikTok 视频下载器，可将公开视频保存为原始 1080p MP4 画质，完全去除跳动标志与用户名水印。支持 iPhone、Android、Mac 与 Windows 浏览器直接使用，无需登录或安装 App。',
      mp3Dl:
        '使用这款免费的 TikTok MP3 提取器，可从任意公开视频中单独保存背景音乐、配音与原声片段。无需登录账号，直接下载纯净 MP3 音频文件。',
      viewer:
        '使用这款匿名 TikTok 主页查看器，无需登录即可查看公开账号简介、粉丝数、总获赞和近期视频。创作者不会看到您的访问记录，视频可在浏览器流畅播放。',
      storyDl:
        '使用这款免费的 TikTok 快拍下载器，可在 24 小时快拍过期前匿名观看并保存纯净高清 MP4 文件，无需登录账号，也不会向作者发送查看通知。',
      photoDl:
        '使用这款免费的 TikTok 图片与幻灯片下载器，可将公开轮播图文中的每张照片保存为原始高清 JPG，无角落水印或文字遮挡。',
      watermark:
        '使用这款免费的 TikTok 去水印工具，可直接获取无水印原始高清 MP4 视频流。不同于录屏或模糊处理，画面完整清晰、无任何裁切。',
    },
    rows: [
      { key: 'videoDl', labelKey: 'nav.tool.video.label', format: '高清 MP4 (1080p)' },
      { key: 'mp3Dl', labelKey: 'nav.tool.mp3.label', format: 'MP3 音频' },
      { key: 'storyDl', labelKey: 'nav.tool.story.label', format: '高清 MP4 (24小时快拍)' },
      { key: 'photoDl', labelKey: 'nav.tool.photo.label', format: '原画高清 JPG' },
      { key: 'watermark', labelKey: 'nav.tool.watermark.label', format: '无水印纯净 MP4' },
    ],
  },
  pt: {
    lastUpdatedLabel: 'Última atualização',
    stepsHeading: 'Passo a passo',
    step1: 'Digite qualquer @usuário público do TikTok ou cole o link de um vídeo ou carrossel na barra acima.',
    step2: 'Escolha a publicação na grade do perfil ou aguarde a pré-visualização abrir no navegador.',
    step3: 'Clique em Baixar Vídeo HD, Salvar Slide ou Baixar Áudio (MP3) para salvar o arquivo limpo no dispositivo.',
    tableHeading: 'Formatos compatíveis',
    colTool: 'Ferramenta',
    colFormat: 'Formato de saída',
    colWatermark: 'Marca d’água',
    colAccount: 'Login necessário',
    noWatermark: 'Removida',
    noAccount: 'Não',
    summaries: {
      videoDl:
        'Use este baixador gratuito do TikTok para salvar vídeos públicos em MP4 1080p original sem logotipo ou marca d’água. Tudo funciona direto no navegador do iPhone, Android, Mac e Windows sem criar conta.',
      mp3Dl:
        'Use este extrator de MP3 gratuito para salvar músicas de fundo, narrações e sons originais de qualquer vídeo público em arquivo MP3 limpo, sem precisar fazer login.',
      viewer:
        'Use este visualizador anônimo de perfis do TikTok para ver bios públicas, seguidores, curtidas totais e vídeos recentes sem entrar em uma conta. Os criadores nunca veem sua visita.',
      storyDl:
        'Use este baixador gratuito de stories do TikTok para assistir e salvar stories públicos de 24 horas em MP4 HD limpo antes que sumam, sem login nem notificações.',
      photoDl:
        'Use este baixador gratuito de fotos e slides do TikTok para salvar cada imagem individual de carrosséis públicos em JPG HD original, sem textos ou marcas d’água.',
      watermark:
        'Use este removedor gratuito de marca d’água do TikTok para baixar o MP4 HD original sem o logotipo saltitante, mantendo a tela inteira nítida sem cortes nem borrões.',
    },
    rows: [
      { key: 'videoDl', labelKey: 'nav.tool.video.label', format: 'MP4 HD (1080p)' },
      { key: 'mp3Dl', labelKey: 'nav.tool.mp3.label', format: 'Áudio MP3' },
      { key: 'storyDl', labelKey: 'nav.tool.story.label', format: 'MP4 HD (Story 24h)' },
      { key: 'photoDl', labelKey: 'nav.tool.photo.label', format: 'JPG HD Original' },
      { key: 'watermark', labelKey: 'nav.tool.watermark.label', format: 'MP4 Limpo' },
    ],
  },
  he: {
    lastUpdatedLabel: 'עודכן לאחרונה',
    stepsHeading: 'מדריך שלב אחר שלב',
    step1: 'הזן שם משתמש ציבורי @username בטיקטוק או הדבק קישור לסרטון או מצגת תמונות בשורת החיפוש למעלה.',
    step2: 'בחר את הפוסט הרצוי מתוך רשת הפרופיל או המתן לפתיחת התצוגה המקדימה בדפדפן.',
    step3: 'לחץ על הורד וידאו HD, שמור שקופית או הורד אודיו (MP3) לשמירת הקובץ הנקי ישירות למכשיר.',
    tableHeading: 'פורמטים נתמכים',
    colTool: 'כלי',
    colFormat: 'פורמט פלט',
    colWatermark: 'סימן מים',
    colAccount: 'נדרשת התחברות',
    noWatermark: 'מוסר',
    noAccount: 'לא',
    summaries: {
      videoDl:
        'השתמש במוריד הווידאו החינמי של טיקטוק כדי לשמור סרטונים ציבוריים באיכות 1080p MP4 מקורית ללא לוגו וסימן מים. הכול עובד ישירות בדפדפן ב-iPhone, Android, Mac ו-Windows ללא התחברות.',
      mp3Dl:
        'השתמש במחלץ ה-MP3 החינמי כדי לשמור שירי רקע, קריינות וצלילים מקוריים מכל סרטון ציבורי כקובץ MP3 נקי ישירות למכשירך וללא חשבון.',
      viewer:
        'השתמש במציג הפרופילים האנונימי כדי לבדוק ביוגרפיה ציבורית, עוקבים, לייקים וסרטונים אחרונים ללא התחברות. יוצרים לעולם לא יודעים שביקרת בפרופיל.',
      storyDl:
        'השתמש במוריד הסטוריז החינמי כדי לצפות ולשמור סטוריז ציבוריים של 24 שעות כקובצי MP4 HD נקיים לפני שייעלמו, ללא התחברות.',
      photoDl:
        'השתמש במוריד התמונות והמצגות החינמי כדי לשמור תמונות בודדות מפוסטים מרובי שקופיות באיכות JPG HD מקורית ללא סימני מים.',
      watermark:
        'השתמש במסיר סימני המים החינמי כדי לשמור קובצי MP4 HD נקיים ללא הלוגו הקופץ של טיקטוק, בלי חיתוך ובלי טשטוש.',
    },
    rows: [
      { key: 'videoDl', labelKey: 'nav.tool.video.label', format: 'MP4 HD (1080p)' },
      { key: 'mp3Dl', labelKey: 'nav.tool.mp3.label', format: 'אודיו MP3' },
      { key: 'storyDl', labelKey: 'nav.tool.story.label', format: 'MP4 HD (סטורי 24ש׳)' },
      { key: 'photoDl', labelKey: 'nav.tool.photo.label', format: 'JPG HD מקורי' },
      { key: 'watermark', labelKey: 'nav.tool.watermark.label', format: 'MP4 נקי' },
    ],
  },
  hi: {
    lastUpdatedLabel: 'अंतिम अपडेट',
    stepsHeading: 'कदम-दर-कदम गाइड',
    step1: 'ऊपर सर्च बार में कोई भी पब्लिक TikTok @username लिखें या पब्लिक वीडियो या फोटो पोस्ट का लिंक पेस्ट करें।',
    step2: 'प्रोफाइल ग्रिड से अपनी पसंद का पोस्ट चुनें या ब्राउज़र में सीधी प्रीव्यू विंडो खुलने दें।',
    step3: 'सीधे अपने डिवाइस पर साफ फ़ाइल सेव करने के लिए HD वीडियो डाउनलोड करें, स्लाइड सेव करें या ऑडियो डाउनलोड करें (MP3) दबाएं।',
    tableHeading: 'सपोर्टेड टूल फॉर्मेट',
    colTool: 'टूल',
    colFormat: 'आउटपुट फॉर्मेट',
    colWatermark: 'वॉटरमार्क',
    colAccount: 'लॉगिन ज़रूरी',
    noWatermark: 'हटाया गया',
    noAccount: 'नहीं',
    summaries: {
      videoDl:
        'बिना किसी लोगो या वॉटरमार्क के पब्लिक वीडियो को मूल 1080p MP4 क्वालिटी में सेव करने के लिए इस मुफ्त TikTok वीडियो डाउनलोडर का उपयोग करें। यह iPhone, Android, Mac और Windows के ब्राउज़र में बिना लॉगिन चलता है।',
      mp3Dl:
        'किसी भी पब्लिक TikTok वीडियो से बैकग्राउंड गाने, वॉइसओवर और असली साउंड क्लिप सेव करने के लिए इस मुफ्त MP3 एक्सट्रैक्टर का उपयोग करें। बिना लॉगिन सीधे साफ MP3 फ़ाइल डाउनलोड करें।',
      viewer:
        'बिना साइन-इन किए पब्लिक बायो, फॉलोअर्स गिनती, कुल लाइक्स और हाल के वीडियो देखने के लिए इस गुमनाम TikTok प्रोफाइल व्यूअर का उपयोग करें। क्रिएटर्स को कभी पता नहीं चलता।',
      storyDl:
        '24 घंटे में खत्म होने से पहले पब्लिक स्टोरीज़ को साफ HD MP4 फ़ाइलों के रूप में देखने और सेव करने के लिए इस मुफ्त TikTok स्टोरी डाउनलोडर का उपयोग करें।',
      photoDl:
        'बिना वॉटरमार्क या ओवरले टेक्स्ट के पब्लिक मल्टी-स्लाइड पोस्ट से अलग-अलग HD JPG इमेज सेव करने के लिए इस मुफ्त फोटो और स्लाइडशो डाउनलोडर का उपयोग करें।',
      watermark:
        'बिना क्रॉप या धुंधलेपन के चलते हुए TikTok लोगो को हटाकर साफ HD MP4 स्ट्रीम सेव करने के लिए इस मुफ्त वॉटरमार्क रिमूवर का उपयोग करें।',
    },
    rows: [
      { key: 'videoDl', labelKey: 'nav.tool.video.label', format: 'HD MP4 (1080p)' },
      { key: 'mp3Dl', labelKey: 'nav.tool.mp3.label', format: 'MP3 ऑडियो' },
      { key: 'storyDl', labelKey: 'nav.tool.story.label', format: 'HD MP4 (24h स्टोरी)' },
      { key: 'photoDl', labelKey: 'nav.tool.photo.label', format: 'मूल HD JPG' },
      { key: 'watermark', labelKey: 'nav.tool.watermark.label', format: 'साफ MP4 स्ट्रीम' },
    ],
  },
};

function renderFeatureIcon(iconName: ToolIconName) {
  switch (iconName) {
    case 'film':
      return <Film className="w-4 h-4" aria-hidden="true" />;
    case 'zap':
      return <Zap className="w-4 h-4" aria-hidden="true" />;
    case 'download':
      return <Download className="w-4 h-4" aria-hidden="true" />;
    case 'volume2':
      return <Volume2 className="w-4 h-4" aria-hidden="true" />;
    case 'music':
      return <Music className="w-4 h-4" aria-hidden="true" />;
    case 'eyeOff':
      return <EyeOff className="w-4 h-4" aria-hidden="true" />;
    case 'userCheck':
      return <UserCheck className="w-4 h-4" aria-hidden="true" />;
    case 'barChart2':
      return <BarChart2 className="w-4 h-4" aria-hidden="true" />;
    case 'clock':
      return <Clock className="w-4 h-4" aria-hidden="true" />;
    case 'layers':
      return <Layers className="w-4 h-4" aria-hidden="true" />;
    case 'shieldCheck':
      return <ShieldCheck className="w-4 h-4" aria-hidden="true" />;
    case 'image':
      return <ImageIcon className="w-4 h-4" aria-hidden="true" />;
    case 'eraser':
      return <Eraser className="w-4 h-4" aria-hidden="true" />;
  }
}

export default function LocalizedToolView({
  toolKey,
  features,
  faqs,
  showAdSlot = false,
}: LocalizedToolViewProps) {
  const { lang, t } = useI18n();
  const geoCopy = TOOL_GEO_COPY[lang] || TOOL_GEO_COPY.en;

  const formattedUpdatedDate = new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(TOOL_UPDATED_ISO));

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    dateModified: TOOL_UPDATED_ISO,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: t(faq.qKey),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(faq.aKey),
      },
    })),
  };

  return (
    <main id="main-content" className="flex-1 w-full flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <TikTokProfileViewer
        initialUsername=""
        autoSearch={false}
        heroVariant="workbench"
        titleKey={`page.${toolKey}.title`}
        subtitleKey={`page.${toolKey}.subtitle`}
        title={t(`page.${toolKey}.title`)}
        subtitle={t(`page.${toolKey}.subtitle`)}
        breadcrumbs={
          <Breadcrumbs items={[{ label: t(`page.${toolKey}.crumb`) }]} />
        }
      >
        <div className="w-full flex flex-col">
          {/* Band 1: Key Features, Answer-First Summary, Steps & Format Table */}
          <section className="w-full bg-[var(--surface-sunken)] border-b border-[var(--border-subtle)] py-10 sm:py-12">
            <div className="max-w-[1120px] mx-auto px-4 sm:px-6 space-y-8">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink-primary)] tracking-tight">
                  {t(`page.${toolKey}.bandTitle`)}
                </h2>
                <p className="text-sm text-[var(--ink-secondary)] mt-1.5 leading-relaxed">
                  {t(`page.${toolKey}.bandSubtitle`)}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {features.map((feature) => (
                  <div
                    key={feature.titleKey}
                    className="p-5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)] flex flex-col gap-2.5"
                  >
                    <div
                      className={`w-9 h-9 rounded-lg border flex items-center justify-center ${
                        feature.iconBgClass
                      } ${feature.iconTextClass} ${
                        feature.iconBorderClass || 'border-transparent'
                      }`}
                    >
                      {renderFeatureIcon(feature.iconName)}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[var(--ink-primary)]">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[var(--ink-secondary)] leading-relaxed">
                      {t(feature.descKey)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Answer-First Summary + Ordered Steps + Format Table */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)] space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--border-subtle)]">
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--ink-primary)] tracking-tight">
                    {t(`page.${toolKey}.crumb`)}
                  </h2>
                  <div className="text-xs text-[var(--ink-muted)] font-medium">
                    {geoCopy.lastUpdatedLabel}:{' '}
                    <time dateTime={TOOL_UPDATED_ISO} className="font-semibold text-[var(--ink-primary)]">
                      {formattedUpdatedDate}
                    </time>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed max-w-[75ch]">
                  {geoCopy.summaries[toolKey]}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-5 space-y-2.5">
                    <h3 className="text-sm font-bold text-[var(--ink-primary)]">
                      {geoCopy.stepsHeading}
                    </h3>
                    <ol className="list-decimal ps-5 space-y-2 text-xs sm:text-[13px] text-[var(--ink-secondary)] leading-relaxed">
                      <li>{geoCopy.step1}</li>
                      <li>{geoCopy.step2}</li>
                      <li>{geoCopy.step3}</li>
                    </ol>
                  </div>

                  <div className="lg:col-span-7 space-y-2.5">
                    <h3 className="text-sm font-bold text-[var(--ink-primary)]">
                      {geoCopy.tableHeading}
                    </h3>
                    <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-canvas)]">
                      <table className="w-full text-start border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-[var(--ink-primary)]">
                            <th className="py-2.5 px-3.5 font-bold text-start">{geoCopy.colTool}</th>
                            <th className="py-2.5 px-3.5 font-bold text-start">{geoCopy.colFormat}</th>
                            <th className="py-2.5 px-3.5 font-bold text-start">{geoCopy.colWatermark}</th>
                            <th className="py-2.5 px-3.5 font-bold text-start">{geoCopy.colAccount}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--ink-secondary)]">
                          {geoCopy.rows.map((row) => (
                            <tr
                              key={row.key}
                              className={
                                row.key === toolKey
                                  ? 'bg-[var(--pastel-blue)]/45 font-semibold text-[var(--ink-primary)]'
                                  : 'hover:bg-[var(--surface-elevated)] transition-colors'
                              }
                            >
                              <td className="py-2.5 px-3.5 text-[var(--ink-primary)] whitespace-nowrap">
                                {t(row.labelKey)}
                              </td>
                              <td className="py-2.5 px-3.5 font-mono text-[11px] text-[var(--accent-cyan-text)] font-semibold whitespace-nowrap">
                                {row.format}
                              </td>
                              <td className="py-2.5 px-3.5 whitespace-nowrap">
                                {geoCopy.noWatermark}
                              </td>
                              <td className="py-2.5 px-3.5 whitespace-nowrap">
                                {geoCopy.noAccount}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {showAdSlot && (
                <div>
                  <AdSlot placement="footer" />
                </div>
              )}
            </div>
          </section>

          {/* Band 2: Localized FAQs */}
          {faqs.length > 0 && (
            <section className="w-full bg-[var(--surface-elevated)] border-b border-[var(--border-subtle)] py-10 sm:py-12">
              <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
                <div className="text-center max-w-xl mx-auto mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink-primary)] tracking-tight">
                    {t(`page.${toolKey}.faqHeading`)}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {faqs.map((faq) => (
                    <div
                      key={faq.qKey}
                      className="p-5 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)] flex flex-col gap-1.5"
                    >
                      <h3 className="text-sm font-bold text-[var(--ink-primary)]">
                        {t(faq.qKey)}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-[var(--ink-secondary)] leading-relaxed">
                        {t(faq.aKey)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Band 3: Internal Linking to All Creator Tools */}
          <section className="w-full bg-[var(--surface-canvas)] py-10 sm:py-12">
            <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
              <CreatorToolsSection />
            </div>
          </section>
        </div>
      </TikTokProfileViewer>
    </main>
  );
}