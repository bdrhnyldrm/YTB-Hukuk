import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { del, getJSON, clearAuth } from "@/lib/api";
import ArticleForm from "@/components/articles/ArticleForm";

export default function AdminArticles() {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const routerLocation = useLocation();
  const navigate = useNavigate();

  // ✅ Token expire kontrolü
  useEffect(() => {
    const raw = localStorage.getItem("ytb_auth");
    if (raw) {
      try {
        const { token, expire } = JSON.parse(raw);
        if (!token || (expire && Date.now() > expire)) {
          clearAuth(true);
          navigate("/admin/login", { replace: true });
        }
      } catch {
        clearAuth(true);
        navigate("/admin/login", { replace: true });
      }
    } else {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getJSON<any>("/api/admin/articles?page=0&size=100");
      setList(data.content ?? []);
    } catch (e: any) {
      // Eğer backend 401 dönerse → login sayfasına at
      if (e.message.includes("401")) {
        clearAuth(true);
        navigate("/admin/login", { replace: true });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const loadDetail = async (id: number) => {
    try {
      const detail = await getJSON<any>(`/api/admin/articles/${id}`);
      setEditing(detail);
    } catch (e: any) {
      if (e.message.includes("401")) {
        clearAuth(true);
        navigate("/admin/login", { replace: true });
      }
    }
  };

  // Tarayıcı kapatılırsa → token 10 saniye geçerli kalsın
  useEffect(() => {
    const handler = () => {
      clearAuth(false); // expire=10s
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  // Route değişimi → admin dışına çıkınca token 10 saniye geçerli kalsın
  useEffect(() => {
    if (!routerLocation.pathname.startsWith("/admin")) {
      clearAuth(false);
    }
  }, [routerLocation.pathname]);

  const logout = () => {
    clearAuth(true);
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="container-custom py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Makaleler (Admin)</h1>
        <div className="flex gap-3">
          <button
            className="btn-hero"
            onClick={() => {
              setEditing(null);
              setShowCreate(true);
            }}
          >
            Yeni Makale
          </button>
          <button className="btn-outline-gold" onClick={logout}>
            Çıkış Yap
          </button>
        </div>
      </div>

      {showCreate && (
        <div className="card-corporate mb-8">
          <h2 className="text-xl mb-4">Yeni Makale</h2>
          <ArticleForm
            onSaved={() => {
              setShowCreate(false);
              load();
            }}
          />
        </div>
      )}

      {editing && (
        <div className="card-corporate mb-8">
          <h2 className="text-xl mb-4">Makale Düzenle</h2>
          <ArticleForm
            editing
            initial={editing}
            onSaved={() => {
              setEditing(null);
              load();
            }}
          />
        </div>
      )}

      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <div className="space-y-4">
          {list.map((it) => (
            <div
              key={it.id}
              className="border rounded-xl p-4 flex items-center justify-between bg-white"
            >
              <div>
                <div className="font-semibold">{it.title}</div>
                <div className="text-sm text-slate-600">
                  {it.authorName} • {new Date(it.createdAt).toLocaleDateString()}
                </div>
                <div className="text-xs text-slate-500">
                  Alanlar: {(it.areas || []).join(", ")}
                </div>
                {!it.published && (
                  <span className="text-xs text-red-600">Taslak</span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  className="btn-outline-gold"
                  onClick={() => loadDetail(it.id)}
                >
                  Düzenle
                </button>
                <button
                  className="btn-outline-gold"
                  onClick={async () => {
                    if (confirm("Silinsin mi?")) {
                      await del(`/api/admin/articles/${it.id}`);
                      load();
                    }
                  }}
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
