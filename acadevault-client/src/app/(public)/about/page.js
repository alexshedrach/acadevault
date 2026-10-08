import Navbar from "@/components/header/Navbar";
import { generatePageMetadata } from "@/utils/generatePageMetadata";

// Import the client wrapper
import ClientDynamicSections from "./components/ClientDynamicSections";
import AboutHeroSection from "./components/AboutHero";
import CompanyOverviewSection from "./components/CompanyOverviewSection";
import TrustedByInstitutions from "@/components/common/TrustedByInstitutions";
import CallToActionSection from "../components/CallToActionSection";

export const metadata = generatePageMetadata({
  title: "About Us",
  description:
    "Discover AcadeVault's mission, values, and the team driving our platform for academic excellence.",
  slug: "about",
  image: "https://acadevault.com/images/about-og.jpg",
});

export default function AboutPage() {
  return (
    <>
      <Navbar showSearch showCategories />

        <AboutHeroSection />
        <CompanyOverviewSection />
        <ClientDynamicSections /> {/* This is now fully client-safe */}
        <TrustedByInstitutions />
        <CallToActionSection />
    </>
  );
}
