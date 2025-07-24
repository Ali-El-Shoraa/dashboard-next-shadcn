"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/utils/formatCurrency";
import { MoreHorizontal } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { TooltipProps } from "recharts";

const data = [
  { name: "1", value: 20 },
  { name: "5", value: 35 },
  { name: "9", value: 10 },
  { name: "11", value: 40 },
  { name: "15", value: 25 },
  { name: "18", value: 30 },
];

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg p-3 shadow-lg">
        <p className="font-medium">Day {label}</p>
        <p className="text-primary">{payload[0].value} orders</p>
      </div>
    );
  }
  return null;
};

export default function EnhancedOrdersChart() {
  return (
    <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
      {/* Header with full-width background */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 p-6 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg">Orders This Month</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Daily order performance
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>This Month</DropdownMenuItem>
            <DropdownMenuItem>Previous Month</DropdownMenuItem>
            <DropdownMenuItem>Last 3 Months</DropdownMenuItem>
            <DropdownMenuItem>Last 6 Months</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Stats summary */}
      <div className="px-6 pt-4 pb-2 flex items-center justify-between">
        <div className="bg-muted/50 rounded-lg px-4 py-2">
          <h4 className="font-medium">
            {formatCurrency(12000, "currency")}{" "}
            <span className="text-sm text-muted-foreground">
              ({formatCurrency(15080)} To Goal)
            </span>
          </h4>
        </div>
        <div className="text-sm text-green-500 flex items-center">
          <span className="inline-block mr-1">↑</span>
          12.5% from last month
        </div>
      </div>

      {/* Full-width chart area */}
      <div className="h-64 w-full -ml-4 -mr-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7064f5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#7064f5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              // strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border)"
              // strokeOpacity={0.2}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              width={30}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#7064f5"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Grid integration footer */}
      <div className="grid grid-cols-3 gap-4 p-6 pt-2 border-t">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Avg. Orders</p>
          <p className="font-semibold">24/day</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Peak Day</p>
          <p className="font-semibold">Day 11 (40)</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Completion</p>
          <p className="font-semibold text-green-500">79.5%</p>
        </div>
      </div>
    </div>
  );
}
