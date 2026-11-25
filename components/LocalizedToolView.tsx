TASK: Implement Milestone 4 - Page Metadata x-default, Dynamic Profile/Category Metadata & Home JSON-LD Localization for TikProfilesViewer.com.

CONTEXT:
- Milestones 1 through 3 are fully completed (Robots, headers, clean sitemap routing, internal linking across all 10 tools and 10 categories, and multilingual UI strings).
- We now need to ensure that every public page includes 'x-default' in its alternate language links, that /profile/[username] and /category/[slug] generate native localized metadata and JSON-LD schemas across all 10 languages (en, ar, fr, es, de, ru, zh, pt, he, hi), and that the home WebApplication and FAQPage schemas are fully localized.

PLEASE EXECUTE:
1. app/page.tsx: Add 'x-default' to metadata alternates and localize WebApplication & FAQPage JSON-LD using request language.
2. app/categories/page.tsx, app/about-tiktok-profile-viewer/page.tsx, app/how-to-use-tiktok-profile-viewer/page.tsx: Add 'x-default' alternates.
3. app/profile/[username]/page.tsx & app/category/[slug]/page.tsx: Generate fully localized metadata titles, descriptions, and JSON-LD schemas for all 10 supported languages.
4. components/LocalizedToolView.tsx: Add 'x-default' alternates and localize FAQPage JSON-LD schemas for the 6 downloader/viewer tool pages.

Follow strict single-file Batches and deliver professional, clean TypeScript code matching project standards.