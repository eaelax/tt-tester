/**
 * Client-side media and API controller.
 * - Zero server media bandwidth: all videos, covers, slides, avatars, and MP4/MP3 downloads
 *   load directly in the visitor's browser with referrerPolicy="no-referrer" and no /api/proxy.
 * - Client-first JSON lookups: attempts lightweight browser-side JSON fetches first
 *   (using the visitor's IP when CORS permits, 0 Vercel invocations) and falls back to
 *   edge-cached /api/tiktok and /api/resolve JSON endpoints.
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
  images?: string[];
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
  rateLimited?: boolean;
  data?: {
    user: TikTokUserSummary;
    stats: TikTokStatsSummary;
    videos: TikTokVideoItem[];
    cursor: string | null;
    hasMore: boolean;
  };
}

export interface ResolvedStreamResult {
  id?: string;
  title?: string;
  play: string;
  wmplay: string;
  music: string;
  cover: string;
  origin_cover?: string;
  images?: string[];
  duration?: number;
  play_count?: number;
  digg_count?: number;
  comment_count?: number;
  share_count?: number;
  author?: {
    unique_id: string;
    nickname: string;
    avatar: string;
  };
  rateLimited?: boolean;
}

export type ParsedTikTokTarget =
  | { kind: 'empty' }
  | { kind: 'profile'; username: string }
  | {
      kind: 'post';
      url: string;
      username?: string;
      videoId?: string;
      isPhoto?: boolean;
    };

type JsonRecord = Record<string, unknown>;

const profileCache = new Map<
  string,
  { data: TikTokProfileApiResponse; expiresAt: number }
>();

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

export function normalizeMediaUrl(
  url?: string,
  base = 'https://www.tikwm.com'
): string {
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

function extractImagesFromRaw(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const out: string[] = [];
  for (const item of raw) {
    if (typeof item === 'string') {
      const norm = normalizeMediaUrl(item);
      if (norm) out.push(norm);
    } else if (item && typeof item === 'object') {
      const obj = item as JsonRecord;
      const candidate = asStr(obj.url) || asStr(obj.src);
      const norm = normalizeMediaUrl(candidate);
      if (norm) out.push(norm);
    }
  }
  return out;
}

export function parseTikTokTarget(rawInput: string): ParsedTikTokTarget {
  const trimmed = (rawInput || '').trim();
  if (!trimmed) return { kind: 'empty' };

  const normalizedInput = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : /(?:^|\.)tiktok\.com\//i.test(trimmed)
    ? `https://${trimmed}`
    : '';

  if (normalizedInput) {
    try {
      const parsed = new URL(normalizedInput);
      const host = parsed.hostname.toLowerCase();
      if (host === 'tiktok.com' || host.endsWith('.tiktok.com')) {
        // Short share URLs (vm.tiktok.com/..., vt.tiktok.com/..., www.tiktok.com/t/...)
        if (
          host === 'vm.tiktok.com' ||
          host === 'vt.tiktok.com' ||
          /^\/t\/[a-zA-Z0-9]+/i.test(parsed.pathname)
        ) {
          return { kind: 'post', url: parsed.toString() };
        }

        // Full video or photo slideshow URL: /@user/video/123 or /@user/photo/123
        const postMatch = parsed.pathname.match(
          /^\/@?([a-zA-Z0-9._]+)\/(video|photo)\/(\d+)/i
        );
        if (postMatch?.[1] && postMatch?.[3]) {
          return {
            kind: 'post',
            url: `https://www.tiktok.com/@${postMatch[1]}/${postMatch[2].toLowerCase()}/${postMatch[3]}`,
            username: postMatch[1].toLowerCase(),
            videoId: postMatch[3],
            isPhoto: postMatch[2].toLowerCase() === 'photo',
          };
        }

        // Profile URL: /@username
        const profileMatch = parsed.pathname.match(/^\/@?([a-zA-Z0-9._]+)/);
        if (profileMatch?.[1]) {
          return {
            kind: 'profile',
            username: profileMatch[1].replace(/^@+/, '').toLowerCase(),
          };
        }
      }
    } catch {
      // Fall through to plain username handling
    }
  }

  const cleanUser = trimmed.replace(/^@+/, '').trim().toLowerCase();
  if (!cleanUser) return { kind: 'empty' };
  return { kind: 'profile', username: cleanUser };
}

export function sanitizeUsername(rawInput: string): string {
  const target = parseTikTokTarget(rawInput);
  if (target.kind === 'profile') return target.username;
  if (target.kind === 'post') return target.username || '';
  return '';
}

function mapTikwmVideoToItem(
  raw: unknown,
  fallbackUser: TikTokUserSummary
): TikTokVideoItem {
  const item = asObj(raw);
  const m = asObj(item.music_info);
  const a = asObj(item.author);
  const images = extractImagesFromRaw(item.images);

  const play = normalizeMediaUrl(
    asStr(item.hdplay) || asStr(item.play) || asStr(item.wmplay)
  );
  const wmplay = normalizeMediaUrl(asStr(item.wmplay) || play);
  const music = normalizeMediaUrl(asStr(m.play) || asStr(item.music));
  const cover = normalizeMediaUrl(
    asStr(item.cover) || asStr(item.origin_cover) || images[0]
  );
  const originCover = normalizeMediaUrl(asStr(item.origin_cover) || cover);
  const videoId = asStr(item.video_id) || asStr(item.id);

  return {
    video_id: videoId,
    id: videoId,
    title: asStr(item.title),
    duration: asNum(item.duration),
    cover,
    origin_cover: originCover,
    play,
    wmplay,
    music,
    images,
    music_info: {
      id: asStr(m.id),
      title: asStr(m.title) || 'Original Sound',
      author: asStr(m.author) || fallbackUser.nickname,
      play: music,
      cover: normalizeMediaUrl(asStr(m.cover)),
    },
    play_count: asNum(item.play_count),
    digg_count: asNum(item.digg_count),
    comment_count: asNum(item.comment_count),
    share_count: asNum(item.share_count),
    download_count: asNum(item.download_count ?? item.collect_count),
    create_time: asNum(item.create_time),
    author: {
      id: asStr(a.id, fallbackUser.id),
      unique_id: asStr(a.unique_id, fallbackUser.unique_id),
      nickname: asStr(a.nickname, fallbackUser.nickname),
      avatar: normalizeMediaUrl(asStr(a.avatar)) || fallbackUser.avatar,
      signature: fallbackUser.signature,
      verified: fallbackUser.verified,
    },
  };
}

async function tryBrowserDirectProfileFetch(
  cleanUser: string
): Promise<TikTokProfileApiResponse | null> {
  try {
    const [infoRes, postsRes] = await Promise.all([
      fetch(
        `https://www.tikwm.com/api/user/info?unique_id=${encodeURIComponent(cleanUser)}`,
        {
          method: 'GET',
          mode: 'cors',
          referrerPolicy: 'no-referrer',
          credentials: 'omit',
          signal: AbortSignal.timeout(3500),
        }
      ),
      fetch(
        `https://www.tikwm.com/api/user/posts?unique_id=${encodeURIComponent(
          cleanUser
        )}&count=30&cursor=0`,
        {
          method: 'GET',
          mode: 'cors',
          referrerPolicy: 'no-referrer',
          credentials: 'omit',
          signal: AbortSignal.timeout(3500),
        }
      ),
    ]);

    if (!postsRes.ok) return null;
    const postsJson = (await postsRes.json()) as JsonRecord;
    if (postsJson.code !== 0 || !postsJson.data) return null;

    const postsData = asObj(postsJson.data);
    const rawVideos = Array.isArray(postsData.videos) ? postsData.videos : [];

    let userSummary: TikTokUserSummary = {
      id: cleanUser,
      unique_id: cleanUser,
      nickname: cleanUser,
      avatar: '',
      signature: '',
      verified: false,
      status: 'active',
    };

    let statsSummary: TikTokStatsSummary = {
      followerCount: null,
      followingCount: null,
      heartCount: null,
      videoCount: rawVideos.length,
    };

    if (infoRes.ok) {
      const infoJson = (await infoRes.json()) as JsonRecord;
      if (infoJson.code === 0 && infoJson.data) {
        const infoData = asObj(infoJson.data);
        const u = asObj(infoData.user);
        const s = asObj(infoData.stats);
        userSummary = {
          id: asStr(u.id || u.secUid, cleanUser),
          secUid: asStr(u.secUid),
          unique_id: asStr(u.uniqueId, cleanUser),
          nickname: asStr(u.nickname || u.uniqueId, cleanUser),
          avatar: normalizeMediaUrl(
            asStr(u.avatarLarger) ||
              asStr(u.avatarMedium) ||
              asStr(u.avatarThumb)
          ),
          signature: asStr(u.signature),
          verified: Boolean(u.verified),
          status: Boolean(u.secret || u.privateAccount) ? 'private' : 'active',
        };
        statsSummary = {
          followerCount:
            s.followerCount !== undefined ? asNum(s.followerCount) : null,
          followingCount:
            s.followingCount !== undefined ? asNum(s.followingCount) : null,
          heartCount:
            s.heart !== undefined
              ? asNum(s.heart)
              : s.heartCount !== undefined
              ? asNum(s.heartCount)
              : null,
          videoCount: asNum(s.videoCount, rawVideos.length),
        };
      }
    } else if (rawVideos.length > 0) {
      const firstAuthor = asObj(asObj(rawVideos[0]).author);
      if (firstAuthor.unique_id || firstAuthor.nickname) {
        userSummary = {
          ...userSummary,
          id: asStr(firstAuthor.id, cleanUser),
          unique_id: asStr(firstAuthor.unique_id, cleanUser),
          nickname: asStr(firstAuthor.nickname, cleanUser),
          avatar: normalizeMediaUrl(asStr(firstAuthor.avatar)),
        };
      }
    }

    const mappedVideos = rawVideos.map((item) =>
      mapTikwmVideoToItem(item, userSummary)
    );

    if (mappedVideos.length === 0 && userSummary.status !== 'private') {
      return null;
    }

    return {
      code: 0,
      msg: 'success',
      data: {
        user: userSummary,
        stats: statsSummary,
        videos: mappedVideos,
        cursor: postsData.cursor ? asStr(postsData.cursor) : null,
        hasMore: Boolean(postsData.hasMore && postsData.cursor),
      },
    };
  } catch {
    return null;
  }
}

/**
 * Fetches profile metadata + initial video feed.
 * Attempts browser-first JSON lookup (0 Vercel invocations) and falls back to /api/tiktok.
 */
