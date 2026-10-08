"use client";

import React from "react";
import {
  Bookmark,
  Shuffle,
  ShoppingCart,
  Flag,
  XCircle,
  Clock,
  Link as LinkIcon,
  MoreHorizontal,
  Eye,
} from "lucide-react";
import HoverableActionButton from "./HoverableActionButton";
import ContextMenu from "../ui/ContextMenu";

const HoverableActionBar = ({
  isFree,
  onWishlist,
  onCompare,
  onAddToCart,
  onQuickView,
}) => {
  return (
    <div className="absolute top-2 right-2 flex flex-col items-center z-50">
      {/* ───────────────────────────────────────────────────────────
          1) ContextMenu Trigger: always visible (not tied to group-hover)
             We use a simple “MoreHorizontal” icon here. Clicking it opens
             the menu in place.
        ────────────────────────────────────────────────────────────── */}
      <ContextMenu
        align="right"
        icon={
          <MoreHorizontal className="w-5 h-5 text-gray-700 hover:text-orange-600" />
        }
        items={[
          {
            label: "Report",
            icon: <Flag className="w-4 h-4" />,
            onClick: () => console.log("Reported"),
          },
          {
            label: "Not Interested",
            icon: <XCircle className="w-4 h-4" />,
            onClick: () => console.log("Not Interested"),
          },
          {
            label: "Copy Link",
            icon: <LinkIcon className="w-4 h-4" />,
            onClick: () => navigator.clipboard.writeText(window.location.href),
          },
          {
            label: "Save for Later",
            icon: <Clock className="w-4 h-4" />,
            onClick: () => console.log("Saved for later"),
          },
        ]}
      />

      {/* ──────────────────────────────────────────────────────────
          2) The other action buttons (Wishlist, Compare, AddToCart) only
             appear on group-hover of the parent thumbnail. We wrap them in
             a separate <div> that is initially opacity-0 but becomes opacity-100
             when “group-hover” is present on the grandparent.
         ────────────────────────────────────────────────────────── */}
      <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <HoverableActionButton
          icon={Bookmark}
          label="Add to Wishlist"
          onClick={onWishlist}
        />
        <HoverableActionButton
          icon={Shuffle}
          label="Compare"
          onClick={onCompare}
        />
        <HoverableActionButton
          icon={Eye}
          label="Quick View"
          onClick={onQuickView}
        />
        {!isFree && (
          <HoverableActionButton
            icon={ShoppingCart}
            label="Add to Cart"
            onClick={onAddToCart}
          />
        )}
      </div>
    </div>
  );
};

export default HoverableActionBar;

// import React from "react";
// import {
//   Bookmark,
//   Shuffle,
//   ShoppingCart,
//   Flag,
//   XCircle,
//   Clock,
//   Link as LinkIcon,
// } from "lucide-react";
// import HoverableActionButton from "./HoverableActionButton";
// import ContextMenu from "../ui/ContextMenu";

// const HoverableActionBar = ({ isFree, onWishlist, onCompare, onAddToCart }) => (
//   <div className="absolute top-2 right-2 flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
//     <HoverableActionButton
//       icon={Bookmark}
//       label="Add to Wishlist"
//       onClick={onWishlist}
//     />
//     <HoverableActionButton icon={Shuffle} label="Compare" onClick={onCompare} />
//     {!isFree && (
//       <HoverableActionButton
//         icon={ShoppingCart}
//         label="Add to Cart"
//         onClick={onAddToCart}
//       />
//     )}
//     <ContextMenu
//       align="right"
//       iconClassName="text-gray-700 hover:text-orange-600"
//       items={[
//         {
//           label: "Report",
//           icon: <Flag className="w-4 h-4" />,
//           onClick: () => console.log("Reported"),
//         },
//         {
//           label: "Not Interested",
//           icon: <XCircle className="w-4 h-4" />,
//           onClick: () => console.log("Not Interested"),
//         },
//         {
//           label: "Copy Link",
//           icon: <LinkIcon className="w-4 h-4" />,
//           onClick: () => navigator.clipboard.writeText(window.location.href),
//         },
//         {
//           label: "Save for Later",
//           icon: <Clock className="w-4 h-4" />,
//           onClick: () => console.log("Saved for later"),
//         },
//       ]}
//     />
//   </div>
// );

// export default HoverableActionBar;
