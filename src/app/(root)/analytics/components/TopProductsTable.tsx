// AdvancedProductsTableWithLoading.tsx
"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  FilterFn,
  ColumnFiltersState,
  SortingState,
  getSortedRowModel,
  PaginationState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  Search,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface User {
  id: string;
  name: string;
  image: string;
  email: string;
}

interface Product {
  id: string;
  product: string;
  users: User[];
  category: string;
  impressions: number;
  country: string;
  countryCode: string;
  cr: number;
  value: number;
  productImage: string;
  status: "active" | "inactive" | "pending";
  createdAt: string;
}

const globalFilterFn: FilterFn<Product> = (row, _, filterValue) => {
  const search = filterValue.toLowerCase();

  const productFields = [
    row.original.product,
    row.original.category,
    row.original.status,
    row.original.country,
  ];

  const numericFields = [
    row.original.impressions.toString(),
    row.original.cr.toFixed(1) + "%",
    "$" + row.original.value.toFixed(2),
    new Date(row.original.createdAt).toLocaleDateString(),
  ];

  const userFields = row.original.users.flatMap((user) => [
    user.name,
    user.email,
  ]);

  const allFields = [...productFields, ...numericFields, ...userFields];

  return allFields.some(
    (field) => typeof field === "string" && field.toLowerCase().includes(search)
  );
};

const generateMockData = (count: number): Promise<Product[]> => {
  return new Promise((resolve) => {
    // محاكاة تأخير الشبكة
    setTimeout(() => {
      const categories = [
        "Subscription",
        "Course",
        "E-book",
        "Software",
        "Template",
      ];
      const countries = [
        "🇺🇸 US",
        "🇬🇧 UK",
        "🇩🇪 DE",
        "🇫🇷 FR",
        "🇮🇹 IT",
        "🇪🇸 ES",
        "🇨🇦 CA",
        "🇦🇺 AU",
      ];
      const countryCodes = ["US", "GB", "DE", "FR", "IT", "ES", "CA", "AU"];
      const statuses: ("active" | "inactive" | "pending")[] = [
        "active",
        "inactive",
        "pending",
      ];

      const firstNames = [
        "Alex",
        "Sarah",
        "John",
        "Emma",
        "Michael",
        "Sophia",
        "David",
        "Olivia",
        "James",
        "Emily",
      ];
      const lastNames = [
        "Smith",
        "Johnson",
        "Williams",
        "Brown",
        "Jones",
        "Miller",
        "Davis",
        "Garcia",
        "Rodriguez",
        "Wilson",
      ];

      const products = [
        "Form Builder CP",
        "Machine Learning A-Z",
        "2024 Web Bootcamp",
        "Digital Marketing Course",
        "Form Builder PRO",
        "React Masterclass",
        "Node.js Advanced",
        "Python for Data Science",
        "UI/UX Design Principles",
        "Cloud Computing Fundamentals",
        "DevOps Handbook",
        "Cybersecurity Basics",
      ];

      const result = Array.from({ length: count }, (_, i) => {
        const userCount = Math.floor(Math.random() * 3) + 1;
        const users: User[] = Array.from({ length: userCount }, (_, j) => {
          const firstName =
            firstNames[Math.floor(Math.random() * firstNames.length)];
          const lastName =
            lastNames[Math.floor(Math.random() * lastNames.length)];
          return {
            id: `user-${i}-${j}`,
            name: `${firstName} ${lastName}`,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
            image: `https://i.pravatar.cc/150?img=${
              Math.floor(Math.random() * 70) + 1
            }`,
          };
        });

        const countryIndex = Math.floor(Math.random() * countries.length);
        const impressions = Math.floor(Math.random() * 50000) + 5000;
        const cr = Math.random() * 30 + 5;
        const value = Math.random() * 15000 + 1000;

        return {
          id: `prod-${i + 1}`,
          product: products[Math.floor(Math.random() * products.length)],
          users,
          category: categories[Math.floor(Math.random() * categories.length)],
          impressions,
          country: countries[countryIndex],
          countryCode: countryCodes[countryIndex],
          cr,
          value,
          productImage: `https://source.unsplash.com/random/200x200/?product,${i}`,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          createdAt: new Date(
            Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
          ).toISOString(),
        };
      });

      resolve(result);
    }, 1500); // تأخير 1.5 ثانية لمحاكاة جلب البيانات
  });
};

