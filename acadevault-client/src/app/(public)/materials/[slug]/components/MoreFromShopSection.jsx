import { Store } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";
import MinimalMaterialCard from "@/components/cards/MinimalMaterialCard";
import { useGetMaterialsQuery } from "@/features/materials/academicMaterialsApi";

function MaterialGrid({
  materials = [],
  badge = "",
  CardComponent,
  gridClass = "grid grid-cols-2 gap-12",
  onClick = () => {}, // Optional click handler
}) {
  return (
    <div className={gridClass}>
      {materials.map((material) => (
        <div key={material._id || material.id} className="relative group">
          <CardComponent
            material={material}
            onClick={() => onClick(material)}
          />
          {badge && (
            <span className="absolute top-2 right-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium shadow-sm">
              {badge}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function MoreFromShopSection({ shopId }) {
  // Define your query parameters
  const limit = 8; // or any number that fits your UI
  const sort = "-createdAt"; // Example: newest first
  const page = 1;

  // Fetch shop materials
  const { data, isLoading, error, refetch } = useGetMaterialsQuery(
    { shopId, limit, sort, page },
    { refetchOnMountOrArgChange: true }
  );

  // Extract materials from the API response structure
  const materials = data?.materials || [];

  if (isLoading) {
    return (
      <div className="mt-14 text-center text-gray-500">
        Loading more from this creator...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-14 text-center text-red-500">
        Failed to load shop materials.{" "}
        <button onClick={refetch} className="underline text-blue-600">
          Try again
        </button>
      </div>
    );
  }

  if (materials.length === 0) return null;

  return (
    <section className="mt-14 space-y-6">
      <SectionHeader
        title="More from This Creator"
        icon={<Store className="w-5 h-5 text-green-600" />}
        link={`/shop/${shopId}`}
        align = "left"
        className = " flex justify-between items-center"
      />

      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
        <MaterialGrid
          materials={materials}
          badge="From this shop"
          CardComponent={MinimalMaterialCard}
          gridClass="flex gap-4 px-1 py-2"
          onClick={(material) =>
            console.log("Clicked material:", material.title)
          }
        />
      </div>
    </section>
  );
}
