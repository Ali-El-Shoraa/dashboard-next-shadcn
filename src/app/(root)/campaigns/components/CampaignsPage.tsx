"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Download,
  Upload,
  // Grid3X3,
  // List,
  Play,
  Pause,
  Archive,
  Copy,
  Trash2,
  Settings,
  BarChart3,
  Filter,
  SortAsc,
  SortDesc,
} from "lucide-react";
import { CampaignCard, type Campaign } from "./CampaignCard";
import { CampaignStats } from "./CampaignStats";
import { CampaignFilters } from "./CampaignFilters";
import type { DateRange } from "react-day-picker";

// Mock data - in a real app, this would come from an API
const mockCampaigns: Campaign[] = [
  {
    id: "1",
    title: "Q4 Holiday Sale Campaign",
    description:
      "Comprehensive holiday marketing campaign targeting Black Friday and Cyber Monday shoppers with personalized offers.",
    status: "active",
    type: "email",
    startDate: "2024-11-01",
    endDate: "2024-12-31",
    budget: 50000,
    spent: 32500,
    impressions: 2500000,
    clicks: 125000,
    conversions: 3750,
    ctr: 5.0,
    cpc: 0.26,
    roas: 4.2,
    progress: 65,
    members: [
      {
        id: "1",
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "Campaign Manager",
      },
      {
        id: "2",
        name: "Mike Chen",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "Designer",
      },
      {
        id: "3",
        name: "Lisa Rodriguez",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "Copywriter",
      },
    ],
    tags: ["Holiday", "Email Marketing", "Seasonal"],
    priority: "high",
    isFavorite: true,
  },
  {
    id: "2",
    title: "Product Launch - Smart Home Series",
    description:
      "Multi-channel campaign for launching our new smart home product line with focus on tech-savvy millennials.",
    status: "active",
    type: "social",
    startDate: "2024-10-15",
    endDate: "2024-12-15",
    budget: 75000,
    spent: 28000,
    impressions: 1800000,
    clicks: 90000,
    conversions: 2700,
    ctr: 5.0,
    cpc: 0.31,
    roas: 3.8,
    progress: 37,
    members: [
      {
        id: "4",
        name: "David Park",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "Product Manager",
      },
      {
        id: "5",
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "Social Media Manager",
      },
    ],
    tags: ["Product Launch", "Social Media", "Tech"],
    priority: "critical",
    isFavorite: false,
  },
  {
    id: "3",
    title: "Brand Awareness - Spring Collection",
    description:
      "Display advertising campaign to increase brand awareness for our spring fashion collection among target demographics.",
    status: "paused",
    type: "display",
    startDate: "2024-03-01",
    endDate: "2024-05-31",
    budget: 35000,
    spent: 22000,
    impressions: 3200000,
    clicks: 64000,
    conversions: 1280,
    ctr: 2.0,
    cpc: 0.34,
    roas: 2.1,
    progress: 63,
    members: [
      {
        id: "6",
        name: "Alex Thompson",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "Creative Director",
      },
      {
        id: "7",
        name: "Rachel Green",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "Brand Manager",
      },
      {
        id: "8",
        name: "Tom Anderson",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "Media Buyer",
      },
    ],
    tags: ["Brand Awareness", "Fashion", "Display Ads"],
    priority: "medium",
    isFavorite: true,
  },
  {
    id: "4",
    title: "Search Engine Marketing - Local Services",
    description:
      "Targeted search campaigns for local service offerings with geo-specific keywords and landing pages.",
    status: "completed",
    type: "search",
    startDate: "2024-08-01",
    endDate: "2024-09-30",
    budget: 25000,
    spent: 24800,
    impressions: 850000,
    clicks: 42500,
    conversions: 1700,
    ctr: 5.0,
    cpc: 0.58,
    roas: 5.2,
    progress: 100,
    members: [
      {
        id: "9",
        name: "Jennifer Lee",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "SEM Specialist",
      },
      {
        id: "10",
        name: "Mark Davis",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "Analytics Manager",
      },
    ],
    tags: ["SEM", "Local", "Services"],
    priority: "medium",
    isFavorite: false,
  },
  {
    id: "5",
    title: "Content Marketing - Thought Leadership",
    description:
      "Long-form content campaign establishing industry thought leadership through whitepapers, webinars, and expert interviews.",
    status: "draft",
    type: "content",
    startDate: "2024-12-01",
    endDate: "2025-03-31",
    budget: 40000,
    spent: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    ctr: 0,
    cpc: 0,
    roas: 0,
    progress: 0,
    members: [
      {
        id: "11",
        name: "Sophie Turner",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "Content Strategist",
      },
      {
        id: "12",
        name: "James Wilson",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "Writer",
      },
    ],
    tags: ["Content Marketing", "Thought Leadership", "B2B"],
    priority: "low",
    isFavorite: false,
  },
  {
    id: "6",
    title: "Retargeting Campaign - Cart Abandoners",
    description:
      "Sophisticated retargeting campaign targeting users who abandoned their shopping carts with personalized product recommendations.",
    status: "active",
    type: "display",
    startDate: "2024-10-01",
    endDate: "2024-12-31",
    budget: 15000,
    spent: 8500,
    impressions: 1200000,
    clicks: 36000,
    conversions: 1800,
    ctr: 3.0,
    cpc: 0.24,
    roas: 6.8,
    progress: 57,
    members: [
      {
        id: "13",
        name: "Chris Martinez",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "Performance Marketer",
      },
    ],
    tags: ["Retargeting", "E-commerce", "Personalization"],
    priority: "high",
    isFavorite: true,
  },
];

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

