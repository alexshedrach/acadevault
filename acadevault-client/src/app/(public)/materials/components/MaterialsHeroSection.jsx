"use client";

import PropTypes from "prop-types";
import { useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import useTotalEffectivePrice from "@/hooks/useBulkEffectivePrices";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/utils/formatPrice";
import Loader from "@/components/ui/Loader";
import BundleMaterialCard from "@/components/cards/BundleMaterialCard";
import MaterialCard from "@/components/materials/materialCard/index";
import { HeroFeaturedMaterialsList } from "./HeroFeaturedMaterialsList";

export default function MaterialsHeroSection({
  materials = [],
  loading = false,
  error = null,
  onAddAllToCart = () => {},
}) {
  // Map materials to price inputs
  const mappedMaterials = useMemo(
    () =>
      materials.map((mat) => ({
        id: mat.id,
        basePrice: mat.basePrice,
        type: mat.materialType,
      })),
    [materials]
  );

  const {
    totalPrice,
    currency,
    loading: totalPriceLoading,
  } = useTotalEffectivePrice(mappedMaterials);

  const handleAddAll = useCallback(() => {
    if (!loading && materials.length > 0) {
      onAddAllToCart(materials);
    }
  }, [materials, loading, onAddAllToCart]);

  return (
    <section
      className="relative bg-gradient-to-br from-gray-100 to-slate-50 py-12 px-4 sm:px-6 lg:px-10 border-b border-gray-200"
      aria-labelledby="material-hero-heading"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* ─── LEFT: Hero Text & CTA ─── */}
        <div className="flex flex-col justify-start">
          <motion.h1
            id="material-hero-heading"
            className="text-2xl sm:text-3xl lg:text-5xl font-medium text-gray-900 leading-tight tracking-tight mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Explore &amp; Bundle
            </span>{" "}
            Top <span className="text-blue-700">Academic Materials</span>
          </motion.h1>

          <motion.p
            className="text-gray-700 text-lg sm:text-xl lg:text-2xl max-w-2xl mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Access{" "}
            <span className="font-semibold text-gray-900">premium notes</span>,{" "}
            <span className="font-semibold text-gray-900">research papers</span>
            , and{" "}
            <span className="font-semibold text-gray-900">study guides</span> by
            verified authors.{" "}
            <span className="text-blue-700 font-medium">
              Bundle &amp; save instantly.
            </span>
          </motion.p>

          <ul className="space-y-2 mb-6 text-gray-700" role="list">
            {[
              "Verified contributors",
              "Instant PDF & ePub downloads",
              "Secure, academic-grade licensing",
            ].map((text) => (
              <li key={text} className="flex items-center">
                <FiCheck
                  className="mr-2 text-green-600 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>{text}</span>
              </li>
            ))}
          </ul>

          {/* CTA: Add All to Cart */}
          {materials.length > 0 && (
            <Button
              onClick={handleAddAll}
              className="w-full md:w-auto flex justify-between items-center gap-4 text-white font-semibold bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              aria-label={`Add all ${
                materials.length
              } items to cart for ${formatCurrency(totalPrice, currency)}`}
              disabled={totalPriceLoading}
            >
              <span>
                {loading
                  ? "Loading featured items…"
                  : `Add ${materials.length} Items to Cart`}
              </span>
              <span className="font-bold">
                {totalPriceLoading
                  ? "Calculating…"
                  : formatCurrency(totalPrice, currency)}
              </span>
            </Button>
          )}
        </div>

        {/* ─── RIGHT: Featured Materials List or Loader ─── */}
        <div
          className="relative flex align-center gap-4 p-4 overflow-x-auto no-scrollbar snap-x snap-mandatory border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition"
          role="region"
          aria-label="Featured academic materials"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.currentTarget.scrollBy({ left: 200, behavior: "smooth" });
            } else if (e.key === "ArrowLeft") {
              e.currentTarget.scrollBy({ left: -200, behavior: "smooth" });
            }
          }}
        >
          <HeroFeaturedMaterialsList
            materials={materials}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </section>
  );
}

MaterialsHeroSection.propTypes = {
  materials: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      basePrice: PropTypes.number,
      materialType: PropTypes.string,
      // ...other fields as needed
    })
  ),
  loading: PropTypes.bool,
  error: PropTypes.any,
  onAddAllToCart: PropTypes.func,
};
