"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import {
  FiUsers,
  FiBookOpen,
  FiAward,
  FiSquare,
  FiTrendingUp,
} from "react-icons/fi";
import useAnalytics from "@/hooks/useAnalytics";
import OverlayPattern from "@/components/common/OverlayPattern";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);


export default function AchievementsSection() {
  const { trackEvent } = useAnalytics();
  const [stats, setStats] = useState(null);

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    setTimeout(() => {
      setStats([
        {
          id: "users",
          label: "Registered Users",
          value: 500000,
          icon: <FiUsers />,
          tooltip: "Total number of active accounts",
        },
        {
          id: "partners",
          label: "University Partners",
          value: 120,
          icon: <FiBookOpen />,
          tooltip: "Institutions collaborating with us",
        },
        {
          id: "awards",
          label: "EdTech Awards",
          value: "Best Startup 2024",
          icon: <FiAward />,
          tooltip: "Recognitions received by AcadeVault",
        },
        {
          id: "features",
          label: "Press Features",
          value: 15,
          icon: <FiSquare />,
          tooltip: "Major media outlets covering us",
        },
        {
          id: "growth",
          label: "Yearly Growth",
          value: 75,
          icon: <FiTrendingUp />,
          tooltip: "Year-over-year growth rate (%)",
          chartData: [20, 35, 50, 65, 75],
        },
      ]);
    }, 400);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120 },
    },
  };

  useEffect(() => {
    if (inView) trackEvent("Achievements:in_view", {});
  }, [inView, trackEvent]);

  if (!stats) {
    return (
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Our Achievements
          </h2>
          <p className="text-gray-600">Loading metrics…</p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      aria-labelledby="achievements-heading"
      className="relative py-16 bg-gradient-to-br from-blue-100 to-indigo-50 overflow-hidden"
    >
      {/* Background Pattern */}
      <OverlayPattern
        patternColor="blue"
        dotRadius={1.5}
        patternSize={32}
        opacity={0.1}
        zIndex="z-0"
      />

      <div className="container mx-auto px-4 text-center relative z-10">
        <h2
          id="achievements-heading"
          className="text-3xl font-bold mb-12 text-blue-800"
        >
          Our Achievements
        </h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              className="relative bg-white rounded-xl p-8 flex flex-col items-center shadow hover:shadow-lg transition-transform hover:scale-105"
              role="group"
              aria-describedby={`${stat.id}-desc`}
            >
              <div
                className="flex items-center justify-center mb-4 text-indigo-600 text-5xl"
                aria-hidden="true"
              >
                {stat.icon}
              </div>
              <div className="text-4xl font-extrabold text-gray-900 mb-2">
                {typeof stat.value === "number" ? (
                  <CountUp
                    end={stat.value}
                    duration={2}
                    separator=","
                    onEnd={() =>
                      trackEvent("Achievements:countup_end", { id: stat.id })
                    }
                  />
                ) : (
                  stat.value
                )}
                {typeof stat.value === "number" && stat.id === "growth" && (
                  <span className="ml-1 text-indigo-600">%</span>
                )}
              </div>
              <p
                id={`${stat.id}-desc`}
                className="text-lg text-gray-700 font-medium mb-2"
              >
                {stat.label}
              </p>

              {stat.tooltip && (
                <p className="text-sm text-gray-500">{stat.tooltip}</p>
              )}

              {stat.chartData && (
                <div className="mt-4 w-full h-28">
                  <Line
                    data={{
                      labels: ["Q1", "Q2", "Q3", "Q4", "Current"],
                      datasets: [
                        {
                          label: "Growth",
                          data: stat.chartData,
                          borderColor: "#6366F1",
                          backgroundColor: "rgba(99, 102, 241, 0.2)",
                          tension: 0.4,
                          fill: true,
                          pointRadius: 3,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: {
                        x: { grid: { display: false } },
                        y: {
                          grid: { display: false },
                          ticks: { stepSize: 25 },
                        },
                      },
                    }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
