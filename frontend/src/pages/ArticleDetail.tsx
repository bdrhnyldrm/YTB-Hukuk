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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <section className="max-w-5xl mx-auto px-6 md:px-10 lg:px-16 py-16">
        {/* Başlık */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          {article.title}
        </h1>

        {/* ✅ Hukuk Alanı Etiketi */}
        {article.practiceArea && (
          <span className="inline-block bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full mb-3">
            {article.practiceArea}
          </span>
        )}

        {/* Yazar ve Tarih */}
        <p className="text-sm text-gray-600 mb-8">
          {article.authorName} •{" "}
          {new Date(article.createdAt).toLocaleDateString("tr-TR")}
        </p>

        {/* Özet */}
        {article.summary && (
          <p className="text-xl text-gray-700 font-medium mb-8 leading-relaxed">
            {article.summary}
          </p>
        )}

        {/* İçerik */}
        <article
          className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </section>
    </div>
  );
}
