"use client";

import Avatar from "@/components/common/Avatar";
import SocialShare from "@/components/common/SocialShare";
import { getInitials } from "@/helpers/getInitials";
import { cleanDescription } from "@/utils/cleanDescription";
import { getImageUrl } from "@/utils/getImageUrl";
import Image from "next/image";
import ShopDescription from "./ShopDescription";

export default function ShopBanner({
  shop,
  owner,
  isFollowing,
  onFollow,
  onUnfollow,
  isFollowLoading,
  shopPhone,
  shopWebsite,
  shopId,
}) {
  const { name, description, banner, logo } = shop;
  const cleanedDescription = cleanDescription(description, name);

  return (
    <div
      className="relative h-96 md:h-[28rem] rounded-b-4xl text-white shadow bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url('${getImageUrl(banner)}')`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-indigo-900/95 z-10 rounded-b-4xl" />

      <div className="relative z-20 flex flex-col items-center text-center pt-20 px-4">
        <h1 className="text-4xl font-extrabold drop-shadow-lg">{name}</h1>
        {description && (
          <ShopDescription
            text={cleanedDescription}
            sentenceCount={1}
            readMore={false}
            textClassName="text-white/90 drop-shadow-sm max-w-2xl mt-3"
            toggleClassName="text-blue-200"
          />
        )}

        <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-6">
          {/* Follow/Unfollow */}
          <button
            onClick={isFollowing ? onUnfollow : onFollow}
            disabled={isFollowLoading}
            className="px-5 py-2 rounded-full bg-white text-blue-600 text-sm font-semibold hover:bg-gray-100 transition shadow-md disabled:opacity-50"
          >
            {isFollowLoading
              ? "Processing..."
              : isFollowing
              ? "Unfollow"
              : "Follow Shop"}
          </button>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${shopPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full bg-white text-green-700 text-sm font-semibold hover:bg-gray-100 transition shadow-md"
          >
            💬 Chat on WhatsApp
          </a>

          {/* Visit Website */}
          {shopWebsite && (
            <a
              href={shopWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full bg-white text-indigo-600 text-sm font-semibold hover:bg-gray-100 transition shadow-md"
            >
              🌐 Visit Website
            </a>
          )}

          {/* View Products */}
          <a
            href={`/shop/${shopId}/products`}
            className="px-5 py-2 rounded-full bg-white text-pink-600 text-sm font-semibold hover:bg-gray-100 transition shadow-md"
          >
            🛍️ View Products
          </a>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-5xl px-6 py-4 bg-black/30 backdrop-blur-md rounded-xl shadow-md ring-1 ring-white/20 z-30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3 text-sm text-white text-center">
          <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center font-semibold mr-3">
            {owner?.profilePicture?.url && (
              <Avatar
                src={getImageUrl(owner?.profilePicture?.url)}
                name={owner?.name}
                size="lg"
                status="away"
                className="border-white"
              />
            )}
          </div>
          <span>
            Owned by <span className="font-semibold">{owner?.name}</span>
          </span>
        </div>

        <div className="text-sm text-white text-center sm:text-right">
          <h3 className="font-semibold mb-1 text-white">Share this shop</h3>
          <SocialShare
            shopName={name}
            shopUrl={typeof window !== "undefined" ? window.location.href : ""}
          />
        </div>
      </div>

      <div className="absolute left-1/2 -bottom-16 transform -translate-x-1/2 z-40">
        <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl bg-white overflow-hidden">
          {logo ? (
            <Image
              src={logo}
              alt="Shop Logo"
              fill
              className="object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-white bg-blue-600">
              {getInitials(name, 2)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
