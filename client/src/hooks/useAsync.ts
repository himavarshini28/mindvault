import { useState, useCallback } from "react";

export function useAsync<T = unknown>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const run = useCallback(async (fn: () => Promise<T>) => {
    setLoading(true); 
    setError(null);
    try {
      const res = await fn();
      return res;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, run };
}
