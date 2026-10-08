"use client";

import { getImageUrl } from "@/utils/getImageUrl";
import clsx from "clsx";
import { formatDistanceToNow } from "date-fns";
import { BookOpen, MessageSquareText, Star, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import Avatar from "../common/Avatar";

export default function SellerInfoProfile({
  shop,
  showRating = true,
  showJoinDate = true,
  showSocialLinks = true,
  showStats = true,
  showBio = true,
  className = "",
  compact = false,
  avatarSize = 128,
}) {
  const [expanded, setExpanded] = useState(false);
  if (!shop) return null;

  const {
    _id,
    id,
    slug,
    businessName = "Unknown Seller",
    logo,
    owner = {},
    contactInfo = {},
    ratings = {},
    createdAt,
    bio = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni vitae totam ratione tenetur similique sequi ipsam, excepturi explicabo quam inventore accusamus reprehenderit ab! Voluptas in minima architecto ex consequuntur. Similique. Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa maxime quam possimus ab omnis porro cupiditate, velit autem repudiandae illum voluptas earum sint obcaecati reprehenderit ea ratione! Optio, unde dolore? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi voluptate voluptas, neque eos excepturi asperiores quos quisquam dignissimos voluptatibus doloremque et. Harum corrupti excepturi odit nobis ea debitis distinctio natus?",
    stats = {},
  } = shop;

  const verified = contactInfo.isPhoneVerified ?? false;
  const sellerRating = ratings?.average ?? null;
  const displayBio =
    bio && bio.length > 300 && !expanded ? bio.slice(0, 300) + "..." : bio;

  const { reviewsCount = 10, studentsCount = 20, materialsCount = 50 } = stats;

  const profileUrl = slug ? `/shop/${slug}` : `/shop/${id}`;
  const avatarUrl = "/avatars/alex-profile.png";

  return (
    <section>
      <div
        className={clsx(
          "flex flex-col md:flex-row gap-6 items-start",
          className
        )}
      >
        {/* Avatar */}
        <div className="flex-shrink-0 w-full md:w-auto flex justify-center">
          <Avatar
            src={getImageUrl(logo)}
            alt={businessName}
            name={businessName}
            size={avatarSize}
            fallback={avatarUrl}
            className="rounded-full border border-gray-300 object-cover"
          />
        </div>

        {/* Info Section */}
        <div className="flex-1">
          {/* Business Name and Verification */}
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={profileUrl}
              className="text-xl md:text-2xl font-semibold text-gray-900 hover:underline"
            >
              {businessName}
            </Link>
            {verified && (
              <span
                title="Verified contact info"
                className="inline-flex items-center gap-1 text-sm text-green-600 bg-green-100 border border-green-300 px-2 py-0.5 rounded-full font-medium"
              >
                <FiCheckCircle className="h-4 w-4" />
                Verified
              </span>
            )}
          </div>

          {/* Owner Info */}
          {owner?.name && (
            <>
              <div className="mt-1 text-sm text-gray-700">
                <strong>Owned by:</strong> {owner.name}
              </div>
              <div className="text-sm text-gray-500">
                Web Developer, Designer, and Teacher
              </div>
            </>
          )}

          {/* Stats and Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-4">
            {showRating &&
              (sellerRating !== null ? (
                <span className="inline-flex items-center gap-1 text-yellow-600 font-medium">
                  <Star className="w-4 h-4" />
                  {sellerRating.toFixed(1)} / 5
                </span>
              ) : (
                <span className="italic text-gray-400">No ratings yet</span>
              ))}

            {showJoinDate && createdAt && (
              <span>
                Joined{" "}
                {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
              </span>
            )}

            {showStats && (
              <>
                <span className="flex items-center gap-1">
                  <MessageSquareText className="w-4 h-4 text-gray-500" />
                  {reviewsCount.toLocaleString()} Reviews
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-gray-500" />
                  {studentsCount.toLocaleString()} Students
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4 text-gray-500" />
                  {materialsCount.toLocaleString()} Academic Materials
                  {materialsCount !== 1 ? "s" : ""}
                </span>
              </>
            )}
          </div>

          {/* Social Media Links */}
          {/* {showSocialLinks &&
          Array.isArray(contactInfo?.socialMediaLinks) &&
          contactInfo.socialMediaLinks.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-indigo-600">
              {contactInfo.socialMediaLinks.map((link) => (
                <a
                  key={link.id || link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          )} */}
        </div>
      </div>
      {/* Bio */}
      {showBio && (
        <div className="mt-4 text-sm text-gray-700 whitespace-pre-line">
          {displayBio}
          {bio.length > 300 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="ml-2 text-purple-600 font-medium hover:underline focus:outline-none"
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
