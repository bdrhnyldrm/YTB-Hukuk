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
      setResult({ ok: true, text: r?.message ?? "Mesajınız alındı." });
      setForm({ name: "", email: "", phone: "", message: "", consent: false });
    } catch (err: any) {
      setResult({ ok: false, text: err.message || "Hata oluştu" });
    } finally {
      setLoading(false);
    }
  };

  return (
    // Sayfa arkaplanı (diğer sayfalarla uyumlu olsun diye hafif gri)
    <section className="bg-white">
      {/* Konteyner: diğer sayfalardaki gibi max genişlik ve yatay padding */}
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        {/* Başlık */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">İletişim</h1>
          <p className="mt-2 text-slate-600">
            Sorularınız ve danışmanlık talepleriniz için formu doldurun. En kısa sürede dönüş yapalım.
          </p>
        </div>

        {/* İki kolon: solda iletişim kartı, sağda form */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Sol: Bilgi kartı */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">İletişim Bilgileri</h2>
            <ul className="space-y-3 text-slate-700">
              <li>📍 Beyoğlu Mahallesi, Galata Kulesi Sok. No:15/3, Beyoğlu/İstanbul</li>
              <li>📞 +90 (212) 555 12 34</li>
              <li>✉️ info@ytbhukuk.com</li>
            </ul>

            <div className="mt-6">
              <h3 className="mb-2 font-medium">Çalışma Saatleri</h3>
              <p className="text-slate-600">Pazartesi – Cuma: 09:00 – 18:00</p>
            </div>

            {/* İsteğe bağlı harita alanı (placeholder) */}
            <div className="mt-6 h-40 w-full rounded-xl bg-slate-100" />
          </div>

          {/* Sağ: Form kartı */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <form onSubmit={onSubmit} className="grid gap-4">
              <label className="flex flex-col">
                <span className="mb-1 font-medium">Ad Soyad*</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className="rounded-xl border p-3"
                  required
                  maxLength={100}
                />
              </label>

              <label className="flex flex-col">
                <span className="mb-1 font-medium">E-posta*</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  className="rounded-xl border p-3"
                  required
                />
              </label>

              <label className="flex flex-col">
                <span className="mb-1 font-medium">Telefon</span>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  className="rounded-xl border p-3"
                />
              </label>

              <label className="flex flex-col">
                <span className="mb-1 font-medium">Mesajınız*</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  className="min-h-[140px] rounded-xl border p-3"
                  required
                  maxLength={2000}
                />
              </label>

              <label className="flex items-start gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={onChange}
                  className="mt-1"
                />
                <span>
                  KVKK kapsamında{" "}
                  <a className="underline" href="/kvkk" target="_blank" rel="noreferrer">
                    aydınlatma metnini
                  </a>{" "}
                  okudum ve onaylıyorum.
                </span>
              </label>

              <button
                disabled={loading}
                className="mt-2 rounded-2xl border px-5 py-3 font-semibold shadow-sm transition
                           hover:shadow-md disabled:opacity-60"
              >
                {loading ? "Gönderiliyor..." : "Gönder"}
              </button>

              {result && (
                <p className={result.ok ? "text-green-600" : "text-red-600"}>{result.text}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
