/**
 * Client-side media and API controller.
 * Uses /api/tiktok and /api/resolve for lightweight JSON metadata only (no browser CORS calls to third-party APIs),
 * direct CDN playback and client-side Blob/link downloads ($0 server media bandwidth),
 * and /api/proxy strictly when a cookie-gated TikTok CDN fallback requires server session cookies.
 */

export interface TikTokVideoItem {
  video_id: string;
  id: string;
  title: string;
  duration: number;
  cover: string;
  origin_cover: string;
  play: string;
  wmplay: string;
  music: string;
  music_info: {
    id: string;
    title: string;
    author: string;
    play: string;
    cover: string;
  };
  play_count: number;
  digg_count: number;
  comment_count: number;
  share_count: number;
  download_count: number;
  create_time: number;
  author: {
    id: string;
    unique_id: string;
    nickname: string;
    avatar: string;
    signature: string;
    verified: boolean;
  };
}

export interface TikTokUserSummary {
  id: string;
  secUid?: string;
  unique_id: string;
  nickname: string;
  avatar: string;
  signature: string;
  verified: boolean;
  status: 'active' | 'private' | 'not_found';
}

export interface TikTokStatsSummary {
  followerCount: number | null;
  followingCount: number | null;
  heartCount: number | null;
  videoCount: number;
}

export interface TikTokProfileApiResponse {
  code: number;
  msg: string;
  data?: {
    user: TikTokUserSummary;
    stats: TikTokStatsSummary;
    videos: TikTokVideoItem[];
    cursor: string | null;
    hasMore: boolean;
  };
}

const profileCache = new Map<string, { data: TikTokProfileApiResponse; expiresAt: number }>();

export function normalizeMediaUrl(url?: string, base = 'https://www.tikwm.com'): string {
  if (!url) return '';
  let cleaned = url.replace(/\\u0026/g, '&').replace(/\\u002F/g, '/').trim();
  if (!cleaned) return '';
  if (cleaned.startsWith('//')) {
    cleaned = `https:${cleaned}`;
  } else if (cleaned.startsWith('/')) {
    cleaned = `${base}${cleaned}`;
  } else if (cleaned.startsWith('http://')) {
    cleaned = cleaned.replace(/^http:\/\//i, 'https://');
  }
  return cleaned;
}

export function sanitizeUsername(rawInput: string): string {
  let cleaned = (rawInput || '').trim();
  const urlMatch = cleaned.match(/tiktok\.com\/@?([a-zA-Z0-9._]+)/);
  if (urlMatch && urlMatch[1]) {
    cleaned = urlMatch[1];
  }
  return cleaned.replace(/^@+/, '').trim().toLowerCase();
}

/**
 * Fetches profile metadata + initial video feed via /api/tiktok (JSON only).
 */
export async function fetchProfileDirect(username: string): Promise<TikTokProfileApiResponse> {
  const clean = sanitizeUsername(username);
  if (!clean) {
    throw new Error('Please enter a valid TikTok username.');
  }

  const cached = profileCache.get(clean);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.data;
  }

  const serverRes = await fetch(`/api/tiktok?username=${encodeURIComponent(clean)}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });

  const serverJson = (await serverRes.json()) as TikTokProfileApiResponse;

  if (
    serverJson.code === 0 &&
    serverJson.data &&
    serverJson.data.videos.length > 0
  ) {
    profileCache.set(clean, { data: serverJson, expiresAt: Date.now() + 120_000 });
  }

  return serverJson;
}

/**
 * Paginates more videos cleanly using secUid + cursor via /api/tiktok.
 */
export async function fetchMoreVideosDirect(
  username: string,
  cursor: string,
  count = 15,
  secUid = ''
): Promise<{ videos: TikTokVideoItem[]; cursor: string | null; hasMore: boolean }> {
  const clean = sanitizeUsername(username);
  if (!clean || !cursor) {
    return { videos: [], cursor: null, hasMore: false };
  }

  try {
    const params = new URLSearchParams({
      username: clean,
      cursor,
      count: String(count),
    });
    if (secUid) {
      params.set('secUid', secUid);
    }

    const res = await fetch(`/api/tiktok?${params.toString()}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      const data = (await res.json()) as TikTokProfileApiResponse;
      if (data && data.code === 0 && data.data) {
        return {
          videos: data.data.videos || [],
          cursor: data.data.cursor || null,
          hasMore: Boolean(data.data.hasMore && data.data.cursor),
        };
      }
    }
  } catch {
    // Fall through
  }

  return { videos: [], cursor: null, hasMore: false };
}

/**
 * Resolves a fresh stream URL and MP3 audio URL via server /api/resolve (JSON only, zero browser CORS).
 */
