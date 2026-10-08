"use client";

import { generatePageMetadata } from "@/utils/generatePageMetadata";
import Link from "next/link";
import { useState } from "react";
import {
  HelpCircle,
  Search,
  BookOpen,
  Headphones,
  MessageSquare,
  FileText,
  PlayCircle,
  Briefcase,
  PenTool,
  DollarSign,
} from "lucide-react";
import Navbar from "@/components/header/Navbar";

// export const metadata = generatePageMetadata({
//   title: "Help Center",
//   description:
//     "Get support for using Acadavault, from account setup to selling materials, hiring writers, and more. Access guides, contact support, or explore our community.",
//   slug: "help-center",
//   image: "https://acadevault.com/images/help-center-og.jpg",
// });

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Navbar showSearch showCategories />
      <HelpCenterHeroSection
        searchQuery={searchQuery}
        handleSearch={handleSearch}
      />
      <HelpTopicsSection />
      <PopularArticlesSection searchQuery={searchQuery} />
      <ContactSupportSection />
      <CommunitySupportSection />
      <GuidesTutorialsSection />
      <FAQLinkSection />
      <CallToActionSection />
    </>
  );
}

const HelpCenterHeroSection = ({ searchQuery, handleSearch }) => (
  <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
    <div className="container mx-auto px-4 text-center">
      <h1 className="text-5xl font-bold mb-4 flex justify-center items-center gap-2">
        <HelpCircle className="w-10 h-10" />
        Acadavault Help Center
      </h1>
      <p className="text-xl max-w-2xl mx-auto mb-8">
        Find answers, guides, and support to make the most of Acadavault’s
        academic resources.
      </p>
      <div className="max-w-lg mx-auto">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search help articles..."
            className="w-full px-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search help articles"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
        </div>
      </div>
    </div>
  </section>
);

