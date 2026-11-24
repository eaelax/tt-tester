import type { LanguageDictionaries, TranslationMap } from './types';

const EN_UI: TranslationMap = {
  'brand.name': 'Tik Profiles Viewer',
  'brand.domain': 'TikProfilesViewer.com',

  'nav.home': 'Home',
  'nav.about': 'About us',
  'nav.howToUse': 'How to use',
  'nav.tools': 'Tools',
  'nav.creators': 'Top Creators',
  'nav.categories': 'Categories',
  'nav.selectLanguage': 'Select Language',
  'nav.toggleMenu': 'Toggle Menu',
  'nav.tool.video.label': 'HD Video Downloader',
  'nav.tool.video.desc': 'Download videos without watermark',
  'nav.tool.mp3.label': 'Audio MP3 Downloader',
  'nav.tool.mp3.desc': 'Save original audio sound',
  'nav.tool.viewer.label': 'Profile Viewer',
  'nav.tool.viewer.desc': 'Check profiles and view count',
  'nav.tool.story.label': 'Story Downloader',
  'nav.tool.story.desc': 'Save stories before they expire',
  'nav.tool.photo.label': 'Photo & Slideshow',
  'nav.tool.photo.desc': 'Download carousel images in HD',
  'nav.tool.watermark.label': 'Watermark Remover',
  'nav.tool.watermark.desc': 'Remove TikTok logo for Reels',

  'footer.tagline':
    'Free web utility to inspect public TikTok profiles anonymously, stream videos smoothly, and download clean HD MP4 videos and MP3 audio tracks.',
  'footer.aboutUs': 'About us',
  'footer.howToUse': 'How to use',
  'footer.topCreators': 'Top Creators',
  'footer.freeTools': 'Free Downloader Tools',
  'footer.exploreHeading': 'Explore & Guides',
  'footer.legalHeading': 'Legal & Protection',
  'footer.copyright': 'TikProfilesViewer.com. All rights reserved.',
  'footer.disclaimer':
    'Disclaimer: Tik Profiles Viewer is an independent web utility and is not affiliated with, endorsed by, or associated with TikTok or ByteDance Ltd.',

  'breadcrumb.home': 'Home',
  'breadcrumb.legalCenter': 'Legal Center',
  'breadcrumb.creators': 'Creators',
  'breadcrumb.topCreators': 'Top Creators',
  'breadcrumb.categories': 'Categories',

  'hero.homeTitle': 'TikTok Profile Viewer, HD Video Downloader & MP3 Audio Saver',
  'hero.homeSubtitle':
    'Inspect public TikTok profiles anonymously, watch videos smoothly without lag, and save watermark-free HD MP4 videos and MP3 audio for free.',
  'hero.ctaCreators': 'Browse Top Creators',
  'hero.ctaTools': 'Explore Free Tools',
  'hero.ctaHowItWorks': 'See How It Works',
  'hero.ctaTrySample': 'Try @khaby.lame',

  'search.label': 'Enter TikTok Username or Profile Link',
  'search.publicOnly': 'Public accounts only',
  'search.placeholder': 'Enter username or profile link (e.g. khaby.lame)',
  'search.clear': 'Clear search input',
  'search.btn': 'View Profile',
  'search.searching': 'Searching...',
  'search.popular': 'Popular creators:',
  'search.noticeTitle': 'Profile lookup notice',
  'search.errorEmpty': 'Please enter a TikTok username.',
  'search.errorNotFound': 'User @{username} was not found or is private.',
  'search.errorPrivate': '@{username} is a private TikTok account.',
  'search.errorNoVideos':
    '@{username} has no public videos available or the feed is temporarily unavailable.',
  'search.errorFailed': 'Failed to retrieve profile data.',

  'cap.hdVideo': 'Clean HD MP4 Video',
  'cap.anonymous': '100% Anonymous Viewing',
  'cap.mp3Audio': 'Direct MP3 Audio Save',

  'profile.verified': 'Verified',
  'profile.notVerified': 'Not Verified',
  'profile.avatar': 'Save Avatar',
  'profile.copyLink': 'Copy Link',
  'profile.copied': 'Copied',
  'profile.openTikTok': 'Open TikTok',
  'profile.publicCreator': 'Public Creator Profile',
  'profile.status': 'Status',
  'profile.active': 'Active',
  'profile.private': 'Private',
  'profile.followers': 'Followers',
  'profile.totalLikes': 'Total Likes',
  'profile.following': 'Following',
  'profile.videos': 'Videos',
  'profile.accountType': 'Account Type',
  'profile.verifiedCreator': 'Verified Creator',
  'profile.publicAccount': 'Public Account',
  'profile.publishedVideos': 'Published Videos',
  'profile.loaded': '{count} loaded',
  'profile.selectVideoHint': 'Select any video to watch or download in HD',
  'profile.watchVideo': 'Watch Video',
  'profile.showMore': 'Show More Videos',
  'profile.loadingMore': 'Loading more videos...',
  'profile.showingOf': 'Showing {shown} of {total} videos',

  'modal.hdBadge': 'HD',
  'modal.loadingStream': 'Loading HD stream...',
  'modal.playVideo': 'Play video',
  'modal.close': 'Close modal',
  'modal.defaultVideoTitle': 'TikTok Video',
  'modal.downloadVideo': 'Download HD Video',
  'modal.downloadAudio': 'Download Audio (MP3)',
  'modal.preparing': 'Preparing...',
  'modal.videoUnavailable':
    'Direct video stream URL is unavailable right now. Please try another video.',
  'modal.audioUnavailable': 'Direct audio stream URL is unavailable for this video.',

  'dl.audioTitle': 'Clean Audio Downloader',
  'dl.videoTitle': 'Watermark-Free HD Downloader',
  'dl.sec': 'sec',
  'dl.preparingStream': 'Preparing {type} Stream',
  'dl.preparingDefault':
    'Fetching original high quality stream and removing watermarks in background...',
  'dl.savingFile': 'Saving File...',
  'dl.readyTitle': 'Download Ready',
  'dl.downloadingMsg': 'Downloading stream directly to your device...',
  'dl.startedMsg': 'Your file download has started. Click below if you need to save it again.',
  'dl.clickMsg': 'Click the button below to save your clean file without watermarks.',
  'dl.downloadAgain': 'Download Again',
  'dl.btnAudio': 'Download MP3 Audio',
  'dl.btnAvatar': 'Download Avatar Image',
  'dl.btnVideo': 'Download HD Video',
  'dl.backToVideos': 'Back to Profile Videos',
  'dl.badge': 'No Watermark HD',

  'steps.title': 'How to Use Tik Profiles Viewer',
  'steps.subtitle':
    'Follow these three simple steps to view any public profile and save HD media.',
  'steps.fullGuide': 'Read full guide',
  'steps.step01': 'Step 01',
  'steps.step02': 'Step 02',
  'steps.step03': 'Step 03',
  'steps.lookupProfile': 'Lookup profile',
  'steps.noLogin': 'No login',
  'steps.publicLookup': 'Public profile lookup',
  'steps.s1Title': 'Search Any Username',
  'steps.s1Desc':
    'Type any public TikTok username into the search box or pick a trending creator to open their full profile and video feed.',
  'steps.selectVideo': 'Select video',
  'steps.instantPlayer': 'Instant stream player',
  'steps.videosCount': '30+ Videos',
  'steps.s2Title': 'Browse Videos & Stats',
  'steps.s2Desc':
    'Check creator followers, total likes, and uploaded clips. Click any video card to watch smoothly right in your browser.',
  'steps.exportMedia': 'Export media',
  'steps.mp4Title': '1080p MP4 Video',
  'steps.watermarkFree': 'Watermark Free',
  'steps.save': 'Save',
  'steps.audioTitle': 'Original Audio',
  'steps.cleanMp3': 'Clean MP3 Track',
  'steps.directSave': 'Direct browser save',
  'steps.ready': 'Ready',
  'steps.s3Title': 'Download in High Quality',
  'steps.s3Desc':
    'Click Download HD Video to save clean MP4 files with no watermark, or click Download Audio to save MP3 music with one tap.',

  'niches.title': 'Explore TikTok Niches & Creator Formats',
  'niches.subtitle':
    'From cooking tutorials and tech reviews to comedy sketches, browse public accounts by topic and save clean HD videos with zero restrictions.',
  'niches.allCategories': 'All categories',
  'niches.c1': 'Comedy & Entertainment',
  'niches.c1Desc': 'Viral sketches, parodies, and reaction creators.',
  'niches.c2': 'Food & Cooking',
  'niches.c2Desc': 'Quick recipes, restaurant dishes, and ASMR cooking.',
  'niches.c3': 'Tech & AI',
  'niches.c3Desc': 'Gadget reviews, AI workflows, and software guides.',
  'niches.c4': 'Gaming & Esports',
  'niches.c4Desc': 'Highlights, stream clips, and tournament moments.',
  'niches.c5': 'Fitness & Sports',
  'niches.c5Desc': 'Training routines, mobility drills, and athletic clips.',
  'niches.c6': 'Dance & Music',
  'niches.c6Desc': 'Trending choreography and extractable MP3 sounds.',
  'niches.creatorsCount': '{count} creators',
  'niches.p1Title': '100% Anonymous Viewing',
  'niches.p1Desc':
    'No TikTok account needed. Creators never see your name on their view list or profile history.',
  'niches.p2Title': 'Every Public Category',
  'niches.p2Desc':
    'Search any creator in food, dance, gaming, fitness, comedy, beauty, and education worldwide.',
  'niches.p3Title': 'Instant HD Downloads',
  'niches.p3Desc':
    'Get original full-resolution MP4 video and clean MP3 audio directly on your device.',
  'niches.cta': 'Search a creator in your favorite niche',

  'tools.title': 'Free Downloader Tools',
  'tools.subtitle':
    'Pick a free tool to download clean HD media, inspect public profiles, or remove watermarks.',
  'tools.openTool': 'Open tool',
  'tools.t1Title': 'HD Video Downloader',
  'tools.t1Desc': 'Save original 1080p MP4 videos with no watermark.',
  'tools.t2Title': 'Audio MP3 Extractor',
  'tools.t2Desc': 'Extract background audio and sounds in clean MP3.',
  'tools.t3Title': 'Anonymous Viewer',
  'tools.t3Desc': 'View profile data and follower counts anonymously.',
  'tools.t5Title': 'Story Downloader',
  'tools.t5Desc': 'Save disappearing stories before they expire in 24h.',
  'tools.t6Title': 'Photo & Slideshow',
  'tools.t6Desc': 'Download full-res carousel slideshow photos in HD.',
  'tools.t10Title': 'Watermark Remover',
  'tools.t10Desc': 'Remove TikTok logos for Instagram Reels and Shorts.',

  'faq.title': 'Frequently Asked Questions',
  'faq.subtitle':
    'Quick answers about viewing TikTok profiles, downloading clean HD MP4 videos, and extracting MP3 audio.',
  'faq.contactSupport': 'Contact support',
  'faq.q1': 'Is Tik Profiles Viewer 100% free to use?',
  'faq.a1':
    'Yes, Tik Profiles Viewer is completely free to use. There are no paid plans, no subscription fees, and no download limits. You can view as many profiles and download as many videos as you want at any time.',
  'faq.q2': 'Can I view profiles and watch videos completely anonymously?',
  'faq.a2':
    'Yes. You do not need to log into TikTok or create an account. The creator will never receive any notification or view record indicating that you checked their profile or downloaded their content.',
  'faq.q3': 'How does the video downloader remove TikTok watermarks?',
  'faq.a3':
    'Our engine connects directly to the public content delivery network to retrieve the original high-resolution video stream before the platform adds bouncing logo watermarks and creator text overlays.',
  'faq.q4': 'Can I extract and download the background music or audio (MP3)?',
  'faq.a4':
    'Yes. Every video card has a dedicated Download Audio button that lets you extract and save the clean original sound in standard MP3 format with one click.',
  'faq.q5': 'Which devices and browsers are supported?',
  'faq.a5':
    'Tik Profiles Viewer works smoothly in all modern web browsers including Safari on iPhone and iPad, Google Chrome on Android and PC, Mozilla Firefox, Microsoft Edge, and macOS browsers.',
  'faq.q6': 'How do I download a profile avatar picture in high quality?',
  'faq.a6':
    'Search for any creator username, then click the Save Avatar button right in the profile details box. The full-size original profile picture will save directly to your device.',

  'home.trendingTitle': 'Trending TikTok Creators',
  'home.trendingSubtitle': 'Popular public creators you can inspect and watch right now.',
  'home.viewAllCreators': 'View all creators',
  'home.followersLabel': '{count} followers',
  'home.aboutTitle': 'About Tik Profiles Viewer',
  'home.aboutSubtitle':
    'Built on TikProfilesViewer.com for fast, private access to public TikTok profiles.',
  'home.readMore': 'Read more',
  'home.fastPlayerTitle': 'Fast Video Player',
  'home.fastPlayerDesc':
    'Play videos smoothly without lag. Clips start quickly with crisp picture quality.',
  'home.freeTitle': '100% Free Forever',
  'home.freeDesc':
    'No payments, no credit card, and no daily caps. Download as many videos as you need.',
  'home.privateTitle': 'Private & Anonymous',
  'home.privateDesc':
    'Nobody knows you viewed their profile. No sign-up required, and your activity stays private.',
};

