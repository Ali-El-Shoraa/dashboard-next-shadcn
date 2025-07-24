"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreVertical,
  Search,
  Pencil,
  Trash2,
  User,
  ArrowUpDown,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

type Employee = {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  joiningDate: string;
  role: string;
  department: string;
  status: "active" | "on_leave" | "terminated";
  avatar: string;
};

export default function EmployeeList() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Employee;
    direction: "asc" | "desc";
  } | null>(null);

  // Sample employee data
  const employees: Employee[] = useMemo(
    () => [
      {
        id: "1",
        name: "Arlene McCoy",
        email: "arlene.mccoy@example.com",
        employeeId: "#45812",
        joiningDate: "02 Mar, 2024",
        role: "Web Designer",
        department: "Design",
        status: "active",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      {
        id: "2",
        name: "Esther Howard",
        email: "esther.howard@example.com",
        employeeId: "#200148",
        joiningDate: "22 Jan, 2024",
        role: "Graphic Designer",
        department: "Design",
        status: "active",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      },
      {
        id: "3",
        name: "Guy Hawkins",
        email: "guy.hawkins@example.com",
        employeeId: "#874264",
        joiningDate: "17 Oct, 2023",
        role: "App Developer",
        department: "Engineering",
        status: "active",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        id: "4",
        name: "Jacob Jones",
        email: "jacob.jones@example.com",
        employeeId: "#985367",
        joiningDate: "20 Apr, 2024",
        role: "App Developer",
        department: "Engineering",
        status: "on_leave",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      },
      {
        id: "5",
        name: "Jane Cooper",
        email: "jane.cooper@example.com",
        employeeId: "#753159",
        joiningDate: "15 Feb, 2024",
        role: "Product Manager",
        department: "Product",
        status: "active",
        avatar: "https://randomuser.me/api/portraits/women/75.jpg",
      },
      {
        id: "6",
        name: "Robert Fox",
        email: "robert.fox@example.com",
        employeeId: "#642813",
        joiningDate: "08 May, 2024",
        role: "UX Designer",
        department: "Design",
        status: "active",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      },
      {
        id: "7",
        name: "Darlene Robertson",
        email: "darlene.robertson@example.com",
        employeeId: "#357924",
        joiningDate: "30 Nov, 2023",
        role: "HR Manager",
        department: "HR",
        status: "active",
        avatar: "https://randomuser.me/api/portraits/women/63.jpg",
      },
      {
        id: "8",
        name: "Ronald Richards",
        email: "ronald.richards@example.com",
        employeeId: "#864201",
        joiningDate: "12 Sep, 2023",
        role: "Backend Developer",
        department: "Engineering",
        status: "terminated",
        avatar: "https://randomuser.me/api/portraits/men/86.jpg",
      },
    ],
    []
  );

  // Sort employees
  const sortedEmployees = useMemo(() => {
    const sortableEmployees = [...employees];
    if (sortConfig !== null) {
      sortableEmployees.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableEmployees;
  }, [employees, sortConfig]);

  // Filter employees by search term
  const filteredEmployees = useMemo(() => {
    return sortedEmployees.filter((employee) =>
      Object.values(employee).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedEmployees, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);
  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredEmployees.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredEmployees, currentPage, rowsPerPage]);

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const leftBound = Math.max(1, currentPage - 2);
      const rightBound = Math.min(totalPages, currentPage + 2);

      if (leftBound > 1) {
        pageNumbers.push(1);
        if (leftBound > 2) {
          pageNumbers.push("...");
        }
      }

      for (let i = leftBound; i <= rightBound; i++) {
        pageNumbers.push(i);
      }

      if (rightBound < totalPages) {
        if (rightBound < totalPages - 1) {
          pageNumbers.push("...");
        }
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  // Handle sort request
  const requestSort = (key: keyof Employee) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Status badge variant
  const getStatusVariant = (status: Employee["status"]) => {
    switch (status) {
      case "active":
        return "default";
      case "on_leave":
        return "secondary";
      case "terminated":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Card className="shadow-lg gap-0">
      <CardHeader className="border-b">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-xl">Employee List</CardTitle>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setRowsPerPage(5)}>
                  5 per page
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRowsPerPage(10)}>
                  10 per page
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRowsPerPage(20)}>
                  20 per page
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRowsPerPage(50)}>
                  50 per page
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <Checkbox className="translate-y-[2px]" />
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => requestSort("name")}
                >
                  <div className="flex items-center gap-1">
                    Name
                    <ArrowUpDown className="h-4 w-4 opacity-50" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => requestSort("employeeId")}
                >
                  <div className="flex items-center gap-1">
                    Employee ID
                    <ArrowUpDown className="h-4 w-4 opacity-50" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => requestSort("email")}
                >
                  <div className="flex items-center gap-1">
                    Email
                    <ArrowUpDown className="h-4 w-4 opacity-50" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => requestSort("joiningDate")}
                >
                  <div className="flex items-center gap-1">
                    Joining Date
                    <ArrowUpDown className="h-4 w-4 opacity-50" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => requestSort("role")}
                >
                  <div className="flex items-center gap-1">
                    Role
                    <ArrowUpDown className="h-4 w-4 opacity-50" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => requestSort("status")}
                >
                  <div className="flex items-center gap-1">
                    Status
                    <ArrowUpDown className="h-4 w-4 opacity-50" />
                  </div>
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedEmployees.length > 0 ? (
                paginatedEmployees.map((employee) => (
                  <TableRow key={employee.id} className="hover:bg-muted/50">
                    <TableCell>
                      <Checkbox className="translate-y-[2px]" />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={employee.avatar} />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{employee.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{employee.employeeId}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {employee.email}
                    </TableCell>
                    <TableCell>{employee.joiningDate}</TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(employee.status)}>
                        {employee.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            router.push(`/employees/edit/${employee.id}`)
                          }
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No employees found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4 px-6 py-4 border-t">
          <div className="text-sm text-muted-foreground">
            Showing{" "}
            <strong>
              {(currentPage - 1) * rowsPerPage + 1}-
              {Math.min(currentPage * rowsPerPage, filteredEmployees.length)}
            </strong>{" "}
            of <strong>{filteredEmployees.length}</strong> employees
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-sm">
              Rows per page:
              <Select
                value={`${rowsPerPage}`}
                onValueChange={(value) => {
                  setRowsPerPage(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={rowsPerPage} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[5, 10, 20, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Numbered page buttons */}
            <div className="flex gap-1">
              {getPageNumbers().map((page, index) => (
                <Button
                  key={index}
                  variant={page === currentPage ? "default" : "ghost"}
                  size="sm"
                  className={`w-8 h-8 p-0 ${
                    page === "..." ? "pointer-events-none" : ""
                  }`}
                  onClick={() =>
                    typeof page === "number" && setCurrentPage(page)
                  }
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
