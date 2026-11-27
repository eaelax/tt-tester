'use client';

import { useEffect, useSyncExternalStore } from 'react';
import {
  DEFAULT_SETTINGS,
  SiteSettings,
  AdPlacement,
  sanitizeSiteSettings,
} from './settings-defaults';

export { DEFAULT_SETTINGS, type SiteSettings, type AdPlacement };

export interface SaveSettingsResponse {
  ok: boolean;
  persisted?: boolean;
  backend?: string;
  notice?: string;
  error?: string;
}

const SETTINGS_CHANGE_EVENT = 'tpv_settings_updated';

let memorySettings: SiteSettings = DEFAULT_SETTINGS;
let hasHydratedFromServer = false;
let hydrationPromise: Promise<void> | null = null;

function notifySubscribers() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(SETTINGS_CHANGE_EVENT));
  }
}

async function hydrateFromServer(): Promise<void> {
  if (typeof window === 'undefined' || hasHydratedFromServer) return;
  if (hydrationPromise) return hydrationPromise;

  hydrationPromise = (async () => {
    try {
      const res = await fetch('/api/settings', {
        method: 'GET',
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      });
      if (res.ok) {
        const json = (await res.json()) as { settings?: unknown };
        if (json?.settings) {
          memorySettings = sanitizeSiteSettings(json.settings);
          hasHydratedFromServer = true;
          notifySubscribers();
        }
      }
    } catch {
      // Graceful fallback to DEFAULT_SETTINGS
    } finally {
      hydrationPromise = null;
    }
  })();

  return hydrationPromise;
}

export async function saveGlobalSettings(
  newSettings: SiteSettings
): Promise<SaveSettingsResponse> {
  try {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(newSettings),
    });

    const json = (await res.json()) as {
      settings?: unknown;
      persisted?: boolean;
      backend?: string;
      notice?: string;
      error?: string;
    };

    if (!res.ok) {
      return {
        ok: false,
        error: json.error || `Failed to save settings (HTTP ${res.status}).`,
      };
    }

    if (json.settings) {
      memorySettings = sanitizeSiteSettings(json.settings);
      hasHydratedFromServer = true;
      notifySubscribers();
    }

    return {
      ok: true,
      persisted: Boolean(json.persisted),
      backend: json.backend,
      notice: json.notice,
    };
  } catch (err: unknown) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Network error saving settings.',
    };
  }
}

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(SETTINGS_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener(SETTINGS_CHANGE_EVENT, callback);
  };
}

function getSnapshot(): SiteSettings {
  return memorySettings;
}

function getServerSnapshot(): SiteSettings {
  return DEFAULT_SETTINGS;
}

export function useSiteSettings(): [
  SiteSettings,
  (newSettings: SiteSettings) => Promise<SaveSettingsResponse>,
] {
  const settings = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    void hydrateFromServer();
  }, []);

  return [settings, saveGlobalSettings];
}