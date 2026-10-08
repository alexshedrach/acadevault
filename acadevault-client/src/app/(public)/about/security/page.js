
import Navbar from "@/components/header/Navbar";
import { generatePageMetadata } from "@/utils/generatePageMetadata";

import ClientDynamicSections from "./components/ClientDynamicSections";
import SecurityHeroSection from "./components/SecurityHeroSection";

export const metadata = generatePageMetadata({
  title: "Security & Trust - AcadeVault",
  description:
    "Learn how AcadeVault secures your data, verifies academic materials, and maintains academic integrity.",
  slug: "security",
  image: "https://acadevault.com/images/security-og.jpg",
});

export default function SecurityPage() {
  return (
    <>
      <Navbar showSearch showCategories />
      <SecurityHeroSection />
      <ClientDynamicSections />
    </>
  );
}
