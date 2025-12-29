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
      const r = await postJSON<SuccessResponse>("/api/contact", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        consent: form.consent,
      });
      setResult({ ok: true, text: r?.message ?? "Mesajınız başarıyla gönderildi." });

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
          {/* Sol bilgi kartı */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm flex flex-col gap-6">
            <div>
              <h2 className="mb-4 text-xl font-semibold">İletişim Bilgileri</h2>
              <ul className="space-y-3 text-slate-700">
                <li>📍 Gülbahar Hatun Mahallesi, Nur Sk. Kat : 4 Daire No : 8, 61040 Ortahisar/Trabzon</li>
                <li>📞 0505 389 18 74</li>
                <li>✉️ ytbukuk@gmail.com</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 font-medium">Çalışma Saatleri</h3>
              <p className="text-slate-600">Pazartesi – Cuma: 09:00 – 18:00</p>
            </div>

            {/* Harita buraya eklendi */}
            <div className="rounded-2xl overflow-hidden border shadow-sm">
              <iframe
                title="YTB Hukuk - Konum"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.8794661466645!2d39.710910375513784!3d41.006011319565296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40643d1c41bdd017%3A0xdfac81fef77fc93c!2sTRABZON%20AVUKAT%20%7C%20YTB%20HUKUK%20VE%20DANI%C5%9EMANLIK%20%7C%20Avukat%20Ali%20%C4%B0hsan%20YILDIRIM%20%26%20Avukat%20%C5%9E%C3%BCk%C3%BCr%20TEMEL%20%26%20Av.%20%C3%87a%C4%9Fatay%20Kaan%20BOZO%C4%9ELU!5e0!3m2!1str!2str!4v1757192873668!5m2!1str!2str" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
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
                <span className="mb-1 font-medium">Telefon*</span>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  className="rounded-xl border p-3"
                  required
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
