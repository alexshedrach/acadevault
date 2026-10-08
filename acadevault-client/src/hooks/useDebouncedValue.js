import { useState, useEffect, useRef } from "react";

export default function useDebounceValue(
  value,
  { delay = 300, enabled = true } = {}
) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const previousValue = useRef(value);

  useEffect(() => {
    if (!enabled) {
      setDebouncedValue(value); // Immediately update if disabled
      return;
    }

    const handler = setTimeout(() => {
      if (previousValue.current !== value) {
        setDebouncedValue(value);
        previousValue.current = value;
      }
    }, delay);

    return () => clearTimeout(handler); // Cleanup timeout
  }, [value, delay, enabled]);

  return debouncedValue;
}
