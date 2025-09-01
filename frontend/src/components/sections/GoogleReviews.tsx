import React from "react";

const reviews = [
  {
    name: "Eda Yüksel",
    date: "20 Ocak 2024",
    text: "Avukat Beylere SGK tarafından bedeli karşılanmayan kanser ilaçları ile ilgili başvurduk. Bu konuda bilgi sahibi uzman avukat bulmak zor. Kendileri tüm hukuki süreç hakkında deneyim sahibiler . Teşekkürler",
    rating: 5,
  },
  {
    name: "Aleyna Gözde Genç",
    date: "15 Ocak 2024",
    text: "Muris muvazaası nedeniyle gittiğim Y&T Hukuk Bürosu'nu tercih ettiğim için çok şanslıyım. Bana yardımlarını esirgemeyen, işini hakkıyla yapan, takip eden, çok hızlı bir şekilde sonuçlandıran ve tüm dava aşamalarında beni bilgilendirerek yanımda olduğu için Sayın Av. Şükür TEMEL' e ayrıca teşekkür ederim. Güvenilir bir avukat, güvenilir bir hukuk bürosu. Başarılarınızın devamını dilerim.",
    rating: 5,
  },
  {
    name: "Hüseyin",
    date: "10 Ocak 2024",
    text: "Ceza hukukunda savunma hususunun ne kadar önemli ve teknik bir konu olması dikkate alındığında bu konuda her türlü özen ve emeğin en güzel şekilde icra edildiğine bizzat şahit olduğum hukuk bürosu, dolayısıyla şehir farketmeksizin ceza avukatına ihtiyaç olduğunda iletişime geçilmesini ısrarla tavsiye ederim.",
    rating: 5,
  },
];

const GoogleReviews = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Google İşletme Yorumları
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <div key={idx} className="p-6 bg-white shadow-md rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{review.name}</h3>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-700 mb-4">"{review.text}"</p>
              <div className="flex text-yellow-500">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a
            href="https://www.google.com/search?sca_esv=0341e61adf0435df&tbm=lcl&sxsrf=AE3TifMMPOw2l4e2l7N4iG59AFhmi2I0wQ:1756735380132&q=Avukat+Ali+%C4%B0hsan+Y%C4%B1ld%C4%B1r%C4%B1m+Yorumlar&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNDM0NDcxMDCwtDA1MjO0MDW3sNjAyPiKUc2xrDQ7sUTBMSdT4ciGjOLEPIXIIxtzUo5sLDqyMVchMr-oNDcnsWgRK5EKAay6sMttAAAA&rldimm=16117400098526185788&hl=tr-TR&sa=X&ved=2ahUKEwiJg7Ci3bePAxUwQvEDHejyAEYQ9fQKegQIPBAF&biw=1536&bih=695&dpr=1.25#lkt=LocalPoiReviews"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-medium hover:underline"
          >
            Tüm Yorumları Gör
          </a>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
