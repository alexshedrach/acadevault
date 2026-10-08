"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

import { useCategoryData } from "@/hooks/useCategoryData";
import AnimatedSectionHeader from "@/components/common/AnimatedSectionHeader";
import Container from "@/components/layout/Container";
import MaterialQuickViewModal from "@/components/modals/MaterialQuickViewModal";
import AsyncStateHandler from "@/components/states/AsyncStateHandler";
import { Button } from "@/components/ui/Button";
import NewReleaseMaterials from "./NewReleaseMaterials";

// Array of animated phrases for the heading
const phrases = [
  "New Releases: Research & Reports",
  "Peer-Reviewed Insights Await",
  "Elevate Your Study Today",
];

// One-line description for the section (unused here since we passed a fallbackTitle)
// But kept for reference or future use
const shortDescription =
  "Explore our latest, expertly vetted academic reports and guides discover the knowledge you need in seconds.";

export default function NewReleasesSection({ newArrivalsMaterials }) {
  // ─────────────────────────────────────────────────────────────────────────────
  // State to track which material is open in the quick-view modal
  const [quickViewMaterial, setQuickViewMaterial] = useState(null);

  // ─────────────────────────────────────────────────────────────────────────────
  // State to track the selected undergraduate degree filter
  // Initially set to empty string; will be updated once academicLevels data arrives
  const [selectedUndergradDegree, setSelectedUndergradDegree] = useState("");

  // State to track the selected postgraduate degree filter
  // Initially set to empty string; will be updated once academicLevels data arrives
  const [selectedPostgradDegree, setSelectedPostgradDegree] = useState("");

  // Next.js router instance for programmatic navigation
  const router = useRouter();

  // ─────────────────────────────────────────────────────────────────────────────
  // Fetch academic levels and degrees (Undergraduate, Postgraduate, etc.)
  const {
    academicLevels, // Array of { level: "Undergraduate" | "Postgraduate", degrees: [...] }
    isLoadingAcademicLevels, // Boolean for loading state
    errors: { academicError }, // Any error that occurred during fetch
    refetchers: { refetchAcademicLevels }, // Function to retry fetching
  } = useCategoryData();

  // If fetching academic levels fails, show a toast error (assuming toast is globally available)
  useEffect(() => {
    if (academicError) {
      toast.error("Failed to load academic levels & degrees");
    }
  }, [academicError]);

  // ─────────────────────────────────────────────────────────────────────────────
  // Determine if the passed data is null (indicating an error retrieving new arrivals)
  const error = newArrivalsMaterials === null;

  // Safely extract materials array from the data, or fallback to empty array
  const materials = Array.isArray(newArrivalsMaterials?.materials)
    ? newArrivalsMaterials.materials
    : [];

  // Check if there are no errors and no materials (for empty state)
  const isEmpty = !error && materials.length === 0;

  // ─────────────────────────────────────────────────────────────────────────────
  // From academicLevels, find the “Undergraduate” level and map its degrees into { key, name } pairs
  const undergradDegrees = useMemo(() => {
    const undergrad = academicLevels.find((l) => l.level === "Undergraduate");
    return (
      undergrad?.degrees?.map((d) => ({
        key: d.code,
        name: d.name,
      })) || []
    );
  }, [academicLevels]);

  // From academicLevels, find the “Postgraduate” level and map its degrees
  const postgradDegrees = useMemo(() => {
    const postgrad = academicLevels.find((l) => l.level === "Postgraduate");
    return (
      postgrad?.degrees?.map((d) => ({
        key: d.code,
        name: d.name,
      })) || []
    );
  }, [academicLevels]);

  /**
   * As soon as undergradDegrees is fetched, set the default selectedUndergradDegree
   * to the first degree's key, if none is currently selected.
   */
  useEffect(() => {
    if (
      undergradDegrees.length > 0 &&
      !selectedUndergradDegree // if not set yet
    ) {
      setSelectedUndergradDegree(undergradDegrees[0].key);
    }
  }, [undergradDegrees, selectedUndergradDegree]);

  /**
   * As soon as postgradDegrees is fetched, set the default selectedPostgradDegree
   * to the first degree's key, if none is currently selected.
   */
  useEffect(() => {
    if (
      postgradDegrees.length > 0 &&
      !selectedPostgradDegree // if not set yet
    ) {
      setSelectedPostgradDegree(postgradDegrees[0].key);
    }
  }, [postgradDegrees, selectedPostgradDegree]);

  /**
   * Filters the full materials array by academic level (Undergraduate or Postgraduate)
   * and by the currently selected degree key. Returns only matching materials.
   */
  const filterByLevelAndDegree = useCallback(
    (level, selectedDegreeKey) => {
      return materials.filter((material) => {
        // Check academicLevel matches (string equality)
        const matchesLevel = material.academicLevel === level;

        // Match exact degree key (no “All” fallback anymore)
        const matchesDegree = material.academicDegree === selectedDegreeKey;

        return matchesLevel && matchesDegree;
      });
    },
    [materials]
  );

  // Memoize the filtered list of undergraduate materials
  const undergradMaterials = useMemo(
    () => filterByLevelAndDegree("Undergraduate", selectedUndergradDegree),
    [filterByLevelAndDegree, selectedUndergradDegree]
  );

  // Memoize the filtered list of postgraduate materials
  const postgradMaterials = useMemo(
    () => filterByLevelAndDegree("Postgraduate", selectedPostgradDegree),
    [filterByLevelAndDegree, selectedPostgradDegree]
  );

  /**
   * Opens the quick-view modal for a given material.
   * Also updates the URL query string to include ?quick=<material.slug> for deep linking.
   */
  const handleQuickView = useCallback((material) => {
    // Push a new history entry without reloading: ?quick=<slug>
    window.history.pushState(null, "", `?quick=${material.slug}`);
    setQuickViewMaterial(material);
  }, []);

  /**
   * Closes the quick-view modal and resets the URL to its base path (removing any query string).
   */
  const closeQuickView = useCallback(() => {
    setQuickViewMaterial(null);
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  // Placeholder handlers for cart, wishlist, compare actions
  const handleAddToCart = (id) => console.log("Add to cart:", id);
  const handleWishlist = (id) => console.log("Add to wishlist:", id);
  const handleCompare = (id) => console.log("Compare material:", id);

  // Derive loading and error flags for the AsyncStateHandler
  const isLoading = isLoadingAcademicLevels;
  const hasError = academicError;

  // Retry function for AsyncStateHandler if fetching academic levels fails
  const handleRetry = () => refetchAcademicLevels();

  return (
    <Container
      as="section"
      role="region" // Landmark role for accessibility
      aria-labelledby="new-releases-heading" // Linking to an explicit heading label
      background="white"
      className="py-16 px-0 sm:px-8"
    >
      {/* Animated section header with fallback title and accessibility label */}
      <AnimatedSectionHeader
        sequences={phrases}
        // Uncomment below to show a description under the heading
        // description={shortDescription}
        fallbackTitle="Discover Academic Excellence"
        ariaLabel="Animated section heading"
        displayDuration={2500}
        typingSpeed={55}
      />

      {/* AsyncStateHandler shows loading spinner, error message, or empty UI as needed */}
      <AsyncStateHandler
        loading={isLoading}
        error={hasError}
        onRetry={handleRetry}
        showEmptyState={true}
        isEmpty={isEmpty}
        emptyTitle="No New Releases Found"
        emptyMessage="We couldn’t find any new academic materials right now. Please check back soon."
        centered={false}
      >
        {/* Render the “Undergraduate Projects” grid */}
        <NewReleaseMaterials
          title="Undergraduate Projects"
          description="Explore materials for your first level of tertiary education."
          materials={undergradMaterials} // filtered list
          subcategories={undergradDegrees.map((d) => ({
            _id: d.key,
            name: d.name,
          }))}
          selectedFilter={selectedUndergradDegree} // current dropdown selection
          onSelectFilter={setSelectedUndergradDegree} // handler when a degree is chosen
          router={router}
          onQuickView={handleQuickView} // open quick-view modal
          handleAddToCart={handleAddToCart}
          handleWishlist={handleWishlist}
          handleCompare={handleCompare}
        />

        {/* Render the “Postgraduate Materials” grid */}
        <NewReleaseMaterials
          title="Postgraduate Materials"
          description="Explore advanced academic resources for higher-level studies."
          materials={postgradMaterials}
          subcategories={postgradDegrees.map((d) => ({
            _id: d.key,
            name: d.name,
          }))}
          selectedFilter={selectedPostgradDegree}
          onSelectFilter={setSelectedPostgradDegree}
          router={router}
          onQuickView={handleQuickView}
          handleAddToCart={handleAddToCart}
          handleWishlist={handleWishlist}
          handleCompare={handleCompare}
        />
      </AsyncStateHandler>

      {/* Call-to-action button that always shows, regardless of loading/error states */}
      <div className="mt-12 text-center">
        <Button
          as="a"
          href="/materials"
          target="_blank"
          variant="gradient"
          size="md"
        >
          View More Materials
        </Button>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewMaterial && (
          <MaterialQuickViewModal
            material={quickViewMaterial} // Pass the selected material
            onClose={closeQuickView} // Close handler
          />
        )}
      </AnimatePresence>
    </Container>
  );
}
