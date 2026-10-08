import { motion } from "framer-motion";

export default function ReferralCTA({ itemVariants }) {
  return (
    <motion.div variants={itemVariants} className="text-center mt-16">
      <a
        href="/dashboard/referrals"
        className="inline-block bg-yellow-400 hover:bg-yellow-300 text-indigo-900 font-semibold py-4 px-12 rounded-full shadow-lg text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-200"
        aria-label="Go to Referral Dashboard"
      >
        Explore Your Referral Dashboard →
      </a>
      <p className="text-sm text-blue-200 mt-4 max-w-xl mx-auto">
        Track your referral codes, monitor commissions, and withdraw funds
        seamlessly from your personalized dashboard.
      </p>
    </motion.div>
  );
}
