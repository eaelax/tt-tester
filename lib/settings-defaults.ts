export interface AdPlacement {
  id: string;
  name: string;
  placement: 'modal' | 'header' | 'above_grid' | 'in_grid' | 'footer' | 'sidebar';
  dimension: 'responsive' | '728x90' | '300x250' | '336x280' | '320x100' | '300x600';
  code: string;
  enabled: boolean;
  notes?: string;
}

export interface SiteSettings {
  siteName: string;
  domainName: string;
  downloadCounterSeconds: number;
  downloadPreparingText: string;
  downloadSuccessText: string;
  announcementEnabled: boolean;
  announcementText: string;
  announcementLink?: string;
  customHeadCode?: string;
  ads: AdPlacement[];
}

export const DEFAULT_SETTINGS: SiteSettings = {
  siteName: 'Tik Profiles Viewer',
  domainName: 'TikProfilesViewer.com',
  downloadCounterSeconds: 5,
  downloadPreparingText: 'Preparing clean HD video stream in background...',
  downloadSuccessText: 'Your download is ready! Starting download...',
  announcementEnabled: false,
  announcementText: 'New: High-speed HD Video and MP3 Audio Downloader without watermarks.',
  announcementLink: '/tiktok-video-downloader',
  customHeadCode: '',
  ads: [
    {
      id: 'ad-modal-1',
      name: 'Download Modal Sponsored Banner',
      placement: 'modal',
      dimension: '300x250',
      code: '',
      enabled: false,
      notes: 'Shown inside the countdown download modal while preparing the video.',
    },
    {
      id: 'ad-header-1',
      name: 'Header Top Leaderboard',
      placement: 'header',
      dimension: '728x90',
      code: '',
      enabled: false,
      notes: 'Displayed on top of pages under navigation.',
    },
    {
      id: 'ad-above-grid-1',
      name: 'Above Videos Grid Banner',
      placement: 'above_grid',
      dimension: 'responsive',
      code: '',
      enabled: false,
      notes: 'Placed above the TikTok videos grid for high engagement.',
    },
    {
      id: 'ad-footer-1',
      name: 'Footer Leaderboard Banner',
      placement: 'footer',
      dimension: '728x90',
      code: '',
      enabled: false,
      notes: 'Placed directly above the main footer columns.',
    },
  ],
};

const VALID_PLACEMENTS = new Set<AdPlacement['placement']>([
  'modal',
  'header',
  'above_grid',
  'in_grid',
  'footer',
  'sidebar',
]);

const VALID_DIMENSIONS = new Set<AdPlacement['dimension']>([
  'responsive',
  '728x90',
  '300x250',
  '336x280',
  '320x100',
  '300x600',
]);

export function sanitizeSiteSettings(input: unknown): SiteSettings {
  if (!input || typeof input !== 'object') {
    return DEFAULT_SETTINGS;
  }

  const raw = input as Record<string, unknown>;
  const rawSeconds =
    typeof raw.downloadCounterSeconds === 'number'
      ? raw.downloadCounterSeconds
      : Number(raw.downloadCounterSeconds);
  const downloadCounterSeconds =
    Number.isFinite(rawSeconds) && rawSeconds >= 1 && rawSeconds <= 30
      ? Math.round(rawSeconds)
      : DEFAULT_SETTINGS.downloadCounterSeconds;

  const ads: AdPlacement[] = Array.isArray(raw.ads)
    ? raw.ads
        .filter((item): item is Record<string, unknown> => Boolean(item && typeof item === 'object'))
        .slice(0, 25)
        .map((ad, idx) => {
          const placementRaw = String(ad.placement || 'modal') as AdPlacement['placement'];
          const dimensionRaw = String(ad.dimension || 'responsive') as AdPlacement['dimension'];
          const code = typeof ad.code === 'string' ? ad.code.slice(0, 12000) : '';
          const isPlaceholder = code.includes('ad-placeholder');

          return {
            id: typeof ad.id === 'string' && ad.id.trim() ? ad.id.trim().slice(0, 64) : `ad-${idx + 1}`,
            name:
              typeof ad.name === 'string' && ad.name.trim()
                ? ad.name.trim().slice(0, 100)
                : `Ad Slot ${idx + 1}`,
            placement: VALID_PLACEMENTS.has(placementRaw) ? placementRaw : 'modal',
            dimension: VALID_DIMENSIONS.has(dimensionRaw) ? dimensionRaw : 'responsive',
            code: isPlaceholder ? '' : code,
            enabled: isPlaceholder ? false : Boolean(ad.enabled),
            notes: typeof ad.notes === 'string' ? ad.notes.slice(0, 300) : '',
          };
        })
    : DEFAULT_SETTINGS.ads;

  return {
    siteName:
      typeof raw.siteName === 'string' && raw.siteName.trim()
        ? raw.siteName.trim().slice(0, 100)
        : DEFAULT_SETTINGS.siteName,
    domainName:
      typeof raw.domainName === 'string' && raw.domainName.trim()
        ? raw.domainName.trim().slice(0, 120)
        : DEFAULT_SETTINGS.domainName,
    downloadCounterSeconds,
    downloadPreparingText:
      typeof raw.downloadPreparingText === 'string' && raw.downloadPreparingText.trim()
        ? raw.downloadPreparingText.trim().slice(0, 280)
        : DEFAULT_SETTINGS.downloadPreparingText,
    downloadSuccessText:
      typeof raw.downloadSuccessText === 'string' && raw.downloadSuccessText.trim()
        ? raw.downloadSuccessText.trim().slice(0, 280)
        : DEFAULT_SETTINGS.downloadSuccessText,
    announcementEnabled: Boolean(raw.announcementEnabled),
    announcementText:
      typeof raw.announcementText === 'string'
        ? raw.announcementText.slice(0, 280)
        : DEFAULT_SETTINGS.announcementText,
    announcementLink:
      typeof raw.announcementLink === 'string'
        ? raw.announcementLink.slice(0, 200)
        : DEFAULT_SETTINGS.announcementLink,
    customHeadCode:
      typeof raw.customHeadCode === 'string' ? raw.customHeadCode.slice(0, 16000) : '',
    ads,
  };
}