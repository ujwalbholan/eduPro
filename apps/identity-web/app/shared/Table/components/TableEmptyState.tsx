import React from "react";
import { classes } from "../classes/Table.class";
import { cx } from "../utils/utils";
import type { DataTableClassNames } from "../types/TableT";

export interface TableEmptyProps {
  colSpan: number;
  message?: React.ReactNode;
  classNames?: DataTableClassNames;
}

export function TableEmpty({
  colSpan,
  message = "No records to show.",
  classNames,
}: Readonly<TableEmptyProps>) {
  return (
    <tbody className={classes.empty}>
      <tr>
        <td colSpan={colSpan}>
          <div className={cx(classes.emptyText, classNames?.emptyText)}>
            {message}
          </div>
        </td>
      </tr>
    </tbody>
  );
}
