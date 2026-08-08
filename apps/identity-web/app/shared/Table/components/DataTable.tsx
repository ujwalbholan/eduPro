"use client";

import React from "react";
import { classes } from "../classes/Table.class";
import { TableWrap } from "./TableWrap";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { TableFooter } from "./TableFooter";
import { usePagination } from "../hooks/usePagination";
import { cx } from "../utils/utils";
import type { DataTableProps } from "../types/TableT";

/**
 * Generic, fully themeable data table.
 *
 * DataTable
 * ├─ TableWrap                scroll boundary
 * ├─ TableHeader                <thead> built from columns
 * │   └─ TableHeaderCell         per-column header + sort control
 * ├─ TableBody                   state router: loading / empty / virtual / plain
 * │   ├─ TableRow → TableCell
 * │   ├─ TableLoading
 * │   ├─ TableEmpty
 * │   └─ TableVirtualBody        windowed rows via useVirtualRows
 * └─ TableFooter                 pagination, via usePagination
 *
 * Theming: override CSS variables (--dt-bg, --dt-accent, --dt-radius, ...)
 * on any ancestor, or pass `style` for one-off overrides on this instance.
 * Add `data-dt-theme="dark"` to an ancestor for dark mode.
 *
 * Structure: override `classNames` for per-slot class additions, or pass
 * `renderEmpty`/`renderLoading` to fully replace those states.
 *
 * Pagination: omit `pagination` for an unpaginated table. Pass it for
 * client-side paging (hand in the full `data` array, the table slices it)
 * or server-side paging (`pagination.manual: true`, hand in just the
 * current page's `data` plus `pagination.state.total`).
 */
export function DataTable<T>({
  columns,
  data,
  getRowId,
  loading,
  loadingRowCount,
  emptyMessage,
  renderEmpty,
  renderLoading,
  onRowClick,
  sort,
  onSortChange,
  virtualized,
  rowHeight,
  height,
  overscan,
  className,
  style,
  classNames,
  stickyHeader,
  dense,
  pagination,
}: Readonly<DataTableProps<T>>) {
  const paginationState = usePagination(data, pagination);
  const rows = pagination ? paginationState.pageData : data;

  return (
    <TableWrap
      sticky={stickyHeader}
      className={cx(classNames?.wrap, className)}
      style={style}
    >
      <table
        className={cx(classes.table, dense && classes.dense, classNames?.table)}
      >
        <TableHeader
          columns={columns}
          sort={sort}
          onSortChange={onSortChange}
          classNames={classNames}
        />
        <TableBody
          data={rows}
          columns={columns}
          loading={loading}
          loadingRowCount={loadingRowCount}
          emptyMessage={emptyMessage}
          renderEmpty={renderEmpty}
          renderLoading={renderLoading}
          getRowId={getRowId}
          onRowClick={onRowClick}
          sortedColumnId={sort?.columnId ?? null}
          classNames={classNames}
          virtualized={virtualized}
          rowHeight={rowHeight}
          height={height}
          overscan={overscan}
        />
        {pagination && !loading && (
          <TableFooter
            colSpan={columns.length}
            pagination={pagination}
            paginationState={paginationState}
            classNames={classNames}
          />
        )}
      </table>
    </TableWrap>
  );
}

export default DataTable;
