import {
  // BrandedStudentsTable,
  // ServerPaginatedStudentsTable,
  // VirtualizedStudentsTable,
  StudentsTable,
} from "./StudentTable";

type Student = {
  id: string;
  name: string;
  grade: string;
  gpa: number;
};

export default function Home() {
  const students: Student[] = [
    {
      id: "1",
      name: "John Smith",
      grade: "A",
      gpa: 3.9,
    },
    {
      id: "2",
      name: "Emma Johnson",
      grade: "A",
      gpa: 3.8,
    },
    {
      id: "3",
      name: "Michael Brown",
      grade: "B+",
      gpa: 3.5,
    },
    {
      id: "4",
      name: "Sophia Williams",
      grade: "A-",
      gpa: 3.7,
    },
    {
      id: "5",
      name: "Daniel Davis",
      grade: "B",
      gpa: 3.2,
    },
    {
      id: "6",
      name: "Olivia Miller",
      grade: "A",
      gpa: 3.95,
    },
    {
      id: "7",
      name: "James Wilson",
      grade: "B+",
      gpa: 3.6,
    },
    {
      id: "8",
      name: "Ava Moore",
      grade: "A-",
      gpa: 3.75,
    },
    {
      id: "9",
      name: "William Taylor",
      grade: "B",
      gpa: 3.1,
    },
    {
      id: "10",
      name: "Isabella Anderson",
      grade: "A",
      gpa: 3.85,
    },
  ];
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <StudentsTable students={students}></StudentsTable>
      {/* <BrandedStudentsTable students={students}></BrandedStudentsTable>
      <VirtualizedStudentsTable students={students}></VirtualizedStudentsTable>
      <ServerPaginatedStudentsTable
        students={students}
      ></ServerPaginatedStudentsTable> */}
    </div>
  );
}
