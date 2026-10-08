
"use client";

import React, { useRef, useState, useEffect } from "react";
import FileBadge from "./FileBadge";
import { X } from "lucide-react";
import { FileUpload } from "../forms/fields/FileUploadField";


export default function MediaUploader({
  label = "Attach Media",
  subLabel = "(optional)",
  accept = ["image/*", "video/*"],
  multiple = true,
  maxFiles = 10,
  onChange,
  preview = true,
  viewMode = "grid",
  defaultFiles = [],
}) {
  const inputRef = useRef(null);

  // Internal file list state
  const [files, setFiles] = useState(defaultFiles);
  // Validation error for maxFiles
  const [error, setError] = useState("");

  // Whenever files change, propagate up
  useEffect(() => {
    onChange(files);
  }, [files, onChange]);

  // Handler when user selects new files
  const handleFileSelect = (e) => {
    const selected = e.target.files ? Array.from(e.target.files) : [];
    const combined = multiple ? [...files, ...selected] : selected;
    if (combined.length > maxFiles) {
      setError(`You can only upload up to ${maxFiles} file${maxFiles > 1 ? "s" : ""}.`);
      return;
    }
    setError("");
    setFiles(combined);
  };

  // Remove a file by index
  const removeFile = (idx) => {
    const updated = files.filter((_, i) => i !== idx);
    setFiles(updated);
    setError("");
  };

  return (
    <div className="space-y-2">
      {/* FileUpload handles label, input, error animation, and ARIA */}
      <FileUpload
        label={label}
        name="media-upload"
        accept={accept.join(",")}
        multiple={multiple}
        error={error}
        required={false}
        ref={inputRef}
        onChange={handleFileSelect}
        className="w-full"
      />

      {/* Optional sub-label */}
      {subLabel && (
        <p className="text-xs text-gray-500 mb-1">{subLabel}</p>
      )}

      {/* Previews */}
      {preview && files.length > 0 && (
        <div
          className={
            viewMode === "grid"
              ? "mt-3 flex flex-wrap gap-3"
              : "mt-3 flex flex-col space-y-2"
          }
        >
          {files.map((file, idx) => {
            const url = URL.createObjectURL(file);
            return viewMode === "grid" ? (
              <div
                key={idx}
                className="relative w-24 h-24 border rounded-md overflow-hidden group"
              >
                {file.type.startsWith("image/") ? (
                  <img src={url} alt={file.name} className="object-cover w-full h-full" />
                ) : (
                  <video src={url} className="object-cover w-full h-full" controls />
                )}
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  className="absolute top-1 right-1 p-1 bg-black bg-opacity-60 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                  aria-label={`Remove ${file.name}`}
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <FileBadge
                key={idx}
                file={file}
                onRemove={() => removeFile(idx)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
