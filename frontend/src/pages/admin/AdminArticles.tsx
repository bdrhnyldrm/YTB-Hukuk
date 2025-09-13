import { useEffect, useState } from "react";
import { del, getJSON } from "@/lib/api";
import ArticleForm from "@/components/articles/ArticleForm";

export default function AdminArticles() {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await getJSON<any>("/api/admin/articles?page=0&size=100");
    setList(data.content ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  // Tek bir makale detayı getir
  const loadDetail = async (id: number) => {
    const detail = await getJSON<any>(`/api/admin/articles/${id}`);
    setEditing(detail);
  };

  return (
    <div className="container-custom py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Makaleler (Admin)</h1>
        <button
          className="btn-hero"
          onClick={() => {
            setEditing(null);
            setShowCreate(true);
          }}
        >
          Yeni Makale
        </button>
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
                  {it.authorName} •{" "}
                  {new Date(it.createdAt).toLocaleDateString()}
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
                  onClick={() => loadDetail(it.id)} // 👈 Artık önce detay çekiyoruz
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
