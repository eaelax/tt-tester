import type { LanguageCode, TranslationMap } from './types';

const AR_LEGAL: TranslationMap = {
  'Terms of Service': 'شروط الخدمة',
  'The binding terms, rules, and conditions governing access to and use of Tik Profiles Viewer on TikProfilesViewer.com.':
    'الشروط والقواعد الملزمة التي تحكم الوصول إلى واستخدام عارض حسابات تيك توك على TikProfilesViewer.com.',
  'By accessing or using Tik Profiles Viewer, you agree to these Terms of Service. Our service allows users to inspect public creator profiles and download public media for personal, non-commercial use in compliance with applicable laws.':
    'من خلال الوصول إلى عارض حسابات تيك توك أو استخدامه، فإنك توافق على شروط الخدمة هذه. تتيح خدمتنا للمستخدمين فحص الحسابات العامة وتنزيل الوسائط للاستخدام الشخصي غير التجاري وفقاً للقوانين المعمول بها.',

  'Privacy Policy': 'سياسة الخصوصية',
  'How Tik Profiles Viewer protects your privacy, handles server logs, and explains advertising cookies in clear Plain English.':
    'كيف يحمي عارض حسابات تيك توك خصوصيتك، ويتعامل مع سجلات الخادم، ويوضح ملفات تعريف الارتباط الإعلانية بلغة واضحة ومباشرة.',
  'Tik Profiles Viewer does not ask you to sign up, log in, or share personal details. We only process temporary technical logs needed to run the site safely, and you control your cookie and ad choices.':
    'لا يطلب عارض حسابات تيك توك التسجيل أو تسجيل الدخول أو مشاركة البيانات الشخصية. نقوم فقط بمعالجة سجلات فنية مؤقتة لتشغيل الموقع بأمان، وأنت تتحكم في خيارات ملفات الارتباط والإعلانات.',

  'Cookie Policy': 'سياسة ملفات تعريف الارتباط (Cookies)',
  'Clear information about how cookies and browser storage work on TikProfilesViewer.com and how you can control them.':
    'معلومات واضحة حول كيفية عمل ملفات تعريف الارتباط والتخزين المحلي على TikProfilesViewer.com وكيفية التحكم بها.',
  'Tik Profiles Viewer uses basic browser storage to remember your preferences and keep the site safe. If ads are shown, advertising partners such as Google AdSense may also place cookies based on your browser and consent settings.':
    'يستخدم عارض حسابات تيك توك التخزين المحلي الأساسي لتذكر تفضيلاتك والحفاظ على أمان الموقع. في حال عرض الإعلانات، قد يضع شركاء الإعلانات مثل Google AdSense ملفات تعريف ارتباط استناداً إلى إعدادات متصفحك وموافقتك.',

  'General Disclaimer': 'إخلاء المسؤولية العام',
  'Important legal clarification regarding information accuracy, metrics estimates, and third-party platform limitations.':
    'توضيح قانوني هام بخصوص دقة المعلومات، وتقديرات الإحصائيات، ومحددات المنصات الخارجية.',
  'All profile data, follower counts, and video metrics displayed on Tik Profiles Viewer are retrieved from public endpoints for informational purposes only. We cannot guarantee real-time accuracy, completeness, or uninterrupted availability.':
    'يتم استرجاع جميع بيانات الحسابات وأعداد المتابعين وإحصائيات الفيديو المعروضة على عارض حسابات تيك توك من واجهات عامة لأغراض إعلامية فقط. لا نضمن الدقة الفورية أو الاكتمال أو التوفر دون انقطاع.',

  'Legal Notice': 'الإشعار القانوني وبيانات المشغل',
  'Statutory provider identification, editorial responsibility, and official contact information for TikProfilesViewer.com.':
    'بيانات موفر الخدمة النظامية، والمسؤولية التحريرية، ومعلومات الاتصال الرسمية الخاصة بـ TikProfilesViewer.com.',
  'Official legal notice and corporate identification for Tik Profiles Viewer, outlining service ownership, technical hosting, designated legal representatives, and contact avenues.':
    'الإشعار القانوني الرسمي وهوية عارض حسابات تيك توك، موضحاً ملكية الخدمة، والاستضافة الفنية، وجهات الاتصال الرسمية.',

  'Copyright & DMCA Policy': 'سياسة حقوق النشر والألفية الرقمية (DMCA)',
  'Our intellectual property principles, respect for creator ownership, and formal procedures for submitting copyright infringement notices.':
    'مبادئنا الخاصة بالملكية الفكرية، واحترام ملكية المبدعين، والإجراءات الرسمية لتقديم إخطارات انتهاك حقوق النشر.',
  'Tik Profiles Viewer respects creator intellectual property rights. We do not host media on our own storage servers. If you are a copyright owner and wish to request removal of content from our search index, follow our formal DMCA procedure below.':
    'يحترم عارض حسابات تيك توك حقوق الملكية الفكرية لصناع المحتوى. نحن لا نستضيف وسائط على خوادمنا الخاصة. إذا كنت مالك حق مؤلف وترغب بطلب إزالة المحتوى من فهرس البحث لدينا، اتبع إجراءات DMCA الرسمية أدناه.',

  'TikTok Independence Disclaimer': 'إشعار الاستقلالية عن تيك توك',
  'Clear and unambiguous disclosure regarding our autonomous operational status and lack of corporate affiliation with ByteDance or TikTok.':
    'إفصاح واضح وصريح بشأن استقلاليتنا التشغيلية التامة وعدم وجود أي تبعية مؤسسية لشركة ByteDance أو TikTok.',
  'Tik Profiles Viewer is an entirely independent web platform. We are not owned, operated, authorized, endorsed, sponsored, or affiliated with TikTok Inc., ByteDance Ltd., or any of their global subsidiaries.':
    'عارض حسابات تيك توك منصة ويب مستقلة تماماً. الموقع غير مملوك، ولا يُدار، ولا يحظى بترخيص أو رعاية أو موافقة من شركة TikTok Inc. أو ByteDance Ltd. أو أي من شركاتهما التابعة.',

  'Public Content Policy': 'سياسة التعامل مع المحتوى العام',
  'How Tik Profiles Viewer identifies, accesses, and displays only publicly available social media data.':
    'كيف يتعرف عارض حسابات تيك توك على بيانات وسائل التواصل الاجتماعي المتاحة علناً للجمهور ويعرضها فقط.',
  'Tik Profiles Viewer strictly interacts with content that creators have chosen to make publicly accessible to the open internet. We do not bypass private accounts, age-gates, or digital security barriers.':
    'يتفاعل عارض حسابات تيك توك حصرياً مع المحتوى الذي اختار صناع المحتوى إتاحته للعامة على الإنترنت المفتوح. لا نتجاوز الحسابات الخاصة أو الحواجز الأمنية الرقمية مطلقاً.',

  'Content Review & Removal Policy': 'سياسة مراجعة وإزالة المحتوى',
  'Clear, fair, and accessible procedures for content creators, rights owners, and individuals requesting content review or exclusion.':
    'إجراءات واضحة وعادلة وميسرة لصناع المحتوى وأصحاب الحقوق والأفراد لطلب مراجعة المحتوى أو استبعاد الحسابات.',
  'We provide an open, transparent pathway for creators and individuals to request that their profiles, videos, or personal information be excluded from Tik Profiles Viewer search results and proxy indexes.':
    'نوفر مساراً شفافاً ومفتوحاً لصناع المحتوى والأفراد لطلب استبعاد حساباتهم أو فيديوهاتهم من نتائج بحث عارض حسابات تيك توك وفهارسه.',

  'Acceptable Use Policy': 'سياسة الاستخدام المقبول',
  'The rules of conduct, ethical standards, and prohibited technical practices required of all visitors on TikProfilesViewer.com.':
    'قواعد السلوك، والمعايير الأخلاقية، والممارسات الفنية المحظورة المفروضة على جميع زوار TikProfilesViewer.com.',
  'Tik Profiles Viewer is engineered for peaceful, respectful, and lawful exploration of public social media content. We strictly prohibit harassment, stalking, automated scraping, denial-of-service abuse, and malicious activities.':
    'تم تصميم عارض حسابات تيك توك للاستكشاف السلمي والمحترم والمشروع للمحتوى العام. يُحظر تماماً التحرش، والتتبع الخبيث، والكشط الآلي العنيف، وهجمات حجب الخدمة، وكافة الأنشطة الضارة.',

  'Security Policy': 'سياسة الأمان وحماية النظام',
  'The technical standards, encryption protocols, and administrative controls implemented to protect our web platform and users.':
    'المعايير الفنية، وبروتوكولات التشفير، والضوابط الإدارية المطبقة لحماية منصتنا ومستخدمينا.',
  'Tik Profiles Viewer prioritizes user security and system resilience. We employ modern HTTPS/TLS encryption, cloud DDoS mitigation, and regular security reviews to maintain a secure, safe environment.':
    'يضع عارض حسابات تيك توك أمان المستخدمين وصمود النظام في مقدمة أولوياته. نستخدم تشفير HTTPS/TLS الحديث، وحماية السحاب ضد هجمات DDoS، ومراجعات أمنية دورية.',

  'Service Availability Policy': 'سياسة توافر الخدمة واستمراريتها',
  'Information regarding technical uptime objectives, scheduled maintenance, and external dependency factors affecting availability.':
    'معلومات حول أهداف الجاهزية الفنية، وأعمال الصيانة المجدولة، وعوامل الارتباط بالشبكات الخارجية المؤثرة على التوفر.',
  'We strive to provide dependable, round-the-clock uptime. However, because our service relies on external public network endpoints, temporary interruptions or rate limits may occur beyond our direct control.':
    'نسعى جاهدين لتوفير خدمة موثوقة على مدار الساعة. ومع ذلك، نظراً لاعتماد خدمتنا على نقاط نهاية شبكية خارجية، قد تحدث انقطاعات مؤقتة أو قيود طلب خارجة عن سيطرتنا المباشرة.',
};

