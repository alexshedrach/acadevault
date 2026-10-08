import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFViewer({ fileUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);

  const goToPrevPage = () => setPageNumber(Math.max(1, pageNumber - 1));
  const goToNextPage = () => setPageNumber(Math.min(numPages, pageNumber + 1));

  return (
    <div className="mx-auto max-w-3xl bg-white rounded-md shadow p-4 space-y-4">
      <div className="flex justify-between items-center">
        <button
          onClick={goToPrevPage}
          disabled={pageNumber <= 1}
          className="px-3 py-1 text-sm border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {pageNumber} of {numPages || "?"}
        </span>
        <button
          onClick={goToNextPage}
          disabled={pageNumber >= numPages}
          className="px-3 py-1 text-sm border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <Document
        file={fileUrl}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={<p className="text-center">Loading PDF...</p>}
      >
        <Page pageNumber={pageNumber} scale={scale} />
      </Document>
    </div>
  );
}
