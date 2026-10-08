import Navbar from "@/components/header/Navbar";
import { generatePageMetadata } from "@/utils/generatePageMetadata";
import BenefitsSection from "./components/BenefitsSection";
import IdealAudienceSection from "./components/IdealAudienceSection";
import VendorHeroSection from "./components/SellerHeroSection";
import StartSellAction from "./components/StartSellAction";
import UploadRejectionGuidelines from "./components/UploadRejectionGuidelines";
import VendorAdvantagesSection from "./components/VendorAdvantages";
import VendorHowItWorksSection from "./components/VendorHowItWorksSection";
import { VendorTestimonialSection } from "./components/VendorTestimonialSection";
import VendorsFAQSection from "./components/VendorsFAQSection";

export const metadata = generatePageMetadata({
  title: "Become a Vendor",
  description:
    "Join Acadavault as a vendor to monetize your academic materials, reach a global audience, and earn passive income with ease.",
  slug: "vendors/register",
  image: "https://acadevault.com/images/vendors-register-og.jpg",
});

export default function VendorsRegisterPage() {
  return (
    <>
      <Navbar showSearch showCategories />

      <VendorHeroSection />
      <VendorAdvantagesSection />
      <VendorHowItWorksSection />
      <BenefitsSection />
      <VendorTestimonialSection />
      <IdealAudienceSection />
      <UploadRejectionGuidelines />
      <VendorsFAQSection />
      <StartSellAction />
    </>
  );
}
