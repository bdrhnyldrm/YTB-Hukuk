import { useState, useEffect, useRef, useMemo } from "react";
import { postForm, putForm } from "@/lib/api";

// ✅ Quill ve eklenti (v1 uyumlu)
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

// ✅ Yeni image resize paketi
import ImageResize from "quill-image-resize-module-react";
Quill.register("modules/imageResize", ImageResize);

export const PRACTICE_AREAS = [
  { key: "CEZA_HUKUKU", label: "Ceza Hukuku" },
  { key: "IS_HUKUKU", label: "İş Hukuku" },
  { key: "AILE_HUKUKU", label: "Aile Hukuku" },
  { key: "TICARET_HUKUKU", label: "Ticaret Hukuku" },
  { key: "ICRA_IFLAS", label: "İcra ve İflas" },
  { key: "IDARI_HUKUK", label: "İdari Hukuk" },
  { key: "TAZMINAT_HUKUKU", label: "Tazminat Hukuku" },
  { key: "KIRA_HUKUKU", label: "Kira Hukuku" },
  { key: "EMLAK_HUKUKU", label: "Kat Mülkiyeti & Emlak" },
];

export default function ArticleForm({
  editing,
  initial,
  onSaved,
  onCancel,
}: {
  editing?: boolean;
  initial?: any;
  onSaved: () => void;
  onCancel?: () => void;
}) {
  const emptyForm = {
    title: "",
    slug: "",
    summary: "",
    content: "",
    areas: [] as string[],
    published: true,
  };

  const [form, setForm] = useState<any>(initial ?? emptyForm);
  const [cover, setCover] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>("");

  const quillRef = useRef<any>(null);

  useEffect(() => {
    if (initial) {
      setForm(initial);
      setCoverPreview(initial.coverUrl || "");
    } else {
      setForm(emptyForm);
      setCover(null);
      setCoverPreview("");
    }
  }, [initial]);

  const toggleArea = (a: string) => {
    setForm((f: any) => ({
      ...f,
      areas: f.areas.includes(a)
        ? f.areas.filter((x: string) => x !== a)
        : [...f.areas, a],
    }));
  };

  // 🖼️ Toolbar'daki image butonuna özel handler:
  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const fd = new FormData();
      fd.append("file", file);

      try {
        // ✅ Doğru endpoint: backend'deki /api/admin/articles/uploads
        const res = await postForm<{ url: string }>("/api/admin/articles/uploads", fd);

        const quill = quillRef.current?.getEditor();
        if (!quill) return;

        const range = quill.getSelection(true);
        // 🔗 Görsel tam URL ile embed ediliyor
        quill.insertEmbed(range ? range.index : 0, "image", res.url, "user");
        if (range) quill.setSelection(range.index + 1);
      } catch (e) {
        alert("Görsel yüklenemedi.");
      }
    };
    input.click();
  };

  // Quill modülleri (toolbar + imageResize)
  const quillModules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["link", "image", "blockquote", "code-block"],
          ["clean"],
        ],
        handlers: {
          image: handleImageUpload,
        },
      },
      imageResize: {
        parchment: Quill.import("parchment"),
      },
    }),
    []
  );

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", form.title || "");
    if (form.slug) fd.append("slug", form.slug);
    if (form.summary) fd.append("summary", form.summary);
    fd.append("content", form.content || "");
    fd.append("published", String(!!form.published));
    (form.areas || []).forEach((a: string) => fd.append("areas", a));
    if (cover) fd.append("cover", cover);

    if (editing) await putForm(`/api/admin/articles/${form.id}`, fd);
    else await postForm(`/api/admin/articles`, fd);

    onSaved();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4" encType="multipart/form-data">
      <input
        className="border rounded-md w-full p-3"
        placeholder="Başlık"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        className="border rounded-md w-full p-3"
        placeholder="Slug (opsiyonel)"
        value={form.slug}
        onChange={(e) => setForm({ ...form, slug: e.target.value })}
      />
      <textarea
        className="border rounded-md w-full p-3"
        placeholder="Özet (SEO için önerilir)"
        value={form.summary || ""}
        onChange={(e) => setForm({ ...form, summary: e.target.value })}
      />

      {/* 🔽 İçerik: ReactQuill */}
      <div className="rounded-md border">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={form.content}
          onChange={(html) => setForm({ ...form, content: html })}
          modules={quillModules}
          placeholder="Makale içeriğini yazın…"
        />
      </div>

      {/* Kapak Fotoğrafı */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Kapak Fotoğrafı</label>
        {coverPreview && (
          <img
            src={coverPreview}
            alt="Kapak"
            className="w-full max-w-md rounded-lg border shadow-sm mb-2"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setCover(file);
            setCoverPreview(file ? URL.createObjectURL(file) : "");
          }}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full
                     file:border-0 file:font-semibold file:bg-accent file:text-white hover:file:bg-accent-hover"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {PRACTICE_AREAS.map((a) => (
          <label key={a.key} className="flex items-center gap-2 border rounded-md p-2">
            <input
              type="checkbox"
              checked={form.areas.includes(a.key)}
              onChange={() => toggleArea(a.key)}
            />
            <span>{a.label}</span>
          </label>
        ))}
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => setForm({ ...form, published: e.target.checked })}
        />
        <span>Yayımla</span>
      </label>

      <div className="flex gap-3">
        <button className="btn-hero" type="submit">
          {editing ? "Güncelle" : "Yayınla"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-outline-gold">
            İptal Et
          </button>
        )}
      </div>
    </form>
  );
}
