"use client";

import { cn } from "@/utils/cn";
import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";
import { PhoneIcon } from "lucide-react";
import PropTypes from "prop-types";
import { forwardRef, memo, useCallback, useMemo, useState } from "react";
import DatePickerLib from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useController } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "react-toastify";
import FormFieldWrapper from "./FormFieldWrapper";
import { AnimatePresence } from "framer-motion";
import { MemoizedFormError, MemoizedHelperText } from "@/helpers/FormErrors";

export const InputField = forwardRef(
  (
    {
      label,
      name,
      type = "text",
      autoComplete,
      placeholder = "",
      required = false,
      autoFocus = false,
      showHint = false,
      hintText = "This field is required.",
      error = "",
      className = "",
      inputClassName = "",
      control,
      ...props // all other props
    },
    ref
  ) => {
    // Strip internal props that shouldn't reach DOM
    const {
      helpText: _helpText, // just in case
      hintText: _hintText,
      showHint: _showHint,
      ...rest
    } = props;

    return (
      <FormFieldWrapper
        label={label}
        name={name}
        control={control}
        required={required}
        error={error}
        helpText={showHint && !error ? hintText : undefined}
        className={cn("mb-4", className)}
        inputClassName={inputClassName}
      >
        <input
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          autoFocus={autoFocus}
          ref={ref}
          {...rest} // ✅ safe now
        />
      </FormFieldWrapper>
    );
  }
);

InputField.displayName = "InputField";

InputField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  autoFocus: PropTypes.bool,
  showHint: PropTypes.bool,
  hintText: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  control: PropTypes.any,
};

/**
 * FileUpload Component
 *
 * A polished file input with validation, file name previews, and FormFieldWrapper integration.
 */
export const FileUpload = forwardRef(
  (
    {
      label,
      name,
      accept = "*",
      multiple = false,
      required = false,
      className = "",
      inputClassName = "",
      maxSizeMB = 10, // Customizable file size limit (default: 10MB)
      control,
      rules,
      defaultValue,
      helpText,
      ...rest
    },
    ref
  ) => {
    const [fileNames, setFileNames] = useState([]);
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    const handleFileChange = (e) => {
      const files = e.target.files;

      if (!files || files.length === 0) {
        setFileNames([]);
        rest.onChange?.(null);
        return;
      }

      const fileArray = Array.from(files);
      const oversize = fileArray.filter((f) => f.size > maxSizeBytes);

      if (oversize.length > 0) {
        toast.error(`One or more files exceed the ${maxSizeMB}MB limit.`);
        e.target.value = ""; // Reset file input
        setFileNames([]);
        rest.onChange?.(null);
      } else {
        setFileNames(fileArray.map((file) => file.name));
        rest.onChange?.(multiple ? fileArray : fileArray[0]);
      }
    };

    const fileInput = useMemo(
      () => (
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className={cn(
            "block w-full text-sm rounded-md transition duration-150 ease-in-out cursor-pointer",
            "file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold",
            inputClassName
          )}
          {...rest}
        />
      ),
      [accept, multiple, inputClassName, rest]
    );

    return (
      <FormFieldWrapper
        label={label}
        name={name}
        required={required}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        className={className}
        inputClassName={inputClassName}
        helpText={
          fileNames.length > 0 ? (
            <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
              {fileNames.map((name, idx) => (
                <li key={idx}>{name}</li>
              ))}
            </ul>
          ) : (
            helpText
          )
        }
        ref={ref}
      >
        {fileInput}
      </FormFieldWrapper>
    );
  }
);

FileUpload.displayName = "FileUpload";

FileUpload.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  maxSizeMB: PropTypes.number,
  control: PropTypes.any,
  rules: PropTypes.object,
  defaultValue: PropTypes.any,
  helpText: PropTypes.node,
};

// NumberInputField: Simplified by extracting phone input
export const NumberInputField = memo(
  forwardRef(function NumberInputField(
    {
      label,
      name,
      type = "number",
      value,
      onChange,
      placeholder = "",
      required = false,
      disabled = false,
      min,
      max,
      step,
      helpText,
      className = "",
      inputClassName = "",
      control,
      rules,
      error,
      defaultValue,
      ...rest
    },
    ref
  ) {
    return (
      <FormFieldWrapper
        label={label}
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        helpText={helpText}
        error={error}
        ref={ref}
        className={className}
        inputClassName={inputClassName}
      >
        <input
          type={type}
          min={min}
          max={max}
          step={step}
          value={value ?? ""}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500/20 sm:text-sm",
            inputClassName
          )}
          {...rest}
        />
      </FormFieldWrapper>
    );
  })
);

