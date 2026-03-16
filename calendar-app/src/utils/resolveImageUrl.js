// src/utils/resolveImageUrl.js
const DOCTORS_API_BASE =
  import.meta.env.VITE_DOCTORS_API_BASE ||
  import.meta.env.VITE_API_BASE_URL ||
  'https://damas.adsys-iq.com:5012';

export function resolveImageUrl(pathOrUrl) {
  if (!pathOrUrl) return undefined;
  const p = String(pathOrUrl).trim();
  if (!p || p === ' ') return undefined;
  if (/^https?:\/\//i.test(p)) return p;
  return `${DOCTORS_API_BASE.replace(/\/+$/, '')}/${p.replace(/^\/+/, '')}`;
}
