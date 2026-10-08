"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MessageCircle, Zap } from "lucide-react";
import { useEffect } from "react";

const HelpSection = ({
  title = "Need Academic Help?",
  description = "Struggling to find your approved topic or completed project? Hire a writer today or chat with us for instant support.",
  whatsapp = {
    number: "+2348146870361",
    link: "https://wa.me/2348146870361",
  },
  downloadCta = "Hire a Writer",
  chatCta = "Talk to Support",
  projectLinks = [],
  showWhatsAppStatus = false,
  showChatWidget = true,
}) => {
  // 🔍 Track when HelpSection is viewed (replace with your analytics)
  useEffect(() => {
    console.log("[HelpSection] rendered");
  }, []);

  return (
    <section
      aria-labelledby="help-section-title"
      className="relative isolate overflow-hidden rounded-xl border border-orange-200 bg-orange-50 px-6 py-10 shadow-inner"
    >
      {/* Online Status Indicator */}
      {showWhatsAppStatus && (
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
          </span>
          <span className="text-xs font-medium text-gray-700">
            Support is online
          </span>
        </div>
      )}

      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="help-section-title"
          className="mb-2 text-2xl font-bold text-orange-600"
        >
          {title}
        </h2>

        <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
          {description}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          {/* WhatsApp CTA */}
          <motion.a
            href={whatsapp.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-md bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-green-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
            aria-label="Talk to support on WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
            {chatCta}
          </motion.a>

          {/* Hire CTA */}
          <Link href="/hire-writer" passHref legacyBehavior>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Hire a writer for project assistance"
            >
              <Zap className="h-4 w-4" />
              {downloadCta}
            </motion.button>
          </Link>
        </div>

        {/* Dynamic Project Links */}
        {projectLinks.length > 0 && (
          <div className="mt-6 space-y-2 text-sm text-gray-800">
            {projectLinks.map((link, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-2"
              >
                {link.icon}
                <Link
                  href={link.href}
                  className="font-medium text-blue-600 hover:underline"
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Contact Number */}
        <div className="mt-6 text-sm text-gray-600">
          📞 Call or WhatsApp:{" "}
          <a
            href={`tel:${whatsapp.number}`}
            className="font-semibold text-blue-600 hover:underline"
          >
            {whatsapp.number}
          </a>
        </div>
      </div>

      {/* Optional Chat Widget */}
      {showChatWidget && (
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm text-gray-600">
          <MessageCircle className="h-4 w-4" />
          <span>Chat support available</span>
        </div>
      )}
    </section>
  );
};

export default HelpSection;
