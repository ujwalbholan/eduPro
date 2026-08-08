import React from "react";
import { classes } from "../classes/Table.class";
import { cx } from "../utils/utils";

export interface TableCellProps {
  children: React.ReactNode;
  width?: number;
  align?: "left" | "center" | "right";
  /** True when this cell's column is the currently sorted column — drives the tally-rail accent. */
  sorted?: boolean;
  className?: string;
}

const alignClass = {
  left: classes.cellAlignLeft,
  center: classes.cellAlignCenter,
  right: classes.cellAlignRight,
} as const;

export function TableCell({
  children,
  width,
  align = "left",
  sorted,
  className,
}: Readonly<TableCellProps>) {
  return (
    <td
      className={cx(
        classes.cell,
        alignClass[align],
        sorted && classes.cellSorted,
        className,
      )}
      style={{ width }}
    >
      {children}
    </td>
  );
}
