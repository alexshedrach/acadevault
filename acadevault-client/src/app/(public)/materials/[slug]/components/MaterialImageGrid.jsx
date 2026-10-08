import { getFileUrl } from "@/utils/getImageUrl";
import { Image as ImageIcon } from "lucide-react";

export function MaterialImageGrid({ previewFiles }) {
  const imageFiles = previewFiles?.filter((f) =>
    f.name?.match(/\.(jpe?g|png|webp)$/i)
  );

  if (!imageFiles?.length) return null;

  return (
    <div className="mt-10">
      <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
        <ImageIcon className="w-4 h-4 text-gray-500" />
        <span>Preview Snapshots</span>
      </h3>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
        {imageFiles.map((file, i) => (
          <div
            key={i}
            className="relative group rounded overflow-hidden border border-gray-200 shadow-sm aspect-video bg-gray-50"
          >
            <img
              src={getFileUrl(file.fileUrl)}
              alt={`Preview ${file.fileName || `Image ${i + 1}`}`}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute bottom-0 w-full bg-black/30 text-white text-xs p-1 text-center backdrop-blur-sm">
              {file.fileName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
