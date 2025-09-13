import { useState, useEffect } from "react";
import { postJSON, putJSON } from "@/lib/api";

export const PRACTICE_AREAS = [
  { key:"CEZA_HUKUKU", label:"Ceza Hukuku" },
  { key:"IS_HUKUKU", label:"İş Hukuku" },
  { key:"AILE_HUKUKU", label:"Aile Hukuku" },
  { key:"TICARET_HUKUKU", label:"Ticaret Hukuku" },
  { key:"ICRA_IFLAS", label:"İcra ve İflas" },
  { key:"IDARI_HUKUK", label:"İdari Hukuk" },
  { key:"TAZMINAT_HUKUKU", label:"Tazminat Hukuku" },
  { key:"KIRA_HUKUKU", label:"Kira Hukuku" },
  { key:"EMLAK_HUKUKU", label:"Kat Mülkiyeti & Emlak" },
];

export default function ArticleForm({editing, initial, onSaved}:{editing?:boolean, initial?:any, onSaved:()=>void}) {
  const emptyForm = { title:"", slug:"", summary:"", content:"", areas:[], published:true };

  const [form, setForm] = useState<any>(initial ?? emptyForm);

  // 🔑 initial değişince formu güncelle
  useEffect(() => {
    if (initial) setForm(initial);
    else setForm(emptyForm);
  }, [initial]);

  const toggleArea = (a:string) => {
    setForm((f:any)=>({
      ...f, areas: f.areas.includes(a) ? f.areas.filter((x:string)=>x!==a) : [...f.areas, a]
    }));
  };

  const onSubmit = async (e:any) => {
    e.preventDefault();
    if (editing) await putJSON(`/api/admin/articles/${form.id}`, form);
    else await postJSON(`/api/admin/articles`, form);
    onSaved();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        className="border rounded-md w-full p-3"
        placeholder="Başlık"
        value={form.title}
        onChange={e=>setForm({...form, title:e.target.value})}
      />
      <input
        className="border rounded-md w-full p-3"
        placeholder="Slug (opsiyonel)"
        value={form.slug}
        onChange={e=>setForm({...form, slug:e.target.value})}
      />
      <textarea
        className="border rounded-md w-full p-3"
        placeholder="Özet (SEO için önerilir)"
        value={form.summary||""}
        onChange={e=>setForm({...form, summary:e.target.value})}
      />
      <textarea
        className="border rounded-md w-full p-3 min-h-[200px]"
        placeholder="İçerik"
        value={form.content}
        onChange={e=>setForm({...form, content:e.target.value})}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {PRACTICE_AREAS.map(a=>(
          <label key={a.key} className="flex items-center gap-2 border rounded-md p-2">
            <input
              type="checkbox"
              checked={form.areas.includes(a.key)}
              onChange={()=>toggleArea(a.key)}
            />
            <span>{a.label}</span>
          </label>
        ))}
      </div>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.published}
          onChange={e=>setForm({...form, published:e.target.checked})}
        />
        <span>Yayımla</span>
      </label>
      <button className="btn-hero">{editing ? "Güncelle" : "Yayınla"}</button>
    </form>
  );
}
