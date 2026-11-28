// File: app/llms.txt/route.ts
import { CATEGORIES, CREATORS } from '@/lib/creators-data';
import { SUPPORTED_LANGUAGES } from '@/lib/i18n/types';
import { getBaseUrl } from '@/lib/seo/sitemap';

export const revalidate = 3600;

export async function GET() {
  const baseUrl = getBaseUrl();
  const topCreators = CREATORS.slice(0, 15);

  const lines: string[] = [
    '# Tik Profiles Viewer',
    '',
    '> Free web utility at TikProfilesViewer.com to view public TikTok profiles anonymously with no login, inspect live creator stats, and save watermark-free HD MP4 videos, slideshow photos, and MP3 audio.',
    '',
    '## Overview & Usage Rules',
    `- Canonical Base URL: ${baseUrl}`,
    `- Full Structured Reference: ${baseUrl}/llms-full.txt`,
    `- XML Sitemap Index: ${baseUrl}/sitemap.xml`,
    `- HTML Sitemap: ${baseUrl}/sitemap`,
    '- Access Scope: Public TikTok accounts and public media only. Private accounts and restricted posts are not accessible.',
    '- Independence: Tik Profiles Viewer is an independent web service and is not affiliated with TikTok or ByteDance Ltd.',
    '- Account Requirement: No sign-up, login, or personal account is required.',
    '',
    '## Core Pages',
    `- [Home & Anonymous Profile Viewer](${baseUrl}/): Search any public TikTok username or video link to view stats and stream HD video.`,
    `- [Top TikTok Creators Directory](${baseUrl}/creators): Browse ${CREATORS.length} curated public creators by follower count and category.`,
    `- [TikTok Categories Hub](${baseUrl}/categories): Explore creators grouped across ${CATEGORIES.length} topic niches.`,
    `- [About Tik Profiles Viewer](${baseUrl}/about-us): Service overview, safety standards, and privacy commitment.`,
    `- [How to Use Guide](${baseUrl}/how-to-use-tiktok-profile-viewer): Step-by-step instructions for viewing profiles and saving HD MP4 or MP3 files.`,
    `- [HTML Sitemap](${baseUrl}/sitemap): Complete categorized index of tools, categories, creators, and legal pages.`,
    '',
    '## Free Downloader & Creator Tools',
    `- [HD Video Downloader](${baseUrl}/tiktok-video-downloader): Download public TikTok videos in clean 1080p MP4 format without watermark.`,
    `- [Audio MP3 Extractor](${baseUrl}/tiktok-mp3-downloader): Extract background music and voice tracks from public videos in MP3 format.`,
    `- [Anonymous Profile Viewer](${baseUrl}/tiktok-profile-viewer): Inspect public creator bios, followers, likes, and video feeds without logging in.`,
    `- [Story Downloader](${baseUrl}/tiktok-story-downloader): View and save public 24-hour TikTok stories as clean MP4 files.`,
    `- [Photo & Slideshow Downloader](${baseUrl}/tiktok-photo-downloader): Save individual HD JPG images from public photo carousel posts.`,
    `- [Watermark Remover](${baseUrl}/tiktok-watermark-remover): Retrieve original clean MP4 streams without cropping or blurring.`,
    `- [Profile Analytics](${baseUrl}/tiktok-analytics): Check live engagement rates, average views, likes, and estimated sponsorship value.`,
    `- [Money Calculator](${baseUrl}/tiktok-money-calculator): Estimate monthly creator income from sponsorships, Creator Rewards, and live gifts.`,
    `- [Engagement Calculator](${baseUrl}/tiktok-engagement-calculator): Calculate engagement rate by views or followers and compare benchmarks.`,
    `- [Caption & Hashtag Generator](${baseUrl}/tiktok-caption-generator): Build short video hooks and focused hashtags.`,
    '',
    '## Creator Categories',
    ...CATEGORIES.map(
      (cat) =>
        `- [${cat.name}](${baseUrl}/category/${cat.slug}): ${cat.shortDescription}`
    ),
    '',
    '## Featured Creators',
    ...topCreators.map(
      (creator) =>
        `- [${creator.displayName} (@${creator.username})](${baseUrl}/profile/${creator.username}): ${creator.followers} followers, ${creator.likes} likes, ${creator.category}.`
    ),
    '',
    '## Supported Languages',
    ...SUPPORTED_LANGUAGES.map((lang) => {
      const prefix = lang.isDefault ? `${baseUrl}/` : `${baseUrl}/${lang.code}`;
      return `- ${lang.name} (${lang.native}, \`${lang.code}\`, ${lang.dir.toUpperCase()}): ${prefix}`;
    }),
    '',
    '## Legal & Policy Pages',
    `- [Terms of Service](${baseUrl}/terms-of-service)`,
    `- [Privacy Policy](${baseUrl}/privacy-policy)`,
    `- [Cookie Policy](${baseUrl}/cookie-policy)`,
    `- [Disclaimer](${baseUrl}/disclaimer)`,
    `- [Legal Notice](${baseUrl}/legal-notice)`,
    `- [Copyright & DMCA Policy](${baseUrl}/copyright-policy)`,
    `- [TikTok Independence Disclaimer](${baseUrl}/tiktok-independence-disclaimer)`,
    `- [Public Content Policy](${baseUrl}/public-content-policy)`,
    `- [Content Removal Policy](${baseUrl}/content-removal-policy)`,
    `- [Acceptable Use Policy](${baseUrl}/acceptable-use-policy)`,
    `- [Security Policy](${baseUrl}/security-policy)`,
    `- [Service Availability Policy](${baseUrl}/service-availability-policy)`,
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