"use client";

import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaLink,
} from "react-icons/fa";

export default function SocialShare({ shopUrl, shopName }) {
  const shareText = encodeURIComponent(
    `Check out ${shopName} on our platform!`
  );
  const encodedUrl = encodeURIComponent(shopUrl);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${shareText}`,
    whatsapp: `https://wa.me/?text=${shareText}%20${encodedUrl}`,
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(shopUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="flex items-center space-x-4 mt-6">
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800"
        aria-label="Share on Facebook"
      >
        <FaFacebookF size={20} />
      </a>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sky-500 hover:text-sky-700"
        aria-label="Share on Twitter"
      >
        <FaTwitter size={20} />
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 hover:text-blue-900"
        aria-label="Share on LinkedIn"
      >
        <FaLinkedinIn size={20} />
      </a>
      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-500 hover:text-green-700"
        aria-label="Share on WhatsApp"
      >
        <FaWhatsapp size={20} />
      </a>
      <button
        onClick={copyLink}
        className="text-gray-600 hover:text-gray-900"
        aria-label="Copy link"
      >
        <FaLink size={20} />
      </button>
    </div>
  );
}
