"use client";

import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Info,
  Copy,
  Check,
  Globe,
} from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { SendHorizonal, Share2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/utils/cn";

// Define dynamic styles per platform
const platformStyles = {
  facebook: {
    bg: "bg-blue-100 hover:bg-blue-200",
    text: "text-blue-600 hover:text-blue-700",
    icon: FaFacebookF,
  },
  twitter: {
    bg: "bg-sky-100 hover:bg-sky-200",
    text: "text-sky-500 hover:text-sky-600",
    icon: FaTwitter,
  },
  instagram: {
    bg: "bg-pink-100 hover:bg-pink-200",
    text: "text-pink-500 hover:text-pink-600",
    icon: FaInstagram,
  },
  linkedin: {
    bg: "bg-blue-50 hover:bg-blue-100",
    text: "text-blue-700 hover:text-blue-800",
    icon: FaLinkedinIn,
  },
  youtube: {
    bg: "bg-red-100 hover:bg-red-200",
    text: "text-red-500 hover:text-red-600",
    icon: FaYoutube,
  },
  tiktok: {
    bg: "bg-gray-100 hover:bg-gray-200",
    text: "text-black hover:text-gray-800",
    icon: FaTiktok,
  },
  telegram: {
    bg: "bg-cyan-100 hover:bg-cyan-200",
    text: "text-cyan-600 hover:text-cyan-700",
    icon: SendHorizonal,
  },
  default: {
    bg: "bg-gray-100 hover:bg-gray-200",
    text: "text-gray-600 hover:text-gray-800",
    icon: Share2,
  },
};

export default function ContactCard({ contactInfo }) {
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
  <div className="rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-fuchsia-500 text-white p-6 w-full max-w-md space-y-6 shadow-2xl">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Contact Information</h2>
        </div>
        <span className="flex items-center gap-1 text-sm bg-white/20 px-3 py-1 rounded-full font-medium text-white">
          <Check className="w-4 h-4" />
          {contactInfo?.status || "Available"}
        </span>
      </div>

      {/* Email */}
      {contactInfo?.email && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 relative">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5" />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-sm text-white/80">{contactInfo.email}</p>
            </div>
          </div>
          <button
            onClick={() => copyToClipboard(contactInfo.email, "email")}
            className="text-white/80 hover:text-white"
          >
            <Copy className="w-4 h-4" />
          </button>
          {copied === "email" && (
            <span className="absolute top-0 right-2 text-xs text-green-200">
              Copied!
            </span>
          )}
        </div>
      )}

      {/* Phone */}
      {contactInfo?.phone && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 relative">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5" />
            <div>
              <p className="font-medium">Phone</p>
              <p className="text-sm text-white/80">{contactInfo.phone}</p>
            </div>
          </div>
          <button
            onClick={() => copyToClipboard(contactInfo.phone, "phone")}
            className="text-white/80 hover:text-white"
          >
            <Copy className="w-4 h-4" />
          </button>
          {copied === "phone" && (
            <span className="absolute top-0 right-2 text-xs text-green-200">
              Copied!
            </span>
          )}
        </div>
      )}

      {/* WhatsApp */}
      {contactInfo?.whatsapp && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/10">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-5 h-5" />
            <div>
              <p className="font-medium">WhatsApp</p>
              <a
                href={`https://wa.me/${contactInfo.whatsapp.replace(
                  /[^0-9]/g,
                  ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/80 hover:underline"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Social Media */}
      {Array.isArray(contactInfo?.socialMediaLinks) &&
        contactInfo.socialMediaLinks.length > 0 && (
          <div>
            <p className="font-medium mb-3 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Social Media Profiles
            </p>
            <div className="flex flex-wrap gap-3">
              {contactInfo.socialMediaLinks.map((link) => {
                const platform = link.platform?.toLowerCase();
                const style =
                  platformStyles[platform] || platformStyles.default;
                const Icon = style.icon;

                return (
                  <a
                    key={link._id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition",
                      style.bg,
                      style.text
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {platform}
                  </a>
                );
              })}
            </div>
          </div>
        )}

      {/* Location */}

      {contactInfo?.location && (
        <div className="pt-6 mt-4 border-t border-white/10">
          <div className="flex items-start gap-3">
            <div className="bg-white/10 p-2 rounded-lg">
              <MapPin className="w-5 h-5 text-white/90" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white mb-1">
                Business Location
              </p>
              <p className="text-white/80 text-sm mb-3 leading-relaxed">
                {contactInfo.location}
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  contactInfo.location
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-xs font-medium px-4 py-2 rounded-full shadow-md transition-all"
              >
                <Globe className="w-4 h-4" />
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
