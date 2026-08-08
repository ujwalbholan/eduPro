"use client";

import React from "react";
import { classes } from "../classes/Table.class";
import { TableRow } from "./TableRow";
import { useVirtualRows } from "../hooks/useVirtualRows";
import { defaultRowId } from "../utils/utils";
import type { ColumnDef, DataTableClassNames } from "../types/TableT";

export interface TableVirtualBodyProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  rowHeight: number;
  viewportHeight: number;
  overscan?: number;
  getRowId?: (row: T, index: number) => string | number;
  onRowClick?: (row: T, index: number) => void;
  sortedColumnId?: string | null;
  classNames?: DataTableClassNames;
  /** Bubbled up so the parent TableWrap can drive the same scroll container. */
  onViewportRef?: (el: HTMLDivElement | null) => void;
}

/**
 * Renders only the rows currently in (or near) the viewport. Must live
 * inside a scrollable container of height === viewportHeight; TableBody
 * wires that container via TableWrap when `virtualized` is set.
 */
export function TableVirtualBody<T>({
  data,
  columns,
  rowHeight,
  viewportHeight,
  overscan,
  getRowId = defaultRowId,
  onRowClick,
  sortedColumnId,
  classNames,
  onViewportRef,
}: Readonly<TableVirtualBodyProps<T>>) {
  const { onScroll, startIndex, endIndex, totalHeight, offsetY } =
    useVirtualRows({
      rowCount: data.length,
      rowHeight,
      viewportHeight,
      overscan,
    });

  const visibleRows = data.slice(startIndex, endIndex);

  return (
    <div
      className={classes.virtualBody}
      style={{ height: viewportHeight, overflowY: "auto" }}
      onScroll={onScroll}
      ref={onViewportRef}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody
          style={{
            display: "block",
            position: "relative",
            height: totalHeight,
          }}
        >
          <tr
            style={{ height: offsetY, display: "block" }}
            aria-hidden="true"
          />
          {visibleRows.map((row, i) => {
            const rowIndex = startIndex + i;
            return (
              <TableRow
                key={getRowId(row, rowIndex)}
                row={row}
                rowIndex={rowIndex}
                columns={columns}
                onClick={onRowClick}
                sortedColumnId={sortedColumnId}
                classNames={classNames}
                style={{
                  display: "table",
                  tableLayout: "fixed",
                  width: "100%",
                  height: rowHeight,
                }}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
