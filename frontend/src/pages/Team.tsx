// frontend/src/pages/Team.tsx

import ali from "@/assets/ali.jpg";
import sukur from "@/assets/sukurr.jpeg";
import cagatay from "@/assets/cagatay.png";
import bedo from "@/assets/bedo.png";
import yagmur from "@/assets/yagmuratalay.jpg";

type Lawyer = {
  id: string;
  name: string;
  role: string;
  thumb: string;
  photo: string;
  bio: string;
};

const lawyers: Lawyer[] = [
  {
    id: "ali-ihsan",
    name: "Av. Ali İhsan Yıldırım",
    role: "Kurucu Ortak • Ceza Hukuku & Aile Hukuku",
    thumb: ali,
    photo: ali,
    bio: "Av. Ali İhsan Yıldırım, kurucu ortak olarak özellikle ceza hukuku ve aile hukuku alanlarında müvekkillerine kapsamlı hukuki destek sunmaktadır; ceza yargılamalarında etkin savunma stratejileri geliştirmekte, aile hukukuna ilişkin boşanma, velayet, nafaka ve mal paylaşımı gibi uyuşmazlıklarda müvekkillerini titizlikle temsil etmekte ve her dosyada adil, hızlı ve etkili çözümler üreterek müvekkillerinin haklarını en güçlü şekilde korumayı amaçlamaktadır."
  },
  {
    id: "sukur-temel",
    name: "Av. Şükür Temel",
    role: "Kurucu Ortak • İş Hukuku & İcra ve İflas Hukuku",
    thumb: sukur,
    photo: sukur,
    bio: "Av. Şükür Temel, kurucu ortak olarak özellikle iş hukuku ve icra ve iflas hukuku alanlarında müvekkillerine etkin hukuki hizmet sunmaktadır; işçi-işveren uyuşmazlıklarında hak kayıplarını önleyecek stratejiler geliştirmekte, icra takipleri ile iflas ve konkordato süreçlerinde müvekkillerini titizlikle temsil etmekte ve her dosyada adil, hızlı ve sonuç odaklı çözümler üreterek müvekkillerinin menfaatlerini en güçlü şekilde korumayı amaçlamaktadır."
  },
  {
    id: "cagatay-bozoglu",
    name: "Av. Çağatay Kaan Bozoğlu",
    role: "Kurucu Ortak • Tazminat Hukuku & Sigorta Tahkim",
    thumb: cagatay,
    photo: cagatay,
    bio: "Av. Çağatay Kaan Bozoğlu, tazminat davaları, sigorta tahkim, iş kazaları ve trafik kazaları alanlarında müvekkillerine profesyonel hukuki hizmet sunmaktadır; sigorta şirketleriyle yaşanan uyuşmazlıklarda hızlı ve pratik çözümler geliştirmekte, iş kazaları ve trafik kazaları sonrasında ortaya çıkan maddi ve manevi tazminat taleplerinde müvekkillerini titizlikle temsil etmekte ve her dosyaya özel stratejilerle müvekkillerinin adalet arayışında güvenilir bir yol arkadaşı olmayı amaçlamaktadır."
  },
  {
    id: "bedirhan-yildirim",
    name: "Bedirhan Yıldırım",
    role: "Bilişim ve Siber Suçlar Danışmanı",
    thumb: bedo,
    photo: bedo,
    bio: "Bedirhan Yıldırım, Dijital delillerin teknik analizi, siber saldırı, veri ihlali vakalarının incelenmesi, log kayıtlarının değerlendirilmesi ve hukuki süreçlere teknik destek sağlamaktadır. Bilişim temelli uyuşmazlıklarda doğru, anlaşılır ve mahkemeye uygun teknik görüşler üretmektedir."
  },

];

export default function TeamPage() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* Üst kısım: küçük profil kartları */}
      <section className="container mx-auto px-6 md:px-8 pt-12 pb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 text-center mb-10">
          Ekibimiz
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
          {lawyers.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="group text-center rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition"
            >
              <img
                src={l.thumb}
                alt={l.name}
                className="w-24 h-24 mx-auto rounded-full object-cover shadow-md group-hover:scale-105 transition-transform"
              />
              <div className="mt-3">
                <p className="font-semibold text-primary">{l.name}</p>
                <p className="text-sm text-muted-foreground">{l.role}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Detaylı bilgiler: fotoğraflar SOLDa, metin SAĞda */}
      <section className="container mx-auto px-6 md:px-8 pb-20 space-y-16">
        {lawyers.map((l) => (
          <div key={l.id} id={l.id} className="scroll-mt-28">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Solda kare fotoğraf (tümünde aynı boyut) */}
              <div>
                <img
                  src={l.photo}
                  alt={l.name}
                  className="w-[28rem] h-[28rem] object-cover rounded-2xl border bg-white shadow-md"
                />
              </div>

              {/* Sağda detay */}
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold">{l.name}</h2>
                <p className="text-accent font-medium mt-1">{l.role}</p>
                <p className="mt-5 text-gray-700 leading-relaxed text-justify">{l.bio}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
