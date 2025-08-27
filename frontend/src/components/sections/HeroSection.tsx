import { Link } from "react-router-dom";
import { ArrowRight, Shield, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import heroImage from "@/assets/hero-law-firm.jpg";

const stats = [
  { label: "Başarılı Dava", value: "500+", icon: Shield },
  { label: "Memnun Müvekkil", value: "1200+", icon: Users },
  { label: "Yıllık Deneyim", value: "15+", icon: Award },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="YTB Hukuk - Profesyonel Hukuki Danışmanlık"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary-dark/80" />
      </div>

      <Container className="relative z-10 text-white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-white">
                Hukuki
                <span className="block gradient-gold bg-clip-text text-transparent">
                  Güvenceniz
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-2xl">
                Profesyonel hukuki danışmanlık ve etkin çözümlerle adaletin her alanında yanınızdayız. 
                Uzman kadromuzla hak ve menfaatlerinizi koruyoruz.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="btn-hero text-lg px-8 py-4">
                <Link to="/iletisim">
                  Ücretsiz Danışmanlık
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="btn-outline-gold text-lg px-8 py-4 border-white/30 text-white hover:bg-white hover:text-primary"
              >
                <Link to="/dava-alanlari">
                  Uzmanlık Alanları
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="space-y-6">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="card-corporate bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 gradient-gold rounded-xl flex items-center justify-center flex-shrink-0">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent">
                      {stat.value}
                    </div>
                    <div className="text-white/80 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}