"use client";

import { motion } from "framer-motion";
import { referralLink } from "@/config/referrerConfig";
import { Clipboard } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export const CopyLinkButton = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setIsCopied(true);
      toast.success("Referral link copied!", { autoClose: 2000 });
      setTimeout(() => setIsCopied(false), 2000);
      // Analytics tracking
      if (typeof window.gtag !== "undefined") {
        window.gtag("event", "copy_referral_link", {
          event_category: "referral",
          event_label: "Copy Link",
        });
      }
    } catch {
      toast.error("Failed to copy link.");
    }
  };

  return (
    <motion.button
      onClick={handleCopy}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-3 px-4 py-2 bg-gray-100/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition backdrop-blur-sm"
    >
      <Clipboard className="w-5 h-5" />
      {isCopied ? "Link Copied!" : "Copy Referral Link"}
    </motion.button>
  );
};

// export const CopyLinkButton = () => {
//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(referralLink);
//       toast.success("Referral link copied!");
//     } catch {
//       toast.error("Failed to copy link.");
//     }
//   };

//   return (
//     <button
//       onClick={handleCopy}
//       className="flex items-center gap-3 px-4 py-2 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 transition"
//     >
//       <Clipboard className="w-5 h-5" />
//       Copy Referral Link
//     </button>
//   );
// };
