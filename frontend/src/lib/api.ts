// API_BASE: .env'de VITE_API_URL tanımlıysa onu kullan, yoksa boş bırak.
// Geliştirmede Vite proxy ile /api istekleri backend'e yönlenir.
// src/lib/api.ts
const env = (import.meta as any).env || {};
const API_BASE = env.VITE_API_URL ?? env.VITE_API_BASE_URL ?? "";


// ---- AUTH Yönetimi ----
let basicAuth: string | null = localStorage.getItem("ytb_auth") || null;

export function setBasicAuth(username: string, password: string) {
  basicAuth = btoa(`${username}:${password}`);
  localStorage.setItem("ytb_auth", basicAuth);
}

export function clearAuth() {
  basicAuth = null;
  localStorage.removeItem("ytb_auth");
}

function buildUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE}${path}`;
}

function authHeaders(extra?: HeadersInit) {
  const h: HeadersInit = { ...(extra || {}) };
  if (basicAuth) h["Authorization"] = `Basic ${basicAuth}`;
  return h;
}

// ---- JSON Helpers ----
export async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(buildUrl(path), {
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  const raw = await res.text();
  let data: any = null;
  try { data = raw ? JSON.parse(raw) : null; } catch {}
  if (!res.ok) throw new Error((data && (data.error || data.message)) || raw || `HTTP ${res.status}`);
  return (data as T) ?? ({} as T);
}

export async function postJSON<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(buildUrl(path), {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(body),
  });
  const raw = await res.text();
  let data: any = null;
  try { data = raw ? JSON.parse(raw) : null; } catch {}
  if (!res.ok) throw new Error((data && (data.error || data.message)) || raw || `HTTP ${res.status}`);
  return (data as T) ?? ({} as T);
}

export async function putJSON<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(buildUrl(path), {
    method: "PUT",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(body),
  });
  const raw = await res.text();
  let data: any = null;
  try { data = raw ? JSON.parse(raw) : null; } catch {}
  if (!res.ok) throw new Error((data && (data.error || data.message)) || raw || `HTTP ${res.status}`);
  return (data as T) ?? ({} as T);
}

export async function del(path: string): Promise<void> {
  const res = await fetch(buildUrl(path), {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) {
    const raw = await res.text();
    throw new Error(raw || `HTTP ${res.status}`);
  }
}

// ---- FormData (kariyer/başvuru dosyaları için) ----
export async function postForm<T>(path: string, form: FormData): Promise<T> {
  const res = await fetch(buildUrl(path), {
    method: "POST",
    headers: authHeaders(),
    body: form, // fetch otomatik Content-Type: multipart/form-data boundary ekler
  });
  const raw = await res.text();
  let data: any = null;
  try { data = raw ? JSON.parse(raw) : null; } catch {}
  if (!res.ok) throw new Error((data && (data.error || data.message)) || raw || `HTTP ${res.status}`);
  return (data as T) ?? ({} as T);
}
