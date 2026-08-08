import type { ReactNode, CSSProperties } from "react";

/** A single column definition for DataTable. */
export interface ColumnDef<T> {
  /** Stable identifier, also used as the React key for header/cells. */
  id: string;
  /** Header label. Can be a string or custom ReactNode. */
  header: ReactNode;
  /**
   * Reads the cell value out of a row. Prefer this over `render` when the
   * value is a plain field so sorting/exporting can reuse it later.
   */
  accessor?: (row: T) => ReactNode;
  /** Full control over cell rendering; takes precedence over `accessor`. */
  render?: (row: T, rowIndex: number) => ReactNode;
  /** Fixed pixel width. Needed for virtualized tables to size columns. */
  width?: number;
  align?: "left" | "center" | "right";
  /** Disallow sorting UI on this column even if the table is sortable. */
  disableSort?: boolean;
}

/**
 * Per-slot class overrides. Any key you omit falls back to the built-in
 * default from classes.ts, so you only need to specify what you're
 * changing — no need to reproduce the whole class map.
 */
export interface DataTableClassNames {
  wrap?: string;
  table?: string;
  headerRow?: string;
  headerCell?: string;
  row?: string;
  cell?: string;
  loadingRow?: string;
  emptyText?: string;
  footer?: string;
  pagination?: string;
}

export type SortDirection = "asc" | "desc";

export interface SortState {
  columnId: string;
  direction: SortDirection;
}

export interface PaginationState {
  /** 1-indexed current page. */
  page: number;
  pageSize: number;
  /**
   * Total row count across all pages. Required for server-side ("manual")
   * pagination since the table only ever sees one page of `data`. Optional
   * for client-side pagination — defaults to `data.length`.
   */
  total?: number;
}

export interface PaginationConfig {
  state: PaginationState;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  /**
   * When true, `data` is assumed to already be just the current page
   * (server-side pagination) — the table won't re-slice it. When false
   * (default), the table slices the full `data` array itself.
   */
  manual?: boolean;
}

export interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  /** Stable row key. Defaults to row index if omitted (not recommended). */
  getRowId?: (row: T, index: number) => string | number;
  loading?: boolean;
  /** Rows to render while loading, for skeleton sizing. Default 6. */
  loadingRowCount?: number;
  emptyMessage?: ReactNode;
  /** Full control over the empty state; overrides `emptyMessage` entirely. */
  renderEmpty?: () => ReactNode;
  /** Full control over the loading state; overrides the default skeleton rows. */
  renderLoading?: () => ReactNode;
  onRowClick?: (row: T, index: number) => void;
  sort?: SortState | null;
  onSortChange?: (next: SortState | null) => void;
  /** Turns on windowed rendering via useVirtualRows. */
  virtualized?: boolean;
  /** Required when virtualized: fixed row height in px. */
  rowHeight?: number;
  /** Required when virtualized: visible viewport height in px. */
  height?: number;
  /** Extra rows rendered above/below the viewport. Default 4. */
  overscan?: number;
  className?: string;
  /** Inline style, useful for one-off token overrides: `style={{ '--dt-accent': '#7C3AED' }}`. */
  style?: CSSProperties;
  /** Per-slot class overrides — see DataTableClassNames. */
  classNames?: DataTableClassNames;
  stickyHeader?: boolean;
  dense?: boolean;
  /** Adds a TableFooter with pagination controls. Omit for an unpaginated table. */
  pagination?: PaginationConfig;
}