const AR_UI: TranslationMap = {
  ...EN_UI,
  'brand.name': 'عارض حسابات تيك توك',
  'hero.homeTitle': 'عارض حسابات تيك توك، تنزيل فيديوهات HD وصوتيات MP3 بدون علامة مائية',
};

const FR_UI: TranslationMap = {
  ...EN_UI,
  'hero.homeTitle': 'Visionneuse de Profils TikTok, Téléchargeur Vidéo HD & Audio MP3 Sans Filigrane',
};

const ES_UI: TranslationMap = {
  ...EN_UI,
  'hero.homeTitle': 'Visor de Perfiles de TikTok, Descargador de Videos HD y Audio MP3 Sin Marca de Agua',
};

const DE_UI: TranslationMap = {
  ...EN_UI,
  'hero.homeTitle': 'TikTok Profil-Viewer, HD Video Downloader & MP3 Audio ohne Wasserzeichen',
};

const RU_UI: TranslationMap = {
  ...EN_UI,
  'hero.homeTitle': 'Просмотр профилей TikTok, скачивание HD видео и MP3 без водяного знака',
};

const ZH_UI: TranslationMap = {
  ...EN_UI,
  'hero.homeTitle': 'TikTok 主页查看器、无水印高清视频下载与 MP3 音频提取',
};

const PT_UI: TranslationMap = {
  ...EN_UI,
  'hero.homeTitle': 'Visualizador de Perfis do TikTok, Baixador de Vídeos HD e Áudio MP3 Sem Marca d’Água',
};

const HE_UI: TranslationMap = {
  ...EN_UI,
  'hero.homeTitle': 'צפייה בפרופילי טיקטוק, הורדת סרטוני HD ושמירת אודיו MP3 ללא סימן מים',
};

const HI_UI: TranslationMap = {
  ...EN_UI,
  'hero.homeTitle': 'TikTok प्रोफाइल व्यूअर, बिना वॉटरमार्क HD वीडियो डाउनलोडर और MP3 ऑडियो सेवर',
};

export const UI_DICTIONARIES: LanguageDictionaries = {
  en: EN_UI,
  ar: AR_UI,
  fr: FR_UI,
  es: ES_UI,
  de: DE_UI,
  ru: RU_UI,
  zh: ZH_UI,
  pt: PT_UI,
  he: HE_UI,
  hi: HI_UI,
};