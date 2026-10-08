import { HeartIcon, ShoppingCartIcon } from "lucide-react";
import { Button } from "../ui/Button";

export default function PurchaseActions() {
  return (
    <>
      <div className="flex justify-center items-center w-full bg-purple-600 hover:bg-purple-700 rounded-xl shadow-sm py-2 space-x-4">
        <button className="text-white text-sm font-extrabold py-2 px-1 flex items-center justify-center gap-1 rounded-md hover:bg-purple-800 transition">
          <ShoppingCartIcon className="w-4 h-4" />
          Add to Cart
        </button>

        <button className="text-white text-sm font-extrabold py-2 px-1 flex items-center justify-center gap-1 rounded-md hover:bg-purple-600 transition">
          <HeartIcon className="w-4 h-4" />
          Save for Later
        </button>
      </div>
      <Button
        variant="gradient"
        className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 text-sm font-medium"
      >
        Buy Now
      </Button>
    </>
  );
}
