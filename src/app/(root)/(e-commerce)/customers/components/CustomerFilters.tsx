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
import { Search, X, SlidersHorizontal } from "lucide-react";

interface FilterState {
  search: string;
  status: string[];
  tier: string[];
  location: string;
  orderRange: [number, number];
  spentRange: [number, number];
  dateRange: string;
}

interface CustomerFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  totalCustomers: number;
  filteredCount: number;
}

export function CustomerFilters({
  filters,
  onFiltersChange,
  totalCustomers,
  filteredCount,
}: CustomerFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      status: [],
      tier: [],
      location: "",
      orderRange: [0, 100],
      spentRange: [0, 50000],
      dateRange: "all",
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.status.length > 0 ||
    filters.tier.length > 0 ||
    filters.location ||
    filters.dateRange !== "all";

  return (
    <div className="space-y-4">
      {/* Search and Quick Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search customers by name, email, or location..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="pl-10 bg-white dark:bg-gray-800"
          />
        </div>

        <div className="flex gap-2">
          <Select
            value={filters.dateRange}
            onValueChange={(value) => updateFilter("dateRange", value)}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>

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
                  Filter customers by various criteria to find exactly what you
                  are looking for.
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6 mt-6">
                {/* Status Filter */}
                <div>
                  <Label className="text-base font-medium">
                    Customer Status
                  </Label>
                  <div className="space-y-2 mt-2">
                    {["active", "inactive", "pending"].map((status) => (
                      <div key={status} className="flex items-center space-x-2">
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
                    ))}
                  </div>
                </div>

                {/* Tier Filter */}
                <div>
                  <Label className="text-base font-medium">Customer Tier</Label>
                  <div className="space-y-2 mt-2">
                    {["bronze", "silver", "gold", "platinum"].map((tier) => (
                      <div key={tier} className="flex items-center space-x-2">
                        <Checkbox
                          id={tier}
                          checked={filters.tier.includes(tier)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              updateFilter("tier", [...filters.tier, tier]);
                            } else {
                              updateFilter(
                                "tier",
                                filters.tier.filter((t) => t !== tier)
                              );
                            }
                          }}
                        />
                        <Label htmlFor={tier} className="capitalize">
                          {tier}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location Filter */}
                <div>
                  <Label htmlFor="location" className="text-base font-medium">
                    Location
                  </Label>
                  <Select
                    value={filters.location}
                    onValueChange={(value) => updateFilter("location", value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="DE">Germany</SelectItem>
                      <SelectItem value="FR">France</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Order Count Range */}
                <div>
                  <Label className="text-base font-medium">
                    Number of Orders ({filters.orderRange[0]} -{" "}
                    {filters.orderRange[1]})
                  </Label>
                  <Slider
                    value={filters.orderRange}
                    onValueChange={(value) =>
                      updateFilter("orderRange", value as [number, number])
                    }
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                </div>

                {/* Spent Range */}
                <div>
                  <Label className="text-base font-medium">
                    Total Spent (${filters.spentRange[0]} - $
                    {filters.spentRange[1]})
                  </Label>
                  <Slider
                    value={filters.spentRange}
                    onValueChange={(value) =>
                      updateFilter("spentRange", value as [number, number])
                    }
                    max={50000}
                    step={100}
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
            Showing {filteredCount} of {totalCustomers} customers
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
