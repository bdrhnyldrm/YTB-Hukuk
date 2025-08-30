import { Link } from "react-router-dom";
import { Scale, Phone, Mail, MapPin, Twitter, Linkedin, Instagram } from "lucide-react";

const quickLinks = [
  { name: "Anasayfa", href: "/" },
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "Ekibimiz", href: "/ekibimiz" },
  { name: "Dava Alanlarımız", href: "/dava-alanlari" },
];

const legalLinks = [
  { name: "Makaleler", href: "/makaleler" },
  { name: "Kariyer", href: "/kariyer" },
  { name: "İletişim", href: "/iletisim" },
  { name: "Gizlilik Politikası", href: "/gizlilik" },
];

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com/ytb_hukuk", icon: Twitter },
  { name: "LinkedIn", href: "https://linkedin.com/company/ytb-hukuk", icon: Linkedin },
  { name: "Instagram", href: "https://instagram.com/ytb_hukuk", icon: Instagram },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 gradient-gold rounded-lg flex items-center justify-center">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">YTB HUKUK</span>
              </Link>
              <p className="text-primary-foreground/80 mb-6 text-sm leading-relaxed">
                Profesyonel hukuki danışmanlık ve etkin çözümlerle yanınızdayız. 
                Adaletin her alanında güvenilir hukuki hizmet.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Hızlı Erişim</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-primary-foreground/80 hover:text-accent transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Hukuki</h3>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-primary-foreground/80 hover:text-accent transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6">İletişim</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-primary-foreground/80">
                    Gülbahar Hatun Mahallesi, Nur Sk. Kat : 4 Daire No : 8, 61040 Ortahisar/Trabzon
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-accent" />
                  <a 
                    href="tel:+902125551234" 
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-200"
                  >
                    0505 389 18 74
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-accent" />
                  <a 
                    href="mailto:info@ytbhukuk.com" 
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-200"
                  >
                    info@ytbhukuk.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/60">
            <p>© 2024 YTB Hukuk. Tüm hakları saklıdır.</p>

          </div>
        </div>
      </div>
    </footer>
  );
}