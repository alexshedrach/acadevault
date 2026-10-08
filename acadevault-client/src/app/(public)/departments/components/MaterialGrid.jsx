"use client";

import EmptyState from "@/components/states/EmptyState";
import Loader from "@/components/ui/Loader";
import Pagination from "@/components/ui/Pagination";
import { useMaterials } from "@/hooks/materialHooks/useMaterials";
import React, { useEffect, useState } from "react";


export default function MaterialGrid({
  initialData,
  initialSearchParams = {},
  filters = {},
}) {
  const [currentPage, setCurrentPage] = useState(
    Number(initialSearchParams.page) || 1
  );

  const { data, isLoading, isFetching, isError, error, refetch } = useMaterials(
    {
      ...initialSearchParams,
      ...filters,
      page: currentPage,
    }
  );

  const materials = data?.materials || initialData?.materials || [];
  const totalPages =
    data?.pagination?.totalPages || initialData?.pagination?.totalPages || 1;

  useEffect(() => {
    if (currentPage !== (initialSearchParams.page || 1)) {
      refetch();
    }
  }, [currentPage]);

  if (isLoading && !materials.length) {
    return <Loader type="spinner" text="loading" className="mt-20" />;
  }

  if (!materials.length) {
    return (
      <EmptyState
        title="No Materials Found"
        description="Try refining your search filters or check back later."
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((material) => (
          <MaterialCard key={material._id || material.id} material={material} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          isLoading={isFetching}
        />
      )}
    </div>
  );
}

function MaterialCard({ material }) {
  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-muted shadow-sm hover:shadow transition">
      <h3 className="text-lg font-semibold">{material.title}</h3>
      <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
        {material.description}
      </p>
      <div className="mt-3 text-sm text-right">
        <span className="font-medium text-primary">
          {material.priceFormatted || "Free"}
        </span>
      </div>
    </div>
  );
}