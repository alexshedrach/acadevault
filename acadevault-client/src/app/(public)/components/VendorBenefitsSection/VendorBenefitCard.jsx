"use client";

import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

/**
 * Single benefit card with icon, title, and bullet points.
 * Uses a gradient background defined via props.bgFrom → props.bgTo.
 *
 * @param {Object} props
 * @param {Object} props.benefit - Contains icon, title, points, bgFrom, bgTo.
 *        e.g. {
 *          icon: <Users />,
 *          title: "Massive Academic Audience",
 *          points: ["✔ Point1", "✔ Point2", ...],
 *          bgFrom: "from-orange-500",
 *          bgTo: "to-orange-600"
 *        }
 */
export default function VendorBenefitCard({ benefit }) {
  const { icon, title, points, bgFrom, bgTo } = benefit;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={`rounded-xl shadow-lg overflow-hidden bg-gradient-to-br ${bgFrom} ${bgTo} text-white flex flex-col`}
    >
      <div className="p-8 flex-1 flex flex-col">
        {/* Icon + Title Row */}
        <div className="flex items-center gap-3 mb-4">
          {icon}
          <h3 className="text-2xl font-semibold">{title}</h3>
        </div>

        {/* Bullet Points */}
        <ul className="space-y-2 text-sm opacity-90 flex-1">
          {points.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

VendorBenefitCard.propTypes = {
  benefit: PropTypes.shape({
    icon: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    points: PropTypes.arrayOf(PropTypes.string).isRequired,
    bgFrom: PropTypes.string.isRequired,
    bgTo: PropTypes.string.isRequired,
  }).isRequired,
};
