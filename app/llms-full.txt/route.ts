// File: app/llms-full.txt/route.ts
import { CATEGORIES, CREATORS } from '@/lib/creators-data';
import { SUPPORTED_LANGUAGES } from '@/lib/i18n/types';
import { SITE_LAST_UPDATED_ISO } from '@/lib/seo/metadata';
import { getBaseUrl } from '@/lib/seo/sitemap';

export const revalidate = 3600;

interface ToolSpec {
  name: string;
  path: string;
  input: string;
  output: string;
  summary: string;
}

const TOOL_SPECS: ToolSpec[] = [
  {
    name: 'HD Video Downloader',
    path: '/tiktok-video-downloader',
    input: 'Public TikTok @username or video URL',
    output: 'Clean 1080p MP4 video without watermark',
    summary:
      'Retrieves the original public video stream before watermark overlays are added and saves MP4 directly to phone or desktop storage.',
  },
  {
    name: 'Audio MP3 Extractor',
    path: '/tiktok-mp3-downloader',
    input: 'Public TikTok @username or video URL',
    output: 'Clean MP3 audio track',
    summary:
      'Extracts background music, voiceovers, and original sound clips from public TikTok posts without downloading the full video file.',
  },
  {
    name: 'Anonymous Profile Viewer',
    path: '/tiktok-profile-viewer',
    input: 'Public TikTok @username',
    output: 'Live profile bio, follower metrics, and video grid',
    summary:
      'Displays public creator details, verified status, follower counts, total likes, and recent uploads without requiring a TikTok login.',
  },
  {
    name: 'Story Downloader',
    path: '/tiktok-story-downloader',
    input: 'Public TikTok @username',
    output: 'Clean MP4 story file',
    summary:
      'Allows anonymous viewing and saving of public 24-hour TikTok stories before they expire from the app.',
  },
  {
    name: 'Photo & Slideshow Downloader',
    path: '/tiktok-photo-downloader',
    input: 'Public TikTok @username or photo post URL',
    output: 'Individual full-resolution JPG images',
    summary:
      'Extracts each slide from multi-image TikTok carousel posts in native HD resolution without overlaid text or corner watermarks.',
  },
  {
    name: 'Watermark Remover',
    path: '/tiktok-watermark-remover',
    input: 'Public TikTok @username or video URL',
    output: 'Unwatermarked MP4 stream',
    summary:
      'Fetches the unwatermarked source stream directly so frames remain sharp with zero cropping or corner blurring.',
  },
  {
    name: 'Profile Analytics',
    path: '/tiktok-analytics',
    input: 'Public TikTok @username',
    output: 'Engagement rate, average views, likes, and sponsorship estimate',
    summary:
      'Calculates live creator engagement metrics and per-post performance breakdowns from public feed items.',
  },
  {
    name: 'Money Calculator',
    path: '/tiktok-money-calculator',
    input: 'Followers, average views, monthly uploads, content niche',
    output: 'Estimated monthly income breakdown',
    summary:
      'Provides educational estimates for brand sponsorships, Creator Rewards Program payouts, and live gifts.',
  },
  {
    name: 'Engagement Calculator',
    path: '/tiktok-engagement-calculator',
    input: 'Likes, comments, shares, and views or followers',
    output: 'Exact engagement percentage and benchmark rating',
    summary:
      'Computes engagement rate either by video views or follower count against standard industry thresholds.',
  },
  {
    name: 'Caption & Hashtag Generator',
    path: '/tiktok-caption-generator',
    input: 'Optional topic and content niche',
    output: 'Copy-ready short hook and focused hashtags',
    summary:
      'Generates short opening lines under 150 characters paired with category-matched hashtags.',
  },
];

