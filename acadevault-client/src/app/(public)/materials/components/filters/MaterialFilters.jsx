"use client";

import { useCategoryData } from "@/hooks/useCategoryData";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PriceRangeSlider from "../../../../../components/common/PriceRangeSlider";
import BooleanFilters from "./BooleanFilters";
import DeliveryFormatFilter from "./DeliveryFormatFilter";
import FilterSection from "./FilterSection";
import LevelsWithDegreeFilter from "./LevelsWithDegreeFilter";

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 10000;

function MaterialFilters({ filters, onFilterChange, resetFilters }) {
  const {
    academicLevels,
    isLoadingAcademicLevels,
    errors: { academicError },
  } = useCategoryData({ autoFetch: true });

  // Prepare selected arrays for multi‐select filters
  const degreesSelected = useMemo(
    () => filters.academicDegree?.split(",") || [],
    [filters.academicDegree]
  );

  const deliveryFormatsSelected = useMemo(
    () => filters.deliveryFormat?.split(",") || [],
    [filters.deliveryFormat]
  );

  // Price range state
  const initialMin = Number(filters["price[gte]"]) || DEFAULT_MIN;
  const initialMax = Number(filters["price[lte]"]) || DEFAULT_MAX;
  const [priceRange, setPriceRange] = useState([initialMin, initialMax]);

  useEffect(() => {
    setPriceRange([initialMin, initialMax]);
  }, [initialMin, initialMax]);

  // Track expanded/collapsed state per section
  const [expanded, setExpanded] = useState({
    price: true,
    academic: true,
    delivery: true,
    flags: true,
  });

  const sectionRefs = useRef({});

  const toggleExpand = useCallback((key) => {
    setExpanded((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (!prev[key] && sectionRefs.current[key]) {
        sectionRefs.current[key].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      return next;
    });
  }, []);

  // Determine which filters are "active"
  const isPriceActive =
    priceRange[0] !== DEFAULT_MIN || priceRange[1] !== DEFAULT_MAX;
  const isAcademicActive = Boolean(
    filters.academicLevel || filters.academicDegree
  );
  const isDeliveryActive = deliveryFormatsSelected.length > 0;
  const isFlagsActive =
    filters.isFree === "true" ||
    filters.isFeatured === "true" ||
    filters.isTrending === "true";

  return (
    <>
      {/* Price Range Section */}
      <FilterSection
        id="price"
        title="Price Range"
        expanded={expanded}
        toggleExpand={toggleExpand}
        sectionRefs={sectionRefs}
        active={isPriceActive}
        onClear={() => {
          setPriceRange([DEFAULT_MIN, DEFAULT_MAX]);
          onFilterChange({ price: undefined });
        }}
      >
        <PriceRangeSlider
          value={priceRange}
          min={DEFAULT_MIN}
          max={DEFAULT_MAX}
          onChange={setPriceRange}
          onApply={([min, max]) => onFilterChange({ price: `${min}-${max}` })}
          onReset={() => {
            setPriceRange([DEFAULT_MIN, DEFAULT_MAX]);
            onFilterChange({ price: undefined });
          }}
          currency={filters.currency || "USD"}
        />
      </FilterSection>

      {/* Academic Level & Degree Section */}
      <FilterSection
        id="academic"
        title="Levels & Degrees"
        expanded={expanded}
        toggleExpand={toggleExpand}
        sectionRefs={sectionRefs}
        active={isAcademicActive}
        onClear={() =>
          onFilterChange({
            academicLevel: undefined,
            academicDegree: undefined,
          })
        }
        loading={isLoadingAcademicLevels}
        error={academicError}
      >
        <LevelsWithDegreeFilter
          data={academicLevels}
          defaultSelected={degreesSelected}
          onChange={({ level, degrees }) =>
            onFilterChange({
              academicLevel: degrees.length ? level : undefined,
              academicDegree: degrees.length ? degrees[0] : undefined,
            })
          }
        />
      </FilterSection>

      {/* Delivery Format Section */}
      <FilterSection
        id="delivery"
        title="Delivery Format"
        expanded={expanded}
        toggleExpand={toggleExpand}
        sectionRefs={sectionRefs}
        active={isDeliveryActive}
        onClear={() => onFilterChange({ deliveryFormat: undefined })}
      >
        <DeliveryFormatFilter
          defaultSelected={deliveryFormatsSelected}
          onChange={(sel) =>
            onFilterChange({
              deliveryFormat: sel.length ? sel : undefined,
            })
          }
        />
      </FilterSection>

      {/* Flags Section */}
      <FilterSection
        id="flags"
        title="Flags"
        expanded={expanded}
        toggleExpand={toggleExpand}
        sectionRefs={sectionRefs}
        active={isFlagsActive}
        onClear={() =>
          onFilterChange({
            isFree: undefined,
            isFeatured: undefined,
            isTrending: undefined,
          })
        }
      >
        <BooleanFilters
          defaultSelected={{
            isFree: filters.isFree === "true",
            isFeatured: filters.isFeatured === "true",
            isTrending: filters.isTrending === "true",
          }}
          onChange={(flags) =>
            onFilterChange({
              isFree: flags.isFree ? "true" : undefined,
              isFeatured: flags.isFeatured ? "true" : undefined,
              isTrending: flags.isTrending ? "true" : undefined,
            })
          }
        />
      </FilterSection>
    </>
  );
}

export default MaterialFilters;
