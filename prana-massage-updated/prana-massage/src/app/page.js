import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import VideoSection from "@/components/VideoSection";
import ProductsSection from "@/components/ProductsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <VideoSection />
      <ProductsSection />
      <ContactSection />
    </>
  );
}
