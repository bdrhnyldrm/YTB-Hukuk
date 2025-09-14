const env = (import.meta as any).env || {};
const API_BASE = env.VITE_API_URL ?? env.VITE_API_BASE_URL ?? "";

interface AuthData {
  token: string;
  expire?: number; // sadece sayfa kapanışında set edilir
}

let authObj: AuthData | null = null;

try {
  const raw = localStorage.getItem("ytb_auth");
  if (raw) authObj = JSON.parse(raw);
} catch {
  authObj = null;
}

// Login → sadece token sakla (expire yok)
export function setBasicAuth(username: string, password: string) {
  const token = btoa(`${username}:${password}`);
  authObj = { token };
  localStorage.setItem("ytb_auth", JSON.stringify(authObj));
}

// clearAuth(full=true) → tamamen temizle
// clearAuth(full=false) → 10 saniyelik geçerlilik bırak
export function clearAuth(full = true) {
  if (full) {
    authObj = null;
    localStorage.removeItem("ytb_auth");
  } else if (authObj?.token) {
    authObj = { token: authObj.token, expire: Date.now() + 10_000 };
    localStorage.setItem("ytb_auth", JSON.stringify(authObj));
  }
}

function buildUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE}${path}`;
}

function authHeaders(extra?: HeadersInit) {
  const h: HeadersInit = { ...(extra || {}) };
  if (authObj) {
    if (authObj.expire && Date.now() > authObj.expire) {
      // süresi doldu → tamamen sil
      authObj = null;
      localStorage.removeItem("ytb_auth");
    } else {
      h["Authorization"] = `Basic ${authObj.token}`;
    }
  }
  return h;
}

// -------------------------------
// 📌 JSON Helpers
// -------------------------------
export async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(buildUrl(path), {
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  const raw = await res.text();
  let data: any = null;
  try {
    data = raw ? JSON.parse(raw) : null;
  } catch {}
  if (!res.ok)
    throw new Error(
      (data && (data.error || data.message)) || raw || `HTTP ${res.status}`
    );
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
  try {
    data = raw ? JSON.parse(raw) : null;
  } catch {}
  if (!res.ok)
    throw new Error(
      (data && (data.error || data.message)) || raw || `HTTP ${res.status}`
    );
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
  try {
    data = raw ? JSON.parse(raw) : null;
  } catch {}
  if (!res.ok)
    throw new Error(
      (data && (data.error || data.message)) || raw || `HTTP ${res.status}`
    );
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

// -------------------------------
// 📌 FormData Helpers
// -------------------------------
export async function postForm<T>(path: string, form: FormData): Promise<T> {
  const res = await fetch(buildUrl(path), {
    method: "POST",
    headers: authHeaders(),
    body: form,
  });
  const raw = await res.text();
  let data: any = null;
  try {
    data = raw ? JSON.parse(raw) : null;
  } catch {}
  if (!res.ok)
    throw new Error(
      (data && (data.error || data.message)) || raw || `HTTP ${res.status}`
    );
  return (data as T) ?? ({} as T);
}
