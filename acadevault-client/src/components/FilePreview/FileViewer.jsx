"use client";

import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Loader from "../ui/Loader";

// Dynamically load heavy previewers
const PDFViewer = dynamic(() => import("./PDFViewer"), { ssr: false });
const PreviewRenderer = dynamic(() => import("./PreviewRenderer"), {
  ssr: false,
});

// Utility type checks
const isImage = (url) => /\.(jpe?g|png|webp|gif)$/i.test(url);
const isPDF = (url) => /\.pdf$/i.test(url);
const isOfficeDoc = (url) => /\.(docx|pptx|xlsx)$/i.test(url);
const isDocxOrText = (url) => /\.(docx|doc|txt|md)$/i.test(url);

const isDev = process.env.NODE_ENV === "development";

/**
 * <FileViewer>
 *
 * In-order preview with graceful fallback to a unified renderer,
 * then finally a download link:
 * 1) Images
 * 2) PDFs
 * 3) Office via MS iframe → FALLBACK to PreviewRenderer
 * 4) DocX/Text via PreviewRenderer
 * 5) Download link
 */
export default function FileViewer({ file }) {
  const { fileUrl, fileName } = file;
  const [loadError, setLoadError] = useState(false);

  // Reset error when URL changes
  useEffect(() => {
    setLoadError(false);
  }, [fileUrl]);

  // A common loading spinner
  const loadingPlaceholder = (
    <div className="flex justify-center items-center h-[80vh]">
      <Loader type="spinner" size="lg" aria-label="Loading preview…" />
    </div>
  );

  // Final download fallback
  const downloadFallback = (
    <div className="text-center text-gray-600 p-8">
      <p className="mb-4">Unable to preview this file.</p>
      <a
        href={fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        Download {fileName}
      </a>
    </div>
  );

  // 1) Image
  if (isImage(fileUrl)) {
    return (
      <div className="flex justify-center py-8">
        <Image
          src={fileUrl}
          alt={fileName}
          width={800}
          height={600}
          className="max-h-[80vh] object-contain"
          onError={() => setLoadError(true)}
        />
        {loadError && downloadFallback}
      </div>
    );
  }

  // 2) PDF
  if (isPDF(fileUrl)) {
    return loadError ? (
      downloadFallback
    ) : (
      <PDFViewer fileUrl={fileUrl} onError={() => setLoadError(true)} />
    );
  }

  // 3) Office docs (iframe → fallback to PreviewRenderer)

  if (isOfficeDoc(fileUrl)) {
    const officeUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
      fileUrl
    )}`;

    // In development, always skip Office iframe
    if (isDev) {
      return (
        <Suspense fallback={loadingPlaceholder}>
          <PreviewRenderer file={{ url: fileUrl, name: fileName }} />
        </Suspense>
      );
    }

    return loadError ? (
      <Suspense fallback={loadingPlaceholder}>
        <PreviewRenderer file={{ url: fileUrl, name: fileName }} />
      </Suspense>
    ) : (
      <iframe
        src={officeUrl}
        title={fileName}
        className="w-full h-[80vh] border-none"
        onError={() => setLoadError(true)}
      >
        {loadingPlaceholder}
      </iframe>
    );
  }

  // 4) DocX/Text → unified renderer
  if (isDocxOrText(fileUrl)) {
    return loadError ? (
      downloadFallback
    ) : (
      <Suspense fallback={loadingPlaceholder}>
        <PreviewRenderer file={{ url: fileUrl, name: fileName }} />
      </Suspense>
    );
  }

  // 5) Other types → download link
  return downloadFallback;
}

// "use client";

// import Image from "next/image";

// const isImage = (url) => /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
// const isPDF = (url) => /\.pdf$/i.test(url);
// const isOfficeDoc = (url) => /\.(docx|pptx|xlsx)$/i.test(url);

// const isLocalhost = () =>
//   typeof window !== "undefined" && window.location.hostname === "localhost";

// export default function FileViewer({ file }) {
//   const { fileUrl, fileName } = file;

//   if (isImage(fileUrl)) {
//     return (
//       <div className="flex justify-center">
//         <Image
//           src={fileUrl}
//           alt={fileName}
//           width={800}
//           height={600}
//           className="max-h-[80vh] object-contain"
//         />
//       </div>
//     );
//   }

//   if (isPDF(fileUrl)) {
//     return (
//       <iframe
//         src={fileUrl}
//         title={fileName}
//         className="w-full h-[80vh]"
//         frameBorder="0"
//       />
//     );
//   }

//   if (isOfficeDoc(fileUrl)) {
//     // If we're in development, fallback to download
//     if (isLocalhost()) {
//       return (
//         <div className="text-center text-gray-600 p-8">
//           <p className="mb-4">
//             Office document previews are not supported in local development.
//           </p>
//           <a
//             href={fileUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-600 hover:underline"
//           >
//             Download {fileName}
//           </a>
//         </div>
//       );
//     }

//     // Production: Use Office Web Viewer
//     return (
//       <iframe
//         src={`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
//           fileUrl
//         )}`}
//         title={fileName}
//         className="w-full h-[80vh]"
//         frameBorder="0"
//       />
//     );
//   }

//   return (
//     <div className="text-center text-gray-600 p-8">
//       <p className="mb-4">Cannot preview this file type.</p>
//       <a
//         href={fileUrl}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-blue-600 hover:underline"
//       >
//         Download {fileName}
//       </a>
//     </div>
//   );
// }
