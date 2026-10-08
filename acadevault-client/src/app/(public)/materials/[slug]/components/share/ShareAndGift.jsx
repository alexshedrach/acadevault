"use client";

import { Share2 } from "lucide-react";
import ShareSection from "./ShareSection";
import GiftSection from "./GiftSection";

export default function ShareAndGift({ material }) {
  return (
    <fieldset className="mt-2 p-4 border rounded-lg shadow-sm bg-white space-y-6">
      <legend className="text-base font-semibold text-gray-800 flex items-center gap-2">
        <Share2 className="w-5 h-5 text-blue-500" />
        Share or Gift This Material
      </legend>
      <ShareSection material={material} />
      <GiftSection material={material} />
    </fieldset>
  );
}
