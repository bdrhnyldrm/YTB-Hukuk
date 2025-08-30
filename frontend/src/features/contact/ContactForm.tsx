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
              <li>📍 Gülbahar Hatun Mahallesi, Nur Sk. Kat : 4 Daire No : 8, 61040 Ortahisar/Trabzon</li>
              <li>📞 0505 389 18 74</li>
              <li>✉️ info@ytbhukuk.com</li>
            </ul>

            <div className="mt-6">
              <h3 className="mb-2 font-medium">Çalışma Saatleri</h3>
              <p className="text-slate-600">Pazartesi – Cuma: 09:00 – 18:00</p>
            </div>

            {/* Harita */}
            <div className="mt-6">
              <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-primary/10 shadow-inner">
                <iframe
                  title="YTB Hukuk Ofis Konumu"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.8794661466504!2d39.71091037551377!3d41.00601131956528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40643d1c41bdd017%3A0xdfac81fef77fc93c!2zQXZ1a2F0IEFsaSDEsGhzYW4gWcSxbGTEsXLEsW0!5e0!3m2!1str!2str!4v1756550845394!5m2!1str!2str" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              {/* İsteğe bağlı: Haritayı Google'da aç linki */}
              <a
                href="https://www.google.com/maps/place/Avukat+Ali+%C4%B0hsan+Y%C4%B1ld%C4%B1r%C4%B1m/@41.0060113,39.7109104,17z/data=!3m1!4b1!4m6!3m5!1s0x40643d1c41bdd017:0xdfac81fef77fc93c!8m2!3d41.0060073!4d39.7134853!16s%2Fg%2F11kb8b59x5?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-3 text-sm underline text-primary hover:opacity-80"
              >
                Haritada aç
              </a>
            </div>

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
