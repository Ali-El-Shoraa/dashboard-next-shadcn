"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Search,
  Filter,
  X,
  CalendarIcon,
  DollarSign,
  Target,
  Users,
  Tag,
} from "lucide-react";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";

interface FilterState {
  search: string;
  status: string[];
  type: string[];
  priority: string[];
  budgetRange: [number, number];
  dateRange: DateRange | undefined;
  tags: string[];
  members: string[];
}

interface CampaignFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

export function CampaignFilters({
  filters,
  onFiltersChange,
  onClearFilters,
}: CampaignFiltersProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const statusOptions = [
    { value: "active", label: "Active", color: "bg-green-100 text-green-800" },
    {
      value: "paused",
      label: "Paused",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      value: "completed",
      label: "Completed",
      color: "bg-blue-100 text-blue-800",
    },
    { value: "draft", label: "Draft", color: "bg-gray-100 text-gray-800" },
    {
      value: "archived",
      label: "Archived",
      color: "bg-gray-100 text-gray-600",
    },
  ];

  const typeOptions = [
    { value: "email", label: "Email", icon: "📧" },
    { value: "social", label: "Social", icon: "📱" },
    { value: "display", label: "Display", icon: "🖼️" },
    { value: "search", label: "Search", icon: "🔍" },
    { value: "content", label: "Content", icon: "📝" },
  ];

  const priorityOptions = [
    { value: "critical", label: "Critical", color: "bg-red-100 text-red-800" },
    { value: "high", label: "High", color: "bg-orange-100 text-orange-800" },
    { value: "medium", label: "Medium", color: "bg-blue-100 text-blue-800" },
    { value: "low", label: "Low", color: "bg-gray-100 text-gray-800" },
  ];

  const availableTags = [
    "Q4 Campaign",
    "Holiday Sale",
    "Product Launch",
    "Brand Awareness",
    "Lead Generation",
    "Retargeting",
    "A/B Test",
    "Mobile First",
  ];

  const availableMembers = [
    "John Doe",
    "Jane Smith",
    "Mike Johnson",
    "Sarah Wilson",
    "David Brown",
    "Lisa Davis",
    "Tom Wilson",
    "Amy Taylor",
  ];

  interface UpdateFilterFn {
    <K extends keyof FilterState>(key: K, value: FilterState[K]): void;
  }

  const updateFilter: UpdateFilterFn = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: keyof FilterState, value: string) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.status.length > 0) count++;
    if (filters.type.length > 0) count++;
    if (filters.priority.length > 0) count++;
    if (filters.budgetRange[0] > 0 || filters.budgetRange[1] < 100000) count++;
    if (filters.dateRange) count++;
    if (filters.tags.length > 0) count++;
    if (filters.members.length > 0) count++;
    return count;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      {/* Main Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search campaigns..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2">
          <Select
            value={filters.status.length === 1 ? filters.status[0] : "all"}
            onValueChange={(value) =>
              updateFilter("status", value === "all" ? [] : [value])
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.type.length === 1 ? filters.type[0] : "all"}
            onValueChange={(value) =>
              updateFilter("type", value === "all" ? [] : [value])
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {typeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <span className="flex items-center">
                    <span className="mr-2">{option.icon}</span>
                    {option.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="relative"
          >
            <Filter className="h-4 w-4 mr-2" />
            Advanced
            {getActiveFiltersCount() > 0 && (
              <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </Button>

          {getActiveFiltersCount() > 0 && (
            <Button variant="ghost" onClick={onClearFilters}>
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {isAdvancedOpen && (
        <div className="bg-gray-50 rounded-lg p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Status Filter */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Target className="h-4 w-4 mr-2" />
                Campaign Status
              </label>
              <div className="space-y-2">
                {statusOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`status-${option.value}`}
                      checked={filters.status.includes(option.value)}
                      onCheckedChange={() =>
                        toggleArrayFilter("status", option.value)
                      }
                    />
                    <label
                      htmlFor={`status-${option.value}`}
                      className="text-sm font-medium cursor-pointer"
                    >
                      <Badge className={option.color}>{option.label}</Badge>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Tag className="h-4 w-4 mr-2" />
                Campaign Type
              </label>
              <div className="space-y-2">
                {typeOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`type-${option.value}`}
                      checked={filters.type.includes(option.value)}
                      onCheckedChange={() =>
                        toggleArrayFilter("type", option.value)
                      }
                    />
                    <label
                      htmlFor={`type-${option.value}`}
                      className="text-sm font-medium cursor-pointer flex items-center"
                    >
                      <span className="mr-2">{option.icon}</span>
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Priority Filter */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Target className="h-4 w-4 mr-2" />
                Priority Level
              </label>
              <div className="space-y-2">
                {priorityOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`priority-${option.value}`}
                      checked={filters.priority.includes(option.value)}
                      onCheckedChange={() =>
                        toggleArrayFilter("priority", option.value)
                      }
                    />
                    <label
                      htmlFor={`priority-${option.value}`}
                      className="text-sm font-medium cursor-pointer"
                    >
                      <Badge className={option.color}>{option.label}</Badge>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Budget Range */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                Budget Range
              </label>
              <div className="space-y-4">
                <Slider
                  value={filters.budgetRange}
                  onValueChange={(value) =>
                    updateFilter("budgetRange", value as [number, number])
                  }
                  max={100000}
                  min={0}
                  step={1000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{formatCurrency(filters.budgetRange[0])}</span>
                  <span>{formatCurrency(filters.budgetRange[1])}</span>
                </div>
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Date Range
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateRange?.from ? (
                      filters.dateRange.to ? (
                        <>
                          {format(filters.dateRange.from, "LLL dd, y")} -{" "}
                          {format(filters.dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(filters.dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={filters.dateRange?.from}
                    selected={filters.dateRange}
                    onSelect={(range) => updateFilter("dateRange", range)}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tags Filter */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Tag className="h-4 w-4 mr-2" />
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={filters.tags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleArrayFilter("tags", tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Team Members Filter */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Team Members
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {availableMembers.map((member) => (
                  <div key={member} className="flex items-center space-x-2">
                    <Checkbox
                      id={`member-${member}`}
                      checked={filters.members.includes(member)}
                      onCheckedChange={() =>
                        toggleArrayFilter("members", member)
                      }
                    />
                    <label
                      htmlFor={`member-${member}`}
                      className="text-sm font-medium cursor-pointer"
                    >
                      {member}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {getActiveFiltersCount() > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: {filters.search}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => updateFilter("search", "")}
              />
            </Badge>
          )}
          {filters.status.map((status) => (
            <Badge
              key={status}
              variant="secondary"
              className="flex items-center gap-1"
            >
              Status: {statusOptions.find((s) => s.value === status)?.label}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => toggleArrayFilter("status", status)}
              />
            </Badge>
          ))}
          {filters.type.map((type) => (
            <Badge
              key={type}
              variant="secondary"
              className="flex items-center gap-1"
            >
              Type: {typeOptions.find((t) => t.value === type)?.label}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => toggleArrayFilter("type", type)}
              />
            </Badge>
          ))}
          {filters.priority.map((priority) => (
            <Badge
              key={priority}
              variant="secondary"
              className="flex items-center gap-1"
            >
              Priority:{" "}
              {priorityOptions.find((p) => p.value === priority)?.label}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => toggleArrayFilter("priority", priority)}
              />
            </Badge>
          ))}
          {filters.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="flex items-center gap-1"
            >
              Tag: {tag}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => toggleArrayFilter("tags", tag)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
