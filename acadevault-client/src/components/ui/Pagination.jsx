import { cn } from "@/utils/cn";
import { useEffect, useMemo, useRef } from "react";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
  FaSpinner,
} from "react-icons/fa";

/**
 * @param {number} currentPage
 * @param {number} totalPages
 * @param {function} onPageChange
 * @param {boolean} isLoading
 * @param {function} onPageChangeStart
 * @param {function} onPageChangeEnd
 * @param {boolean} alwaysVisible
 * @param {number} minPagesToShow
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
  onPageChangeStart,
  onPageChangeEnd,
  alwaysVisible = false,
  minPagesToShow = 2,
}) {
  // 1) Always call hooks first:
  const navRef = useRef(null);

  const paginationRange = useMemo(() => {
    if (totalPages <= 5) return [...Array(totalPages)].map((_, i) => i + 1);

    const range = [];
    const delta = 2;
    let left = Math.max(2, currentPage - delta);
    let right = Math.min(totalPages - 1, currentPage + delta);

    if (left > 2) range.push("...");
    for (let i = left; i <= right; i++) range.push(i);
    if (right < totalPages - 1) range.push("...");
    return [1, ...range, totalPages];
  }, [currentPage, totalPages]);

  const handlePageChange = async (page) => {
    if (isLoading || page === currentPage) return;
    onPageChangeStart?.(page);
    await onPageChange(page);
    onPageChangeEnd?.(page);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!navRef.current?.contains(document.activeElement)) return;
      if (e.key === "ArrowLeft" && currentPage > 1) {
        handlePageChange(currentPage - 1);
      } else if (e.key === "ArrowRight" && currentPage < totalPages) {
        handlePageChange(currentPage + 1);
      } else if (e.key === "Home") {
        handlePageChange(1);
      } else if (e.key === "End") {
        handlePageChange(totalPages);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, totalPages]);

  // 2) Now compute visibility
  const shouldShow = alwaysVisible || totalPages >= minPagesToShow;
  if (!shouldShow) return null;

  // 3) And finally return JSX
  return (
    <nav
      ref={navRef}
      className="flex justify-center mt-6"
      aria-label="Pagination"
    >
      <ul className="flex items-center gap-1 bg-white/10 p-2 rounded-md shadow-md">
        {/* First */}
        <PaginationButton
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1 || isLoading}
          icon={<FaAngleDoubleLeft size={16} />}
          label="First page"
        />
        {/* Prev */}
        <PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          icon={<FaAngleLeft size={16} />}
          label="Previous page"
        />
        {/* Range */}
        {paginationRange.map((p, i) =>
          p === "..." ? (
            <li key={i} className="px-3 py-2 text-gray-500 select-none">
              …
            </li>
          ) : (
            <PaginationButton
              key={i}
              onClick={() => handlePageChange(p)}
              disabled={isLoading}
              isActive={p === currentPage}
              label={`Page ${p}`}
              text={p}
            />
          )
        )}
        {/* Next */}
        <PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          icon={<FaAngleRight size={16} />}
          label="Next page"
        />
        {/* Last */}
        <PaginationButton
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages || isLoading}
          icon={<FaAngleDoubleRight size={16} />}
          label="Last page"
        />
        {/* Spinner */}
        {isLoading && (
          <li className="flex items-center px-3 py-2">
            <FaSpinner size={16} className="animate-spin text-blue-600" />
          </li>
        )}
      </ul>
    </nav>
  );
}

const PaginationButton = ({
  onClick,
  disabled,
  icon,
  isActive,
  text,
  label,
}) => (
  <li>
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "px-3 py-2 rounded-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        disabled
          ? "text-gray-400 cursor-not-allowed"
          : "text-gray-700 hover:bg-gray-200",
        isActive && "bg-blue-600 text-white font-semibold shadow-lg"
      )}
    >
      {icon || text}
    </button>
  </li>
);

// import { cn } from "@/utils/cn";
// import { useEffect, useMemo, useRef } from "react";
// import {
//   FaAngleDoubleLeft,
//   FaAngleDoubleRight,
//   FaAngleLeft,
//   FaAngleRight,
//   FaSpinner,
// } from "react-icons/fa";

// /**
//  * Pagination Component
//  *
//  * @param {number} currentPage - Current active page.
//  * @param {number} totalPages - Total number of pages.
//  * @param {function} onPageChange - Callback to change pages.
//  * @param {boolean} isLoading - Indicates if data for the new page is loading.
//  * @param {function} onPageChangeStart - Optional callback triggered before page change.
//  * @param {function} onPageChangeEnd - Optional callback triggered after page change.
//  * @param {boolean} alwaysVisible - If true, pagination is shown regardless of the page count.
//  * @param {number} minPagesToShow - Minimum pages required to display pagination (default: 2).
//  */
// export default function Pagination({
//   currentPage,
//   totalPages,
//   onPageChange,
//   isLoading = false,
//   onPageChangeStart,
//   onPageChangeEnd,
//   alwaysVisible = false,
//   minPagesToShow = 2,
// }) {
//   const navRef = useRef(null);

