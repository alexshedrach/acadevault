"use client";

import FloatingIcons from "@/components/common/FloatingIcons";
import ParticleBackgroundAnimation from "@/components/common/ParticleBackgroundAnimation";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { ShareModal } from "@/components/modals/ShareModal";
import StatsCard from "./StatsCard";
import { useAuth } from "@/hooks/useAuth";

const icons = [
  { src: "/media/logo2.png", name: "App 1" },
  { src: "/media/logo3.png", name: "App 2" },
  { src: "/media/logo4.jpg", name: "App 3" },
  { src: "/media/accredited.png", name: "App 4" },
  { src: "/logos/uni-a.jpg", name: "App 5" },
  { src: "/logos/oxford.png", name: "App 6" },
  { src: "/logos/unilag.png", name: "App 7" },
  { src: "/logos/oau.jpeg", name: "App 8" },
];

const ReferHeroSection = () => {
  const { isAuthenticated } = useAuth();

  const [showShare, setShowShare] = useState(false);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for background
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative bg-gradient-to-br from-[#1e3a8a] to-[#60a5fa] py-8 md:py-16 px-6 overflow-hidden"
      >
        {/* Particle Background */}
        <ParticleBackgroundAnimation
          particleImage="/media/particle-bg2.jpg"
          opacity={0.1}
          animationSpeed={10}
          parallaxY={backgroundY}
        />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-12 relative z-10">
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              Refer & Earn with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#93c5fd] to-[#2563eb]">
                AcadeVault
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 max-w-md leading-relaxed">
              Share the power of Acadevault with friends, earn generous rewards,
              and build a community of learners. It’s simple, seamless, and
              highly rewarding!
            </p>
            <div className="flex gap-4">
              <Link
                href="/dashboard/affiliate/referrals"
                target="_blank"
                className="inline-block px-8 py-3 bg-yellow-400 text-gray-800 font-semibold rounded-full hover:bg-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Your Referral Link
              </Link>

              <button
                onClick={() => setShowShare(true)}
                className="inline-block px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#2563eb] transition-all duration-300"
              >
                Share Now
              </button>
            </div>
          </motion.div>

          {/* Right Floating Icons */}
          <FloatingIcons
            icons={icons}
            size="medium"
            radius={40}
            animationSpeed={20}
          />
        </div>

        {/* Stats Card */}
        <StatsCard />
      </section>
      <ShareModal isOpen={showShare} onClose={() => setShowShare(false)} />
    </>
  );
};

export default ReferHeroSection;
