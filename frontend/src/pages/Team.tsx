import { Link } from "react-router-dom";

import avukat1 from "@/assets/avukat1.jpg";
import avukat2 from "@/assets/avukat2.png";
import yagmur from "@/assets/yagmuratalay.jpg";
import bedo from "@/assets/bedo.png";
import salih from "@/assets/salih.jpg";
import cagatay from "@/assets/cagatay.png";

const lawyers = [
  {
    id: "ali-ihsan",
    name: "Av. Ali İhsan Yıldırım",
    role: "Kurucu Ortak • Ceza Hukuku & Aile Hukuku",
    thumb: avukat1,   // üst kısımda küçük foto
    photo: avukat1,   // detayda büyük foto
    bio: "Ceza hukuku alanında uzman, ağır ceza ve soruşturma süreçlerinde geniş tecrübe..."
  },
  {
    id: "sukru-temel",
    name: "Av. Şükrü Temel",
    role: "Kurucu Ortak • İş Hukuku & İcra ve İflas Hukuku",
    thumb: avukat2,
    photo: avukat2,
    bio: "Ticaret hukuku, şirket sözleşmeleri ve ticari uyuşmazlıklar odağında çalışır..."
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
      role: "Siber Güvenlik Uzmanı",
      thumb: bedo,
      photo: bedo,
      bio: "İcra takipleri, konkordato ve iflas süreçlerinde etkin stratejiler geliştirir..."
  },
  {
        id: "cagatay-bozoglu",
        name: "Av. Çağatay Kaan Bozoğlu",
        role: "İcra ve İflas Hukuku",
        thumb: yagmur,
        photo: yagmur,
        bio: "İcra takipleri, konkordato ve iflas süreçlerinde etkin stratejiler geliştirir..."
  },
  // diğer avukatlar...
];

export default function TeamPage() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* Üst kısım: küçük profil kartları */}
      <section className="container mx-auto px-6 md:px-8 pt-12 pb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 text-center mb-10">
          Ekibimiz
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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

      {/* Detaylı bilgiler */}
      <section className="container mx-auto px-6 md:px-8 pb-20 space-y-16">
        {lawyers.map((l, idx) => (
          <div key={l.id} id={l.id} className="scroll-mt-28">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Solda büyük foto */}
              <div className={`${idx % 2 === 1 ? "md:order-2" : ""}`}>
                <img
                  src={l.photo}
                  alt={l.name}
                  className="w-[28rem] h-[28rem] object-cover rounded-2xl border bg-white shadow-md"
                />
              </div>
              {/* Sağda detay */}
              <div className={`${idx % 2 === 1 ? "md:order-1" : ""}`}>
                <h2 className="text-2xl md:text-3xl font-semibold">{l.name}</h2>
                <p className="text-accent font-medium mt-1">{l.role}</p>
                <p className="mt-5 text-gray-700 leading-relaxed">{l.bio}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
