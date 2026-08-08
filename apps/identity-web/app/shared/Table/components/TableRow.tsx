import React from "react";
import { classes } from "../classes/Table.class";
import { TableCell } from "./TableCell";
import { cx, resolveCell } from "../utils/utils";
import type { ColumnDef, DataTableClassNames } from "../types/TableT";

export interface TableRowProps<T> {
  row: T;
  rowIndex: number;
  columns: ColumnDef<T>[];
  onClick?: (row: T, index: number) => void;
  /** Column id currently sorted, if any — drives the tally-rail accent on the matching cell. */
  sortedColumnId?: string | null;
  classNames?: DataTableClassNames;
  /** Absolute positioning offset, used only when rendered inside TableVirtualBody. */
  style?: React.CSSProperties;
}

function TableRowInner<T>({
  row,
  rowIndex,
  columns,
  onClick,
  sortedColumnId,
  classNames,
  style,
}: Readonly<TableRowProps<T>>) {
  return (
    <tr
      className={cx(
        classes.row,
        onClick && classes.rowClickable,
        classNames?.row,
      )}
      onClick={onClick ? () => onClick(row, rowIndex) : undefined}
      style={style}
    >
      {columns.map((column) => (
        <TableCell
          key={column.id}
          width={column.width}
          align={column.align}
          sorted={sortedColumnId === column.id}
          className={classNames?.cell}
        >
          {resolveCell(row, rowIndex, column)}
        </TableCell>
      ))}
    </tr>
  );
}

// Memoized so unrelated re-renders (e.g. scroll-driven virtualization state)
// don't re-render every row's cells.
export const TableRow = React.memo(TableRowInner) as typeof TableRowInner;
