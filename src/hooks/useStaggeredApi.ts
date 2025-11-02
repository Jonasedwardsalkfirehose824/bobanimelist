import { useState, useEffect } from 'react';

/**
 * Custom hook to stagger API requests to prevent 429 errors
 */
export function useStaggeredApi<T>(
  apiCall: () => Promise<T>,
  delay: number,
  deps: React.DependencyList = []
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isCancelled = false;
    
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Wait for the specified delay before making the request
        await new Promise(resolve => setTimeout(resolve, delay));
        
        if (isCancelled) return;
        
        const result = await apiCall();
        if (!isCancelled) {
          setData(result);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, deps); // Only re-run if dependencies change

  return { data, loading, error };
}