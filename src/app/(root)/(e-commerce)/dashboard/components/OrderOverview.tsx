"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreVertical,
  ShoppingCart,
  DollarSign,
  RefreshCw,
  TrendingUp,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Dot,
} from "recharts";

const areaChartData = [
  { name: "Jan", orders: 4000, earnings: 2400, refunds: 2400 },
  { name: "Feb", orders: 3000, earnings: 1398, refunds: 2210 },
  { name: "Mar", orders: 2000, earnings: 9800, refunds: 2290 },
  { name: "Apr", orders: 2780, earnings: 3908, refunds: 2000 },
  { name: "May", orders: 1890, earnings: 4800, refunds: 2181 },
  { name: "Jun", orders: 2390, earnings: 3800, refunds: 2500 },
  { name: "Jul", orders: 3490, earnings: 4300, refunds: 2100 },
];

const stats = [
  {
    title: "Orders",
    value: "10,098",
    change: "+12%",
    icon: ShoppingCart,
    trend: "up",
    color: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-600 dark:text-green-400",
    description: "Total orders this month",
  },
  {
    title: "Earnings",
    value: "$12,678",
    change: "+8%",
    icon: DollarSign,
    trend: "up",
    color: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    description: "Revenue generated",
  },
  {
    title: "Refunds",
    value: "3,001",
    change: "-4%",
    icon: RefreshCw,
    trend: "down",
    color: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    description: "Refunded orders",
  },
];

import type { DotProps } from "recharts";

const CustomDot = (props: DotProps) => {
  const { cx, cy, stroke } = props;
  return (
    <Dot
      cx={cx}
      cy={cy}
      r={5}
      stroke={stroke}
      strokeWidth={2}
      fill="#fff"
      className="shadow-md"
    />
  );
};

import type { TooltipProps } from "recharts";

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<string, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg shadow-lg p-4 space-y-2">
        <p className="font-medium">{label}</p>
        <div className="grid grid-cols-3 gap-4">
          {payload.map((entry, index: number) => (
            <div key={`item-${index}`} className="flex items-center">
              <div
                className="w-2 h-2 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm font-medium">
                {entry.name}: <span className="ml-1">{entry.value}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function OrderOverview() {
  return (
    <Card className="border py-0 shadow-sm rounded-xl overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 bg-muted/50">
        <div>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Order Performance
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 hover:bg-background"
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem className="text-sm">This Month</DropdownMenuItem>
            <DropdownMenuItem className="text-sm">
              Previous Month
            </DropdownMenuItem>
            <DropdownMenuItem className="text-sm">
              Last 3 Months
            </DropdownMenuItem>
            <DropdownMenuItem className="text-sm">
              Last 6 Months
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex flex-col gap-8">
          {/* Main Chart Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-muted-foreground">
                Monthly Trends
              </h3>
              <div className="flex items-center gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="flex items-center">
                    <div
                      className="rounded-full"
                      style={{
                        backgroundColor: stat.iconColor.replace("text-", "bg-"),
                      }}
                    />
                    <span className="text-xs font-medium">{stat.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={areaChartData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorEarnings"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorOrders"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorRefunds"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    width={40}
                  />
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="hsl(var(--border))"
                    opacity={0.2}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="earnings"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorEarnings)"
                    activeDot={<CustomDot />}
                    dot={<CustomDot />}
                  />
                  <Area
                    type="monotone"
                    dataKey="orders"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorOrders)"
                    activeDot={<CustomDot />}
                    dot={<CustomDot />}
                  />
                  <Area
                    type="monotone"
                    dataKey="refunds"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRefunds)"
                    activeDot={<CustomDot />}
                    dot={<CustomDot />}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stats Cards - Horizontal Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="border shadow-sm p-2.5 rounded-lg hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <stat.icon className={`size-4 ${stat.iconColor}`} />
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm font-medium mt-3">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center border-t px-6 py-4 bg-muted/50">
        <p className="text-sm text-muted-foreground">
          Data refreshes every 15 minutes
        </p>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 hover:bg-background"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh Now
        </Button>
      </CardFooter>
    </Card>
  );
}