const HelpTopicsSection = () => {
  const topics = [
    {
      title: "Getting Started",
      description: "Learn how to set up your account and navigate Acadavault.",
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      link: "/help-center/topics/getting-started",
    },
    {
      title: "Selling as a Vendor",
      description:
        "Guides for uploading and monetizing your academic materials.",
      icon: <Briefcase className="w-8 h-8 text-blue-600" />,
      link: "/help-center/topics/vendors",
    },
    {
      title: "Hiring a Writer",
      description:
        "Understand how to hire professional writers for custom content.",
      icon: <PenTool className="w-8 h-8 text-blue-600" />,
      link: "/help-center/topics/hire-writer",
    },
    {
      title: "Billing & Payments",
      description: "Manage purchases, payouts, and payment issues.",
      icon: <DollarSign className="w-8 h-8 text-blue-600" />,
      link: "/help-center/topics/billing",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center">
          Explore Help Topics
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {topics.map((topic, index) => (
            <Link
              key={index}
              href={topic.link}
              className="block p-6 bg-white rounded-lg shadow-md hover:bg-gray-50 transition duration-300"
            >
              <div className="mb-4">{topic.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
              <p className="text-gray-600">{topic.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const PopularArticlesSection = ({ searchQuery }) => {
  const articles = [
    {
      title: "How to Create an Acadavault Account",
      description:
        "Step-by-step guide to signing up and verifying your account.",
      link: "/help-center/articles/create-account",
    },
    {
      title: "Uploading Materials as a Vendor",
      description: "Learn how to upload and manage your academic materials.",
      link: "/help-center/articles/upload-materials",
    },
    {
      title: "How to Hire a Writer",
      description: "Understand the process of hiring a professional writer.",
      link: "/help-center/articles/hire-writer",
    },
    {
      title: "Securing Your Account",
      description: "Best practices for keeping your Acadavault account safe.",
      link: "/help-center/articles/secure-account",
    },
  ];

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center">
          Popular Help Articles
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, index) => (
              <Link
                key={index}
                href={article.link}
                className="block p-6 bg-white rounded-lg shadow-md hover:bg-gray-50 transition duration-300"
              >
                <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                <p className="text-gray-600">{article.description}</p>
              </Link>
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

const ContactSupportSection = () => (
  <section className="py-16">
    <div className="container mx-auto px-4 space-y-6 text-center">
      <h2 className="text-3xl font-semibold text-gray-800 flex items-center justify-center gap-2">
        <Headphones className="w-8 h-8 text-blue-600" />
        Contact Our Support Team
      </h2>
      <p className="text-base text-gray-600 max-w-2xl mx-auto">
        Can’t find what you’re looking for? Our support team is available 24/7
        to assist you.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/contact"
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
        >
          Submit a Ticket
        </Link>
        <a
          href="mailto:support@acadevault.com"
          className="bg-green-400 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-500 transition duration-300"
        >
          Email Support
        </a>
        <button
          className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition duration-300"
          onClick={() => alert("Live chat coming soon!")} // Replace with actual live chat integration
        >
          Live Chat
        </button>
      </div>
    </div>
  </section>
);

const CommunitySupportSection = () => (
  <section className="py-16 bg-gray-100">
    <div className="container mx-auto px-4 space-y-6 text-center">
      <h2 className="text-3xl font-semibold text-gray-800 flex items-center justify-center gap-2">
        <MessageSquare className="w-8 h-8 text-blue-600" />
        Community Support
      </h2>
      <p className="text-base text-gray-600 max-w-2xl mx-auto">
        Join our community to share tips, ask questions, and connect with other
        academics.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/community/forums"
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
        >
          Visit Forums
        </Link>
        <a
          href="https://discord.gg/acadevault"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-700 transition duration-300"
        >
          Join Discord
        </a>
      </div>
    </div>
  </section>
);

const GuidesTutorialsSection = () => (
  <section className="py-16">
    <div className="container mx-auto px-4 space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800 text-center flex items-center justify-center gap-2">
        <PlayCircle className="w-8 h-8 text-blue-600" />
        Guides & Tutorials
      </h2>
      <p className="text-base text-gray-600 max-w-3xl mx-auto text-center">
        Explore our in-depth guides and video tutorials to master Acadavault’s
        features.
      </p>
      <ul className="list-disc list-inside text-base text-gray-700 max-w-3xl mx-auto">
        <li>
          <Link
            href="/help-center/guides/account-setup"
            className="text-blue-600 underline"
          >
            Setting Up Your Acadavault Account
          </Link>
        </li>
        <li>
          <Link
            href="/help-center/guides/vendor-upload"
            className="text-blue-600 underline"
          >
            Uploading Materials as a Vendor
          </Link>
        </li>
        <li>
          <Link
            href="/help-center/guides/hire-writer"
            className="text-blue-600 underline"
          >
            Hiring a Professional Writer
          </Link>
        </li>
        <li>
          <Link
            href="/help-center/guides/secure-payments"
            className="text-blue-600 underline"
          >
            Understanding Secure Payments
          </Link>
        </li>
      </ul>
    </div>
  </section>
);

const FAQLinkSection = () => (
  <section className="py-16 bg-gray-100">
    <div className="container mx-auto px-4 space-y-6 text-center">
      <h2 className="text-3xl font-semibold text-gray-800 flex items-center justify-center gap-2">
        <FileText className="w-8 h-8 text-blue-600" />
        Quick Answers
      </h2>
      <p className="text-base text-gray-600 max-w-2xl mx-auto">
        Browse our FAQs for quick answers to common questions.
      </p>
      <Link
        href="/faq"
        className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
      >
        Visit FAQs
      </Link>
    </div>
  </section>
);

const CallToActionSection = () => (
  <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
    <div className="container mx-auto px-4 text-center space-y-6">
      <h2 className="text-4xl font-bold flex justify-center items-center gap-2">
        <HelpCircle className="w-8 h-8" />
        Ready to Get Started?
      </h2>
      <p className="text-xl max-w-2xl mx-auto">
        Join Acadavault to access trusted academic resources, sell materials, or
        hire expert writers.
      </p>
      <Link
        href="/signup"
        className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold text-lg hover:bg-yellow-500 transition duration-300"
      >
        Join Acadavault Now
      </Link>
    </div>
  </section>
);