export async function GET() {
  const baseUrl = getBaseUrl();

  const lines: string[] = [
    '# Tik Profiles Viewer: Full Structured Reference',
    '',
    `Last Updated: ${SITE_LAST_UPDATED_ISO.slice(0, 10)}`,
    `Canonical Domain: ${baseUrl}`,
    `Concise Index: ${baseUrl}/llms.txt`,
    `XML Sitemap Index: ${baseUrl}/sitemap.xml`,
    `HTML Sitemap: ${baseUrl}/sitemap`,
    '',
    '## 1. Service Overview & Key Facts',
    '- Service Name: Tik Profiles Viewer (TikProfilesViewer.com)',
    '- Cost: 100% free with no subscriptions, login walls, or daily download caps.',
    '- Privacy: No user account required. Viewing public profiles leaves no visitor record on the creator account.',
    '- Scope: Public TikTok profiles, public videos, public photo slideshows, and public stories only. Private or restricted accounts are never bypassed.',
    '- Architecture: Browser-direct media loading with no server-side media hosting. Media streams load directly from public CDNs.',
    `- Multilingual Support: Available in ${SUPPORTED_LANGUAGES.length} languages (${SUPPORTED_LANGUAGES.map((l) => l.code).join(', ')}), including full RTL support for Arabic (ar) and Hebrew (he).`,
    '- Independence Notice: Tik Profiles Viewer is an independent web utility and is not affiliated with, endorsed by, or associated with TikTok Inc. or ByteDance Ltd.',
    '',
    '## 2. Free Downloader & Creator Tools',
    ...TOOL_SPECS.flatMap((tool) => [
      `### ${tool.name}`,
      `- URL: ${baseUrl}${tool.path}`,
      `- Input: ${tool.input}`,
      `- Output: ${tool.output}`,
      `- Summary: ${tool.summary}`,
      '',
    ]),
    '## 3. Categories Directory',
    ...CATEGORIES.flatMap((cat) => [
      `### ${cat.name}`,
      `- URL: ${baseUrl}/category/${cat.slug}`,
      `- Description: ${cat.seoDescription}`,
      `- Trending Tags: ${cat.trendingTags.join(', ')}`,
      `- Featured Usernames: ${cat.creatorUsernames.map((u) => `@${u}`).join(', ')}`,
      ...cat.faqs.map((faq) => `- FAQ: ${faq.question} -> ${faq.answer}`),
      '',
    ]),
    `## 4. Curated Public Creators (${CREATORS.length} Profiles)`,
    ...CREATORS.map(
      (c) =>
        `- ${c.displayName} (@${c.username}) | Category: ${c.category} | Followers: ${c.followers} | Total Likes: ${c.likes} | Country: ${c.country} | URL: ${baseUrl}/profile/${c.username}`
    ),
    '',
    '## 5. Multilingual Root URLs',
    ...SUPPORTED_LANGUAGES.map((lang) => {
      const url = lang.isDefault ? `${baseUrl}/` : `${baseUrl}/${lang.code}`;
      return `- ${lang.name} (${lang.native}, ${lang.code}, ${lang.dir.toUpperCase()}): ${url}`;
    }),
    '',
    '## 6. Frequently Asked Questions',
    '- How do I view a TikTok profile without an account? Enter any public @username in the search bar on the homepage or any tool page to inspect bio details, follower stats, and published videos with no login.',
    '- How do I download TikTok videos without watermark? Open any video card from a creator profile or paste a public video link, then click Download HD Video to save the clean MP4 stream.',
    '- How do I save only the audio in MP3 format? Click any video card to open the media modal and select Download Audio (MP3).',
    '- How many videos load per profile? The first 30 public videos load immediately, and clicking Show More Videos fetches 15 additional videos per batch.',
    '',
    '## 7. Governance, Removal & Contact',
    `- Public Content Policy: ${baseUrl}/public-content-policy`,
    `- Content Removal Policy: ${baseUrl}/content-removal-policy`,
    `- Copyright & DMCA Policy: ${baseUrl}/copyright-policy`,
    `- Privacy Policy: ${baseUrl}/privacy-policy`,
    `- Terms of Service: ${baseUrl}/terms-of-service`,
    '- Support Email: support@tikprofilesviewer.com',
    '- Legal & Removal Requests: legal@tikprofilesviewer.com',
    '',
  ];

  return new Response(lines.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control':
        'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}