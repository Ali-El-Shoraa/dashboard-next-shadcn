"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  DollarSign,
  Package,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
} from "lucide-react";
import { formatCurrency } from "@/utils/formatCurrency";

interface OrdersStatsProps {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  deliveredOrders: number;
  averageOrderValue: number;
  monthlyGrowth: number;
}

export function OrdersStats({
  totalOrders,
  totalRevenue,
  pendingOrders,
  deliveredOrders,
  averageOrderValue,
  monthlyGrowth,
}: OrdersStatsProps) {
  const stats = [
    {
      title: "Total Orders",
      value: formatCurrency(totalOrders),
      icon: ShoppingCart,
      change: "+12%",
      changeType: "positive",
      description: "from last month",
      color: "blue",
    },
    {
      title: "Total Revenue",
      value: formatCurrency(totalRevenue, "currency"),
      icon: DollarSign,
      change: `${monthlyGrowth > 0 ? "+" : ""}${monthlyGrowth}%`,
      changeType: monthlyGrowth > 0 ? "positive" : "negative",
      description: "from last month",
      color: "green",
    },
    {
      title: "Pending Orders",
      value: formatCurrency(pendingOrders),
      icon: Clock,
      change: "-3%",
      changeType: "negative",
      description: "needs attention",
      color: "yellow",
    },
    {
      title: "Delivered Orders",
      value: formatCurrency(deliveredOrders),
      icon: CheckCircle,
      change: "+8%",
      changeType: "positive",
      description: `${Math.round(
        (deliveredOrders / totalOrders) * 100
      )}% success rate`,
      color: "green",
    },
    {
      title: "Average Order",
      value: formatCurrency(averageOrderValue, "currency"),
      icon: Package,
      change: "+5.2%",
      changeType: "positive",
      description: "per order",
      color: "purple",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600",
      green: "bg-green-50 dark:bg-green-900/20 text-green-600",
      yellow: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600",
      purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-600",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${getColorClasses(stat.color)}`}>
              <stat.icon className="h-4 w-4" />
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
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
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
