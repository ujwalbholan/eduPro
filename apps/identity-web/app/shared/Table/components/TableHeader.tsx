import React from "react";
import { classes } from "../classes/Table.class";
import { TableHeaderCell } from "./TableHeaderCell";
import { cx, slotClass } from "../utils/utils";
import type {
  ColumnDef,
  DataTableClassNames,
  SortState,
} from "../types/TableT";

export interface TableHeaderProps<T> {
  columns: ColumnDef<T>[];
  sort?: SortState | null;
  onSortChange?: (next: SortState | null) => void;
  classNames?: DataTableClassNames;
}

export function TableHeader<T>({
  columns,
  sort,
  onSortChange,
  classNames,
}: Readonly<TableHeaderProps<T>>) {
  const handleSortClick = (column: ColumnDef<T>) => {
    if (!onSortChange) return;

    if (sort?.columnId !== column.id) {
      onSortChange({ columnId: column.id, direction: "asc" });
      return;
    }
    if (sort.direction === "asc") {
      onSortChange({ columnId: column.id, direction: "desc" });
      return;
    }
    onSortChange(null); // third click clears sort
  };

  return (
    <thead className={classes.header}>
      <tr className={cx(classes.headerRow, classNames?.headerRow)}>
        {columns.map((column) => (
          <TableHeaderCell
            key={column.id}
            width={column.width}
            align={column.align}
            sortable={!!onSortChange && !column.disableSort}
            sortDirection={sort?.columnId === column.id ? sort.direction : null}
            onSortClick={() => handleSortClick(column)}
            className={slotClass("", classNames?.headerCell)}
          >
            {column.header}
          </TableHeaderCell>
        ))}
      </tr>
    </thead>
  );
}
