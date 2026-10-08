"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useGetSubcategoriesQuery } from "@/features/category/categoryApi";
import CategorySpinner from "./CategorySpinner";
import SubcategoryGroup from "./SubcategoryGroup";
import MaterialTypeGroupGrid from "./MaterialTypeGroupGrid";
import { groupMaterialCategories } from "@/utils/materialTypeGroup";
import ErrorState from "@/components/states/ErrorState";
import LoadingState from "@/components/states/LoadingState";
import EmptyState from "@/components/states/EmptyState";

const truncate = (str, n) => (str.length > n ? str.slice(0, n) + "…" : str);

export default function SubcategoryDropdown({
  activeCategory,
  materialTypeCat = [],
  parentCategories = [],
  academicLevels = [],
  expandedState = {},
  toggleExpand,
  isLoading = false,
  isLoadingParents = false,
  isLoadingAcademicLevels = false,
}) {
  if (!activeCategory || activeCategory.path) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="subcat-dropdown"
        role="dialog"
        aria-modal="true"
        initial={{ opacity: 0, x: 20, scale: 0.98 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 10, scale: 0.97 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="absolute top-0 left-full w-[765px] max-w-[90vw] h-full max-h-[90vh] bg-white shadow-xl border border-yellow-500 rounded-xl p-4 z-50 overflow-y-auto backdrop-blur-sm"
      >
        <div className="grid grid-cols-2 gap-4">
          {/* 1. Static Categories */}
          {!activeCategory.isDynamic &&
            Object.entries(activeCategory.subCategories || {}).map(
              ([group, items]) => (
                <SubcategoryGroup
                  key={group}
                  groupName={group}
                  items={items}
                  icon="📌"
                  initiallyExpanded
                  columns={2}
                />
              )
            )}

          {/* 2. Academic Disciplines */}
          {activeCategory.name === "Academic Disciplines" && (
            <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              {isLoadingParents ? (
                <LoadingState
                  customSpinner={<CategorySpinner />}
                  message="Loading disciplines…"
                />
              ) : parentCategories.length === 0 ? (
                <EmptyState
                  title="No Disciplines Available"
                  message="There are currently no academic disciplines under this category."
                />
              ) : (
                parentCategories.map((parent) => {
                  const { data, isFetching, isError, error } =
                    useGetSubcategoriesQuery(
                      { parentId: parent._id },
                      { skip: !parent._id }
                    );

                  if (isFetching) {
                    return (
                      <LoadingState
                        key={parent._id}
                        text={`Loading ${truncate(parent.name, 40)}…`}
                      />
                    );
                  }

                  if (isError) {
                    return (
                      <ErrorState
                        key={parent._id}
                        title="Failed to Load Subcategories"
                        message={`Could not load disciplines for ${parent.name}`}
                        variant="server"
                      />
                    );
                  }

                  const items =
                    data?.subcategories?.map((sub) => ({
                      name: sub.name,
                      path: `/departments/${sub.slug}`,
                    })) ?? [];

                  return (
                    <SubcategoryGroup
                      key={parent._id}
                      groupName={truncate(parent.name, 50)}
                      items={items}
                      icon="📘"
                      columns={1}
                      initiallyExpanded={expandedState[parent._id] ?? false}
                      className="bg-gray-50 p-2 rounded shadow-sm"
                      limit={5}
                    />
                  );
                })
              )}
            </div>
          )}

          {/* 3. Academic Levels */}
          {activeCategory.name === "Academic Levels" && (
            <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              {isLoadingAcademicLevels ? (
                <LoadingState text="Loading academic levels…" />
              ) : academicLevels.length === 0 ? (
                <EmptyState
                  title="No Academic Levels"
                  message="There are no academic levels configured yet."
                />
              ) : (
                academicLevels.map((level) => (
                  <SubcategoryGroup
                    key={level.level}
                    groupName={level.level}
                    items={level.degrees.map((deg) => ({
                      name: deg.name,
                      path: {
                        pathname: "/materials/browse",
                        query: {
                          academicDegree: deg.name
                            .replace(/\./g, "")
                            .toUpperCase(),
                          academicLevel: level.level,
                        },
                      },
                    }))}
                    icon="🎓"
                    columns={2}
                    className="bg-gray-50 p-2 rounded shadow-sm"
                  />
                ))
              )}
            </div>
          )}

          {/* 4. Material Types */}
          {activeCategory.name === "Other Categories" && (
            <MaterialTypeGroupGrid
              groups={groupMaterialCategories(materialTypeCat)}
            />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
