import { useEffect, useState } from "react";
import { getJSON } from "@/lib/api";
import { PRACTICE_AREAS } from "@/components/articles/ArticleForm";
import { Link } from "react-router-dom";
import Select from "react-select";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export default function ArticlesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [q, setQ] = useState("");
  const [areas, setAreas] = useState<string[]>([]);
  const [authorIds, setAuthorIds] = useState<string[]>([]);
  const [authors, setAuthors] = useState<{ id: string; name: string }[]>([]);

  const load = async () => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    areas.forEach((a) => params.append("area", a));
    authorIds.forEach((id) => params.append("authorId", id));
    const data = await getJSON<any>(`/api/articles?${params.toString()}`);
    setItems(data.content ?? []);
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const loadAuthors = async () => {
      try {
        const data = await getJSON<any>("/api/articles/authors");
        setAuthors(data);
      } catch {
        setAuthors([]);
      }
    };
    loadAuthors();
  }, []);

  const practiceAreaOptions = PRACTICE_AREAS.map((a) => ({ value: a.key, label: a.label }));
  const authorOptions = authors.map((a) => ({ value: a.id, label: a.name }));

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

        <Select
          isMulti
          options={practiceAreaOptions}
          placeholder="Hukuk Alanı Seçin"
          onChange={(selected) => {
            const values = (selected || []).map((s: any) => s.value);
            setAreas(values);
          }}
        />

        <Select
          isMulti
          options={authorOptions}
          placeholder="Yazar Seçin"
          onChange={(selected) => {
            const values = (selected || []).map((s: any) => s.value);
            setAuthorIds(values);
          }}
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
            {it.coverUrl ? (
              <img
                src={`${API_BASE}${it.coverUrl}`}
                alt={it.title}
                className="w-full md:w-48 md:h-32 object-cover rounded-lg mb-3 md:mb-0 flex-shrink-0"
                loading="lazy"
              />
            ) : (
              <div className="w-full md:w-40 md:h-28 bg-muted rounded-lg mb-3 md:mb-0 flex-shrink-0" />
            )}

            <div className="flex-1">
              <div className="text-xl font-semibold">{it.title}</div>
              <div className="text-sm text-muted-foreground mb-2">
                {it.authorName} • {new Date(it.createdAt).toLocaleDateString()}
              </div>
              <p className="text-slate-700 line-clamp-3">{it.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