export async function fetchProfileDirect(
  username: string
): Promise<TikTokProfileApiResponse> {
  const clean = sanitizeUsername(username);
  if (!clean) {
    throw new Error('Please enter a valid TikTok username.');
  }

  const cached = profileCache.get(clean);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.data;
  }

  const directResult = await tryBrowserDirectProfileFetch(clean);
  if (directResult && directResult.code === 0 && directResult.data) {
    profileCache.set(clean, {
      data: directResult,
      expiresAt: Date.now() + 120_000,
    });
    return directResult;
  }

  const serverRes = await fetch(
    `/api/tiktok?username=${encodeURIComponent(clean)}`,
    {
      method: 'GET',
      headers: { Accept: 'application/json' },
    }
  );

  const serverJson = (await serverRes.json()) as TikTokProfileApiResponse;
  if (serverRes.status === 429) {
    serverJson.rateLimited = true;
  }

  if (
    serverJson.code === 0 &&
    serverJson.data &&
    serverJson.data.videos.length > 0
  ) {
    profileCache.set(clean, {
      data: serverJson,
      expiresAt: Date.now() + 120_000,
    });
  }

  return serverJson;
}

/**
 * Paginates more videos cleanly: tries browser-first JSON fetch, then falls back to /api/tiktok.
 */
