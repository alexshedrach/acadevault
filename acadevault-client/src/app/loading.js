export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Title Skeleton */}
      <div className="h-8 bg-gray-300 w-2/5 mx-auto rounded"></div>

      {/* Grid-like Skeleton Loader */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="p-4 bg-gray-200 rounded-lg shadow-md space-y-3"
          >
            {/* Thumbnail Placeholder */}
            <div className="h-36 bg-gray-300 rounded-md"></div>

            {/* Title Placeholder */}
            <div className="h-6 bg-gray-300 w-3/4 rounded"></div>

            {/* Description Placeholder */}
            <div className="h-4 bg-gray-300 w-5/6 rounded"></div>
            <div className="h-4 bg-gray-300 w-4/6 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
