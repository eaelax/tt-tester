import crypto from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import {
  getUserSessionCookies,
  mergeCookieStrings,
  setUserSessionCookies,
} from '@/lib/tiktok-session';

interface CacheEntry {
  play: string;
  wmplay: string;
  music: string;
  title: string;
  needsProxy: boolean;
  expiresAt: number;
}

type JsonRecord = Record<string, unknown>;

// In-memory cache to prevent duplicate requests and eliminate latency (2-hour TTL)
const resolveCache = new Map<string, CacheEntry>();

const BROWSER_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

function asObj(val: unknown): JsonRecord {
  return val && typeof val === 'object' ? (val as JsonRecord) : {};
}

function asStr(val: unknown, fallback = ''): string {
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  return fallback;
}

function normalizeUrl(url?: string, base = 'https://www.tikwm.com'): string {
  if (!url) return '';
  let cleaned = url.replace(/\\u0026/g, '&').replace(/\\u002F/g, '/').trim();
  if (!cleaned) return '';
  if (cleaned.startsWith('//')) cleaned = `https:${cleaned}`;
  else if (cleaned.startsWith('/')) cleaned = `${base}${cleaned}`;
  else if (cleaned.startsWith('http://')) cleaned = cleaned.replace(/^http:\/\//i, 'https://');
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
    if (typeof obj.src === 'string') {
      return obj.src;
    }
  }
  return '';
}

function extractSetCookies(headers: Headers): string[] {
  const anyHeaders = headers as Headers & { getSetCookie?: () => string[] };
  if (typeof anyHeaders.getSetCookie === 'function') {
    return anyHeaders.getSetCookie().map((c) => c.split(';')[0]).filter(Boolean);
  }
  const raw = headers.get('set-cookie');
  if (!raw) return [];
  return raw
    .split(/,(?=\s*[A-Za-z0-9_.-]+=)/)
    .map((c) => c.split(';')[0].trim())
    .filter(Boolean);
}

