"use client";

import { generatePageMetadata } from "@/utils/generatePageMetadata";
import Link from "next/link";
import { useState } from "react";
import {
  HelpCircle,
  Search,
  Briefcase,
  PenTool,
  ShieldCheck,
  BookOpen,
  Headphones,
} from "lucide-react";
import Navbar from "@/components/header/Navbar";
import FAQsAndLearnSection from "./components/FAQsAndLearnSection";

// export const metadata = generatePageMetadata({
//   title: "FAQs - Acadavault",
//   description:
//     "Find answers to common questions about using Acadavault, selling materials, hiring writers, and platform security.",
//   slug: "faq",
//   image: "https://acadevault.com/images/faq-og.jpg",
// });

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Navbar showSearch showCategories />
      {/* <FAQHeroSection searchQuery={searchQuery} handleSearch={handleSearch} />
      <GeneralFAQsSection searchQuery={searchQuery} />
      <VendorFAQsSection searchQuery={searchQuery} />
      <WriterFAQsSection searchQuery={searchQuery} />
      <SecurityFAQsSection searchQuery={searchQuery} /> */}
      <FAQsAndLearnSection />
      <ResourcesSection />
      <SupportContactSection />
      <CallToActionSection />
    </>
  );
}

const FAQHeroSection = ({ searchQuery, handleSearch }) => (
  <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
    <div className="container mx-auto px-4 text-center">
      <h1 className="text-5xl font-bold mb-4 flex justify-center items-center gap-2">
        <HelpCircle className="w-10 h-10" />
        Frequently Asked Questions
      </h1>
      <p className="text-xl max-w-2xl mx-auto mb-8">
        Get answers to your questions about Acadavault, from account setup to
        selling materials and hiring writers.
      </p>
      <div className="max-w-lg mx-auto">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search FAQs..."
            className="w-full px-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search FAQs"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
        </div>
      </div>
    </div>
  </section>
);

