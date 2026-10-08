"use client";

import PreviewGallery from "@/components/FilePreview/PreviewGallery";
import { useMemo } from "react";
import { MaterialDescriptionContent } from "./MaterialDescriptionContent";
import { MaterialImageGrid } from "./MaterialImageGrid";

export default function MaterialDescription({ material }) {
  if (!material) return null;

  const { description, tags = [], previewFiles = [] } = material;

  // split out non-image docs for the preview gallery
  const documentFiles = useMemo(
    () => previewFiles.filter((f) => !/\.(jpe?g|png|webp)$/i.test(f.name)),
    [previewFiles]
  );

  return (
    <>
      {/* 1️⃣ Description */}
      <MaterialDescriptionContent description={description} tags={tags} />

      {/* 2️⃣ Document Previews (cards → modal) */}
      {documentFiles.length > 0 && (
        <PreviewGallery previewFiles={documentFiles} material={material} />
      )}

      {/* 3️⃣ Image Snapshots Grid */}
      <MaterialImageGrid previewFiles={previewFiles} />
    </>
  );
}