const FR_LEGAL: TranslationMap = {
  'Terms of Service': 'Conditions d’Utilisation',
  'The binding terms, rules, and conditions governing access to and use of Tik Profiles Viewer on TikProfilesViewer.com.':
    'Les conditions et règles régissant l’accès et l’utilisation de Tik Profiles Viewer sur TikProfilesViewer.com.',
  'By accessing or using Tik Profiles Viewer, you agree to these Terms of Service. Our service allows users to inspect public creator profiles and download public media for personal, non-commercial use in compliance with applicable laws.':
    'En accédant à Tik Profiles Viewer, vous acceptez ces conditions d’utilisation. Notre service permet de consulter des profils publics et de télécharger des médias publics à des fins personnelles et non commerciales.',

  'Privacy Policy': 'Politique de Confidentialité',
  'How Tik Profiles Viewer protects your privacy, handles server logs, and explains advertising cookies in clear Plain English.':
    'Comment Tik Profiles Viewer protège votre vie privée, gère les journaux de serveur et explique les cookies publicitaires en toute clarté.',
  'Tik Profiles Viewer does not ask you to sign up, log in, or share personal details. We only process temporary technical logs needed to run the site safely, and you control your cookie and ad choices.':
    'Tik Profiles Viewer ne vous demande pas de créer un compte, de vous connecter ou de transmettre des données personnelles. Nous ne traitons que des journaux techniques temporaires pour sécuriser le service.',

  'Cookie Policy': 'Politique relative aux Cookies',
  'Clear information about how cookies and browser storage work on TikProfilesViewer.com and how you can control them.':
    'Informations claires sur l’utilisation des cookies et du stockage local sur TikProfilesViewer.com et sur vos options de contrôle.',
  'Tik Profiles Viewer uses basic browser storage to remember your preferences and keep the site safe. If ads are shown, advertising partners such as Google AdSense may also place cookies based on your browser and consent settings.':
    'Tik Profiles Viewer utilise le stockage local de votre navigateur pour mémoriser vos préférences et sécuriser le site. En cas d’affichage de publicités, nos partenaires publicitaires peuvent déposer des cookies selon vos choix.',

  'General Disclaimer': 'Avertissement Général',
  'Important legal clarification regarding information accuracy, metrics estimates, and third-party platform limitations.':
    'Clarification juridique importante concernant l’exactitude des données, les estimations et les limites des plateformes tierces.',
  'All profile data, follower counts, and video metrics displayed on Tik Profiles Viewer are retrieved from public endpoints for informational purposes only. We cannot guarantee real-time accuracy, completeness, or uninterrupted availability.':
    'Toutes les données de profils et statistiques affichées sur Tik Profiles Viewer sont extraites de sources publiques à titre purement indicatif. Nous ne pouvons garantir une disponibilité ininterrompue ou une précision absolue.',

  'Legal Notice': 'Mentions Légales',
  'Statutory provider identification, editorial responsibility, and official contact information for TikProfilesViewer.com.':
    'Identification légale de l’éditeur, responsabilité éditoriale et coordonnées officielles pour TikProfilesViewer.com.',
  'Official legal notice and corporate identification for Tik Profiles Viewer, outlining service ownership, technical hosting, designated legal representatives, and contact avenues.':
    'Mentions légales officielles de Tik Profiles Viewer précisant la propriété du service, l’hébergement technique et les modalités de contact.',

  'Copyright & DMCA Policy': 'Politique Droits d’Auteur & DMCA',
  'Our intellectual property principles, respect for creator ownership, and formal procedures for submitting copyright infringement notices.':
    'Nos principes de propriété intellectuelle, le respect des créateurs et la procédure officielle de notification d’atteinte aux droits d’auteur.',
  'Tik Profiles Viewer respects creator intellectual property rights. We do not host media on our own storage servers. If you are a copyright owner and wish to request removal of content from our search index, follow our formal DMCA procedure below.':
    'Tik Profiles Viewer respecte les droits de propriété intellectuelle. Nous n’hébergeons aucun fichier média sur nos propres serveurs. Pour demander un retrait d’indexation, suivez notre procédure DMCA.',

  'TikTok Independence Disclaimer': 'Avis d’Indépendance envers TikTok',
  'Clear and unambiguous disclosure regarding our autonomous operational status and lack of corporate affiliation with ByteDance or TikTok.':
    'Divulgation claire confirmant notre fonctionnement autonome et l’absence d’affiliation avec ByteDance ou TikTok.',
  'Tik Profiles Viewer is an entirely independent web platform. We are not owned, operated, authorized, endorsed, sponsored, or affiliated with TikTok Inc., ByteDance Ltd., or any of their global subsidiaries.':
    'Tik Profiles Viewer est un service web totalement indépendant. Nous ne sommes ni détenus, ni exploités, ni affiliés à TikTok Inc. ou ByteDance Ltd.',

  'Public Content Policy': 'Politique relative au Contenu Public',
  'How Tik Profiles Viewer identifies, accesses, and displays only publicly available social media data.':
    'Modalités d’accès et d’affichage appliquées exclusivement aux données publiques des réseaux sociaux.',
  'Tik Profiles Viewer strictly interacts with content that creators have chosen to make publicly accessible to the open internet. We do not bypass private accounts, age-gates, or digital security barriers.':
    'Tik Profiles Viewer interagit uniquement avec les contenus rendus publics par les créateurs sur l’internet ouvert. Nous ne contournons aucun compte privé ni protection technique.',

  'Content Review & Removal Policy': 'Politique de Révision et Suppression de Contenu',
  'Clear, fair, and accessible procedures for content creators, rights owners, and individuals requesting content review or exclusion.':
    'Procédures claires et accessibles permettant aux créateurs et ayants droit de demander l’exclusion de profils ou de vidéos.',
  'We provide an open, transparent pathway for creators and individuals to request that their profiles, videos, or personal information be excluded from Tik Profiles Viewer search results and proxy indexes.':
    'Nous offrons une voie transparente permettant aux créateurs de faire exclure leurs profils ou contenus des résultats de recherche de Tik Profiles Viewer.',

  'Acceptable Use Policy': 'Politique d’Utilisation Acceptable',
  'The rules of conduct, ethical standards, and prohibited technical practices required of all visitors on TikProfilesViewer.com.':
    'Règles de conduite, principes éthiques et pratiques techniques interdites sur TikProfilesViewer.com.',
  'Tik Profiles Viewer is engineered for peaceful, respectful, and lawful exploration of public social media content. We strictly prohibit harassment, stalking, automated scraping, denial-of-service abuse, and malicious activities.':
    'Tik Profiles Viewer est conçu pour une exploration respectueuse et licite. Nous interdisons formellement le harcèlement, le scraping massif automatisé et les attaques par déni de service.',

  'Security Policy': 'Politique de Sécurité',
  'The technical standards, encryption protocols, and administrative controls implemented to protect our web platform and users.':
    'Normes techniques, protocoles de chiffrement et contrôles appliqués pour protéger notre plateforme.',
  'Tik Profiles Viewer prioritizes user security and system resilience. We employ modern HTTPS/TLS encryption, cloud DDoS mitigation, and regular security reviews to maintain a secure, safe environment.':
    'Tik Profiles Viewer accorde une priorité absolue à la sécurité. Nous utilisons le chiffrement HTTPS/TLS moderne et des protections cloud anti-DDoS.',

  'Service Availability Policy': 'Politique de Disponibilité du Service',
  'Information regarding technical uptime objectives, scheduled maintenance, and external dependency factors affecting availability.':
    'Informations sur les objectifs de disponibilité, la maintenance programmée et les dépendances externes.',
  'We strive to provide dependable, round-the-clock uptime. However, because our service relies on external public network endpoints, temporary interruptions or rate limits may occur beyond our direct control.':
    'Nous visons une haute disponibilité continue. Toutefois, dépendant de réseaux publics tiers, des interruptions ou limitations temporaires peuvent survenir indépendamment de notre contrôle.',
};