const TableSkeleton = ({
  rows = 5,
  columns = 8,
}: {
  rows?: number;
  columns?: number;
}) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex items-center space-x-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              className={`h-10 ${
                colIndex === 0 ? "w-48" : colIndex === 1 ? "w-32" : "w-24"
              }`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default function AdvancedProductsTableWithLoading() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await generateMockData(100);
        setData(result);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "product",
      header: "Product",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={row.original.productImage}
              alt={row.original.product}
            />
            <AvatarFallback>{row.original.product.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <span className="font-medium block">{row.original.product}</span>
            <span className="text-xs text-muted-foreground">
              {row.original.id}
            </span>
          </div>
        </div>
      ),
      enableSorting: true,
      enableGlobalFilter: true,
    },
    {
      accessorKey: "users",
      header: "Team",
      cell: ({ row }) => (
        <div className="flex items-center">
          <div className="flex -space-x-2">
            {row.original.users.map((user) => (
              <Avatar key={user.id} className="h-8 w-8 border-2 border-white">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <span className="ml-2 text-sm text-muted-foreground">
            {row.original.users.length} member
            {row.original.users.length !== 1 ? "s" : ""}
          </span>
        </div>
      ),
      enableGlobalFilter: true,
    },
    {
      accessorKey: "category",
      header: "Category",
      enableSorting: true,
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs">
          {row.original.category}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: true,
      enableGlobalFilter: true,
      cell: ({ row }) => {
        const status = row.original.status;
        const statusColors = {
          active: "bg-green-100 text-green-800",
          inactive: "bg-red-100 text-red-800",
          pending: "bg-yellow-100 text-yellow-800",
        };
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs ${statusColors[status]}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      },
    },
    {
      accessorKey: "impressions",
      header: "Impressions",
      cell: ({ row }) => (
        <div className="text-right">
          {row.original.impressions.toLocaleString()}
        </div>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "country",
      header: "Country",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="text-xl">{row.original.country.split(" ")[0]}</span>
          <span>{row.original.country.split(" ")[1]}</span>
        </div>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "cr",
      header: "Conversion Rate",
      cell: ({ row }) => (
        <div className="text-right font-medium">
          {row.original.cr.toFixed(1)}%
        </div>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "value",
      header: "Value",
      cell: ({ row }) => (
        <div className="text-right font-medium text-green-500">
          ${row.original.value.toFixed(2)}
        </div>
      ),
      enableSorting: true,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnFilters,
      sorting,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn,
    autoResetPageIndex: false,
  });

  if (error) {
    return (
      <Card className="border-none shadow-sm">
        <CardContent className="h-64 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 font-medium">{error}</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Advanced Products Dashboard</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Manage and analyze your products performance
            </p>
          </div>
          {!isLoading && (
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="pl-9 max-w-xs"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanFilter())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="rounded-md border p-6">
            <TableSkeleton rows={5} columns={8} />
          </div>
        ) : (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        {globalFilter || columnFilters.length
                          ? "No products found matching your criteria."
                          : "No products available."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">Rows per page</p>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value));
                  }}
                >
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue
                      placeholder={table.getState().pagination.pageSize}
                    />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-sm text-muted-foreground">
                  Page{" "}
                  <strong>
                    {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                  </strong>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                Showing{" "}
                <strong>
                  {table.getRowModel().rows.length} of {data.length}
                </strong>{" "}
                products
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
// // AdvancedProductsTable.tsx
// "use client";
// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
//   getPaginationRowModel,
//   getFilteredRowModel,
//   FilterFn,
//   ColumnFiltersState,
//   SortingState,
//   getSortedRowModel,
//   PaginationState,
// } from "@tanstack/react-table";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { useState } from "react";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   ChevronLeft,
//   ChevronRight,
//   ChevronsLeft,
//   ChevronsRight,
//   Filter,
//   Search,
// } from "lucide-react";

// interface User {
//   id: string;
//   name: string;
//   image: string;
//   email: string;
// }

// interface Product {
//   id: string;
//   product: string;
//   users: User[];
//   category: string;
//   impressions: number;
//   country: string;
//   countryCode: string;
//   cr: number;
//   value: number;
//   productImage: string;
//   status: "active" | "inactive" | "pending";
//   createdAt: string;
// }

// const globalFilterFn: FilterFn<Product> = (row, _, filterValue) => {
//   const search = filterValue.toLowerCase();

//   // البحث في حقول المنتج الأساسية
//   const productFields = [
//     row.original.product,
//     row.original.category,
//     row.original.status,
//     row.original.country,
//   ];

//   // تنسيق الأرقام للبحث
//   const numericFields = [
//     row.original.impressions.toString(),
//     row.original.cr.toFixed(1) + "%",
//     "$" + row.original.value.toFixed(2),
//     new Date(row.original.createdAt).toLocaleDateString(),
//   ];

//   // البحث في بيانات المستخدمين
//   const userFields = row.original.users.flatMap((user) => [
//     user.name,
//     user.email,
//   ]);

//   // دمج جميع الحقول للبحث
//   const allFields = [...productFields, ...numericFields, ...userFields];

//   // التحقق مما إذا كان أي حقل يحتوي على نص البحث
//   return allFields.some(
//     (field) => typeof field === "string" && field.toLowerCase().includes(search)
//   );
// };

// // دالة لإنشاء بيانات عشوائية
// const generateMockData = (count: number): Product[] => {
//   const categories = [
//     "Subscription",
//     "Course",
//     "E-book",
//     "Software",
//     "Template",
//   ];
//   const countries = [
//     "🇺🇸 US",
//     "🇬🇧 UK",
//     "🇩🇪 DE",
//     "🇫🇷 FR",
//     "🇮🇹 IT",
//     "🇪🇸 ES",
//     "🇨🇦 CA",
//     "🇦🇺 AU",
//   ];
//   const countryCodes = ["US", "GB", "DE", "FR", "IT", "ES", "CA", "AU"];
//   const statuses: ("active" | "inactive" | "pending")[] = [
//     "active",
//     "inactive",
//     "pending",
//   ];

//   const firstNames = [
//     "Alex",
//     "Sarah",
//     "John",
//     "Emma",
//     "Michael",
//     "Sophia",
//     "David",
//     "Olivia",
//     "James",
//     "Emily",
//   ];
//   const lastNames = [
//     "Smith",
//     "Johnson",
//     "Williams",
//     "Brown",
//     "Jones",
//     "Miller",
//     "Davis",
//     "Garcia",
//     "Rodriguez",
//     "Wilson",
//   ];

//   const products = [
//     "Form Builder CP",
//     "Machine Learning A-Z",
//     "2024 Web Bootcamp",
//     "Digital Marketing Course",
//     "Form Builder PRO",
//     "React Masterclass",
//     "Node.js Advanced",
//     "Python for Data Science",
//     "UI/UX Design Principles",
//     "Cloud Computing Fundamentals",
//     "DevOps Handbook",
//     "Cybersecurity Basics",
//   ];

//   return Array.from({ length: count }, (_, i) => {
//     const userCount = Math.floor(Math.random() * 3) + 1;
//     const users: User[] = Array.from({ length: userCount }, (_, j) => {
//       const firstName =
//         firstNames[Math.floor(Math.random() * firstNames.length)];
//       const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
//       return {
//         id: `user-${i}-${j}`,
//         name: `${firstName} ${lastName}`,
//         email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
//         image: `https://i.pravatar.cc/150?img=${
//           Math.floor(Math.random() * 70) + 1
//         }`,
//       };
//     });

//     const countryIndex = Math.floor(Math.random() * countries.length);
//     const impressions = Math.floor(Math.random() * 50000) + 5000;
//     const cr = Math.random() * 30 + 5;
//     const value = Math.random() * 15000 + 1000;

//     return {
//       id: `prod-${i + 1}`,
//       product: products[Math.floor(Math.random() * products.length)],
//       users,
//       category: categories[Math.floor(Math.random() * categories.length)],
//       impressions,
//       country: countries[countryIndex],
//       countryCode: countryCodes[countryIndex],
//       cr,
//       value,
//       productImage: `https://source.unsplash.com/random/200x200/?product,${i}`,
//       status: statuses[Math.floor(Math.random() * statuses.length)],
//       createdAt: new Date(
//         Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
//       ).toISOString(),
//     };
//   });
// };

// export default function AdvancedProductsTable() {
//   const [globalFilter, setGlobalFilter] = useState("");
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [pagination, setPagination] = useState<PaginationState>({
//     pageIndex: 0,
//     pageSize: 10,
//   });

//   // توليد 100 عنصر من البيانات العشوائية
//   const data = generateMockData(100);

//   const columns: ColumnDef<Product>[] = [
//     {
//       accessorKey: "product",
//       header: "Product",
//       cell: ({ row }) => (
//         <div className="flex items-center gap-3">
//           <Avatar className="h-10 w-10">
//             <AvatarImage
//               src={row.original.productImage}
//               alt={row.original.product}
//             />
//             <AvatarFallback>{row.original.product.charAt(0)}</AvatarFallback>
//           </Avatar>
//           <div>
//             <span className="font-medium block">{row.original.product}</span>
//             <span className="text-xs text-muted-foreground">
//               {row.original.id}
//             </span>
//           </div>
//         </div>
//       ),
//       enableSorting: true,
//       enableGlobalFilter: true,
//     },
//     {
//       accessorKey: "users",
//       header: "Team",
//       cell: ({ row }) => (
//         <div className="flex items-center">
//           <div className="flex -space-x-2">
//             {row.original.users.map((user) => (
//               <Avatar key={user.id} className="h-8 w-8 border-2 border-white">
//                 <AvatarImage src={user.image} alt={user.name} />
//                 <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
//               </Avatar>
//             ))}
//           </div>
//           <span className="ml-2 text-sm text-muted-foreground">
//             {row.original.users.length} member
//             {row.original.users.length !== 1 ? "s" : ""}
//           </span>
//         </div>
//       ),
//       enableGlobalFilter: true,
//     },
//     {
//       accessorKey: "category",
//       header: "Category",
//       enableSorting: true,
//       enableGlobalFilter: true,
//       cell: ({ row }) => (
//         <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs">
//           {row.original.category}
//         </span>
//       ),
//     },
//     {
//       accessorKey: "status",
//       header: "Status",
//       enableSorting: true,
//       enableGlobalFilter: true,
//       cell: ({ row }) => {
//         const status = row.original.status;
//         const statusColors = {
//           active: "bg-green-100 text-green-800",
//           inactive: "bg-red-100 text-red-800",
//           pending: "bg-yellow-100 text-yellow-800",
//         };
//         return (
//           <span
//             className={`px-2 py-1 rounded-full text-xs ${statusColors[status]}`}
//           >
//             {status.charAt(0).toUpperCase() + status.slice(1)}
//           </span>
//         );
//       },
//     },
//     {
//       accessorKey: "impressions",
//       header: "Impressions",
//       cell: ({ row }) => (
//         <div className="text-right">
//           {row.original.impressions.toLocaleString()}
//         </div>
//       ),
//       enableSorting: true,
//     },
//     {
//       accessorKey: "country",
//       header: "Country",
//       cell: ({ row }) => (
//         <div className="flex items-center gap-2">
//           <span className="text-xl">{row.original.country.split(" ")[0]}</span>
//           <span>{row.original.country.split(" ")[1]}</span>
//         </div>
//       ),
//       enableSorting: true,
//     },
//     {
//       accessorKey: "cr",
//       header: "Conversion Rate",
//       cell: ({ row }) => (
//         <div className="text-right font-medium">
//           {row.original.cr.toFixed(1)}%
//         </div>
//       ),
//       enableSorting: true,
//     },
//     {
//       accessorKey: "value",
//       header: "Value",
//       cell: ({ row }) => (
//         <div className="text-right font-medium text-green-500">
//           ${row.original.value.toFixed(2)}
//         </div>
//       ),
//       enableSorting: true,
//     },
//   ];

//   const table = useReactTable({
//     data,
//     columns,
//     state: {
//       globalFilter,
//       columnFilters,
//       sorting,
//       pagination,
//     },
//     onGlobalFilterChange: setGlobalFilter,
//     onColumnFiltersChange: setColumnFilters,
//     onSortingChange: setSorting,
//     onPaginationChange: setPagination,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     globalFilterFn,
//     autoResetPageIndex: false,
//   });

//   return (
//     <Card className="border-none shadow-sm">
//       <CardHeader>
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <CardTitle>Advanced Products Dashboard</CardTitle>
//             <p className="text-sm text-muted-foreground mt-1">
//               Manage and analyze your products performance
//             </p>
//           </div>
//           <div className="flex flex-col sm:flex-row gap-3">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search products..."
//                 value={globalFilter}
//                 onChange={(e) => setGlobalFilter(e.target.value)}
//                 className="pl-9 max-w-xs"
//               />
//             </div>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="gap-2">
//                   <Filter className="h-4 w-4" />
//                   Filters
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-48">
//                 {table
//                   .getAllColumns()
//                   .filter((column) => column.getCanFilter())
//                   .map((column) => {
//                     return (
//                       <DropdownMenuCheckboxItem
//                         key={column.id}
//                         className="capitalize"
//                         checked={column.getIsVisible()}
//                         onCheckedChange={(value) =>
//                           column.toggleVisibility(!!value)
//                         }
//                       >
//                         {column.id}
//                       </DropdownMenuCheckboxItem>
//                     );
//                   })}
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="rounded-md border">
//           <Table>
//             <TableHeader>
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <TableRow key={headerGroup.id}>
//                   {headerGroup.headers.map((header) => (
//                     <TableHead key={header.id}>
//                       {flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                     </TableHead>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableHeader>
//             <TableBody>
//               {table.getRowModel().rows?.length ? (
//                 table.getRowModel().rows.map((row) => (
//                   <TableRow key={row.id}>
//                     {row.getVisibleCells().map((cell) => (
//                       <TableCell key={cell.id}>
//                         {flexRender(
//                           cell.column.columnDef.cell,
//                           cell.getContext()
//                         )}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell
//                     colSpan={columns.length}
//                     className="h-24 text-center"
//                   >
//                     {globalFilter || columnFilters.length
//                       ? "No products found matching your criteria."
//                       : "No products available."}
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>

//         {/* Advanced Pagination Controls */}
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
//           <div className="flex items-center gap-2">
//             <p className="text-sm text-muted-foreground">Rows per page</p>
//             <Select
//               value={`${table.getState().pagination.pageSize}`}
//               onValueChange={(value) => {
//                 table.setPageSize(Number(value));
//               }}
//             >
//               <SelectTrigger className="h-8 w-[70px]">
//                 <SelectValue
//                   placeholder={table.getState().pagination.pageSize}
//                 />
//               </SelectTrigger>
//               <SelectContent side="top">
//                 {[5, 10, 20, 30, 40, 50].map((pageSize) => (
//                   <SelectItem key={pageSize} value={`${pageSize}`}>
//                     {pageSize}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="flex items-center gap-2">
//             <div className="text-sm text-muted-foreground">
//               Page{" "}
//               <strong>
//                 {table.getState().pagination.pageIndex + 1} of{" "}
//                 {table.getPageCount()}
//               </strong>
//             </div>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => table.setPageIndex(0)}
//               disabled={!table.getCanPreviousPage()}
//             >
//               <ChevronsLeft className="h-4 w-4" />
//             </Button>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => table.previousPage()}
//               disabled={!table.getCanPreviousPage()}
//             >
//               <ChevronLeft className="h-4 w-4" />
//             </Button>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => table.nextPage()}
//               disabled={!table.getCanNextPage()}
//             >
//               <ChevronRight className="h-4 w-4" />
//             </Button>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => table.setPageIndex(table.getPageCount() - 1)}
//               disabled={!table.getCanNextPage()}
//             >
//               <ChevronsRight className="h-4 w-4" />
//             </Button>
//           </div>

//           <div className="text-sm text-muted-foreground">
//             Showing{" "}
//             <strong>
//               {table.getRowModel().rows.length} of {data.length}
//             </strong>{" "}
//             products
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