export async function fetchMoreVideosDirect(
  username: string,
  cursor: string,
  count = 15,
  secUid = ''
): Promise<{
  videos: TikTokVideoItem[];
  cursor: string | null;
  hasMore: boolean;
  rateLimited?: boolean;
}> {
  const clean = sanitizeUsername(username);
  if (!clean || !cursor) {
    return { videos: [], cursor: null, hasMore: false };
  }

  const dummyUser: TikTokUserSummary = {
    id: clean,
    unique_id: clean,
    nickname: clean,
    avatar: '',
    signature: '',
    verified: false,
    status: 'active',
  };

  try {
    const directRes = await fetch(
      `https://www.tikwm.com/api/user/posts?unique_id=${encodeURIComponent(
        clean
      )}&count=${encodeURIComponent(String(count))}&cursor=${encodeURIComponent(cursor)}`,
      {
        method: 'GET',
        mode: 'cors',
        referrerPolicy: 'no-referrer',
        credentials: 'omit',
        signal: AbortSignal.timeout(3500),
      }
    );

    if (directRes.ok) {
      const directJson = (await directRes.json()) as JsonRecord;
      if (directJson.code === 0 && directJson.data) {
        const payload = asObj(directJson.data);
        const rawVideos = Array.isArray(payload.videos) ? payload.videos : [];
        if (rawVideos.length > 0) {
          return {
            videos: rawVideos.map((v) => mapTikwmVideoToItem(v, dummyUser)),
            cursor: payload.cursor ? asStr(payload.cursor) : null,
            hasMore: Boolean(payload.hasMore && payload.cursor),
          };
        }
      }
    }
  } catch {
    // Fall back to /api/tiktok
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

    const data = (await res.json()) as TikTokProfileApiResponse;
    if (res.status === 429) {
      return { videos: [], cursor: null, hasMore: false, rateLimited: true };
    }
    if (res.ok && data && data.code === 0 && data.data) {
      return {
        videos: data.data.videos || [],
        cursor: data.data.cursor || null,
        hasMore: Boolean(data.data.hasMore && data.data.cursor),
      };
    }
  } catch {
    // Fall through
  }

  return { videos: [], cursor: null, hasMore: false };
}

