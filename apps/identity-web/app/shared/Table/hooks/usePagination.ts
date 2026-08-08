"use client";

import { useMemo } from "react";
import { clamp } from "../utils/utils";
import type { PaginationConfig } from "../types/TableT";

export interface UsePaginationResult<T> {
  /** Rows to actually render: sliced for client-side, passed through unchanged for manual/server-side. */
  pageData: T[];
  page: number;
  pageSize: number;
  total: number;
  pageCount: number;
  startRow: number;
  endRow: number;
  canPrevious: boolean;
  canNext: boolean;
}

/**
 * Resolves what a table should render given a pagination config:
 * - manual (server-side): `data` is already the current page, `total` comes
 *   from config since the table can't infer it from a partial array.
 * - client-side (default): `data` is the full set, this hook slices it.
 */
export function usePagination<T>(
  data: T[],
  config?: PaginationConfig,
): UsePaginationResult<T> {
  return useMemo(() => {
    if (!config) {
      return {
        pageData: data,
        page: 1,
        pageSize: data.length,
        total: data.length,
        pageCount: 1,
        startRow: data.length ? 1 : 0,
        endRow: data.length,
        canPrevious: false,
        canNext: false,
      };
    }

    const { state, manual } = config;
    const total = state.total ?? data.length;
    const pageSize = Math.max(1, state.pageSize);
    const pageCount = Math.max(1, Math.ceil(total / pageSize));
    const page = clamp(state.page, 1, pageCount);

    const pageData = manual
      ? data
      : data.slice((page - 1) * pageSize, page * pageSize);

    const startRow = total === 0 ? 0 : (page - 1) * pageSize + 1;
    const endRow = Math.min(page * pageSize, total);

    return {
      pageData,
      page,
      pageSize,
      total,
      pageCount,
      startRow,
      endRow,
      canPrevious: page > 1,
      canNext: page < pageCount,
    };
  }, [data, config]);
}
