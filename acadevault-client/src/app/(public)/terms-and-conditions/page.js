"use client";

import { generatePageMetadata } from "@/utils/generatePageMetadata";
import Link from "next/link";
import { FileText, HelpCircle, BookOpen } from "lucide-react";
import Navbar from "@/components/header/Navbar";
import Container from "@/components/layout/Container";
import TermsContentSection from "./components/TermsContentSection";

// export const metadata = generatePageMetadata({
//   title: "Terms & Conditions - Acadavault",
//   description:
//     "Review the terms and conditions for using Acadavault’s academic services.",
//   slug: "help-support/terms-conditions",
//   image: "https://acadevault.com/images/terms-conditions-og.jpg",
// });

export default function TermsConditionsPage() {
  return (
    <>
      <Navbar showSearch showCategories />
      <TermsHeroSection />
      <TermsContentSection />
      <SupportSection />
      <CallToActionSection />
    </>
  );
}

const TermsHeroSection = () => (
  <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
    <Container className="text-center">
      <h1 className="text-4xl font-bold mb-4 flex justify-center items-center gap-2">
        <FileText className="w-8 h-8" />
        Terms & Conditions
      </h1>
      <p className="text-lg max-w-2xl mx-auto">
        Understand the rules and agreements for using Acadavault’s services.
      </p>
    </Container>
  </section>
);

// const TermsContentSection = () => (
//   <section className="py-16">
//     <Container className="space-y-6">
//       <h2 className="text-2xl font-semibold text-gray-800">Our Terms</h2>
//       <div className="prose max-w-4xl mx-auto text-gray-700">
//         <h3 className="text-lg font-semibold mt-6">1. Introduction</h3>
//         <p>
//           Welcome to Acadavault. By accessing or using our services, you agree
//           to be bound by these Terms and Conditions.
//         </p>
//         <h3 className="text-lg font-semibold mt-6">2. User Responsibilities</h3>
//         <p>
//           You agree to use our services for lawful purposes and in compliance
//           with all applicable academic integrity policies.
//         </p>
//         <h3 className="text-lg font-semibold mt-6">3. Intellectual Property</h3>
//         <p>
//           All content uploaded to Acadavault remains the property of the
//           original owner. You grant us a limited license to process and
//           distribute your content as per our services.
//         </p>
//         <h3 className="text-lg font-semibold mt-6">4. Payments and Refunds</h3>
//         <p>
//           Payments for services are processed securely. Refunds are issued in
//           accordance with our refund policy, available upon request.
//         </p>
//         <h3 className="text-lg font-semibold mt-6">
//           5. Limitation of Liability
//         </h3>
//         <p>
//           Acadavault is not liable for any indirect, incidental, or
//           consequential damages arising from the use of our services.
//         </p>
//         <p className="mt-6">
//           For the full Terms and Conditions, please contact{" "}
//           <a
//             href="mailto:legal@acadevault.com"
//             className="text-blue-600 hover:underline"
//           >
//             legal@acadevault.com
//           </a>
//           .
//         </p>
//       </div>
//     </Container>
//   </section>
// );

const SupportSection = () => (
  <section className="py-16 bg-gray-100">
    <Container className="text-center space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center justify-center gap-2">
        <HelpCircle className="w-6 h-6 text-blue-600" />
        Need Further Assistance?
      </h2>
      <p className="text-base text-gray-600 max-w-md mx-auto">
        Contact our support team for questions about our terms or services.
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
