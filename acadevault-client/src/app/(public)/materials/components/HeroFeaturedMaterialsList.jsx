import AsyncStateHandler from "@/components/states/AsyncStateHandler";
import MaterialCard from "@/components/materials/MaterialCard/index";
import { motion } from "framer-motion";

export function HeroFeaturedMaterialsList({ materials, loading, error }) {
  return (
    <AsyncStateHandler
      loading={loading}
      error={error}
      onRetry={null}
      loaderText="Loading featured materials…"
      showEmptyState={true}
      isEmpty={materials.length === 0}
      emptyTitle="No featured materials"
      emptyMessage="Check back later for top academic picks."
    >
      {materials.map((material, i) => (
        <motion.div
          key={material.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="min-w-[17rem] md:min-w-sm"
        >
          <MaterialCard
            key={material.id}
            material={material}
            // ─── Card Behavior ─────────────────────────────
            // onClick={() => router.push(`/materials/${material._id}`)}
            // onQuickView={(mat) => onQuickView(mat)}
            // onWishlist={(id) => addToWishlist(id)}
            // onCompare={(id) => addToCompare(id)}
            // onAddToCart={(id) => addToCart(id)}
            // ─── Layout & Variant ───────────────────────────
            variant="default" // vertical layout
            layout="vertical" // explicitly vertical
            // ─── Which parts to show ───────────────────────
            showMeta={false} // “dept • degree (level)”
            showSummary={false} // show summary under title
            showPrice={true} // show price + discount
            showRating={true} // show star rating & count
            showActions={false} // show Quick View + wishlist + compare + addToCart
            showShopInfo={false} // don’t show shop logo/link here
            // ─── Card Styling ─────────────────────────────
            cardVariant="shadowed" // uses Card’s “shadowed” style
            cardTheme="light" // light theme
            clickable={true} // entire card is focusable + clickable
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 pb-4"
          />
        </motion.div>
      ))}
    </AsyncStateHandler>
  );
}
