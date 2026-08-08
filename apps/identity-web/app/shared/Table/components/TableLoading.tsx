import React from "react";
import { classes } from "../classes/Table.class";
import { cx } from "../utils/utils";
import type { ColumnDef, DataTableClassNames } from "../types/TableT";

export interface TableLoadingProps<T> {
  columns: ColumnDef<T>[];
  rowCount?: number;
  classNames?: DataTableClassNames;
}

export function TableLoading<T>({
  columns,
  rowCount = 6,
  classNames,
}: Readonly<TableLoadingProps<T>>) {
  return (
    <tbody className={classes.loading} aria-hidden="true">
      {Array.from({ length: rowCount }).map((_, rowIdx) => (
        <tr
          key={rowIdx}
          className={cx(classes.loadingRow, classNames?.loadingRow)}
        >
          {columns.map((column) => (
            <td key={column.id} style={{ width: column.width }}>
              <div className={classes.skeleton} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
