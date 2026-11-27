import {
  DEFAULT_SETTINGS,
  SiteSettings,
  sanitizeSiteSettings,
} from './settings-defaults';

const SETTINGS_KEY = 'tpv_site_settings_v1';
const REQUEST_TIMEOUT_MS = 3500;

export type SettingsBackend = 'upstash_redis' | 'vercel_edge_config' | 'none';

export interface SaveSettingsResult {
  settings: SiteSettings;
  persisted: boolean;
  backend: SettingsBackend;
  notice?: string;
}

function getUpstashConfig(): { url: string; token: string } | null {
  const url = (process.env.UPSTASH_REDIS_REST_URL || '').trim().replace(/\/+$/, '');
  const token = (process.env.UPSTASH_REDIS_REST_TOKEN || '').trim();
  if (!url || !token) return null;
  return { url, token };
}

function getEdgeConfigDetails(): {
  connectionUrl: string;
  edgeConfigId: string;
  vercelApiToken: string;
  teamId: string;
} | null {
  const connectionUrl = (process.env.EDGE_CONFIG || '').trim();
  if (!connectionUrl) return null;
  try {
    const parsed = new URL(connectionUrl);
    const segments = parsed.pathname.split('/').filter(Boolean);
    const edgeConfigId = segments.find((s) => s.startsWith('ecfg_')) || segments[0] || '';
    if (!edgeConfigId) return null;
    return {
      connectionUrl,
      edgeConfigId,
      vercelApiToken: (process.env.VERCEL_API_TOKEN || '').trim(),
      teamId: (process.env.VERCEL_TEAM_ID || '').trim(),
    };
  } catch {
    return null;
  }
}

export function getConfiguredSettingsBackend(): SettingsBackend {
  if (getUpstashConfig()) return 'upstash_redis';
  if (getEdgeConfigDetails()) return 'vercel_edge_config';
  return 'none';
}

export async function getServerSettings(): Promise<{
  settings: SiteSettings;
  backend: SettingsBackend;
}> {
  const upstash = getUpstashConfig();
  if (upstash) {
    try {
      const res = await fetch(
        `${upstash.url}/get/${encodeURIComponent(SETTINGS_KEY)}`,
        {
          headers: {
            Authorization: `Bearer ${upstash.token}`,
          },
          cache: 'no-store',
          signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        }
      );

      if (res.ok) {
        const json = (await res.json()) as { result?: string | SiteSettings | null };
        if (json.result) {
          const parsed =
            typeof json.result === 'string' ? JSON.parse(json.result) : json.result;
          return {
            settings: sanitizeSiteSettings(parsed),
            backend: 'upstash_redis',
          };
        }
      }
    } catch {
      // Graceful fallback to DEFAULT_SETTINGS
    }
    return { settings: DEFAULT_SETTINGS, backend: 'upstash_redis' };
  }

  const edge = getEdgeConfigDetails();
  if (edge) {
    try {
      const parsedUrl = new URL(edge.connectionUrl);
      const itemUrl = new URL(
        `${parsedUrl.pathname.replace(/\/+$/, '')}/item/${encodeURIComponent(SETTINGS_KEY)}`,
        parsedUrl.origin
      );
      itemUrl.search = parsedUrl.search;

      const res = await fetch(itemUrl.toString(), {
        cache: 'no-store',
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });

      if (res.ok) {
        const value = (await res.json()) as unknown;
        if (value && typeof value === 'object') {
          return {
            settings: sanitizeSiteSettings(value),
            backend: 'vercel_edge_config',
          };
        }
      }
    } catch {
      // Graceful fallback to DEFAULT_SETTINGS
    }
    return { settings: DEFAULT_SETTINGS, backend: 'vercel_edge_config' };
  }

  return { settings: DEFAULT_SETTINGS, backend: 'none' };
}

export async function saveServerSettings(
  candidate: unknown
): Promise<SaveSettingsResult> {
  const sanitized = sanitizeSiteSettings(candidate);

  const upstash = getUpstashConfig();
  if (upstash) {
    const res = await fetch(upstash.url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${upstash.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(['SET', SETTINGS_KEY, JSON.stringify(sanitized)]),
      cache: 'no-store',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!res.ok) {
      throw new Error(`Upstash Redis write failed with status ${res.status}.`);
    }

    return {
      settings: sanitized,
      persisted: true,
      backend: 'upstash_redis',
    };
  }

  const edge = getEdgeConfigDetails();
  if (edge) {
    if (!edge.vercelApiToken) {
      return {
        settings: sanitized,
        persisted: false,
        backend: 'vercel_edge_config',
        notice:
          'EDGE_CONFIG is set for reads, but VERCEL_API_TOKEN is required to write updates to Vercel Edge Config.',
      };
    }

    const patchUrl = new URL(
      `https://api.vercel.com/v1/edge-config/${encodeURIComponent(edge.edgeConfigId)}/items`
    );
    if (edge.teamId) {
      patchUrl.searchParams.set('teamId', edge.teamId);
    }

    const res = await fetch(patchUrl.toString(), {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${edge.vercelApiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            operation: 'upsert',
            key: SETTINGS_KEY,
            value: sanitized,
          },
        ],
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!res.ok) {
      throw new Error(`Vercel Edge Config write failed with status ${res.status}.`);
    }

    return {
      settings: sanitized,
      persisted: true,
      backend: 'vercel_edge_config',
    };
  }

  return {
    settings: sanitized,
    persisted: false,
    backend: 'none',
    notice:
      'No external storage env vars configured (UPSTASH_REDIS_REST_URL/TOKEN or EDGE_CONFIG + VERCEL_API_TOKEN). Using browser preview fallback and DEFAULT_SETTINGS.',
  };
}