# Tik Profiles Viewer (`TikProfilesViewer.com`)

Anonymous TikTok profile viewer, HD MP4 video player, slideshow photo downloader, and MP3 audio extractor built with Next.js 15 App Router, React 19, and Tailwind CSS v4.

## Architecture Highlights

- **Zero Server Media Bandwidth:** All video playback, cover images, and MP4/MP3/JPG downloads load directly in the visitor's browser from cookie-free CDN URLs.
- **10-Language i18n Routing & SEO:** Multilingual URL routing via `middleware.ts` (`en`, `ar`, `fr`, `es`, `de`, `ru`, `zh`, `pt`, `he`, `hi`), `hreflang` alternates, Schema.org JSON-LD, and split XML sitemaps (`/sitemap.xml` and `/sitemaps/[name]`).
- **Admin Console (`/admintiktok`):** Protected by server-side `HttpOnly` session cookies and backed by configurable global settings persistence.

## Local Development

```bash
npm install
npm run dev