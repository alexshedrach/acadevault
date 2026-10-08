"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import PopDialogBox from "@/components/ui/PopDialogBox";

const StatsCard = () => {
  const [isOpen, setIsOpen] = useState(false); // Open by default on load
  const [hovered, setHovered] = useState(false);

  /////////////////////// LOCALSTORAGE IMPLEMENTTION /////////////////////

  // Show dialog on mount unless dismissed
  // useEffect(() => {
  //   const dismissed = localStorage.getItem("statsCardDismissed");
  //   if (!dismissed) {
  //     setIsOpen(true); // Set to true immediately on mount
  //   }
  // }, []);

  // Auto-close after 8s if not hovered
  // useEffect(() => {
  //   if (isOpen && !hovered) {
  //     const timer = setTimeout(() => {
  //       if (!hovered) {
  //         setIsOpen(false);
  //         localStorage.setItem("statsCardDismissed", "true");
  //       }
  //     }, 8000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [isOpen, hovered]);

  // const handleClose = () => {
  //   setIsOpen(false);
  //   localStorage.setItem("statsCardDismissed", "true");
  // };

  ///////////////////////// SESSION IMPLEMENTTION ////////////////////////
  // Show dialog on mount unless dismissed in current session
  // useEffect(() => {
  //   const dismissed = sessionStorage.getItem("statsCardDismissed");
  //   if (!dismissed) {
  //     setIsOpen(true); // Open popup immediately on mount
  //   }
  // }, []);

  // Auto-close after 8s if not hovered
  // useEffect(() => {
  //   if (isOpen && !hovered) {
  //     const timer = setTimeout(() => {
  //       if (!hovered) {
  //         setIsOpen(false);
  //         sessionStorage.setItem("statsCardDismissed", "true");
  //       }
  //     }, 8000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [isOpen, hovered]);

  // const handleClose = () => {
  //   setIsOpen(false);
  //   sessionStorage.setItem("statsCardDismissed", "true");
  // };

  ////////////////  popup to appear every time the page loads, whether on initial mount or page reload, without persisting the dismissal state across sessions using localStorage.  ///////////////////////

  // Auto-close after 8s if not hovered
  useEffect(() => {
    if (isOpen && !hovered) {
      const timer = setTimeout(() => {
        if (!hovered) {
          setIsOpen(false);
        }
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, hovered]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <PopDialogBox
      isOpen={isOpen}
      onClose={handleClose}
      className="border-2 border-gradient-to-r from-blue-300 to-blue-600 mt-5"
      size="md"
      position="center"
      backdropOpacity={0.6}
      animationType="scale"
      ariaLabel="Referral stats dialog"
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
          onClick={handleClose}
          aria-label="Close stats card"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Why Refer AcadeVault?
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-blue-600 text-lg">✔</span>
            <span>
              <strong>Earn up to $50</strong> for every successful referral.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 text-lg">✔</span>
            <span>
              <strong>Instant payouts</strong> to your preferred account.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 text-lg">✔</span>
            <span>
              <strong>Expand your network</strong> with like-minded learners.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 text-lg">✔</span>
            <span>
              <strong>Exclusive perks</strong> for top referrers.
            </span>
          </li>
        </ul>
        <div className="mt-6">
          <Link
            href="/dashboard/affiliate/referrals"
            target="_blank"
            className="w-full block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300"
            onClick={handleClose}
          >
            Refer Now
          </Link>
        </div>
      </div>
    </PopDialogBox>
  );
};

export default StatsCard;
