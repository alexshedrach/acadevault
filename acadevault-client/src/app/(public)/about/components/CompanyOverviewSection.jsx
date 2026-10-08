"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRightIcon, UsersIcon } from "lucide-react";
import { BiGlobeAlt } from "react-icons/bi";
import { HiDocumentText } from "react-icons/hi2";
import Link from "next/link";

const stats = [
  { icon: UsersIcon, value: "10,000+", label: "Active Users" },
  { icon: BiGlobeAlt, value: "100+", label: "Countries Served" },
  { icon: HiDocumentText, value: "50,000+", label: "Resources Shared" },
];

const timelineEvents = [
  { year: 2020, event: "AcadeVault founded as a passion project" },
  { year: 2022, event: "Launched first public beta" },
  { year: 2023, event: "Reached 10,000 users globally" },
  { year: 2025, event: "Introduced AI-powered research tools" },
];

const CompanyOverviewSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
      aria-labelledby="company-overview"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            id="company-overview"
            className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
          >
            Our Journey at AcadeVault
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Empowering researchers worldwide to collaborate, share, and innovate
            since 2020.
          </p>
        </motion.div> */}

        {/* Main Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center"
        >
          {/* Text Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-3xl font-semibold text-blue-600 mb-4">
              Our Story
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Founded in 2020, AcadeVault began as a passion project to solve
              the challenges researchers faced in managing and sharing academic
              resources. From a simple repository, we’ve grown into a global
              platform serving over 10,000 users across 100+ countries.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              Our mission is to democratize knowledge and foster
              interdisciplinary collaboration. By leveraging cutting-edge AI,
              cloud technology, and user-centric design, we’re making academic
              work more efficient, accessible, and impactful.
              <Link
                href="/about"
                className="text-indigo-600 font-semibold hover:bg-indigo-700 transition-colors duration-300 ml-2"
              >
                <span className="inline-flex items-center">
                  Learn More
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </span>
              </Link>
            </p>
          </motion.div>

          {/* Image Content */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative w-full h-[400px]">
              <Image
                src="/images/acadevault-logo.png"
                alt="AcadeVault team collaborating in a modern office"
                fill
                className="object-contain"
                placeholder="blur"
                blurDataURL="/images/blur-placeholder.png"
                priority
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div> */}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyOverviewSection;
