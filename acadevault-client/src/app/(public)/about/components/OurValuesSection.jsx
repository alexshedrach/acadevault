"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiChevronRight } from "react-icons/fi";
import useAnalytics from "@/hooks/useAnalytics";
import OverlayPattern from "@/components/common/OverlayPattern";
import BackgroundGraphic from "@/components/common/BackgroundGraphic";

export default function OurValuesSection() {
  const { trackEvent } = useAnalytics();
  const [values, setValues] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setValues([
        {
          icon: "/icons/innovation.svg",
          title: "Innovation",
          desc: "We embrace fresh ideas and breakthrough technologies to lead the way forward.",
          learnMoreHref: "/about#innovation",
        },
        {
          icon: "/icons/collaboration.svg",
          title: "Collaboration",
          desc: "We thrive on the power of teamwork, partnerships, and shared success.",
          learnMoreHref: "/about#collaboration",
        },
        {
          icon: "/icons/accessibility.svg",
          title: "Accessibility",
          desc: "We make knowledge and resources easily accessible for everyone, everywhere.",
          learnMoreHref: "/about#accessibility",
        },
        {
          icon: "/icons/integrity.svg",
          title: "Integrity",
          desc: "We uphold the highest standards of honesty, accountability, and transparency.",
          learnMoreHref: "/about#integrity",
        },
      ]);
    }, 500);
  }, []);

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80 },
    },
  };

  if (!values) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Values</h2>
          <p className="text-gray-500">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      aria-labelledby="values-heading"
      className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 py-20"
    >
      {/* Background Graphic */}
      <BackgroundGraphic
        position="bottom"
        height="h-full"
        paths={[
          {
            d: "M0,160L48,176C96,192,192,224,288,208C384,192,480,128,576,122.7C672,117,768,160,864,160C960,160,1056,117,1152,106.7C1248,96,1344,117,1392,128L1440,138.7L1440,320L0,320Z",
            fill: "#ffffff",
            opacity: 0.3,
          },
        ]}
        svgClasses=""
        wrapperClasses="pointer-events-none"
      />

      {/* Overlay Pattern */}
      <OverlayPattern
        patternColor="white"
        dotRadius={2}
        patternSize={40}
        opacity={0.12}
        zIndex="z-10"
      />

      <div className="container mx-auto px-4 relative z-20">
        <h2
          id="values-heading"
          className="text-4xl font-bold mb-16 text-center text-white"
        >
          Our Core Values
        </h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {values.map((v) => (
            <motion.article
              key={v.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg p-6 flex flex-col items-center text-center shadow hover:shadow-lg transition-all"
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                className="relative w-16 h-16 mb-4"
              >
                <Image
                  src={v.icon}
                  alt={`${v.title} icon`}
                  fill
                  sizes="64px"
                  className="object-contain"
                  placeholder="blur"
                  blurDataURL="/images/blur-icon.svg"
                />
              </motion.div>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {v.title}
              </h3>
              <p className="text-gray-600 mb-6">{v.desc}</p>

              {v.learnMoreHref && (
                <a
                  href={v.learnMoreHref}
                  onClick={() =>
                    trackEvent("Values:learn_more", { value: v.title })
                  }
                  className="mt-auto inline-flex items-center text-blue-600 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                >
                  Learn More <FiChevronRight className="ml-1" />
                </a>
              )}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
