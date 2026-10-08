"use client";

import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Card } from "../ui/Card";

// Simulated analytics tracker
const trackFeatureClick = (title) => {
  console.log(`Feature card clicked: ${title}`);
  // Replace with actual analytics tracking logic
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const FeatureCard = React.memo(({ icon: Icon, title, description }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      trackFeatureClick(title);
    }
  };

  return (
    <motion.div
      role="listitem"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        variant="shadowed"
        theme="light"
        clickable
        className="flex flex-col items-center text-center h-full p-5"
        onClick={() => trackFeatureClick(title)}
        onKeyDown={handleKeyPress}
        aria-label={`Feature: ${title}`}
      >
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon size={48} className="text-blue-600 mb-4" aria-hidden="true" />
        </motion.div>
        <h3 className="text-lg font-semibold text-blue-900 mb-1">{title}</h3>
        <p className="text-gray-700 text-sm">{description}</p>
      </Card>
    </motion.div>
  );
});

FeatureCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default FeatureCard;
