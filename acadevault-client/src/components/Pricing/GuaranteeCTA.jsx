import {
  Share2Icon,
  GiftIcon,
  PercentIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { Button } from "../ui/Button";

import CouponInput from "./CouponInput";

export default function GuaranteeCTA() {
  return (
    <div className="py-4 border-y rounded-2xl shadow-md bg-white">
      {/* Guarantee Info */}
      <div className="text-center">
        <div className="flex justify-center mb-3">
          <ShieldCheckIcon className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800">
          30-Day Money-Back Guarantee
        </h3>
        <p className="text-base text-gray-600 mt-2">
          Plus full lifetime access to all updates
        </p>
      </div>

      {/* Button Section */}
      <div className="mt-8 flex justify-center gap-2">
        <Button variant="success" className="flex items-center gap-2" size="sm">
          <Share2Icon className="h-5 w-5" /> Share
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <GiftIcon className="h-5 w-5" /> Gift
        </Button>
      </div>

      {/* Subtext */}
      <p className="text-xs text-gray-500 text-center mt-2">
        Gifting includes full access and instructions via email.
      </p>

      {/* Coupon Area */}
      <div className="space-y-2 mt-3 px-1">
        <CouponInput
          onApply={(code) => console.log("Coupon applied:", code)}
          onRemove={() => console.log("Coupon removed")}
          initialCoupon="WELCOME10"
        />
      </div>
    </div>
  );
}
