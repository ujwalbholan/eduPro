"use client";

import { useCallback, useMemo, useRef, useState } from "react";

export interface UseVirtualRowsOptions {
  rowCount: number;
  rowHeight: number;
  /** Height of the scrollable viewport in px. */
  viewportHeight: number;
  /** Extra rows rendered above/below the visible window. */
  overscan?: number;
}

export interface UseVirtualRowsResult {
  /** Attach to the scroll container's `onScroll`. */
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  /** Attach to the scroll container's `ref`. */
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** Inclusive-exclusive index range of rows that should be mounted. */
  startIndex: number;
  endIndex: number;
  /** Total scrollable height, so the scrollbar reflects the full row count. */
  totalHeight: number;
  /** Top offset to push the rendered slice down to its real position. */
  offsetY: number;
}

/**
 * Fixed-row-height windowing. Tracks scrollTop and derives the visible
 * slice; the caller renders only rows[startIndex:endIndex] and wraps them
 * in a spacer of `offsetY`/`totalHeight` to keep native scrollbar behavior.
 */
export function useVirtualRows({
  rowCount,
  rowHeight,
  viewportHeight,
  overscan = 4,
}: UseVirtualRowsOptions): UseVirtualRowsResult {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return useMemo(() => {
    const totalHeight = rowCount * rowHeight;

    if (rowHeight <= 0 || rowCount === 0) {
      return {
        onScroll,
        containerRef,
        startIndex: 0,
        endIndex: 0,
        totalHeight: 0,
        offsetY: 0,
      };
    }

    const visibleCount = Math.ceil(viewportHeight / rowHeight);
    const rawStart = Math.floor(scrollTop / rowHeight) - overscan;
    const startIndex = Math.max(0, rawStart);
    const endIndex = Math.min(
      rowCount,
      startIndex + visibleCount + overscan * 2,
    );
    const offsetY = startIndex * rowHeight;

    return {
      onScroll,
      containerRef,
      startIndex,
      endIndex,
      totalHeight,
      offsetY,
    };
  }, [scrollTop, rowCount, rowHeight, viewportHeight, overscan, onScroll]);
}
