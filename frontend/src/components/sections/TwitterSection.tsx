import { useState, useEffect } from "react";
import { Twitter, Calendar, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

// Mock Twitter data - replace with real API integration
const mockTweets = [
  {
    id: "1",
    text: "Yeni İş Kanunu değişiklikleri hakkında detaylı makalemizi yayınladık. İşveren ve çalışan haklarındaki önemli güncellemeler için blog sayfamızı ziyaret edin. #İşHukuku #YTBHukuk",
    date: "2024-01-15T10:30:00Z",
    url: "https://twitter.com/ytb_hukuk/status/1234567890",
    engagement: { likes: 45, retweets: 12, replies: 8 }
  },
  {
    id: "2", 
    text: "Başarılı bir arabuluculuk süreci ile müvekkilimizin ticari anlaşmazlığını dostane şekilde çözdük. Arabuluculuk, mahkeme sürecine alternatif hızlı ve ekonomik bir yöntemdir. 💼⚖️",
    date: "2024-01-12T14:15:00Z",
    url: "https://twitter.com/ytb_hukuk/status/1234567891",
    engagement: { likes: 67, retweets: 23, replies: 5 }
  },
  {
    id: "3",
    text: "KVKK uyum süreci için şirketlere özel danışmanlık hizmetimiz devam ediyor. Kişisel verilerin korunması konusunda hukuki destek için bizimle iletişime geçin. #KVKK #VeriKorunması",
    date: "2024-01-10T09:45:00Z", 
    url: "https://twitter.com/ytb_hukuk/status/1234567892",
    engagement: { likes: 34, retweets: 15, replies: 12 }
  }
];

export function TwitterSection() {
  const [tweets, setTweets] = useState(mockTweets);
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { 
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Section>
      <Container>
        <div className="text-center space-y-6 mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <Twitter className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-primary">
              Son Güncellemeler
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Hukuk dünyasındaki gelişmeleri ve ofisimizin başarı hikayelerini 
            sosyal medya hesabımızdan takip edin.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tweets.map((tweet, index) => (
              <div 
                key={tweet.id}
                className="card-corporate group hover:shadow-corporate transition-all duration-300 border-l-4 border-l-blue-500"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Twitter className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary">@ytb_hukuk</p>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(tweet.date)}</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href={tweet.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-accent transition-colors p-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-foreground leading-relaxed mb-4">
                  {tweet.text}
                </p>

                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <span>❤️ {tweet.engagement.likes}</span>
                  <span>🔄 {tweet.engagement.retweets}</span>
                  <span>💬 {tweet.engagement.replies}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <a
            href="https://twitter.com/ytb_hukuk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200"
          >
            <Twitter className="w-5 h-5" />
            <span>Tüm gönderilerimizi görmek için bizi takip edin</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </Container>
    </Section>
  );
}