import type { ReactNode } from "react";

/** Joins truthy class names, skipping falsy values. Lightweight `clsx` replacement. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Resolves a cell's display value using accessor/render precedence rules. */
export function resolveCell<T>(
  row: T,
  rowIndex: number,
  column: {
    accessor?: (row: T) => ReactNode;
    render?: (row: T, rowIndex: number) => ReactNode;
  },
): ReactNode {
  if (column.render) return column.render(row, rowIndex);
  if (column.accessor) return column.accessor(row);
  return null;
}

/** Default row key resolver: uses `id` field if present, else falls back to index. */
export function defaultRowId<T>(row: T, index: number): string | number {
  const maybeId = (row as unknown as { id?: string | number })?.id;
  return maybeId ?? index;
}

/** Clamp a number between min and max. */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Combines a built-in default class with an optional consumer override for
 * the same slot. Both apply (override doesn't replace the default, it adds
 * to it) so consumers can extend styling without losing base behavior;
 * pass only the override if you want to fully replace visuals via specificity.
 */
export function slotClass(defaultClass: string, override?: string): string {
  return cx(defaultClass, override);
}
