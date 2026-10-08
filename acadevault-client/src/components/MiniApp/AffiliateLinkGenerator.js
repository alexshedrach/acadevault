"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, Copy } from "lucide-react";
import { cn } from "@/utils/cn";
import { fadeIn } from "@/lib/animations";
import useAnalytics from "@/hooks/useAnalytics";

const AffiliateLinkGenerator = () => {
  const [pageUrl, setPageUrl] = useState("");
  const [affiliateId, setAffiliateId] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const { trackEvent } = useAnalytics();

  const validateUrl = (url) => {
    try {
      new URL(url);
      return url.startsWith("https://acadevault.com");
    } catch {
      return false;
    }
  };

  const validateAffiliateId = (id) => /^[a-zA-Z0-9_-]{3,20}$/.test(id);

  const handleGenerate = () => {
    setError("");
    setGeneratedLink("");

    if (!validateUrl(pageUrl)) {
      setError(
        "Please enter a valid Acadevault URL (e.g., https://acadevault.com/product)"
      );
      trackEvent("link_generator_error", { error: "Invalid URL", pageUrl });
      return;
    }

    if (!validateAffiliateId(affiliateId)) {
      setError("Affiliate ID must be 3-20 characters (letters, numbers, -, _)");
      trackEvent("link_generator_error", {
        error: "Invalid Affiliate ID",
        affiliateId,
      });
      return;
    }

    const url = new URL(pageUrl);
    url.searchParams.set("aff", affiliateId);
    setGeneratedLink(url.toString());
    trackEvent("link_generated", { pageUrl, affiliateId });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      trackEvent("link_copied", { generatedLink });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Failed to copy link. Please copy manually.");
      trackEvent("link_copy_failed", { generatedLink });
    }
  };

  return (
    <motion.div
      className="p-6 rounded-lg backdrop-blur-sm bg-white/30 border border-gray-200 shadow-lg py-16"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Link className="w-6 h-6 text-blue-600" />
        Generate Affiliate Link
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600">Page URL</label>
          <input
            type="url"
            value={pageUrl}
            onChange={(e) => setPageUrl(e.target.value)}
            placeholder="https://acadevault.com/product"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
            aria-label="Page URL"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Affiliate ID</label>
          <input
            type="text"
            value={affiliateId}
            onChange={(e) => setAffiliateId(e.target.value)}
            placeholder="YourAffiliateID"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
            aria-label="Affiliate ID"
          />
        </div>
        <button
          onClick={handleGenerate}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          aria-label="Generate affiliate link"
        >
          Generate Link
        </button>
        {error && (
          <p className="text-red-500 text-sm" role="alert">
            {error}
          </p>
        )}
        {generatedLink && (
          <div className="mt-4">
            <label className="block text-sm text-gray-600">
              Your Affiliate Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={generatedLink}
                readOnly
                className="flex-1 p-2 border rounded-lg bg-gray-100"
                aria-label="Generated affiliate link"
              />
              <button
                onClick={handleCopy}
                className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                aria-label="Copy affiliate link"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
            {copied && (
              <p className="text-green-500 text-sm mt-1" role="status">
                Link copied!
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AffiliateLinkGenerator;
