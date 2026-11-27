import { NextRequest } from 'next/server';

const GRADIENT_PAIRS: readonly [string, string][] = [
  ['#E11D48', '#FB7185'],
  ['#0284C7', '#38BDF8'],
  ['#7C3AED', '#C084FC'],
  ['#D97706', '#F97316'],
  ['#0D9488', '#06B6D4'],
  ['#2563EB', '#4F46E5'],
];

function escapeXmlChar(ch: string): string {
  switch (ch) {
    case '&':
      return '&amp;';
    case '<':
      return '&lt;';
    case '>':
      return '&gt;';
    case '"':
      return '&quot;';
    case "'":
      return '&apos;';
    default:
      return ch;
  }
}

function generateSvgAvatar(username: string): Response {
  const clean = username.replace(/^@+/, '').trim() || 'T';
  const rawInitial = clean.charAt(0).toUpperCase();
  const initial = escapeXmlChar(/[A-Z0-9]/i.test(rawInitial) ? rawInitial : 'T');

  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    hash = (hash << 5) - hash + clean.charCodeAt(i);
  }
  const [startColor, endColor] =
    GRADIENT_PAIRS[Math.abs(hash) % GRADIENT_PAIRS.length];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200" role="img" aria-label="${initial}">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${startColor}"/>
      <stop offset="100%" stop-color="${endColor}"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="100" fill="url(#g)"/>
  <text x="50%" y="54%" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="82" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${initial}</text>
</svg>`;

  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control':
        'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
    },
  });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const usernameParam = searchParams.get('username') || 'TikTok';
  return generateSvgAvatar(usernameParam);
}