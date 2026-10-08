"use client";

import { useMemo } from "react";
import { Flag, XCircle, Link as LinkIcon, Clock } from "lucide-react";

import { cn } from "@/utils/cn";
import { useContainerDimensions } from "@/hooks/useContainerDimensions";
import MaterialsListingCard from "./MaterialsListingCard";

export default function MaterialListingCardSection({
  materials = [],
  isSidebarCollapsed,
  onWishlist,
  onCompare,
  onAddToCart,
  onRate,
}) {
  const { containerRef, dimensions } = useContainerDimensions();
  const isNarrow = dimensions.width < 768;

  const layoutType = isSidebarCollapsed ? "grid" : "list";

  const layoutClasses = useMemo(
    () =>
      cn("gap-8", {
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-2 sm:px-0":
          layoutType === "grid",
        "justify-center": layoutType === "grid" && isNarrow,
        "flex flex-col divide-y divide-gray-200": layoutType === "list",
      }),
    [layoutType, isNarrow]
  );

  return (
    <div ref={containerRef} className={layoutClasses}>
      {materials.map((mat, idx) => {
        const key = mat.id ?? mat.slug ?? `material-${idx}`;

        const contextMenuItems =
          layoutType === "list"
            ? [
                {
                  label: "Report",
                  icon: <Flag />,
                  onClick: () => console.log("Report", mat.id),
                },
                {
                  label: "Not Interested",
                  icon: <XCircle />,
                  onClick: () => console.log("Not Interested", mat.id),
                },
                {
                  label: "Copy Link",
                  icon: <LinkIcon />,
                  onClick: () =>
                    navigator.clipboard.writeText(
                      `${window.location.origin}/materials/${mat.slug}`
                    ),
                },
                {
                  label: "Save for Later",
                  icon: <Clock />,
                  onClick: () => console.log("Saved", mat.id),
                },
              ]
            : undefined;

        return (
          <MaterialsListingCard
            key={key}
            material={mat}
            variant={layoutType}
            contextMenuItems={contextMenuItems}
            onWishlist={onWishlist}
            onCompare={onCompare}
            onAddToCart={onAddToCart}
            onRate={onRate}
          />
        );
      })}
    </div>
  );
}