export function CampaignsPage() {
  const [campaigns] = useState<Campaign[]>(mockCampaigns);
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [viewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    status: [],
    type: [],
    priority: [],
    budgetRange: [0, 100000],
    dateRange: undefined,
    tags: [],
    members: [],
  });

  // Filter and sort campaigns
  const filteredAndSortedCampaigns = useMemo(() => {
    const filtered = campaigns.filter((campaign) => {
      // Search filter
      if (
        filters.search &&
        !campaign.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !campaign.description
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      // Status filter
      if (
        filters.status.length > 0 &&
        !filters.status.includes(campaign.status)
      ) {
        return false;
      }

      // Type filter
      if (filters.type.length > 0 && !filters.type.includes(campaign.type)) {
        return false;
      }

      // Priority filter
      if (
        filters.priority.length > 0 &&
        !filters.priority.includes(campaign.priority)
      ) {
        return false;
      }

      // Budget filter
      if (
        campaign.budget < filters.budgetRange[0] ||
        campaign.budget > filters.budgetRange[1]
      ) {
        return false;
      }

      // Tags filter
      if (
        filters.tags.length > 0 &&
        !filters.tags.some((tag) => campaign.tags.includes(tag))
      ) {
        return false;
      }

      // Members filter
      if (
        filters.members.length > 0 &&
        !filters.members.some((member) =>
          campaign.members.some((m) => m.name === member)
        )
      ) {
        return false;
      }

      return true;
    });

    // Sort campaigns
    filtered.sort((a, b) => {
      let aValue = a[sortBy as keyof Campaign];
      let bValue = b[sortBy as keyof Campaign];

      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [campaigns, filters, sortBy, sortOrder]);

  const handleSelectCampaign = (campaignId: string) => {
    setSelectedCampaigns((prev) =>
      prev.includes(campaignId)
        ? prev.filter((id) => id !== campaignId)
        : [...prev, campaignId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCampaigns.length === filteredAndSortedCampaigns.length) {
      setSelectedCampaigns([]);
    } else {
      setSelectedCampaigns(filteredAndSortedCampaigns.map((c) => c.id));
    }
  };

  const handleToggleFavorite = (campaignId: string) => {
    // In a real app, this would update the campaign in the backend
    console.log("Toggle favorite for campaign:", campaignId);
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} for campaigns:`, selectedCampaigns);
    // In a real app, this would perform the bulk action
    setSelectedCampaigns([]);
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      status: [],
      type: [],
      priority: [],
      budgetRange: [0, 100000],
      dateRange: undefined,
      tags: [],
      members: [],
    });
  };

  return (
    <div className="space-y-6 content">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Campaigns</h1>
          <p className="text-gray-600 mt-1">
            Manage and monitor your marketing campaigns
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Campaign Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Archive className="mr-2 h-4 w-4" />
                Archived Campaigns
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <CampaignStats campaigns={filteredAndSortedCampaigns} />

      {/* Filters */}
      <CampaignFilters
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={clearFilters}
      />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          {selectedCampaigns.length > 0 && (
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={
                  selectedCampaigns.length === filteredAndSortedCampaigns.length
                }
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm text-gray-600">
                {selectedCampaigns.length} of{" "}
                {filteredAndSortedCampaigns.length} selected
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Bulk Actions
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => handleBulkAction("activate")}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Activate Selected
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBulkAction("pause")}>
                    <Pause className="mr-2 h-4 w-4" />
                    Pause Selected
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleBulkAction("duplicate")}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate Selected
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleBulkAction("archive")}>
                    <Archive className="mr-2 h-4 w-4" />
                    Archive Selected
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleBulkAction("delete")}
                    className="text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Selected
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Sort by Title</SelectItem>
              <SelectItem value="status">Sort by Status</SelectItem>
              <SelectItem value="budget">Sort by Budget</SelectItem>
              <SelectItem value="spent">Sort by Spent</SelectItem>
              <SelectItem value="roas">Sort by ROAS</SelectItem>
              <SelectItem value="startDate">Sort by Start Date</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? (
              <SortAsc className="h-4 w-4" />
            ) : (
              <SortDesc className="h-4 w-4" />
            )}
          </Button>

          {/* <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div> */}
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          Showing {filteredAndSortedCampaigns.length} of {campaigns.length}{" "}
          campaigns
        </span>
        {selectedCampaigns.length > 0 && (
          <Badge variant="secondary">{selectedCampaigns.length} selected</Badge>
        )}
      </div>

      {/* Campaigns Grid/List */}
      {filteredAndSortedCampaigns.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Filter className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No campaigns found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters or create a new campaign to get started.
          </p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Campaign
          </Button>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {filteredAndSortedCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              isSelected={selectedCampaigns.includes(campaign.id)}
              onSelect={handleSelectCampaign}
              onToggleFavorite={handleToggleFavorite}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}

      {/* Load More / Pagination */}
      {filteredAndSortedCampaigns.length > 0 && (
        <div className="flex justify-center pt-8">
          <Button variant="outline">Load More Campaigns</Button>
        </div>
      )}
    </div>
  );
}
