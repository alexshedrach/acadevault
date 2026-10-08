"use client";

import { generatePageMetadata } from "@/utils/generatePageMetadata";
import Link from "next/link";
import { Users, HelpCircle, BookOpen } from "lucide-react";
import Container from "@/components/layout/Container";
import SecondaryNavbar from "@/components/header/SecondaryNavbar";

// export const metadata = generatePageMetadata({
//   title: "Community Guidelines - Acadavault",
//   description:
//     "Learn about the rules for participating in Acadavault’s community features.",
//   slug: "community-guidelines",
//   image: "https://acadevault.com/images/community-guidelines-og.jpg",
// });

export default function CommunityGuidelinesPage() {
  return (
    <>
      <SecondaryNavbar showSearch showCategories />
      <GuidelinesHeroSection />
      <GuidelinesContentSection />
      <SupportSection />
      <CallToActionSection />
    </>
  );
}

const GuidelinesHeroSection = () => (
  <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
    <Container className="text-center">
      <h1 className="text-4xl font-bold mb-4 flex justify-center items-center gap-2">
        <Users className="w-8 h-8" />
        Community Guidelines
      </h1>
      <p className="text-lg max-w-2xl mx-auto">
        Foster a respectful and productive environment in our community.
      </p>
    </Container>
  </section>
);

const GuidelinesContentSection = () => (
  <section className="py-16">
    <Container className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">
        Our Community Rules
      </h2>
      <div className="prose max-w-4xl mx-auto text-gray-700">
        <h3 className="text-lg font-semibold mt-6">1. Respect Others</h3>
        <p>
          Treat all members with respect. Avoid harassment, discrimination, or
          offensive language.
        </p>
        <h3 className="text-lg font-semibold mt-6">2. Stay On Topic</h3>
        <p>
          Keep discussions relevant to academic topics and the specific forum or
          session.
        </p>
        <h3 className="text-lg font-semibold mt-6">3. No Plagiarism</h3>
        <p>
          Share original content or properly attribute sources. Plagiarism is
          strictly prohibited.
        </p>
        <h3 className="text-lg font-semibold mt-6">4. Report Violations</h3>
        <p>
          Use the{" "}
          <Link
            href="/help-support/report-issue"
            className="text-blue-600 hover:underline"
          >
            Report an Issue
          </Link>{" "}
          feature to flag inappropriate behavior.
        </p>
        <h3 className="text-lg font-semibold mt-6">5. Moderation</h3>
        <p>
          Our moderators may remove content or suspend users who violate these
          guidelines.
        </p>
        <p className="mt-6">
          For questions, contact{" "}
          <a
            href="mailto:community@acadevault.com"
            className="text-blue-600 hover:underline"
          >
            community@acadevault.com
          </a>
          .
        </p>
      </div>
    </Container>
  </section>
);

const SupportSection = () => (
  <section className="py-16 bg-gray-100">
    <Container className="text-center space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center justify-center gap-2">
        <HelpCircle className="w-6 h-6 text-blue-600" />
        Need Further Assistance?
      </h2>
      <p className="text-base text-gray-600 max-w-md mx-auto">
        Contact our support team for questions about our community guidelines.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/help-support/contact-us"
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
        >
          Contact Support
        </Link>
        <a
          href="mailto:support@acadevault.com"
          className="bg-green-400 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-500 transition duration-300"
        >
          Email Us
        </a>
      </div>
    </Container>
  </section>
);

const CallToActionSection = () => (
  <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
    <Container className="text-center space-y-6">
      <h2 className="text-3xl font-bold flex justify-center items-center gap-2">
        <BookOpen className="w-8 h-8" />
        Explore Acadavault
      </h2>
      <p className="text-lg max-w-2xl mx-auto">
        Discover more resources and services to support your academic journey.
      </p>
      <Link
        href="/materials"
        className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold text-lg hover:bg-yellow-500 transition duration-300"
        aria-label="Explore materials"
      >
        Explore Materials
      </Link>
    </Container>
  </section>
);
