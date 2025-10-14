import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJSON } from "@/lib/api";

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const data = await getJSON(`/api/articles/${slug}`);
      setArticle(data);
    };
    load();
  }, [slug]);

  if (!article) return <div className="container-custom py-12">Yükleniyor...</div>;

  return (
    <div className="container-custom py-12 max-w-3xl mx-auto">
      {/* Başlık */}
      <h1 className="text-4xl font-bold text-gray-900 mb-3">{article.title}</h1>

      {/* Yazar ve Tarih */}
      <p className="text-sm text-muted-foreground mb-6">
        {article.authorName} • {new Date(article.createdAt).toLocaleDateString()}
      </p>

      {/* Özet */}
      {article.summary && (
        <p className="text-xl text-gray-700 font-medium mb-6">{article.summary}</p>
      )}

      {/* İçerik */}
      <div
        className="prose max-w-none text-gray-800"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />


    </div>
  );
}
