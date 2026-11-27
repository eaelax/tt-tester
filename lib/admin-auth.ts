import crypto from 'node:crypto';
import type { NextRequest } from 'next/server';

export const ADMIN_COOKIE_NAME = 'tpv_admin_session';
export const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

function getAdminPassword(): string {
  return (process.env.ADMIN_PASSWORD || '').trim();
}

function getSigningSecret(): string {
  const customSecret = (process.env.ADMIN_SESSION_SECRET || '').trim();
  if (customSecret) return customSecret;
  const adminPassword = getAdminPassword();
  if (!adminPassword) return '';
  return crypto
    .createHash('sha256')
    .update(`tpv-session-key:${adminPassword}`)
    .digest('hex');
}

function sha256Buffer(value: string): Buffer {
  return crypto.createHash('sha256').update(value, 'utf8').digest();
}

export function isAdminConfigured(): boolean {
  return getAdminPassword().length > 0;
}

export function verifyAdminPassword(candidate: string): boolean {
  const expected = getAdminPassword();
  if (!expected || typeof candidate !== 'string' || !candidate) {
    return false;
  }
  const a = sha256Buffer(candidate);
  const b = sha256Buffer(expected);
  return crypto.timingSafeEqual(a, b);
}

export function createAdminSessionCookieValue(): string {
  const secret = getSigningSecret();
  if (!secret) {
    throw new Error('Admin authentication is not configured.');
  }
  const exp = Math.floor(Date.now() / 1000) + ADMIN_SESSION_TTL_SECONDS;
  const nonce = crypto.randomBytes(16).toString('hex');
  const payload = `${exp}.${nonce}`;
  const sig = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return `${payload}.${sig}`;
}

export function verifyAdminSessionCookieValue(token: string | undefined): boolean {
  if (!token || typeof token !== 'string') return false;
  const secret = getSigningSecret();
  if (!secret) return false;

  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const [expStr, nonce, sig] = parts;
  if (!expStr || !nonce || !sig) return false;

  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp <= Math.floor(Date.now() / 1000)) {
    return false;
  }

  const expectedSig = crypto
    .createHmac('sha256', secret)
    .update(`${expStr}.${nonce}`)
    .digest('hex');

  const a = Buffer.from(sig, 'utf8');
  const b = Buffer.from(expectedSig, 'utf8');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function isRequestAuthenticated(req: NextRequest): boolean {
  if (!isAdminConfigured()) return false;
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminSessionCookieValue(token);
}