const ES_LEGAL: TranslationMap = {
  'Terms of Service': 'Términos de Servicio',
  'The binding terms, rules, and conditions governing access to and use of Tik Profiles Viewer on TikProfilesViewer.com.':
    'Los términos y reglas vinculantes que rigen el acceso y uso de Tik Profiles Viewer en TikProfilesViewer.com.',
  'By accessing or using Tik Profiles Viewer, you agree to these Terms of Service. Our service allows users to inspect public creator profiles and download public media for personal, non-commercial use in compliance with applicable laws.':
    'Al acceder o utilizar Tik Profiles Viewer, aceptas estos Términos de Servicio. Nuestro servicio permite inspeccionar perfiles públicos y descargar contenido para uso personal y no comercial.',

  'Privacy Policy': 'Política de Privacidad',
  'How Tik Profiles Viewer protects your privacy, handles server logs, and explains advertising cookies in clear Plain English.':
    'Cómo Tik Profiles Viewer protege tu privacidad, gestiona registros técnicos y explica las cookies publicitarias con total claridad.',
  'Tik Profiles Viewer does not ask you to sign up, log in, or share personal details. We only process temporary technical logs needed to run the site safely, and you control your cookie and ad choices.':
    'Tik Profiles Viewer no requiere registro, inicio de sesión ni datos personales. Solo procesamos registros técnicos temporales para operar de forma segura.',

  'Cookie Policy': 'Política de Cookies',
  'Clear information about how cookies and browser storage work on TikProfilesViewer.com and how you can control them.':
    'Información clara sobre el funcionamiento de cookies y almacenamiento local en TikProfilesViewer.com y cómo gestionarlos.',
  'Tik Profiles Viewer uses basic browser storage to remember your preferences and keep the site safe. If ads are shown, advertising partners such as Google AdSense may also place cookies based on your browser and consent settings.':
    'Tik Profiles Viewer utiliza almacenamiento básico del navegador para recordar tus preferencias. Si se muestran anuncios, socios como Google AdSense pueden usar cookies según tu configuración.',

  'General Disclaimer': 'Descargo General de Responsabilidad',
  'Important legal clarification regarding information accuracy, metrics estimates, and third-party platform limitations.':
    'Aclaración legal relevante sobre exactitud de información, estimaciones y limitaciones de plataformas externas.',
  'All profile data, follower counts, and video metrics displayed on Tik Profiles Viewer are retrieved from public endpoints for informational purposes only. We cannot guarantee real-time accuracy, completeness, or uninterrupted availability.':
    'Todos los datos y métricas mostrados en Tik Profiles Viewer se obtienen de fuentes públicas con fines meramente informativos. No garantizamos disponibilidad ininterrumpida.',

  'Legal Notice': 'Aviso Legal',
  'Statutory provider identification, editorial responsibility, and official contact information for TikProfilesViewer.com.':
    'Identificación legal del proveedor, responsabilidad editorial y canales oficiales de contacto para TikProfilesViewer.com.',
  'Official legal notice and corporate identification for Tik Profiles Viewer, outlining service ownership, technical hosting, designated legal representatives, and contact avenues.':
    'Aviso legal oficial de Tik Profiles Viewer que detalla la titularidad del servicio, alojamiento técnico y vías de contacto.',

  'Copyright & DMCA Policy': 'Política de Derechos de Autor y DMCA',
  'Our intellectual property principles, respect for creator ownership, and formal procedures for submitting copyright infringement notices.':
    'Nuestros principios sobre propiedad intelectual, respeto a creadores y proceso formal de reclamación por infracción.',
  'Tik Profiles Viewer respects creator intellectual property rights. We do not host media on our own storage servers. If you are a copyright owner and wish to request removal of content from our search index, follow our formal DMCA procedure below.':
    'Tik Profiles Viewer respeta la propiedad intelectual. No alojamos archivos multimedia en servidores propios. Para solicitar exclusión de nuestro índice, sigue el procedimiento DMCA.',

  'TikTok Independence Disclaimer': 'Aviso de Independencia de TikTok',
  'Clear and unambiguous disclosure regarding our autonomous operational status and lack of corporate affiliation with ByteDance or TikTok.':
    'Aviso transparente que confirma nuestra operación autónoma sin afiliación corporativa con ByteDance o TikTok.',
  'Tik Profiles Viewer is an entirely independent web platform. We are not owned, operated, authorized, endorsed, sponsored, or affiliated with TikTok Inc., ByteDance Ltd., or any of their global subsidiaries.':
    'Tik Profiles Viewer es un servicio web independiente. No pertenecemos ni estamos asociados formalmente a TikTok Inc. o ByteDance Ltd.',

  'Public Content Policy': 'Política de Contenido Público',
  'How Tik Profiles Viewer identifies, accesses, and displays only publicly available social media data.':
    'Cómo Tik Profiles Viewer identifica y muestra exclusivamente información accesible al público en internet.',
  'Tik Profiles Viewer strictly interacts with content that creators have chosen to make publicly accessible to the open internet. We do not bypass private accounts, age-gates, or digital security barriers.':
    'Tik Profiles Viewer interactúa exclusivamente con contenido publicado de forma abierta por los creadores. Nunca eludimos cuentas privadas ni barreras de seguridad.',

  'Content Review & Removal Policy': 'Política de Revisión y Eliminación de Contenido',
  'Clear, fair, and accessible procedures for content creators, rights owners, and individuals requesting content review or exclusion.':
    'Procedimiento accesible para que creadores y titulares de derechos soliciten la exclusión de perfiles o videos.',
  'We provide an open, transparent pathway for creators and individuals to request that their profiles, videos, or personal information be excluded from Tik Profiles Viewer search results and proxy indexes.':
    'Ofrecemos un canal transparente para solicitar la exclusión de perfiles o videos de los resultados de búsqueda de Tik Profiles Viewer.',

  'Acceptable Use Policy': 'Política de Uso Aceptable',
  'The rules of conduct, ethical standards, and prohibited technical practices required of all visitors on TikProfilesViewer.com.':
    'Reglas de conducta, estándares éticos y prácticas técnicas prohibidas para los visitantes de TikProfilesViewer.com.',
  'Tik Profiles Viewer is engineered for peaceful, respectful, and lawful exploration of public social media content. We strictly prohibit harassment, stalking, automated scraping, denial-of-service abuse, and malicious activities.':
    'Tik Profiles Viewer está diseñado para un uso legítimo y respetuoso. Queda prohibido el acoso, el scraping automatizado agresivo y los ataques de denegación de servicio.',

  'Security Policy': 'Política de Seguridad',
  'The technical standards, encryption protocols, and administrative controls implemented to protect our web platform and users.':
    'Estándares técnicos, protocolos de cifrado y controles aplicados para proteger nuestra plataforma.',
  'Tik Profiles Viewer prioritizes user security and system resilience. We employ modern HTTPS/TLS encryption, cloud DDoS mitigation, and regular security reviews to maintain a secure, safe environment.':
    'La seguridad y resiliencia son prioritarias en Tik Profiles Viewer. Implementamos cifrado HTTPS/TLS moderno y mitigación de ataques DDoS en la nube.',

  'Service Availability Policy': 'Política de Disponibilidad del Servicio',
  'Information regarding technical uptime objectives, scheduled maintenance, and external dependency factors affecting availability.':
    'Información sobre objetivos de disponibilidad, mantenimiento programado y factores externos que pueden influir en el servicio.',
  'We strive to provide dependable, round-the-clock uptime. However, because our service relies on external public network endpoints, temporary interruptions or rate limits may occur beyond our direct control.':
    'Trabajamos para mantener una alta disponibilidad continua. Al depender de puntos de red públicos externos, pueden producirse límites temporales ajenos a nuestro control.',
};

export const LEGAL_PHRASE_TRANSLATIONS: Record<LanguageCode, TranslationMap> = {
  en: {},
  ar: AR_LEGAL,
  fr: FR_LEGAL,
  es: ES_LEGAL,
  de: {},
  ru: {},
  zh: {},
  pt: {},
  he: {},
  hi: {},
};