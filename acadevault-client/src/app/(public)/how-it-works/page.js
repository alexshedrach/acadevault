import Navbar from "@/components/header/Navbar";
import { generatePageMetadata } from "@/lib/metadata/generatePageMetadata";
import dynamic from "next/dynamic";
import HowItWorksCTASection from "./components/HowItWorksCTASection";


export const metadata = generatePageMetadata({
  title: "How It Works",
  description:
    "Learn how Acadavault works for students, researchers, and academics to access, sell, or create academic materials with ease and security.",
  slug: "how-it-works",
  image: "https://acadevault.com/images/how-it-works-og.jpg",
});

// Dynamically import each section (SSR: false only if it uses browser-only APIs)
const HeroSection = dynamic(
  () => import("./components/HowItWorksHeroSection"),
  { suspense: true }
);
const OverviewSection = dynamic(
  () => import("./components/HowItWorksOverviewSection"),
  { suspense: true }
);
const AccessSection = dynamic(
  () => import("./components/AccessMaterialsSection"),
  { suspense: true }
);
const SellSection = dynamic(() => import("./components/SellMaterialsSection"), {
  suspense: true,
});
const HireSection = dynamic(() => import("./components/HireWritersSection"), {
  suspense: true,
});
const ReferSection = dynamic(() => import("./components/ReferAndEarnSection"), {
  suspense: true,
});
const SecuritySection = dynamic(
  () => import("./components/SecurityTrustSection"),
  { suspense: true }
);

export default function HowItWorksPage() {
  return (
    <>
      {/* Top navigation */}
      <Navbar showSearch showCategories />

      {/* Main content */}
      {/* Hero */}

      <HeroSection />

      {/* Overview */}

      <OverviewSection />

      {/* Step 1: Access Materials */}

      <AccessSection />

      {/* Step 2: Sell Materials */}

      <SellSection />

      {/* Step 3: Hire Writers */}

      <HireSection />

      {/* Refer & Earn */}

      <ReferSection />

      {/* Security & Trust */}

      <SecuritySection />

      <HowItWorksCTASection />
    </>
  );
}
