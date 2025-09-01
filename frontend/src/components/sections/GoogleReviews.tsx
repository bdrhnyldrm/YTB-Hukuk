import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react"; // istersen ikon kullanmayabilirsin

const reviews = [
  {
    name: "Eda Yüksel",
    date: "20 Ocak 2024",
    text: "Avukat Beylere SGK tarafından bedeli karşılanmayan kanser ilaçları ile ilgili başvurduk. Bu konuda bilgi sahibi uzman avukat bulmak zor. Kendileri tüm hukuki süreç hakkında deneyim sahibiler . Teşekkürler",
    rating: 5,
  },
  {
    name: "Tunahan Aslan",
    date: "15 Ocak 2024",
    text: "Bir ceza davamızda yardımcı oldular.Tüm süreç boyunca gayet güzel bir şekilde ilgilendiler. Her iki avukat da gayet güleryüzlü ve samimiler. Kendilerinden çok memnun kaldık.",
    rating: 5,
  },
  {
    name: "Ahmet Furkan Duran",
    date: "10 Ocak 2024",
    text: "Kendilerinden tapu ile ilgili danışmanlık aldık. Tüm sorularımızı sabırla ve içtenlikle cevapladılar.Çok deneyimli ve ilgililer. Teşekkür ediyorum her şey için, fazlasıyla memnun kaldım.",
    rating: 5,
  },
];

const GoogleReviews = () => {
  return (
    <section className="pt-1 pb-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl lg:text-5xl font-bold text-primary text-center mb-10">
          İşletme Yorumları
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
          <Button asChild size="lg" className="btn-hero">
            <a
              href="https://www.google.com/search?sa=X&sca_esv=6bae24b5c791315b&tbm=lcl&sxsrf=AE3TifOJ2ZbKMnDuPzWqP2B4TJU561o5yg:1756739788654&q=Avukat+Ali+%C4%B0hsan+Y%C4%B1ld%C4%B1r%C4%B1m+Yorumlar&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNDM0NDcxMDCwtDA1MjO0MDW3sNjAyPiKUc2xrDQ7sUTBMSdT4ciGjOLEPIXIIxtzUo5sLDqyMVchMr-oNDcnsWgRK5EKAay6sMttAAAA&rldimm=16117400098526185788&hl=tr-TR&ved=2ahUKEwiHz8LY7bePAxVlSPEDHYe7GBcQ9fQKegQITxAF&biw=1536&bih=695&dpr=1.25#lkt=LocalPoiReviews" // kendi işletme linkin
              target="_blank"
              rel="noopener noreferrer"
            >
              Tüm Yorumları Gör
              <ExternalLink className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
