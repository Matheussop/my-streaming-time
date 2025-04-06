"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  error?: AppError | null;
  execute: (...args: any[]) => Promise<T>;
  reset?: () => void;
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
  const { initialData = null, immediate = false } = options;

  // Using refs to store callbacks and API function
  const apiFunctionRef = useRef(apiFunction);
  const optionsRef = useRef(options);

  // Ref to control if component is mounted
  const isMountedRef = useRef(true);

  // Update refs when props change
  useEffect(() => {
    apiFunctionRef.current = apiFunction;
    optionsRef.current = options;
  }, [apiFunction, options]);

  // Control component unmounting
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const [data, setData] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<AppError | null>(null);

  const execute = useCallback(async (...args: any[]): Promise<T> => {
    try {
      // Check if component is still mounted
      if (!isMountedRef.current) {
        // In case of unmounting, we just execute the API without updating state
        return await apiFunctionRef.current(...args);
      }

      setIsLoading(true);
      setError(null);

      // Use the API function reference instead of the direct prop
      const result = await apiFunctionRef.current(...args);

      // Only update state if component is still mounted
      if (isMountedRef.current) {
        setData(result);
        // Important: Make sure to access onSuccess from current reference
        if (
          optionsRef.current &&
          typeof optionsRef.current.onSuccess === "function"
        ) {
          optionsRef.current.onSuccess(result);
        }
      }

      return result;
    } catch (err) {
      // If unmounted, just propagate the error without updating state
      if (!isMountedRef.current) {
        throw err;
      }

      const appError: AppError =
        err instanceof AppError ? err : AppError.fromError(err);

      setError(appError);
      // Use options reference to access onError
      if (
        optionsRef.current &&
        typeof optionsRef.current.onError === "function"
      ) {
        optionsRef.current.onError(appError);
      }
      throw appError;
    } finally {
      // Only update isLoading if still mounted
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  const reset = useCallback(() => {
    if (!isMountedRef.current) return;

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