export async function resolveVideoStreamDirect(
  videoId: string,
  username: string
): Promise<{ play: string; wmplay: string; music: string; cover: string; needsProxy?: boolean } | null> {
  if (!videoId) return null;
  const clean = sanitizeUsername(username) || 'tiktok';

  try {
    const res = await fetch(
      `/api/resolve?id=${encodeURIComponent(videoId)}&username=${encodeURIComponent(clean)}`,
      {
        method: 'GET',
        headers: { Accept: 'application/json' },
      }
    );
    if (res.ok) {
      const data = await res.json();
      if (data?.success && data.play) {
        return {
          play: normalizeMediaUrl(data.play),
          wmplay: normalizeMediaUrl(data.wmplay),
          music: normalizeMediaUrl(data.music),
          cover: '',
          needsProxy: Boolean(data.needsProxy),
        };
      }
    }
  } catch {
    // Ignore
  }

  return null;
}

function triggerBlobSave(blob: Blob, filename: string): void {
  const objectUrl = window.URL.createObjectURL(blob);
  const tempLink = document.createElement('a');
  tempLink.style.display = 'none';
  tempLink.href = objectUrl;
  tempLink.download = filename;
  tempLink.rel = 'noreferrer noopener';
  document.body.appendChild(tempLink);
  tempLink.click();

  setTimeout(() => {
    if (tempLink.parentNode) {
      tempLink.parentNode.removeChild(tempLink);
    }
    window.URL.revokeObjectURL(objectUrl);
  }, 2000);
}

function triggerDirectLink(url: string, filename: string): void {
  const tempLink = document.createElement('a');
  tempLink.style.display = 'none';
  tempLink.href = url;
  tempLink.download = filename;
  tempLink.target = '_blank';
  tempLink.rel = 'noreferrer noopener';
  document.body.appendChild(tempLink);
  tempLink.click();

  setTimeout(() => {
    if (tempLink.parentNode) {
      tempLink.parentNode.removeChild(tempLink);
    }
  }, 1500);
}

/**
 * Executes direct client-side Blob/link download from CDN ($0 server bandwidth).
 * Falls back to /api/proxy ONLY when allowProxyFallback is explicitly true (cookie-gated fallback).
 */
export async function executeDirectCdnDownload(
  cdnUrl: string,
  filename: string,
  username = '',
  allowProxyFallback = false
): Promise<void> {
  const normalizedUrl = normalizeMediaUrl(cdnUrl);
  if (!normalizedUrl) {
    throw new Error('Media URL is unavailable for download.');
  }

  // Handle local relative paths (e.g. /api/avatar?username=...) directly
  if (cdnUrl.startsWith('/')) {
    const res = await fetch(cdnUrl);
    if (res.ok) {
      const blob = await res.blob();
      if (blob.size > 0) {
        triggerBlobSave(blob, filename);
        return;
      }
    }
    triggerDirectLink(cdnUrl, filename);
    return;
  }

  const corsFriendlyUrl = normalizedUrl.includes('p16-va-default.akamaized.net')
    ? normalizedUrl.replace('p16-va-default.akamaized.net', 'p16.tiktokcdn.com')
    : normalizedUrl;

  // Attempt 1: Zero-bandwidth direct browser CORS fetch -> local Blob save
  if (!allowProxyFallback) {
    try {
      const res = await fetch(corsFriendlyUrl, {
        method: 'GET',
        mode: 'cors',
        referrerPolicy: 'no-referrer',
        credentials: 'omit',
      });

      if (res.ok) {
        const blob = await res.blob();
        if (blob.size > 0) {
          triggerBlobSave(blob, filename);
          return;
        }
      }
    } catch {
      // Fall through to direct browser download link ($0 server bandwidth)
    }

    // Attempt 2 for non-cookie CDNs: Direct browser link ($0 server bandwidth)
    triggerDirectLink(normalizedUrl, filename);
    return;
  }

  // Cookie-gated TikTok CDN fallback (only reached when TikWM is down and needsProxy is true)
  const cleanUser = sanitizeUsername(username);
  const proxyDownloadUrl = `/api/proxy?url=${encodeURIComponent(
    normalizedUrl
  )}&filename=${encodeURIComponent(filename)}&download=1${
    cleanUser ? `&user=${encodeURIComponent(cleanUser)}` : ''
  }`;

  try {
    const proxyRes = await fetch(proxyDownloadUrl);
    if (proxyRes.ok) {
      const blob = await proxyRes.blob();
      if (blob.size > 0) {
        triggerBlobSave(blob, filename);
        return;
      }
    }
  } catch {
    // Fall through to direct proxy attachment link
  }

  triggerDirectLink(proxyDownloadUrl, filename);
}

/**
 * Prepares direct HTML5 video playback without server proxying.
 * Does NOT set crossOrigin="anonymous" so non-CORS CDN streams play cleanly.
 */
export function configureDirectPlayback(
  videoElement: HTMLVideoElement,
  directCdnUrl: string
): void {
  if (!videoElement || !directCdnUrl) return;

  videoElement.setAttribute('referrerpolicy', 'no-referrer');
  videoElement.removeAttribute('crossorigin');
  videoElement.src = normalizeMediaUrl(directCdnUrl);
  videoElement.preload = 'metadata';
}