"use client";

import React, { useState, forwardRef } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { cn } from "@/utils/cn";

/**
 * FileUpload Component
 *
 * A polished file input with validation, file name previews, animations, and accessibility.
 */
export const FileUpload = forwardRef(
  (
    {
      label,
      name,
      onChange,
      accept = "*",
      multiple = false,
      error = "",
      required = false,
      className = "",
      maxSizeMB = 10, // customizable file size limit (default: 10MB)
      children,
      labelClassName = "",
      ...rest
    },
    ref
  ) => {
    const [fileNames, setFileNames] = useState([]);
    const hasError = Boolean(error);
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    const handleFileChange = (e) => {
      const files = e.target.files;

      if (!files || files.length === 0) {
        setFileNames([]);
        onChange(null);
        return;
      }

      const fileArray = Array.from(files);
      const oversize = fileArray.filter((f) => f.size > maxSizeBytes);

      if (oversize.length > 0) {
        toast.error(`One or more files exceed the ${maxSizeMB}MB limit.`);
        e.target.value = ""; // reset file input
        setFileNames([]);
        onChange(null);
      } else {
        setFileNames(fileArray.map((file) => file.name));
        onChange(multiple ? fileArray : fileArray[0]);
      }
    };

    return (
      <div className={cn("mb-4 flex flex-col", className)}>
        {label && (
          <label
            htmlFor={name}
            className={cn(
              "text-sm font-medium text-gray-700 mb-1",
              labelClassName
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}

        <input
          id={name}
          name={name}
          type="file"
          ref={ref}
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
          className={cn(
            "block w-full text-sm rounded-md transition duration-150 ease-in-out cursor-pointer",
            "file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold",
            hasError
              ? "file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
              : "file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          )}
          {...rest}
        />

        {/* File preview */}
        {fileNames.length > 0 && (
          <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
            {fileNames.map((name, idx) => (
              <li key={idx}>{name}</li>
            ))}
          </ul>
        )}

        {/* Extra info or help text */}
        {children}

        {/* Error Message with animation */}
        <AnimatePresence>
          {hasError && (
            <motion.p
              id={`${name}-error`}
              className="mt-1 text-sm text-red-600"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              role="alert"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";

FileUpload.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  error: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  maxSizeMB: PropTypes.number,
  labelClassName: PropTypes.string,
  children: PropTypes.node,
};
