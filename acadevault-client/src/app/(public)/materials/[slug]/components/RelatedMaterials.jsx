"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Heart } from "lucide-react";
import { useGetMaterialsQuery } from "@/features/materials/academicMaterialsApi";
import Loader from "@/components/ui/Loader";
import { AlertBox } from "@/components/ui/AlertBox";
import { motion } from "framer-motion";
import { StarRatingDisplay } from "@/components/rating/StarRating";
import { getImageUrl } from "@/utils/getImageUrl";

export default function RelatedMaterials({
  materialId,
  limit = 8,
  sort = "-score,-updatedAt",
  layout = "horizontal", // Reserved for future layout flexibility
  onCardClick,
}) {
  const { data, isLoading, error, refetch } = useGetMaterialsQuery(
    { materialId, related: true, limit, sort },
    { refetchOnMountOrArgChange: true }
  );

  
  const materials = data || [];
  console.log(data);
  
  if (isLoading) {
    return (
      <div className="py-8 flex justify-center">
        <Loader type="spinner" size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-6">
        <AlertBox
          variant="error"
          title="Failed to load related materials"
          onRetry={refetch}
          retryText="Try Again"
        >
          We encountered a problem fetching related materials. Please try again.
        </AlertBox>
      </div>
    );
  }

  if (materials.length === 0) {
    return (
      <div className="py-6">
        <AlertBox
          variant="info"
          title="No related materials found"
          onRetry={refetch}
          retryText="Try Again"
        >
          We couldn't find related materials for this content. Explore other
          categories or try refreshing.
        </AlertBox>
      </div>
    );
  }

  return (
    <section
      aria-labelledby="related-materials-heading"
      className="py-4 space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <h2
            id="related-materials-heading"
            className="text-lg font-semibold text-gray-900"
          >
            You Might Also Like
          </h2>
        </div>
        <Link
          href="/materials?related=true"
          className="text-sm text-blue-600 hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {materials.map((material) => (
          <RelatedMaterialCard
            key={material._id || material.id}
            material={material}
            onClick={onCardClick}
          />
        ))}
      </div>
    </section>
  );
}

function RelatedMaterialCard({ material, onClick }) {
  const handleClick = () => {
    onClick?.(material);
    console.log("Material clicked:", material.title);
  };

  const rating = material.rating || 4.5;
  const reviews = material.numReviews || 0;
  const finalPrice = material.finalPrice?.formatted || "₦0";
  const imageUrl = getImageUrl(material.thumbnail) || "/images/placeholder.png";
  const updated = material.updated || "Recently updated";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex gap-4 border-b border-gray-300 rounded-lg p-3 hover:shadow-md cursor-pointer transition"
      onClick={handleClick}
    >
      <div className="relative h-20 w-32 flex-shrink-0 rounded-md overflow-hidden">
        <Image
          src={imageUrl}
          alt={material.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col flex-grow justify-between">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
          <Link href={`/materials/${material.slug}`} target="_blank">
            {material.title}
          </Link>
        </h3>
        <div className="text-xs text-gray-500 mt-1">{updated}</div>

        <div className="flex items-center gap-1 mt-1 text-sm text-yellow-600 font-medium">
          <span>{rating}</span>
          <StarRatingDisplay average={parseFloat(rating)} count={reviews} />
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <span className="text-sm font-semibold text-gray-800">
          {finalPrice}
        </span>
        <button
          className="p-2 rounded-full hover:bg-gray-200"
          onClick={(e) => e.stopPropagation()}
        >
          <Heart className="w-4 h-4 text-purple-500" />
        </button>
      </div>
    </motion.div>
  );
}

// "use client";

// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { BookOpen, Heart } from "lucide-react";
// import { useGetRelatedMaterialsQuery } from "@/features/materials/academicMaterialsApi";
// import Loader from "@/components/ui/Loader";
// import { AlertBox } from "@/components/ui/AlertBox";
// import { cn } from "@/utils/cn";
// import { AnimatePresence, motion } from "framer-motion";
// import { StarRatingDisplay } from "@/components/rating/StarRating";
// import { getImageUrl } from "@/utils/getImageUrl";