function solveWafChallenge(html: string): string[] {
  try {
    const csMatch =
      html.match(/id=["']cs["'][^>]*class=["']([^"']+)["']/i) ||
      html.match(/class=["']([^"']+)["'][^>]*id=["']cs["']/i);
    const wciMatch =
      html.match(/id=["']wci["'][^>]*class=["']([^"']+)["']/i) ||
      html.match(/class=["']([^"']+)["'][^>]*id=["']wci["']/i);

    if (!csMatch?.[1] || !wciMatch?.[1]) return [];

    const challengeJson = JSON.parse(
      Buffer.from(`${csMatch[1]}===`, 'base64').toString('utf8')
    ) as JsonRecord;
    const vObj = asObj(challengeJson.v);
    const expectedB64 = asStr(vObj.c);
    const baseB64 = asStr(vObj.a);
    if (!expectedB64 || !baseB64) return [];

    const expectedDigest = Buffer.from(expectedB64, 'base64');
    const baseBytes = Buffer.from(baseB64, 'base64');

    let solvedD = '';
    for (let i = 0; i <= 1_000_000; i++) {
      const hash = crypto.createHash('sha256');
      hash.update(baseBytes);
      hash.update(String(i));
      if (hash.digest().equals(expectedDigest)) {
        solvedD = Buffer.from(String(i)).toString('base64');
        break;
      }
    }

    if (!solvedD) return [];
    challengeJson.d = solvedD;
    const cookieVal = Buffer.from(JSON.stringify(challengeJson)).toString('base64');
    const cookies = [`${wciMatch[1]}=${cookieVal}`];

    const rciMatch = html.match(/id=["']rci["'][^>]*class=["']([^"']+)["']/i);
    const rsMatch = html.match(/id=["']rs["'][^>]*class=["']([^"']+)["']/i);
    if (rciMatch?.[1] && rsMatch?.[1]) {
      cookies.push(`${rciMatch[1]}=${rsMatch[1]}`);
    }
    return cookies;
  } catch {
    return [];
  }
}

function parseTikwmPayload(text: string): Omit<CacheEntry, 'expiresAt'> | null {
  if (!text || !text.trim().startsWith('{')) return null;
  const json = JSON.parse(text) as JsonRecord;
  if (json && json.code === 0 && json.data) {
    const d = asObj(json.data);
    const musicInfo = asObj(d.music_info);
    const play = normalizeUrl(asStr(d.hdplay) || asStr(d.play) || asStr(d.wmplay));
    const wmplay = normalizeUrl(asStr(d.wmplay) || play);
    const music = normalizeUrl(asStr(musicInfo.play) || asStr(d.music));
    const title = asStr(d.title);

    if (play) {
      return { play, wmplay, music, title, needsProxy: false };
    }
  }
  return null;
}

async function resolveFromTikwm(tiktokUrl: string): Promise<Omit<CacheEntry, 'expiresAt'> | null> {
  // Attempt 1: POST with HD parameter
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

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
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    if (res.ok) {
      const parsed = parseTikwmPayload(await res.text());
      if (parsed) return parsed;
    }
  } catch {
    // Fall through to GET attempt
  }

  // Attempt 2: GET without hd=1 (often succeeds when HD POST hits 502)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

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
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);
    if (res.ok) {
      const parsed = parseTikwmPayload(await res.text());
      if (parsed) return parsed;
    }
  } catch {
    // Fall through to TikTok SSR fallback
  }

  return null;
}

async function resolveFromTikTokPage(
  tiktokUrl: string,
  username: string
): Promise<Omit<CacheEntry, 'expiresAt'> | null> {
  try {
    const existingCookies = getUserSessionCookies(username);
    const baseHeaders: Record<string, string> = {
      'User-Agent': BROWSER_UA,
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Sec-Ch-Ua': '"Chromium";v="131", "Not_A Brand";v="24", "Google Chrome";v="131"',
      'Sec-Ch-Ua-Mobile': '?0',
      'Sec-Ch-Ua-Platform': '"Windows"',
    };
    if (existingCookies) {
      baseHeaders.Cookie = existingCookies;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    let res = await fetch(tiktokUrl, {
      headers: baseHeaders,
      cache: 'no-store',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    if (!res.ok) return null;

    let mergedCookies = mergeCookieStrings(existingCookies, extractSetCookies(res.headers));
    let html = await res.text();

    if (!html.includes('__UNIVERSAL_DATA_FOR_REHYDRATION__') && html.includes('id="cs"')) {
      const challengeCookies = solveWafChallenge(html);
      if (challengeCookies.length > 0) {
        mergedCookies = mergeCookieStrings(mergedCookies, challengeCookies);
        const retryController = new AbortController();
        const retryTimer = setTimeout(() => retryController.abort(), 6000);
        res = await fetch(tiktokUrl, {
          headers: {
            ...baseHeaders,
            Cookie: mergedCookies,
          },
          cache: 'no-store',
          signal: retryController.signal,
        });
        clearTimeout(retryTimer);
        if (res.ok) {
          mergedCookies = mergeCookieStrings(mergedCookies, extractSetCookies(res.headers));
          html = await res.text();
        }
      }
    }

    if (mergedCookies) {
      setUserSessionCookies(username, mergedCookies);
    }

    const match = html.match(
      /<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__"[^>]*>([\s\S]*?)<\/script>/
    );
    if (!match?.[1]) return null;

    const json = JSON.parse(match[1]) as JsonRecord;
    const defaultScope = asObj(json['__DEFAULT_SCOPE__']);
    const videoDetail = asObj(defaultScope['webapp.video-detail']);
    const itemInfo = asObj(videoDetail.itemInfo);
    const itemStruct = asObj(itemInfo.itemStruct);
    if (!itemStruct.id && !itemStruct.video) return null;

    const v = asObj(itemStruct.video);
    const m = asObj(itemStruct.music);
    const bitrateArr = Array.isArray(v.bitrateInfo) ? v.bitrateInfo : [];
    const firstBitrate = asObj(bitrateArr[0]);
    const bitrateUrl = extractUrlField(firstBitrate.PlayAddr);

    const play = normalizeUrl(
      extractUrlField(v.playAddr) || bitrateUrl || extractUrlField(v.downloadAddr)
    );
    const wmplay = normalizeUrl(extractUrlField(v.downloadAddr) || play);
    const music = normalizeUrl(asStr(m.playUrl) || asStr(m.play));
    const title = asStr(itemStruct.desc);

    if (!play) return null;
    return { play, wmplay, music, title, needsProxy: true };
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get('id');
  const username = searchParams.get('username') || 'tiktok';

  if (!videoId) {
    return NextResponse.json({ error: 'Missing video id' }, { status: 400 });
  }

  const cached = resolveCache.get(videoId);
  if (cached && cached.expiresAt > Date.now()) {
    return NextResponse.json({
      success: true,
      play: cached.play,
      wmplay: cached.wmplay,
      music: cached.music,
      title: cached.title,
      needsProxy: cached.needsProxy,
      fromCache: true,
    });
  }

  const tiktokUrl = `https://www.tiktok.com/@${encodeURIComponent(username)}/video/${encodeURIComponent(videoId)}`;

  const resolved =
    (await resolveFromTikwm(tiktokUrl)) ||
    (await resolveFromTikTokPage(tiktokUrl, username));

  if (resolved) {
    resolveCache.set(videoId, {
      ...resolved,
      expiresAt: Date.now() + 2 * 60 * 60 * 1000,
    });

    if (resolveCache.size > 2000) {
      const now = Date.now();
      for (const [key, val] of resolveCache.entries()) {
        if (val.expiresAt < now) resolveCache.delete(key);
      }
    }

    return NextResponse.json({
      success: true,
      play: resolved.play,
      wmplay: resolved.wmplay,
      music: resolved.music,
      title: resolved.title,
      needsProxy: resolved.needsProxy,
    });
  }

  return NextResponse.json({ success: false });
}