import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJSON } from "@/lib/api";

export default function ArticleDetail() {
  const { slug } = useParams();
  const [it, setIt] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getJSON<any>(`/api/articles/${slug}`);
      setIt(data);
    })();
  }, [slug]);

  if (!it) return <div className="container-custom py-12">Yükleniyor...</div>;

  return (
    <div className="container-custom py-12">
      <h1>{it.title}</h1>
      <div className="text-sm text-muted-foreground mb-4">
        {it.authorName} • {new Date(it.createdAt).toLocaleDateString()}
      </div>
      {it.summary && (
        <p className="text-lg text-slate-700 mb-6">{it.summary}</p>
      )}
      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: it.content }}
      />
    </div>
  );
}