// export default function RelatedMaterials({
//   materialId,
//   limit = 8,
//   sort = "-score,-updatedAt",
//   layout = "horizontal", // horizontal | vertical
//   onCardClick, // optional click handler
// }) {
//   const { data, isLoading, error, refetch } = useGetRelatedMaterialsQuery(
//     { materialId, limit, sort },
//     { refetchOnMountOrArgChange: true }
//   );

//   if (isLoading) {
//     return (
//       <div className="py-8 flex justify-center">
//         <Loader type="spinner" size="lg" />
//       </div>
//     );
//   }

//   if (error || !data || data.length === 0) {
//     return (
//       <div className="py-6">
//         <AlertBox
//           variant="info"
//           title="No related materials found"
//           onRetry={refetch}
//           retryText="Try Again"
//         >
//           We couldn't find related materials for this content. Explore other
//           categories or try refreshing.
//         </AlertBox>
//       </div>
//     );
//   }

//   return (
//     <section
//       aria-labelledby="related-materials-heading"
//       className="py-4 space-y-4"
//     >
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <BookOpen className="w-5 h-5 text-blue-600" />
//           <h2
//             id="related-materials-heading"
//             className="text-lg font-semibold text-gray-900"
//           >
//             You Might Also Like
//           </h2>
//         </div>
//         <Link
//           href="/materials?related=true"
//           className="text-sm text-blue-600 hover:underline"
//         >
//           View All
//         </Link>
//       </div>

//         <div className="space-y-4">
//           {data.map((mat) => (
//             <RelatedMaterialCard
//               key={mat._id}
//               material={mat}
//               onClick={onCardClick}
//             />
//           ))}
//         </div>

//     </section>
//   );
// }

// function RelatedMaterialCard({ material, onClick }) {
//   const handleClick = () => {
//     onClick?.(material);
//     console.log("Material clicked:", material.title);
//   };

//   const rating = material.rating || 4.5;
//   const reviews = material.numReviews || 200;
//   const finalPrice = material.finalPrice?.formatted || "₦0";
//   const imageUrl = getImageUrl(material.thumbnail) || "/images/placeholder.png";
//   const updated = material.updated || "Recently updated";

//   return (
//     <motion.div
//       whileHover={{ scale: 1.02 }}
//       className="flex gap-4 border-b border-gray-300 rounded-lg p-3 hover:shadow-md cursor-pointer transition"
//       onClick={handleClick}
//     >
//       <div className="relative h-20 w-32 flex-shrink-0 rounded-md overflow-hidden">
//         <Image
//           src={imageUrl}
//           alt={material.title}
//           fill
//           className="object-cover"
//         />
//       </div>

//       <div className="flex flex-col flex-grow justify-between">
//         <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
//           <Link href={`/materials/${material.slug}`} target="_blank">
//           {material.title}
//           </Link>
//         </h3>
//         <div className="text-xs text-gray-500 mt-1">{updated}</div>

//         <div className="flex items-center gap-1 mt-1 text-sm text-yellow-600 font-medium">
//           <span>{rating}</span>
//           <StarRatingDisplay
//             average={parseFloat(rating)}
//             count={reviews}
//           />
//           {/* <span className="text-gray-500 ml-1 text-xs">
//             ({reviews.toLocaleString()})
//           </span> */}
//         </div>
//       </div>

//       <div className="flex flex-col items-end justify-between">
//         <span className="text-sm font-semibold text-gray-800">
//           {finalPrice}
//         </span>
//         <button
//           className="p-2 rounded-full hover:bg-gray-200"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <Heart className="w-4 h-4 text-purple-500" />
//         </button>
//       </div>
//     </motion.div>
//   );
// }
