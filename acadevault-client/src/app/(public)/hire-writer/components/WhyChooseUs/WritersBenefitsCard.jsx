"use client";

import Tooltip from "@/components/ui/Tooltip";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

// Reusable Benefit Card Component
export const WritersBenefitCard = ({
  title,
  description,
  icon,
  index,
  tooltip,
  size = "regular",
}) => {
  const isLarge = size === "large";

  return (
    <motion.li
      initial={{
        opacity: 0,
        y: index % 2 === 0 ? 30 : -30,
        rotate: isLarge ? -2 : 2,
      }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      viewport={{ once: true }}
      className={cn(
        "relative bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-indigo-50/50 group cursor-pointer h-fit",
        isLarge ? "col-span-1 sm:col-span-2" : "col-span-1"
      )}
      role="listitem"
      tabIndex={0}
      aria-label={title}
      aria-describedby={`tooltip-${index}`}
      data-benefit={title.toLowerCase().replace(/\s/g, "-")}
    >
      <Tooltip
        id={`tooltip-${index}`}
        content={<span className="font-medium">{tooltip}</span>}
        trigger="hover"
        position="top"
        delay={150}
        size='lg'
        dismissOnClickOutside={true}
        arrowSize="w-3 h-3"
      >
        <div className="relative flex items-start gap-4">
          <motion.div
            className="text-indigo-600 text-3xl sm:text-4xl shrink-0"
            whileHover={{ scale: 1.2, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-indigo-900 mb-2">
              {title}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </Tooltip>
    </motion.li>
  );
};
