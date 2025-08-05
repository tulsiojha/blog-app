import { useState, useEffect } from "react";

function useDebounce(
  callback: () => Promise<void>,
  value: any[],
  delay: number,
) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const handler = setTimeout(async () => {
      setDebouncedValue(value);
      await callback?.();
      setLoading(false);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [...(value || []), delay]);

  return [debouncedValue, loading];
}

export default useDebounce;
