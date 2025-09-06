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

    // KVKK onayı olmadan gönderilmesin
    if (!form.consent) {
      setResult({ ok: false, text: "Lütfen KVKK aydınlatma metnini onaylayın." });
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const r = await postJSON<SuccessResponse>("/api/contact", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        consent: form.consent, // ✅ eklendi
      });
      setResult({ ok: true, text: r?.message ?? "Mesajınız başarıyla gönderildi." });

      // Formu temizle
      setForm({ name: "", email: "", phone: "", message: "", consent: false });
    } catch (err: any) {
      setResult({ ok: false, text: err.message || "Mesaj gönderilemedi." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">İletişim</h1>
          <p className="mt-2 text-slate-600">
            Sorularınız ve danışmanlık talepleriniz için formu doldurun. En kısa sürede dönüş yapalım.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Sol bilgi kartı aynı kalıyor */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">İletişim Bilgileri</h2>
            <ul className="space-y-3 text-slate-700">
              <li>📍 Gülbahar Hatun Mahallesi, Nur Sk. Kat : 4 Daire No : 8, 61040 Ortahisar/Trabzon</li>
              <li>📞 0505 389 18 74</li>
              <li>✉️ ytbukuk@gmail.com</li>
            </ul>

            <div className="mt-6">
              <h3 className="mb-2 font-medium">Çalışma Saatleri</h3>
              <p className="text-slate-600">Pazartesi – Cuma: 09:00 – 18:00</p>
            </div>
          </div>

          {/* Sağ form alanı */}
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