//   // Only show pagination if necessary
//   if (!alwaysVisible && totalPages < minPagesToShow) return null;

//   // Dynamically generates pagination numbers with ellipsis
//   const paginationRange = useMemo(() => {
//     if (totalPages <= 5) return [...Array(totalPages)].map((_, i) => i + 1);

//     const range = [];
//     const delta = 2;
//     let left = Math.max(2, currentPage - delta);
//     let right = Math.min(totalPages - 1, currentPage + delta);

//     if (left > 2) range.push("...");
//     for (let i = left; i <= right; i++) range.push(i);
//     if (right < totalPages - 1) range.push("...");

//     return [1, ...range, totalPages];
//   }, [currentPage, totalPages]);

//   // Handles a page change with optional lifecycle hooks
//   const handlePageChange = async (page) => {
//     if (isLoading || page === currentPage) return;
//     onPageChangeStart?.(page);
//     await onPageChange(page);
//     onPageChangeEnd?.(page);
//   };

//   // Enable keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (!navRef.current?.contains(document.activeElement)) return;

//       if (e.key === "ArrowLeft") {
//         if (currentPage > 1) handlePageChange(currentPage - 1);
//       } else if (e.key === "ArrowRight") {
//         if (currentPage < totalPages) handlePageChange(currentPage + 1);
//       } else if (e.key === "Home") {
//         handlePageChange(1);
//       } else if (e.key === "End") {
//         handlePageChange(totalPages);
//       }
//     };

//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, [currentPage, totalPages]);

//   return (
//     <nav
//       ref={navRef}
//       className="flex justify-center mt-6"
//       aria-label="Pagination Navigation"
//     >
//       <ul className="flex items-center gap-1 bg-white/10 p-2 rounded-md shadow-md">
//         {/* First Page */}
//         <PaginationButton
//           onClick={() => handlePageChange(1)}
//           disabled={currentPage === 1 || isLoading}
//           icon={<FaAngleDoubleLeft size={16} />}
//           label="First page"
//         />

//         {/* Previous Page */}
//         <PaginationButton
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1 || isLoading}
//           icon={<FaAngleLeft size={16} />}
//           label="Previous page"
//         />

//         {/* Page Numbers with Ellipsis */}
//         {paginationRange.map((page, index) =>
//           page === "..." ? (
//             <li key={index} className="px-3 py-2 text-gray-500 select-none">
//               …
//             </li>
//           ) : (
//             <PaginationButton
//               key={index}
//               onClick={() => handlePageChange(page)}
//               disabled={isLoading}
//               isActive={page === currentPage}
//               label={`Page ${page}`}
//               text={page}
//             />
//           )
//         )}

//         {/* Next Page */}
//         <PaginationButton
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages || isLoading}
//           icon={<FaAngleRight size={16} />}
//           label="Next page"
//         />

//         {/* Last Page */}
//         <PaginationButton
//           onClick={() => handlePageChange(totalPages)}
//           disabled={currentPage === totalPages || isLoading}
//           icon={<FaAngleDoubleRight size={16} />}
//           label="Last page"
//         />

//         {/* Loading Spinner */}
//         {isLoading && (
//           <li className="flex items-center px-3 py-2">
//             <FaSpinner size={16} className="animate-spin text-blue-600" />
//           </li>
//         )}
//       </ul>
//     </nav>
//   );
// }

// /**
//  * PaginationButton Component
//  */
// const PaginationButton = ({
//   onClick,
//   disabled,
//   icon,
//   isActive,
//   text,
//   label,
// }) => (
//   <li>
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       aria-label={label}
//       aria-disabled={disabled}
//       aria-current={isActive ? "page" : undefined}
//       tabIndex={disabled ? -1 : 0}
//       className={cn(
//         "px-3 py-2 rounded-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
//         disabled
//           ? "text-gray-400 cursor-not-allowed"
//           : "text-gray-700 hover:bg-gray-200",
//         isActive && "bg-blue-600 text-white font-semibold shadow-lg"
//       )}
//     >
//       {icon || text}
//     </button>
//   </li>
// );

// 🚀 How to Use It?

// 1️⃣ Basic Usage
// <Pagination
//   currentPage={3}
//   totalPages={10}
//   onPageChange={(page) => console.log(`Switched to page ${page}`)}
// />

// 2️⃣ Usage with Loading & Custom Events
// <Pagination
//   currentPage={5}
//   totalPages={20}
//   isLoading={loading}
//   onPageChange={(page) => fetchNewPageData(page)}
//   onPageChangeStart={(page) => console.log(`Starting to load page ${page}`)}
//   onPageChangeEnd={(page) => console.log(`Finished loading page ${page}`)}
// />
