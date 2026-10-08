"use client";

import React, { useMemo, useCallback } from "react";
import { Eye, FileText, Download } from "lucide-react";
import { getFileUrl } from "@/utils/getImageUrl";
import { Button } from "../ui/Button";
import { getFileDescription } from "@/utils/getFileDescription";
import { formatBytes } from "@/utils/getFileInfo";
import MaterialActionPanel from "../materials/MaterialActionPanel";
import TagsSection from "@/app/(public)/materials/[slug]/components/TagsSection";
import DisclaimerBox from "@/app/(public)/materials/[slug]/components/DisclaimerBox";

/**
 * Renders a card for previewing a document file.
 * - Displays file icon, name, size and type badge
 * - Provides Preview and Download actions
 * - Includes a MaterialActionPanel for further calls to action
 */
const PreviewDocument = ({ file, material, onPreview }) => {
  // Memoize basic info
  const fileName = file.fileName || "Unknown File";
  const fileSizeLabel = useMemo(
    () => formatBytes(file.fileSize),
    [file.fileSize],
  );
  const fileExt = useMemo(
    () => fileName.split(".").pop()?.toLowerCase() || "",
    [fileName],
  );
  const fileTypeLabel = useMemo(
    () => fileExt.toUpperCase() || "FILE",
    [fileExt],
  );

  // Colors per extension
  const badgeStyle = useMemo(() => {
    const map = {
      pdf: "bg-red-100 text-red-600 border-red-200",
      docx: "bg-blue-100 text-blue-600 border-blue-200",
      doc: "bg-blue-100 text-blue-600 border-blue-200",
      pptx: "bg-orange-100 text-orange-600 border-orange-200",
      xlsx: "bg-green-100 text-green-600 border-green-200",
      txt: "bg-gray-100 text-gray-600 border-gray-300",
    };
    return map[fileExt] ?? "bg-gray-100 text-gray-600 border-gray-200";
  }, [fileExt]);

  const fileCount = material.previewFiles?.length ?? 0;
  const materialType = material.materialType ?? "material";
  const fileDescription = getFileDescription(materialType);

  // Handlers
  const handlePreview = useCallback(() => {
    onPreview({
      fileUrl: getFileUrl(file.fileUrl),
      fileName: fileName,
    });
  }, [file.fileUrl, fileName, onPreview]);

  // Keyboard-friendly preview
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handlePreview();
      }
    },
    [handlePreview],
  );

  return (
    <article
      role="region"
      aria-labelledby={`doc-preview-title-${file._id}`}
      className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md focus-within:shadow-md outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-md">
            <FileText className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h3
              id={`doc-preview-title-${file._id}`}
              className="text-base font-semibold text-gray-900 truncate"
              title={fileName}
            >
              {fileName}
            </h3>
            <p className="text-xs text-gray-500">
              {fileTypeLabel} · {fileSizeLabel}
            </p>
          </div>
        </div>
        <span
          className={`px-2 py-0.5 text-xs font-medium rounded border ${badgeStyle}`}
          title={`.${fileExt} file`}
        >
          {fileTypeLabel}
        </span>
      </header>

      {/* Description */}
      <p className="text-base text-gray-600 mt-1 mb-3 leading-relaxed">
        {fileCount === 1 ? (
          <>
            This file is the primary document associated with this{" "}
            <span className="font-medium">{materialType}</span>. It typically
            contains <span className="italic">{fileDescription}</span>, offering
            a complete or partial preview of the material's contents. In many
            cases, this includes the full outline, introductory sections, or
            representative excerpts that help you evaluate the value and depth
            of the work.
          </>
        ) : (
          <>
            These files are officially attached to this{" "}
            <span className="font-medium">{materialType}</span>. They are
            available for inline preview and secure download, and often include{" "}
            <span className="italic">{fileDescription}</span>. These may cover
            chapter summaries, project outlines, appendices, or supplementary
            resources that give insight into the main material.
          </>
        )}
        <br className="hidden sm:block" />
        <span className="text-sm text-gray-500 italic block mt-2">
          Downloads are strictly for personal academic reference. Unauthorized
          redistribution, sharing, or commercial use is prohibited under our
          academic content policy.
        </span>
      </p>

      {/* Actions */}
      <footer className="flex flex-col items-center justify-between gap-4 mt-4 border-t pt-4 border-gray-100">
        <div className="flex items-center gap-3">
          <Button
            variant="gradient"
            size="sm"
            onClick={handlePreview}
            aria-label={`Preview ${fileName}`}
          >
            <Eye className="w-4 h-4 mr-1" aria-hidden="true" />
            Preview
          </Button>
          <p className="text-sm font-semibold text-gray-500 mt-2">
            View or download this document for offline reference.
          </p>
          <Button
            as="a"
            href={getFileUrl(file.fileUrl)}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="sm"
            aria-label={`Download ${fileName}`}
          >
            <Download className="w-4 h-4 mr-1" aria-hidden="true" />
            Download
          </Button>
        </div>

        {/* Additional actions (purchase/download) */}
        <MaterialActionPanel material={material} />
      </footer>

      <TagsSection material={material} title="Explore Related Topics" />

      <DisclaimerBox />
    </article>
  );
};

export default React.memo(PreviewDocument);
