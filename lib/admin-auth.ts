import crypto from 'node:crypto';
import type { NextRequest } from 'next/server';

export const ADMIN_COOKIE_NAME = 'tpv_admin_session';
export const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 12;

const MAX_PASSWORD_LENGTH = 512;
const MAX_TOKEN_LENGTH = 256;

function getAdminPassword(): string {
  return (process.env.ADMIN_PASSWORD || '').trim();
}

function getSigningSecret(): string {
  const customSecret = (process.env.ADMIN_SESSION_SECRET || '').trim();
  if (customSecret.length >= 16) {
    return customSecret;
  }

  const adminPassword = getAdminPassword();
  if (!adminPassword) {
    return '';
  }

  return crypto
    .createHmac('sha256', adminPassword)
    .update('tpv-admin-session-signing-key-v2')
    .digest('hex');
}

function sha256Buffer(value: string): Buffer {
  return crypto.createHash('sha256').update(value, 'utf8').digest();
}

export function isAdminConfigured(): boolean {
  return getAdminPassword().length > 0;
}

export function isIndependentSessionSecretConfigured(): boolean {
  return (process.env.ADMIN_SESSION_SECRET || '').trim().length >= 16;
}

export function verifyAdminPassword(candidate: string): boolean {
  const expected = getAdminPassword();
  if (
    !expected ||
    typeof candidate !== 'string' ||
    candidate.length === 0 ||
    candidate.length > MAX_PASSWORD_LENGTH
  ) {
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
  if (!token || typeof token !== 'string' || token.length > MAX_TOKEN_LENGTH) {
    return false;
  }

  const secret = getSigningSecret();
  if (!secret) {
    return false;
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return false;
  }

  const [expStr, nonce, sig] = parts;
  if (
    !/^\d{10,12}$/.test(expStr) ||
    !/^[a-f0-9]{32}$/.test(nonce) ||
    !/^[a-f0-9]{64}$/.test(sig)
  ) {
    return false;
  }

  const nowSeconds = Math.floor(Date.now() / 1000);
  const exp = Number(expStr);
  if (
    !Number.isSafeInteger(exp) ||
    exp <= nowSeconds ||
    exp > nowSeconds + ADMIN_SESSION_TTL_SECONDS + 60
  ) {
    return false;
  }

  const expectedSig = crypto
    .createHmac('sha256', secret)
    .update(`${expStr}.${nonce}`)
    .digest('hex');

  const a = Buffer.from(sig, 'hex');
  const b = Buffer.from(expectedSig, 'hex');
  if (a.length !== b.length) {
    return false;
  }

  return crypto.timingSafeEqual(a, b);
}

export function isRequestAuthenticated(req: NextRequest): boolean {
  if (!isAdminConfigured()) {
    return false;
  }
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminSessionCookieValue(token);
}

export function getAdminCookieOptions(maxAge = ADMIN_SESSION_TTL_SECONDS) {
  return {
    httpOnly: true,
    sameSite: 'strict' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge,
  };
}