"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Search, X, SlidersHorizontal } from "lucide-react";
import type { DateRange } from "react-day-picker";

interface FilterState {
  search: string;
  status: string[];
  dateRange: DateRange | undefined;
  amountRange: [number, number];
  customer: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

interface InvoiceFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  totalInvoices: number;
  filteredCount: number;
}

export function InvoiceFilters({
  filters,
  onFiltersChange,
  totalInvoices,
  filteredCount,
}: InvoiceFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = (
    key: keyof FilterState,
    value:
      | string
      | string[]
      | DateRange
      | undefined
      | [number, number]
      | "asc"
      | "desc"
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      status: [],
      dateRange: undefined,
      amountRange: [0, 10000],
      customer: "",
      sortBy: "date",
      sortOrder: "desc",
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.status.length > 0 ||
    filters.dateRange ||
    filters.customer ||
    filters.amountRange[0] > 0 ||
    filters.amountRange[1] < 10000;

  return (
    <div className="space-y-4">
      {/* Search and Quick Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search invoices by ID, customer, or amount..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="pl-10 bg-white dark:bg-gray-800"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Select
            value={filters.sortBy}
            onValueChange={(value) => updateFilter("sortBy", value)}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date Created</SelectItem>
              <SelectItem value="dueDate">Due Date</SelectItem>
              <SelectItem value="amount">Amount</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.sortOrder}
            onValueChange={(value: "asc" | "desc") =>
              updateFilter("sortOrder", value)
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Newest</SelectItem>
              <SelectItem value="asc">Oldest</SelectItem>
            </SelectContent>
          </Select>

          {/* Quick Status Filters */}
          <div className="flex gap-2">
            {["paid", "pending", "overdue", "draft"].map((status) => (
              <Button
                key={status}
                variant={
                  filters.status.includes(status) ? "default" : "outline"
                }
                size="sm"
                onClick={() => {
                  if (filters.status.includes(status)) {
                    updateFilter(
                      "status",
                      filters.status.filter((s) => s !== status)
                    );
                  } else {
                    updateFilter("status", [...filters.status, status]);
                  }
                }}
                className="capitalize"
              >
                {status}
              </Button>
            ))}
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Advanced Filters
                {hasActiveFilters && (
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-blue-500 rounded-full" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Advanced Filters</SheetTitle>
                <SheetDescription>
                  Filter invoices by various criteria to find exactly what you
                  are looking for.
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6 mt-6">
                {/* Date Range Filter */}
                <div>
                  <Label className="text-base font-medium">Date Range</Label>
                  <div className="mt-2">
                    <DatePickerWithRange
                      date={filters.dateRange}
                      onDateChange={(dateRange) =>
                        updateFilter("dateRange", dateRange)
                      }
                    />
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <Label className="text-base font-medium">
                    Invoice Status
                  </Label>
                  <div className="space-y-2 mt-2">
                    {["paid", "pending", "overdue", "draft", "cancelled"].map(
                      (status) => (
                        <div
                          key={status}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={status}
                            checked={filters.status.includes(status)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                updateFilter("status", [
                                  ...filters.status,
                                  status,
                                ]);
                              } else {
                                updateFilter(
                                  "status",
                                  filters.status.filter((s) => s !== status)
                                );
                              }
                            }}
                          />
                          <Label htmlFor={status} className="capitalize">
                            {status}
                          </Label>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Customer Filter */}
                <div>
                  <Label htmlFor="customer" className="text-base font-medium">
                    Customer
                  </Label>
                  <Input
                    id="customer"
                    placeholder="Filter by customer name..."
                    value={filters.customer}
                    onChange={(e) => updateFilter("customer", e.target.value)}
                    className="mt-2"
                  />
                </div>

                {/* Amount Range */}
                <div>
                  <Label className="text-base font-medium">
                    Amount Range (${filters.amountRange[0]} - $
                    {filters.amountRange[1]})
                  </Label>
                  <Slider
                    value={filters.amountRange}
                    onValueChange={(value) =>
                      updateFilter("amountRange", value as [number, number])
                    }
                    max={10000}
                    step={50}
                    className="mt-2"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="flex-1"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                  <Button onClick={() => setIsOpen(false)} className="flex-1">
                    Apply Filters
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Filter Summary */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-sm text-blue-700 dark:text-blue-300">
            Showing {filteredCount} of {totalInvoices} invoices
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-blue-700 dark:text-blue-300"
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
