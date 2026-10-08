"use client";

import React from "react";
import Link from "next/link";
import { Tag } from "lucide-react";
import { motion } from "framer-motion";
import Tooltip from "@/components/ui/Tooltip";

const TagsSection = ({
  material,
  title = "Explore Related Topics",
  icon = <Tag className="w-5 h-5 text-blue-600" />,
  className = "",
  emptyText = "No related tags available for this material.",
}) => {
  const tags = material?.tags || [];

  return (
    <section
      className={`my-8 ${className}`}
      aria-labelledby="related-tags-heading"
    >
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3
          id="related-tags-heading"
          className="text-xl font-semibold text-gray-800"
        >
          {title}
        </h3>
      </div>

      {tags.length > 0 ? (
        <motion.ul
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {tags.map((tag, index) => (
            <motion.li
              key={tag + index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Tooltip content={`Explore more materials about "${tag}"`}>
                <Link
                  href={`/materials?tag=${encodeURIComponent(tag)}`}
                  className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors duration-200 border border-blue-100 shadow-sm"
                  title={`View more materials related to "${tag}"`}
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span className="capitalize">{tag}</span>
                </Link>
              </Tooltip>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <p className="text-gray-400 italic text-sm">{emptyText}</p>
      )}
    </section>
  );
};

export default TagsSection;
