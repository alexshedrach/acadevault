"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import {
  DollarSign,
  Star,
  ShieldCheck,
  Headphones,
  CheckCircle,
  ArrowRight,
  Briefcase,
  BookOpen,
} from "lucide-react";
import { Typewriter } from "react-simple-typewriter";

// Animation Variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
  hover: { scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" },
};

// Earning Potential Subsection
const EarningPotentialSubsection = () => {
  const [price, setPrice] = useState(20);
  const royalty = (price * 0.7).toFixed(2);
  const monthlySales = 50;
  const potentialEarnings = (royalty * monthlySales).toFixed(2);

  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-xl shadow-lg p-8"
    >
      <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-4">
        <DollarSign className="w-8 h-8 text-indigo-600" />
        Maximize Your Earning Potential
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mb-6">
        Set your own prices and earn up to 70% commission on every sale. With
        Acadevault’s global reach, your materials can generate consistent
        passive income.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div
          variants={cardVariants}
          custom={0}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="p-6 bg-gray-50 rounded-lg"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Flexible Pricing
          </h3>
          <p className="text-gray-600">
            Choose prices from $5 for study guides to $100 for comprehensive
            courses. Adjust based on content complexity and academic level.
          </p>
        </motion.div>
        <motion.div
          variants={cardVariants}
          custom={1}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="p-6 bg-gray-50 rounded-lg"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            High Commissions
          </h3>
          <p className="text-gray-600">
            Earn 70% royalties on each sale, with transparent payouts processed
            monthly via secure gateways like Paystack or Stripe.
          </p>
        </motion.div>
      </div>
      <div className="bg-indigo-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Estimate Your Earnings
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <label htmlFor="price-slider" className="text-gray-700 font-medium">
            Set Price: ${price}
          </label>
          <input
            id="price-slider"
            type="range"
            min="5"
            max="100"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full sm:w-1/2 accent-indigo-600"
            aria-label="Select material price"
          />
        </div>
        <p className="text-gray-600 mt-4">
          At ${price} per sale, with 50 monthly sales, you could earn{" "}
          <span className="font-bold text-indigo-600">
            ${potentialEarnings}
          </span>{" "}
          per month.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6"
        >
          <Link
            href="/vendor-dashboard/payments"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full font-semibold text-lg shadow-lg hover:from-indigo-700 hover:to-blue-700 transition duration-300"
            aria-label="Explore payment options"
          >
            <DollarSign className="mr-2 w-5 h-5" />
            Explore Payment Options
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Success Stories Subsection (Carousel)
const SuccessStoriesSubsection = () => {
  const stories = [
    {
      quote:
        "Selling my lecture notes on Acadevault has been a game-changer. I’ve earned over $2,000 in passive income this year!",
      author: "Dr. Ngozi Adebayo",
      title: "Lecturer, University of Lagos",
      avatar: "/images/avatars/ngozi.jpg",
      earnings: "$2,000+",
    },
    {
      quote:
        "Acadevault’s platform made it easy to share my research guides globally. The support team is fantastic!",
      author: "Prof. James Carter",
      title: "Researcher, University of Oxford",
      avatar: "/images/avatars/james.jpg",
      earnings: "$1,500+",
    },
    {
      quote:
        "I turned my thesis into a study guide and reached thousands of students. Acadevault is a lifesaver!",
      author: "Sarah Kim",
      title: "PhD Candidate, MIT",
      avatar: "/images/avatars/sarah.jpg",
      earnings: "$3,000+",
    },
  ];

  const [currentStory, setCurrentStory] = useState(0);

  const nextStory = () =>
    setCurrentStory((prev) => (prev + 1) % stories.length);
  const prevStory = () =>
    setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);

  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="bg-gray-100 rounded-xl shadow-lg p-8"
    >
      <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-4">
        <Star className="w-8 h-8 text-yellow-500" />
        Vendor Success Stories
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mb-6">
        Hear from educators and researchers who have transformed their expertise
        into income with Acadevault.
      </p>
      <div className="relative">
        <motion.div
          key={currentStory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg p-6 shadow-md flex flex-col sm:flex-row items-center gap-6"
        >
          <div className="w-24 h-24 relative">
            <Image
              src={stories[currentStory].avatar}
              alt={`${stories[currentStory].author} avatar`}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="italic text-gray-600 mb-4">
              "{stories[currentStory].quote}"
            </p>
            <p className="font-semibold text-gray-900">
              - {stories[currentStory].author}, {stories[currentStory].title}
            </p>
            <p className="text-sm text-indigo-600 mt-2">
              Earnings: {stories[currentStory].earnings}
            </p>
          </div>
        </motion.div>
        <div className="flex justify-between mt-4">
          <button
            onClick={prevStory}
            className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
            aria-label="Previous story"
          >
            <ArrowRight className="w-5 h-5 transform rotate-180" />
          </button>
          <button
            onClick={nextStory}
            className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
            aria-label="Next story"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Security & Trust Subsection
const SecurityTrustSubsection = () => {
  const securityFeatures = [
    {
      title: "Watermarking Protection",
      description:
        "Each material is watermarked to prevent unauthorized sharing and protect your intellectual property.",
      icon: <ShieldCheck className="w-6 h-6 text-indigo-600" />,
    },
    {
      title: "Secure Payments",
      description:
        "Payouts are processed via trusted gateways like Paystack and Stripe, ensuring fast and secure transactions.",
      icon: <CheckCircle className="w-6 h-6 text-indigo-600" />,
    },
    {
      title: "Plagiarism Checks",
      description:
        "All uploads undergo rigorous plagiarism checks using tools like Turnitin to ensure originality.",
      icon: <CheckCircle className="w-6 h-6 text-indigo-600" />,
    },
    {
      title: "GDPR Compliance",
      description:
        "Your personal and financial data is protected with GDPR-compliant security measures.",
      icon: <CheckCircle className="w-6 h-6 text-indigo-600" />,
    },
  ];

  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-xl shadow-lg p-8"
    >
      <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-4">
        <ShieldCheck className="w-8 h-8 text-indigo-600" />
        Security & Trust
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mb-6">
        Your materials and earnings are safeguarded with industry-leading
        security measures, ensuring peace of mind.
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {securityFeatures.map((feature, idx) => (
          <motion.li
            key={idx}
            variants={cardVariants}
            custom={idx}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
          >
            <motion.span
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
            >
              {feature.icon}
            </motion.span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </motion.li>
        ))}
      </ul>
      <div className="mt-6 flex justify-center gap-4">
        <img
          src="/media/logo1.png"
          alt="Paystack Badge"
          className="h-12"
        />
        <img
          src="/media/stripe.png"
          alt="Stripe Badge"
          className="h-12"
        />
        <img
          src="/media/gdpr.jpg"
          alt="GDPR Badge"
          className="h-12"
        />
      </div>
    </motion.div>
  );
};

// Vendor Support Subsection
const VendorSupportSubsection = () => {
  const supportOptions = [
    {
      title: "Onboarding Guides",
      description:
        "Access detailed tutorials and step-by-step guides to start selling quickly and effectively.",
      icon: <BookOpen className="w-8 h-8 text-indigo-600" />,
    },
    {
      title: "24/7 Support",
      description:
        "Reach our dedicated support team via email, live chat, or phone anytime you need assistance.",
      icon: <Headphones className="w-8 h-8 text-indigo-600" />,
    },
    {
      title: "Analytics Dashboard",
      description:
        "Monitor sales, views, and performance metrics in real-time with our intuitive vendor dashboard.",
      icon: <CheckCircle className="w-8 h-8 text-indigo-600" />,
    },
  ];

  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="bg-gray-100 rounded-xl shadow-lg p-8"
    >
      <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-4">
        <Headphones className="w-8 h-8 text-indigo-600" />
        Dedicated Vendor Support
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mb-6">
        Our team is here to ensure your success with comprehensive resources and
        responsive support.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {supportOptions.map((option, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            custom={idx}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="p-6 bg-white rounded-lg text-center"
          >
            <div className="flex justify-center mb-4">{option.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {option.title}
            </h3>
            <p className="text-gray-600">{option.description}</p>
          </motion.div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Preview Your Dashboard
        </h3>
        <div className="relative h-64">
          <Image
            src="/images/bg-img-1.jpg"
            alt="Vendor dashboard preview"
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6"
        >
          <Link
            href="/vendor-dashboard"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full font-semibold text-lg shadow-lg hover:from-indigo-700 hover:to-blue-700 transition duration-300"
            aria-label="Explore vendor dashboard"
          >
            <CheckCircle className="mr-2 w-5 h-5" />
            Explore Dashboard
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Main Vendor Advantages Section
export default function VendorAdvantagesSection() {
  return (
    <section
      className="py-20 bg-gradient-to-b from-gray-50 to-gray-100"
      role="region"
      aria-labelledby="vendor-advantages-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2
            id="vendor-advantages-heading"
            className="text-4xl sm:text-5xl font-bold text-gray-900 flex items-center justify-center gap-3"
          >
            <Briefcase className="w-10 h-10 text-indigo-600" />
            Why Choose Acadevault as a Vendor?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
            <Typewriter
              words={[
                "Unlock unparalleled earning potential.",
                "Join a trusted global academic platform.",
                "Benefit from world-class support and security.",
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 auto-rows-fr">
          <div className="lg:col-span-2">
            <EarningPotentialSubsection />
          </div>
          <SuccessStoriesSubsection />
          <SecurityTrustSubsection />
          <div className="lg:col-span-2">
            <VendorSupportSubsection />
          </div>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 text-center"
        >
          <Link
            href="/sell-on-acadevault/register"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full font-semibold text-xl shadow-lg hover:from-indigo-700 hover:to-blue-700 transition duration-300"
            aria-label="Start selling on Acadevault"
          >
            <Briefcase className="mr-2 w-6 h-6" />
            Start Selling Today
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
