export default function DashboardSkeleton() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-white">
      <div className="space-y-4 text-center animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded mx-auto" />
        <div className="h-4 w-64 bg-gray-200 rounded mx-auto" />
        <div className="h-4 w-40 bg-gray-200 rounded mx-auto" />
      </div>
    </div>
  );
}