NumberInputField.displayName = "NumberInputField";

NumberInputField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "email", "password", "number", "tel"]),
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  helpText: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  control: PropTypes.any,
  rules: PropTypes.object,
  defaultValue: PropTypes.any,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

// PhoneInputField: Extracted as a dedicated component
export const PhoneInputField = memo(
  forwardRef(function PhoneInputField(
    {
      label,
      name,
      placeholder = "+234 000 000 0000",
      required = false,
      disabled = false,
      helpText = "Include country code (e.g. +1, +234, etc.)",
      className = "",
      inputClassName = "",
      control,
      rules,
      defaultValue,
      error,
      ...rest
    },
    ref
  ) {
    return (
      <FormFieldWrapper
        label={label}
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        helpText={helpText}
        error={error}
        isCustomInput
        transformValue={(v) =>
          typeof v === "string" ? v.replace(/\s+/g, "") : v
        }
        transformOnChange={(e) => {
          const raw = typeof e === "string" ? e : e?.target?.value ?? "";
          return raw.replace(/\s+/g, "");
        }}
        adornmentLeft={<PhoneIcon className="h-5 w-5 text-gray-400" />}
        ref={ref}
        className={className}
        inputClassName={inputClassName}
      >
        <PhoneInput
          international
          defaultCountry="NG"
          placeholder={placeholder}
          disabled={disabled}
          focusInputOnCountrySelection={false}
          className={cn(
            "w-full py-2 rounded-md border shadow-sm text-sm transition focus:outline-none focus:ring-2",
            disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white",
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500",
            inputClassName
          )}
          {...rest}
        />
      </FormFieldWrapper>
    );
  })
);

PhoneInputField.displayName = "PhoneInputField";

PhoneInputField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  helpText: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  control: PropTypes.any,
  rules: PropTypes.object,
  defaultValue: PropTypes.any,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

/**
 * InputWithAddon
 * A text input field with left/right addon, integrated with FormFieldWrapper for consistency and accessibility.
 */
export const InputWithAddon = memo(
  forwardRef(function InputWithAddon(
    {
      label,
      name,
      type = "text",
      required = false,
      placeholder = "",
      className = "",
      inputClassName = "",
      disabled = false,
      readOnly = false,
      addon,
      position = "left",
      control,
      rules,
      defaultValue,
      helpText,
      ...rest
    },
    ref
  ) {
    const input = useMemo(
      () => (
        <input
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          className={cn(inputClassName)}
          {...rest}
        />
      ),
      [type, placeholder, disabled, readOnly, inputClassName, rest]
    );

    return (
      <FormFieldWrapper
        label={label}
        name={name}
        required={required}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        className={className}
        inputClassName={inputClassName}
        helpText={helpText}
        adornmentLeft={position === "left" ? addon : null}
        adornmentRight={position === "right" ? addon : null}
        ref={ref}
      >
        {input}
      </FormFieldWrapper>
    );
  })
);

InputWithAddon.displayName = "InputWithAddon";

InputWithAddon.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  addon: PropTypes.node,
  position: PropTypes.oneOf(["left", "right"]),
  control: PropTypes.any,
  rules: PropTypes.object,
  defaultValue: PropTypes.any,
  helpText: PropTypes.string,
};

/**
 * DateInputField
 *
 * Renders either:
 *   • A native <input type="date"> (if usePicker=false)
 *   • A react-datepicker <DatePickerLib> (if usePicker=true)
 *
 * Integrated with FormFieldWrapper for consistent styling, error handling, and accessibility.
 */
