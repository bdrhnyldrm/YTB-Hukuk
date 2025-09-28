import React from "react";
import ceza from "@/assets/ceza.jpg";
import is from "@/assets/is.png";
import aile from "@/assets/aile.webp";
import emlak from "@/assets/emlak.jpg";
import kira from "@/assets/kira.jpg";
import tazminat from "@/assets/tazminat.jpg";
import idari from "@/assets/idari.jpg";
import icra from "@/assets/icra.webp";
import ticaret from "@/assets/ticaret.jpg";

type Area = {
  id: string;
  title: string;
  description: string[];
  image: string;
};

const areas: Area[] = [
  {
    id: "ceza-hukuku",
    title: "Ceza Hukuku",
    description: [
      "Ağır ceza mahkemesinin görevli olduğu ceza davaları,",
      "Asliye ceza mahkemesinin görevli olduğu ceza davaları,",
      "Çocuk mahkemesinin görevli olduğu ceza davaları,",
      "Basit yargılama usulüne tabi ceza davaları,",
      "Yakalama, el koyma, arama ve gözaltı işlemleri,",
      "Tutuklama ve adli kontrol tedbirleri,",
      "Ceza infazı ve denetimli serbestlik işlemleri,",
    ],
    image: ceza,
  },
  {
    id: "is-hukuku",
    title: "İş Hukuku",
    description: [
      "Haksız fesih ve işe iade davaları,",
      "Kıdem ve ihbar tazminatı talepli davalar,",
      "Fazla mesai, yıllık izin ve maaş alacakları,",
      "Hizmet tespiti ve sigortasız çalışma davaları,",
      "İş kazası ve meslek hastalığına ilişkin tazminat davaları,",
      "Toplu iş sözleşmesi ve sendikal faaliyetlerden doğan uyuşmazlıklar,",
      "Mobbing (psikolojik taciz) ve ayrımcılık iddiaları,",
      "Alt işveren – asıl işveren ilişkilerinden kaynaklanan davalar,",
    ],
    image: is,
  },
  {
    id: "aile-hukuku",
    title: "Aile Hukuku",
    description: [
      "Boşanma ve mal paylaşımı davaları,",
      "Vesayet ve kayyımlık işlemleri,",
      "Nafaka, velayet ve çocukla kişisel ilişki davaları,",
      "Aile konutu şerhi ve eşin rızası işlemleri,",
      "Evlat edinme ve soybağına ilişkin davalar,",
      "Aile içi şiddet ve koruma tedbirleri,",
      "Nișan bozulması ve nişanlılık sürecine ilişkin uyuşmazlıklar,",
      "Evlilik birliğinin iptali ve geçersizliğine dair davalar,",
    ],
    image: aile,
  },
  {
    id: "ticaret-hukuku",
    title: "Ticaret Hukuku",
    description: [
      "Ticari işletme ve tacir sıfatına ilişkin davalar,",
      "Şirketler hukuku kapsamında açılan davalar,",
      "Kooperatiflerle ilgili uyuşmazlıklar,",
      "Kıymetli evrak (çek, bono, poliçe) davaları,",
      "Ticari defterlerin ibrazı ve incelenmesi işlemleri,",
      "Haksız rekabet davaları,",
      "İflas ve konkordato işlemleri,",
      "Deniz ticareti ve taşıma hukukuna dair davalar,",
    ],
    image: ticaret,
  },
  {
    id: "icra-iflas",
    title: "İcra ve İflas",
    description: [
      "İlamlı ve ilamsız icra takipleri,",
      "İcra emrine itiraz ve şikayet işlemleri,",
      "Haciz, satış ve paraya çevirme işlemleri,",
      "Tahliye talepli icra takipleri,",
      "İflasın açılması ve tasfiye işlemleri,",
      "Konkordato ilanı ve süreciyle ilgili davalar,",
      "İflasın ertelenmesi ve mühlet talepleri,",
      "İcra ceza davaları ve takip suçları,",
    ],
    image: icra,
  },
  {
    id: "idari-hukuk",
    title: "İdari Hukuk",
    description: [
      "İdari işlemlerin iptali davaları,",
      "Tam yargı davaları (tazminat talepli),",
      "İdari sözleşmelerden doğan uyuşmazlıklar,",
      "Disiplin cezalarına karşı açılan davalar,",
      "Kamu personeli işlemlerine ilişkin davalar,",
      "Belediye ve yerel idare işlemlerine karşı davalar,",
      "Kamulaştırma ve kamulaştırmasız el atma davaları,",
      "Vergi, harç ve benzeri yükümlülüklere ilişkin idari davalar,",
    ],
    image: idari,
  },
  {
    id: "tazminat-hukuku",
    title: "Tazminat Hukuku",
    description: [
      "Boşanma davası ile birlikte açılan maddi ve manevi tazminat davaları,",
      "Trafik kazasından kaynaklanan maddi ve manevi tazminat davaları,",
      "İş kazasından kaynaklanan maddi-manevi tazminat davası,",
      "Malpraktis davaları (hatalı doktor uygulamalarından kaynaklanan tazminat davası),",
      "Haksız fiillerden kaynaklanan maddi ve manevi tazminat davaları,",
      "Sözleşmelerden kaynaklanan alacak ve tazminat davaları,",
      "Fikri ve Sınai mülkiyet hakkından kaynaklanan alacak ve tazminat davaları.",
    ],
    image: tazminat,
  },
  {
    id: "kira-hukuku",
    title: "Kira Hukuku",
    description: [
      "Tahliye davaları (tahliye taahhüdü, ihtiyaç, yeniden inşa vb.),",
      "Kira bedelinin tespiti davaları,",
      "Kira alacağının tahsili ve icra takibi işlemleri,",
      "Kira sözleşmesinin feshi ve sona ermesine ilişkin davalar,",
      "Ortaklığın giderilmesi ve el atmanın önlenmesi davaları,",
      "Kiralananın ayıplı ifası nedeniyle açılan davalar,",
      "İşyeri kiralarında 5 yıl sonrası kira uyarlama davaları,",
      "Hasar, tazminat ve depozito iadesi davaları,",
    ],
    image: kira,
  },
  {
    id: "emlak-hukuku",
    title: "Kat Mülkiyeti ve Emlak Hukuku",
    description: [
      "Tapu iptal ve tescil davaları,",
      "Kat mülkiyeti ve apartman yönetimine ilişkin davalar,",
      "İmar planı, yapı ruhsatı ve iskan işlemlerine karşı davalar,",
      "Ortaklığın giderilmesi (izale-i şuyu) davaları,",
      "Sınır ihtilafları ve kadastro davaları,",
      "Ecrimisil (haksız işgal tazminatı) davaları,",
      "Gayrimenkul satış vaadi sözleşmesinden kaynaklanan davalar,",
      "Kira, tahliye ve taşınmazın aynına ilişkin ihtilaflar,",
    ],
    image: emlak,
  },
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
              <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed text-justify">
                {area.description.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