const GeneralFAQsSection = ({ searchQuery }) => {
  const faqs = [
    {
      question: "How do I create an account on Acadavault?",
      answer:
        "Click 'Sign Up' on the homepage, enter your email, password, and academic details, then verify your email to get started.",
    },
    {
      question: "What types of materials can I find on Acadavault?",
      answer:
        "You can find lecture notes, research papers, study guides, past questions, and more, all verified for authenticity.",
    },
    {
      question: "How do I purchase materials?",
      answer:
        "Browse materials, select your item, and complete the purchase using our secure payment gateways (Stripe, Paystack).",
    },
    {
      question: "Can I access Acadavault on mobile devices?",
      answer:
        "Yes, Acadavault is fully responsive and available on iOS and Android via our website or mobile apps.",
    },
  ];

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center">
          General Questions
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <details
                key={index}
                className="bg-white rounded-lg p-4 shadow-sm"
              >
                <summary className="font-semibold text-base cursor-pointer">
                  {faq.question}
                </summary>
                <p className="text-gray-700 text-base mt-2">{faq.answer}</p>
              </details>
            ))
          ) : (
            <p className="text-gray-600 text-center">
              No results found for your search.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

const VendorFAQsSection = ({ searchQuery }) => {
  const faqs = [
    {
      question: "Who can become a vendor on Acadavault?",
      answer:
        "Any academic, researcher, or educator with original materials can apply after verifying their identity and qualifications.",
    },
    {
      question: "How much can I earn as a vendor?",
      answer:
        "You keep 70% of each sale. Earnings depend on your pricing and material demand, with no upper limit.",
    },
    {
      question: "What types of materials can I sell?",
      answer:
        "Lecture notes, study guides, research papers, templates, and more, as long as they’re original or authorized.",
    },
    {
      question: "How do I get paid as a vendor?",
      answer:
        "Payouts are processed monthly via Paystack or Stripe to your linked bank account.",
    },
  ];

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center flex items-center justify-center gap-2">
          <Briefcase className="w-8 h-8 text-blue-600" />
          Vendor Questions
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <details
                key={index}
                className="bg-white rounded-lg p-4 shadow-sm"
              >
                <summary className="font-semibold text-base cursor-pointer">
                  {faq.question}
                </summary>
                <p className="text-gray-700 text-base mt-2">{faq.answer}</p>
              </details>
            ))
          ) : (
            <p className="text-gray-600 text-center">
              No results found for your search.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

const WriterFAQsSection = ({ searchQuery }) => {
  const faqs = [
    {
      question: "How do I hire a writer on Acadavault?",
      answer:
        "Click 'Start Your Project' on the Hire Writer page, provide project details, and we’ll match you with a qualified writer.",
    },
    {
      question: "Is the content from writers original?",
      answer:
        "Yes, all content is 100% original and comes with a plagiarism report for verification.",
    },
    {
      question: "Can I communicate with my writer?",
      answer:
        "Yes, you can message your writer anonymously through our secure platform.",
    },
    {
      question: "What if I’m not satisfied with the content?",
      answer:
        "We offer unlimited revisions within 14 days and a money-back guarantee if standards aren’t met.",
    },
  ];

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center flex items-center justify-center gap-2">
          <PenTool className="w-8 h-8 text-blue-600" />
          Hire Writer Questions
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <details
                key={index}
                className="bg-white rounded-lg p-4 shadow-sm"
              >
                <summary className="font-semibold text-base cursor-pointer">
                  {faq.question}
                </summary>
                <p className="text-gray-700 text-base mt-2">{faq.answer}</p>
              </details>
            ))
          ) : (
            <p className="text-gray-600 text-center">
              No results found for your search.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

const SecurityFAQsSection = ({ searchQuery }) => {
  const faqs = [
    {
      question: "How does Acadavault protect my data?",
      answer:
        "We use HTTPS/TLS encryption, GDPR-compliant data handling, and secure payment gateways like Stripe and Paystack.",
    },
    {
      question: "Are purchased materials secure?",
      answer:
        "Yes, materials are watermarked and delivered via secure links to prevent unauthorized sharing.",
    },
    {
      question: "What happens if I find suspicious content?",
      answer:
        "Report it via the material page, and our team will investigate within 24 hours.",
    },
    {
      question: "How can I secure my account?",
      answer:
        "Use a strong password, enable two-factor authentication, and log out from shared devices.",
    },
  ];

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center flex items-center justify-center gap-2">
          <ShieldCheck className="w-8 h-8 text-blue-600" />
          Security Questions
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <details
                key={index}
                className="bg-white rounded-lg p-4 shadow-sm"
              >
                <summary className="font-semibold text-base cursor-pointer">
                  {faq.question}
                </summary>
                <p className="text-gray-700 text-base mt-2">{faq.answer}</p>
              </details>
            ))
          ) : (
            <p className="text-gray-600 text-center">
              No results found for your search.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

const ResourcesSection = () => (
  <section className="py-16">
    <div className="container mx-auto px-4 space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800 text-center flex items-center justify-center gap-2">
        <BookOpen className="w-8 h-8 text-blue-600" />
        Additional Resources
      </h2>
      <p className="text-base text-gray-600 max-w-3xl mx-auto text-center">
        Explore our guides and articles for more help using Acadavault.
      </p>
      <ul className="list-disc list-inside text-base text-gray-700 max-w-3xl mx-auto">
        <li>
          <Link
            href="/blog/getting-started"
            className="text-blue-600 underline"
          >
            Getting Started with Acadavault
          </Link>
        </li>
        <li>
          <Link href="/blog/vendor-guide" className="text-blue-600 underline">
            How to Succeed as a Vendor
          </Link>
        </li>
        <li>
          <Link
            href="/blog/hire-writer-tips"
            className="text-blue-600 underline"
          >
            Tips for Hiring a Writer
          </Link>
        </li>
        <li>
          <Link
            href="/blog/security-best-practices"
            className="text-blue-600 underline"
          >
            Security Best Practices
          </Link>
        </li>
      </ul>
    </div>
  </section>
);

const SupportContactSection = () => (
  <section className="py-16 bg-gray-100">
    <div className="container mx-auto px-4 space-y-6 text-center">
      <h2 className="text-3xl font-semibold text-gray-800 flex items-center justify-center gap-2">
        <Headphones className="w-8 h-8 text-blue-600" />
        Still Have Questions?
      </h2>
      <p className="text-base text-gray-600 max-w-2xl mx-auto">
        Our support team is available 24/7 to assist you.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/contact"
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
    </div>
  </section>
);

const CallToActionSection = () => (
  <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
    <div className="container mx-auto px-4 text-center space-y-6">
      <h2 className="text-4xl font-bold flex justify-center items-center gap-2">
        <HelpCircle className="w-8 h-8" />
        Ready to Explore Acadavault?
      </h2>
      <p className="text-xl max-w-2xl mx-auto">
        Join thousands of students, researchers, and academics using Acadavault
        to access and share trusted academic resources.
      </p>
      <Link
        href="/signup"
        className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold text-lg hover:bg-yellow-500 transition duration-300"
      >
        Get Started Now
      </Link>
    </div>
  </section>
);
