import Navbar from "@/components/header/Navbar";
import { generatePageMetadata } from "@/utils/generatePageMetadata";
import { HowItWorksSection } from "./components/HowItWorksSection";
import ReferAndEarnOverview from "./components/ReferAndEarnOverview";
import ReferHeroSection from "./components/ReferHeroSection";
import { ReferralStats } from "./components/ReferralStats";
import ReferralTestimonialsSection from "./components/ReferralTestimonialsSection";
import ReferralFAQSection from "./components/ReferralFAQSection";
import { ReferralCallToActionSection } from "./components/ReferralCallToActionSection";

export const metadata = generatePageMetadata({
  title: "Refer & Earn",
  description:
    "Invite your friends to Acadavault and earn rewards like discounts, credits, and premium features while helping others access trusted academic resources.",
  slug: "refer-and-earn",
  image: "https://acadevault.com/images/refer-and-earn-og.jpg",
});

export default function ReferAndEarnPage() {
  return (
    <>
      <Navbar showSearch showCategories />
      <ReferHeroSection />
      <ReferAndEarnOverview />
      <ReferralStats />
      <HowItWorksSection />
      <ReferralTestimonialsSection />
      <ReferralCallToActionSection />
      <ReferralFAQSection />
    </>
  );
}
