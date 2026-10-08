"use client";

import React, { memo } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaBriefcase,
  FaCheckCircle,
  FaFileAlt,
  FaStar,
} from "react-icons/fa";
import { getWriterTier } from "@/helpers/getWriterTier";
import Avatar from "@/components/common/Avatar";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export const WriterCard = memo(function WriterCard({ writer, onClick }) {
  const { label, color } = getWriterTier(writer);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="min-w-[300px] flex-shrink-0"
    >
      <Card
        clickable
        variant="shadowed"
        theme="neon"
        onClick={() => onClick(writer)}
        className="relative p-6 group"
      >
        {/* Tier Badge */}
        <span
          className={`absolute top-0 right-0 px-2 py-1 text-xs font-bold uppercase rounded-md ${color}`}
        >
          {label}
        </span>

        {/* Profile Avatar & Basic Info */}
        <div className="flex items-center gap-4">
          <Avatar
            src={writer.imageUrl}
            alt={writer.name}
            name={writer.name}
            size="lg"
            className="border-4 border-blue-500"
            fallback=""
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">{writer.name}</h3>
            <p className="text-sm text-blue-300">{writer.specialty}</p>
            <p className="text-xs text-gray-400 italic">
              {writer.expertise.join(", ")}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-400" />
            <span>{writer.rating.toFixed(1)} Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <FaBriefcase className="text-blue-400" />
            <span>{writer.experienceYears} Years</span>
          </div>
          <div className="flex items-center gap-2">
            <FaBookOpen className="text-green-400" />
            <span>{writer.completedProjects}+ Projects</span>
          </div>
          <div className="flex items-center gap-2">
            <FaFileAlt className="text-purple-400" />
            <span>{writer.formatPreferences.join(", ")}</span>
          </div>
        </div>

        {/* Hover CTA */}
        <div className="mt-4 flex gap-4 justify-center text-sm">
          <div className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
            View Profile →
          </div>
          <Link
            href={`/hire-writer/order?writerId=${writer.id}`}
            className="flex items-center gap-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-blue-300"
            onClick={() => {
              if (typeof window.gtag !== "undefined") {
                window.gtag("event", "select_writer", {
                  event_category: "engagement",
                  event_label: writer.name,
                  writer_id: writer.id,
                });
              }
            }}
          >
            <FaCheckCircle size={16} /> Hire Now
          </Link>
        </div>
      </Card>
    </motion.div>
  );
});

WriterCard.propTypes = {
  writer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    specialty: PropTypes.string,
    expertise: PropTypes.arrayOf(PropTypes.string),
    rating: PropTypes.number,
    experienceYears: PropTypes.number,
    completedProjects: PropTypes.number,
    formatPreferences: PropTypes.arrayOf(PropTypes.string),
    imageUrl: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
