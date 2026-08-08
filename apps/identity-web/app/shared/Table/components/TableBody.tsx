import React from "react";
import { classes } from "../classes/Table.class";
import { TableRow } from "./TableRow";
import { TableLoading } from "./TableLoading";
import { TableEmpty } from "../components/TableEmptyState";
import { TableVirtualBody } from "../components/TableVirtualBodyProps";
import { defaultRowId } from "../utils/utils";
import type { ColumnDef, DataTableClassNames } from "../types/TableT";

export interface TableBodyProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  loading?: boolean;
  loadingRowCount?: number;
  emptyMessage?: React.ReactNode;
  renderEmpty?: () => React.ReactNode;
  renderLoading?: () => React.ReactNode;
  getRowId?: (row: T, index: number) => string | number;
  onRowClick?: (row: T, index: number) => void;
  sortedColumnId?: string | null;
  classNames?: DataTableClassNames;
  virtualized?: boolean;
  rowHeight?: number;
  height?: number;
  overscan?: number;
}

/**
 * Decides which of the four body states to render, in priority order:
 * loading -> empty -> virtualized -> plain. Only plain/virtual states
 * actually own row data; loading/empty are terminal skeleton states.
 * `renderLoading`/`renderEmpty` let consumers fully swap either state.
 */
export function TableBody<T>({
  data,
  columns,
  loading,
  loadingRowCount,
  emptyMessage,
  renderEmpty,
  renderLoading,
  getRowId = defaultRowId,
  onRowClick,
  sortedColumnId,
  classNames,
  virtualized,
  rowHeight,
  height,
  overscan,
}: Readonly<TableBodyProps<T>>) {
  if (loading) {
    if (renderLoading) return <tbody>{renderLoading()}</tbody>;
    return (
      <TableLoading
        columns={columns}
        rowCount={loadingRowCount}
        classNames={classNames}
      />
    );
  }

  if (data.length === 0) {
    if (renderEmpty) return <tbody>{renderEmpty()}</tbody>;
    return (
      <TableEmpty
        colSpan={columns.length}
        message={emptyMessage}
        classNames={classNames}
      />
    );
  }

  if (virtualized) {
    if (!rowHeight || !height) {
      throw new Error(
        "TableBody: `rowHeight` and `height` are required when `virtualized` is true.",
      );
    }
    // TableVirtualBody renders its own <table>/<tbody> inside a fixed-height
    // scroll pane, so it replaces (rather than nests inside) the outer table.
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length} style={{ padding: 0 }}>
            <TableVirtualBody
              data={data}
              columns={columns}
              rowHeight={rowHeight}
              viewportHeight={height}
              overscan={overscan}
              getRowId={getRowId}
              onRowClick={onRowClick}
              sortedColumnId={sortedColumnId}
              classNames={classNames}
            />
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className={classes.body}>
      {data.map((row, index) => (
        <TableRow
          key={getRowId(row, index)}
          row={row}
          rowIndex={index}
          columns={columns}
          onClick={onRowClick}
          sortedColumnId={sortedColumnId}
          classNames={classNames}
        />
      ))}
    </tbody>
  );
}
