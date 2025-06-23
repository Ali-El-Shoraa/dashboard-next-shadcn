"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  DollarSign,
  ShoppingBag,
  Star,
  UserPlus,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { formatCurrency } from "@/utils/formatCurrency";

interface CustomerStatsProps {
  totalCustomers: number;
  newCustomers: number;
  totalRevenue: number;
  averageOrderValue: number;
  topCustomers: number;
  growthRate: number;
}

export function CustomerStats({
  totalCustomers,
  newCustomers,
  totalRevenue,
  averageOrderValue,
  topCustomers,
  growthRate,
}: CustomerStatsProps) {
  const stats = [
    {
      title: "Total Customers",
      value: formatCurrency(totalCustomers),
      icon: Users,
      change: `+${growthRate}%`,
      changeType: growthRate > 0 ? "positive" : "negative",
      description: "from last month",
    },
    {
      title: "New Customers",
      value: formatCurrency(newCustomers),
      icon: UserPlus,
      change: "+12%",
      changeType: "positive",
      description: "this month",
    },
    {
      title: "Total Revenue",
      value: formatCurrency(totalRevenue, "currency"),
      icon: DollarSign,
      change: "+8.2%",
      changeType: "positive",
      description: "from last month",
    },
    {
      title: "Avg. Order Value",
      value: formatCurrency(averageOrderValue, "currency"),
      icon: ShoppingBag,
      change: "+3.1%",
      changeType: "positive",
      description: "from last month",
    },
    {
      title: "VIP Customers",
      value: formatCurrency(topCustomers),
      icon: Star,
      change: "+5.4%",
      changeType: "positive",
      description: "platinum tier",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {stat.title}
            </CardTitle>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <stat.icon className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              {stat.value}
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className={`${
                  stat.changeType === "positive"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                }`}
              >
                {stat.changeType === "positive" ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                {stat.change}
              </Badge>
              <span className="text-xs text-gray-500">{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
