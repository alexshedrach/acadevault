import { useController } from "react-hook-form";
import { useEffect, useRef } from "react";

export function useFormField({
  name,
  control,
  rules,
  defaultValue,
  propError,
}) {
  const inputRef = useRef();

  // Always call the hook
  const {
    field: { ref: rhfRef, value, onChange, onBlur } = {},
    fieldState: { error: rhfError } = {},
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  const hasRHF = !!control;
  const error = hasRHF ? rhfError?.message || propError : propError;
  const hasError = Boolean(error);

  const setRefs = (el) => {
    inputRef.current = el;
    if (hasRHF) {
      if (typeof rhfRef === "function") rhfRef(el);
      else if (rhfRef) rhfRef.current = el;
    }
  };

  const fieldProps = {
    name,
    ref: setRefs,
    "aria-invalid": hasError,
    "aria-describedby": hasError ? `${name}-error` : undefined,
    ...(hasRHF && {
      value,
      onChange,
      onBlur,
    }),
  };

  useEffect(() => {
    if (hasError && inputRef.current) {
      inputRef.current.focus();
    }
  }, [hasError]);

  return { fieldProps, error, hasError };
}
