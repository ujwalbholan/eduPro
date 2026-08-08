/**
 * Single source of truth for class names so components never hardcode
 * strings. Swap this file to re-skin the whole table (e.g. Tailwind,
 * CSS modules, a design-system prefix) without touching component logic.
 */
export const classes = {
  wrap: "dt-wrap",
  wrapSticky: "dt-wrap--sticky",

  table: "dt-table",
  dense: "dt-table--dense",

  header: "dt-header",
  headerRow: "dt-header-row",
  headerCell: "dt-header-cell",
  headerCellSortable: "dt-header-cell--sortable",
  headerCellSorted: "dt-header-cell--sorted",
  sortIcon: "dt-sort-icon",

  body: "dt-body",
  row: "dt-row",
  rowClickable: "dt-row--clickable",
  cell: "dt-cell",
  cellAlignLeft: "dt-cell--left",
  cellAlignCenter: "dt-cell--center",
  cellAlignRight: "dt-cell--right",
  cellSorted: "dt-cell--sorted",

  loading: "dt-loading",
  loadingRow: "dt-loading-row",
  skeleton: "dt-skeleton",

  empty: "dt-empty",
  emptyIcon: "dt-empty-icon",
  emptyText: "dt-empty-text",

  virtualBody: "dt-virtual-body",
  virtualSpacer: "dt-virtual-spacer",

  footer: "dt-footer",
  pagination: "dt-pagination",
  paginationSummary: "dt-pagination-summary",
  paginationControls: "dt-pagination-controls",
  paginationBtn: "dt-pagination-btn",
  paginationBtnActive: "dt-pagination-btn--active",
  paginationEllipsis: "dt-pagination-ellipsis",
  paginationPageSize: "dt-pagination-page-size",
} as const;
