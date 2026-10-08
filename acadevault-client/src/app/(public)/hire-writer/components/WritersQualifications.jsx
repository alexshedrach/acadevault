"use client";

import React, { cloneElement, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";
import { writerQualifications } from "@/data/writerQualifications";
import Container from "@/components/layout/Container";

const listVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function WritersQualificationsMinimal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      console.log(`Selected qualification: ${id}`);
      // Optional: Add action, e.g., focus or trigger selection
    }
  };

  return (
    <Container
      as="section"
      background="white"
      ref={ref}
      className="py-16 px-0 sm:px-8"
      aria-labelledby="writer-qualifications"
    >
      <SectionHeader
        title="Our Writers’ Qualifications"
        description="Expert academics with rigorous vetting precision, insight, and integrity in every paper."
        icon={<Users className="w-8 h-8 text-gray-700" />}
        size="xl"
        animate
        className="mb-12"
      />

      <motion.ul
        role="list"
        variants={listVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {writerQualifications.map((q) => (
          <motion.li
            key={q.id}
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, q.id)}
            role="group"
            aria-labelledby={`qual-title-${q.id}`}
            variants={itemVariants}
            className="flex items-start space-x-4 p-4 bg-white rounded-lg hover:shadow-md focus:shadow-md focus:outline-none transition-shadow"
          >
            <div className="text-indigo-600 mt-1">
              {cloneElement(q.icon, { size: 24, className: "text-indigo-600" })}
            </div>
            <div>
              <h3
                id={`qual-title-${q.id}`}
                className="text-lg font-bold text-gray-900"
              >
                {q.title}
              </h3>
              <p className="mt-1 text-gray-600 text-base">{q.description}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </Container>
  );
}
