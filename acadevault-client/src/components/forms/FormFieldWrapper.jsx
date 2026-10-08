"use client";

import React, { forwardRef, memo, useMemo, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import {
  MemoizedFormError,
  MemoizedHelperText,
  MemoizedInputAdornment,
} from "@/helpers/FormErrors";

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
      children,
      ...incomingProps
    },
    forwardedRef
  ) => {
    // Strip out internal-only props before using rest
    const { helpText, error: propError = "", ...rest } = incomingProps;

    // Automatically inject required rule
    const validationRules = {
      ...rules,
      ...(required && !rules.required
        ? { required: `${label || name} is required` }
        : {}),
    };

    const {
      field: { ref: rhfRef, value, onChange, onBlur } = {},
      fieldState: { error: rhfError } = {},
    } = control
      ? useController({
          name,
          control,
          rules: validationRules,
          defaultValue,
        })
      : {};

    const error = rhfError?.message || propError;
    const hasError = Boolean(error);

    const inputRef = useRef();
    useEffect(() => {
      if (
        hasError &&
        inputRef.current &&
        typeof inputRef.current.focus === "function"
      ) {
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
        required: child.props.required ?? required,
        disabled: child.props.disabled ?? disabled,
        "aria-invalid": hasError,
        "aria-describedby": hasError
          ? `${name}-error`
          : helpText
          ? `${name}-helper`
          : undefined,
        onBlur: child.props.onBlur || onBlur,
        ref: setRefs,
      };

      const finalProps = {
        ...baseProps,
        ...rest, // only after stripping non-DOM props
      };

      // Custom Input Mode (e.g., DatePicker, PhoneInput)
      if (isCustomInput) {
        const isDateInput = child.type?.name?.includes("DatePicker");

        finalProps.className = cn(
          child.props.className,
          inputClassName,
          inputPadding
        );

        finalProps.onChange = (date) => {
          onChange?.(date); // always call RHF
          child.props.onChange?.(date);
        };

        // Inject real Date object as value
        finalProps.value =
          isDateInput && value && !(value instanceof Date)
            ? new Date(value)
            : value || null;

        return React.cloneElement(child, finalProps);
      }

      // Standard Input Mode
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
  error: PropTypes.string,
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

export default memo(FormFieldWrapper);
