"use client";

import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import DatePickerLib from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO, format } from "date-fns";
import { enUS } from "date-fns/locale";

/**
 * DateInputField
 *
 * Renders either:
 *   • A native <input type="date"> (if usePicker=false)
 *   • A react-datepicker <DatePickerLib> (if usePicker=true)
 *
 * Props:
 *   • label:           string – visible label
 *   • name:            string – field name/id
 *   • value:           string or [string,string] – ISO string(s). e.g. "2023-12-31T00:00"
 *   • onChange:        func – called with (e) for native or (customEvent) for picker
 *   • usePicker:       bool – whether to use react-datepicker (default: false)
 *   • isRange:         bool – if usePicker=true, selectsRange
 *   • showTimeSelect:  bool – show time selection in picker
 *   • locale:          object – date-fns locale (default: enUS)
 *   • minDate:         string – ISO (YYYY-MM-DD) for native, or Date for picker
 *   • maxDate:         string – ISO or Date
 *   • dateFormat:      string – format for picker (e.g. "Pp" or "yyyy-MM-dd")
 *   • placeholder:     string – native placeholder; or picker placeholderText
 *   • required:        bool
 *   • disabled:        bool
 *   • error:           string – validation error
 *   • className:       string – wrapper custom classes
 *   • inputClassName:  string – custom classes for <input> or <DatePickerLib>
 *   • ...rest:         any extra props forwarded to underlying component
 *
 * Note: When usePicker=true, DateInputField internally converts between
 *       ISO strings and JavaScript Date objects.
 */
export const DateInputField = forwardRef(
  (
    {
      label,
      name,
      value,
      onChange,
      usePicker = false,
      isRange = false,
      showTimeSelect = false,
      locale = enUS,
      minDate,
      maxDate,
      dateFormat,
      placeholder = "",
      required = false,
      disabled = false,
      error = "",
      className = "",
      inputClassName = "",
      ...rest
    },
    ref
  ) => {
    const hasError = Boolean(error);

    // Convert ISO value(s) to Date or [Date, Date]
    const parseValue = () => {
      if (usePicker) {
        if (isRange && Array.isArray(value)) {
          return value.map((v) => (v ? parseISO(v) : null));
        }
        return value ? parseISO(value) : null;
      }
      return null;
    };

    const selectedDate = parseValue();

    // Determine dateFormat for picker
    const resolvedFormat = dateFormat || (showTimeSelect ? "Pp" : "yyyy-MM-dd");

    // Handler for react-datepicker
    const handlePickerChange = (date) => {
      if (isRange) {
        const [start, end] = date;
        onChange({
          target: {
            name,
            value: [
              start ? format(start, "yyyy-MM-dd'T'HH:mm") : "",
              end ? format(end, "yyyy-MM-dd'T'HH:mm") : "",
            ],
          },
        });
      } else {
        onChange({
          target: {
            name,
            value: date ? format(date, "yyyy-MM-dd'T'HH:mm") : "",
          },
        });
      }
    };

    return (
      <div className={cn("mb-4 flex flex-col", className)}>
        {label && (
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}

        {usePicker ? (
          <DatePickerLib
            id={name}
            selected={!isRange ? selectedDate : undefined}
            startDate={isRange ? selectedDate?.[0] : undefined}
            endDate={isRange ? selectedDate?.[1] : undefined}
            selectsRange={isRange}
            onChange={handlePickerChange}
            dateFormat={resolvedFormat}
            showTimeSelect={showTimeSelect}
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            locale={locale}
            minDate={
              minDate
                ? typeof minDate === "string"
                  ? parseISO(minDate)
                  : minDate
                : undefined
            }
            maxDate={
              maxDate
                ? typeof maxDate === "string"
                  ? parseISO(maxDate)
                  : maxDate
                : undefined
            }
            placeholderText={
              placeholder || (isRange ? "Select date range" : "Select a date")
            }
            disabled={disabled}
            ref={ref}
            className={cn(
              "w-full px-3 py-2 rounded-md text-sm transition duration-150 ease-in-out",
              "focus:outline-none focus:ring-2",
              disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white",
              hasError
                ? "border-red-500 focus:border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-200",
              inputClassName
            )}
            wrapperClassName="w-full"
            {...rest}
          />
        ) : (
          <input
            id={name}
            name={name}
            type="date"
            value={value || ""}
            onChange={onChange}
            min={minDate}
            max={maxDate}
            required={required}
            disabled={disabled}
            placeholder={placeholder}
            ref={ref}
            className={cn(
              "w-full px-3 py-2 rounded-md text-sm transition duration-150 ease-in-out",
              "focus:outline-none focus:ring-2",
              disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white",
              hasError
                ? "border-red-500 focus:border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-200",
              inputClassName
            )}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${name}-error` : undefined}
            {...rest}
          />
        )}

        <AnimatePresence>
          {hasError && (
            <motion.p
              id={`${name}-error`}
              className="mt-1 text-sm text-red-600 font-medium"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

DateInputField.displayName = "DateInputField";

DateInputField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  onChange: PropTypes.func.isRequired,
  usePicker: PropTypes.bool,
  isRange: PropTypes.bool,
  showTimeSelect: PropTypes.bool,
  locale: PropTypes.object,
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  dateFormat: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
};
