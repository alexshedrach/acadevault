import React from "react";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";

const PromoBanner = () => {
  return (
    <motion.div
      className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg p-6 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-3">
        <Gift size={28} />
        <h3 className="text-xl font-bold">Special Student Deal!</h3>
      </div>
      <p className="text-sm text-white/90 mb-4">
        Get up to <strong>25% off</strong> your first purchase. Limited time
        offer.
      </p>
      <a
        href="/deals"
        className="inline-block bg-white text-blue-700 font-semibold px-4 py-2 rounded-md hover:bg-blue-100 transition-all"
      >
        Claim Offer
      </a>
    </motion.div>
  );
};

export default PromoBanner;
