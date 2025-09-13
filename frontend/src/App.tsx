import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SiteLayout from "@/components/layout/SiteLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ContactForm from "./features/contact/ContactForm";
import PaymentPage from "./pages/Payment";
import AboutPage from "./pages/About";
import CareerPage from "./pages/Career";
import TeamPage from "./pages/Team";
import PracticeAreas from "./pages/PracticeAreas";
import ScrollToHashElement from "./components/common/ScrollToHashElement";
import ArticlesPage from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminArticles from "./pages/admin/AdminArticles";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToHashElement />
        <Routes>
          <Route element={<SiteLayout />}> {/*Bu SiteLayout genel layout yapısını oluşturuyor.*/}
            <Route path="/" element={<Index />} />
            <Route path="/iletisim" element={<ContactForm />} /> {/*Burda ise bu path yolu geldiğinde üsttek SiteLayout yapısını koruyarak sadece bu yolun belirttiği dosyanın içeriğini sayfaya ekliyor.*/}
            <Route path="/odeme" element={<PaymentPage />} />
            <Route path="/hakkimizda" element={<AboutPage />} />
            <Route path="/kariyer" element={<CareerPage />} />
            <Route path="/ekibimiz" element={<TeamPage />} />
            <Route path="/dava-alanlari" element={<PracticeAreas />} />
            <Route path="/makaleler" element={<ArticlesPage />} />
            <Route path="/makaleler/:slug" element={<ArticleDetail />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/articles" element={<AdminArticles />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
