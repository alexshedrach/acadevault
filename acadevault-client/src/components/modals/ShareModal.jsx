"use client";

import { X, MessageCircle, Mail, Send } from "lucide-react";
import { BsLinkedin, BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { referralLink, shareMessage } from "@/config/referrerConfig";
import { CopyLinkButton } from "../ui/CopyLinkButton";
import { Modal } from "../ui/Modal";
import { QRCodeCanvas } from "qrcode.react";

export const ShareModal = ({ isOpen, onClose }) => (
  <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeButton={true}
      title="Share Your Referral Link"
      description="Invite friends to Acadevault and earn rewards!"
      size="xl"
      theme="light"
      // className="bg-gradient-to-br from-white/30 to-gray-800/30"
      draggable={true}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ShareOption
            href={`https://twitter.com/intent/tweet?text=${shareMessage}`}
            label="Share on Twitter"
            icon={<BsTwitter className="w-5 h-5" />}
            bgColor="bg-[#1DA1F2]/10"
            borderColor="border border-[#1DA1F2]"
            textColor="text-[#1DA1F2]"
          />
          <ShareOption
            href={`https://wa.me/?text=${shareMessage}`}
            label="Share on WhatsApp"
            icon={<MessageCircle className="w-5 h-5" />}
            bgColor="bg-green-500/10"
            borderColor="border border-green-500"
            textColor="text-green-600"
          />
          <ShareOption
            href={`mailto:?subject=Join me on AcadeVault&body=${shareMessage}`}
            label="Share via Email"
            icon={<Mail className="w-5 h-5" />}
            bgColor="bg-blue-500/10"
            borderColor="border border-blue-500"
            textColor="text-blue-600"
          />
          <ShareOption
            href={`https://t.me/share/url?url=${referralLink}&text=${shareMessage}`}
            label="Share on Telegram"
            icon={<Send className="w-5 h-5" />}
            bgColor="bg-[#0088cc]/10"
            borderColor="border border-[#0088cc]"
            textColor="text-[#0088cc]"
          />
          <ShareOption
            href={`https://www.facebook.com/sharer/sharer.php?u=${referralLink}`}
            label="Share on Facebook"
            icon={<FaFacebook className="w-5 h-5" />}
            bgColor="bg-[#4267B2]/10"
            borderColor="border border-[#4267B2]"
            textColor="text-[#4267B2]"
          />
          <ShareOption
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${referralLink}&title=Join AcadeVault&summary=${shareMessage}`}
            label="Share on LinkedIn"
            icon={<BsLinkedin className="w-5 h-5" />}
            bgColor="bg-[#0077b5]/10"
            borderColor="border border-[#0077b5]"
            textColor="text-[#0077b5]"
          />
        </div>
        <div className="flex flex-col items-center gap-4 pt-4 border-t border-gray-300/20 dark:border-gray-700/20">
          <CopyLinkButton />
          <div className="p-4 bg-white/80 rounded-lg shadow-md">
            <QRCodeCanvas
              value={referralLink}
              size={120}
              bgColor="transparent"
              fgColor="#2563eb"
              level="H"
              renderAs="svg"
              className="rounded-md"
            />
            <p className="mt-2 text-sm text-gray-800 text-center">
              Scan to share
            </p>
          </div>
        </div>
      </div>
    </Modal>
);

// ShareOption component with analytics tracking
const ShareOption = ({
  href,
  label,
  icon,
  bgColor,
  borderColor,
  textColor,
}) => {
  const handleClick = () => {
    // Placeholder for analytics tracking (e.g., GA4)
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "share", {
        event_category: "referral",
        event_label: label,
      });
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`flex items-center gap-3 px-4 py-2 ${bgColor} ${borderColor} ${textColor} rounded-lg hover:opacity-80 transition backdrop-blur-sm`}
    >
      {icon}
      {label}
    </a>
  );
};
