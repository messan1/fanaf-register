import HeroSection from "@/components/homepage/HeroSection";
import GallerySection from "@/components/homepage/GallerySection";
import KeyFiguresBar from "@/components/homepage/KeyFiguresBar";
import AboutSection from "@/components/homepage/AboutSection";
import StatsSection from "@/components/homepage/StatsSection";
import EventHighlights from "@/components/homepage/EventHighlights";
import SpeakersPreview from "@/components/homepage/SpeakersPreview";
import SponsorsPreview from "@/components/homepage/SponsorsPreview";
import RegistrationCTA from "@/components/homepage/RegistrationCTA";
import FAQSection from "@/components/homepage/FAQSection";
import ContactSection from "@/components/homepage/ContactSection";
import HomeNavbar from "@/components/homepage/HomeNavbar";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HomeNavbar />
      {/* Hero Section avec vidéo de fond */}
      <HeroSection />
      {/* Galerie d'ambiance FANAF */}

      
      {/* Barre des chiffres clés */}
      <KeyFiguresBar />
      
      {/* Section À propos de la FANAF */}
      <AboutSection />
      
      {/* Section Statistiques */}
      <StatsSection />
      
      {/* Points forts de l'événement */}
      <EventHighlights />
      
      {/* Aperçu des intervenants */}
      <SpeakersPreview />
      
      {/* Aperçu des partenaires et sponsors */}
      <SponsorsPreview />
      
      {/* Formules d'inscription */}
      <RegistrationCTA />
 
      {/* Questions fréquentes */}
      <FAQSection />
      <GallerySection />
      {/* Section Contact */}
      <ContactSection />
    </main>
  );
}
