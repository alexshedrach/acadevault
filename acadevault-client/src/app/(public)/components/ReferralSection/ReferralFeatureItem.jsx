"use client";

import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

/**
 * Renders a single feature card with entry animation.
 *
 * @param {Object} props
 * @param {string} props.title - Title of the feature.
 * @param {string} props.description - Detailed description text.
 */
export default function ReferralFeatureItem({ title, description }) {
  return (
    <motion.div
      className="p-6 bg-gray-600 rounded-lg shadow-lg text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
}

ReferralFeatureItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
