import officeImg from "../assets/ofis.jpg";

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      <section className="container mx-auto px-6 md:px-8 pt-4 md:pt-4">
        {/* Başlık */}
        <div className="text-center mt-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            Hakkımızda
          </h1>
          <p className="mt-3 mb-6 text-gray-500">
            Güven, şeffaflık ve sonuç odaklı yaklaşım.
          </p>
        </div>
        {/* Kapak görseli */}
        <div className="relative">
          <img
            src={officeImg}
            alt="YTB Hukuk Bürosu"
            className="w-4/5 h-[42vh] md:h-[52vh] object-cover rounded-2xl shadow-lg mx-auto"
            loading="eager"
          />

        </div>


        {/* İçerik */}
        <article className="mx-auto max-w-3xl mt-8 md:mt-10 mb-20 text-gray-700 leading-relaxed text-lg">
          <p className="mb-6">
            <span className="font-semibold text-gray-900">YTB Hukuk Bürosu </span>
             olarak, adaletin temel değerlerinden güç alarak müvekkillerimize güvenilir,
             şeffaf ve etkin hukuk hizmeti sunuyoruz. Her bir dosyayı sadece bir iş değil;
             insanların hayatlarına, işlerine ve geleceklerine dokunan önemli bir emanet olarak görüyoruz.
          </p>
          <p className="mb-6">
            Deneyimli avukat kadromuz ve alanında uzman danışmanlarımızla; hukukun üstünlüğünü gözeterek,
            yenilikçi çözümler ve stratejik yaklaşımlar geliştiriyoruz. Müvekkillerimizin ihtiyaçlarını en
            ince ayrıntısına kadar analiz ediyor, sadece sorunları çözmekle kalmayıp, gelecekte karşılaşabilecekleri
            hukuki riskleri de önlemeyi hedefliyoruz.
          </p>
          <p className="mb-6">
            <span className="font-semibold text-gray-900">YTB Hukuk Bürosu </span> olarak misyonumuz; adalete erişimi kolaylaştırmak, hak arama özgürlüğünü güvence altına almak
            ve her durumda müvekkillerimizin yanında olmaktır. Çalışma anlayışımız; dürüstlük, gizlilik ve profesyonellik
            üzerine kuruludur.
          </p>
          <div className="mt-8 p-5 md:p-6 rounded-2xl bg-white shadow-md ring-1 ring-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Çalışma İlkelerimiz
            </h2>
            <ul className="list-disc pl-6 space-y-1 text-base">
              <li>Güven ve gizlilik</li>
              <li>Şeffaf iletişim ve düzenli bilgilendirme</li>
              <li>Çözüm ve sonuç odaklı yaklaşım</li>
              <li>Etik ve profesyonel standartlara bağlılık</li>
            </ul>
          </div>
        </article>
      </section>
    </div>
  );
}
