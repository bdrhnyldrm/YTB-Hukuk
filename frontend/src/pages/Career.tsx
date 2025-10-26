import { GraduationCap, Briefcase, UploadCloud } from "lucide-react";
import { useState } from "react";
import { postForm } from "@/lib/api";

type FileOrNull = File | null;

export default function CareerPage() {
  const [internCv, setInternCv] = useState<FileOrNull>(null);
  const [jobCv, setJobCv] = useState<FileOrNull>(null);

  // inline mesaj/loader state'leri
  const [internLoading, setInternLoading] = useState(false);
  const [jobLoading, setJobLoading] = useState(false);
  const [internResult, setInternResult] = useState<{ ok: boolean; text: string } | null>(null);
  const [jobResult, setJobResult] = useState<{ ok: boolean; text: string } | null>(null);

  // ---------- STAJ BAŞVURUSU ----------
  const handleInternSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;

    const kvkk = (formEl.elements.namedItem("kvkkIntern") as HTMLInputElement | null)?.checked;
    if (!kvkk) {
      setInternResult({ ok: false, text: "Lütfen KVKK onay kutusunu işaretleyin." });
      return;
    }

    const fd = new FormData(formEl);
    setInternLoading(true);
    setInternResult(null);
    try {
      const r = await postForm<{ message: string }>("/api/career/internship", fd);
      setInternResult({ ok: true, text: r?.message ?? "Başvurunuz iletildi." });
      formEl.reset();
      setInternCv(null);
    } catch (err: any) {
      setInternResult({ ok: false, text: err?.message || "Başvuru gönderilemedi." });
    } finally {
      setInternLoading(false);
    }
  };

  // ---------- İŞ BAŞVURUSU ----------
  const handleJobSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;

    const kvkk = (formEl.elements.namedItem("kvkkJob") as HTMLInputElement | null)?.checked;
    if (!kvkk) {
      setJobResult({ ok: false, text: "Lütfen KVKK onay kutusunu işaretleyin." });
      return;
    }

    const fd = new FormData(formEl);
    setJobLoading(true);
    setJobResult(null);
    try {
      const r = await postForm<{ message: string }>("/api/career/job", fd);
      setJobResult({ ok: true, text: r?.message ?? "Başvurunuz iletildi." });
      formEl.reset();
      setJobCv(null);
    } catch (err: any) {
      setJobResult({ ok: false, text: err?.message || "Başvuru gönderilemedi." });
    } finally {
      setJobLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <section className="container mx-auto px-6 md:px-8 pt-14 md:pt-16 pb-20">
        {/* Başlık */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            Kariyer
          </h1>
          <p className="mt-3 text-gray-500">
            Ekibimize katılmak ister misiniz? Aşağıdan staj ve iş başvurularınızı iletebilirsiniz.
          </p>
        </div>

        {/* Kartlar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Staj Başvurusu */}
          <div className="bg-white rounded-2xl shadow-md ring-1 ring-gray-100 p-6 md:p-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-xl bg-yellow-50">
                <GraduationCap className="w-6 h-6 text-yellow-600" />
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Staj Başvurusu</h2>
            </div>

            <p className="text-gray-600 mb-6">
              Hukuk fakültesi öğrencileri ve yeni mezunlar için dönemsel staj imkânı sunuyoruz.
            </p>

            <form onSubmit={handleInternSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="name" label="Ad Soyad" required />
                <Input name="email" type="email" label="E-posta" required />
                <Input name="phone" label="Telefon" required/>
                <Input name="university" label="Üniversite / Bölüm" required/>
              </div>

              <Input name="linkedin" label="LinkedIn (opsiyonel)" placeholder="https://linkedin.com/in/..." />

              <FileInput
                name="cv"
                label="Özgeçmiş (PDF)"
                onChange={setInternCv}
                file={internCv}
                required
              />

              <Textarea name="note" label="Kısa Not (opsiyonel)" placeholder="Kendinizi kısaca tanıtın..." />

              <Kvkk name="kvkkIntern" />

              <div className="space-y-2">
                <SubmitButton disabled={internLoading}>
                  {internLoading ? "Gönderiliyor..." : "Staj Başvurusu Gönder"}
                </SubmitButton>

                {internResult && (
                  <p className={internResult.ok ? "text-green-600" : "text-red-600"}>
                    {internResult.text}
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* İş Başvurusu */}
          <div className="bg-white rounded-2xl shadow-md ring-1 ring-gray-100 p-6 md:p-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-xl bg-yellow-50">
                <Briefcase className="w-6 h-6 text-yellow-600" />
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900">İş Başvurusu</h2>
            </div>

            <p className="text-gray-600 mb-6">
              Avukat, avukat yardımcısı ve idari pozisyonlar için başvurularınızı bekliyoruz.
            </p>

            <form onSubmit={handleJobSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="name" label="Ad Soyad" required />
                <Input name="email" type="email" label="E-posta" required />
                <Input name="phone" label="Telefon" required />
                <Input name="position" label="Başvurulan Pozisyon" placeholder="Örn. Avukat / Ofis Asistanı" required />
              </div>

              <Input name="linkedin" label="LinkedIn (opsiyonel)" placeholder="https://linkedin.com/in/..." />

              <FileInput
                name="cv"
                label="Özgeçmiş (PDF)"
                onChange={setJobCv}
                file={jobCv}
                required
              />

              <Textarea name="coverLetter" label="Ön Yazı (opsiyonel)" placeholder="Motivasyon ve deneyimleriniz..." />

              <Kvkk name="kvkkJob" />

              <div className="space-y-2">
                <SubmitButton disabled={jobLoading}>
                  {jobLoading ? "Gönderiliyor..." : "İş Başvurusu Gönder"}
                </SubmitButton>

                {jobResult && (
                  <p className={jobResult.ok ? "text-green-600" : "text-red-600"}>
                    {jobResult.text}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

/* -------------------- Küçük yardımcı bileşenler -------------------- */

function Input({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-300 transition"
      />
    </label>
  );
}

function Textarea({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>
      <textarea
        name={name}
        placeholder={placeholder}
        rows={4}
        className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-300 transition"
      />
    </label>
  );
}

function FileInput({
  label,
  name,
  file,
  onChange,
  required,
}: {
  label: string;
  name: string;
  file: FileOrNull;
  onChange: (f: FileOrNull) => void;
  required?: boolean;
}) {
  return (
    <div>
      <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>
      <label className="flex items-center gap-3 w-full rounded-xl border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition px-4 py-3 cursor-pointer">
        <UploadCloud className="w-5 h-5 text-gray-500" />
        <span className="text-sm text-gray-700">
          {file ? file.name : "PDF yükleyin veya sürükleyin"}
        </span>
        <input
          name={name}
          type="file"
          accept="application/pdf"
          required={required}
          style={{ display: "none" }} // ✅ focusable ama görünmez olur
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
      </label>
    </div>
  );
}

function Kvkk({ name }: { name: string }) {
  return (
    <label className="flex items-start gap-3 text-sm text-gray-600">
      <input type="checkbox" name={name} required className="mt-1.5 accent-yellow-500" />
      <span>
        Kişisel verilerimin başvuru sürecinin değerlendirilmesi amacıyla işlenmesini
        kabul ediyorum.
      </span>
    </label>
  );
}

function SubmitButton({
  children,
  disabled,
}: {
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="inline-flex items-center justify-center rounded-full px-7 py-3 font-semibold text-white bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-md hover:shadow-lg transition disabled:opacity-60"
    >
      {children} <span className="ml-2">→</span>
    </button>
  );
}
