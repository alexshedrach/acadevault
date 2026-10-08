"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Banner from "@/components/ui/Banner";
import Pagination from "@/components/ui/Pagination";
import Loader from "@/components/ui/Loader";
import DepartmentFilterBar from "./DepartmentFilterBar";
import DepartmentCard from "./DepartmentCard";
import { useGetDepartmentsQuery } from "@/features/category/categoryApi";
import useDebounceValue from "@/hooks/useDebouncedValue";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata } from "@/utils/generatePageMetadata";

// SEO Metadata
export const metadata = generatePageMetadata({
  title: "Departments - Acadavault",
  description:
    "Explore academic materials by department with advanced filtering and sorting.",
  slug: "departments",
  image: "https://acadevault.com/images/departments-og.jpg",
});

// Animation variants for smooth transitions
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, delay: 0.3 } },
};

/**
 * Client-side component for rendering the departments list with filtering and pagination
 * @param {Object} props
 * @param {Object} props.initialData - Initial server-fetched department data
 * @param {Object} props.initialSearchParams - Initial search parameters
 */
export default function ClientDepartments({
  initialData,
  initialSearchParams,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state with search parameters
  const [params, setParams] = useState({
    ...initialSearchParams,
    page: Number(searchParams.get("page")) || 1,
    limit: 20,
    sort: searchParams.get("sort") || "-createdAt",
    search: searchParams.get("search") || "",
  });

  // Debounce search input to reduce API calls
  const debouncedSearch = useDebounceValue(params.search, {
    delay: 300,
    enabled: true,
  });

  // Fetch departments using RTK Query
  const { data, isFetching, isError, refetch } = useGetDepartmentsQuery(
    {
      ...params,
      search: debouncedSearch,
      limit: 20,
    },
    {
      skip: !debouncedSearch && !Object.keys(initialSearchParams).length,
    }
  );

  // Fallback to initial data if query fails
  const departments = useMemo(() => {
    return data?.departments || initialData?.departments || [];
  }, [data, initialData]);

  const pagination = useMemo(() => {
    return (
      data?.pagination ||
      initialData?.pagination || {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
      }
    );
  }, [data, initialData]);

  // Update URL when parameters change
  useEffect(() => {
    const query = new URLSearchParams();
    if (params.page > 1) query.set("page", params.page.toString());
    if (params.sort !== "-createdAt") query.set("sort", params.sort);
    if (params.search) query.set("search", params.search);
    query.set("limit", "20");
    router.push(`/departments?${query.toString()}`, { scroll: false });
  }, [params.page, params.sort, params.search, router]);

  // Handle errors with toast notifications
  useEffect(() => {
    if (isError) {
      toast.error("Failed to load departments. Please try again.");
    }
  }, [isError]);

  // Handle search query changes
  const handleSearchChange = (value) => {
    setParams((prev) => ({ ...prev, search: value, page: 1 }));
  };

  // Handle sort changes
  const handleSortChange = (value) => {
    setParams((prev) => ({ ...prev, sort: value, page: 1 }));
    refetch();
  };

  // Handle pagination changes
  const handlePageChange = (newPage) => {
    setParams((prev) => ({ ...prev, page: newPage }));
    document
      .getElementById("department-list")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen">
      {/* Banner Section */}
      <Banner
        titleLine1="Academic Materials"
        titleLine2="By Department"
        subtitle="Find resources, notes, past questions, and curated materials for every field of study."
        description="We’ve organized materials across diverse academic disciplines to help you excel. Whether you’re in Engineering, Medicine, Arts, or Sciences, you’ll find top-quality resources tailored to your department."
        // badgeText="Trusted by 10,000+ Students"
        ctaText="Browse All Materials"
        ctaHref="/materials/browse"
        ctaButtons={[
          {
            label: "Upload Your Material",
            href: "/materials/upload",
            variant: "tertiary",
            target: "_blank",
          },
        ]}
        backgroundImage="/images/departments-banner.jpg"
        textAlignment="left"
        buttonAlignment="left"
        buttonLayout="inline"
        // gradientFrom="rgba(0, 0, 0, 0.6)"
        // gradientTo="rgba(0, 0, 0, 0.3)"
        // overlayColor="rgba(0, 0, 0, 0.4)"
        overlayOpacity={60}
        animationType="kenburns-right"
        tagline="Your academic success starts here."
        maxWidth="max-w-5xl"
        padding="px-6 sm:px-12 md:px-20"
        enableAnimation={true}
        className="py-10"
      />

      {/* Main Content Section */}
      <section
        className="bg-gradient-to-b from-gray-50 to-gray-100"
        aria-label="Department list"
      >
        {/* Filter Bar */}
        <DepartmentFilterBar
          searchQuery={params.search}
          setSearchQuery={handleSearchChange}
          sortValue={params.sort}
          handleSortChange={handleSortChange}
        />

        {/* Department List */}
        <motion.div
          id="department-list"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-live="polite"
          className="px-4"
        >
          {isFetching ? (
            <Loader
              type="spinner"
              size="lg"
              text="Fetching Departments..."
              className="my-12"
            />
          ) : departments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {departments.map((dept, index) => (
                <DepartmentCard
                  key={dept._id}
                  department={dept}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <NoResults />
          )}
        </motion.div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <nav
            className="py-12 flex justify-center"
            aria-label="Department pagination"
          >
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
              alwaysVisible={false}
              isLoading={isFetching}
            />
          </nav>
        )}
      </section>
    </main>
  );
}

/**
 * Component for no search results
 */
function NoResults() {
  return (
    <section
      className="flex flex-col items-center justify-center py-12"
      aria-label="No results"
    >
      <motion.img
        src="/images/no-results.svg"
        alt="No results found"
        className="w-48 h-48"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />
      <p className="text-gray-600 text-lg mt-4">
        No departments found. Try a different search term.
      </p>
    </section>
  );
}
