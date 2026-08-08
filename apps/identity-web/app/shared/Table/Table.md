# DataTable

A generic, fully themeable React table component. Typed, sortable, virtualizable, and
built to be reskinned without forking — every color is a CSS variable, every class is
overridable, and both empty/loading states are swappable.

```
DataTable
├─ TableWrap                scroll boundary
├─ TableHeader                <thead> built from columns
│   └─ TableHeaderCell         per-column header + sort control
├─ TableBody                   state router: loading / empty / virtual / plain
│   ├─ TableRow → TableCell
│   ├─ TableLoading
│   ├─ TableEmpty
│   └─ TableVirtualBody         windowed rows via useVirtualRows
└─ TableFooter                 pagination, via usePagination
```

## Install

Copy the `data-table/` folder into your project (or publish it as a package — there
are no external runtime dependencies beyond `react`). Import the stylesheet once,
near your app root. Tokens are inlined in `table.css` itself (no relative
`@import`), so it's safe to move the file into any folder structure — you don't
need to keep a second file next to it:

```ts
import "./data-table/table.css";
```

## Basic usage

```tsx
import { DataTable } from "./data-table";
import type { ColumnDef } from "./data-table";

interface Student {
  id: string;
  name: string;
  gpa: number;
}

const columns: ColumnDef<Student>[] = [
  { id: "name", header: "Name", accessor: (r) => r.name },
  {
    id: "gpa",
    header: "GPA",
    accessor: (r) => r.gpa.toFixed(2),
    align: "right",
  },
];

<DataTable columns={columns} data={students} />;
```

## Theming

Every visual token is a CSS variable, defined at the top of `table.css`. Override any subset on
a parent element — no source changes required:

| Variable                                                | Default (light) | Controls                                |
| ------------------------------------------------------- | --------------- | --------------------------------------- |
| `--dt-bg`                                               | `#fcfcfb`       | Table background                        |
| `--dt-surface`                                          | `#f5f5f3`       | Header row / hover background           |
| `--dt-fg`                                               | `#16181d`       | Body text                               |
| `--dt-muted`                                            | `#767a82`       | Header labels, empty state text         |
| `--dt-border`                                           | `#e6e7e9`       | Hairlines                               |
| `--dt-accent`                                           | `#3452ff`       | Sort rail, focus ring                   |
| `--dt-accent-soft`                                      | `#eef1ff`       | Sort rail on unfocused body cells       |
| `--dt-radius`                                           | `10px`          | Corner radius                           |
| `--dt-font-label` / `--dt-font-body` / `--dt-font-data` | system stacks   | Header labels, body text, numeric cells |

```css
/* Retheme everything under this class */
.brand-table {
  --dt-accent: #7c3aed;
  --dt-radius: 4px;
}
```

```tsx
/* Dark mode: attribute-based, so it can be toggled at runtime */
<div data-dt-theme="dark">
  <DataTable columns={columns} data={students} />
</div>

/* One-off override without a stylesheet */
<DataTable
  columns={columns}
  data={students}
  style={{ ["--dt-accent" as string]: "#7C3AED" }}
/>
```

## Structural customization

For anything CSS variables can't reach, override specific slot classes without
touching the defaults for everything else:

```tsx
<DataTable
  columns={columns}
  data={students}
  classNames={{
    headerRow: "uppercase tracking-wide",
    row: "hover:bg-slate-50",
  }}
/>
```

Available slots: `wrap`, `table`, `headerRow`, `headerCell`, `row`, `cell`,
`loadingRow`, `emptyText`, `footer`, `pagination`.

Loading and empty states can be fully replaced:

```tsx
<DataTable
  columns={columns}
  data={students}
  renderEmpty={() => (
    <tr>
      <td colSpan={columns.length}>
        <EmptyStudentsIllustration />
      </td>
    </tr>
  )}
/>
```

## Pagination

Add a footer with page controls by passing `pagination`. Two modes, same prop:

**Client-side** (default) — hand in the full array, the table slices it:

```tsx
const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(10);

<DataTable
  columns={columns}
  data={allStudents}
  pagination={{
    state: { page, pageSize },
    onPageChange: setPage,
    onPageSizeChange: (size) => {
      setPageSize(size);
      setPage(1);
    },
    pageSizeOptions: [10, 25, 50],
  }}
/>;
```

**Server-side** (`manual: true`) — hand in just the current page, and supply `total`
yourself since the table can't infer it from a partial array:

```tsx
<DataTable
  columns={columns}
  data={currentPageStudents} // just this page's rows, from your API
  pagination={{
    state: { page, pageSize, total: totalFromApi },
    onPageChange: fetchPage,
    manual: true,
  }}
/>
```

Omit `pagination` entirely for an unpaginated table — no footer is rendered.

## Sorting

Controlled: you own the sort state, the table just tells you what changed.

```tsx
const [sort, setSort] = useState<SortState | null>(null);

<DataTable
  columns={columns}
  data={sortRows(students, sort)}
  sort={sort}
  onSortChange={setSort}
/>;
```

Clicking a sortable header cycles `asc → desc → cleared`. Mark a column
un-sortable with `disableSort: true`. The currently sorted column gets a thin
accent rail through the header and every cell in that column — it's the one
signature visual detail this component leans on, so you always know which axis
you're reading the table by.

## Virtualization

For large row counts (thousands+), turn on windowed rendering. Requires a fixed
`rowHeight` and a viewport `height`:

```tsx
<DataTable
  columns={columns}
  data={rows}
  virtualized
  rowHeight={40}
  height={480}
/>
```

Don't reach for this by default — for a few hundred rows or fewer, the plain
render is simpler and behaves like a normal `<table>` (native find-in-page,
screen reader row/col semantics, etc).

## Column API

```ts
interface ColumnDef<T> {
  id: string;
  header: ReactNode;
  accessor?: (row: T) => ReactNode; // simple field read
  render?: (row: T, rowIndex: number) => ReactNode; // full control, wins over accessor
  width?: number;
  align?: "left" | "center" | "right";
  disableSort?: boolean;
}
```

## Accessibility

- Renders a real `<table>`/`<thead>`/`<tbody>` in the non-virtualized path, so
  screen readers get native table semantics for free.
- Sort buttons are real `<button>` elements with `aria-sort` on the parent `<th>`,
  and carry a visible focus ring (`--dt-accent`).
- Reduced-motion is respected on the loading skeleton shimmer.
- The virtualized path trades some of this off (it's a scroll-windowed `<div>`,
  not a native table) — prefer the plain path unless you specifically need it.

## Files

| File                                              | Role                                        |
| ------------------------------------------------- | ------------------------------------------- |
| `DataTable.tsx`                                   | Public entry point, composes the tree       |
| `TableWrap.tsx`                                   | Scroll/overflow boundary                    |
| `TableHeader.tsx`, `TableHeaderCell.tsx`          | `<thead>` + sort UI                         |
| `TableBody.tsx`                                   | Routes to loading / empty / virtual / plain |
| `TableRow.tsx`, `TableCell.tsx`                   | Body rendering                              |
| `TableLoading.tsx`, `TableEmpty.tsx`              | Default terminal states                     |
| `TableFooter.tsx`, `hooks/usePagination.ts`       | Pagination controls + slicing               |
| `TableVirtualBody.tsx`, `hooks/useVirtualRows.ts` | Windowed rendering                          |
| `classes.ts`                                      | Default class-name map                      |
| `types.ts`                                        | Public types                                |
| `utils.ts`                                        | Small internal helpers                      |
| `table.css`                                       | Theme variables (top of file) + base styles |
