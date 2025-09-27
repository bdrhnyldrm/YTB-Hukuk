import { useEffect, useState } from "react";
import { getJSON } from "@/lib/api";
import { PRACTICE_AREAS } from "@/components/articles/ArticleForm";
import { Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export default function ArticlesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [q, setQ] = useState("");
  const [area, setArea] = useState<string>("");
  const [authorId, setAuthorId] = useState<string>("");

  const load = async () => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (area) params.set("area", area);
    if (authorId) params.set("authorId", authorId);
    const data = await getJSON<any>(`/api/articles?${params.toString()}`);
    setItems(data.content ?? []);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-semibold mb-6">Makaleler</h1>

      <div className="grid md:grid-cols-3 gap-3 mb-6">
        <input
          className="border rounded-md p-3"
          placeholder="Ara (başlık)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="border rounded-md p-3"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        >
          <option value="">— Hukuk Alanı —</option>
          {PRACTICE_AREAS.map((a) => (
            <option key={a.key} value={a.key}>
              {a.label}
            </option>
          ))}
        </select>
        {/* Basit MVP: authorId'i elle — ileride /api/articles/authors ile doldururuz */}
        <input
          className="border rounded-md p-3"
          placeholder="Yazar ID (opsiyonel)"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <button className="btn-hero" onClick={load}>
          Filtrele
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {items.map((it) => (
          <Link
            to={`/makaleler/${it.slug}`}
            key={it.id}
            className="card-corporate hover:shadow-corporate p-4 md:p-6 md:flex md:items-start gap-5"
          >
            {/* Kapak Fotoğrafı */}
            {it.coverUrl ? (
              <img
                src={`${API_BASE}${it.coverUrl}`} // ✅ backend domaini ile birleştirildi
                alt={it.title}
                className="w-full md:w-40 md:h-28 object-cover rounded-lg mb-3 md:mb-0 flex-shrink-0"
                loading="lazy"
              />
            ) : (
              <div className="w-full md:w-40 md:h-28 bg-muted rounded-lg mb-3 md:mb-0 flex-shrink-0" />
            )}

            {/* Metin alanı */}
            <div className="flex-1">
              <div className="text-xl font-semibold">{it.title}</div>
              <div className="text-sm text-muted-foreground mb-2">
                {it.authorName} •{" "}
                {new Date(it.createdAt).toLocaleDateString()}
              </div>
              <p className="text-slate-700 line-clamp-3">{it.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
