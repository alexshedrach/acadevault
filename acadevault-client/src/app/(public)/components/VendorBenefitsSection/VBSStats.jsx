// VBSStats.jsx
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { easeOutQuad } from "@/utils/easings";
import Counter from "@/components/ui/Counter";

export default function VBSStats() {
  const [activeVendors, setActiveVendors] = useState(0);
  const [listedMaterials, setListedMaterials] = useState(0);
  const [monthlySales, setMonthlySales] = useState(0);

  // Simulate async load
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveVendors(5_325);
      setListedMaterials(10_420);
      setMonthlySales(18_730);
    }, 1_000);

    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      label: "Active Vendors",
      value: activeVendors,
      colorScheme: "green",
      variant: "solid",
      delay: 500,
      duration: 3_000,
      easing: easeOutQuad,
    },
    {
      label: "Materials Listed",
      value: listedMaterials,
      colorScheme: "blue",
      variant: "outline",
      formatValue: (v) => v.toLocaleString() + "+",
      delay: 700,
      duration: 3_500,
      easing: easeOutQuad,
    },
    {
      label: "Monthly Sales Volume",
      value: monthlySales,
      colorScheme: "pink",
      variant: "ghost",
      prefix: "$",
      delay: 900,
      duration: 3_000,
      easing: easeOutQuad,
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 mb-12">
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-60"
        >
          <Counter
            // === CORE ANIMATION PROPS ===
            value={stat.value} // → `to`
            from={0} // → `from` (you can omit since default is 0)
            duration={stat.duration}
            delay={stat.delay}
            easing={stat.easing}
            // pauseOnHover is `true` by default—feel free to disable if needed

            // === VISUAL & ACCESSIBILITY ===
            label={stat.label}
            prefix={stat.prefix}
            suffix={stat.suffix}
            formatValue={stat.formatValue}
            variant={stat.variant}
            colorScheme={stat.colorScheme}
            size="md"
            loading={stat.value === 0}
            ariaLabel={`${stat.label} statistic`}
          />
        </motion.div>
      ))}
    </div>
  );
}
