import dynamic from "next/dynamic";
import { useMemo, useEffect, useState } from "react";
import {
  FileText,
  Image as ImageIcon,
  FileAudio,
  FileVideo,
  File as DefaultFileIcon,
} from "lucide-react";
import mammoth from "mammoth";
import Image from "next/image";

const PDFViewer = dynamic(() => import("./PDFViewer"), { ssr: false });

const getFileTypeIcon = (ext) => {
  switch (ext) {
    case "pdf":
      return <FileText className="w-6 h-6 text-red-500" />;
    case "jpg":
    case "jpeg":
    case "png":
    case "webp":
      return <ImageIcon className="w-6 h-6 text-blue-400" />;
    case "mp3":
    case "wav":
      return <FileAudio className="w-6 h-6 text-purple-500" />;
    case "mp4":
    case "mov":
      return <FileVideo className="w-6 h-6 text-pink-500" />;
    default:
      return <DefaultFileIcon className="w-6 h-6 text-gray-400" />;
  }
};

export default function PreviewRenderer({ file }) {
  const [docxHtml, setDocxHtml] = useState("");
  const [loadError, setLoadError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const extension = file?.name?.split(".").pop()?.toLowerCase();

  const type = useMemo(() => {
    if (["jpg", "jpeg", "png", "webp"].includes(extension)) return "image";
    if (extension === "pdf") return "pdf";
    if (["txt", "md"].includes(extension)) return "text";
    if (["docx", "doc"].includes(extension)) return "docx";
    return "unsupported";
  }, [extension]);

  useEffect(() => {
    setLoadError(false);
    setIsLoaded(false);
    if (type === "docx") {
      fetch(file.url)
        .then((res) => res.arrayBuffer())
        .then((arrayBuffer) => mammoth.convertToHtml({ arrayBuffer }))
        .then((result) => {
          setDocxHtml(result.value);
          setIsLoaded(true);
        })
        .catch(() => {
          setDocxHtml("<p>Error loading DOCX preview.</p>");
          setLoadError(true);
        });
    }
  }, [type, file]);

  if (!file?.url) return <p>No preview available.</p>;

  if (loadError) {
    return (
      <div className="bg-yellow-50 text-yellow-800 border border-yellow-300 rounded p-4">
        <p className="font-medium">Unable to load preview for this file.</p>
        <a
          href={file.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm mt-2 inline-block"
        >
          Click here to download the file instead.
        </a>
      </div>
    );
  }

  const previewHeader = (
    <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
      {getFileTypeIcon(extension)}
      <span className="truncate">{file.name}</span>
    </div>
  );

  return (
    <div className="relative w-full rounded-lg border border-gray-300 p-4 shadow-sm scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:shadow-md transition-shadow">
      {/* <div className="relative w-full overflow-x-auto overflow-y-auto rounded-lg border border-gray-300 p-4 shadow-sm max-h-[100vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:shadow-md transition-shadow"> */}
      {/* {previewHeader} */}

      {/* Optional loader before image/text/pdf renders */}
      {!isLoaded && type !== "docx" && (
        <div className="w-full h-40 bg-gray-100 animate-pulse rounded mb-4" />
      )}

      {type === "image" && (
        <Image
          src={file.url}
          alt="Preview"
          className="rounded border max-h-[600px] mx-auto"
          onLoad={() => setIsLoaded(true)}
          onError={() => setLoadError(true)}
        />
      )}

      {type === "pdf" && (
        <div className="pdf-container">
          <PDFViewer
            fileUrl={file.url}
            onLoad={() => setIsLoaded(true)}
            onError={() => setLoadError(true)}
          />
        </div>
      )}

      {type === "text" && (
        <iframe
          src={file.url}
          className="w-full h-[600px] border rounded shadow"
          title="Text preview"
          onLoad={() => setIsLoaded(true)}
          onError={() => setLoadError(true)}
        />
      )}

      {type === "docx" && (
        <div className="overflow-auto max-h-[600px]">
          <div
            className="prose max-w-none text-gray-800 docx-render"
            dangerouslySetInnerHTML={{ __html: docxHtml }}
          />
        </div>
      )}

      {type === "unsupported" && (
        <div className="text-center text-gray-600 mt-4">
          <DefaultFileIcon className="mx-auto h-6 w-6 mb-2" />
          <p className="text-sm">Preview not supported for this file type.</p>
          <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            Download preview
          </a>
        </div>
      )}
    </div>
  );
}
