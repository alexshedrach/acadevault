import Pagination from "@/components/ui/Pagination";

export default function MaterialPaginationFooter({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  loading,
}) {
  const shouldShowPagination = totalPages > 1; 

  return (
    shouldShowPagination && (
      <div className="mt-16">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          isLoading={loading}
          alwaysVisible={false} 
          minPagesToShow={2}
          onPageChangeStart={(page) => {
            console.log("Starting to change page:", page);
          }}
          onPageChangeEnd={(page) => {
            console.log("Finished changing page:", page);
          }}
        />
      </div>
    )
  );
}
