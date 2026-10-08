"use client";

import { generatePageMetadata } from "@/utils/generatePageMetadata";
import Link from "next/link";
import { Shield, HelpCircle, BookOpen } from "lucide-react";
import Navbar from "@/components/header/Navbar";
import Container from "@/components/layout/Container";

export const metadata = generatePageMetadata({
  title: "Privacy Policy - Acadavault",
  description:
    "Learn how Acadavault protects your personal information and privacy.",
  slug: "help-support/privacy-policy",
  image: "https://acadevault.com/images/privacy-policy-og.jpg",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar showSearch showCategories />
      <PrivacyHeroSection />
      <PrivacyContentSection />
      <SupportSection />
      <CallToActionSection />
    </>
  );
}

const PrivacyHeroSection = () => (
  <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
    <Container className="text-center">
      <h1 className="text-4xl font-bold mb-4 flex justify-center items-center gap-2">
        <Shield className="w-8 h-8" />
        Privacy Policy
      </h1>
      <p className="text-lg max-w-2xl mx-auto">
        Your privacy is our priority. Learn how we protect your data.
      </p>
    </Container>
  </section>
);

const PrivacyContentSection = () => (
  <section className="py-16">
    <Container className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">
        Our Privacy Policy
      </h2>
      <div className="prose max-w-4xl mx-auto text-gray-700">
        <h3 className="text-lg font-semibold mt-6">1. Data Collection</h3>
        <p>
          We collect personal information such as your name, email, and payment
          details to provide our services.
        </p>
        <h3 className="text-lg font-semibold mt-6">2. Data Usage</h3>
        <p>
          Your data is used to process transactions, deliver services, and
          improve user experience.
        </p>
        <h3 className="text-lg font-semibold mt-6">3. Data Protection</h3>
        <p>
          We use encryption and secure servers to protect your information from
          unauthorized access.
        </p>
        <h3 className="text-lg font-semibold mt-6">4. Third-Party Sharing</h3>
        <p>
          We may share data with trusted partners (e.g., payment processors) to
          fulfill services, with strict confidentiality agreements.
        </p>
        <h3 className="text-lg font-semibold mt-6">5. Your Rights</h3>
        <p>
          You have the right to access, update, or delete your personal
          information. Contact us at{" "}
          <a
            href="mailto:privacy@acadevault.com"
            className="text-blue-600 hover:underline"
          >
            privacy@acadevault.com
          </a>
          .
        </p>
        <p className="mt-6">
          For the full Privacy Policy, please contact{" "}
          <a
            href="mailto:privacy@acadevault.com"
            className="text-blue-600 hover:underline"
          >
            privacy@acadevault.com
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
        Contact our support team for questions about our privacy policy or
        services.
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