function parseBrowserTikwmPost(json: JsonRecord): ResolvedStreamResult | null {
  if (json.code !== 0 || !json.data) return null;
  const d = asObj(json.data);
  const m = asObj(d.music_info);
  const a = asObj(d.author);
  const images = extractImagesFromRaw(d.images);

  const play = normalizeMediaUrl(
    asStr(d.hdplay) || asStr(d.play) || asStr(d.wmplay)
  );
  const wmplay = normalizeMediaUrl(asStr(d.wmplay) || play);
  const music = normalizeMediaUrl(asStr(m.play) || asStr(d.music));
  const cover = normalizeMediaUrl(
    asStr(d.cover) || asStr(d.origin_cover) || images[0]
  );
  const originCover = normalizeMediaUrl(asStr(d.origin_cover) || cover);

  if (!play && images.length === 0 && !music) return null;

  return {
    id: asStr(d.id) || asStr(d.video_id),
    title: asStr(d.title),
    play,
    wmplay,
    music,
    cover,
    origin_cover: originCover,
    images,
    duration: asNum(d.duration),
    play_count: asNum(d.play_count),
    digg_count: asNum(d.digg_count),
    comment_count: asNum(d.comment_count),
    share_count: asNum(d.share_count),
    author: {
      unique_id: asStr(a.unique_id),
      nickname: asStr(a.nickname),
      avatar: normalizeMediaUrl(asStr(a.avatar)),
    },
  };
}

/**
 * Resolves a single post by full/short TikTok URL (supports video, photo slideshow, vm.tiktok.com).
 * Attempts browser-first JSON fetch before falling back to /api/resolve.
 */
