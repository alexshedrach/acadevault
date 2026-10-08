import { Mail, Store, Flag, MessageCircleMore } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import SellerInfoProfile from "../seller/SellerInfoProfile";

export default function SellerContactCard({
  shop,
  totalMaterials,
  onContact,
  onReport,
}) {
  const storeUrl = `/shop/${shop?.id}`;

  const whatsapp = shop?.contactInfo?.whatsapp?.replace(/^\+/, "");
  const socialLinks = shop?.contactInfo?.socialMediaLinks || [];

  const social = {
    facebook: socialLinks.find((s) => s.platform.toLowerCase() === "facebook")
      ?.url,
    twitter: socialLinks.find((s) => s.platform.toLowerCase() === "twitter")
      ?.url,
    linkedin: socialLinks.find((s) => s.platform.toLowerCase() === "linkedin")
      ?.url,
    whatsapp: whatsapp,
  };

  return (
    <div className="relative mt-10 rounded-xl border border-gray-200 p-8 transition-all hover:shadow-xl">
      {/* <legend className="font-semibold">Shop/Seller Details</legend> */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
        {/* Seller Info Section */}
        <div className="flex-1">
          {/* <SellerInfo
            shop={shop}
            avatarSize="xl"
            compact={false}
            showJoinDate={true}
            showRating={true}
            showSocialLinks={false}
          /> */}
          <SellerInfoProfile
            shop={shop}
            compact={false}
            showRating
            showJoinDate
            showSocialLinks
            showStats
            showBio
            avatarSize={96}
          />
        </div>
        

        {/* Action Buttons */}
        <div className="absolute flex flex-col sm:flex-row sm:items-center gap-3 right-60 bottom-2">
          <a
            href={storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-white font-semibold shadow hover:bg-blue-700 hover:scale-105 transition-all duration-200"
          >
            <Store className="w-4 h-4" />
            View Store
          </a>

          <button
            onClick={onContact}
            className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-5 py-2.5 text-white font-semibold shadow hover:bg-purple-700 hover:scale-105 transition-all duration-200"
          >
            <Mail className="w-4 h-4" />
            Contact Seller
          </button>
        </div>
      </div>

      {/* Divider & Footer */}
      <div className="border-t border-gray-300 mt-8 pt-5 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Social Icons */}
        <div className="flex items-center gap-5 text-gray-600">
          {social.facebook && (
            <a
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-blue-700 hover:scale-110 transition"
            >
              <FaFacebook className="w-5 h-5" />
            </a>
          )}
          {social.twitter && (
            <a
              href={social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-sky-500 hover:scale-110 transition"
            >
              <FaTwitter className="w-5 h-5" />
            </a>
          )}
          {social.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-indigo-700 hover:scale-110 transition"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          )}
          {social.whatsapp && (
            <a
              href={`https://wa.me/${social.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:text-green-600 hover:scale-110 transition"
            >
              <MessageCircleMore className="w-5 h-5" />
            </a>
          )}
        </div>

        {/* Report */}
        {onReport && (
          <button
            onClick={onReport}
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-red-500 hover:underline transition"
          >
            <Flag className="w-4 h-4" />
            Report this topic
          </button>
        )}
      </div>
    </div>
  );
}
