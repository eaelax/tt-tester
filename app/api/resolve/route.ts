import { NextRequest, NextResponse } from 'next/server';
import {
  API_SECURITY_HEADERS,
  checkRateLimit,
  getClientIp,
  isAllowedTikTokUrl,
  safeFetchTikTokWithRedirects,
} from '@/lib/security';

type JsonRecord = Record<string, unknown>;

export interface ResolvedPostPayload {
  id: string;
  title: string;
  cover: string;
  origin_cover: string;
  play: string;
  wmplay: string;
  music: string;
  images: string[];
  duration: number;
  play_count: number;
  digg_count: number;
  comment_count: number;
  share_count: number;
  author: {
    unique_id: string;
    nickname: string;
    avatar: string;
  };
}

const BROWSER_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

const UPSTREAM_TIMEOUT_MS = 3800;
const EDGE_CACHE_HEADER = 'public, s-maxage=300, stale-while-revalidate=900';
const MAX_REQUESTS_PER_MINUTE = 40;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

function asObj(val: unknown): JsonRecord {
  return val && typeof val === 'object' ? (val as JsonRecord) : {};
}

function asStr(val: unknown, fallback = ''): string {
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  return fallback;
}

function asNum(val: unknown, fallback = 0): number {
  if (typeof val === 'number' && Number.isFinite(val)) return val;
  if (typeof val === 'string') {
    const parsed = Number(val);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

function normalizeUrl(url?: string, base = 'https://www.tikwm.com'): string {
  if (!url) return '';
  let cleaned = url.replace(/\\u0026/g, '&').replace(/\\u002F/g, '/').trim();
  if (!cleaned) return '';
  if (cleaned.startsWith('//')) cleaned = `https:${cleaned}`;
  else if (cleaned.startsWith('/')) cleaned = `${base}${cleaned}`;
  else if (cleaned.startsWith('http://')) {
    cleaned = cleaned.replace(/^http:\/\//i, 'https://');
  }
  return cleaned;
}

function extractUrlField(val: unknown): string {
  if (typeof val === 'string') return val;
  if (val && typeof val === 'object') {
    const obj = val as JsonRecord;
    if (Array.isArray(obj.UrlList) && typeof obj.UrlList[0] === 'string') {
      return obj.UrlList[0];
    }
    if (Array.isArray(obj.urlList) && typeof obj.urlList[0] === 'string') {
      return obj.urlList[0];
    }
    if (Array.isArray(obj.url_list) && typeof obj.url_list[0] === 'string') {
      return obj.url_list[0];
    }
    if (typeof obj.src === 'string') {
      return obj.src;
    }
  }
  return '';
}

function extractImagesArray(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const urls: string[] = [];
  for (const entry of raw) {
    if (typeof entry === 'string') {
      const norm = normalizeUrl(entry);
      if (norm) urls.push(norm);
    } else if (entry && typeof entry === 'object') {
      const obj = entry as JsonRecord;
      const candidate =
        extractUrlField(obj.displayImage) ||
        extractUrlField(obj.imageURL) ||
        extractUrlField(obj.thumbnail) ||
        asStr(obj.url);
      const norm = normalizeUrl(candidate);
      if (norm) urls.push(norm);
    }
  }
  return urls;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRateLimitPayload(status: number, msg: string): boolean {
  if (status === 429) return true;
  const lower = msg.toLowerCase();
  return (
    lower.includes('limit') ||
    lower.includes('too many') ||
    lower.includes('frequent') ||
    lower.includes('1 req')
  );
}

function parseTikwmPayload(
  text: string
): { data: ResolvedPostPayload | null; rateLimited: boolean } {
  if (!text || !text.trim().startsWith('{')) {
    return { data: null, rateLimited: false };
  }

  try {
    const json = JSON.parse(text) as JsonRecord;
    const code = asNum(json.code, -1);
    const msg = asStr(json.msg);

    if (code !== 0 || !json.data) {
      return {
        data: null,
        rateLimited: isRateLimitPayload(200, msg),
      };
    }

    const d = asObj(json.data);
    const musicInfo = asObj(d.music_info);
    const author = asObj(d.author);

    const images = extractImagesArray(d.images);
    const play = normalizeUrl(asStr(d.hdplay) || asStr(d.play) || asStr(d.wmplay));
    const wmplay = normalizeUrl(asStr(d.wmplay) || play);
    const music = normalizeUrl(asStr(musicInfo.play) || asStr(d.music));
    const cover = normalizeUrl(asStr(d.cover) || asStr(d.origin_cover) || images[0]);
    const originCover = normalizeUrl(asStr(d.origin_cover) || cover);

    if (!play && images.length === 0 && !music) {
      return { data: null, rateLimited: false };
    }

    return {
      rateLimited: false,
      data: {
        id: asStr(d.id) || asStr(d.video_id),
        title: asStr(d.title),
        cover,
        origin_cover: originCover,
        play,
        wmplay,
        music,
        images,
        duration: asNum(d.duration),
        play_count: asNum(d.play_count),
        digg_count: asNum(d.digg_count),
        comment_count: asNum(d.comment_count),
        share_count: asNum(d.share_count),
        author: {
          unique_id: asStr(author.unique_id),
          nickname: asStr(author.nickname),
          avatar: normalizeUrl(asStr(author.avatar)),
        },
      },
    };
  } catch {
    return { data: null, rateLimited: false };
  }
}

async function resolveFromTikwm(
  tiktokUrl: string
): Promise<{ data: ResolvedPostPayload | null; rateLimited: boolean }> {
  let sawRateLimit = false;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch('https://www.tikwm.com/api/', {
        method: 'POST',
        headers: {
          'User-Agent': BROWSER_UA,
          Accept: 'application/json, text/javascript, */*; q=0.01',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          Origin: 'https://www.tikwm.com',
          Referer: 'https://www.tikwm.com/',
          Cookie: 'current_language=en',
        },
        body: new URLSearchParams({ url: tiktokUrl, hd: '1' }).toString(),
        cache: 'no-store',
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      });

      const text = await res.text();
      const parsed = parseTikwmPayload(text);
      if (parsed.data) {
        return { data: parsed.data, rateLimited: false };
      }

      if (res.status === 429 || parsed.rateLimited) {
        sawRateLimit = true;
        if (attempt === 0) {
          await sleep(650);
          continue;
        }
      }
      break;
    } catch {
      break;
    }
  }

  try {
    const res = await fetch(
      `https://www.tikwm.com/api/?url=${encodeURIComponent(tiktokUrl)}`,
      {
        method: 'GET',
        headers: {
          'User-Agent': BROWSER_UA,
          Accept: 'application/json, text/javascript, */*; q=0.01',
          Referer: 'https://www.tikwm.com/',
          Cookie: 'current_language=en',
        },
        cache: 'no-store',
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      }
    );

    const text = await res.text();
    const parsed = parseTikwmPayload(text);
    if (parsed.data) {
      return { data: parsed.data, rateLimited: false };
    }
    if (res.status === 429 || parsed.rateLimited) {
      sawRateLimit = true;
    }
  } catch {
    // Fall through to secondary public JSON fallback
  }

  return { data: null, rateLimited: sawRateLimit };
}

async function resolveFromPublicJsonFallback(
  tiktokUrl: string
): Promise<ResolvedPostPayload | null> {
  try {
    const res = await safeFetchTikTokWithRedirects(
      tiktokUrl,
      {
        'User-Agent': BROWSER_UA,
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      UPSTREAM_TIMEOUT_MS
    );

    if (res && res.ok) {
      const html = await res.text();
      const match = html.match(
        /<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__"[^>]*>([\s\S]*?)<\/script>/
      );
      if (match?.[1]) {
        const json = JSON.parse(match[1]) as JsonRecord;
        const defaultScope = asObj(json['__DEFAULT_SCOPE__']);
        const videoDetail = asObj(defaultScope['webapp.video-detail']);
        const itemInfo = asObj(videoDetail.itemInfo);
        const itemStruct = asObj(itemInfo.itemStruct);

        if (itemStruct.id || itemStruct.video || itemStruct.imagePost) {
          const v = asObj(itemStruct.video);
          const m = asObj(itemStruct.music);
          const s = asObj(itemStruct.stats || itemStruct.statsV2);
          const a = asObj(itemStruct.author);
          const imagePost = asObj(itemStruct.imagePost);
          const images = extractImagesArray(imagePost.images);

          const bitrateArr = Array.isArray(v.bitrateInfo) ? v.bitrateInfo : [];
          const firstBitrate = asObj(bitrateArr[0]);
          const bitrateUrl = extractUrlField(firstBitrate.PlayAddr);

          const play = normalizeUrl(
            extractUrlField(v.playAddr) || bitrateUrl || extractUrlField(v.downloadAddr)
          );
          const wmplay = normalizeUrl(extractUrlField(v.downloadAddr) || play);
          const music = normalizeUrl(asStr(m.playUrl) || asStr(m.play));
          const cover = normalizeUrl(
            extractUrlField(v.cover) || extractUrlField(v.originCover) || images[0]
          );
          const originCover = normalizeUrl(extractUrlField(v.originCover) || cover);

          if (play || images.length > 0 || music) {
            return {
              id: asStr(itemStruct.id),
              title: asStr(itemStruct.desc),
              cover,
              origin_cover: originCover,
              play,
              wmplay,
              music,
              images,
              duration: asNum(v.duration),
              play_count: asNum(s.playCount),
              digg_count: asNum(s.diggCount),
              comment_count: asNum(s.commentCount),
              share_count: asNum(s.shareCount),
              author: {
                unique_id: asStr(a.uniqueId),
                nickname: asStr(a.nickname),
                avatar: normalizeUrl(asStr(a.avatarMedium || a.avatarThumb)),
              },
            };
          }
        }
      }
    }
  } catch {
    // Ignore and return null
  }

  return null;
}

export async function GET(req: NextRequest) {
  const clientIp = getClientIp(req.headers);
  const limit = checkRateLimit(
    `api_resolve:${clientIp}`,
    MAX_REQUESTS_PER_MINUTE,
    RATE_LIMIT_WINDOW_MS
  );

  if (!limit.allowed) {
    return NextResponse.json(
      {
        success: false,
        rateLimited: true,
        error: 'Too many requests. Please wait a moment and try again.',
      },
      {
        status: 429,
        headers: {
          ...API_SECURITY_HEADERS,
          'Cache-Control': 'no-store',
          'Retry-After': String(limit.retryAfterSeconds),
        },
      }
    );
  }

  const { searchParams } = new URL(req.url);
  const rawUrlParam = searchParams.get('url');
  const videoId = searchParams.get('id');
  const username = searchParams.get('username') || 'tiktok';

  let targetUrl = '';
  if (rawUrlParam) {
    const trimmed = rawUrlParam.trim();
    if (trimmed.length > 512 || !isAllowedTikTokUrl(trimmed)) {
      return NextResponse.json(
        { success: false, error: 'Invalid TikTok URL.' },
        {
          status: 400,
          headers: { ...API_SECURITY_HEADERS, 'Cache-Control': 'no-store' },
        }
      );
    }
    targetUrl = trimmed;
  } else if (videoId) {
    const cleanId = videoId.replace(/[^0-9a-zA-Z_-]/g, '').slice(0, 64);
    const cleanUser =
      username
        .replace(/^@+/, '')
        .replace(/[^a-zA-Z0-9._]/g, '')
        .slice(0, 32) || 'tiktok';
    if (!cleanId) {
      return NextResponse.json(
        { success: false, error: 'Missing video id' },
        {
          status: 400,
          headers: { ...API_SECURITY_HEADERS, 'Cache-Control': 'no-store' },
        }
      );
    }
    targetUrl = `https://www.tiktok.com/@${encodeURIComponent(cleanUser)}/video/${encodeURIComponent(cleanId)}`;
  } else {
    return NextResponse.json(
      { success: false, error: 'Missing url or video id' },
      {
        status: 400,
        headers: { ...API_SECURITY_HEADERS, 'Cache-Control': 'no-store' },
      }
    );
  }

  const tikwmResult = await resolveFromTikwm(targetUrl);
  const resolved =
    tikwmResult.data || (await resolveFromPublicJsonFallback(targetUrl));

  if (resolved) {
    return NextResponse.json(
      {
        success: true,
        ...resolved,
      },
      {
        status: 200,
        headers: {
          ...API_SECURITY_HEADERS,
          'Cache-Control': EDGE_CACHE_HEADER,
        },
      }
    );
  }

  if (tikwmResult.rateLimited) {
    return NextResponse.json(
      {
        success: false,
        rateLimited: true,
        error: 'Upstream service is temporarily busy. Please retry in a moment.',
      },
      {
        status: 429,
        headers: {
          ...API_SECURITY_HEADERS,
          'Cache-Control': 'no-store',
        },
      }
    );
  }

  return NextResponse.json(
    { success: false, error: 'Could not resolve media stream.' },
    {
      status: 404,
      headers: {
        ...API_SECURITY_HEADERS,
        'Cache-Control': 'no-store',
      },
    }
  );
}