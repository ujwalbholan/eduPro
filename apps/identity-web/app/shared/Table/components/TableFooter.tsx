import React from "react";
import { classes } from "../classes/Table.class";
import { cx } from "../utils/utils";
import type { DataTableClassNames, PaginationConfig } from "../types/TableT";
import type { UsePaginationResult } from "../hooks/usePagination";

export interface TableFooterProps<T> {
  colSpan: number;
  pagination: PaginationConfig;
  paginationState: UsePaginationResult<T>;
  classNames?: DataTableClassNames;
}

/** Compact page-number list: always shows first/last, current ± 1, and "…" for gaps. */
function getPageItems(
  page: number,
  pageCount: number,
): (number | "ellipsis")[] {
  const items: (number | "ellipsis")[] = [];
  const add = (n: number) => items.push(n);

  add(1);
  if (page > 3) items.push("ellipsis");
  for (
    let n = Math.max(2, page - 1);
    n <= Math.min(pageCount - 1, page + 1);
    n++
  )
    add(n);
  if (page < pageCount - 2) items.push("ellipsis");
  if (pageCount > 1) add(pageCount);

  return items;
}

export function TableFooter<T>({
  colSpan,
  pagination,
  paginationState,
  classNames,
}: Readonly<TableFooterProps<T>>) {
  const { state, onPageChange, onPageSizeChange, pageSizeOptions } = pagination;
  const { page, pageCount, total, startRow, endRow, canPrevious, canNext } =
    paginationState;

  if (total === 0) return null;

  const pageItems = getPageItems(page, pageCount);

  return (
    <tfoot className={cx(classes.footer, classNames?.footer)}>
      <tr>
        <td colSpan={colSpan}>
          <div className={cx(classes.pagination, classNames?.pagination)}>
            <span className={classes.paginationSummary}>
              {startRow}–{endRow} of {total}
            </span>

            <div className={classes.paginationControls}>
              {onPageSizeChange && pageSizeOptions && (
                <select
                  className={classes.paginationPageSize}
                  value={state.pageSize}
                  onChange={(e) => onPageSizeChange(Number(e.target.value))}
                  aria-label="Rows per page"
                >
                  {pageSizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size} / page
                    </option>
                  ))}
                </select>
              )}

              <button
                type="button"
                className={classes.paginationBtn}
                onClick={() => onPageChange(page - 1)}
                disabled={!canPrevious}
                aria-label="Previous page"
              >
                ‹
              </button>

              {pageItems.map((item, i) =>
                item === "ellipsis" ? (
                  <span key={`e${i}`} className={classes.paginationEllipsis}>
                    …
                  </span>
                ) : (
                  <button
                    key={item}
                    type="button"
                    className={cx(
                      classes.paginationBtn,
                      item === page && classes.paginationBtnActive,
                    )}
                    onClick={() => onPageChange(item)}
                    aria-current={item === page ? "page" : undefined}
                    aria-label={`Page ${item}`}
                  >
                    {item}
                  </button>
                ),
              )}

              <button
                type="button"
                className={classes.paginationBtn}
                onClick={() => onPageChange(page + 1)}
                disabled={!canNext}
                aria-label="Next page"
              >
                ›
              </button>
            </div>
          </div>
        </td>
      </tr>
    </tfoot>
  );
}
