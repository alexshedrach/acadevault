"use client";

import React from "react";
import ErrorState from "../states/ErrorState";
import EmptyState from "../states/EmptyState";
import LoadingState from "../states/LoadingState";
import { AlertBox } from "../ui/AlertBox";
import { Button } from "../ui/Button";

const normalizeError = (error) => {
  if (!error) return "Something went wrong.";
  if (typeof error === "string") return error;
  if (typeof error === "object") {
    if ("message" in error && typeof error.message === "string")
      return error.message;
    if (
      "data" in error &&
      typeof error.data === "object" &&
      "message" in error.data
    )
      return (error.data ).message;
  }
  return "Unexpected error occurred.";
};



/**
 * A professional, production-grade async state handler that leverages
 * the standardized LoadingState, ErrorState, EmptyState, and AlertBox components.
 */
const AsyncStateHandler = ({
  loading,
  error,
  onRetry,
  loaderText = "Loading...",
  errorMessage,
  useAlertBoxForError = false,
  alertBoxProps = {},
  showEmptyState = false,
  isEmpty = false,
  emptyTitle = "No content available",
  emptyMessage = "We couldn't find any items to display.",
  emptyIcon,
  centered = false,
  className = "",
  children,
}) => {
  if (loading) {
    return (
      <LoadingState
        message={loaderText}
        alignment={centered ? "center" : "left"}
        className={className}
      />
    );
  }

  if (error) {
    const normalizedError = errorMessage || normalizeError(error);

    if (useAlertBoxForError) {
      return (
        <AlertBox
          variant="error"
          title="Error loading content"
          onRetry={onRetry}
          retryText="Retry"
          dismissible
          className={className}
          {...alertBoxProps}
        >
          {normalizedError}
        </AlertBox>
      );
    }

    return (
      <ErrorState
        title="Error loading content"
        message={normalizedError}
        action={
          onRetry && (
            <Button
              onClick={onRetry}
              variant="outline"
              size="sm"
              aria-label="Retry loading"
            >
              Retry
            </Button>
          )
        }
        className={className}
      />
    );
  }

  if (showEmptyState && isEmpty) {
    return (
      <EmptyState
        title={emptyTitle}
        message={emptyMessage}
        icon={emptyIcon}
        alignment={centered ? "center" : "left"}
        className={className}
      />
    );
  }

  return <>{children}</>;
};

export default AsyncStateHandler;

// USAGE
// 1. Standard usage (fallback to ErrorState)

{/* <AsyncStateHandler
  loading={isLoading}
  error={error}
  onRetry={refetch}
  showEmptyState
  isEmpty={data?.length === 0}
>
  <YourContentComponent />
</AsyncStateHandler>; */}


// 2. Use AlertBox instead of ErrorState
{/* <AsyncStateHandler
  loading={isLoading}
  error={error}
  onRetry={refetch}
  useAlertBoxForError
  alertBoxProps={{
    autoDismiss: true,
    duration: 7000,
    compact: true,
  }}
>
  <YourContentComponent />
</AsyncStateHandler>; */}




// import React from "react";
// import ErrorState from "../states/ErrorState";
// import EmptyState from "../states/EmptyState";
// import LoadingState from "../states/LoadingState";

// const normalizeError = (error) => {
//   if (!error) return "Something went wrong.";
//   if (typeof error === "string") return error;
//   if (typeof error === "object") {
//     if (error.message) return error.message;
//     if (error.data?.message) return error.data.message;
//   }
//   return "Unexpected error occurred.";
// };

// /**
//  * A professional, production-grade async state handler that leverages
//  * the standardized LoadingState, ErrorState, and EmptyState components.
//  */
// const AsyncStateHandler = ({
//   loading,
//   error,
//   onRetry,
//   children,
//   loaderText = "Loading...",
//   errorMessage,
//   showEmptyState = false,
//   isEmpty = false,
//   emptyTitle = "No content available",
//   emptyMessage = "We couldn't find any items to display.",
//   emptyIcon,
//   centered = false,
//   className = "",
// }) => {
//   if (loading) {
//     return (
//       <LoadingState
//         message={loaderText}
//         centered={centered}
//         className={className}
//       />
//     );
//   }

//   if (error) {
//     return (
//       <ErrorState
//         title="Error loading content"
//         message={errorMessage || normalizeError(error)}
//         action={
//           onRetry ? (
//             <button
//               onClick={onRetry}
//               className="btn btn-primary"
//               aria-label="Retry loading"
//             >
//               Retry
//             </button>
//           ) : undefined
//         }
//         centered={centered}
//         className={className}
//       />
//     );
//   }

//   if (showEmptyState && isEmpty) {
//     return (
//       <EmptyState
//         title={emptyTitle}
//         message={emptyMessage}
//         icon={emptyIcon}
//         centered={centered}
//         className={className}
//       />
//     );
//   }

//   return <>{children}</>;
// };

// export default AsyncStateHandler;

// import React from "react";
// import { AlertTriangle } from "lucide-react";
// import Loader from "../ui/Loader";

// const normalizeError = (error) => {
//   if (!error) return "Something went wrong.";
//   if (typeof error === "string") return error;
//   if (typeof error === "object" && error !== null) {
//     if (error.message) return error.message;

//     if (error.data?.message) return error.data.message;
//   }
//   return "Unexpected error occurred.";
// };

// /**
//  * A reusable, accessible async state handler for loading/error UI.
//  *
//  * @param {boolean} loading - Whether the content is loading.
//  * @param {any} error - Error state.
//  * @param {Function} onRetry - Optional retry function.
//  * @param {ReactNode} children - The content to render when not loading or errored.
//  * @param {string} [errorMessage] - Custom error message.
//  * @param {string} [loaderText] - Custom loader text.
//  * @param {boolean} [centered] - Whether to center content vertically/horizontally.
//  */

// const AsyncStateHandler = ({
//   loading,
//   error,
//   onRetry,
//   children,
//   errorMessage,
//   loaderText = "Loading...",
//   centered = false,
// }) => {
//   const wrapperClass = centered
//     ? "flex flex-col items-center justify-center min-h-[60vh] w-full text-center px-4"
//     : "w-full flex justify-center px-4 py-4";

//   if (loading) {
//     return (
//       <div
//         className={wrapperClass}
//         role="status"
//         aria-busy="true"
//         aria-live="polite"
//       >
//         <Loader type="spinner" size="md" color="blue-600" text={loaderText} />
//       </div>
//     );
//   }

//   if (error) {
//     const message = errorMessage || normalizeError(error);

//     return (
//       <div
//         className={`${wrapperClass} text-gray-600 dark:text-gray-300`}
//         role="alert"
//         aria-live="assertive"
//       >
//         <AlertTriangle
//           size={36}
//           className="text-red-500 mb-3"
//           aria-hidden="true"
//         />
//         <p className="mb-4 text-base font-medium">{message}</p>
//         {onRetry && (
//           <button
//             type="button"
//             onClick={onRetry}
//             className="inline-flex items-center px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
//             aria-label="Retry loading content"
//           >
//             Retry
//           </button>
//         )}
//       </div>
//     );
//   }

//   return <>{children}</>;
// };

// export default AsyncStateHandler;
