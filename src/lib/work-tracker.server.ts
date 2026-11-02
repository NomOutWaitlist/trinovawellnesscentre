import { getRequest, getRequestHeader, useSession, setResponseHeader } from '@tanstack/react-start/server';
import { calculateMinutes, canLogWork, canReadReports, type StaffRole, type WorkEntry } from './work-tracker';

export async function staffSession() {
  const password = process.env['STAFF_SESSION_SECRET'];
  if (!password || password.length < 32) throw new Error('Private access is not configured yet.');
  setResponseHeader('Cache-Control', 'no-store');
  setResponseHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
  return useSession<{ role?: StaffRole }>({
    name: 'trinova-staff', password, maxAge: 60 * 60 * 8,
    cookie: { httpOnly: true, sameSite: 'strict', secure: new URL(getRequest().url).protocol === 'https:', path: '/' },
  });
}

export async function requireStaff(permission: 'log' | 'reports') {
  const session = await staffSession();
  const role = session.data.role ?? null;
  if (!(permission === 'reports' ? canReadReports(role) : canLogWork(role))) throw new Error('Access denied. Please sign in with the correct PIN.');
  return role;
}

export async function sheetRequest(action: string, payload: Record<string, unknown> = {}) {
  const url = process.env['WORK_TRACKER_SCRIPT_URL'];
  const token = process.env['WORK_TRACKER_API_TOKEN'];
  if (!url || !token) throw new Error('The private Google Sheet connection needs to be completed by the owner.');
  const parsed = new URL(url);
  if (parsed.protocol !== 'https:' || parsed.hostname !== 'script.google.com') throw new Error('Invalid sheet connection.');
  try {
    const response = await fetch(url, {
      method: 'POST', redirect: 'follow', signal: AbortSignal.timeout(20000),
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ token, action, ...payload }),
    });
    const result = await response.json() as { ok?: boolean; error?: string; data?: WorkEntry[]; minutes?: number };
    if (!response.ok || !result.ok) throw new Error(result.error === 'Too many attempts' ? 'Too many PIN attempts. Try again in 15 minutes.' : 'The private sheet connection is unavailable. Ask the owner to check the script settings.');
    return result;
  } catch (error) {
    if (error instanceof Error && (error.message.startsWith('Too many') || error.message.startsWith('The private'))) throw error;
    throw new Error('Could not reach the private sheet. Your work has not been confirmed as saved; please retry.');
  }
}

export async function throttleLogin() {
  const ip = getRequestHeader('x-forwarded-for')?.split(',')[0]?.trim() || getRequestHeader('cf-connecting-ip') || 'unknown';
  const secret = process.env['STAFF_SESSION_SECRET'];
  if (!secret) throw new Error('Private access is not configured.');
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const hash = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(ip));
  const client = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
  await sheetRequest('loginAttempt', { client });
}

export async function safePinEqual(input: string, expected: string | undefined) {
  if (!expected) return false;
  const digest = (value: string) => crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  const a = new Uint8Array(await digest(input));
  const b = new Uint8Array(await digest(expected));
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export function checkedEntry(entry: WorkEntry): WorkEntry {
  return { ...entry, minutes: calculateMinutes(entry.start, entry.end) };
}