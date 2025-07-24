"use client";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useState, useEffect } from "react";

type Employee = {
  id: number;
  name: string;
  designation: string;
  checkIn: string;
  status: "late" | "onTime";
};

export default function AttendanceOverview() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [timeRange, setTimeRange] = useState<string>("This Month");

  const allAttendanceData: Employee[] = [
    {
      id: 1,
      name: "Amelia Lee",
      designation: "Next.js Developer",
      checkIn: "11:48 AM",
      status: "late",
    },
    {
      id: 2,
      name: "Ava Garcia",
      designation: "JavaScript Developer",
      checkIn: "10:04 AM",
      status: "onTime",
    },
    {
      id: 3,
      name: "Cole Brown",
      designation: "AI Developer",
      checkIn: "09:45 AM",
      status: "onTime",
    },
    {
      id: 4,
      name: "Daniel Moore",
      designation: "Python Developer",
      checkIn: "09:30 AM",
      status: "onTime",
    },
    {
      id: 5,
      name: "Emma Wilson",
      designation: "Frontend Developer",
      checkIn: "09:15 AM",
      status: "onTime",
    },
    {
      id: 6,
      name: "Frank Johnson",
      designation: "Backend Developer",
      checkIn: "10:30 AM",
      status: "late",
    },
    {
      id: 7,
      name: "Grace Smith",
      designation: "Full Stack Developer",
      checkIn: "09:00 AM",
      status: "onTime",
    },
    {
      id: 8,
      name: "Henry Davis",
      designation: "DevOps Engineer",
      checkIn: "09:20 AM",
      status: "onTime",
    },
    {
      id: 9,
      name: "Isabella Martinez",
      designation: "UI/UX Designer",
      checkIn: "10:15 AM",
      status: "late",
    },
    {
      id: 10,
      name: "Jack Wilson",
      designation: "Mobile Developer",
      checkIn: "09:10 AM",
      status: "onTime",
    },
  ];

  // Filter data based on search term and time range
  const filteredData = allAttendanceData.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchTerm.toLowerCase());

    // In a real app, you would filter by actual dates based on timeRange
    return matchesSearch;
  });

  // Pagination logic
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, timeRange]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Attendance Overview
          </h3>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="whitespace-nowrap">
                {timeRange}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Time Range</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {[
                "This Month",
                "Previous Month",
                "Last 3 Months",
                "Last 6 Months",
              ].map((range) => (
                <DropdownMenuItem
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={timeRange === range ? "bg-accent" : ""}
                >
                  {range}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search employees..."
              className="pl-9 w-[200px] sm:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="p-6 pt-0">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Employee</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Check In Time</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.length > 0 ? (
                currentItems.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">
                      <a href="#" className="hover:underline">
                        {employee.name}
                      </a>
                    </TableCell>
                    <TableCell>{employee.designation}</TableCell>
                    <TableCell>{employee.checkIn}</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          employee.status === "late" ? "destructive" : "default"
                        }
                        className="justify-end"
                      >
                        {employee.status === "late" ? "Late" : "On Time"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Showing</span>
            <span className="font-medium">{startIndex + 1}</span>
            <span>-</span>
            <span className="font-medium">
              {Math.min(endIndex, totalItems)}
            </span>
            <span>of</span>
            <span className="font-medium">{totalItems}</span>
            <span>employees</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Show pages around current page
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <span className="px-2">...</span>
                )}
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </Button>
                )}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-2">
                  {itemsPerPage} per page
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Items per page</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {[5, 10, 20, 50].map((size) => (
                  <DropdownMenuItem
                    key={size}
                    onClick={() => {
                      setItemsPerPage(size);
                      setCurrentPage(1);
                    }}
                    className={itemsPerPage === size ? "bg-accent" : ""}
                  >
                    {size} per page
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
