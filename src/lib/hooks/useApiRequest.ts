"use client";

import { useState, useEffect, useCallback } from "react";
import { AppError } from "../appError";

interface UseApiRequestOptions<T> {
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: AppError) => void;
  immediate?: boolean;
}

interface UseApiRequestResult<T> {
  data: T | null;
  isLoading: boolean;
  error: AppError | null;
  execute: (...args: any[]) => Promise<T>;
  reset: () => void;
}

/**
 * Custom hook for handling API requests with loading and error states
 * @param apiFunction The API function to call
 * @param options Options for the hook
 * @returns Object with data, loading state, error, execute function, and reset function
 */
export const useApiRequest = <T>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: UseApiRequestOptions<T> = {},
): UseApiRequestResult<T> => {
  const { initialData = null, onSuccess, onError, immediate = false } = options;

  const [data, setData] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<AppError | null>(null);

  const execute = useCallback(
    async (...args: any[]): Promise<T> => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await apiFunction(...args);

        setData(result);
        onSuccess?.(result);

        return result;
      } catch (err) {
        const appError =
          err instanceof AppError ? err : AppError.fromError(err);
        setError(appError);
        onError?.(appError);
        throw appError;
      } finally {
        setIsLoading(false);
      }
    },
    [apiFunction, onSuccess, onError],
  );

  const reset = useCallback(() => {
    setData(initialData);
    setIsLoading(false);
    setError(null);
  }, [initialData]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return { data, isLoading, error, execute, reset };
};
