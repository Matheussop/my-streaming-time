import { AppError } from "../appError";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../axiosConfig";
import { cache } from "react";

interface ServerApiRequestOptions<T> {
  onError?: (error: AppError) => Promise<void> | void;
  fallback?: T;
}

/**
 * Utility function for handling server-side API requests with error handling
 * @param apiFunction The API function to call
 * @param options Options for error handling and fallback data
 * @returns Promise with the result or fallback data
 */
export async function serverApiRequest<T>(
  apiFunction: () => Promise<T>,
  options: ServerApiRequestOptions<T> = {},
): Promise<T | null> {
  const { onError, fallback = null } = options;

  try {
    const result = await apiFunction();
    return result;
  } catch (err) {
    const appError = err instanceof AppError ? err : AppError.fromError(err);

    if (onError) {
      await onError(appError);
    }

    if (process.env.NODE_ENV === "development") {
      console.error("Server API Request Error:", appError);
    }

    return fallback;
  }
}

interface ApiRequestOptions<TParams = void>
  extends Omit<AxiosRequestConfig, "params"> {
  params?: TParams;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
  cache?: boolean;
}

/**
 * Utility function for making typed axios requests on the server
 * @param url The URL to fetch from
 * @param options Request options including params, headers, and cache settings
 * @returns Promise with the parsed response
 */
export const serverApi = cache(
  async <TResponse, TParams = void>(
    url: string,
    options: ApiRequestOptions<TParams> = {},
  ): Promise<TResponse> => {
    const {
      params,
      headers = {},
      next,
      cache: useCache = true,
      ...axiosConfig
    } = options;

    try {
      const response: AxiosResponse<TResponse> = await axiosInstance({
        url,
        params,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        ...axiosConfig,
        ...(next && { next }),
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status || 500;
        throw new AppError(`HTTP error! status: ${status} - ${error.message}`);
      }

      throw new AppError("Unknown error occurred during API request");
    }
  },
);
