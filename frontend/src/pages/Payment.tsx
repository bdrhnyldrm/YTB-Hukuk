import { ShieldCheck } from "lucide-react";

export default function PaymentPage() {
  const handleRedirect = () => {
    // Buraya yönlendirmek istediğin ödeme URL’sini yaz
    window.open("https://pos.param.com.tr/Tahsilat/Default.aspx?k=b86092f0-83fc-4558-84cb-c42c658d5535", "_blank");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50 px-6">
      {/* Icon */}
      <div className="mb-10">
        <ShieldCheck className="w-16 h-16 text-yellow-500" />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
        ONLİNE ÖDEME
      </h1>

      {/* Description */}
      <p className="text-lg text-gray-600 max-w-2xl text-center mb-10">
        YTB Hukuk Bürosu’ndan aldığınız danışmanlık ve dava hizmetlerinin
        ödemelerini internet üzerinden{" "}
        <span className="font-semibold">güvenle</span> yapabilirsiniz.
      </p>

      {/* Button */}
      <button
        onClick={handleRedirect}
        className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
      >
        Ödeme Yapmak İçin Tıklayın →
      </button>
    </div>
  );
}
