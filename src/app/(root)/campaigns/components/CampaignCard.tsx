"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  MoreHorizontal,
  Calendar,
  Eye,
  Edit,
  Copy,
  Archive,
  Play,
  Pause,
  BarChart3,
  Star,
  StarOff,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

export interface Campaign {
  id: string;
  title: string;
  description: string;
  status: "draft" | "active" | "paused" | "completed" | "archived";
  type: "email" | "social" | "display" | "search" | "content";
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  roas: number;
  progress: number;
  members: Array<{
    id: string;
    name: string;
    avatar: string;
    role: string;
  }>;
  tags: string[];
  priority: "low" | "medium" | "high" | "critical";
  isFavorite: boolean;
}

interface CampaignCardProps {
  campaign: Campaign;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  viewMode: "grid" | "list";
}

const statusConfig = {
  draft: { label: "Draft", color: "bg-gray-100 text-gray-800 border-gray-200" },
  active: {
    label: "Active",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  paused: {
    label: "Paused",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  completed: {
    label: "Completed",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  archived: {
    label: "Archived",
    color: "bg-gray-100 text-gray-600 border-gray-200",
  },
};

const typeConfig = {
  email: { label: "Email", icon: "📧", color: "bg-purple-100 text-purple-800" },
  social: { label: "Social", icon: "📱", color: "bg-blue-100 text-blue-800" },
  display: {
    label: "Display",
    icon: "🖼️",
    color: "bg-orange-100 text-orange-800",
  },
  search: { label: "Search", icon: "🔍", color: "bg-green-100 text-green-800" },
  content: {
    label: "Content",
    icon: "📝",
    color: "bg-indigo-100 text-indigo-800",
  },
};

// const priorityConfig = {
//   low: { color: "bg-gray-100 text-gray-600" },
//   medium: { color: "bg-blue-100 text-blue-700" },
//   high: { color: "bg-orange-100 text-orange-700" },
//   critical: { color: "bg-red-100 text-red-700" },
// };

export function CampaignCard({
  campaign,
  isSelected,
  onSelect,
  onToggleFavorite,
  viewMode,
}: CampaignCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(num);
  };

  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-md transition-all duration-200 border-l-4 border-l-blue-500">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => onSelect(campaign.id)}
              />

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {typeConfig[campaign.type].icon}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {campaign.title}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onToggleFavorite(campaign.id)}
                      className="p-1 h-auto"
                    >
                      {campaign.isFavorite ? (
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      ) : (
                        <StarOff className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {campaign.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-900">
                  {formatCurrency(campaign.spent)}
                </div>
                <div className="text-xs text-gray-500">
                  of {formatCurrency(campaign.budget)}
                </div>
              </div>

              <div className="text-center">
                <div className="text-sm font-semibold text-gray-900">
                  {formatNumber(campaign.impressions)}
                </div>
                <div className="text-xs text-gray-500">Impressions</div>
              </div>

              <div className="text-center">
                <div className="text-sm font-semibold text-gray-900">
                  {campaign.ctr.toFixed(2)}%
                </div>
                <div className="text-xs text-gray-500">CTR</div>
              </div>

              <div className="text-center">
                <div className="text-sm font-semibold text-gray-900">
                  {campaign.roas.toFixed(1)}x
                </div>
                <div className="text-xs text-gray-500">ROAS</div>
              </div>

              <Badge className={statusConfig[campaign.status].color}>
                {statusConfig[campaign.status].label}
              </Badge>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Campaign
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Analytics
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    {campaign.status === "active" ? (
                      <>
                        <Pause className="mr-2 h-4 w-4" />
                        Pause Campaign
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Start Campaign
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Archive className="mr-2 h-4 w-4" />
                    Archive
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`group hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden ${
        isSelected ? "ring-2 ring-blue-500 shadow-lg" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-3 left-3 z-10">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onSelect(campaign.id)}
          className="bg-white shadow-sm"
        />
      </div>

      {/* Favorite Button */}
      <div className="absolute top-3 right-3 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleFavorite(campaign.id)}
          className="p-1 h-auto bg-white/80 hover:bg-white shadow-sm"
        >
          {campaign.isFavorite ? (
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
          ) : (
            <StarOff className="h-4 w-4 text-gray-400" />
          )}
        </Button>
      </div>

      {/* Priority Indicator */}
      <div
        className={`absolute top-0 left-0 w-full h-1 ${
          campaign.priority === "critical"
            ? "bg-red-500"
            : campaign.priority === "high"
            ? "bg-orange-500"
            : campaign.priority === "medium"
            ? "bg-blue-500"
            : "bg-gray-300"
        }`}
      />

      <CardHeader className="pb-3 pt-12">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-semibold shadow-lg">
              {typeConfig[campaign.type].icon}
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground group-hover:text-blue-600 transition-colors">
                {campaign.title}
              </h3>
              <Badge className={typeConfig[campaign.type].color}>
                {typeConfig[campaign.type].label}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-600 text-sm line-clamp-2">
          {campaign.description}
        </p>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-semibold">{campaign.progress}%</span>
          </div>
          <Progress value={campaign.progress} className="h-2" />
        </div>

        {/* Budget Information */}
        <div className="bg-gray-50 rounded-lg p-3 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Budget</span>
            <span className="font-semibold">
              {formatCurrency(campaign.budget)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Spent</span>
            <span className="font-semibold text-blue-600">
              {formatCurrency(campaign.spent)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Remaining</span>
            <span className="font-semibold text-green-600">
              {formatCurrency(campaign.budget - campaign.spent)}
            </span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">
              {formatNumber(campaign.impressions)}
            </div>
            <div className="text-xs text-gray-600">Impressions</div>
          </div>
          <div className="text-center p-2 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">
              {campaign.ctr.toFixed(2)}%
            </div>
            <div className="text-xs text-gray-600">CTR</div>
          </div>
          <div className="text-center p-2 bg-purple-50 rounded-lg">
            <div className="text-lg font-bold text-purple-600">
              {formatCurrency(campaign.cpc)}
            </div>
            <div className="text-xs text-gray-600">CPC</div>
          </div>
          <div className="text-center p-2 bg-orange-50 rounded-lg">
            <div className="text-lg font-bold text-orange-600">
              {campaign.roas.toFixed(1)}x
            </div>
            <div className="text-xs text-gray-600">ROAS</div>
          </div>
        </div>

        {/* Team Members */}
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {campaign.members.slice(0, 3).map((member) => (
              <Avatar
                key={member.id}
                className="w-8 h-8 border-2 border-white shadow-sm"
              >
                <AvatarImage
                  src={member.avatar || "/placeholder.svg"}
                  alt={member.name}
                />
                <AvatarFallback className="text-xs">
                  {member.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            ))}
            {campaign.members.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-semibold text-gray-600">
                +{campaign.members.length - 3}
              </div>
            )}
          </div>

          <Badge className={statusConfig[campaign.status].color}>
            {statusConfig[campaign.status].label}
          </Badge>
        </div>

        {/* Date Range */}
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          {campaign.startDate} → {campaign.endDate}
        </div>

        {/* Tags */}
        {campaign.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {campaign.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {campaign.tags.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{campaign.tags.length - 2}
              </Badge>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button size="sm" className="flex-1">
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit Campaign
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BarChart3 className="mr-2 h-4 w-4" />
                View Analytics
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {campaign.status === "active" ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" />
                    Pause Campaign
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Start Campaign
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>

      {/* Hover Overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
      )}
    </Card>
  );
}
