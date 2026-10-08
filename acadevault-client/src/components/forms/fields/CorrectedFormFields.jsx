"use client";

import React, {
  forwardRef,
  memo,
  useMemo,
  useEffect,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import {
  MemoizedFormError,
  MemoizedHelperText,
  MemoizedInputAdornment,
} from "@/helpers/FormErrors";
import { PhoneIcon } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "react-toastify";
import DatePickerLib from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";

// Utility to normalize error messages
const getErrorMessage = (error) => {
  if (!error) return "";
  return typeof error === "string" ? error : error.message || "";
};

// Default validation rules generator
const getDefaultRules = (label, name, required) =>
  required ? { required: `${label || name} is required` } : {};

// FormFieldWrapper: Enhanced with accessibility and consolidated error handling
const FormFieldWrapper = forwardRef(
  (
    {
      label,
      name,
      required = false,
      control,
      rules = {},
      defaultValue,
      adornmentLeft,
      adornmentRight,
      className = "mb-4",
      inputClassName = "",
      disabled = false,
      isCustomInput = false,
      transformValue,
      transformOnChange,
      helpText,
      error: propError,
      children,
      ...rest
    },
    forwardedRef
  ) => {
    const validationRules = {
      ...getDefaultRules(label, name, required),
      ...rules,
    };
    const {
      field: { ref: rhfRef, value, onChange, onBlur } = {},
      fieldState: { error: rhfError } = {},
    } = control
      ? useController({ name, control, rules: validationRules, defaultValue })
      : {};

    const error = getErrorMessage(rhfError || propError);
    const hasError = Boolean(error);
    const inputRef = useRef(null);

    useEffect(() => {
      if (hasError && inputRef.current) {
        inputRef.current.focus();
      }
    }, [hasError]);

    const setRefs = (el) => {
      inputRef.current = el;
      if (typeof forwardedRef === "function") forwardedRef(el);
      else if (forwardedRef) forwardedRef.current = el;
      if (rhfRef) rhfRef(el);
    };

    const padLeft = adornmentLeft ? "pl-10" : "pl-3";
    const padRight = adornmentRight ? "pr-10" : "pr-3";
    const inputPadding = cn(padLeft, padRight);

    const enhancedChild = useMemo(() => {
      const child = React.Children.only(children);
      const safeValue = transformValue?.(value) ?? (value == null ? "" : value);

      const baseProps = {
        id: child.props.id || name,
        name: child.props.name || name,
        required,
        disabled,
        "aria-invalid": hasError,
        "aria-describedby": hasError
          ? `${name}-error`
          : helpText
          ? `${name}-helper`
          : undefined,
        "aria-label": label ? undefined : name, // Accessibility: aria-label for non-labeled inputs
        onBlur: child.props.onBlur || onBlur,
        ref: setRefs,
      };

      const finalProps = { ...baseProps, ...rest };

      if (isCustomInput) {
        finalProps.className = cn(
          child.props.className,
          inputClassName,
          inputPadding
        );
        finalProps.onChange = transformOnChange
          ? (e) => {
              child.props.onChange?.(e);
              onChange?.(transformOnChange(e));
            }
          : child.props.onChange || onChange;
        finalProps.value = safeValue;
        return React.cloneElement(child, finalProps);
      }

      return React.cloneElement(child, {
        ...finalProps,
        className: cn(
          child.props.className,
          "w-full py-2 rounded-md border shadow-sm text-sm transition focus:outline-none focus:ring-2",
          disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white",
          hasError
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500",
          inputPadding,
          inputClassName
        ),
        onChange: child.props.onChange || onChange,
        value: safeValue,
      });
    }, [
      children,
      name,
      required,
      disabled,
      hasError,
      helpText,
      adornmentLeft,
      adornmentRight,
      inputClassName,
      value,
      onChange,
      onBlur,
      isCustomInput,
      transformValue,
      transformOnChange,
      rest,
    ]);

    return (
      <div className={cn("flex flex-col", className)}>
        {label && (
          <label
            htmlFor={name}
            className="text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <div className="relative">
          {adornmentLeft && (
            <MemoizedInputAdornment position="left">
              {adornmentLeft}
            </MemoizedInputAdornment>
          )}
          {enhancedChild}
          {adornmentRight && (
            <MemoizedInputAdornment position="right">
              {adornmentRight}
            </MemoizedInputAdornment>
          )}
        </div>
        <AnimatePresence>
          {hasError ? (
            <MemoizedFormError id={`${name}-error`} message={error} />
          ) : (
            helpText && (
              <MemoizedHelperText id={`${name}-helper`} message={helpText} />
            )
          )}
        </AnimatePresence>
      </div>
    );
  }
);

FormFieldWrapper.displayName = "FormFieldWrapper";

FormFieldWrapper.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  helpText: PropTypes.string,
  control: PropTypes.any,
  rules: PropTypes.object,
  defaultValue: PropTypes.any,
  adornmentLeft: PropTypes.node,
  adornmentRight: PropTypes.node,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  disabled: PropTypes.bool,
  isCustomInput: PropTypes.bool,
  transformValue: PropTypes.func,
  transformOnChange: PropTypes.func,
  children: PropTypes.element.isRequired,
};

// InputField: Simplified with accessibility improvements
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
      helpText,
      error,
      className = "",
      inputClassName = "",
      control,
      rules,
      ...rest
    },
    ref
  ) => (
    <FormFieldWrapper
      label={label}
      name={name}
      control={control}
      required={required}
      error={error}
      helpText={helpText}
      className={cn("mb-4", className)}
      inputClassName={inputClassName}
      rules={rules}
    >
      <input
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        autoFocus={autoFocus}
        ref={ref}
        {...rest}
      />
    </FormFieldWrapper>
  )
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
  helpText: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  control: PropTypes.any,
  rules: PropTypes.object,
};