export async function resolvePostByUrlDirect(
  rawUrl: string
): Promise<ResolvedStreamResult | null> {
  const trimmed = (rawUrl || '').trim();
  if (!trimmed) return null;

  try {
    const directRes = await fetch(
      `https://www.tikwm.com/api/?url=${encodeURIComponent(trimmed)}`,
      {
        method: 'GET',
        mode: 'cors',
        referrerPolicy: 'no-referrer',
        credentials: 'omit',
        signal: AbortSignal.timeout(3500),
      }
    );
    if (directRes.ok) {
      const json = (await directRes.json()) as JsonRecord;
      const parsed = parseBrowserTikwmPost(json);
      if (parsed) return parsed;
    }
  } catch {
    // Fall back to server JSON endpoint
  }

  try {
    const res = await fetch(
      `/api/resolve?url=${encodeURIComponent(trimmed)}`,
      {
        method: 'GET',
        headers: { Accept: 'application/json' },
      }
    );
    const data = (await res.json()) as JsonRecord;
    if (res.status === 429 || data.rateLimited) {
      return {
        play: '',
        wmplay: '',
        music: '',
        cover: '',
        rateLimited: true,
      };
    }
    if (res.ok && data?.success) {
      return {
        id: asStr(data.id),
        title: asStr(data.title),
        play: normalizeMediaUrl(asStr(data.play)),
        wmplay: normalizeMediaUrl(asStr(data.wmplay)),
        music: normalizeMediaUrl(asStr(data.music)),
        cover: normalizeMediaUrl(asStr(data.cover)),
        origin_cover: normalizeMediaUrl(asStr(data.origin_cover)),
        images: extractImagesFromRaw(data.images),
        duration: asNum(data.duration),
        play_count: asNum(data.play_count),
        digg_count: asNum(data.digg_count),
        comment_count: asNum(data.comment_count),
        share_count: asNum(data.share_count),
        author: data.author
          ? {
              unique_id: asStr(asObj(data.author).unique_id),
              nickname: asStr(asObj(data.author).nickname),
              avatar: normalizeMediaUrl(asStr(asObj(data.author).avatar)),
            }
          : undefined,
      };
    }
  } catch {
    // Ignore
  }

  return null;
}

/**
 * Resolves a fresh stream URL and MP3 audio URL by video id + username.
 * Attempts browser-first JSON lookup, then falls back to /api/resolve.
 */
export async function resolveVideoStreamDirect(
  videoId: string,
  username: string
): Promise<ResolvedStreamResult | null> {
  if (!videoId) return null;
  const clean = sanitizeUsername(username) || 'tiktok';
  const postUrl = `https://www.tiktok.com/@${encodeURIComponent(clean)}/video/${encodeURIComponent(videoId)}`;

  try {
    const directRes = await fetch(
      `https://www.tikwm.com/api/?url=${encodeURIComponent(postUrl)}`,
      {
        method: 'GET',
        mode: 'cors',
        referrerPolicy: 'no-referrer',
        credentials: 'omit',
        signal: AbortSignal.timeout(3500),
      }
    );
    if (directRes.ok) {
      const json = (await directRes.json()) as JsonRecord;
      const parsed = parseBrowserTikwmPost(json);
      if (parsed) return parsed;
    }
  } catch {
    // Fall back to /api/resolve
  }

  try {
    const res = await fetch(
      `/api/resolve?id=${encodeURIComponent(videoId)}&username=${encodeURIComponent(clean)}`,
      {
        method: 'GET',
        headers: { Accept: 'application/json' },
      }
    );
    if (res.ok) {
      const data = (await res.json()) as JsonRecord;
      if (data?.success && (data.play || Array.isArray(data.images))) {
        return {
          id: asStr(data.id),
          title: asStr(data.title),
          play: normalizeMediaUrl(asStr(data.play)),
          wmplay: normalizeMediaUrl(asStr(data.wmplay)),
          music: normalizeMediaUrl(asStr(data.music)),
          cover: normalizeMediaUrl(asStr(data.cover)),
          origin_cover: normalizeMediaUrl(asStr(data.origin_cover)),
          images: extractImagesFromRaw(data.images),
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
 * Executes direct client-side Blob/link download from CDN ($0 server media bandwidth).
 * Zero /api/proxy fallback.
 */
export async function executeDirectCdnDownload(
  cdnUrl: string,
  filename: string
): Promise<void> {
  const normalizedUrl = normalizeMediaUrl(cdnUrl);
  if (!normalizedUrl) {
    throw new Error('Media URL is unavailable for download.');
  }

  // Handle local SVG avatar endpoint (/api/avatar?username=...)
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
    ? normalizedUrl.replace(
        'p16-va-default.akamaized.net',
        'p16.tiktokcdn.com'
      )
    : normalizedUrl;

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
    // Direct browser download fallback ($0 server bandwidth)
  }

  triggerDirectLink(normalizedUrl, filename);
}

/**
 * Prepares direct HTML5 video playback without server proxying.
 * Never sets crossOrigin="anonymous" so non-CORS CDNs play cleanly.
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