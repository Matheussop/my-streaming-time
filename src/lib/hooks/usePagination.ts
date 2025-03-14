"use client";

import { useState, useCallback } from "react";

interface UsePaginationOptions {
  initialPage?: number;
  initialLimit?: number;
}

interface UsePaginationResult {
  page: number;
  limit: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  resetPagination: () => void;
  paginationParams: { page: number; limit: number };
}

/**
 * Custom hook for handling pagination
 * @param options Options for the hook
 * @returns Object with pagination state and methods
 */
export const usePagination = (
  options: UsePaginationOptions = {},
): UsePaginationResult => {
  const { initialPage = 1, initialLimit = 10 } = options;

  const [page, setPage] = useState<number>(initialPage);
  const [limit, setLimit] = useState<number>(initialLimit);

  const nextPage = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const prevPage = useCallback(() => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  }, []);

  const resetPagination = useCallback(() => {
    setPage(initialPage);
    setLimit(initialLimit);
  }, [initialPage, initialLimit]);

  const paginationParams = {
    page,
    limit,
  };

  return {
    page,
    limit,
    setPage,
    setLimit,
    nextPage,
    prevPage,
    resetPagination,
    paginationParams,
  };
};