export const DateInputField = memo(
  forwardRef(function DateInputField(
    {
      label,
      name,
      usePicker = false,
      showTimeSelect = false,
      locale = enUS,
      minDate,
      maxDate,
      dateFormat,
      placeholder = "",
      required = false,
      disabled = false,
      className = "",
      inputClassName = "",
      control,
      rules,
      defaultValue,
      helpText,
      // when used inside Controller render:
      value: ctrlValue,
      onChange: ctrlOnChange,
      onBlur: ctrlOnBlur,
      ...rest
    },
    ref
  ) {
    // Determine if we're internally controlling via RHF or externally via Controller
    const isController = !!control;

    const {
      field: { value, onChange, onBlur },
      fieldState: { error },
    } = isController
      ? useController({ name, control, rules, defaultValue })
      : {
          field: {
            value: ctrlValue,
            onChange: ctrlOnChange,
            onBlur: ctrlOnBlur,
          },
          fieldState: { error: null },
        };

    const hasError = Boolean(error?.message);
    const outFormat =
      dateFormat || (showTimeSelect ? "yyyy-MM-dd'T'HH:mm" : "yyyy-MM-dd");

    if (usePicker) {
      // parse ISO to Date for picker's `selected`
      // const selected = value ? parseISO(value) : null;
      const selected =
        value instanceof Date ? value : value ? new Date(value) : null;

      return (
        <FormFieldWrapper
          label={label}
          name={name}
          required={required}
          helpText={helpText}
          error={error?.message}
          isCustomInput
          ref={ref}
          className={className}
          inputClassName={inputClassName}
        >
          <DatePickerLib
            selected={selected}
            onChange={(date) => {
              // const iso = date ? format(date, outFormat) : "";
              onChange(date);
            }}
            onBlur={onBlur}
            showTimeSelect={showTimeSelect}
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            locale={locale}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText={
              placeholder ||
              (showTimeSelect ? "Select date & time" : "Select date")
            }
            disabled={disabled}
            wrapperClassName="w-full"
            className={cn(
              "w-full py-2 rounded-md border shadow-sm text-sm transition focus:outline-none focus:ring-2",
              disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white",
              hasError
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            )}
            {...rest}
          />
        </FormFieldWrapper>
      );
    }

    // native date input fallback
    return (
      <FormFieldWrapper
        label={label}
        name={name}
        required={required}
        helpText={helpText}
        error={error?.message}
        ref={ref}
        className={className}
        inputClassName={inputClassName}
      >
        <input
          type="date"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          min={minDate}
          max={maxDate}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "w-full py-2 rounded-md border shadow-sm text-sm transition focus:outline-none focus:ring-2",
            disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white",
            hasError
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          )}
          {...rest}
        />
      </FormFieldWrapper>
    );
  })
);

DateInputField.displayName = "DateInputField";

DateInputField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  usePicker: PropTypes.bool,
  showTimeSelect: PropTypes.bool,
  locale: PropTypes.object,
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  dateFormat: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  // RHF hook
  control: PropTypes.any,
  rules: PropTypes.object,
  defaultValue: PropTypes.string,
  helpText: PropTypes.string,
  // For Controller usage
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

/**
 * TextAreaField
 *
 * A reusable textarea component integrated with FormFieldWrapper for consistent styling,
 * error handling, and accessibility.
 */
export const TextAreaField = memo(
  forwardRef(function TextAreaField(
    {
      label,
      name,
      rows = 4,
      placeholder = "",
      required = false,
      showHint = false,
      hintText = "This field is required.",
      error = "",
      backendError = "",
      className = "",
      inputClassName = "",
      control,
      rules,
      defaultValue,
      // destructure internal-only props to strip them
      helpText: _ht,
      ...props
    },
    ref
  ) {
    const errorMessage = error || backendError;
    const effectiveHelpText = showHint && !errorMessage ? hintText : undefined;

    // Remove any props that should not reach the DOM
    const {
      showHint: _sh,
      hintText: _ht2,
      backendError: _be,
      ...safeRest
    } = props;

    const textarea = useMemo(
      () => (
        <textarea
          rows={rows}
          placeholder={placeholder}
          className={cn(inputClassName)}
          {...safeRest} // ✅ safe from leaking internal props
        />
      ),
      [rows, placeholder, inputClassName, safeRest]
    );

    return (
      <FormFieldWrapper
        label={label}
        name={name}
        required={required}
        error={errorMessage}
        helpText={effectiveHelpText}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        className={className}
        inputClassName={inputClassName}
        ref={ref}
      >
        {textarea}
      </FormFieldWrapper>
    );
  })
);

TextAreaField.displayName = "TextAreaField";

TextAreaField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  rows: PropTypes.number,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  showHint: PropTypes.bool,
  hintText: PropTypes.string,
  error: PropTypes.string,
  backendError: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  control: PropTypes.any,
  rules: PropTypes.object,
  defaultValue: PropTypes.any,
};

