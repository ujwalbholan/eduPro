"use client";
import React, { useState } from "react";
import "./shared/Table/css/table.css";
import DataTable, { ColumnDef, SortState } from "./shared/Table";

interface Student {
  id: string;
  name: string;
  grade: string;
  gpa: number;
}

const columns: ColumnDef<Student>[] = [
  { id: "name", header: "Name", accessor: (r) => r.name, width: 220 },
  {
    id: "grade",
    header: "Grade",
    accessor: (r) => r.grade,
    width: 100,
    align: "center",
  },
  {
    id: "gpa",
    header: "GPA",
    accessor: (r) => r.gpa.toFixed(2),
    width: 100,
    align: "right",
  },
];

/** Plain usage: default theme, default states. */
export function StudentsTable({
  students,
  loading,
}: Readonly<{
  students: Student[];
  loading?: boolean;
}>) {
  const [sort, setSort] = useState<SortState | null>(null);

  return (
    <DataTable
      columns={columns}
      data={students}
      loading={loading}
      sort={sort}
      onSortChange={setSort}
      stickyHeader
      dense
      onRowClick={(row) => console.log("open student", row.id)}
      emptyMessage="No students match your filters."
    />
  );
} 

