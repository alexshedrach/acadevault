import Navbar from "@/components/header/Navbar";
import { generatePageMetadata } from "@/lib/metadata/generatePageMetadata";

import HireWriterHero from "./components/HireWriterHeroSection";
import HireWriterTestimonials from "./components/HireWriterTestimonials";
import HireWriterCTA from "./components/HireWriterCTA";
import SupportSection from "./components/SupportSection";
import WhyChooseUs from "./components/WhyChooseUs";
import TrustAndGuarantees from "./components/TrustAndGuarantees";
import WritersQualifications from "./components/WritersQualifications";
import WritersShowcase from "./components/WritersShowcase";
import HowItWorksSection from "./components/HowItWorks";

export const metadata = generatePageMetadata({
  title: "Hire a Professional Writer",
  description:
    "Hire professional academic writers on AcaDeVault to get high-quality, original content tailored to your needs.",
  slug: "hire-writer",
  image: "https://acadevault.com/images/hire-writer-og.jpg",
});

export default function HireWriterPage() {
  return (
    <>
      <Navbar showSearch showCategories />

      {/* Hero */}
      <HireWriterHero />

      {/* Value Propositions */}
      <WhyChooseUs />

      {/* Process */}
      <HowItWorksSection />

      {/* Credentials */}
      <WritersQualifications />

      {/* Writers */}
      <WritersShowcase />

      {/* Social Proof */}
      <HireWriterTestimonials />

      {/* Trust and Guarantees */}
      <TrustAndGuarantees />

      {/* CTA */}
      <HireWriterCTA />

      {/* Support */}
      <SupportSection />
    </>
  );
}