/**
 * SelectField
 *
 * A reusable dropdown/select component integrated with FormFieldWrapper for consistent
 * styling, error handling, and accessibility.
 */
export const SelectField = memo(
  forwardRef(function SelectField(
    {
      label,
      name,
      options = [],
      placeholder = "Select an option",
      required = false,
      disabled = false,
      error = "",
      backendError = "",
      className = "",
      selectClassName = "",
      control,
      rules,
      defaultValue,
      helpText,
      ...rest
    },
    ref
  ) {
    const errorMessage = error || backendError;

    const select = useMemo(
      () => (
        <select disabled={disabled} className={cn(selectClassName)} {...rest}>
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt, index) =>
            typeof opt === "object" ? (
              <option
                key={`${opt.value}-${index}`} // Unique key using value and index
                value={opt.value}
              >
                {opt.label}
              </option>
            ) : (
              <option key={`${opt}-${index}`} value={opt}>
                {opt}
              </option>
            )
          )}
        </select>
      ),
      [disabled, placeholder, options, selectClassName, rest]
    );

    return (
      <FormFieldWrapper
        label={label}
        name={name}
        required={required}
        error={errorMessage}
        helpText={helpText}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        className={className}
        inputClassName={selectClassName}
        ref={ref}
      >
        {select}
      </FormFieldWrapper>
    );
  })
);

SelectField.displayName = "SelectField";

SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ value: PropTypes.string, label: PropTypes.string }),
    ])
  ),
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  backendError: PropTypes.string,
  className: PropTypes.string,
  selectClassName: PropTypes.string,
  control: PropTypes.any,
  rules: PropTypes.object,
  defaultValue: PropTypes.any,
  helpText: PropTypes.string,
};

/**
 * CheckboxGroupField
 *
 * A reusable checkbox-group component integrated with FormFieldWrapper for consistent
 * styling, error handling, and accessibility.
 */

// export const CheckboxGroupField = ({
//   label,
//   name,
//   options = [],
//   error = "",
//   backendError = "",
//   disabled = false,
//   className = "",
//   control,
//   rules,
//   defaultValue = [],
//   helpText,
// }) => {
//   const {
//     field: { value = [], onChange, ref },
//     fieldState: { error: rhfError },
//   } = useController({
//     name,
//     control,
//     rules,
//     defaultValue,
//   });

//   const errorMessage = error || backendError || rhfError?.message;

//   const handleToggle = (val) => {
//     const isChecked = value.includes(val);
//     const newValue = isChecked
//       ? value.filter((v) => v !== val)
//       : [...value, val];
//     onChange(newValue);
//   };

//   const checkboxes = (
//     <div className="space-y-2">
//       {options.map((opt) => (
//         <label
//           key={opt.value}
//           className="flex items-center space-x-2 text-gray-800"
//         >
//           <input
//             ref={ref}
//             type="checkbox"
//             name={name}
//             value={opt.value}
//             checked={Array.isArray(value) && value.includes(opt.value)}
//             onChange={() => handleToggle(opt.value)}
//             className={cn(
//               "w-4 h-4 accent-blue-600 focus:ring-2 focus:ring-blue-400 transition",
//               disabled && "opacity-50 cursor-not-allowed"
//             )}
//             disabled={disabled}
//           />
//           <span>{opt.label}</span>
//         </label>
//       ))}
//     </div>
//   );

//   return (
//     <FormFieldWrapper
//       label={label}
//       name={name}
//       required={rules?.required}
//       error={errorMessage}
//       helpText={helpText}
//       control={control}
//       rules={rules}
//       className={className}
//       disabled={disabled}
//     >
//       {checkboxes}
//     </FormFieldWrapper>
//   );
// };

// CheckboxGroupField.propTypes = {
//   label: PropTypes.string,
//   name: PropTypes.string.isRequired,
//   options: PropTypes.arrayOf(
//     PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })
//   ).isRequired,
//   error: PropTypes.string,
//   backendError: PropTypes.string,
//   disabled: PropTypes.bool,
//   className: PropTypes.string,
//   control: PropTypes.any.isRequired,
//   rules: PropTypes.object,
//   defaultValue: PropTypes.arrayOf(PropTypes.string),
//   helpText: PropTypes.string,
// };

