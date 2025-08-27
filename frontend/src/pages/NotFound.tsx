import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center section-padding">
        <Container>
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-8xl lg:text-9xl font-bold text-primary/20">
                404
              </h1>
              <h2 className="text-3xl lg:text-4xl font-semibold text-primary">
                Sayfa Bulunamadı
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
                Ana sayfaya dönerek ihtiyacınız olan bilgilere ulaşabilirsiniz.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-hero">
                <Link to="/">
                  <Home className="mr-2 w-5 h-5" />
                  Ana Sayfa
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="btn-outline-gold">
                <Link to="/iletisim">
                  <ArrowLeft className="mr-2 w-5 h-5" />
                  İletişim
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
              <Link 
                to="/dava-alanlari" 
                className="card-corporate text-center hover:shadow-corporate transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Dava Alanlarımız
                </h3>
                <p className="text-muted-foreground text-sm">
                  Uzmanlık alanlarımızı keşfedin
                </p>
              </Link>
              <Link 
                to="/ekibimiz" 
                className="card-corporate text-center hover:shadow-corporate transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Ekibimiz
                </h3>
                <p className="text-muted-foreground text-sm">
                  Deneyimli avukat kadromuz
                </p>
              </Link>
              <Link 
                to="/makaleler" 
                className="card-corporate text-center hover:shadow-corporate transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Makaleler
                </h3>
                <p className="text-muted-foreground text-sm">
                  Hukuki içeriklerimiz
                </p>
              </Link>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;