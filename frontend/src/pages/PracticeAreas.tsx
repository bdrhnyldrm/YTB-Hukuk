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
    "Ceza davaları, soruşturma ve kovuşturma süreçleri ile tutuklama ve itiraz konularında etkin çözümler sunuyoruz. Ceza yargılamalarında hakların korunması ve adil yargılanma ilkesi çerçevesinde profesyonel destek sağlıyoruz.",
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
        "İcra takibi, iflas ve konkordato süreçlerinde müvekkillerimize etkin hukuki destek sağlıyoruz. Alacak tahsilatı ve borç yapılandırma konularında profesyonel çözümler sunuyoruz.",
     image: icra, // geçici görsel
  },
  {
       id: "idari-hukuk",
       title: "İdari Hukuk",
       description:
          "İptal davaları, idari işlemler ve kamu hukuku alanlarında müvekkillerimize kapsamlı hukuki destek sunuyoruz. İdari yargılamalarda hakların korunması ve adil çözümler üretmeyi amaçlıyoruz.",
       image: idari, // geçici görsel
    },
{
       id: "tazminat-hukuku",
       title: "Tazminat Hukuku",
       description:
          "Trafik kazaları, iş kazaları ve sigorta tahkim konularında müvekkillerimizin maddi ve manevi tazminat taleplerini en güçlü şekilde savunuyoruz. Tazminat davalarında adil ve hızlı çözümler sunmayı hedefliyoruz.",
       image: tazminat, // geçici görsel
    },
{
       id: "kira-hukuku",
       title: "Kira Hukuku",
       description:
          "Kira sözleşmeleri, tahliye davaları ve kira uyuşmazlıkları alanlarında müvekkillerimize etkin hukuki destek sağlıyoruz. Kira ilişkilerinde hakların korunması ve adil çözümler üretmeyi amaçlıyoruz.",
       image: kira, // geçici görsel
    },
{
       id: "emlak-hukuku",
       title: "Kat Mülkiyeti ve Emlak Hukuku",
       description:
          "Tapu işlemleri, gayrimenkul alım-satım, ipotek ve emlak davalarında müvekkillerimize kapsamlı hukuki destek sunuyoruz. Emlak hukuku süreçlerinde hakların korunması ve adil çözümler üretmeyi hedefliyoruz.",
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
