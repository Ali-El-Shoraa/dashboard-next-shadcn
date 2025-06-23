"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { InvoiceCard } from "./InvoiceCard";
import { InvoiceFilters } from "./InvoiceFilters";
import { InvoiceStats } from "./InvoiceStats";
import {
  Plus,
  Download,
  Upload,
  MoreHorizontal,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
  Send,
  FileText,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DateRange } from "react-day-picker";

interface Invoice {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar: string;
    company?: string;
  };
  date: string;
  dueDate: string;
  amount: number;
  status: "paid" | "pending" | "overdue" | "draft" | "cancelled";
  items: number;
  paymentMethod?: string;
  currency: string;
  description?: string;
  tags?: string[];
}

const sampleInvoices: Invoice[] = [
  {
    id: "#INV-001",
    customer: {
      name: "Patricia Semklo",
      email: "patricia.semklo@app.com",
      avatar: "/placeholder.svg?height=40&width=40",
      company: "TechCorp Inc.",
    },
    date: "2024-01-15",
    dueDate: "2024-02-15",
    amount: 2890.66,
    status: "paid",
    items: 5,
    currency: "USD",
    description: "Web development services",
    tags: ["web", "development"],
  },
  {
    id: "#INV-002",
    customer: {
      name: "Dominik Lamakani",
      email: "dominik.lamakani@gmail.com",
      avatar: "/placeholder.svg?height=40&width=40",
      company: "Design Studio",
    },
    date: "2024-01-14",
    dueDate: "2024-01-21",
    amount: 1476.04,
    status: "overdue",
    items: 3,
    currency: "USD",
    description: "UI/UX Design Package",
    tags: ["design", "ui/ux"],
  },
  {
    id: "#INV-003",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      avatar: "/placeholder.svg?height=40&width=40",
      company: "Marketing Pro",
    },
    date: "2024-01-13",
    dueDate: "2024-02-13",
    amount: 3250.0,
    status: "pending",
    items: 8,
    currency: "USD",
    description: "Marketing campaign setup",
    tags: ["marketing", "campaign"],
  },
  {
    id: "#INV-004",
    customer: {
      name: "Michael Chen",
      email: "m.chen@techcorp.com",
      avatar: "/placeholder.svg?height=40&width=40",
      company: "Tech Solutions",
    },
    date: "2024-01-12",
    dueDate: "2024-02-12",
    amount: 5670.89,
    status: "paid",
    items: 12,
    currency: "USD",
    description: "Software development",
    tags: ["software", "development"],
  },
  {
    id: "#INV-005",
    customer: {
      name: "Emma Wilson",
      email: "emma.wilson@startup.io",
      avatar: "/placeholder.svg?height=40&width=40",
      company: "Startup Inc.",
    },
    date: "2024-01-11",
    dueDate: "2024-02-11",
    amount: 1234.56,
    status: "draft",
    items: 4,
    currency: "USD",
    description: "Consulting services",
    tags: ["consulting"],
  },
  {
    id: "#INV-006",
    customer: {
      name: "James Rodriguez",
      email: "james.r@design.studio",
      avatar: "/placeholder.svg?height=40&width=40",
      company: "Creative Agency",
    },
    date: "2024-01-10",
    dueDate: "2024-02-10",
    amount: 4567.89,
    status: "pending",
    items: 7,
    currency: "USD",
    description: "Brand identity design",
    tags: ["branding", "design"],
  },
];

