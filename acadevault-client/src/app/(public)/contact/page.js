// src/app/contact/page.js

import Navbar from "@/components/header/Navbar";
import { generatePageMetadata } from "@/utils/generatePageMetadata";

// Immediately loaded (critical for initial page paint)
import ContactHeroSection from "./components/ContactHeroSection";
import ContactInfoSection from "./components/ContactInfoSection";
import ContactSection from "../components/ContactSection"; 

// Client-side sections wrapper
import ClientDynamicSections from "./components/ClientDynamicSections";

// SEO Metadata
export const metadata = generatePageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with our team for support, partnerships, or general inquiries.",
  slug: "contact",
  image: "https://acadevault.com/images/contact-og.jpg",
});

export default function ContactPage() {
  return (
    <>
      <Navbar showSearch showCategories />

        <ContactHeroSection />
        <ContactInfoSection />
        <ContactSection />{" "}
        {/* This could also be in the client wrapper if it's interactive */}
        <ClientDynamicSections />
    </>
  );
}
