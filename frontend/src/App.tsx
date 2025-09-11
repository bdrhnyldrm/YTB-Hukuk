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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
