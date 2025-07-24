"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowDown,
  ArrowUp,
  BarChart2,
  DollarSign,
  Star,
  Users,
} from "lucide-react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "@/utils/formatCurrency";

const monthlyData = [
  { month: "Jan", revenue: 4000, sales: 2400, customers: 400 },
  { month: "Feb", revenue: 3000, sales: 1398, customers: 600 },
  { month: "Mar", revenue: 6000, sales: 9800, customers: 200 },
  { month: "Apr", revenue: 8000, sales: 3908, customers: 800 },
  { month: "May", revenue: 5000, sales: 4800, customers: 500 },
  { month: "Jun", revenue: 9000, sales: 3800, customers: 900 },
];

const CustomTooltip = ({
  active,
  payload,
  label,
  dataKey,
  color,
}: {
  active?: string;
  payload?: Array<{ value: number }>;
  label?: string;
  dataKey?: string;
  color?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border rounded-lg shadow-lg">
        <p className="font-medium">{label}</p>
        <p className="flex items-center" style={{ color }}>
          <span className="mr-2">{dataKey}:</span>
          <span>${payload[0].value.toLocaleString()}</span>
        </p>
      </div>
    );
  }
  return null;
};

const MiniLineChart = ({
  dataKey,
  color,
}: {
  dataKey: string;
  color: string;
}) => (
  <ResponsiveContainer width="100%" height={100}>
    <LineChart
      data={monthlyData}
      margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
    >
      <defs>
        <linearGradient id={`color${dataKey}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={color} stopOpacity={0.8} />
          <stop offset="95%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis
        dataKey="month"
        tick={{ fontSize: 12 }}
        axisLine={false}
        tickLine={false}
      />
      <YAxis hide domain={["dataMin - 500", "dataMax + 500"]} />
      <Tooltip
        content={<CustomTooltip dataKey={dataKey} color={color} />}
        cursor={{ stroke: "#ddd", strokeWidth: 1, strokeDasharray: "3 3" }}
      />
      <Line
        type="monotone"
        dataKey={dataKey}
        stroke={color}
        strokeWidth={2}
        dot={{ r: 2, strokeWidth: 2, fill: color }}
        activeDot={{ r: 5, strokeWidth: 0, fill: color }}
        animationDuration={1500}
      />
    </LineChart>
  </ResponsiveContainer>
);

export default function EnhancedStatsCards() {
  return (
    <div className="grid gap-4 lg:grid-cols-12">
      {/* Card 1 - Congratulations */}
      <Card className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 bg-gradient-to-br from-primary/5 to-primary/10 relative overflow-hidden md:col-span-6 xl:col-span-3">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/20"></div>
          <div className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-primary/30"></div>
        </div>

        <CardHeader className="relative">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Star className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="font-semibold text-2xl">
                Congratulations Ali! 🎉
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                Best seller this month
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-display text-3xl">
                {formatCurrency(15231.89, "currency")}
              </div>
              <div className="text-muted-foreground text-xs mt-2">
                <span className="text-green-500 flex items-center">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +65% from last month
                </span>
              </div>
            </div>
            <Button variant="outline" className="shrink-0">
              View Sales
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Card 2 - Revenue */}
      <Card className="flex flex-col gap-6 rounded-xl border py-6 md:col-span-6 xl:col-span-3 hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/50">
              <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="leading-none font-semibold">
              Revenue
            </CardTitle>
          </div>
          <p className="text-muted-foreground text-xs">
            <span className="text-green-500 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              +20.1%
            </span>
          </p>
        </CardHeader>

        <CardContent>
          <div className="font-display text-3xl">
            {formatCurrency(125231, "currency")}
          </div>
          <p className="text-muted-foreground text-sm mt-1">This Year</p>
          <div className="mt-2 h-[100px]">
            <MiniLineChart dataKey="revenue" color="#10B981" />
          </div>
        </CardContent>
      </Card>

      {/* Card 3 - Sales */}
      <Card className="flex flex-col gap-6 rounded-xl border py-6 md:col-span-6 xl:col-span-3 hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/50">
              <BarChart2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="leading-none font-semibold">Sales</CardTitle>
          </div>
          <p className="text-muted-foreground text-xs">
            <span className="text-red-500 flex items-center">
              <ArrowDown className="h-3 w-3 mr-1" />
              -1.7%
            </span>
          </p>
        </CardHeader>

        <CardContent>
          <div className="font-display text-3xl">20K</div>
          <p className="text-muted-foreground text-sm mt-1">This Year</p>
          <div className="mt-2 h-[100px]">
            <MiniLineChart dataKey="sales" color="#3B82F6" />
          </div>
        </CardContent>
      </Card>

      {/* Card 4 - New Customers */}
      <Card className="flex flex-col gap-6 rounded-xl border py-6 md:col-span-6 xl:col-span-3 hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/50">
              <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <CardTitle className="leading-none font-semibold">
              New Customers
            </CardTitle>
          </div>
          <p className="text-muted-foreground text-xs">
            <span className="text-green-500 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              +36.5%
            </span>
          </p>
        </CardHeader>

        <CardContent>
          <div className="font-display text-3xl">{formatCurrency(3602)}</div>
          <p className="text-muted-foreground text-sm mt-1">This Year</p>
          <div className="mt-2 h-[100px]">
            <MiniLineChart dataKey="customers" color="#8B5CF6" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
