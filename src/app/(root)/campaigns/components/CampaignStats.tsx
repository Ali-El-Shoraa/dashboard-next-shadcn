"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Users,
  BarChart3,
  Eye,
  MousePointer,
  ShoppingCart,
  Zap,
} from "lucide-react";

interface Campaign {
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  roas: number;
  status: "active" | "completed" | "paused" | "draft" | "archived";
}

interface CampaignStatsProps {
  campaigns: Campaign[];
}

export function CampaignStats({ campaigns }: CampaignStatsProps) {
  // Calculate aggregate statistics
  const totalBudget = campaigns.reduce(
    (sum, campaign) => sum + campaign.budget,
    0
  );
  const totalSpent = campaigns.reduce(
    (sum, campaign) => sum + campaign.spent,
    0
  );
  const totalImpressions = campaigns.reduce(
    (sum, campaign) => sum + campaign.impressions,
    0
  );
  const totalClicks = campaigns.reduce(
    (sum, campaign) => sum + campaign.clicks,
    0
  );
  const totalConversions = campaigns.reduce(
    (sum, campaign) => sum + campaign.conversions,
    0
  );

  const avgCTR =
    campaigns.length > 0
      ? campaigns.reduce((sum, campaign) => sum + campaign.ctr, 0) /
        campaigns.length
      : 0;
  const avgROAS =
    campaigns.length > 0
      ? campaigns.reduce((sum, campaign) => sum + campaign.roas, 0) /
        campaigns.length
      : 0;
  const avgCPC = totalClicks > 0 ? totalSpent / totalClicks : 0;

  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;
  const completedCampaigns = campaigns.filter(
    (c) => c.status === "completed"
  ).length;
  const budgetUtilization =
    totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

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

  const stats = [
    {
      title: "Total Budget",
      value: formatCurrency(totalBudget),
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Allocated across all campaigns",
    },
    {
      title: "Total Spent",
      value: formatCurrency(totalSpent),
      change: "+8.2%",
      trend: "up",
      icon: Target,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: `${budgetUtilization.toFixed(1)}% of total budget`,
    },
    {
      title: "Impressions",
      value: formatNumber(totalImpressions),
      change: "+15.3%",
      trend: "up",
      icon: Eye,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Total ad impressions",
    },
    {
      title: "Clicks",
      value: formatNumber(totalClicks),
      change: "+22.1%",
      trend: "up",
      icon: MousePointer,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Total ad clicks",
    },
    {
      title: "Conversions",
      value: formatNumber(totalConversions),
      change: "+18.7%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      description: "Total conversions",
    },
    {
      title: "Avg CTR",
      value: `${avgCTR.toFixed(2)}%`,
      change: "+0.3%",
      trend: "up",
      icon: BarChart3,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      description: "Click-through rate",
    },
    {
      title: "Avg CPC",
      value: formatCurrency(avgCPC),
      change: "-5.2%",
      trend: "down",
      icon: Zap,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      description: "Cost per click",
    },
    {
      title: "Avg ROAS",
      value: `${avgROAS.toFixed(1)}x`,
      change: "+12.8%",
      trend: "up",
      icon: TrendingUp,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      description: "Return on ad spend",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <div className="flex items-center mt-3">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span
                  className={`text-sm font-medium ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">
                  vs last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Campaign Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Campaign Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Active Campaigns</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold">{activeCampaigns}</span>
                <Badge className="bg-green-100 text-green-800">
                  {((activeCampaigns / campaigns.length) * 100).toFixed(0)}%
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold">{completedCampaigns}</span>
                <Badge className="bg-blue-100 text-blue-800">
                  {((completedCampaigns / campaigns.length) * 100).toFixed(0)}%
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium">Paused</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold">
                  {campaigns.filter((c) => c.status === "paused").length}
                </span>
                <Badge className="bg-yellow-100 text-yellow-800">
                  {(
                    (campaigns.filter((c) => c.status === "paused").length /
                      campaigns.length) *
                    100
                  ).toFixed(0)}
                  %
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span className="text-sm font-medium">Draft</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold">
                  {campaigns.filter((c) => c.status === "draft").length}
                </span>
                <Badge className="bg-gray-100 text-gray-800">
                  {(
                    (campaigns.filter((c) => c.status === "draft").length /
                      campaigns.length) *
                    100
                  ).toFixed(0)}
                  %
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Budget Utilization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Overall Budget Usage</span>
                <span className="font-semibold">
                  {budgetUtilization.toFixed(1)}%
                </span>
              </div>
              <Progress value={budgetUtilization} className="h-3" />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">
                  {formatCurrency(totalBudget)}
                </div>
                <div className="text-xs text-gray-600">Total Budget</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">
                  {formatCurrency(totalSpent)}
                </div>
                <div className="text-xs text-gray-600">Total Spent</div>
              </div>
            </div>

            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-600">
                {formatCurrency(totalBudget - totalSpent)}
              </div>
              <div className="text-xs text-gray-600">Remaining Budget</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
