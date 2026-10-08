"use client";

import Link from "next/link";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import { getImageUrl } from "@/utils/getImageUrl";

const MaterialShopInfo = ({ shop, className = "" }) => {
  if (!shop) return null;

  return (
    <div
      className={`flex items-center gap-2 text-sm text-gray-500 ${className}`}
    >
      <ImageWithFallback
        src={getImageUrl(shop.logo)}
        alt={shop.businessName}
        fallbackText={shop.businessName}
        size={30}
        className="w-8 h-8 rounded-full overflow-hidden mr-3"
      />
      <Link
        href={`/shop/${shop.id}`}
        className="hover:text-blue-600 transition-colors font-medium truncate max-w-full"
        title={shop.businessName}
      >
        {shop.businessName}
      </Link>
    </div>
  );
};

export default MaterialShopInfo;