export default function InvoicesPage() {
  const [invoices] = useState(sampleInvoices);
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [filters, setFilters] = useState({
    search: "",
    status: [] as string[],
    dateRange: undefined as DateRange | undefined,
    amountRange: [0, 10000] as [number, number],
    customer: "",
    sortBy: "date",
    sortOrder: "desc" as "asc" | "desc",
  });

  // Calculate stats
  const stats = useMemo(() => {
    const totalRevenue = invoices.reduce(
      (sum, invoice) => sum + invoice.amount,
      0
    );
    const paidInvoices = invoices.filter((inv) => inv.status === "paid").length;
    const pendingInvoices = invoices.filter(
      (inv) => inv.status === "pending"
    ).length;
    const overdueInvoices = invoices.filter(
      (inv) => inv.status === "overdue"
    ).length;
    const draftInvoices = invoices.filter(
      (inv) => inv.status === "draft"
    ).length;
    const averageAmount = totalRevenue / invoices.length;

    return {
      totalInvoices: invoices.length,
      totalRevenue,
      paidInvoices,
      pendingInvoices,
      overdueInvoices,
      draftInvoices,
      averageAmount,
      monthlyGrowth: 8.5,
    };
  }, [invoices]);

  // Filter and sort invoices
  const filteredInvoices = useMemo(() => {
    const filtered = invoices.filter((invoice) => {
      const matchesSearch =
        !filters.search ||
        invoice.id.toLowerCase().includes(filters.search.toLowerCase()) ||
        invoice.customer.name
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        invoice.customer.email
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        invoice.amount.toString().includes(filters.search);

      const matchesStatus =
        filters.status.length === 0 || filters.status.includes(invoice.status);
      const matchesCustomer =
        !filters.customer ||
        invoice.customer.name
          .toLowerCase()
          .includes(filters.customer.toLowerCase());
      const matchesAmount =
        invoice.amount >= filters.amountRange[0] &&
        invoice.amount <= filters.amountRange[1];

      let matchesDateRange = true;
      if (filters.dateRange?.from && filters.dateRange?.to) {
        const invoiceDate = new Date(invoice.date);
        matchesDateRange =
          invoiceDate >= filters.dateRange.from &&
          invoiceDate <= filters.dateRange.to;
      }

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCustomer &&
        matchesAmount &&
        matchesDateRange
      );
    });

    // Sort invoices
    filtered.sort((a, b) => {
      let aValue: string | number | Date, bValue: string | number | Date;

      switch (filters.sortBy) {
        case "date":
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case "dueDate":
          aValue = new Date(a.dueDate);
          bValue = new Date(b.dueDate);
          break;
        case "amount":
          aValue = a.amount;
          bValue = b.amount;
          break;
        case "customer":
          aValue = a.customer.name;
          bValue = b.customer.name;
          break;
        case "status":
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          aValue = new Date(a.date);
          bValue = new Date(b.date);
      }

      if (filters.sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [invoices, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInvoices = filteredInvoices.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSelectInvoice = (id: string) => {
    setSelectedInvoices((prev) =>
      prev.includes(id)
        ? prev.filter((invoiceId) => invoiceId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedInvoices.length === paginatedInvoices.length) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices(paginatedInvoices.map((inv) => inv.id));
    }
  };

  return (
    <div className="space-y-8 content">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Invoice Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Create, manage, and track your invoices
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
              <DropdownMenuItem className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Send Reminders
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Generate Report
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="h-4 w-4" />
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Stats */}
      <InvoiceStats {...stats} />

      {/* Filters */}
      <InvoiceFilters
        filters={filters}
        onFiltersChange={setFilters}
        totalInvoices={invoices.length}
        filteredCount={filteredInvoices.length}
      />

      {/* View Controls and Selection */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={
                selectedInvoices.length === paginatedInvoices.length &&
                paginatedInvoices.length > 0
              }
              onChange={handleSelectAll}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {selectedInvoices.length > 0
                ? `${selectedInvoices.length} selected`
                : `${filteredInvoices.length} invoices`}
            </span>
          </div>
          {selectedInvoices.length > 0 && (
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                Send Reminders
              </Button>
              <Button size="sm" variant="outline">
                Download Selected
              </Button>
              <Button size="sm" variant="outline" className="text-red-600">
                Delete Selected
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

      {/* Invoice Grid/List */}
      <div
        className={`${
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            : "space-y-4"
        }`}
      >
        {paginatedInvoices.map((invoice) => (
          <InvoiceCard
            key={invoice.id}
            invoice={invoice}
            isSelected={selectedInvoices.includes(invoice.id)}
            onSelect={handleSelectInvoice}
            viewMode={viewMode}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredInvoices.length)} of{" "}
            {filteredInvoices.length} invoices
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
