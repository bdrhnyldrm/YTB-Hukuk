import React from "react";
import ceza from "@/assets/ceza.jpg"; // geçici görsel, her alan için farklı ekleyebilirsin
import is from "@/assets/is.png";
import aile from "@/assets/aile.webp";
import emlak from "@/assets/emlak.jpg";
import kira from "@/assets/kira.jpg";
import tazminat from "@/assets/tazminat.jpg";
import idari from "@/assets/idari.jpg";
import icra from "@/assets/icra.webp";
import ticaret from "@/assets/ticaret.jpg";
// buraya diğer görselleri ekle

type Area = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const areas: Area[] = [
  {
    id: "ceza-hukuku",
    title: "Ceza Hukuku",
    description:
      "Savunma stratejileri, soruşturma süreçleri, dava takibi ve infaz hukuku alanlarında uzman kadromuz ile müvekkillerimize güçlü bir savunma sağlamaktayız. Ceza yargılamalarında hakların korunması için titizlikle çalışıyoruz.",
    image: ceza,
  },
  {
    id: "is-hukuku",
    title: "İş Hukuku",
    description:
      "İşçi ve işveren hakları, iş sözleşmeleri, iş kazaları ve tazminat davaları alanlarında etkin çözümler üretiyoruz. İşçi-işveren ilişkilerinde hukuki uyuşmazlıkların çözümünde profesyonel destek sunuyoruz.",
    image: is,
  },
  {
    id: "aile-hukuku",
    title: "Aile Hukuku",
    description:
      "Boşanma, velayet, nafaka, mal paylaşımı ve evlat edinme davalarında müvekkillerimizin haklarını en güçlü şekilde savunuyoruz. Aile hukuku süreçlerinde hızlı ve adil çözümler sunmayı amaçlıyoruz.",
    image: aile,
  },
  {
   id: "ticaret-hukuku",
   title: "Ticaret Hukuku",
   description:
      "Şirket kuruluşu, sözleşmeler, ortaklık anlaşmazlıkları ve ticari davalar alanlarında uzman kadromuzla müvekkillerimize kapsamlı hukuki destek sunuyoruz. Ticari ilişkilerde hukuki riskleri minimize etmeyi hedefliyoruz.",
   image: ticaret, // geçici görsel
  },
  {
     id: "icra-iflas",
     title: "İcra ve İflas",
     description:
        "Şirket kuruluşu, sözleşmeler, ortaklık anlaşmazlıkları ve ticari davalar alanlarında uzman kadromuzla müvekkillerimize kapsamlı hukuki destek sunuyoruz. Ticari ilişkilerde hukuki riskleri minimize etmeyi hedefliyoruz.",
     image: icra, // geçici görsel
  },
  {
       id: "idari-hukuk",
       title: "İdari Hukuk",
       description:
          "Şirket kuruluşu, sözleşmeler, ortaklık anlaşmazlıkları ve ticari davalar alanlarında uzman kadromuzla müvekkillerimize kapsamlı hukuki destek sunuyoruz. Ticari ilişkilerde hukuki riskleri minimize etmeyi hedefliyoruz.",
       image: idari, // geçici görsel
    },
{
       id: "tazminat-hukuku",
       title: "Tazminat Hukuku",
       description:
          "Şirket kuruluşu, sözleşmeler, ortaklık anlaşmazlıkları ve ticari davalar alanlarında uzman kadromuzla müvekkillerimize kapsamlı hukuki destek sunuyoruz. Ticari ilişkilerde hukuki riskleri minimize etmeyi hedefliyoruz.",
       image: tazminat, // geçici görsel
    },
{
       id: "kira-hukuku",
       title: "Kira Hukuku",
       description:
          "Şirket kuruluşu, sözleşmeler, ortaklık anlaşmazlıkları ve ticari davalar alanlarında uzman kadromuzla müvekkillerimize kapsamlı hukuki destek sunuyoruz. Ticari ilişkilerde hukuki riskleri minimize etmeyi hedefliyoruz.",
       image: kira, // geçici görsel
    },
{
       id: "emlak-hukuku",
       title: "Kat Mülkiyeti ve Emlak Hukuku",
       description:
          "Şirket kuruluşu, sözleşmeler, ortaklık anlaşmazlıkları ve ticari davalar alanlarında uzman kadromuzla müvekkillerimize kapsamlı hukuki destek sunuyoruz. Ticari ilişkilerde hukuki riskleri minimize etmeyi hedefliyoruz.",
       image: emlak, // geçici görsel
    },
  // buraya diğer alanları da aynı formatta ekle (ticaret, icra, idari, tazminat, kira, emlak...)
];

export default function PracticeAreas() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      <section className="container mx-auto px-6 md:px-8 py-14 space-y-16">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-10">
          Dava Alanlarımız
        </h1>
        {areas.map((area) => (
          <div
            key={area.id}
            id={area.id}
            className="grid md:grid-cols-2 gap-8 items-center rounded-2xl border bg-white shadow-md p-6 scroll-mt-28"
          >
            {/* Solda görsel */}
            <div>
              <img
                src={area.image}
                alt={area.title}
                className="w-full h-72 object-cover rounded-xl shadow-sm"
              />
            </div>

            {/* Sağda metin */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-primary">
                {area.title}
              </h2>
              <p className="text-gray-700 leading-relaxed text-justify">
                {area.description}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
