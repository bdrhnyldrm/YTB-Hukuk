// API_BASE: .env'de VITE_API_URL tanımlıysa onu kullan, yoksa boş bırak.
// Geliştirmede Vite proxy ile /api istekleri backend'e yönlenir.
const API_BASE = (import.meta as any).env?.VITE_API_URL ?? "";

// Güvenli URL birleştirme:
// - path tam URL ise (http/https ile başlıyorsa) direkt kullan
// - değilse API_BASE + path (API_BASE boşsa sadece path kalır)
function buildUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE}${path}`;
}

export async function postJSON<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(buildUrl(path), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  // Yanıtı güvenle ayrıştır
  const raw = await res.text();
  let data: any = null;
  try {
    data = raw ? JSON.parse(raw) : null;
  } catch {
    // JSON değilse text bırak
  }

  if (!res.ok) {
    const msg =
      (data && (data.error || data.message)) ||
      raw ||
      `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return (data as T) ?? ({} as T);
}
