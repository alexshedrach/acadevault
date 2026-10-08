import { Share2 } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import CopyLinkInput from "./CopyLinkInput";

export default function ShareSection({ material }) {
  const [copied, setCopied] = useState(false);
  const materialUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/materials/${material.slug}`
      : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(materialUrl);
      setCopied(true);
      toast.success("Link copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: material.title,
          text: material.summary || "",
          url: materialUrl,
        });
      } catch {
        toast.error("Sharing failed");
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleWebShare}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-sm flex items-center justify-center gap-2"
      >
        <Share2 className="w-4 h-4" />
        Share this material
      </button>
      <CopyLinkInput url={materialUrl} copied={copied} onCopy={handleCopy} />
    </div>
  );
}
