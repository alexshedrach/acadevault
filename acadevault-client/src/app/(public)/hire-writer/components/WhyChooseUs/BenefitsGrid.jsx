import React from "react";
import { motion } from "framer-motion";
import { WritersBenefitCard } from "./WritersBenefitsCard";


// BenefitsGrid: Handles grid layout and rendering of all benefit cards
const BenefitsGrid = ({benefitsData, containerVariants, controls }) => {
  // GroupedBenefits: Responsible for logically grouping benefits by their category
  const groupedBenefits = benefitsData.reduce((acc, benefit) => {
    acc[benefit.group] = acc[benefit.group] || [];
    acc[benefit.group].push(benefit);
    return acc;
  }, {});

  let cardIndex = 0;

  return (
    <motion.ul
      className="grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-3 auto-rows-fr max-w-6xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      role="list"
    >
      {Object.entries(groupedBenefits).flatMap(([group, benefits]) =>
        benefits.map((benefit) => {
          const currentIndex = cardIndex++;
          return (
            <WritersBenefitCard
              key={`${group}-${currentIndex}`}
              title={benefit.title}
              description={benefit.description}
              icon={benefit.icon}
              index={currentIndex}
              tooltip={benefit.tooltip}
              size={benefit.size}
            />
          );
        })
      )}
    </motion.ul>
  );
};

export default BenefitsGrid;
