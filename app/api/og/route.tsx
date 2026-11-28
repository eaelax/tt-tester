// File: app/api/og/route.tsx
import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const RTL_LANGS = new Set(['ar', 'he']);

function cleanParam(value: string | null, fallback: string, maxLen: number): string {
  if (!value) return fallback;
  const normalized = value.replace(/\s+/g, ' ').trim();
  if (!normalized) return fallback;
  if (normalized.length <= maxLen) return normalized;
  return `${normalized.slice(0, maxLen - 3).trim()}...`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const lang = cleanParam(searchParams.get('lang'), 'en', 8).toLowerCase();
  const isRtl = RTL_LANGS.has(lang);

  const title = cleanParam(
    searchParams.get('title'),
    'Tik Profiles Viewer: Free HD Video & Profile Tool',
    110
  );
  const subtitle = cleanParam(
    searchParams.get('subtitle'),
    'Browse public TikTok profiles anonymously with no login and save watermark-free HD MP4 videos and MP3 audio.',
    160
  );
  const badge = cleanParam(searchParams.get('badge'), 'TikProfilesViewer.com', 48);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#F8FAFC',
          padding: '52px 60px',
          color: '#0F172A',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Top Accent Strip */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '10px',
            display: 'flex',
            backgroundImage: 'linear-gradient(90deg, #0F172A 0%, #E11D48 52%, #0284C7 100%)',
          }}
        />

        {/* Header Row */}
        <div
          style={{
            display: 'flex',
            flexDirection: isRtl ? 'row-reverse' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingBottom: '28px',
            borderBottom: '2px solid #E2E8F0',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: isRtl ? 'row-reverse' : 'row',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                backgroundColor: '#E11D48',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                fontWeight: 800,
                marginRight: isRtl ? '0px' : '16px',
                marginLeft: isRtl ? '16px' : '0px',
              }}
            >
              T
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isRtl ? 'flex-end' : 'flex-start',
              }}
            >
              <span
                style={{
                  fontSize: '26px',
                  fontWeight: 800,
                  color: '#0F172A',
                  letterSpacing: '-0.02em',
                }}
              >
                Tik Profiles Viewer
              </span>
              <span
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#475569',
                }}
              >
                TikProfilesViewer.com
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 18px',
              borderRadius: '8px',
              backgroundColor: '#E0F2FE',
              border: '1px solid #BAE6FD',
              color: '#0369A1',
              fontSize: '18px',
              fontWeight: 700,
            }}
          >
            {badge}
          </div>
        </div>

        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: isRtl ? 'flex-end' : 'flex-start',
            justifyContent: 'center',
            flexGrow: 1,
            paddingTop: '24px',
            paddingBottom: '24px',
            textAlign: isRtl ? 'right' : 'left',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: title.length > 68 ? '42px' : '50px',
              fontWeight: 800,
              lineHeight: 1.18,
              letterSpacing: '-0.025em',
              color: '#0F172A',
              marginBottom: '20px',
              maxWidth: '1020px',
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: '24px',
              fontWeight: 500,
              lineHeight: 1.42,
              color: '#334155',
              maxWidth: '980px',
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Footer Metadata Row */}
        <div
          style={{
            display: 'flex',
            flexDirection: isRtl ? 'row-reverse' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingTop: '22px',
            borderTop: '2px solid #E2E8F0',
            fontSize: '18px',
            fontWeight: 700,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: isRtl ? 'row-reverse' : 'row',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                color: '#0369A1',
                marginRight: isRtl ? '0px' : '28px',
                marginLeft: isRtl ? '28px' : '0px',
              }}
            >
              No Login Required
            </span>
            <span
              style={{
                color: '#BE123C',
                marginRight: isRtl ? '0px' : '28px',
                marginLeft: isRtl ? '28px' : '0px',
              }}
            >
              HD MP4 Without Watermark
            </span>
            <span style={{ color: '#0F172A' }}>MP3 Audio Saver</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              color: '#475569',
              fontSize: '16px',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            {lang}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control':
          'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
        'X-Content-Type-Options': 'nosniff',
      },
    }
  );
}