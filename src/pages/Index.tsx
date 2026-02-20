import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FacilitiesSection from "@/components/FacilitiesSection";
import SportsDay from "@/components/SportsDay";
import CulturalDay from "@/components/CulturalDay";
import DJNightSection from "@/components/DJNightSection";
import RegistrationInfo from "@/components/RegistrationInfo";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FacilitiesSection />
      <SportsDay />
      <CulturalDay />
      <DJNightSection />
      <RegistrationInfo />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
