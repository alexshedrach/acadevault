"use client";
import { ShoppingCartIcon, DownloadIcon } from "lucide-react";
import { Button } from "../ui/Button";

export default function DownloadOrPurchaseButton({ isFree, onClick }) {
  return (
    <div className="mt-8 mb-5 flex flex-col items-center">
      <Button
        onClick={onClick}
        className={`w-xs text-white font-semibold`}
        variant={`${isFree ? "success" : ""}`}
      >
        {isFree ? (
          <>
            <DownloadIcon className="w-4 h-4 mr-2" />
            Get Free Material
          </>
        ) : (
          <>
            <ShoppingCartIcon className="w-4 h-4 mr-2" />
            Purchase to Access
          </>
        )}
      </Button>
      <p className="text-xs text-gray-500 text-center mt-1">
        {isFree
          ? "Instant download. No payment required."
          : "One-time purchase. Secure checkout."}
      </p>
    </div>
  );
}
