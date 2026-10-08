"use client";

import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { BadgePercent, Clock, Star, Verified } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: BadgePercent,
    title: "Unbeatable Discounts",
    description:
      "Save up to 60% on premium academic resources, from e-books to research papers.",
  },
  {
    icon: Verified,
    title: "Verified Content",
    description:
      "All materials are rigorously reviewed for quality and authenticity.",
  },
  {
    icon: Star,
    title: "Top-Rated Resources",
    description: "Trusted by thousands of students and educators worldwide.",
  },
  {
    icon: Clock,
    title: "Limited-Time Offers",
    description:
      "Grab exclusive deals before they expire to maximize your savings.",
  },
];

// Reusable FeatureCard component
const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.li
    className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    role="listitem"
    aria-label={title}
  >
    <Icon className="w-10 h-10 mb-4 text-blue-600" aria-hidden="true" />
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </motion.li>
);

FeatureCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const WhyChooseDealsSection = () => {
  return (
    <section className="py-20 bg-gray-50" aria-labelledby="why-choose-deals">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2
            id="why-choose-deals"
            className="text-4xl font-bold text-gray-900 bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"
          >
            Why Choose AcadeVault Deals?
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover premium academic resources at unbeatable prices, trusted by
            students and educators worldwide.
          </p>
        </motion.div>
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          role="list"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhyChooseDealsSection;