export const CheckboxGroupField = ({
  label,
  name,
  options = [],
  error = "",
  backendError = "",
  disabled = false,
  className = "",
  control,
  rules,
  defaultValue = [],
  helpText,
}) => {
  const {
    field: { value = [], onChange, ref },
    fieldState: { error: rhfError },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  const errorMessage = error || backendError || rhfError?.message;

  const handleToggle = (val) => {
    const current = Array.isArray(value) ? value : [];
    const updated = current.includes(val)
      ? current.filter((v) => v !== val)
      : [...current, val];
    onChange(updated);
  };

  return (
    <div className={cn("mb-4", className)}>
      {label && (
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          {label}
        </label>
      )}

      <div className="space-y-2  p-4 border-gray-300 focus:ring-blue-500 rounded-md border shadow-sm text-sm">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center space-x-2 text-gray-800"
          >
            <input
              ref={ref}
              type="checkbox"
              name={`${name}[]`}
              value={opt.value}
              checked={Array.isArray(value) && value.includes(opt.value)}
              onChange={() => handleToggle(opt.value)}
              disabled={disabled}
              className={cn(
                "w-4 h-4 accent-blue-600 focus:ring-2 focus:ring-blue-400 transition",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>

      <AnimatePresence>
        {errorMessage ? (
          <MemoizedFormError id={`${name}-error`} message={errorMessage} />
        ) : helpText ? (
          <MemoizedHelperText id={`${name}-helper`} message={helpText} />
        ) : null}
      </AnimatePresence>
    </div>
  );
};


export const CheckboxField = ({
  label,
  name,
  control,
  rules,
  className = "",
  defaultValue = false,
  disabled = false,
}) => {
  const {
    field: { value = false, onChange, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return (
    <FormFieldWrapper
      label=""
      name={name}
      error={error?.message}
      control={control}
      rules={rules}
      className={className}
      disabled={disabled}
    >
      <label className="flex items-center space-x-2 text-sm text-gray-800">
        <input
          ref={ref}
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className={cn(
            "w-4 h-4 accent-blue-600 focus:ring-2 focus:ring-blue-400 transition",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
        <span>{label}</span>
      </label>
    </FormFieldWrapper>
  );
};

CheckboxField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.any.isRequired,
  rules: PropTypes.object,
  className: PropTypes.string,
  defaultValue: PropTypes.bool,
  disabled: PropTypes.bool,
};

/**
 * RadioGroupField
 *
 * A reusable radio-button group component integrated with FormFieldWrapper for consistent
 * styling, error handling, and accessibility.
 */

export const RadioGroupField = ({
  label,
  name,
  options = [],
  error = "",
  backendError = "",
  disabled = false,
  className = "",
  layout = "stacked", // "grid" or "stacked"
  control,
  rules,
  defaultValue,
  helpText,
  optionClassName,
}) => {
  const {
    field: { value, onChange, ref },
    fieldState: { error: rhfError },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  const errorMessage = error || backendError || rhfError?.message;

  const radios = (
    <div
      className={cn(
        layout === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          : "space-y-2"
      )}
    >
      {options.map((opt) => (
        <label
          key={opt.value}
          className={cn(
            "flex items-center space-x-2 text-gray-800",
            layout === "grid" && "p-2 rounded-md hover:bg-gray-50",
            (disabled || opt.disabled) && "opacity-60 cursor-not-allowed",
            optionClassName && optionClassName(opt)
          )}
        >
          <input
            ref={ref}
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            disabled={disabled || opt.disabled}
            className={cn(
              "w-4 h-4 accent-blue-600 focus:ring-2 focus:ring-blue-400 transition",
              (disabled || opt.disabled) && "cursor-not-allowed"
            )}
          />
          <span>{opt.label}</span>
        </label>
      ))}
    </div>
  );

  return (
    <FormFieldWrapper
      label={label}
      name={name}
      required={rules?.required}
      error={errorMessage}
      helpText={helpText}
      control={control}
      rules={rules}
      className={className}
      disabled={disabled}
    >
      {radios}
    </FormFieldWrapper>
  );
};

RadioGroupField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  error: PropTypes.string,
  backendError: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  layout: PropTypes.oneOf(["stacked", "grid"]),
  control: PropTypes.any.isRequired,
  rules: PropTypes.object,
  defaultValue: PropTypes.string,
  helpText: PropTypes.string,
  optionClassName: PropTypes.func,
};
