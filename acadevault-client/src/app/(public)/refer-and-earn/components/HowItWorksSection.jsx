"use client";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { Share2, Users, Gift } from "lucide-react";

const steps = [
  {
    title: "Share Your Link",
    description:
      "Grab your unique referral link from your Acadevault dashboard and share it via social media, email, or directly with friends.",
    icon: <Share2 className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
  },
  {
    title: "They Join Acadevault",
    description:
      "Your friends sign up using your link and unlock a world of premium academic resources.",
    icon: <Users className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
  },
  {
    title: "Earn Rewards",
    description:
      "When they subscribe or make a purchase, you both earn rewards like credits or exclusive discounts!",
    icon: <Gift className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
  },
];

export const HowItWorksSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section className="relative isolate overflow-hidden py-24 px-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Decorative Background Glow */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full opacity-20 blur-[100px] bg-blue-600" />

      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
        >
          Refer & Earn in 3 Easy Steps
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-gray-300 max-w-3xl mx-auto"
        >
          Invite your friends to Acadevault and get rewarded for helping them
          discover powerful academic resources. It’s simple, fast, and
          rewarding!
        </motion.p>
      </div>

      <motion.div
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {steps.map((step, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover="hover"
            className="relative"
          >
            <Card
              theme="glass"
              variant="shadowed"
              clickable={true}
              className="text-center p-8 hover:bg-gray-800/50 transition-colors duration-300"
              onClick={() => {}}
            >
              <div className="flex flex-col items-center justify-center space-y-6">
                <motion.div
                  className="p-3 rounded-full bg-blue-900/50"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {step.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-white">
                  {step.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {step.description}
                </p>
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                />
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
