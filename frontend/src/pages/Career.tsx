import { GraduationCap, Briefcase, UploadCloud } from "lucide-react";
import { useState } from "react";

type FileOrNull = File | null;

export default function CareerPage() {
  // (İstersen backend entegrasyonu için state’leri kullanırız)
  const [internCv, setInternCv] = useState<FileOrNull>(null);
  const [jobCv, setJobCv] = useState<FileOrNull>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, kind: "intern" | "job") => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    // TODO: Backend endpointine POST et (ör: /api/career/apply)
    // fetch("/api/career/apply", { method: "POST", body: form })

    console.log(`[${kind}] başvuru gönderildi`, Object.fromEntries(form.entries()));
    alert("Başvurunuz alındı. Teşekkür ederiz!");
    e.currentTarget.reset();
    if (kind === "intern") setInternCv(null);
    else setJobCv(null);
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

            <form onSubmit={(e) => handleSubmit(e, "intern")} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="fullName" label="Ad Soyad" required />
                <Input name="email" type="email" label="E-posta" required />
                <Input name="phone" label="Telefon" />
                <Input name="university" label="Üniversite / Bölüm" />
              </div>

              <Input name="linkedin" label="LinkedIn (opsiyonel)" placeholder="https://linkedin.com/in/..." />

              <FileInput
                name="cv"
                label="Özgeçmiş (PDF)"
                onChange={setInternCv}
                file={internCv}
                required
              />

              <Textarea name="message" label="Kısa Not (opsiyonel)" placeholder="Kendinizi kısaca tanıtın..." />

              <Kvkk name="kvkkIntern" />

              <SubmitButton>Staj Başvurusu Gönder</SubmitButton>
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

            <form onSubmit={(e) => handleSubmit(e, "job")} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="fullName" label="Ad Soyad" required />
                <Input name="email" type="email" label="E-posta" required />
                <Input name="phone" label="Telefon" />
                <Input name="position" label="Başvurulan Pozisyon" placeholder="Örn. Avukat / Ofis Asistanı" />
              </div>

              <Input name="linkedin" label="LinkedIn (opsiyonel)" placeholder="https://linkedin.com/in/..." />

              <FileInput
                name="cv"
                label="Özgeçmiş (PDF)"
                onChange={setJobCv}
                file={jobCv}
                required
              />

              <Textarea name="message" label="Ön Yazı (opsiyonel)" placeholder="Motivasyon ve deneyimleriniz..." />

              <Kvkk name="kvkkJob" />

              <SubmitButton>İş Başvurusu Gönder</SubmitButton>
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
          className="hidden"
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

function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="inline-flex items-center justify-center rounded-full px-7 py-3 font-semibold text-white bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-md hover:shadow-lg transition"
    >
      {children} <span className="ml-2">→</span>
    </button>
  );
}
