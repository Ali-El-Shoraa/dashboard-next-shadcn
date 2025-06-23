"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { CustomerCard } from "./CustomerCard";
import { CustomerFilters } from "./CustomerFilters";
import { CustomerStats } from "./CustomerStats";
import {
  Plus,
  Download,
  Upload,
  MoreHorizontal,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  location: string;
  orders: number;
  lastOrder: string;
  totalSpent: string;
  refunds: number | string;
  favorite: boolean;
  avatar: string;
  status: "active" | "inactive" | "pending";
  joinDate: string;
  tier: "bronze" | "silver" | "gold" | "platinum";
}

const sampleCustomers: Customer[] = [
  {
    id: 1,
    name: "Patricia Semklo",
    email: "patricia.semklo@app.com",
    phone: "+44 20 7946 0958",
    location: "🇬🇧 London, UK",
    orders: 24,
    lastOrder: "#123567",
    totalSpent: "$2,890.66",
    refunds: 0,
    favorite: true,
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    joinDate: "Jan 2023",
    tier: "gold",
  },
  {
    id: 2,
    name: "Dominik Lamakani",
    email: "dominik.lamakani@gmail.com",
    phone: "+49 231 123456",
    location: "🇩🇪 Dortmund, DE",
    orders: 77,
    lastOrder: "#779912",
    totalSpent: "$14,767.04",
    refunds: 4,
    favorite: false,
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    joinDate: "Mar 2022",
    tier: "platinum",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1 555 0123",
    location: "🇺🇸 New York, US",
    orders: 45,
    lastOrder: "#445566",
    totalSpent: "$8,234.50",
    refunds: 1,
    favorite: true,
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    joinDate: "Aug 2022",
    tier: "silver",
  },
  {
    id: 4,
    name: "Michael Chen",
    email: "m.chen@techcorp.com",
    location: "🇨🇦 Toronto, CA",
    orders: 12,
    lastOrder: "#334455",
    totalSpent: "$1,567.89",
    refunds: 0,
    favorite: false,
    avatar: "/placeholder.svg?height=40&width=40",
    status: "pending",
    joinDate: "Dec 2023",
    tier: "bronze",
  },
  {
    id: 5,
    name: "Emma Wilson",
    email: "emma.wilson@startup.io",
    phone: "+33 1 42 86 83 26",
    location: "🇫🇷 Paris, FR",
    orders: 89,
    lastOrder: "#998877",
    totalSpent: "$19,456.78",
    refunds: 2,
    favorite: true,
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    joinDate: "Feb 2021",
    tier: "platinum",
  },
  {
    id: 6,
    name: "James Rodriguez",
    email: "james.r@design.studio",
    location: "🇪🇸 Madrid, ES",
    orders: 33,
    lastOrder: "#556677",
    totalSpent: "$4,123.45",
    refunds: 1,
    favorite: false,
    avatar: "/placeholder.svg?height=40&width=40",
    status: "inactive",
    joinDate: "Jun 2023",
    tier: "silver",
  },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState(sampleCustomers);
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [filters, setFilters] = useState({
    search: "",
    status: [] as string[],
    tier: [] as string[],
    location: "",
    orderRange: [0, 100] as [number, number],
    spentRange: [0, 50000] as [number, number],
    dateRange: "all",
  });

  // Filter customers based on current filters
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        !filters.search ||
        customer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        customer.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        customer.location.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus =
        filters.status.length === 0 || filters.status.includes(customer.status);
      const matchesTier =
        filters.tier.length === 0 || filters.tier.includes(customer.tier);
      const matchesLocation =
        !filters.location || customer.location.includes(filters.location);
      const matchesOrders =
        customer.orders >= filters.orderRange[0] &&
        customer.orders <= filters.orderRange[1];

      const spentValue = Number.parseFloat(
        customer.totalSpent.replace(/[$,]/g, "")
      );
      const matchesSpent =
        spentValue >= filters.spentRange[0] &&
        spentValue <= filters.spentRange[1];

      return (
        matchesSearch &&
        matchesStatus &&
        matchesTier &&
        matchesLocation &&
        matchesOrders &&
        matchesSpent
      );
    });
  }, [customers, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSelectCustomer = (id: number) => {
    setSelectedCustomers((prev) =>
      prev.includes(id)
        ? prev.filter((customerId) => customerId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedCustomers.length === paginatedCustomers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(paginatedCustomers.map((c) => c.id));
    }
  };

  const handleToggleFavorite = (id: number) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === id
          ? { ...customer, favorite: !customer.favorite }
          : customer
      )
    );
  };

  return (
    <div className="space-y-8 content">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Customer Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and analyze your customer relationships
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Bulk Actions</DropdownMenuItem>
              <DropdownMenuItem>Send Newsletter</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Stats */}
      <CustomerStats
        totalCustomers={customers.length}
        newCustomers={45}
        totalRevenue={156789}
        averageOrderValue={234.56}
        topCustomers={12}
        growthRate={8.5}
      />

      {/* Filters */}
      <CustomerFilters
        filters={filters}
        onFiltersChange={setFilters}
        totalCustomers={customers.length}
        filteredCount={filteredCustomers.length}
      />

      {/* View Controls and Selection */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={
                selectedCustomers.length === paginatedCustomers.length &&
                paginatedCustomers.length > 0
              }
              onChange={handleSelectAll}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {selectedCustomers.length > 0
                ? `${selectedCustomers.length} selected`
                : `${filteredCustomers.length} customers`}
            </span>
          </div>
          {selectedCustomers.length > 0 && (
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                Delete Selected
              </Button>
              <Button size="sm" variant="outline">
                Export Selected
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Customer Grid/List */}
      <div
        className={`${
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            : "space-y-4"
        }`}
      >
        {paginatedCustomers.map((customer) => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            isSelected={selectedCustomers.includes(customer.id)}
            onSelect={handleSelectCustomer}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredCustomers.length)} of{" "}
            {filteredCustomers.length} customers
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                );
              })}
              {totalPages > 5 && (
                <>
                  <span className="px-2">...</span>
                  <Button
                    variant={currentPage === totalPages ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(totalPages)}
                    className="w-8 h-8 p-0"
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