// FileUpload: Enhanced with accessibility
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
      maxSizeMB = 10,
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
        e.target.value = "";
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
          aria-describedby={
            fileNames.length > 0 ? `${name}-file-list` : undefined
          }
          {...rest}
        />
      ),
      [accept, multiple, inputClassName, name, rest]
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
            <ul
              id={`${name}-file-list`}
              className="mt-2 text-sm text-gray-600 list-disc list-inside"
            >
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

// NumberInputField: Simplified by extracting phone input
export const NumberInputField = memo(
  forwardRef(function NumberInputField(
    {
      label,
      name,
      type = "text",
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
    const input = useMemo(
      () =>
        type === "number" ? (
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(inputClassName)}
            {...rest}
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(inputClassName)}
            {...rest}
          />
        ),
      [type, placeholder, disabled, min, max, step, inputClassName, rest]
    );

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
        {input}
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

// InputWithAddon: Unchanged except for error prop type
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
      error,
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
        error={error}
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
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

// DateInputField: Enhanced with accessibility
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
      error,
      value: ctrlValue,
      onChange: ctrlOnChange,
      onBlur: ctrlOnBlur,
      ...rest
    },
    ref
  ) {
    const isController = !!control;
    const {
      field: { value, onChange, onBlur },
      fieldState: { error: rhfError },
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

    const hasError = Boolean(getErrorMessage(error || rhfError));
    const outFormat =
      dateFormat || (showTimeSelect ? "yyyy-MM-dd'T'HH:mm" : "yyyy-MM-dd");

    if (usePicker) {
      const selected = value ? parseISO(value) : null;
      return (
        <FormFieldWrapper
          label={label}
          name={name}
          required={required}
          helpText={helpText}
          error={error || rhfError}
          isCustomInput
          ref={ref}
          className={className}
          inputClassName={inputClassName}
        >
          <DatePickerLib
            selected={selected}
            onChange={(date) => {
              const iso = date ? format(date, outFormat) : "";
              onChange(iso);
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
            aria-label={label ? undefined : name}
            {...rest}
          />
        </FormFieldWrapper>
      );
    }

    return (
      <FormFieldWrapper
        label={label}
        name={name}
        required={required}
        helpText={helpText}
        error={error || rhfError}
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
          aria-label={label ? undefined : name}
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
  control: PropTypes.any,
  rules: PropTypes.object,
  defaultValue: PropTypes.string,
  helpText: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

// TextAreaField: Simplified with consolidated error handling
export const TextAreaField = memo(
  forwardRef(function TextAreaField(
    {
      label,
      name,
      rows = 4,
      placeholder = "",
      required = false,
      helpText,
      error,
      className = "",
      inputClassName = "",
      control,
      rules,
      defaultValue,
      ...rest
    },
    ref
  ) {
    return (
      <FormFieldWrapper
        label={label}
        name={name}
        required={required}
        error={error}
        helpText={helpText}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        className={className}
        inputClassName={inputClassName}
        ref={ref}
      >
        <textarea
          rows={rows}
          placeholder={placeholder}
          className={cn(inputClassName)}
          aria-label={label ? undefined : name}
          {...rest}
        />
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
  helpText: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  control: PropTypes.any,
  rules: PropTypes.object,
  defaultValue: PropTypes.any,
};

// SelectField: Simplified with consolidated error handling
export const SelectField = memo(
  forwardRef(function SelectField(
    {
      label,
      name,
      options = [],
      placeholder = "Select an option",
      required = false,
      disabled = false,
      error,
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
    const select = useMemo(
      () => (
        <select disabled={disabled} className={cn(selectClassName)} {...rest}>
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt, index) =>
            typeof opt === "object" ? (
              <option key={`${opt.value}-${index}`} value={opt.value}>
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
        error={error}
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
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  selectClassName: PropTypes.string,
  control: PropTypes.any,
  rules: PropTypes.object,
  defaultValue: PropTypes.any,
  helpText: PropTypes.string,
};

// CheckboxGroupField: Enhanced with accessibility
export const CheckboxGroupField = ({
  label,
  name,
  options = [],
  error,
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

  const errorMessage = getErrorMessage(error || rhfError);

  const handleToggle = (val) => {
    const isChecked = value.includes(val);
    constесп;

    const newValue = isChecked
      ? value.filter((v) => v !== val)
      : [...value, val];
    onChange(newValue);
  };

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
      <div className="space-y-2" role="group" aria-labelledby={`${name}-label`}>
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center space-x-2 text-gray-800"
          >
            <input
              ref={ref}
              type="checkbox"
              name={name}
              value={opt.value}
              checked={Array.isArray(value) && value.includes(opt.value)}
              onChange={() => handleToggle(opt.value)}
              className={cn(
                "w-4 h-4 accent-blue-600 focus:ring-2 focus:ring-blue-400 transition",
                disabled && "opacity-50 cursor-not-allowed"
              )}
              disabled={disabled}
              aria-label={opt.label}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </FormFieldWrapper>
  );
};

CheckboxGroupField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })
  ).isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  control: PropTypes.any.isRequired,
  rules: PropTypes.object,
  defaultValue: PropTypes.arrayOf(PropTypes.string),
  helpText: PropTypes.string,
};

// CheckboxField: Enhanced with accessibility
export const CheckboxField = ({
  label,
  name,
  control,
  rules,
  className = "",
  defaultValue = false,
  disabled = false,
  error,
}) => {
  const {
    field: { value = false, onChange, ref },
    fieldState: { error: rhfError },
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
      error={getErrorMessage(error || rhfError)}
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
          aria-label={label}
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
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

// RadioGroupField: Enhanced with accessibility
export const RadioGroupField = ({
  label,
  name,
  options = [],
  error,
  disabled = false,
  className = "",
  layout = "stacked",
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

  const errorMessage = getErrorMessage(error || rhfError);

  return (
    <FormFieldWrapper
      label={label}
      name={name}
      required={rules?.required}
      error={errorMessage}
      helpText={helpText}
      control={control}
      className={className}
      disabled={disabled}
    >
      <div
        className={cn(
          layout === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            : "space-y-2"
        )}
        role="radiogroup"
        aria-labelledby={`${name}-label`}
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
              aria-label={opt.label}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
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
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  layout: PropTypes.oneOf(["stacked", "grid"]),
  control: PropTypes.any.isRequired,
  rules: PropTypes.object,
  defaultValue: PropTypes.string,
  helpText: PropTypes.string,
  optionClassName: PropTypes.func,
};

export {
  FormFieldWrapper,
  InputField,
  FileUpload,
  PhoneInputField,
  NumberInputField,
  InputWithAddon,
  DateInputField,
  TextAreaField,
  SelectField,
  CheckboxGroupField,
  CheckboxField,
  RadioGroupField,
};
