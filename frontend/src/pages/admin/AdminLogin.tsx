import { useEffect, useState } from "react";
import { setBasicAuth, clearAuth } from "@/lib/api";

export default function AdminLogin() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
      // sayfa açıldığında mevcut auth'u kontrol et
      const raw = localStorage.getItem("ytb_auth");
      if (raw) {
        try {
          const { token, expire } = JSON.parse(raw);
          if (Date.now() < expire && token) {
            // hâlâ süresi dolmadı → direkt admin sayfasına yönlendir
            location.href = "/admin/articles";
          } else {
            clearAuth(); // süresi geçtiyse temizle
          }
        } catch {
          clearAuth();
        }
      }
    }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      setBasicAuth(u, p);
      location.href = "/admin/articles";
    } catch (e: any) {
      clearAuth();
      setErr(e?.message || "Giriş başarısız");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md border rounded-2xl p-6 shadow-sm bg-white"
      >
        <h1 className="text-2xl font-semibold mb-4">Admin Giriş</h1>

        <input
          className="border rounded-md w-full p-3 mb-3"
          placeholder="Kullanıcı adı"
          value={u}
          onChange={(e) => setU(e.target.value)}
        />
        <input
          className="border rounded-md w-full p-3 mb-3"
          placeholder="Parola"
          type="password"
          value={p}
          onChange={(e) => setP(e.target.value)}
        />

        {err && <p className="text-red-600 mb-2">{err}</p>}

        <button className="btn-hero w-full" disabled={busy}>
          {busy ? "Kontrol ediliyor..." : "Giriş Yap"}
        </button>
      </form>
    </div>
  );
}
