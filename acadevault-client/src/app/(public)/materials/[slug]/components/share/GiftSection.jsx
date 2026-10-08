import { Gift } from "lucide-react";
import { useState } from "react";
import GiftForm from "./GiftForm";

export default function GiftSection({ material }) {
  const [isGifting, setIsGifting] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsGifting((prev) => !prev)}
        className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition text-sm flex items-center justify-center gap-2"
      >
        <Gift className="w-4 h-4" />
        {isGifting ? "Cancel Gift" : "Gift this material"}
      </button>

      {isGifting && (
        <GiftForm material={material} close={() => setIsGifting(false)} />
      )}
    </div>
  );
}
