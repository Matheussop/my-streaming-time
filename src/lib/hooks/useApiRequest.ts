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
  const { initialData = null, immediate = false } = options;

  // Usando refs para armazenar callbacks e função API
  const apiFunctionRef = useRef(apiFunction);
  const optionsRef = useRef(options);

  // Ref para controlar se o componente está montado
  const isMountedRef = useRef(true);

  // Atualizar refs quando as props mudarem
  useEffect(() => {
    apiFunctionRef.current = apiFunction;
    optionsRef.current = options;
  }, [apiFunction, options]);

  // Controlar desmontagem do componente
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
      // Verificar se o componente ainda está montado
      if (!isMountedRef.current) {
        // Em caso de desmontagem, apenas executamos a API sem atualizar estado
        return await apiFunctionRef.current(...args);
      }

      setIsLoading(true);
      setError(null);

      // Usar a referência da função API em vez da prop direta
      const result = await apiFunctionRef.current(...args);

      // Só atualizar estado se o componente ainda estiver montado
      if (isMountedRef.current) {
        setData(result);
        // Importante: Certifique-se de acessar onSuccess da referência atual
        if (
          optionsRef.current &&
          typeof optionsRef.current.onSuccess === "function"
        ) {
          optionsRef.current.onSuccess(result);
        }
      }

      return result;
    } catch (err) {
      // Se desmontado, apenas propagar o erro sem atualizar estado
      if (!isMountedRef.current) {
        throw err;
      }

      const appError = err instanceof AppError ? err : AppError.fromError(err);

      setError(appError);
      // Usar a referência das options para acessar onError
      if (
        optionsRef.current &&
        typeof optionsRef.current.onError === "function"
      ) {
        optionsRef.current.onError(appError);
      }
      throw appError;
    } finally {
      // Só atualizar isLoading se ainda estiver montado
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
