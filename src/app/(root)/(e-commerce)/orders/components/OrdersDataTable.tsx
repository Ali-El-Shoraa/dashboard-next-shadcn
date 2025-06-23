"use client";

import { useState } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  ArrowUpDown,
  ChevronDown,
  Eye,
  MoreHorizontal,
  Printer,
  Edit,
  Trash2,
  Download,
  RefreshCw,
  Settings2,
  Search,
  Filter,
  Calendar,
  DollarSign,
  Package,
  User,
  CreditCard,
} from "lucide-react";

export type Order = {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  payment: "credit_card" | "paypal" | "bank_transfer" | "cash_on_delivery";
  items: number;
  shippingAddress?: string;
  trackingNumber?: string;
};

const sampleOrders: Order[] = [
  {
    id: "#123567",
    customer: {
      name: "Patricia Semklo",
      email: "patricia.semklo@app.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2024-01-15",
    status: "delivered",
    total: 289.66,
    payment: "credit_card",
    items: 3,
    shippingAddress: "123 Main St, London, UK",
    trackingNumber: "TRK123456789",
  },
  {
    id: "#779912",
    customer: {
      name: "Dominik Lamakani",
      email: "dominik.lamakani@gmail.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2024-01-14",
    status: "processing",
    total: 1476.04,
    payment: "paypal",
    items: 5,
    shippingAddress: "456 Oak Ave, Berlin, DE",
  },
  {
    id: "#445566",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2024-01-13",
    status: "shipped",
    total: 834.5,
    payment: "credit_card",
    items: 2,
    shippingAddress: "789 Pine St, New York, US",
    trackingNumber: "TRK987654321",
  },
  {
    id: "#334455",
    customer: {
      name: "Michael Chen",
      email: "m.chen@techcorp.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2024-01-12",
    status: "pending",
    total: 567.89,
    payment: "bank_transfer",
    items: 1,
    shippingAddress: "321 Elm St, Toronto, CA",
  },
  {
    id: "#998877",
    customer: {
      name: "Emma Wilson",
      email: "emma.wilson@startup.io",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2024-01-11",
    status: "cancelled",
    total: 1234.56,
    payment: "cash_on_delivery",
    items: 4,
    shippingAddress: "654 Maple Dr, Paris, FR",
  },
  {
    id: "#556677",
    customer: {
      name: "James Rodriguez",
      email: "james.r@design.studio",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2024-01-10",
    status: "delivered",
    total: 423.45,
    payment: "paypal",
    items: 2,
    shippingAddress: "987 Cedar Ln, Madrid, ES",
    trackingNumber: "TRK456789123",
  },
  {
    id: "#667788",
    customer: {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2024-01-09",
    status: "delivered",
    total: 789.12,
    payment: "credit_card",
    items: 4,
    shippingAddress: "123 Oak St, Chicago, US",
    trackingNumber: "TRK789123456",
  },
  {
    id: "#112233",
    customer: {
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2024-01-08",
    status: "shipped",
    total: 456.78,
    payment: "paypal",
    items: 2,
    shippingAddress: "456 Pine Ave, Miami, US",
    trackingNumber: "TRK321654987",
  },
];

const getStatusConfig = (status: string) => {
  const configs = {
    pending: {
      label: "Pending",
      className:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
    },
    processing: {
      label: "Processing",
      className:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
    },
    shipped: {
      label: "Shipped",
      className:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
    },
    delivered: {
      label: "Delivered",
      className:
        "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
    },
  };
  return configs[status as keyof typeof configs] || configs.pending;
};

const getPaymentConfig = (payment: string) => {
  const configs = {
    credit_card: { label: "Credit Card", icon: CreditCard },
    paypal: { label: "PayPal", icon: DollarSign },
    bank_transfer: { label: "Bank Transfer", icon: DollarSign },
    cash_on_delivery: { label: "Cash on Delivery", icon: Package },
  };
  return configs[payment as keyof typeof configs] || configs.credit_card;
};

export function OrdersDataTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  const [advancedFilter, setAdvancedFilter] = useState({
    dateRange: { from: "", to: "" },
    minTotal: "",
    maxTotal: "",
  });

  const applyAdvancedFilters = () => {
    // const filteredData = sampleOrders.filter((order) => {
    //   // تصفية حسب النطاق الزمني
    //   const orderDate = new Date(order.date);
    //   const fromDate = advancedFilter.dateRange.from
    //     ? new Date(advancedFilter.dateRange.from)
    //     : null;
    //   const toDate = advancedFilter.dateRange.to
    //     ? new Date(advancedFilter.dateRange.to)
    //     : null;
    //   const datePass =
    //     (!fromDate || orderDate >= fromDate) &&
    //     (!toDate || orderDate <= toDate);
    //   // تصفية حسب المبلغ الإجمالي
    //   const minTotal = advancedFilter.minTotal
    //     ? parseFloat(advancedFilter.minTotal)
    //     : null;
    //   const maxTotal = advancedFilter.maxTotal
    //     ? parseFloat(advancedFilter.maxTotal)
    //     : null;
    //   const totalPass =
    //     (!minTotal || order.total >= minTotal) &&
    //     (!maxTotal || order.total <= maxTotal);
    //   return datePass && totalPass;
    // });
  };

  const columns: ColumnDef<Order>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2 lg:px-3"
          >
            Order ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium text-blue-600 dark:text-blue-400">
          {row.getValue("id")}
        </div>
      ),
    },
    {
      accessorKey: "customer",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2 lg:px-3"
          >
            <User className="mr-2 h-4 w-4" />
            Customer
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const customer = row.getValue("customer") as Order["customer"];
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={customer.avatar || "/placeholder.svg"}
                alt={customer.name}
              />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                {customer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{customer.name}</div>
              <div className="text-sm text-muted-foreground">
                {customer.email}
              </div>
            </div>
          </div>
        );
      },
      sortingFn: (rowA, rowB) => {
        const a = (rowA.getValue("customer") as Order["customer"]).name;
        const b = (rowB.getValue("customer") as Order["customer"]).name;
        return a.localeCompare(b);
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2 lg:px-3"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue("date"));
        return (
          <div className="text-sm">
            {date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2 lg:px-3"
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const config = getStatusConfig(status);
        return (
          <Badge variant="secondary" className={config.className}>
            {config.label}
          </Badge>
        );
      },
    },
    {
      accessorKey: "items",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2 lg:px-3"
          >
            <Package className="mr-2 h-4 w-4" />
            Items
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div className="text-center">{row.getValue("items")}</div>;
      },
    },
    {
      accessorKey: "total",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2 lg:px-3"
          >
            <DollarSign className="mr-2 h-4 w-4" />
            Total
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("total"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "payment",
      header: "Payment",
      cell: ({ row }) => {
        const payment = row.getValue("payment") as string;
        const config = getPaymentConfig(payment);
        const PaymentIcon = config.icon;
        return (
          <div className="flex items-center gap-2">
            <PaymentIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{config.label}</span>
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const order = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 z-50">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(order.id)}
              >
                Copy order ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                View details
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit order
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Printer className="h-4 w-4" />
                Print invoice
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download receipt
              </DropdownMenuItem>
              {order.status !== "cancelled" && (
                <DropdownMenuItem className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Update status
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                <Trash2 className="h-4 w-4" />
                Cancel order
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: sampleOrders,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 5, // عدد الصفوف لكل صفحة
      },
    },
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;

  return (
    <div className="w-full space-y-4 bg-white dark:bg-gray-800 rounded-lg border shadow-sm p-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(String(event.target.value))}
              className="pl-8 max-w-sm"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {selectedRows.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedRows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected
              </span>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
            </div>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto">
                <Settings2 className="mr-2 h-4 w-4" />
                <span className="max-md:hidden">View</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                <span className="max-md:hidden">Advanced Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-4 z-50">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Date Range
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      type="date"
                      value={advancedFilter.dateRange.from}
                      onChange={(e) =>
                        setAdvancedFilter({
                          ...advancedFilter,
                          dateRange: {
                            ...advancedFilter.dateRange,
                            from: e.target.value,
                          },
                        })
                      }
                    />
                    <Input
                      type="date"
                      value={advancedFilter.dateRange.to}
                      onChange={(e) =>
                        setAdvancedFilter({
                          ...advancedFilter,
                          dateRange: {
                            ...advancedFilter.dateRange,
                            to: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Total Amount
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Min"
                      value={advancedFilter.minTotal}
                      onChange={(e) =>
                        setAdvancedFilter({
                          ...advancedFilter,
                          minTotal: e.target.value,
                        })
                      }
                    />
                    <Input
                      placeholder="Max"
                      value={advancedFilter.maxTotal}
                      onChange={(e) =>
                        setAdvancedFilter({
                          ...advancedFilter,
                          maxTotal: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <Button
                  onClick={() => applyAdvancedFilters()}
                  className="w-full"
                >
                  Apply Filters
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}

      <div className="rounded-md border bg-white dark:bg-gray-900 overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-muted/50"
                  >
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
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between max-md:flex-col space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing{" "}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}
          -
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length} rows
        </div>

        <div className="flex items-center space-x-6 lg:space-x-8 max-md:flex-col">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-8">
                  {table.getState().pagination.pageSize}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="z-50">
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <DropdownMenuItem
                    key={pageSize}
                    onClick={() => table.setPageSize(pageSize)}
                  >
                    {pageSize}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Previous page</span>
              {"<"}
            </Button>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Next page</span>
              {">"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
