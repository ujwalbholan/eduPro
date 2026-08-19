import React from "react";
import { classes } from "../classes/Table.class";
import { cx } from "../utils/utils";
import type { SortDirection } from "../types/TableT";

export interface TableHeaderCellProps {
  children: React.ReactNode;
  width?: number;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  sortDirection?: SortDirection | null;
  onSortClick?: () => void;
  className?: string;
}

export function TableHeaderCell({
  children,
  width,
  align = "left",
  sortable,
  sortDirection,
  onSortClick,
  className,
}: Readonly<TableHeaderCellProps>) {
  const isSorted = sortDirection != null;

  return (
    <th
      className={cx(
        classes.headerCell,
        sortable && classes.headerCellSortable,
        isSorted && classes.headerCellSorted,
        className,
      )}
      style={{ width, textAlign: align }}
      aria-sort={
        isSorted
          ? sortDirection === "asc"
            ? "ascending"
            : "descending"
          : "none"
      }
      scope="col"
    >
      {sortable ? (
        <button
          type="button"
          className="dt-header-cell-btn"
          onClick={onSortClick}
        >
          <span>{children}</span>
          <span className={classes.sortIcon} aria-hidden="true">
            {sortDirection === "asc"
              ? "▲"
              : sortDirection === "desc"
                ? "▼"
                : "↕"}
          </span>
        </button>
      ) : (
        children
      )}
    </th>
  );
}
