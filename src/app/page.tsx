import { SiteHeader } from "@/components/layout/site-header";
import { HeroSection } from "@/components/home/hero-section";
import { ValuePropsStrip } from "@/components/home/value-props-strip";
import { CategoriesShowcase } from "@/components/home/categories-showcase";
import { FeaturedProducts } from "@/components/home/featured-products";
import { HowItWorks } from "@/components/home/how-it-works";
import { WhatsAppCtaBanner } from "@/components/home/whatsapp-cta-banner";
import { SocialProof } from "@/components/home/social-proof";
import { SiteFooter } from "@/components/home/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ValuePropsStrip />
        <CategoriesShowcase />
        <FeaturedProducts />
        <HowItWorks />
        <WhatsAppCtaBanner />
        <SocialProof />
      </main>
      <SiteFooter />
    </>
  );
}
