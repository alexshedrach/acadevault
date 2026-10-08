"use client";
import { motion, useInView } from "framer-motion";
import { Users, Gift, TrendingUp } from "lucide-react";
import { useRef } from "react";

const stats = [
  {
    icon: <Users className="w-12 h-12 text-indigo-600" />,
    title: "12,000+",
    subtitle: "Referrals Made",
    description: "Join thousands of users sharing Acadevault with their peers",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    icon: <Gift className="w-12 h-12 text-yellow-500" />,
    title: "7,500+",
    subtitle: "Rewards Claimed",
    description: "Unlock exclusive benefits by inviting your colleagues",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    icon: <TrendingUp className="w-12 h-12 text-green-500" />,
    title: "92%",
    subtitle: "Referral Success Rate",
    description: "High success rate in converting referrals to active users",
    gradient: "from-green-400 to-emerald-600",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.3,
    },
  },
};

export const ReferralStats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="relative bg-gradient-to-b from-gray-50 to-white py-24 overflow-hidden"
      aria-label="Referral Program Statistics"
      ref={ref}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="container mx-auto px-6 lg:px-8">
        {/* <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Join Our Referral Revolution
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Invite your peers to Acadevault and unlock exclusive rewards while
            building a thriving academic community.
          </p>
        </motion.div> */}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover="hover"
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden group`}
              role="region"
              aria-label={stat.subtitle}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="p-3 bg-gray-50 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-900">
                  {stat.title}
                </h3>
                <p className="text-lg font-medium text-gray-700 mt-2">
                  {stat.subtitle}
                </p>
                <motion.div
                  className="w-16 h-1 mt-2 bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                />
                <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
