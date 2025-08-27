import { Link } from "react-router-dom";
import { ArrowRight, Building2, Users, Heart, Shield, Briefcase, Copyright } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const services = [
  {
    title: "Ticaret Hukuku",
    description: "Şirket kuruluşu, birleşme ve devir işlemleri, ticari anlaşmazlıklar",
    icon: Building2,
    href: "/dava-alanlari/ticaret-hukuku"
  },
  {
    title: "İş Hukuku",
    description: "İş sözleşmeleri, işçi hakları, iş kazaları ve mesleki hastalıklar",
    icon: Users,
    href: "/dava-alanlari/is-hukuku"
  },
  {
    title: "Aile Hukuku",
    description: "Boşanma, velayet, nafaka, mal paylaşımı ve aile içi anlaşmazlıklar",
    icon: Heart,
    href: "/dava-alanlari/aile-hukuku"
  },
  {
    title: "Ceza Hukuku",
    description: "Suç davaları, müdafilik, mağdur hakları ve ceza hukuku danışmanlığı",
    icon: Shield,
    href: "/dava-alanlari/ceza-hukuku"
  },
  {
    title: "İcra ve İflas",
    description: "Alacak takibi, icra takipleri, iflas işlemleri ve konkordato",
    icon: Briefcase,
    href: "/dava-alanlari/icra-iflas"
  },
  {
    title: "Fikri Mülkiyet",
    description: "Marka, patent, telif hakları ve fikri mülkiyet korunması",
    icon: Copyright,
    href: "/dava-alanlari/fikri-mulkiyet"
  }
];

export function ServicesSection() {
  return (
    <Section background="muted">
      <Container>
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary">
            Uzmanlık Alanlarımız
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Hukuk dünyasının farklı alanlarında uzman kadromuzla, 
            tüm hukuki ihtiyaçlarınıza profesyonel çözümler sunuyoruz.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Link
              key={service.title}
              to={service.href}
              className="card-corporate group hover:shadow-corporate transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 gradient-gold rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center text-accent group-hover:translate-x-2 transition-transform duration-300">
                <span className="font-medium">Detaylar</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="btn-hero">
            <Link to="/dava-alanlari">
              Tüm Hizmetlerimizi İnceleyin
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}