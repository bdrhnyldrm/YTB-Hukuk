import { useState } from "react";
import { postJSON } from "../../lib/api";

type SuccessResponse = { message: string };

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; text: string } | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as any;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const r = await postJSON<SuccessResponse>("/api/contact", form);
      setResult({ ok: true, text: r.message });
      setForm({ name: "", email: "", phone: "", message: "", consent: false });
    } catch (err: any) {
      setResult({ ok: false, text: err.message || "Hata oluştu" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-4 p-4">
      <h1 className="text-2xl font-semibold">İletişim</h1>

      <div className="grid gap-3">
        <label className="flex flex-col">
          <span className="mb-1">Ad Soyad*</span>
          <input
            name="name" value={form.name} onChange={onChange}
            className="border rounded-xl p-3" required maxLength={100}
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1">E-posta*</span>
          <input
            name="email" type="email" value={form.email} onChange={onChange}
            className="border rounded-xl p-3" required
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1">Telefon</span>
          <input
            name="phone" value={form.phone} onChange={onChange}
            className="border rounded-xl p-3"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1">Mesajınız*</span>
          <textarea
            name="message" value={form.message} onChange={onChange}
            className="border rounded-xl p-3 min-h-[140px]" required maxLength={2000}
          />
        </label>

        <label className="flex items-start gap-2">
          <input
            type="checkbox" name="consent" checked={form.consent} onChange={onChange}
            className="mt-1"
          />
          <span>
            KVKK kapsamında <a className="underline" href="/kvkk" target="_blank">aydınlatma metnini</a> okudum ve onaylıyorum.
          </span>
        </label>

        <button
          disabled={loading}
          className="rounded-2xl px-4 py-3 border shadow-sm disabled:opacity-60"
        >
          {loading ? "Gönderiliyor..." : "Gönder"}
        </button>

        {result && (
          <p className={result.ok ? "text-green-600" : "text-red-600"}>
            {result.text}
          </p>
        )}
      </div>
    </form>
  );
}
