"use client";

import { motion } from "framer-motion";
import { FaTrophy } from "react-icons/fa";
import { HiChevronDoubleUp } from "react-icons/hi";

const leaders = [
  { name: "Dr. Jane S.", referrals: 245, earnings: "₦1,890", rank: 1 },
  { name: "Prof. Mark L.", referrals: 198, earnings: "₦1,450", rank: 2 },
  { name: "Sarah K.", referrals: 156, earnings: "₦1,120", rank: 3 },
  { name: "Michael O.", referrals: 112, earnings: "₦900", rank: 4 },
  { name: "Amaka E.", referrals: 105, earnings: "₦850", rank: 5 },
];

const rankColors = {
  1: "from-yellow-400 via-yellow-300 to-yellow-500",
  2: "from-gray-400 via-gray-300 to-gray-500",
  3: "from-orange-400 via-orange-300 to-orange-500",
};

export default function ReferralLeaderboard() {
  return (
    <section
      role="region"
      aria-label="Top Referrers Leaderboard"
      className="mt-24 max-w-4xl mx-auto px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-lg relative overflow-hidden"
      >
        {/* Top Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-300 rounded-full blur-3xl opacity-20 animate-pulse pointer-events-none" />

        <h3 className="text-3xl font-bold text-white mb-10 flex items-center gap-3 justify-center">
          <FaTrophy className="text-yellow-400 text-4xl" />
          Top Referrers of the Month
        </h3>

        <ul className="space-y-4">
          {leaders.map((leader, idx) => (
            <motion.li
              key={idx}
              whileHover={{ scale: 1.02 }}
              className={`flex items-center justify-between p-5 rounded-xl cursor-pointer transition-all duration-300 bg-white/5 hover:bg-white/10 ${
                leader.rank <= 3 ? "border-l-4 border-yellow-400" : ""
              }`}
            >
              {/* Left Side: Avatar + Name */}
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 flex items-center justify-center text-lg font-bold text-white rounded-full bg-gradient-to-br ${
                    rankColors[leader.rank] ||
                    "from-blue-400 via-blue-500 to-blue-600"
                  } shadow-lg`}
                >
                  {leader.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white">{leader.name}</p>
                  <p className="text-sm text-blue-200">
                    {leader.referrals} Referrals
                  </p>
                </div>
              </div>

              {/* Right Side: Earnings and Rank Badge */}
              <div className="flex items-center gap-4">
                <span className="text-yellow-300 font-bold text-lg">
                  {leader.earnings}
                </span>
                {leader.rank === 1 && (
                  <span className="bg-yellow-400 text-blue-900 text-xs px-3 py-1 rounded-full font-bold uppercase">
                    🥇 Gold
                  </span>
                )}
                {leader.rank === 2 && (
                  <span className="bg-gray-400 text-blue-900 text-xs px-3 py-1 rounded-full font-bold uppercase">
                    🥈 Silver
                  </span>
                )}
                {leader.rank === 3 && (
                  <span className="bg-orange-400 text-blue-900 text-xs px-3 py-1 rounded-full font-bold uppercase">
                    🥉 Bronze
                  </span>
                )}
              </div>
            </motion.li>
          ))}
        </ul>

        {/* Quick CTA */}
        <div className="text-center mt-12">
          <a
            href="/dashboard/affiliate/referrals"
            target="_blank"
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-semibold py-3 px-8 rounded-full shadow-lg text-lg transition-all"
          >
            <HiChevronDoubleUp className="text-xl" />
            Join the Leaderboard
          </a>
          <p className="text-sm text-blue-200 mt-3">
            Start referring today and see your name climb the ranks.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
