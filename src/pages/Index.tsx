import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import GallerySection from "@/components/GallerySection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { getAbsoluteUrl } from "@/lib/seo";
import { useSiteContent } from "@/providers/site-content-provider";

const Index = () => {
  const { content } = useSiteContent();
  const homeSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Netrix Systems Limited",
      url: getAbsoluteUrl("/"),
      logo: getAbsoluteUrl("/logo.png"),
      email: content.contact.email,
      telephone: content.contact.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: content.contact.address,
        addressCountry: "NG",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: content.contact.phone,
          email: content.contact.email,
          areaServed: "NG",
          availableLanguage: ["en"],
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Netrix Systems Limited",
      url: getAbsoluteUrl("/"),
      description:
        "Solar, CCTV, structured cabling, inverter and ICT solutions for homes and businesses across Nigeria.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: content.faqs.flatMap((category) =>
        category.questions.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Netrix Systems Limited — Solar, CCTV, Cabling & ICT Solutions"
        description="Solar installations, CCTV security, structured cabling, inverters and ICT solutions for homes and businesses across Nigeria."
        path="/"
        schema={homeSchema}
      />
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <GallerySection />
      <AboutSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
